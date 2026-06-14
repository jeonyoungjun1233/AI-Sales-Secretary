import { mockProvider } from "./providers/mockProvider";
import { openaiProvider } from "./providers/openaiProvider";
import type { GenerateRequest, GenerateResponse } from "./types";

export type AiProviderName = "mock" | "openai";

export async function generateWithAgent(
  request: GenerateRequest,
  providerName: AiProviderName = getConfiguredProviderName(),
): Promise<GenerateResponse> {
  if (providerName === "openai") {
    try {
      return await openaiProvider.generate(request);
    } catch {
      return mockProvider.generate(request);
    }
  }

  return mockProvider.generate(request);
}

function getConfiguredProviderName(): AiProviderName {
  return process.env.AI_PROVIDER === "openai" ? "openai" : "mock";
}
