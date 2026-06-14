import { getItem, removeItem, setItem } from "./localStore";
import type { StoredBusinessProfile } from "./types";

const BUSINESS_PROFILE_KEY = "business-profile";

export function getBusinessProfile() {
  return getItem<StoredBusinessProfile | null>(BUSINESS_PROFILE_KEY, null);
}

export function saveBusinessProfile(
  profile: Omit<StoredBusinessProfile, "updatedAt"> &
    Partial<Pick<StoredBusinessProfile, "updatedAt">>,
) {
  const nextProfile: StoredBusinessProfile = {
    ...profile,
    updatedAt: profile.updatedAt || new Date().toISOString(),
  };

  setItem(BUSINESS_PROFILE_KEY, nextProfile);

  return nextProfile;
}

export function clearBusinessProfile() {
  removeItem(BUSINESS_PROFILE_KEY);
}
