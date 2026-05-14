## Refonte du design des cartes de questions

Objectif : alléger les cartes, surtout sur mobile où les pastilles de catégorie + difficulté + étoiles + bookmark saturent la ligne du haut.

### Changements

**Mobile (< sm)**
- Remplacer la pastille catégorie « Déstabilisantes / Valorisation / … » par **une petite icône ronde colorée** (icône Lucide déjà associée à chaque catégorie dans le tableau `categories` : `Brain`, `TrendingUp`, `Calculator`, `Briefcase`, `Target`, `BookOpen`). Cercle 24 px, fond clair, icône bleue ; pour `brainteaser` : fond ambre clair, icône ambre.
- Remplacer la pastille de difficulté par **3 petits points** (●●○ pour intermédiaire, ●○○ pour basique, ●●● pour avancé) en bleu, avec `aria-label` explicite (« Difficulté : intermédiaire »).
- Supprimer le `⚡` devant le label brainteaser (l'icône `Brain` suffit).
- L'avatar numéroté à gauche : retirer le dégradé bleu→indigo quand la carte est ouverte, garder un bleu uni (`bg-blue-700`). Idem pour les étapes numérotées dans le contenu déplié.
- Tooltip / `title` sur l'icône catégorie pour révéler le label complet.

**Desktop (≥ sm)**
- Garder les pastilles texte mais **uniformiser** : même fond `bg-blue-50`, même bordure `border-blue-100`, texte `text-blue-800`, même taille. Pas de cas spécial brainteaser (juste l'icône `Brain` à gauche du label).
- Garder les 3 points en plus du label de difficulté (ou label seul, à choisir — par défaut on garde le label seul sur desktop).
- Réduire le `tracking-wider` qui rend les pastilles bruyantes.

**Effet recherché**
- Sur mobile : 1 icône + 3 points + étoiles + bookmark — beaucoup plus lisible, le titre prend la vedette.
- Sur desktop : pastilles cohérentes en bleu, plus de mélange ambre/bleu/indigo/sky.

### Détail technique

- Modifier uniquement le bloc lignes 4093–4101 de `src/components/FinanceInterviewGuide.tsx` (en-tête de chaque carte question) + l'avatar lignes 4088–4092.
- Ajouter un petit composant local `<DifficultyDots difficulty={...} />` (3 dots SVG/divs) et `<CategoryBadge cat={...} />` (icône + bg) ou faire ça inline.
- Réutiliser `categories.find(c => c.id === q.category)?.icon` pour récupérer le composant icône.
- Aucune modification de données, aucun changement de logique de filtre.
- Accessibilité : `aria-label` sur les badges icône-only mobile.

```text
Mobile (avant)                             Mobile (après)
┌──────────────────────────────────┐       ┌──────────────────────────────────┐
│ 01  [⚡DÉSTABILISANTES]          │       │ 01  (🧠) ●○○  ☆☆☆☆☆      [🔖]  │
│     [INTERMÉDIAIRE] ☆☆☆☆☆ [🔖]   │       │     Combien de balles…           │
│     Combien de balles…           │       └──────────────────────────────────┘
└──────────────────────────────────┘
```
