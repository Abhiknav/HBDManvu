import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { STORY, STORY_SECTION, StoryChapter } from '../../core/content.config';
import { AmbientSparklesComponent } from '../../shared/ambient-sparkles/ambient-sparkles.component';
import { ScrollProgressDirective } from '../../shared/scroll-progress.directive';

type ChapterView = {
  chapter: StoryChapter;
  opacity: number;
  scale: number;
  translateX: number;
  translateY: number;
  rotate: number;
  z: number;
};

// cards travel diagonally, bottom-left corner to top-right corner, so the
// path covers real distance instead of a quick fade in place
const DIAGONAL = 360;

@Component({
  selector: 'app-dna-story',
  standalone: true,
  imports: [CommonModule, ScrollProgressDirective, AmbientSparklesComponent],
  templateUrl: './dna-story.component.html',
  styleUrl: './dna-story.component.scss',
})
export class DnaStoryComponent {
  content = STORY_SECTION;
  chapters = STORY;

  views: ChapterView[] = [];
  activeIndex = 0;

  constructor() {
    this.recompute(0);
  }

  onProgress(progress: number): void {
    this.recompute(progress);
  }

  private recompute(progress: number): void {
    const currentIndex = progress * (this.chapters.length - 1);
    this.activeIndex = Math.round(currentIndex);

    this.views = this.chapters.map((chapter, i) => {
      const dist = i - currentIndex;
      const absDist = Math.abs(dist);
      const opacity = Math.max(0, 1 - absDist * 0.62);
      // smoothstep easing so scale peaks at exactly dist=0 with zero
      // derivative either side — a threshold-based jump here reads as a
      // flicker right as a card reaches the center
      const t = Math.min(1, absDist);
      const eased = t * t * (3 - 2 * t);
      const scale = 1.28 - (1.28 - 0.62) * eased;
      const translateX = -dist * DIAGONAL;
      const translateY = dist * DIAGONAL;
      const rotate = Math.max(-16, Math.min(16, dist * 16));
      return { chapter, opacity, scale, translateX, translateY, rotate, z: Math.round((1 - absDist) * 100) };
    });
  }

  onImgError(chapter: StoryChapter): void {
    chapter.broken = true;
  }
}
