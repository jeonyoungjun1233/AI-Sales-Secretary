import type {
  StoredBusinessProfile,
  StoredCalendarEvent,
  StoredFaq,
  StoredGeneration,
} from "@/lib/storage/types";

export type StorageResource =
  | "business-profile"
  | "faqs"
  | "calendar-events"
  | "generations";

export type StoragePayloadByResource = {
  "business-profile": StoredBusinessProfile;
  faqs: StoredFaq;
  "calendar-events": StoredCalendarEvent;
  generations: StoredGeneration;
};

export type StoragePayload<TResource extends StorageResource> =
  StoragePayloadByResource[TResource];

export type SupabaseStorageRow<TPayload> = {
  id: string;
  payload: TPayload;
  created_at?: string;
  updated_at?: string;
};

