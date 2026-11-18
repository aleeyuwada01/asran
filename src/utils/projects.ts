import type { ClientGroup, ProjectRecord } from '../data/asranData';

export type SortDirection = 'newest' | 'oldest';

export interface ProjectFilterCriteria {
  clientGroup: 'ALL' | ClientGroup;
  destination: 'ALL' | 'Katsina State' | 'Bauchi State';
  query: string;
  sort: SortDirection;
}

export interface ProjectSummaryStats {
  totalProjects: number;
  uniqueClients: number;
  statesCovered: number;
  earliestYear: number | null;
  latestYear: number | null;
}

export function filterAndSortProjects(
  projects: ProjectRecord[],
  criteria: ProjectFilterCriteria
): ProjectRecord[] {
  const normalizedQuery = criteria.query.trim().toLowerCase();

  const filtered = projects.filter((project) => {
    if (criteria.clientGroup !== 'ALL' && project.clientGroup !== criteria.clientGroup) {
      return false;
    }
    if (criteria.destination !== 'ALL' && project.destination !== criteria.destination) {
      return false;
    }
    if (normalizedQuery.length > 0) {
      const searchable = `${project.title} ${project.client} ${project.destination} ${project.year}`.toLowerCase();
      if (!searchable.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (a.year !== b.year) {
      return criteria.sort === 'newest' ? b.year - a.year : a.year - b.year;
    }
    return criteria.sort === 'newest' ? b.serialNo - a.serialNo : a.serialNo - b.serialNo;
  });
}

export function canonicalizeClientName(client: string): string {
  const normalized = client.trim().toLowerCase();
  if (normalized.includes('smedan')) {
    return 'smedan';
  }
  return normalized;
}

export function computeProjectStats(projects: ProjectRecord[]): ProjectSummaryStats {
  if (projects.length === 0) {
    return {
      totalProjects: 0,
      uniqueClients: 0,
      statesCovered: 0,
      earliestYear: null,
      latestYear: null,
    };
  }

  const clientSet = new Set(projects.map((p) => canonicalizeClientName(p.client)));
  const stateSet = new Set(projects.map((p) => p.destination));
  const years = projects.map((p) => p.year);

  return {
    totalProjects: projects.length,
    uniqueClients: clientSet.size,
    statesCovered: stateSet.size,
    earliestYear: Math.min(...years),
    latestYear: Math.max(...years),
  };
}
