import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BalloonsComponent } from '../../components/balloons/balloons.component';
import { DnaStoryComponent } from '../../components/dna-story/dna-story.component';
import { FinaleComponent } from '../../components/finale/finale.component';
import { LoveLetterComponent } from '../../components/love-letter/love-letter.component';
import { MemoryWheelComponent } from '../../components/memory-wheel/memory-wheel.component';
import { PinterestHeroComponent } from '../../components/pinterest-hero/pinterest-hero.component';
import { ScratchRevealComponent } from '../../components/scratch-reveal/scratch-reveal.component';
import { WishStarsComponent } from '../../components/wish-stars/wish-stars.component';

type NavItem = { id: string; label: string };

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    PinterestHeroComponent,
    DnaStoryComponent,
    BalloonsComponent,
    MemoryWheelComponent,
    WishStarsComponent,
    LoveLetterComponent,
    ScratchRevealComponent,
    FinaleComponent,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  navItems: NavItem[] = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'story', label: 'Her Story' },
    { id: 'balloons', label: 'Balloons' },
    { id: 'memories', label: 'Memories' },
    { id: 'wishes', label: 'Wishes' },
    { id: 'letter', label: 'Letter' },
    { id: 'finale', label: 'Tonight' },
    { id: 'scratch', label: 'Surprise' },
  ];

  activeId = 'welcome';
  private ticking = false;
  private boundOnScroll = () => this.onScroll();

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.boundOnScroll, { passive: true });
    this.onScroll();
  }

  private onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      // some sections (the memory wheel) are much taller than the viewport,
      // so "which section is active" is found via a fixed anchor line
      // rather than intersection ratio, which large sections never satisfy.
      const anchor = window.innerHeight * 0.4;
      let current = this.activeId;
      for (const item of this.navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom > anchor) {
          current = item.id;
          break;
        }
      }
      this.activeId = current;
      this.ticking = false;
    });
  }

  goTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.boundOnScroll);
  }
}
