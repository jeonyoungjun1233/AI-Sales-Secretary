import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
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

const VERCEL_TARGETS = [
  { environment: "production" },
  { environment: "development" },
  ...(process.env.VERCEL_PREVIEW_BRANCH
    ? [{ environment: "preview", branch: process.env.VERCEL_PREVIEW_BRANCH }]
    : []),
];
const envPath = path.join(process.cwd(), ".env.local");
const npxCommand = process.platform === "win32" ? "cmd.exe" : "npx";
const nodeOptions = getNodeOptionsWithHostnamePatch();

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

function redact(text, values) {
  let nextText = text || "";

  for (const value of values) {
    if (value) {
      nextText = nextText.split(value).join("[hidden]");
    }
  }

  return nextText;
}

function runVercel(args, options = {}) {
  const commandArgs =
    process.platform === "win32"
      ? ["/d", "/s", "/c", "npx", "vercel", ...args]
      : ["vercel", ...args];

  return spawnSync(npxCommand, commandArgs, {
    cwd: process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      NODE_OPTIONS: nodeOptions,
      VERCEL_TELEMETRY_DISABLED: "1",
    },
    input: options.input,
    shell: false,
    stdio: ["pipe", "pipe", "pipe"],
  });
}

function getNodeOptionsWithHostnamePatch() {
  if (process.platform !== "win32") {
    return process.env.NODE_OPTIONS || "";
  }

  const patchPath = path.join(os.tmpdir(), "vercel-hostname-patch.cjs");

  writeFileSync(
    patchPath,
    "const os = require('node:os'); os.hostname = () => 'junyj-laptop';\n",
    "ascii",
  );

  return [process.env.NODE_OPTIONS, `--require=${patchPath}`]
    .filter(Boolean)
    .join(" ");
}

function printFailure(title, result, values) {
  console.error(title);

  if (result.error) {
    console.error(result.error.message);
  }

  const output = redact(`${result.stdout || ""}${result.stderr || ""}`, values)
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .slice(0, 6)
    .join("\n");

  if (output) {
    console.error(output);
  }
}

if (!existsSync(envPath)) {
  console.error(".env.local 파일을 찾을 수 없습니다.");
  console.error("먼저 프로젝트 루트에 필요한 환경변수를 저장해주세요.");
  process.exit(1);
}

const envValues = parseEnvFile(envPath);
const hasSupabasePublicKey = SUPABASE_PUBLIC_KEY_ALIASES.some((key) =>
  Boolean(envValues.get(key)),
);
const missingKeys = REQUIRED_ENV_KEYS.filter((key) => !envValues.get(key));

if (!hasSupabasePublicKey) {
  missingKeys.push("SUPABASE_PUBLIC_KEY");
}

if (missingKeys.length > 0) {
  console.error("필수 환경변수가 누락되었습니다.");
  for (const key of missingKeys) {
    console.error(`${key}: MISSING`);
  }
  process.exit(1);
}

const envKeysToSync = [
  ...REQUIRED_ENV_KEYS,
  ...SUPABASE_PUBLIC_KEY_ALIASES.filter((key) => envValues.get(key)),
  ...SUPABASE_SERVER_KEY_ALIASES.filter((key) => envValues.get(key)),
];
const secretValues = envKeysToSync.map((key) => envValues.get(key));
const whoami = runVercel(["whoami"]);

if (whoami.status !== 0) {
  printFailure("Vercel CLI 로그인이 필요합니다. 먼저 `npx vercel login`을 실행해주세요.", whoami, secretValues);
  process.exit(1);
}

const envList = runVercel(["env", "ls"]);

if (envList.status !== 0) {
  printFailure("Vercel 프로젝트 연결이 필요합니다. 먼저 `npx vercel link`를 실행해주세요.", envList, secretValues);
  process.exit(1);
}

console.log("Vercel CLI 로그인과 프로젝트 연결을 확인했습니다.");

for (const key of envKeysToSync) {
  for (const target of VERCEL_TARGETS) {
    const value = envValues.get(key);
    const branchArgs = target.branch ? [target.branch] : [];

    runVercel(["env", "rm", key, target.environment, ...branchArgs, "--yes"]);

    const addResult = runVercel(
      ["env", "add", key, target.environment, ...branchArgs, "--yes"],
      {
        input: `${value}\n`,
      },
    );
    const targetLabel = target.branch
      ? `${target.environment}/${target.branch}`
      : target.environment;

    if (addResult.status !== 0) {
      printFailure(`${key} ${targetLabel}: FAILED`, addResult, secretValues);
      process.exit(1);
    }

    console.log(`${key} ${targetLabel}: OK`);
  }
}

console.log("Vercel 환경변수 동기화가 완료되었습니다.");
