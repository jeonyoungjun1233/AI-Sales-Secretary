import { mockProvider } from "./providers/mockProvider";
import type { GenerateRequest, GenerateResponse } from "./types";

export type AiProviderName = "mock" | "openai";

export async function generateWithAgent(
  request: GenerateRequest,
  providerName: AiProviderName = "mock",
): Promise<GenerateResponse> {
  if (providerName !== "mock") {
    throw new Error("Requested provider is not connected yet.");
  }

  return mockProvider.generate(request);
}
