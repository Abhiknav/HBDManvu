import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import confetti from 'canvas-confetti';
import { SCRATCH } from '../../core/content.config';
import { AmbientSparklesComponent } from '../../shared/ambient-sparkles/ambient-sparkles.component';
import { RevealDirective } from '../../shared/reveal.directive';

const REVEAL_THRESHOLD = 0.5;

@Component({
  selector: 'app-scratch-reveal',
  standalone: true,
  imports: [CommonModule, RevealDirective, AmbientSparklesComponent],
  templateUrl: './scratch-reveal.component.html',
  styleUrl: './scratch-reveal.component.scss',
})
export class ScratchRevealComponent implements AfterViewInit, OnDestroy {
  content = SCRATCH;
  revealed = false;
  photoBroken = false;

  @ViewChild('canvasEl') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('wrap') wrapRef!: ElementRef<HTMLElement>;

  private ctx?: CanvasRenderingContext2D;
  private drawing = false;
  private boundResize = () => this.setupCanvas();

  ngAfterViewInit(): void {
    this.setupCanvas();
    window.addEventListener('resize', this.boundResize);
  }

  private setupCanvas(): void {
    if (this.revealed) return;
    const canvas = this.canvasRef.nativeElement;
    const rect = this.wrapRef.nativeElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#d4a017');
    grad.addColorStop(0.5, '#f7c948');
    grad.addColorStop(1, '#b8860b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(46, 26, 18, 0.55)';
    ctx.font = '600 18px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('scratch here', canvas.width / 2, canvas.height / 2);
  }

  private pointFromEvent(event: MouseEvent | TouchEvent): { x: number; y: number } {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const point = 'touches' in event ? event.touches[0] : event;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  onStart(event: MouseEvent | TouchEvent): void {
    if (this.revealed) return;
    event.preventDefault();
    this.drawing = true;
    this.scratchAt(this.pointFromEvent(event));
  }

  onMove(event: MouseEvent | TouchEvent): void {
    if (!this.drawing || this.revealed) return;
    event.preventDefault();
    this.scratchAt(this.pointFromEvent(event));
  }

  onEnd(): void {
    if (!this.drawing) return;
    this.drawing = false;
    this.checkProgress();
  }

  private scratchAt(point: { x: number; y: number }): void {
    if (!this.ctx) return;
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, 28, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private checkProgress(): void {
    if (!this.ctx || this.revealed) return;
    const canvas = this.canvasRef.nativeElement;
    const data = this.ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const step = 12;
    let cleared = 0;
    let total = 0;

    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        total++;
        const alphaIndex = (y * canvas.width + x) * 4 + 3;
        if (data[alphaIndex] < 40) cleared++;
      }
    }

    if (total > 0 && cleared / total > REVEAL_THRESHOLD) {
      this.reveal();
    }
  }

  reveal(): void {
    if (this.revealed) return;
    this.revealed = true;
    confetti({
      particleCount: 70,
      spread: 90,
      startVelocity: 34,
      colors: ['#f7c948', '#f0508a', '#17a8a0', '#9b5de5'],
      origin: { y: 0.6 },
    });
  }

  onPhotoError(): void {
    this.photoBroken = true;
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.boundResize);
  }
}
