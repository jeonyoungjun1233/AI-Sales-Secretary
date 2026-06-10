import type { GenerateType } from "./ai/types";

export type GenerationHistoryItem = {
  id: string;
  type: GenerateType;
  input: string;
  output: string;
  createdAt: string;
  businessId: string;
  savedMinutes: number;
};
