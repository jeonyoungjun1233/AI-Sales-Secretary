const OWNER_KEY_STORAGE_KEY = "ai-boss-sales-agent:owner-key";

export function getOwnerKey() {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(OWNER_KEY_STORAGE_KEY);
}

export function ensureOwnerKey() {
  if (!isBrowser()) {
    return null;
  }

  const existingOwnerKey = getOwnerKey();

  if (existingOwnerKey) {
    return existingOwnerKey;
  }

  const nextOwnerKey = createOwnerKey();

  window.localStorage.setItem(OWNER_KEY_STORAGE_KEY, nextOwnerKey);

  return nextOwnerKey;
}

export function clearOwnerKeyForTesting() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(OWNER_KEY_STORAGE_KEY);
}

function createOwnerKey() {
  if (window.crypto?.randomUUID) {
    return `owner-${window.crypto.randomUUID()}`;
  }

  return `owner-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isBrowser() {
  return typeof window !== "undefined";
}
