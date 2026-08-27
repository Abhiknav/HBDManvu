import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';

/**
 * Emits how far the host element has been scrolled through the viewport,
 * as a 0..1 progress value. Used to drive scroll-linked animations (the
 * DNA strand twist, the memory wheel rotation) without a heavy scroll
 * library — just a rAF-throttled window scroll listener.
 */
@Directive({
  selector: '[appScrollProgress]',
  standalone: true,
})
export class ScrollProgressDirective implements OnInit, OnDestroy {
  @Output() appScrollProgress = new EventEmitter<number>();

  private el = inject(ElementRef<HTMLElement>);
  private ticking = false;
  private boundOnScroll = () => this.onScroll();

  ngOnInit(): void {
    window.addEventListener('scroll', this.boundOnScroll, { passive: true });
    window.addEventListener('resize', this.boundOnScroll, { passive: true });
    // deferred: emitting synchronously here can land inside the app's very
    // first change-detection pass on a cold bootstrap and trip NG0100
    setTimeout(() => this.onScroll());
  }

  private onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      const rect = this.el.nativeElement.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      let progress: number;
      if (total <= 0) {
        progress = rect.top < vh / 2 ? 1 : 0;
      } else {
        progress = (-rect.top) / total;
      }
      progress = Math.min(1, Math.max(0, progress));
      this.appScrollProgress.emit(progress);
      this.ticking = false;
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.boundOnScroll);
    window.removeEventListener('resize', this.boundOnScroll);
  }
}
