import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
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

  private wishTimer?: ReturnType<typeof setTimeout>;
  private missTimer?: ReturnType<typeof setTimeout>;
  private hintTimer?: ReturnType<typeof setTimeout>;
  private rippleId = 0;
  ripples: Ripple[] = [];

  // scattered across the full sky, kept off the extreme edges so a wish
  // bubble anchored to any of them still has room to render
  // inset far enough from the edges that a wish bubble anchored dead-centre
  // on any star still fits without needing to be nudged sideways
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
      star.found = true;
      this.wishesFound++;
      this.activeWish = {
        text: this.content.wishes[star.id],
        // anchored exactly on the star; stars are already inset so this
        // never needs clamping, which is what used to shift it off-target
        left: star.left,
        top: star.top,
        below: star.top < 26,
      };

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
    clearTimeout(this.missTimer);
    clearTimeout(this.hintTimer);
  }
}
