const TARGET_BANKS_KEY = 'financeprep-target-banks';
const OPEN_TARGETS_KEY = 'financeprep-open-targets-filter';

function readIds (): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(TARGET_BANKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function writeIds (ids: string[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TARGET_BANKS_KEY, JSON.stringify(ids));
}

export function getTargetBankIds (): string[] {
  return readIds();
}

export function isTargetBank (id: string): boolean {
  return readIds().includes(id);
}

export function toggleTargetBank (id: string): string[] {
  const ids = readIds();
  const next = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
  writeIds(next);
  return next;
}

export function requestOpenTargetsFilter () {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(OPEN_TARGETS_KEY, '1');
}

export function consumeOpenTargetsFilter (): boolean {
  if (typeof window === 'undefined') return false;
  const flag = sessionStorage.getItem(OPEN_TARGETS_KEY);
  if (flag) {
    sessionStorage.removeItem(OPEN_TARGETS_KEY);
    return true;
  }
  return false;
}
