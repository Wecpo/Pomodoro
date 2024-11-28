export const playSound = (soundPath: string, volume: number) => {
  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play().catch((err) => {
    console.error('Ошибка воспроизведения звука:', err);
  });
};
