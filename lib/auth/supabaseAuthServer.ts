type SupabaseAuthUserResponse = {
  id?: string;
  email?: string;
};

export async function getAuthenticatedOwnerKey(request: Request) {
  const accessToken = getBearerToken(request);

  if (!accessToken) {
    return null;
  }

  const config = getSupabaseAuthConfig();

  if (!config) {
    return null;
  }

  try {
    const response = await fetch(`${config.authUrl}/user`, {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const user = (await response.json()) as SupabaseAuthUserResponse;

    if (!user.id) {
      return null;
    }

    return `account-${user.id}`;
  } catch {
    return null;
  }
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length).trim();
}

function getSupabaseAuthConfig() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
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
