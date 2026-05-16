export const HUB_NAV_TABS = ['questions', 'concepts', 'guide', 'progress'] as const;

/** Onglets affichés dans la navigation principale */
export type HubNavTab = (typeof HUB_NAV_TABS)[number];

/** Inclut les anciennes URLs (?tab=secteurs) pour compatibilité */
export const APP_TABS = [...HUB_NAV_TABS, 'secteurs'] as const;

export type AppTab = (typeof APP_TABS)[number];

export const DEFAULT_APP_TAB: HubNavTab = 'guide';

export function isAppTab(value: unknown): value is AppTab {
  return typeof value === 'string' && (APP_TABS as readonly string[]).includes(value);
}

export function isHubNavTab(value: unknown): value is HubNavTab {
  return typeof value === 'string' && (HUB_NAV_TABS as readonly string[]).includes(value);
}

/** Redirige les onglets masqués vers un onglet visible */
export function normalizeHubTab(tab: AppTab): HubNavTab {
  if (isHubNavTab(tab)) return tab;
  return DEFAULT_APP_TAB;
}
