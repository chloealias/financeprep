# Plan d'amélioration — FinancePrep

Tu utilises l'app surtout pour **t'entraîner activement**. Je propose une roadmap en 4 vagues, de l'impact le plus fort au plus marginal. Tu pourras me dire quelles vagues lancer (et dans quel ordre).

---

## Vague 1 — Mode entraînement actif (priorité #1)

L'app est aujourd'hui très "lecture". Pour s'entraîner réellement, il manque des boucles de pratique.

1. **Mode Flashcards** sur les 131 questions et 15 notions
   - Carte recto = question, verso = réponse modèle
   - 3 boutons après révélation : _Je sais / À revoir / Je ne sais pas_
   - Algorithme de répétition espacée léger (SM-2 simplifié, stocké en `localStorage`)
   - Filtres par catégorie, difficulté, banque cible

2. **Mode Quiz chronométré**
   - Tirage aléatoire de 5/10/20 questions
   - Auto-évaluation post-réponse (étoiles 1-5 réutilisées de `StarRating`)
   - Score final + récap des points faibles

3. **Simulateur d'entretien**
   - Enchaînement de 5 questions tirées au sort (1 fit + 2 techniques + 1 actu + 1 sectorielle)
   - Timer global (style "vrai entretien" 30 min)
   - Rapport final exportable

4. **Page Progression enrichie**
   - Heatmap d'activité (style GitHub)
   - % maîtrise par catégorie/banque cible
   - Liste des "à revoir aujourd'hui" (SRS)

---

## Vague 2 — Design & UX

5. **Refonte de la nav mobile** : la barre d'onglets actuelle déborde sur petit écran → bottom-nav fixe avec icônes
6. **Animations Motion** : transitions douces entre onglets, micro-interactions sur les cartes du Guide (déjà belles, à dynamiser)
7. **Mode sombre** : la palette indigo s'y prête bien, un toggle dans `ProfileMenu`
8. **Recherche globale** (Cmd+K) : un seul champ qui cherche dans questions + notions + acronymes + banques
9. **Favoris / "À revoir"** : étoile sur chaque carte, page dédiée

---

## Vague 3 — Contenu & pédagogie

10. **Réponses modèles enrichies** : pour chaque question, ajouter une version "junior" et "senior" + pièges classiques
11. **Vidéos / schémas** : intégrer des SVG explicatifs sur les concepts difficiles (WACC, LBO mechanics, accretion/dilution)
12. **Banque de "deals types"** : 10-15 deals récents avec angles d'analyse pour préparer les "walk me through a deal"
13. **Glossaire bidirectionnel** : cliquer un acronyme dans une fiche ouvre sa définition en popover

---

## Vague 4 — Technique & perf

14. **Refactor `FinanceInterviewGuide.tsx`** (690 lignes) : extraction des pages Questions / Notions / Progression en routes dédiées (`/questions`, `/notions`, `/progression`) → cohérent avec l'archi déjà mise en place pour les guides
15. **Persistance Cloud** (optionnel) : login + sync de la progression entre appareils via Lovable Cloud
16. **SEO** : meta tags + sitemap par route, JSON-LD `LearningResource` sur chaque guide
17. **Tests** : couverture des composants critiques (Quiz, SRS)

---

## Ma recommandation

Commencer par la **Vague 1, étape 1 (Flashcards + SRS)** : c'est l'amélioration qui transforme le plus l'usage pour ton objectif principal (s'entraîner), avec un effort raisonnable (~1 feature, ~3-4 fichiers).

Dis-moi :

- soit **"go vague 1"** (tout l'entraînement actif),
- soit **"go flashcards"** (juste l'étape 1),
- soit une combinaison à la carte (ex: _"flashcards + dark mode + recherche globale"_).
