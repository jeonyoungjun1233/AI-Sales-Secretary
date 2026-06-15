import { getOwnerItem, setOwnerItem } from "./localStore";
import type { StoredFaq } from "./types";

const FAQS_KEY = "faqs";

export function getFaqs(fallback: StoredFaq[] = []) {
  return sortFaqs(getOwnerItem<StoredFaq[]>(FAQS_KEY, fallback));
}

export function addFaq(
  faq: Omit<StoredFaq, "id" | "createdAt"> &
    Partial<Pick<StoredFaq, "id" | "createdAt">>,
) {
  const nextFaq: StoredFaq = {
    ...faq,
    id: faq.id ?? `faq-${Date.now()}`,
    createdAt: faq.createdAt ?? new Date().toISOString(),
  };
  const nextFaqs = [nextFaq, ...getFaqs()];

  setOwnerItem(FAQS_KEY, nextFaqs);

  return nextFaq;
}

export function saveFaqs(faqs: StoredFaq[]) {
  const nextFaqs = sortFaqs(faqs);

  setOwnerItem(FAQS_KEY, nextFaqs);

  return nextFaqs;
}

export function removeFaq(id: string) {
  const nextFaqs = getFaqs().filter((faq) => faq.id !== id);

  setOwnerItem(FAQS_KEY, nextFaqs);

  return nextFaqs;
}

function sortFaqs(faqs: StoredFaq[]) {
  return [...faqs].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
