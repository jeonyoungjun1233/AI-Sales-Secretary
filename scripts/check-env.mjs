import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const REQUIRED_ENV_KEYS = [
  "OPENAI_API_KEY",
  "AI_PROVIDER",
  "OPENAI_MODEL",
  "NEXT_PUBLIC_SUPABASE_URL",
];
const SUPABASE_PUBLIC_KEY_ALIASES = [
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
];
const SUPABASE_SERVER_KEY_ALIASES = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SECRET_KEY",
];

const envPath = path.join(process.cwd(), ".env.local");

function parseEnvFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const entries = new Map();

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    entries.set(key, value);
  }

  return entries;
}

if (!existsSync(envPath)) {
  console.log(".env.local: MISSING");
  process.exitCode = 1;
} else {
  const envValues = parseEnvFile(envPath);
  let hasMissingValue = false;

  console.log(".env.local: OK");

  for (const key of REQUIRED_ENV_KEYS) {
    const value = envValues.get(key);
    const status = value ? "OK" : "MISSING";

    console.log(`${key}: ${status}`);

    if (!value) {
      hasMissingValue = true;
    }
  }

  const hasSupabasePublicKey = SUPABASE_PUBLIC_KEY_ALIASES.some((key) =>
    Boolean(envValues.get(key)),
  );
  const hasSupabaseServerKey = SUPABASE_SERVER_KEY_ALIASES.some((key) =>
    Boolean(envValues.get(key)),
  );

  console.log(
    `SUPABASE_PUBLIC_KEY: ${hasSupabasePublicKey ? "OK" : "MISSING"}`,
  );
  console.log(
    `SUPABASE_SERVER_KEY: ${hasSupabaseServerKey ? "OK" : "OPTIONAL_MISSING"}`,
  );

  if (!hasSupabasePublicKey) {
    hasMissingValue = true;
  }

  if (hasMissingValue) {
    process.exitCode = 1;
  }
}
