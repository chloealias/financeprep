## Refonte de l'onglet « Ma progression »

Objectif : page plus courte, lisible, actionnable et alignée sur la charte bleu marine du reste de l'app. Suppression des accents rouge / orange / emerald / indigo / amber qui rendent l'écran bruyant.

### 1. Direction visuelle

- Palette unique : déclinaisons de `blue-50 → blue-950` + accent doré uniquement pour les étoiles (cohérent avec le reste de l'app).
- Suppression de tous les `red-*`, `orange-*`, `emerald-*`, `indigo-*` dans cette page.
- Statuts traduits par **intensité de bleu** + iconographie :
  - Acquis (≥ 4★) → bleu marine plein
  - En cours (1–3★) → bleu medium
  - Non vue → bleu très clair / outline
- Cartes : fond blanc, bordure `blue-100`, ombre douce, coins `rounded-2xl`. Plus de bordures épaisses `border-2`.
- Typo : on garde `font-serif` pour les titres, `font-light` pour le corps, conformément au reste.

### 2. Nouvelle structure de la page (du haut vers le bas)

```text
┌───────────────────────────────────────────────┐
│ En-tête : « Ma progression »                  │
│ + barre de progression globale (1 seule)      │
│   ▓▓▓▓▓▓▓░░░░  62 % maîtrisé · 48/120 notées │
└───────────────────────────────────────────────┘

┌─── Bloc 1 : Reprendre où vous en êtes ──────┐
│  CTA primaire : « Reprendre les questions à │
│  retravailler » → questions, filtre ≤2★     │
│  CTA secondaire : « Découvrir les non vues »│
│  → questions, filtre = non notées            │
└──────────────────────────────────────────────┘

┌─── Bloc 2 : Vue d'ensemble (compact) ───────┐
│  3 chiffres clés en ligne, sans cartes :    │
│  120 questions · 48 notées · 22 maîtrisées  │
│  Mini distribution étoiles (sparkline-like) │
└──────────────────────────────────────────────┘

┌─── Bloc 3 : Par catégorie ──────────────────┐
│  Liste cliquable, 1 ligne par catégorie :   │
│  [icône] Catégorie       8/12   ▓▓▓▓▓░░ 67%│
│  Tap → questions filtrées sur la catégorie  │
└──────────────────────────────────────────────┘

Lien discret « Réinitialiser mes notes » en pied
```

### 3. Détail des changements

**Header**
- Suppression du paragraphe d'instructions long ; remplacement par une barre de progression globale (maîtrisées / total) avec libellé court à droite.

**KPIs**
- Les 4 grosses cartes deviennent une **ligne récapitulative** sobre `notées · maîtrisées · moyenne` + 5 mini-barres pour la distribution d'étoiles, dans un seul bloc.
- Suppression de la carte sombre dégradée et de la carte verte.

**Reprendre**
- Nouveau bloc en haut (sous le header) avec 2 boutons :
  - « Reprendre les questions à revoir » → `setRatingFilter('low')` (à ajouter si besoin) ou filtre ≤2★, puis `setActivePage('questions')`.
  - « Découvrir les questions non vues » → filtre = non notées.
- Affiche le compte associé (ex : « 7 questions »).

**Par catégorie**
- Lignes denses (h ≈ 56 px) au lieu de cartes ; barre de progression fine ; chevron à droite.
- Tri par % de maîtrise décroissant pour mettre en avant ce qui avance.

**Listes « à revoir » / « à découvrir »**
- Supprimées de la page (remplacées par les CTA du bloc 1) → moins de redondance, page nettement plus courte.

**Reset**
- Lien texte sobre, couleur `blue-600` souligné, sans rouge.

### 4. Notes techniques (pour l'implémentation)

- Modifier uniquement le composant `ProgressPage` (lignes 2574–2761 de `src/components/FinanceInterviewGuide.tsx`).
- Aucun changement de données ni de props : on réutilise `questions`, `ratings`, `categories`, `setActivePage`, `setActiveCategory`, `setRatingFilter`, `onReset`.
- Pour le filtre « ≤ 2★ » et « non notées » : vérifier si `ratingFilter` supporte déjà ces valeurs ; sinon adapter la logique de filtrage existante dans la page Questions (extension mineure, isolée).
- Garder l'accessibilité : barres de progression avec `role="progressbar"` + `aria-valuenow` ; boutons CTA avec `aria-label` explicites.
- Responsive : grille `grid-cols-1 md:grid-cols-3` pour les KPIs compacts ; lignes catégories pleine largeur sur mobile.
