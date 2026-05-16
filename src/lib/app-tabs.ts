export const HUB_NAV_TABS = ['questions', 'concepts', 'guide', 'secteurs', 'progress'] as const;

/** Onglets affichés dans la navigation principale */
export type HubNavTab = (typeof HUB_NAV_TABS)[number];

export const APP_TABS = HUB_NAV_TABS;

export type AppTab = HubNavTab;

export const DEFAULT_APP_TAB: HubNavTab = 'guide';

export function isAppTab(value: unknown): value is AppTab {
  return typeof value === 'string' && (APP_TABS as readonly string[]).includes(value);
}

export function isHubNavTab(value: unknown): value is HubNavTab {
  return typeof value === 'string' && (HUB_NAV_TABS as readonly string[]).includes(value);
}

/** Alias conservé pour compatibilité — tous les onglets sont désormais visibles dans la nav */
export function normalizeHubTab(tab: AppTab): HubNavTab {
  return isHubNavTab(tab) ? tab : DEFAULT_APP_TAB;
}
