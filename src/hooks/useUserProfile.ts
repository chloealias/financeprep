import { useCallback, useEffect, useState } from "react";
import { PROFILE_UPDATED_EVENT } from "@/lib/profile-events";
import { applyProfileAccentTheme } from "@/lib/profile-cosmetics";
import { DEFAULT_PROFILE, loadProfile, saveProfile, type UserProfile } from "@/lib/profile-storage";

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const refresh = useCallback(() => {
    setProfile(loadProfile());
  }, []);

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener(PROFILE_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(PROFILE_UPDATED_EVENT, onUpdate);
  }, [refresh]);

  useEffect(() => {
    applyProfileAccentTheme(profile.accentThemeId);
  }, [profile.accentThemeId]);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    const next = { ...loadProfile(), ...patch };
    saveProfile(next);
    setProfile(next);
  }, []);

  return { profile, updateProfile, refresh };
}
