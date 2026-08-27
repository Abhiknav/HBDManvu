import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import confetti from 'canvas-confetti';
import { BALLOONS } from '../../core/content.config';
import { BALLOON_PHOTOS } from '../../core/photo-manifest.generated';
import { AmbientSparklesComponent } from '../../shared/ambient-sparkles/ambient-sparkles.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SoundService } from '../../shared/sound.service';

type Balloon = {
  id: number;
  x: number;
  y: number;
  vx: number;
  width: number;
  height: number;
  hue: number;
  riseSpeed: number;
  swayFreq: number;
  swayAmp: number;
  seed: number;
  message: string;
  photo: string;
  popped: boolean;
  respawning: boolean;
};

type Obstacle = { id: number; x: number; y: number; width: number; height: number; photo: string; message: string; rotate: number; broken: boolean };

const BALLOON_COUNT = 6;
const BALLOON_W = 64;
const BALLOON_H = 82;
const OBSTACLE_W = 168;
const OBSTACLE_H = 230;

@Component({
  selector: 'app-balloons',
  standalone: true,
  imports: [CommonModule, RevealDirective, AmbientSparklesComponent],
  templateUrl: './balloons.component.html',
  styleUrl: './balloons.component.scss',
})
export class BalloonsComponent implements AfterViewInit, OnDestroy {
  content = BALLOONS;
  private sound = inject(SoundService);
  private zone = inject(NgZone);

  @ViewChild('sky', { static: true }) skyRef!: ElementRef<HTMLElement>;
  @ViewChildren('balloonEl') balloonEls!: QueryList<ElementRef<HTMLElement>>;

  poppedCount = 0;
  obstacles: Obstacle[] = [];

  private nextId = 0;
  private nextObstacleId = 0;
  // drawn from independently so every photo gets seen even though there
  // are far more photos than reasons
  private messagePool = this.shuffled(this.content.messages);
  private photoPool = this.shuffled(BALLOON_PHOTOS);
  private rafId?: number;
  private lastTime = 0;
  private resizeObserver?: ResizeObserver;

  // seeded with a rough viewport-width estimate so the array is populated
  // before the view's first check — reassigning it in ngAfterViewInit
  // (once the real .sky size is known) would trigger NG0100
  private containerW = typeof window !== 'undefined' ? window.innerWidth : 900;
  private containerH = 500;
  balloons: Balloon[] = Array.from({ length: BALLOON_COUNT }, () => this.spawn(true));

  ngAfterViewInit(): void {
    this.measure();

    this.resizeObserver = new ResizeObserver(() => this.measure());
    this.resizeObserver.observe(this.skyRef.nativeElement);

    this.zone.runOutsideAngular(() => {
      this.rafId = requestAnimationFrame((t) => this.tick(t));
    });
  }

  private measure(): void {
    const rect = this.skyRef.nativeElement.getBoundingClientRect();
    this.containerW = rect.width;
    this.containerH = rect.height;
  }

  /** each pool reshuffles once exhausted, so nothing repeats until all are used */
  private nextMessage(): string {
    if (this.messagePool.length === 0) {
      this.messagePool = this.shuffled(this.content.messages);
    }
    return this.messagePool.pop()!;
  }

  private nextPhoto(): string {
    if (this.photoPool.length === 0) {
      this.photoPool = this.shuffled(BALLOON_PHOTOS);
    }
    return this.photoPool.pop() ?? '';
  }

  private shuffled<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  private spawn(initial: boolean): Balloon {
    const w = Math.max(this.containerW, 320);
    return {
      id: this.nextId++,
      x: 10 + Math.random() * Math.max(10, w - BALLOON_W - 20),
      y: initial ? Math.random() * (this.containerH || 400) : -BALLOON_H - Math.random() * 120,
      vx: 0,
      width: BALLOON_W,
      height: BALLOON_H,
      hue: [350, 25, 165, 265, 205, 15][Math.floor(Math.random() * 6)],
      riseSpeed: 26 + Math.random() * 16,
      swayFreq: 0.4 + Math.random() * 0.5,
      swayAmp: 18 + Math.random() * 14,
      seed: Math.random() * Math.PI * 2,
      message: this.nextMessage(),
      photo: this.nextPhoto(),
      popped: false,
      respawning: false,
    };
  }

  private tick(time: number): void {
    const dt = Math.min(0.05, this.lastTime ? (time - this.lastTime) / 1000 : 0.016);
    this.lastTime = time;
    const w = Math.max(this.containerW, 320);
    const h = Math.max(this.containerH, 400);
    const tSec = time / 1000;

    const els = this.balloonEls?.toArray() ?? [];

    for (let i = 0; i < this.balloons.length; i++) {
      const b = this.balloons[i];
      const el = els[i]?.nativeElement;
      if (!el) continue;

      if (b.popped || b.respawning) {
        continue;
      }

      b.y += b.riseSpeed * dt;
      b.x += Math.sin(tSec * b.swayFreq + b.seed) * b.swayAmp * dt;

      for (const o of this.obstacles) {
        const verticalOverlap = b.y + b.height > o.y && b.y < o.y + o.height;
        if (!verticalOverlap) continue;

        const bCenter = b.x + b.width / 2;
        const oCenter = o.x + o.width / 2;
        const dx = bCenter - oCenter;
        const touchDist = o.width / 2 + b.width / 2;

        if (Math.abs(dx) < touchDist) {
          // actually touching: shove it out immediately and give it a
          // real sideways push, so it reads as hitting and sliding off
          // rather than a smooth pre-emptive curve
          const dir = dx === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.sign(dx);
          b.x = oCenter + dir * touchDist - b.width / 2;
          b.vx += dir * 90;
        } else if (Math.abs(dx) < touchDist + 22) {
          // just grazing the edge — a small nudge so it doesn't clip in
          const strength = (1 - (Math.abs(dx) - touchDist) / 22) * 70;
          b.vx += Math.sign(dx) * strength * dt;
        }
      }

      b.vx *= 0.9;
      b.x += b.vx * dt;
      b.x = Math.max(4, Math.min(w - b.width - 4, b.x));

      if (b.y > h + 40) {
        b.y = -b.height - Math.random() * 160;
        b.x = 10 + Math.random() * Math.max(10, w - b.width - 20);
        b.vx = 0;
      }

      el.style.transform = `translate(${b.x}px, ${-b.y}px)`;
    }

    this.rafId = requestAnimationFrame((t) => this.tick(t));
  }

  pop(index: number, event: MouseEvent): void {
    const b = this.balloons[index];
    if (b.popped) return;

    this.sound.unlock();
    this.poppedCount++;

    const rect = this.skyRef.nativeElement.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = rect.bottom - event.clientY;

    confetti({
      particleCount: 34,
      spread: 62,
      startVelocity: 28,
      scalar: 0.75,
      colors: ['#f7c948', '#f0508a', '#17a8a0', '#e5734f'],
      origin: { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight },
    });
    this.sound.pop();

    this.zone.run(() => {
      b.popped = true;

      const ow = OBSTACLE_W;
      const oh = OBSTACLE_H;
      const spot = this.findFreeSpot(localX - ow / 2, localY - oh / 2, ow, oh);
      this.obstacles = [
        ...this.obstacles,
        {
          id: this.nextObstacleId++,
          x: spot.x,
          y: spot.y,
          width: ow,
          height: oh,
          photo: b.photo,
          message: b.message,
          rotate: Math.random() * 14 - 7,
          broken: false,
        },
      ];

      b.respawning = true;
      setTimeout(() => {
        this.zone.run(() => {
          const fresh = this.spawn(false);
          Object.assign(b, fresh, { id: b.id });
        });
      }, 900);
    });
  }

  private findFreeSpot(desiredX: number, desiredY: number, w: number, h: number): { x: number; y: number } {
    const clampX = (x: number) => Math.max(4, Math.min(this.containerW - w - 4, x));
    const clampY = (y: number) => Math.max(4, Math.min(this.containerH - h - 4, y));
    const overlaps = (x: number, y: number) =>
      this.obstacles.some((o) => x < o.x + o.width && x + w > o.x && y < o.y + o.height && y + h > o.y);

    let x = clampX(desiredX);
    let y = clampY(desiredY);
    if (!overlaps(x, y)) return { x, y };

    // spiral outward from the desired spot until a free rectangle is found
    for (let ring = 1; ring <= 10; ring++) {
      const step = ring * 40;
      const candidates: Array<[number, number]> = [
        [desiredX + step, desiredY],
        [desiredX - step, desiredY],
        [desiredX, desiredY + step],
        [desiredX, desiredY - step],
        [desiredX + step, desiredY + step],
        [desiredX - step, desiredY - step],
        [desiredX + step, desiredY - step],
        [desiredX - step, desiredY + step],
      ];
      for (const [cx, cy] of candidates) {
        x = clampX(cx);
        y = clampY(cy);
        if (!overlaps(x, y)) return { x, y };
      }
    }
    return { x: clampX(desiredX), y: clampY(desiredY) };
  }

  onObstacleImgError(o: Obstacle): void {
    o.broken = true;
  }

  trackByBalloon(_index: number, b: Balloon): number {
    return b.id;
  }

  trackByObstacle(_index: number, o: Obstacle): number {
    return o.id;
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
  }
}
