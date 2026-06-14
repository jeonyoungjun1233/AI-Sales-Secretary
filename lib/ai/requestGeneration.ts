import type { GenerateRequest, GenerateResponse } from "./types";

export async function requestGeneration(
  request: GenerateRequest,
): Promise<GenerateResponse> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Generation request failed.");
  }

  const data = (await response.json()) as { result?: GenerateResponse };

  if (!isGenerateResponse(data.result)) {
    throw new Error("Generation response is invalid.");
  }

  return data.result;
}

function isGenerateResponse(value: unknown): value is GenerateResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const result = value as GenerateResponse;

  return (
    typeof result.title === "string" &&
    typeof result.text === "string" &&
    typeof result.savedMinutes === "number" &&
    Array.isArray(result.warnings)
  );
}
