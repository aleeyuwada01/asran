import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../data/asranData';
import { computeProjectStats, filterAndSortProjects } from './projects';

test('returns all 13 documented projects sorted newest first by default', () => {
  const result = filterAndSortProjects(PROJECTS, {
    clientGroup: 'ALL',
    destination: 'ALL',
    query: '',
    sort: 'newest',
  });
  assert.equal(result.length, 13);
  assert.equal(result[0].year, 2025);
  assert.equal(result[0].title, 'ACSM Polio Campaign');
  assert.equal(result[result.length - 1].year, 2007);
});

test('filters projects accurately by UNICEF client group', () => {
  const result = filterAndSortProjects(PROJECTS, {
    clientGroup: 'UNICEF',
    destination: 'ALL',
    query: '',
    sort: 'newest',
  });
  assert.equal(result.length, 2);
  assert.deepEqual(
    result.map((p) => p.year),
    [2024, 2021]
  );
});

test('filters projects accurately by Bauchi State destination', () => {
  const result = filterAndSortProjects(PROJECTS, {
    clientGroup: 'ALL',
    destination: 'Bauchi State',
    query: '',
    sort: 'oldest',
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].client, 'Bauchi State Government');
  assert.equal(result[0].year, 2008);
});

test('search query matches client acronym and programme titles case-insensitively', () => {
  const result = filterAndSortProjects(PROJECTS, {
    clientGroup: 'ALL',
    destination: 'ALL',
    query: 'smedan',
    sort: 'oldest',
  });
  assert.equal(result.length, 2);
  assert.equal(result[0].year, 2013);
  assert.equal(result[1].year, 2014);
});

test('computes accurate aggregate statistics for all projects and empty sets', () => {
  const stats = computeProjectStats(PROJECTS);
  assert.equal(stats.totalProjects, 13);
  assert.equal(stats.uniqueClients, 7);
  assert.equal(stats.statesCovered, 2);
  assert.equal(stats.earliestYear, 2007);
  assert.equal(stats.latestYear, 2025);

  const emptyStats = computeProjectStats([]);
  assert.equal(emptyStats.totalProjects, 0);
  assert.equal(emptyStats.earliestYear, null);
  assert.equal(emptyStats.latestYear, null);
});
