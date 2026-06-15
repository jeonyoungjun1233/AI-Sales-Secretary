import {
  deleteStorageItem,
  getSupabaseStorageStatus,
  isStorageResource,
  listStorageItems,
  SupabaseNotConfiguredError,
  SupabaseStorageError,
  upsertStorageItem,
} from "@/lib/supabase/server";
import type { StorageResource } from "@/lib/supabase/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteParams = {
  params: Promise<{
    resource: string;
  }>;
};

export async function GET(request: Request, context: RouteParams) {
  const { resource } = await context.params;

  if (resource === "status") {
    return Response.json({
      storage: "ready",
      ...getSupabaseStorageStatus(),
    });
  }

  if (!isStorageResource(resource)) {
    return Response.json({ message: "요청을 다시 확인해주세요." }, { status: 404 });
  }

  const ownerKey = getOwnerKeyFromUrl(request.url);

  if (!ownerKey) {
    return Response.json(getEmptyStorageResponse(resource));
  }

  try {
    const items = await listStorageItems(resource, ownerKey);

    if (resource === "business-profile") {
      return Response.json({
        storage: "ready",
        item: items[0] ?? null,
      });
    }

    return Response.json({
      storage: "ready",
      items,
    });
  } catch (error) {
    return handleStorageError(error);
  }
}

export async function POST(request: Request, context: RouteParams) {
  const { resource } = await context.params;

  if (!isStorageResource(resource)) {
    return Response.json({ message: "요청을 다시 확인해주세요." }, { status: 404 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "내용을 다시 확인해주세요." }, { status: 400 });
  }

  const payload = getPayload(body);
  const ownerKey = getOwnerKeyFromBody(body);
  const id = getPayloadId(resource, payload);

  if (!ownerKey) {
    return Response.json(getEmptyStorageResponse(resource));
  }

  if (!payload || !id) {
    return Response.json({ message: "내용을 다시 확인해주세요." }, { status: 400 });
  }

  try {
    const item = await upsertStorageItem(resource, ownerKey, id, payload);

    return Response.json({
      storage: "ready",
      item,
    });
  } catch (error) {
    return handleStorageError(error);
  }
}

export async function DELETE(request: Request, context: RouteParams) {
  const { resource } = await context.params;

  if (!isStorageResource(resource)) {
    return Response.json({ message: "요청을 다시 확인해주세요." }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const ownerKey = searchParams.get("ownerKey");

  if (!ownerKey) {
    return Response.json(getEmptyStorageResponse(resource));
  }

  if (!id) {
    return Response.json({ message: "항목을 다시 확인해주세요." }, { status: 400 });
  }

  try {
    await deleteStorageItem(resource, ownerKey, id);

    return Response.json({
      storage: "ready",
      deleted: true,
    });
  } catch (error) {
    return handleStorageError(error);
  }
}

function getPayload(body: unknown) {
  if (!isRecord(body)) {
    return null;
  }

  return isRecord(body.item) ? body.item : body;
}

function getOwnerKeyFromUrl(url: string) {
  const { searchParams } = new URL(url);
  const ownerKey = searchParams.get("ownerKey");

  return isValidOwnerKey(ownerKey) ? ownerKey : null;
}

function getOwnerKeyFromBody(body: unknown) {
  if (!isRecord(body)) {
    return null;
  }

  const ownerKey = body.ownerKey;

  return isValidOwnerKey(ownerKey) ? ownerKey : null;
}

function getPayloadId(resource: StorageResource, payload: unknown) {
  if (resource === "business-profile") {
    return "profile";
  }

  if (isRecord(payload) && typeof payload.id === "string") {
    return payload.id;
  }

  return null;
}

function getEmptyStorageResponse(resource: StorageResource) {
  if (resource === "business-profile") {
    return {
      storage: "offline",
      item: null,
    };
  }

  return {
    storage: "offline",
    items: [],
  };
}

function handleStorageError(error: unknown) {
  if (error instanceof SupabaseNotConfiguredError) {
    return Response.json({
      storage: "offline",
      item: null,
      items: [],
    });
  }

  if (error instanceof SupabaseStorageError) {
    return Response.json(
      {
        storage: "unavailable",
        item: null,
        items: [],
      },
      {
        status: error.status >= 500 ? 503 : 200,
      },
    );
  }

  return Response.json(
    {
      storage: "unavailable",
      item: null,
      items: [],
    },
    { status: 503 },
  );
}

function isValidOwnerKey(value: unknown): value is string {
  return typeof value === "string" && value.length >= 16 && value.length <= 120;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
