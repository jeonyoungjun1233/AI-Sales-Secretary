import { ensureOwnerKey } from "@/lib/storage/ownerKey";

import {
  clearSession,
  getStoredSession,
  refreshSessionIfNeeded,
  signOut,
} from "./supabaseAuthClient";
import type { AuthState } from "./types";

const ACCOUNT_KEY_PREFIX = "account";

export function getAuthState(): AuthState {
  const session = getStoredSession();

  return {
    user: session?.user ?? null,
    session,
    signedIn: Boolean(session?.user),
  };
}

export function getAccountOwnerKey() {
  const session = getStoredSession();

  if (session?.user.id) {
    return `${ACCOUNT_KEY_PREFIX}-${session.user.id}`;
  }

  return ensureOwnerKey();
}

export function isSignedIn() {
  return Boolean(getStoredSession()?.user);
}

export async function refreshAuthState() {
  await refreshSessionIfNeeded();

  return getAuthState();
}

export async function signOutAndClearAuth() {
  await signOut();
  clearSession();

  return getAuthState();
}

export function getAccountLabel() {
  const session = getStoredSession();

  if (session?.user.email) {
    return session.user.email;
  }

  return "체험 중";
}
