import { getCalendarEvents } from "@/lib/storage/calendarStore";
import { getFaqs } from "@/lib/storage/faqStore";
import { getRecentGenerations } from "@/lib/storage/generationHistoryStore";
import { getBusinessProfile } from "@/lib/storage/businessProfileStore";
import type { GenerateContext } from "./types";

export function getGenerationContext(): GenerateContext {
  const todayKey = getTodayDateKey();

  return {
    businessProfile: getBusinessProfile(),
    faqs: getFaqs()
      .slice(0, 8)
      .map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      })),
    todayEvents: getCalendarEvents()
      .filter((event) => event.date === todayKey)
      .slice(0, 6)
      .map((event) => ({
        title: event.title,
        time: event.time,
        type: event.type,
        memo: event.memo,
      })),
    recentGenerations: getRecentGenerations(4).map((generation) => ({
      type: generation.type,
      title: generation.title,
      output: generation.output,
    })),
  };
}

function getTodayDateKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}
