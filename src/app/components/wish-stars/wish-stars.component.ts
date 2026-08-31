import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import confetti from 'canvas-confetti';
import { WISH_STARS } from '../../core/content.config';
import { RevealDirective } from '../../shared/reveal.directive';
import { SoundService } from '../../shared/sound.service';

type WishStar = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  found: boolean;
  shooting: boolean;
};

type Twinkle = { left: number; top: number; size: number; delay: number; duration: number };
type Ripple = { id: number; left: number; top: number };

/** how long the streak takes to cross the sky */
const SHOOT_DURATION = 1100;
/** the wish surfaces while the streak is still travelling, not after it */
const BUBBLE_DELAY = 320;

@Component({
  selector: 'app-wish-stars',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './wish-stars.component.html',
  styleUrl: './wish-stars.component.scss',
})
export class WishStarsComponent implements OnDestroy {
  content = WISH_STARS;
  private sound = inject(SoundService);

  wishesFound = 0;
  hinting = false;
  missed = false;
  activeWish: { text: string; left: number; top: number; below: boolean } | null = null;

  @ViewChild('sky') private skyRef?: ElementRef<HTMLElement>;

  private wishTimer?: ReturnType<typeof setTimeout>;
  private clampTimer?: ReturnType<typeof setTimeout>;
  private missTimer?: ReturnType<typeof setTimeout>;
  private hintTimer?: ReturnType<typeof setTimeout>;
  private rippleId = 0;
  ripples: Ripple[] = [];

  // scattered across the full sky, kept off the extreme edges so a wish
  // bubble anchored to any of them has room to render. The inset alone is
  // not enough on a narrow screen — a bubble is up to 70vw wide there, so
  // one centred on a star at 16% still hangs off the edge — which is what
  // clampBubble below corrects once the real width is known.
  stars: WishStar[] = this.content.wishes.map((_, i) => ({
    id: i,
    left: 16 + ((i * 37 + (i % 3) * 11) % 68),
    top: 14 + ((i * 29 + i * i * 5) % 62),
    size: 9 + (i % 3) * 2,
    delay: (i % 6) * 0.4,
    found: false,
    shooting: false,
  }));

  // decoys deliberately overlap the wish stars' size range so spotting one
  // takes a moment — that hunt is the whole point of the section
  twinkles: Twinkle[] = Array.from({ length: 190 }, (_, i) => ({
    left: (i * 11.3 + (i % 7) * 3.1) % 100,
    top: (i * 17.9 + (i % 5) * 4.7) % 100,
    size: i % 11 === 0 ? 5 : i % 5 === 0 ? 3 : 1 + (i % 3),
    delay: (i % 14) / 3,
    duration: 1.6 + (i % 6) * 0.5,
  }));

  get allWishesFound(): boolean {
    return this.wishesFound >= this.stars.length;
  }

  findStar(star: WishStar, event: MouseEvent): void {
    event.stopPropagation();
    if (star.shooting || star.found) return;

    this.sound.unlock();
    this.sound.pop();
    star.shooting = true;

    confetti({
      particleCount: 20,
      spread: 45,
      startVelocity: 18,
      scalar: 0.55,
      colors: ['#f7c948', '#fffdf8'],
      origin: { x: star.left / 100, y: star.top / 100 },
    });

    clearTimeout(this.wishTimer);
    this.wishTimer = setTimeout(() => {
      // The wishes are read in the order they are written, not in the order
      // the stars happen to be clicked: the nth star found always shows the
      // nth wish. Which star she picks decides only where the bubble opens.
      const wish = this.content.wishes[this.wishesFound];
      star.found = true;
      this.wishesFound++;
      this.activeWish = {
        text: wish,
        // anchored on the star, then nudged back inside the sky on the
        // next tick if the wish is long enough to hang off an edge
        left: star.left,
        top: star.top,
        below: star.top < 26,
      };
      clearTimeout(this.clampTimer);
      this.clampTimer = setTimeout(() => this.clampBubble());

      if (this.allWishesFound) {
        confetti({
          particleCount: 110,
          spread: 130,
          startVelocity: 42,
          colors: ['#f7c948', '#f0508a', '#17a8a0', '#9b5de5'],
          origin: { y: 0.5 },
        });
      }
    }, BUBBLE_DELAY);

    setTimeout(() => (star.shooting = false), SHOOT_DURATION);
  }

  /**
   * Slides a bubble back inside the sky if it overhangs an edge.
   *
   * The sky clips its overflow, so an overhanging bubble simply loses the
   * text that falls outside it. Bubble width depends on the wish and on
   * the viewport (up to 70vw), so the fit can only be judged once it has
   * rendered — hence the measure-then-adjust rather than a fixed inset.
   */
  private clampBubble(): void {
    const sky = this.skyRef?.nativeElement;
    const bubble = sky?.querySelector('.wish-bubble') as HTMLElement | null;
    if (!sky || !bubble || !this.activeWish) return;

    // offsetWidth, not getBoundingClientRect: the bubble animates in from
    // scale 0.9, and a measurement taken mid-animation reports it ~10%
    // narrower than it settles at — enough to leave an edge still clipped
    const skyWidth = sky.offsetWidth;
    const halfBubble = bubble.offsetWidth / 2;
    const margin = 10;
    const min = halfBubble + margin;
    const max = skyWidth - halfBubble - margin;

    // wider than the sky itself: centred is as good as it gets
    const wanted = (this.activeWish.left / 100) * skyWidth;
    const fitted = min > max ? skyWidth / 2 : Math.min(Math.max(wanted, min), max);

    this.activeWish = { ...this.activeWish, left: (fitted / skyWidth) * 100 };
  }

  /** clicking empty sky: gentle "keep looking" feedback, not a penalty */
  onSkyClick(event: MouseEvent): void {
    const host = event.currentTarget as HTMLElement;
    const rect = host.getBoundingClientRect();
    const id = this.rippleId++;
    this.ripples = [
      ...this.ripples,
      {
        id,
        left: ((event.clientX - rect.left) / rect.width) * 100,
        top: ((event.clientY - rect.top) / rect.height) * 100,
      },
    ];
    setTimeout(() => (this.ripples = this.ripples.filter((r) => r.id !== id)), 600);

    if (this.allWishesFound) return;
    this.missed = true;
    clearTimeout(this.missTimer);
    this.missTimer = setTimeout(() => (this.missed = false), 1400);
  }

  showHint(): void {
    if (this.hinting) return;
    this.hinting = true;
    clearTimeout(this.hintTimer);
    this.hintTimer = setTimeout(() => (this.hinting = false), 2200);
  }

  ngOnDestroy(): void {
    clearTimeout(this.wishTimer);
    clearTimeout(this.clampTimer);
    clearTimeout(this.missTimer);
    clearTimeout(this.hintTimer);
  }
}
