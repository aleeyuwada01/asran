import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextProgrammeIndex,
  getPrevProgrammeIndex,
  PROGRAMME_AUTO_ADVANCE_MS,
} from './programmes';

test('advances sequentially through all 7 programmes and wraps back to 01', () => {
  const sequence: number[] = [];
  let idx = 0;
  for (let step = 0; step < 8; step += 1) {
    sequence.push(idx);
    idx = getNextProgrammeIndex(idx, 7);
  }
  assert.deepEqual(sequence, [0, 1, 2, 3, 4, 5, 6, 0]);
});

test('steps backward cleanly and wraps from 01 to 07', () => {
  assert.equal(getPrevProgrammeIndex(0, 7), 6);
  assert.equal(getPrevProgrammeIndex(3, 7), 2);
  assert.equal(getPrevProgrammeIndex(6, 7), 5);
});

test('handles empty totals and positive rotation cadence safely', () => {
  assert.equal(getNextProgrammeIndex(0, 0), 0);
  assert.equal(getPrevProgrammeIndex(0, 0), 0);
  assert.ok(PROGRAMME_AUTO_ADVANCE_MS >= 3000 && PROGRAMME_AUTO_ADVANCE_MS <= 8000);
});
