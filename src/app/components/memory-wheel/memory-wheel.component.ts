import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MEMORIES_SECTION, MEMORY_CAPTIONS, Memory } from '../../core/content.config';
import { MEMORY_PHOTOS } from '../../core/photo-manifest.generated';
import { AmbientSparklesComponent } from '../../shared/ambient-sparkles/ambient-sparkles.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { ScrollProgressDirective } from '../../shared/scroll-progress.directive';

/**
 * Fixed gap between neighbouring cards on the arc.
 *
 * This used to divide a fixed 130-degree span between however many photos
 * existed, which meant the spacing collapsed as photos were added — five
 * photos sat 32 degrees apart and looked right, eleven sat 13 degrees
 * apart and overlapped into a pile. Holding the gap constant instead lets
 * the wheel take any number of photos; the extra ones simply live further
 * round the rim, out of sight until they are scrolled to.
 *
 * The gap also has to clear the card's own width or neighbours still sit
 * on top of each other: chord = 2 * radius * sin(step / 2), which at a
 * 41vh radius and a 190px card needs roughly 40 degrees even on a short
 * screen.
 */
const ANGLE_STEP_DEG = 56;

/**
 * Past this far from centre a card has faded out completely.
 *
 * Kept under two steps: further round the rim the arc curves enough that
 * a card starts clipping the focused one's corner, and a barely-visible
 * ghost overlapping the main photo is worse than simply not showing it.
 */
const VISIBLE_ARC_DEG = 70;

type MemoryView = {
  memory: Memory;
  angle: number;
  opacity: number;
  scale: number;
  focused: boolean;
  /** nearer the centre stacks higher, so the focused card is never buried */
  z: number;
};

/**
 * Photos on the wheel come from the folder; captions are paired to them by
 * position. Whichever list is longer just runs past the other rather than
 * dropping photos or erroring.
 */
function buildMemories(): Memory[] {
  if (MEMORY_PHOTOS.length === 0) {
    // nothing added yet — keep the wheel populated with empty frames so the
    // section still reads as a wheel rather than collapsing
    return MEMORY_CAPTIONS.map((c) => ({ photo: '', caption: c.caption, date: c.date }));
  }

  return MEMORY_PHOTOS.map((photo, i) => ({
    photo,
    caption: MEMORY_CAPTIONS[i]?.caption ?? '',
    date: MEMORY_CAPTIONS[i]?.date,
  }));
}

@Component({
  selector: 'app-memory-wheel',
  standalone: true,
  imports: [CommonModule, RevealDirective, ScrollProgressDirective, AmbientSparklesComponent],
  templateUrl: './memory-wheel.component.html',
  styleUrl: './memory-wheel.component.scss',
})
export class MemoryWheelComponent {
  content = MEMORIES_SECTION;
  memories = buildMemories();

  views: MemoryView[] = [];
  focusedMemory: Memory = this.memories[0];

  constructor() {
    this.recompute(0);
  }

  onProgress(progress: number): void {
    this.recompute(progress);
  }

  private recompute(progress: number): void {
    const currentIndex = progress * (this.memories.length - 1);

    this.views = this.memories.map((memory, i) => {
      const angle = (i - currentIndex) * ANGLE_STEP_DEG;
      const dist = Math.abs(angle);
      const focused = dist < ANGLE_STEP_DEG / 2;
      // fade fully to nothing at the edge of the visible arc, so cards
      // waiting their turn are genuinely gone rather than stacked faintly
      const opacity = dist >= VISIBLE_ARC_DEG ? 0 : Math.max(0, 1 - dist / VISIBLE_ARC_DEG);
      // never scales above 1: transform scaling stretches the already
      // rasterised layer, so enlarging the focused card this way visibly
      // softened it. The card is sized up in CSS instead, and neighbours
      // only ever shrink — downscaling stays crisp.
      const scale = focused ? 1 : Math.max(0.6, 1 - dist / 170);
      const z = Math.round(opacity * 100);
      return { memory, angle, opacity, scale, focused, z };
    });

    let best = this.views[0];
    for (const v of this.views) {
      if (Math.abs(v.angle) < Math.abs(best.angle)) best = v;
    }
    this.focusedMemory = best.memory;
  }

  onImgError(memory: Memory): void {
    memory.broken = true;
  }
}
