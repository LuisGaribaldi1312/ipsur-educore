// Synthesized Web Audio API Sound Effects (Zero external file dependencies)
// Professional, refined acoustic chime inspired by the classic MSN Messenger "Online" alert

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
 * Plays a crystalline, professional two-tone chime (G5 -> D6)
 * Recreates the beloved MSN sign-in sound with velvety harmonic overtone and gentle decay.
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

    // Master Low-pass filter to remove digital harshness and give a warm, organic mallet timbre
    const masterFilter = audioCtx.createBiquadFilter();
    masterFilter.type = 'lowpass';
    masterFilter.frequency.setValueAtTime(2800, now);
    masterFilter.Q.setValueAtTime(1.0, now);

    // Discreet, pleasant master volume
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.09, now);

    masterFilter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    // Helper: Plays a smooth harmonic mallet note
    const playChimeNote = (freq, startTime, duration, peakGain) => {
      // Fundamental pure sine wave
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, startTime);

      gain1.gain.setValueAtTime(0.0001, startTime);
      gain1.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.012);
      gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc1.connect(gain1);
      gain1.connect(masterFilter);

      osc1.start(startTime);
      osc1.stop(startTime + duration);

      // Soft harmonic triangle overtone (octave) for crystalline acoustic depth
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, startTime);

      gain2.gain.setValueAtTime(0.0001, startTime);
      gain2.gain.exponentialRampToValueAtTime(peakGain * 0.20, startTime + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + (duration * 0.5));

      osc2.connect(gain2);
      gain2.connect(masterFilter);

      osc2.start(startTime);
      osc2.stop(startTime + (duration * 0.5));
    };

    // Note 1: G5 (784 Hz) - Warm first chime
    playChimeNote(784, now, 0.14, 0.70);

    // Note 2: D6 (1175 Hz) - Crystalline upper fifth MSN chime
    playChimeNote(1175, now + 0.075, 0.32, 0.85);

  } catch (error) {
    // Autoplay policy or muted context silently handled
    console.debug('[IPSUR Sound] Aviso de reproducción:', error);
  }
}
