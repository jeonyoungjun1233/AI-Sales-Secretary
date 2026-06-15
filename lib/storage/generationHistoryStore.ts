import { getOwnerItem, setOwnerItem } from "./localStore";
import type { SavedWorkSummary, StoredGeneration } from "./types";

const GENERATION_HISTORY_KEY = "generation-history";

export function getGenerationHistory() {
  return sortGenerations(
    getOwnerItem<StoredGeneration[]>(GENERATION_HISTORY_KEY, []),
  );
}

export function addGenerationHistory(
  generation: Omit<StoredGeneration, "id" | "createdAt" | "copiedCount"> &
    Partial<Pick<StoredGeneration, "id" | "createdAt" | "copiedCount">>,
) {
  const nextGeneration: StoredGeneration = {
    ...generation,
    id: generation.id ?? `generation-${Date.now()}`,
    createdAt: generation.createdAt ?? new Date().toISOString(),
    copiedCount: generation.copiedCount ?? 0,
  };
  const nextHistory = [nextGeneration, ...getGenerationHistory()].slice(0, 80);

  setOwnerItem(GENERATION_HISTORY_KEY, nextHistory);

  return nextGeneration;
}

export function removeGenerationHistory(id: string) {
  const nextHistory = getGenerationHistory().filter((item) => item.id !== id);

  setOwnerItem(GENERATION_HISTORY_KEY, nextHistory);

  return nextHistory;
}

export function saveGenerationHistory(generations: StoredGeneration[]) {
  const nextHistory = sortGenerations(generations).slice(0, 80);

  setOwnerItem(GENERATION_HISTORY_KEY, nextHistory);

  return nextHistory;
}

export function clearGenerationHistory() {
  setOwnerItem<StoredGeneration[]>(GENERATION_HISTORY_KEY, []);
}

export function getRecentGenerations(limit = 3) {
  return getGenerationHistory().slice(0, limit);
}

export function getSavedMinutesTotal(generations = getGenerationHistory()) {
  return generations.reduce((total, item) => total + item.savedMinutes, 0);
}

export function getSavedWorkSummary(
  generations = getGenerationHistory(),
): SavedWorkSummary {
  const typeCount = generations.reduce<Record<string, number>>((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    return acc;
  }, {});
  const topGenerationType = Object.entries(typeCount).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0] as SavedWorkSummary["topGenerationType"];

  return {
    generationCount: generations.length,
    savedMinutesTotal: getSavedMinutesTotal(generations),
    todayGenerationCount: generations.filter((item) =>
      isToday(item.createdAt),
    ).length,
    topGenerationType,
  };
}

export function increaseCopiedCount(id: string) {
  const nextHistory = getGenerationHistory().map((item) =>
    item.id === id ? { ...item, copiedCount: item.copiedCount + 1 } : item,
  );

  setOwnerItem(GENERATION_HISTORY_KEY, nextHistory);

  return nextHistory;
}

function sortGenerations(generations: StoredGeneration[]) {
  return [...generations].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function isToday(value: string) {
  const target = new Date(value);
  const today = new Date();

  return target.toDateString() === today.toDateString();
}
