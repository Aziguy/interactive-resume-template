# Déploiement

`npm run build` produit un site statique dans `dist/`, PDF compris (`dist/cv/<langue>/`). La génération PDF nécessite Chromium : `npm run pdf:setup` en local, `npx playwright install --with-deps chromium` sur un serveur de build Linux.

## GitHub Pages (recommandé)

1. Poussez le dépôt sur GitHub.
2. **Settings > Pages > Source** : choisissez **GitHub Actions**.
3. Chaque push sur `main` lance [`deploy.yml`](../.github/workflows/deploy.yml) : lint, installation de Chromium, build avec PDF, publication.

URL obtenue : `https://<utilisateur>.github.io/<dépôt>/`. Le chemin de base est calculé automatiquement ; un dépôt nommé `<utilisateur>.github.io` est servi à la racine.

Les pull requests sont construites (PDF compris) sans être publiées, ce qui valide chaque modification.

### Domaine personnalisé

1. **Settings > Pages > Custom domain** : saisissez votre domaine.
2. Ajoutez un enregistrement DNS `CNAME` vers `<utilisateur>.github.io`.
3. Créez `public/CNAME` contenant le domaine.
4. Dans le workflow, remplacez la valeur de `VITE_BASE_PATH` par `/`.

## Vercel, Netlify, Cloudflare Pages

| Réglage | Valeur |
|---|---|
| Commande de build | `npx playwright install --with-deps chromium && npm run build` |
| Dossier publié | `dist` |
| Variable | `VITE_BASE_PATH=/` |

Si l'hébergeur ne permet pas d'installer Chromium, utilisez `npm run build:fast` (sans PDF) et déposez vos PDF dans `public/cv/<langue>/`, ou laissez le bouton ouvrir la boîte d'impression.

## Autres hébergeurs statiques

Construisez en local (`VITE_BASE_PATH=/ npm run build`) puis envoyez le contenu de `dist/` (Firebase Hosting, Surge, Render, un serveur Nginx...).
