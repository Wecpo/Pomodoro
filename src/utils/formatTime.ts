export function formatTime(time: number): string {
  const minutes = String(Math.floor(time / 60));
  const seconds = String(time % 60);

  return `${minutes.padStart(2, `0`)} : ${seconds.padStart(2, `0`)}`;
}
