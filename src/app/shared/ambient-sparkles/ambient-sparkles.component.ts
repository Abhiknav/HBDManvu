import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

type Sparkle = { left: number; delay: number; duration: number; size: number; color: string; star: boolean };

const PARTY_COLORS = ['var(--gold-glow)', 'var(--party-pink)', 'var(--party-teal)', 'var(--party-purple)', 'var(--party-blue)'];

/**
 * A field of small floating, rising dots and twinkling stars in party
 * colors — dropped into a section's background to keep the page feeling
 * like a celebration rather than a static gallery. Purely decorative:
 * aria-hidden, pointer-events none.
 */
@Component({
  selector: 'app-ambient-sparkles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sparkle-field" aria-hidden="true">
      <span
        *ngFor="let s of sparkles"
        class="sparkle"
        [class.star]="s.star"
        [style.left.%]="s.left"
        [style.animation-delay.s]="s.delay"
        [style.animation-duration.s]="s.duration"
        [style.width.px]="s.size"
        [style.height.px]="s.size"
        [style.font-size.px]="s.size * 2.2"
        [style.color]="s.color"
        [style.background]="s.star ? 'none' : s.color"
        [style.box-shadow]="s.star ? 'none' : '0 0 7px 1px ' + s.color"
        [style.text-shadow]="s.star ? '0 0 8px ' + s.color : 'none'"
      >{{ s.star ? '✦' : '' }}</span>
    </div>
  `,
  styleUrl: './ambient-sparkles.component.scss',
})
export class AmbientSparklesComponent implements OnInit {
  @Input() count = 36;

  sparkles: Sparkle[] = [];

  ngOnInit(): void {
    this.sparkles = Array.from({ length: this.count }, (_, i) => ({
      left: (i * 29 + 7) % 100,
      delay: ((i * 13) % 60) / 10,
      duration: 5 + ((i * 7) % 65) / 10,
      size: i % 5 === 0 ? 7 + (i % 3) * 2 : 2 + (i % 4),
      color: PARTY_COLORS[i % PARTY_COLORS.length],
      star: i % 5 === 0,
    }));
  }
}
