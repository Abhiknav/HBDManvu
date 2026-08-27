import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PINTEREST_WALL } from '../../core/content.config';

type Row = { photos: string[]; duration: number; reverse: boolean };

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
    const rowCount = 3;
    const buckets: string[][] = Array.from({ length: rowCount }, () => []);
    this.content.photos.forEach((photo, i) => buckets[i % rowCount].push(photo));

    const durations = [42, 34, 50];
    return buckets.map((photos, i) => ({
      // duplicate so the marquee loop is seamless
      photos: [...photos, ...photos],
      duration: durations[i % durations.length],
      reverse: false,
    }));
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.visibility = 'hidden';
  }

  scrollToNext(): void {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  }
}
