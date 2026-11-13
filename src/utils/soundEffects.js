// Synthesized Web Audio API Sound Effects (Zero external file dependencies)
// Recreates the iconic MSN Messenger "Online / Sign-in" chime

let audioCtx = null;
let isSoundEnabled = true;

export function toggleSound(enabled) {
  if (typeof enabled === 'boolean') {
    isSoundEnabled = enabled;
  } else {
    isSoundEnabled = !isSoundEnabled;
  }
  return isSoundEnabled;
}

export function getSoundStatus() {
  return isSoundEnabled;
}

/**
 * Plays the classic MSN Messenger sign-in chime:
 * A cheerful two-tone chime (G5 -> D6) with gentle sine envelope
 */
export function playMsnNotificationSound() {
  if (!isSoundEnabled) return;

  try {
    if (typeof window === 'undefined') return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // --- TONE 1: G5 (783.99 Hz) ---
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(784, now);

    // Attack and decay envelope
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    // --- TONE 2: D6 (1174.66 Hz) ---
    const startTime2 = now + 0.10;
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1175, startTime2);

    // Attack and decay envelope
    gain2.gain.setValueAtTime(0.0001, startTime2);
    gain2.gain.exponentialRampToValueAtTime(0.22, startTime2 + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime2 + 0.35);

    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(startTime2);
    osc2.stop(startTime2 + 0.35);

  } catch (error) {
    // Audio autoplay restrictions might silently suppress until user interacts
    console.debug('[IPSUR Sound] Aviso de reproducción:', error);
  }
}
