export const PROFILE_UPDATED_EVENT = "finance-profile-updated";

export function notifyProfileUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT));
}
