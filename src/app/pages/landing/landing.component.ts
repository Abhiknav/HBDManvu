import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LANDING, SITE } from '../../core/content.config';
import { AmbientSparklesComponent } from '../../shared/ambient-sparkles/ambient-sparkles.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, AmbientSparklesComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  content = LANDING;
  name = SITE.name;
  leaving = false;

  private router = inject(Router);

  begin(): void {
    if (this.leaving) return;
    this.leaving = true;
    setTimeout(() => this.router.navigate(['/experience']), 750);
  }
}
