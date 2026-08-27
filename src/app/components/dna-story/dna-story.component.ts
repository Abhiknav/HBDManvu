import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, inject } from '@angular/core';
import { STORY, STORY_SECTION, StoryChapter } from '../../core/content.config';
import { STORY_PHOTOS } from '../../core/photo-manifest.generated';
import { AmbientSparklesComponent } from '../../shared/ambient-sparkles/ambient-sparkles.component';
import { ScrollProgressDirective } from '../../shared/scroll-progress.directive';

type ChapterView = {
  chapter: StoryChapter;
  photos: string[];
  /** which slide of this chapter is face-up */
  slide: number;
  /** true while the card is mid-spin, so the face swap stays hidden */
  flipping: boolean;
  opacity: number;
  scale: number;
  translateX: number;
  translateY: number;
  rotate: number;
  z: number;
};

/** cards travel corner-to-corner so each one covers real distance */
const DIAGONAL = 360;
/** how long a slide rests face-up before turning over */
const SLIDE_HOLD = 3200;
/** must match the flip animation duration in the stylesheet */
const FLIP_DURATION = 1000;

@Component({
  selector: 'app-dna-story',
  standalone: true,
  imports: [CommonModule, ScrollProgressDirective, AmbientSparklesComponent],
  templateUrl: './dna-story.component.html',
  styleUrl: './dna-story.component.scss',
})
export class DnaStoryComponent implements OnDestroy {
  content = STORY_SECTION;
  chapters = STORY;

  views: ChapterView[] = STORY.map((chapter) => ({
    chapter,
    photos: STORY_PHOTOS[chapter.folder] ?? [],
    slide: 0,
    flipping: false,
    opacity: 0,
    scale: 0.62,
    translateX: 0,
    translateY: 0,
    rotate: 0,
    z: 0,
  }));

  activeIndex = 0;

  private zone = inject(NgZone);
  private holdTimer?: ReturnType<typeof setTimeout>;
  private swapTimer?: ReturnType<typeof setTimeout>;
  private settleTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    this.recompute(0);
    this.scheduleFlip();
  }

  onProgress(progress: number): void {
    const previousActive = this.activeIndex;
    this.recompute(progress);
    // restart the slideshow whenever a different chapter takes the centre,
    // so its first photo always gets a full turn on screen
    if (this.activeIndex !== previousActive) {
      this.resetSlides(previousActive);
      this.scheduleFlip();
    }
  }

  private recompute(progress: number): void {
    const currentIndex = progress * (this.views.length - 1);
    this.activeIndex = Math.round(currentIndex);

    for (let i = 0; i < this.views.length; i++) {
      const view = this.views[i];
      const dist = i - currentIndex;
      const absDist = Math.abs(dist);

      // smoothstep so scale peaks exactly at centre with no visible jump
      const t = Math.min(1, absDist);
      const eased = t * t * (3 - 2 * t);

      view.opacity = Math.max(0, 1 - absDist * 0.62);
      view.scale = 1.28 - (1.28 - 0.62) * eased;
      view.translateX = -dist * DIAGONAL;
      view.translateY = dist * DIAGONAL;
      view.rotate = Math.max(-16, Math.min(16, dist * 16));
      view.z = Math.round((1 - absDist) * 100);
    }
  }

  private resetSlides(previousActive: number): void {
    const previous = this.views[previousActive];
    if (previous) {
      previous.slide = 0;
      previous.flipping = false;
    }
  }

  /**
   * Turns the active chapter's card over to its next photo, on a loop.
   * The image behind the front face is swapped at the halfway point, while
   * the card is showing its back — so the change is never seen happening.
   */
  private scheduleFlip(): void {
    this.clearTimers();

    const view = this.views[this.activeIndex];
    if (!view || view.photos.length < 2) return;

    this.zone.runOutsideAngular(() => {
      this.holdTimer = setTimeout(() => {
        this.zone.run(() => (view.flipping = true));

        this.swapTimer = setTimeout(() => {
          this.zone.run(() => {
            view.slide = (view.slide + 1) % view.photos.length;
          });
        }, FLIP_DURATION / 2);

        this.settleTimer = setTimeout(() => {
          this.zone.run(() => (view.flipping = false));
          this.scheduleFlip();
        }, FLIP_DURATION);
      }, SLIDE_HOLD);
    });
  }

  private clearTimers(): void {
    clearTimeout(this.holdTimer);
    clearTimeout(this.swapTimer);
    clearTimeout(this.settleTimer);
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }
}
