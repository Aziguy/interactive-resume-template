# Contribuer

Merci de votre intérêt pour **interactive-resume-template** !

## Installation

```bash
git clone https://github.com/Aziguy/interactive-resume-template.git
cd interactive-resume-template
npm install
npm run pdf:setup
npm run dev
```

Stack : React 19, TypeScript 5, Vite 7, Tailwind CSS 4, Playwright (génération PDF).

## Avant d'ouvrir une pull request

```bash
npm run lint
npm run build   # typecheck + build + PDF
```

- Une PR = un sujet.
- Vérifiez le rendu en clair, en sombre, sur mobile et dans le PDF (`dist/cv/`).
- Mettez à jour `docs/CUSTOMIZATION.md` si le schéma de configuration change.
- Messages de commit courts au format conventionnel (`feat: ...`, `fix: ...`, `docs: ...`).

## Conventions

- Données utilisateur : `src/config/`. Schéma : `src/types/resume.ts`.
- Code partagé entre navigateur et build (`src/lib/resume.ts`, `src/lib/theme/css.ts`, `src/lib/i18n/messages.ts`) : pas d'API navigateur, imports relatifs uniquement.
- Nouvelle technologie dans `src/data/tech-registry.ts` : couleur officielle de la marque, dans la bonne catégorie.
- Nouveau texte d'interface : l'ajouter dans `messages.ts` pour `fr` et `en`.

## Signaler un bug

Utilisez les [issues](https://github.com/Aziguy/interactive-resume-template/issues) avec le modèle correspondant.

## Licence

Toute contribution est publiée sous licence MIT.
