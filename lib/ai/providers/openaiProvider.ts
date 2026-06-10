import type { AiProvider } from "../types";

export const openaiProvider: AiProvider = {
  async generate() {
    // TODO: After user approval, connect this provider through a server-side
    // route or server action with environment-managed credentials.
    throw new Error("Real text generation provider is not connected yet.");
  },
};
