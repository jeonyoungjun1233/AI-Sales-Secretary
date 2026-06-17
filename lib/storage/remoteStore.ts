import type {
  StoredBusinessProfile,
  StoredCalendarEvent,
  StoredFaq,
  StoredGeneration,
} from "@/lib/storage/types";
import { getAccountOwnerKey } from "@/lib/auth/authStore";
import { getAuthHeader } from "@/lib/auth/supabaseAuthClient";

type ListResponse<TItem> = {
  storage?: string;
  items?: TItem[];
};

type ItemResponse<TItem> = {
  storage?: string;
  item?: TItem | null;
};

export async function getRemoteBusinessProfile() {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return null;
  }

  const data = await requestRemote<ItemResponse<StoredBusinessProfile>>(
    withOwnerKey("/api/storage/business-profile", ownerKey),
  );

  return data?.item ?? null;
}

export async function saveRemoteBusinessProfile(
  profile: StoredBusinessProfile,
) {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return null;
  }

  const data = await requestRemote<ItemResponse<StoredBusinessProfile>>(
    "/api/storage/business-profile",
    {
      method: "POST",
      body: JSON.stringify({ ownerKey, item: profile }),
    },
  );

  return data?.item ?? null;
}

export async function getRemoteFaqs() {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return [];
  }

  const data = await requestRemote<ListResponse<StoredFaq>>(
    withOwnerKey("/api/storage/faqs", ownerKey),
  );

  return data?.items ?? [];
}

export async function saveRemoteFaq(faq: StoredFaq) {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return null;
  }

  const data = await requestRemote<ItemResponse<StoredFaq>>("/api/storage/faqs", {
    method: "POST",
    body: JSON.stringify({ ownerKey, item: faq }),
  });

  return data?.item ?? null;
}

export async function getRemoteCalendarEvents() {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return [];
  }

  const data = await requestRemote<ListResponse<StoredCalendarEvent>>(
    withOwnerKey("/api/storage/calendar-events", ownerKey),
  );

  return data?.items ?? [];
}

export async function saveRemoteCalendarEvent(event: StoredCalendarEvent) {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return null;
  }

  const data = await requestRemote<ItemResponse<StoredCalendarEvent>>(
    "/api/storage/calendar-events",
    {
      method: "POST",
      body: JSON.stringify({ ownerKey, item: event }),
    },
  );

  return data?.item ?? null;
}

export async function getRemoteGenerationHistory() {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return [];
  }

  const data = await requestRemote<ListResponse<StoredGeneration>>(
    withOwnerKey("/api/storage/generations", ownerKey),
  );

  return data?.items ?? [];
}

export async function saveRemoteGeneration(generation: StoredGeneration) {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return null;
  }

  const data = await requestRemote<ItemResponse<StoredGeneration>>(
    "/api/storage/generations",
    {
      method: "POST",
      body: JSON.stringify({ ownerKey, item: generation }),
    },
  );

  return data?.item ?? null;
}

export async function deleteRemoteGeneration(id: string) {
  const ownerKey = getAccountOwnerKey();

  if (!ownerKey) {
    return;
  }

  await requestRemote(
    `/api/storage/generations?id=${encodeURIComponent(id)}&ownerKey=${encodeURIComponent(ownerKey)}`,
    {
      method: "DELETE",
    },
  );
}

export function mergeById<TItem extends { id: string }>(
  first: TItem[],
  second: TItem[],
) {
  const map = new Map<string, TItem>();

  for (const item of [...first, ...second]) {
    map.set(item.id, item);
  }

  return Array.from(map.values());
}

async function requestRemote<TResponse>(
  url: string,
  init: RequestInit = {},
) {
  try {
    const headers = new Headers(init.headers);
    const authHeader = getAuthHeader();

    headers.set("Content-Type", "application/json");

    for (const [key, value] of Object.entries(authHeader)) {
      headers.set(key, value);
    }

    const response = await fetch(url, {
      ...init,
      headers,
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as TResponse;
  } catch {
    return null;
  }
}

function withOwnerKey(url: string, ownerKey: string) {
  const separator = url.includes("?") ? "&" : "?";

  return `${url}${separator}ownerKey=${encodeURIComponent(ownerKey)}`;
}
