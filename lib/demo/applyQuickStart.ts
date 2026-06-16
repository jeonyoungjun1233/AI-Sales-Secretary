import {
  buildQuickStartTemplate,
  type QuickStartIndustry,
} from "@/lib/demo/quickStartTemplates";
import { saveBusinessProfile } from "@/lib/storage/businessProfileStore";
import { addCalendarEvent } from "@/lib/storage/calendarStore";
import { addFaq } from "@/lib/storage/faqStore";
import { addGenerationHistory } from "@/lib/storage/generationHistoryStore";
import {
  saveRemoteBusinessProfile,
  saveRemoteCalendarEvent,
  saveRemoteFaq,
  saveRemoteGeneration,
} from "@/lib/storage/remoteStore";

export type ApplyQuickStartResult = {
  label: string;
  recommendedFirstAction: string;
  faqCount: number;
  eventCount: number;
  generationCount: number;
};

export async function applyQuickStart(industry: QuickStartIndustry) {
  const template = buildQuickStartTemplate(industry);
  const profile = saveBusinessProfile(template.businessProfile);
  const faqs = template.faqs.map((faq) => addFaq(faq));
  const events = template.calendarEvents.map((event) => addCalendarEvent(event));
  const generations = template.generationHistory.map((generation) =>
    addGenerationHistory(generation),
  );

  await Promise.allSettled([
    saveRemoteBusinessProfile(profile),
    ...faqs.map((faq) => saveRemoteFaq(faq)),
    ...events.map((event) => saveRemoteCalendarEvent(event)),
    ...generations.map((generation) => saveRemoteGeneration(generation)),
  ]);

  return {
    label: template.label,
    recommendedFirstAction: template.recommendedFirstAction,
    faqCount: faqs.length,
    eventCount: events.length,
    generationCount: generations.length,
  } satisfies ApplyQuickStartResult;
}
