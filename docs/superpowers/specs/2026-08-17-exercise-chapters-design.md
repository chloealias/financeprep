# Exercices : chapitres vides + grille de progression

Date : 2026-08-17  
Statut : validé en conversation, en attente de revue du fichier

## Objectif

Remplacer le catalogue actuel (70 drills, 7 thèmes, listing à plat + filtres + pense-bête) par une grille de 9 chapitres vides, chacun avec un pourcentage d’avancement. Les questions viendront plus tard. Le player n’est pas retravaillé.

## Hors scope

- Rédaction de nouvelles questions
- Refonte de `ExercisePlayer`
- Migration des IDs déjà marqués résolus dans le localStorage
- Pense-bête, filtres, vue « tous les exercices »

## Navigation

Trois niveaux dans `ExercisesTab` :

1. **Grille** — 9 cases. Retour : hub Pratique (`onBack` existant).
2. **Chapitre** — titre + liste des questions du chapitre, ou état vide. Retour : grille.
3. **Player** — `ExercisePlayer` actuel, inchangé. Retour : chapitre (`hub.exercises.backToChapter`). Inaccessible tant que le chapitre n’a aucune question.

État interne (un seul, pas de query string) :

```ts
type ExercisesView =
  | { kind: "chapters" }
  | { kind: "chapter"; theme: ExerciseTheme }
  | { kind: "player"; theme: ExerciseTheme; id: string }
```

Chapitre inconnu → grille. Question inconnue → page du chapitre.

## Chapitres

Ordre figé. Slug = `ExerciseTheme`.

| # | Slug | FR | EN |
|---|---|---|---|
| 1 | `comparable-companies` | Analyse des comparable companies | Comparable Companies Analysis |
| 2 | `precedent-transactions` | Analyse des transactions précédentes | Precedent Transactions Analysis |
| 3 | `dcf` | Analyse DCF | Discounted Cash Flow Analysis |
| 4 | `leveraged-buyouts` | Leveraged Buyouts | Leveraged Buyouts |
| 5 | `lbo-analysis` | Analyse LBO | LBO Analysis |
| 6 | `sell-side-ma` | M&A sell-side | Sell-Side M&A |
| 7 | `buy-side-ma` | M&A buy-side | Buy-Side M&A |
| 8 | `ipos` | Introductions en bourse | Initial Public Offerings |
| 9 | `ipo-process` | Le processus d’IPO | The IPO Process |

Ne pas fusionner 4/5 ni 8/9.

## Données

Garder le type `Exercise` et les variantes (`numeric` / `choice` / `open`). Changer uniquement `ExerciseTheme` et `EXERCISE_THEMES` pour les 9 slugs ci-dessus.

`getExercises(locale)` retourne `[]`. `getExercisesByTheme(theme)` retourne `[]`.

Supprimer `EXERCISE_CHEATSHEET`, `getExerciseCheatsheet`, et tous les exports `exercisesThemeN`.

### Fichiers à supprimer

- `src/data/exercises/en/{accretion,dcf,football-field,leverage,merger,paper-lbo,working-capital}.ts`
- `src/data/exercises/fr/{accretion,dcf,football-field,leverage,merger,paper-lbo,working-capital}.ts`
- `src/data/exercises-{accretion,dcf,football-field,leverage,merger,paper-lbo,working-capital}.ts`

### Fichiers à réécrire / ajuster

- `src/data/exercise-types.ts` — nouveaux thèmes + clés i18n
- `src/data/exercises/en/index.ts` et `fr/index.ts` — `export const exercisesEn/Fr: Exercise[] = []`
- `src/data/exercises/index.ts` — plus de cheatsheet
- `src/components/hub/ExercisesTab.tsx` — grille + page chapitre + player
- `src/components/hub/PracticeHub.tsx` et `PracticeTab.tsx` — carte hub sans 0/70
- `src/lib/i18n/messages/en.ts` et `fr.ts`

### Fichiers inchangés

- `src/components/hub/ExercisePlayer.tsx`
- `src/lib/exercise-check.ts` (+ tests)
- `src/lib/exercise-storage.ts` (clé `finance-exercises-solved-v1` inchangée ; les anciens IDs ne matcheront plus, le % repart à 0)

## Progression

Helper pur `src/lib/exercise-progress.ts` :

```ts
type ChapterProgress = {
  total: number;
  solved: number;
  percent: number | null; // null si total === 0
};

function getChapterProgress(
  chapterExercises: Exercise[],
  solvedIds: Set<string>,
): ChapterProgress;
```

`solved` = nombre d’exercices du chapitre dont l’id est dans `solvedIds`.  
`percent` = `Math.round((solved / total) * 100)` si `total > 0`, sinon `null`.

Affichage case :

- `percent === null` → texte muted « Aucun exercice » / « No exercises yet ». Pas de barre.
- sinon → barre + `{{solved}} / {{total}}` + `{{percent}} %`.

## Interface

### Grille

Même shell que aujourd’hui (`max-w-7xl`, `PageHeader`, `PracticeBackButton`).

- Header : eyebrow « Drills » / « Drills », titre « Exercices » / « Exercises », description sans compteur de drills : choisir un chapitre.
- Grille : 1 colonne mobile, 2 `sm`, 3 `lg` (9 cases → 3×3 desktop).
- Case = `<button>` carte (bordure, `bg-card`, hover `border-primary/40`), même famille que les cartes du hub Pratique.
- Contenu case : titre du chapitre (2 lignes max, `line-clamp-2`) ; pied = empty ou barre + compteur + %.
- Pas d’icône, pas de résumé pédagogique.

### Page chapitre

- `PracticeBackButton` label « Retour aux chapitres » / « Back to chapters » (`hub.exercises.backToChapters`).
- Titre = nom localisé du chapitre.
- 0 question : un paragraphe centré, « Les exercices de ce chapitre arriveront bientôt. » / « Exercises for this chapter will be added soon. » Pas de liste vide.
- ≥ 1 question : liste de rangées cliquables (id, titre, pastille réussi), comme `ExerciseRow` actuel, limitées au chapitre. Clic → `{ kind: "player", theme, id }`.

### Hub Pratique

- Description carte Exercices : plus de « {{count}} drills (levier, accretion…) ».
- Meta : « 9 chapitres » / « 9 chapters » (plus `{{solved}} / {{total}}`).
- Retirer les props devenues inutiles (`exerciseCount`, `solvedCount`) si plus rien ne les consomme.

## i18n

Ajouter les 9 clés `hub.exercises.theme.<slug>` FR/EN (titres du tableau).

Ajouter :

- `hub.exercises.backToChapters` — « Retour aux chapitres » / « Back to chapters »
- `hub.exercises.backToChapter` — « Retour au chapitre » / « Back to chapter »
- `hub.exercises.emptyChapter`
- `hub.exercises.noExercises`
- `hub.exercises.progressCount` (`{{solved}} / {{total}}`)
- `hub.exercises.progressPercent` (`{{percent}}%`)

Mettre à jour `hub.exercises.description` et les deux strings de la carte hub.

Supprimer les clés devenues mortes : tips, filtres, `filteredCount`, `backToList`, anciens `hub.exercises.theme.*` sauf `dcf` (même slug, nouveau libellé : « Analyse DCF » / « Discounted Cash Flow Analysis »).

Garder toutes les clés du player (`check`, `solved`, `solution`, etc.).

## Tests

- `src/data/exercises.test.ts` : 9 thèmes, 0 exercice, slugs uniques, `EXERCISE_THEMES` = l’ordre du tableau.
- `src/data/exercises.parity.test.ts` : mêmes ids FR/EN (tableaux vides) ; plus d’assertion pense-bête.
- `src/lib/exercise-progress.test.ts` :
  - `[]` → `{ total: 0, solved: 0, percent: null }`
  - 2 exercices, 1 résolu → `{ total: 2, solved: 1, percent: 50 }`
  - ids résolus hors chapitre ignorés

Pas de test visuel du player. Pas de test composant React obligatoire si le helper et les données couvrent le contrat.

## Composants

- `ExercisesTab` orchestre les 3 vues.
- Extraire `ExerciseChapterCard` dans le même fichier ou un fichier voisin si le JSX de la grille alourdit le tab ; pas de nouveau primitive design-system.
- `ExerciseRow` reste pour la liste chapitre, prête pour plus tard.
