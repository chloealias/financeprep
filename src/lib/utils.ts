import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Apple HIG — zone tactile minimale 44×44px (boutons icône, fermer, etc.) */
export const touchTarget = "touch-target";
/** Liens et boutons texte — hauteur min. 44px, largeur au contenu */
export const touchTargetBar = "touch-target-bar";
