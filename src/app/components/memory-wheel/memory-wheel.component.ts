import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MEMORIES_SECTION, MEMORY_CAPTIONS, Memory } from '../../core/content.config';
import { MEMORY_PHOTOS } from '../../core/photo-manifest.generated';
import { AmbientSparklesComponent } from '../../shared/ambient-sparkles/ambient-sparkles.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { ScrollProgressDirective } from '../../shared/scroll-progress.directive';

const SPAN_DEG = 130;

type MemoryView = {
  memory: Memory;
  angle: number;
  opacity: number;
  scale: number;
  focused: boolean;
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

  private angleStep = this.memories.length > 1 ? SPAN_DEG / (this.memories.length - 1) : 0;

  constructor() {
    this.recompute(0);
  }

  onProgress(progress: number): void {
    this.recompute(progress);
  }

  private recompute(progress: number): void {
    const currentIndex = progress * (this.memories.length - 1);

    this.views = this.memories.map((memory, i) => {
      const angle = (i - currentIndex) * this.angleStep;
      const dist = Math.abs(angle);
      const focused = dist < this.angleStep / 2;
      const opacity = Math.max(0.15, 1 - dist / 95);
      const scale = focused ? 1.12 : Math.max(0.6, 1 - dist / 140);
      return { memory, angle, opacity, scale, focused };
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
