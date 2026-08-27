import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MEMORIES, MEMORIES_SECTION, Memory } from '../../core/content.config';
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

@Component({
  selector: 'app-memory-wheel',
  standalone: true,
  imports: [CommonModule, RevealDirective, ScrollProgressDirective, AmbientSparklesComponent],
  templateUrl: './memory-wheel.component.html',
  styleUrl: './memory-wheel.component.scss',
})
export class MemoryWheelComponent {
  content = MEMORIES_SECTION;
  memories = MEMORIES;

  views: MemoryView[] = [];
  focusedMemory: Memory = MEMORIES[0];

  private angleStep = MEMORIES.length > 1 ? SPAN_DEG / (MEMORIES.length - 1) : 0;

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
