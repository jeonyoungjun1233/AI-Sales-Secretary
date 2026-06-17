import { getAccountOwnerKey } from "@/lib/auth/authStore";

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

export function getOwnerItem<T>(key: string, fallback: T): T {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return fallback;
  }

  return getItem<T>(getOwnerScopedKey(ownerKey, key), fallback);
}

export function setOwnerItem<T>(key: string, value: T) {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return;
  }

  setItem(getOwnerScopedKey(ownerKey, key), value);
}

export function removeOwnerItem(key: string) {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return;
  }

  removeItem(getOwnerScopedKey(ownerKey, key));
}

function getStorageKey(key: string) {
  return `${STORAGE_PREFIX}:${key}`;
}

function getOwnerScopedKey(ownerKey: string, key: string) {
  return `${ownerKey}:${key}`;
}
