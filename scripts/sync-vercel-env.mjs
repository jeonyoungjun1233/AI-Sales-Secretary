import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const REQUIRED_ENV_KEYS = [
  "OPENAI_API_KEY",
  "AI_PROVIDER",
  "OPENAI_MODEL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

const VERCEL_ENVIRONMENTS = ["production", "preview", "development"];
const envPath = path.join(process.cwd(), ".env.local");
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
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
  return spawnSync(npxCommand, ["vercel", ...args], {
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
const missingKeys = REQUIRED_ENV_KEYS.filter((key) => !envValues.get(key));

if (missingKeys.length > 0) {
  console.error("필수 환경변수가 누락되었습니다.");
  for (const key of missingKeys) {
    console.error(`${key}: MISSING`);
  }
  process.exit(1);
}

const secretValues = REQUIRED_ENV_KEYS.map((key) => envValues.get(key));
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

for (const key of REQUIRED_ENV_KEYS) {
  for (const environment of VERCEL_ENVIRONMENTS) {
    const value = envValues.get(key);

    runVercel(["env", "rm", key, environment, "--yes"]);

    const addResult = runVercel(["env", "add", key, environment], {
      input: `${value}\n`,
    });

    if (addResult.status !== 0) {
      printFailure(`${key} ${environment}: FAILED`, addResult, secretValues);
      process.exit(1);
    }

    console.log(`${key} ${environment}: OK`);
  }
}

console.log("Vercel 환경변수 동기화가 완료되었습니다.");
