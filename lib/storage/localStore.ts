const STORAGE_PREFIX = "ai-boss-sales-agent";

export function isBrowser() {
  return typeof window !== "undefined";
}

export function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getItem<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  return safeParse<T>(window.localStorage.getItem(getStorageKey(key)), fallback);
}

export function setItem<T>(key: string, value: T) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(getStorageKey(key), JSON.stringify(value));
}

export function removeItem(key: string) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(getStorageKey(key));
}

function getStorageKey(key: string) {
  return `${STORAGE_PREFIX}:${key}`;
}
