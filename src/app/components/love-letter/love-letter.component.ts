import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LOVE_LETTER, SITE } from '../../core/content.config';
import { AmbientSparklesComponent } from '../../shared/ambient-sparkles/ambient-sparkles.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-love-letter',
  standalone: true,
  imports: [CommonModule, RevealDirective, AmbientSparklesComponent],
  templateUrl: './love-letter.component.html',
  styleUrl: './love-letter.component.scss',
})
export class LoveLetterComponent {
  letter = LOVE_LETTER;
  name = SITE.name;
  opened = false;

  open(): void {
    this.opened = true;
  }
}
