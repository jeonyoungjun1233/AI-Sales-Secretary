import type { StoredBusinessProfile, StoredCalendarEvent, StoredFaq, StoredGeneration } from "@/lib/storage/types";

export type DailyActionType = "inquiry" | "review" | "promo" | "calendar";

export type DailyActionItem = {
  id: string;
  type: DailyActionType;
  title: string;
  description: string;
  output: string;
  recommendedTime: string;
  canCopy: boolean;
  canSaveToHistory: boolean;
  canAddToCalendar: boolean;
};

export type DailyActionRequest = {
  currentDate?: string;
  businessProfile?: StoredBusinessProfile | null;
  faqs?: StoredFaq[];
  todayEvents?: StoredCalendarEvent[];
  recentGenerations?: StoredGeneration[];
};

export type DailyActionResponse = {
  summaryTitle: string;
  summaryText: string;
  savedMinutes: number;
  actions: DailyActionItem[];
};
