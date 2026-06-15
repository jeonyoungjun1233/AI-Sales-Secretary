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
    const errorBody = await readErrorBody(response);

    throw new Error(errorBody.message || "문구를 준비하지 못했어요.");
  }

  const data = (await response.json()) as { result?: GenerateResponse };

  if (!isGenerateResponse(data.result)) {
    throw new Error("Generation response is invalid.");
  }

  return data.result;
}

async function readErrorBody(response: Response) {
  try {
    return (await response.json()) as { message?: string; detail?: string };
  } catch {
    return {};
  }
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
