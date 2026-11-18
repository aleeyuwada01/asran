import test from 'node:test';
import assert from 'node:assert/strict';
import { getCopyrightYear, msUntilNextYear } from './date';

test('returns at least 2026 and updates automatically for future years', () => {
  assert.equal(getCopyrightYear(new Date('2025-12-31T23:59:59')), 2026);
  assert.equal(getCopyrightYear(new Date('2026-06-15T12:00:00')), 2026);
  assert.equal(getCopyrightYear(new Date('2027-01-01T00:00:01')), 2027);
  assert.equal(getCopyrightYear(new Date('2030-03-10T09:30:00')), 2030);
});

test('computes positive milliseconds until next local New Year rollover', () => {
  const dec31Late = new Date(2026, 11, 31, 23, 59, 50, 0);
  const ms = msUntilNextYear(dec31Late);
  assert.equal(ms, 10050);

  const midYear = new Date(2026, 5, 1, 0, 0, 0, 0);
  assert.ok(msUntilNextYear(midYear) > 24 * 60 * 60 * 1000);
});
