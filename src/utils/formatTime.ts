export function formatTime(time: number, separator = ' : '): string {
  const minutes = String(Math.floor(time / 60));
  const seconds = String(time % 60);

  return `${minutes.padStart(2, `0`)}${separator}${seconds.padStart(2, `0`)}`;
}
