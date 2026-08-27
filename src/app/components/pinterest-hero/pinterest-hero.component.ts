import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PINTEREST_WALL } from '../../core/content.config';

type Photo = { src: string; missing: boolean };
type Row = { photos: Photo[]; duration: number; offset: number };

const ROW_COUNT = 3;
const ROW_DURATIONS = [64, 52, 74];

@Component({
  selector: 'app-pinterest-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pinterest-hero.component.html',
  styleUrl: './pinterest-hero.component.scss',
})
export class PinterestHeroComponent {
  content = PINTEREST_WALL;

  rows: Row[] = this.buildRows();

  private buildRows(): Row[] {
    const photos: Photo[] = Array.from({ length: this.content.photoCount }, (_, i) => ({
      src: `assets/wall/${i + 1}.jpg`,
      missing: false,
    }));

    // deal photos round-robin so no two rows ever show the same picture,
    // and every photo appears exactly once across the wall
    const buckets: Photo[][] = Array.from({ length: ROW_COUNT }, () => []);
    photos.forEach((photo, i) => buckets[i % ROW_COUNT].push(photo));

    return buckets.map((bucket, i) => ({
      // the marquee scrolls one full copy's width, so a second copy is
      // required for the loop to close seamlessly. Both halves hold the
      // SAME Photo objects, so a missing file drops out of both at once
      // and the two halves stay identical in width.
      photos: [...bucket, ...bucket],
      duration: ROW_DURATIONS[i % ROW_DURATIONS.length],
      // stagger each row's starting point so they never march in lockstep
      offset: -(i * 9),
    }));
  }

  onImgError(photo: Photo): void {
    photo.missing = true;
  }

  scrollToNext(): void {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  }
}
