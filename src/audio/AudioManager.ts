class AudioManager {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  playCorrectSound(): void {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const duration = 0.12;
    const gap = 0.12;

    // First beep at 880Hz
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + duration);

    // Second beep at 1320Hz
    const startTime2 = now + gap;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1320, startTime2);
    gain2.gain.setValueAtTime(0.15, startTime2);
    gain2.gain.exponentialRampToValueAtTime(0.001, startTime2 + duration);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(startTime2);
    osc2.stop(startTime2 + duration);
  }

  playIncorrectSound(): void {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // First hit: 220Hz descending to 190Hz
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(220, now);
    osc1.frequency.linearRampToValueAtTime(190, now + 0.1);
    gain1.gain.setValueAtTime(0.1, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.1);

    // Second hit: 180Hz descending to 150Hz
    const startTime2 = now + 0.14;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(180, startTime2);
    osc2.frequency.linearRampToValueAtTime(150, startTime2 + 0.12);
    gain2.gain.setValueAtTime(0.1, startTime2);
    gain2.gain.exponentialRampToValueAtTime(0.001, startTime2 + 0.12);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(startTime2);
    osc2.stop(startTime2 + 0.12);
  }
}

// Use a single AudioContext for the entire app
export const audioManager = new AudioManager();
