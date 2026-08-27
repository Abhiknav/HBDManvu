import { Injectable } from '@angular/core';

/**
 * Tiny synthesized sound effects via the Web Audio API — no audio
 * files needed, so the site works fully offline out of the box.
 */
@Injectable({ providedIn: 'root' })
export class SoundService {
  private ctx?: AudioContext;

  private getCtx(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    return this.ctx;
  }

  /** Quick, bright pop — used when a balloon bursts. */
  pop(): void {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      /* audio is a nice-to-have, never block the experience */
    }
  }

  /** Resume the audio context after a user gesture (autoplay policies). */
  unlock(): void {
    const ctx = this.getCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }
}
