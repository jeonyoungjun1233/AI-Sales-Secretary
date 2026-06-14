import type { GenerateTone, GenerateType } from "@/lib/ai/types";
import type { CalendarEventType } from "@/lib/mockCalendar";

export type StoredGeneration = {
  id: string;
  type: GenerateType;
  title: string;
  input: string;
  output: string;
  tone?: GenerateTone;
  category?: string;
  createdAt: string;
  savedMinutes: number;
  copiedCount: number;
};

export type StoredCalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: CalendarEventType;
  memo?: string;
  createdAt: string;
};

export type StoredFaq = {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
};

export type StoredBusinessProfile = {
  businessName: string;
  businessType: string;
  openingHours: string;
  address: string;
  phone: string;
  mainMenu: string;
  tone: string;
  updatedAt: string;
};

export type SavedWorkSummary = {
  generationCount: number;
  savedMinutesTotal: number;
  todayGenerationCount: number;
  topGenerationType?: GenerateType;
};
