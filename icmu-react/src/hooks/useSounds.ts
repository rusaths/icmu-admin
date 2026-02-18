const useSounds = () => {
  const playSound = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, context.currentTime);
    
    gain.gain.setValueAtTime(0.1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  };

  return {
    playHover: () => playSound(800, 'sine', 0.05),
    playClick: () => playSound(1200, 'sine', 0.08),
    playSuccess: () => {
      playSound(1000, 'sine', 0.1);
      setTimeout(() => playSound(1500, 'sine', 0.1), 100);
    },
    playError: () => {
      playSound(200, 'square', 0.2);
    }
  };
};

export default useSounds;
