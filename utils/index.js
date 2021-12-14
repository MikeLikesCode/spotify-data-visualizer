export function millisecondsToHours(ms) {
  return Math.round((ms / 1000 / 60 / 60) * 100) / 100;
}
