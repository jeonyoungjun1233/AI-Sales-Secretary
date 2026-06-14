import type {
  StoredBusinessProfile,
  StoredCalendarEvent,
  StoredFaq,
  StoredGeneration,
} from "@/lib/storage/types";

type ListResponse<TItem> = {
  storage?: string;
  items?: TItem[];
};

type ItemResponse<TItem> = {
  storage?: string;
  item?: TItem | null;
};

export async function getRemoteBusinessProfile() {
  const data = await requestRemote<ItemResponse<StoredBusinessProfile>>(
    "/api/storage/business-profile",
  );

  return data?.item ?? null;
}

export async function saveRemoteBusinessProfile(
  profile: StoredBusinessProfile,
) {
  const data = await requestRemote<ItemResponse<StoredBusinessProfile>>(
    "/api/storage/business-profile",
    {
      method: "POST",
      body: JSON.stringify({ item: profile }),
    },
  );

  return data?.item ?? null;
}

export async function getRemoteFaqs() {
  const data = await requestRemote<ListResponse<StoredFaq>>("/api/storage/faqs");

  return data?.items ?? [];
}

export async function saveRemoteFaq(faq: StoredFaq) {
  const data = await requestRemote<ItemResponse<StoredFaq>>("/api/storage/faqs", {
    method: "POST",
    body: JSON.stringify({ item: faq }),
  });

  return data?.item ?? null;
}

export async function getRemoteCalendarEvents() {
  const data = await requestRemote<ListResponse<StoredCalendarEvent>>(
    "/api/storage/calendar-events",
  );

  return data?.items ?? [];
}

export async function saveRemoteCalendarEvent(event: StoredCalendarEvent) {
  const data = await requestRemote<ItemResponse<StoredCalendarEvent>>(
    "/api/storage/calendar-events",
    {
      method: "POST",
      body: JSON.stringify({ item: event }),
    },
  );

  return data?.item ?? null;
}

export async function getRemoteGenerationHistory() {
  const data = await requestRemote<ListResponse<StoredGeneration>>(
    "/api/storage/generations",
  );

  return data?.items ?? [];
}

export async function saveRemoteGeneration(generation: StoredGeneration) {
  const data = await requestRemote<ItemResponse<StoredGeneration>>(
    "/api/storage/generations",
    {
      method: "POST",
      body: JSON.stringify({ item: generation }),
    },
  );

  return data?.item ?? null;
}

export async function deleteRemoteGeneration(id: string) {
  await requestRemote(`/api/storage/generations?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
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
    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as TResponse;
  } catch {
    return null;
  }
}

