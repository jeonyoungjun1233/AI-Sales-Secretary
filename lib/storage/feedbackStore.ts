import { getItem, setItem } from "./localStore";

const BETA_FEEDBACK_KEY = "beta-feedback";

type BetaFeedback = {
  wouldUse: string;
  neededFeature: string;
  price: string;
  memo: string;
  createdAt: string;
};

export function addBetaFeedback(feedback: BetaFeedback) {
  const currentItems = getItem<BetaFeedback[]>(BETA_FEEDBACK_KEY, []);

  setItem(BETA_FEEDBACK_KEY, [feedback, ...currentItems].slice(0, 30));
}
