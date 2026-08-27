import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, inject } from '@angular/core';
import confetti from 'canvas-confetti';
import { FINALE, SITE } from '../../core/content.config';
import { AmbientSparklesComponent } from '../../shared/ambient-sparkles/ambient-sparkles.component';
import { RevealDirective } from '../../shared/reveal.directive';

const CONFETTI_COLORS = ['#f7c948', '#f0508a', '#17a8a0', '#9b5de5', '#e5734f', '#fffdf8'];

@Component({
  selector: 'app-finale',
  standalone: true,
  imports: [CommonModule, RevealDirective, AmbientSparklesComponent],
  templateUrl: './finale.component.html',
  styleUrl: './finale.component.scss',
})
export class FinaleComponent implements AfterViewInit, OnDestroy {
  content = FINALE;
  name = SITE.name;
  age = this.computeAge();

  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private fireworksId?: ReturnType<typeof setInterval>;

  private computeAge(): number {
    const now = new Date();
    let age = now.getFullYear() - SITE.birthYear;
    const beforeBirthdayThisYear = now.getMonth() < 7 || (now.getMonth() === 7 && now.getDate() < 31);
    if (beforeBirthdayThisYear) age -= 1;
    return age;
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.startFireworks();
          } else {
            this.stopFireworks();
          }
        }
      },
      { threshold: 0.3 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private startFireworks(): void {
    if (this.fireworksId) return;
    this.fireworksId = setInterval(() => {
      confetti({
        particleCount: 55,
        startVelocity: 42,
        spread: 360,
        ticks: 200,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: CONFETTI_COLORS,
      });
    }, 900);
  }

  private stopFireworks(): void {
    if (this.fireworksId) {
      clearInterval(this.fireworksId);
      this.fireworksId = undefined;
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.stopFireworks();
  }
}
