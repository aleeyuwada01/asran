export const PROGRAMME_AUTO_ADVANCE_MS = 4500;

export function getNextProgrammeIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  const normalized = ((currentIndex % total) + total) % total;
  return (normalized + 1) % total;
}

export function getPrevProgrammeIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  const normalized = ((currentIndex % total) + total) % total;
  return (normalized - 1 + total) % total;
}
