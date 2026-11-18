const MINIMUM_COPYRIGHT_YEAR = 2026;

export function getCopyrightYear(now: Date = new Date()): number {
  return Math.max(MINIMUM_COPYRIGHT_YEAR, now.getFullYear());
}

/**
 * Returns milliseconds remaining until the next local New Year (Jan 1, 00:00:00.050).
 */
export function msUntilNextYear(now: Date = new Date()): number {
  const nextYearStart = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 50);
  const diff = nextYearStart.getTime() - now.getTime();
  return Math.max(1000, diff);
}
