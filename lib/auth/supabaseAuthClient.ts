import type {
  AuthResult,
  AuthSession,
  AuthUser,
  SignInInput,
  SignUpInput,
} from "./types";

const AUTH_SESSION_STORAGE_KEY = "ai-boss-sales-agent:auth-session";

type SupabaseAuthUser = {
  id?: string;
  email?: string;
  created_at?: string;
};

type SupabaseSessionResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  expires_in?: number;
  user?: SupabaseAuthUser | null;
  error?: string;
  error_description?: string;
  message?: string;
};

export async function signUpWithEmail(input: SignUpInput): Promise<AuthResult> {
  if (input.passwordConfirm && input.password !== input.passwordConfirm) {
    throw new Error("비밀번호가 서로 달라요.");
  }

  const data = await requestAuth<SupabaseSessionResponse>("/signup", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
  });
  const session = mapSession(data);
  const user = session?.user ?? mapUser(data.user);

  if (session) {
    saveSession(session);
  }

  return {
    session,
    user,
    message: session
      ? "가입이 완료됐어요."
      : "가입 메일을 확인한 뒤 로그인해주세요.",
  };
}

export async function signInWithEmail(input: SignInInput): Promise<AuthResult> {
  const data = await requestAuth<SupabaseSessionResponse>(
    "/token?grant_type=password",
    {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
    },
  );
  const session = mapSession(data);

  if (!session) {
    throw new Error("이메일 또는 비밀번호를 확인해주세요.");
  }

  saveSession(session);

  return {
    session,
    user: session.user,
    message: "로그인했어요.",
  };
}

export async function signOut() {
  const session = getStoredSession();

  if (session) {
    await requestAuth(
      "/logout",
      {
        method: "POST",
      },
      session.accessToken,
    ).catch(() => null);
  }

  clearSession();
}

export function getStoredSession(): AuthSession | null {
  if (!isBrowser()) {
    return null;
  }

  const value = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    return normalizeSession(JSON.parse(value));
  } catch {
    clearSession();
    return null;
  }
}

export function saveSession(session: AuthSession) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
}

export async function getCurrentUser() {
  const session = await refreshSessionIfNeeded();

  if (!session) {
    return null;
  }

  const data = await requestAuth<SupabaseAuthUser>("/user", {}, session.accessToken);
  const user = mapUser(data);

  if (!user) {
    clearSession();
    return null;
  }

  saveSession({ ...session, user });

  return user;
}

export async function refreshSessionIfNeeded() {
  const session = getStoredSession();

  if (!session) {
    return null;
  }

  const expiresSoon = session.expiresAt * 1000 - Date.now() < 60_000;

  if (!expiresSoon) {
    return session;
  }

  try {
    const data = await requestAuth<SupabaseSessionResponse>(
      "/token?grant_type=refresh_token",
      {
        method: "POST",
        body: JSON.stringify({
          refresh_token: session.refreshToken,
        }),
      },
    );
    const nextSession = mapSession(data);

    if (!nextSession) {
      clearSession();
      return null;
    }

    saveSession(nextSession);
    return nextSession;
  } catch {
    clearSession();
    return null;
  }
}

export function getAuthHeader() {
  const session = getStoredSession();

  if (!session) {
    return {};
  }

  return {
    Authorization: `Bearer ${session.accessToken}`,
  };
}

export function getFriendlyAuthMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "잠시 후 다시 시도해주세요.";
}

async function requestAuth<TResponse>(
  path: string,
  init: RequestInit = {},
  accessToken?: string,
) {
  const config = getSupabaseAuthConfig();

  if (!config) {
    throw new Error("로그인 설정을 확인해주세요.");
  }

  const response = await fetch(`${config.authUrl}${path}`, {
    ...init,
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${accessToken ?? config.anonKey}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await response.text();
  const data = text ? safeJson(text) : {};

  if (!response.ok) {
    throw new Error(getAuthErrorMessage(data));
  }

  return data as TResponse;
}

function getSupabaseAuthConfig() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  if (!rawUrl || !anonKey) {
    return null;
  }

  return {
    authUrl: `${normalizeSupabaseUrl(rawUrl)}/auth/v1`,
    anonKey,
  };
}

function normalizeSupabaseUrl(value: string) {
  return value.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

function mapSession(value: SupabaseSessionResponse): AuthSession | null {
  const user = mapUser(value.user);

  if (!value.access_token || !value.refresh_token || !user) {
    return null;
  }

  return {
    accessToken: value.access_token,
    refreshToken: value.refresh_token,
    expiresAt:
      value.expires_at ??
      Math.floor(Date.now() / 1000) + (value.expires_in ?? 3600),
    user,
  };
}

function normalizeSession(value: unknown): AuthSession | null {
  if (!isRecord(value) || !isRecord(value.user)) {
    return null;
  }

  const user = mapUser(value.user);

  if (
    typeof value.accessToken !== "string" ||
    typeof value.refreshToken !== "string" ||
    typeof value.expiresAt !== "number" ||
    !user
  ) {
    return null;
  }

  return {
    accessToken: value.accessToken,
    refreshToken: value.refreshToken,
    expiresAt: value.expiresAt,
    user,
  };
}

function mapUser(value: unknown): AuthUser | null {
  if (!isRecord(value) || typeof value.id !== "string") {
    return null;
  }

  return {
    id: value.id,
    email: typeof value.email === "string" ? value.email : "",
    createdAt:
      typeof value.created_at === "string"
        ? value.created_at
        : typeof value.createdAt === "string"
          ? value.createdAt
          : new Date().toISOString(),
  };
}

function getAuthErrorMessage(value: unknown) {
  const rawMessage =
    isRecord(value) && typeof value.msg === "string"
      ? value.msg
      : isRecord(value) && typeof value.message === "string"
        ? value.message
        : isRecord(value) && typeof value.error_description === "string"
          ? value.error_description
          : "";
  const normalized = rawMessage.toLowerCase();

  if (
    normalized.includes("invalid") ||
    normalized.includes("credentials") ||
    normalized.includes("password")
  ) {
    return "이메일 또는 비밀번호를 확인해주세요.";
  }

  if (normalized.includes("already") || normalized.includes("registered")) {
    return "이미 가입된 이메일일 수 있어요.";
  }

  if (normalized.includes("email")) {
    return "이메일을 다시 확인해주세요.";
  }

  return "잠시 후 다시 시도해주세요.";
}

function safeJson(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return {};
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
