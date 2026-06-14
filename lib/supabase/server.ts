import type { StorageResource, SupabaseStorageRow } from "@/lib/supabase/types";

const tableByResource: Record<StorageResource, string> = {
  "business-profile": "app_business_profiles",
  faqs: "app_faqs",
  "calendar-events": "app_calendar_events",
  generations: "app_generations",
};

export const storageResources = Object.keys(
  tableByResource,
) as StorageResource[];

type SupabaseConfig = {
  restUrl: string;
  key: string;
  usesServerKey: boolean;
};

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super("Supabase storage is not configured.");
  }
}

export class SupabaseStorageError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function getSupabaseStorageStatus() {
  const config = getSupabaseConfig();

  return {
    configured: Boolean(config),
    usesServerKey: Boolean(config?.usesServerKey),
    resources: storageResources,
  };
}

export function isStorageResource(value: string): value is StorageResource {
  return value in tableByResource;
}

export async function listStorageItems<TResource extends StorageResource>(
  resource: TResource,
) {
  const rows = await supabaseRequest<SupabaseStorageRow<unknown>[]>(
    resource,
    "",
    {
      method: "GET",
    },
  );

  return rows.map((row) => row.payload);
}

export async function upsertStorageItem<TResource extends StorageResource>(
  resource: TResource,
  id: string,
  payload: unknown,
) {
  const rows = await supabaseRequest<SupabaseStorageRow<unknown>[]>(
    resource,
    "?on_conflict=id",
    {
      method: "POST",
      body: JSON.stringify({
        id,
        payload,
        updated_at: new Date().toISOString(),
      }),
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
    },
  );

  return rows[0]?.payload ?? payload;
}

export async function deleteStorageItem(
  resource: StorageResource,
  id: string,
) {
  await supabaseRequest(resource, `?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      Prefer: "return=minimal",
    },
  });
}

async function supabaseRequest<TResponse = unknown>(
  resource: StorageResource,
  query: string,
  init: RequestInit = {},
) {
  const config = getSupabaseConfig();

  if (!config) {
    throw new SupabaseNotConfiguredError();
  }

  const response = await fetch(
    `${config.restUrl}/${tableByResource[resource]}${query}`,
    {
      ...init,
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    },
  );

  const text = await response.text();
  const data = text ? safeJson(text) : null;

  if (!response.ok) {
    throw new SupabaseStorageError(
      response.status,
      getSupabaseErrorMessage(data),
      getSupabaseErrorCode(data),
    );
  }

  return data as TResponse;
}

function getSupabaseConfig(): SupabaseConfig | null {
  const rawUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "";

  if (!rawUrl || !key) {
    return null;
  }

  return {
    restUrl: `${normalizeSupabaseUrl(rawUrl)}/rest/v1`,
    key,
    usesServerKey: Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY,
    ),
  };
}

function normalizeSupabaseUrl(value: string) {
  return value.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

function safeJson(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
}

function getSupabaseErrorMessage(value: unknown) {
  if (isRecord(value) && typeof value.message === "string") {
    return value.message;
  }

  return "Supabase request failed.";
}

function getSupabaseErrorCode(value: unknown) {
  if (isRecord(value) && typeof value.code === "string") {
    return value.code;
  }

  return undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
