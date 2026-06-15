import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const TABLES = [
  {
    name: "app_business_profiles",
    select: "id,owner_key",
  },
  {
    name: "app_faqs",
    select: "id,owner_key",
  },
  {
    name: "app_calendar_events",
    select: "id,owner_key,date",
  },
  {
    name: "app_generations",
    select: "id,owner_key,created_at",
  },
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

function normalizeSupabaseUrl(value) {
  return value.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

if (!existsSync(envPath)) {
  console.log(".env.local: MISSING");
  process.exit(1);
}

const envValues = parseEnvFile(envPath);
const rawUrl =
  envValues.get("NEXT_PUBLIC_SUPABASE_URL") || envValues.get("SUPABASE_URL");
const key =
  envValues.get("SUPABASE_SERVICE_ROLE_KEY") ||
  envValues.get("SUPABASE_SECRET_KEY") ||
  envValues.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
  envValues.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

if (!rawUrl || !key) {
  console.log("SUPABASE_CONFIG: MISSING");
  process.exit(1);
}

const restUrl = `${normalizeSupabaseUrl(rawUrl)}/rest/v1`;
let hasMissingTable = false;

console.log("SUPABASE_CONFIG: OK");

for (const table of TABLES) {
  const response = await fetch(
    `${restUrl}/${table.name}?owner_key=eq.day9-check&select=${encodeURIComponent(table.select)}&limit=1`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );

  if (response.ok) {
    console.log(`${table.name}: OK_OWNER_FILTER`);
    continue;
  }

  hasMissingTable = true;
  let code = "UNKNOWN";
  let message = "table or owner filter is not ready";

  try {
    const data = await response.json();

    if (typeof data.code === "string") {
      code = data.code;
    }

    if (typeof data.message === "string") {
      message = toSafeMessage(data.message);
    }
  } catch {
    // Ignore body parsing errors. We only need readiness status here.
  }

  console.log(`${table.name}: NOT_READY (${code}) ${message}`);
}

if (hasMissingTable) {
  console.log(
    "NEXT_STEP: Run supabase/app_storage_schema.sql in the Supabase SQL Editor, then re-run this check.",
  );
  process.exitCode = 1;
}

function toSafeMessage(value) {
  if (value.includes("owner_key")) {
    return "owner separation column is missing";
  }

  if (value.includes("date")) {
    return "calendar date column is missing";
  }

  if (value.includes("schema cache")) {
    return "table is missing from the API schema cache";
  }

  return "storage table is not ready";
}
