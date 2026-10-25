# Créer son CV interactif sans rien installer

Tout se fait dans le navigateur, gratuitement, en 20 à 30 minutes. À la fin, vous aurez un CV en ligne bilingue et ses versions PDF générées automatiquement.

Il vous faut : un compte e-mail, votre CV actuel (PDF ou texte) et, si vous le souhaitez, une photo carrée.

## 1. Créer un compte GitHub (5 min)

GitHub héberge le code et publie le site. Inscrivez-vous sur [github.com](https://github.com/signup). Votre nom d'utilisateur apparaîtra dans l'adresse du CV : choisissez-le sobre (`jdupont`, `marie-martin`).

## 2. Copier le modèle (1 min)

1. Ouvrez [github.com/Aziguy/interactive-resume-template](https://github.com/Aziguy/interactive-resume-template).
2. Cliquez sur **Use this template > Create a new repository** (ou **Fork**).
3. Gardez le nom `interactive-resume-template`, laissez le dépôt public, validez.

> Astuce : nommez le dépôt `<votre-utilisateur>.github.io` pour obtenir l'adresse courte `https://<votre-utilisateur>.github.io/`.

## 3. Activer GitHub Pages (1 min)

Dans votre dépôt : **Settings > Pages > Source**, choisissez **GitHub Actions**.

## 4. Générer votre configuration avec une IA (10 min)

1. Ouvrez [PROMPT-IA.md](./PROMPT-IA.md) et copiez le prompt.
2. Collez-le dans ChatGPT, Claude ou Mistral, puis joignez votre CV.
3. Vérifiez le résumé proposé, corrigez si besoin, et récupérez le fichier généré.

## 5. Coller la configuration (3 min)

1. Dans votre dépôt, ouvrez `src/config/resume.ts`.
2. Cliquez sur l'icône crayon (**Edit this file**).
3. Remplacez tout le contenu par celui généré par l'IA.
4. Cliquez sur **Commit changes**.

## 6. Ajouter votre photo (facultatif, 2 min)

1. Ouvrez le dossier `public/`, puis **Add file > Upload files**.
2. Glissez votre photo en la nommant par exemple `images/photo.jpg` (le dossier `images` est créé automatiquement).
3. Validez avec **Commit changes**.

Sans photo, vos initiales sont affichées dans un cercle.

## 7. Patienter pendant la publication (3 min)

L'onglet **Actions** affiche la construction en cours. Une coche verte signifie que le site et les PDF sont en ligne. Une croix rouge : ouvrez l'exécution, l'erreur indique en général la ligne fautive de `resume.ts` (virgule ou apostrophe manquante).

## 8. Partager

- Site : `https://<votre-utilisateur>.github.io/interactive-resume-template/`
- Lien en anglais : ajoutez `?lang=en`
- PDF : bouton **Télécharger le PDF**, ou directement `.../cv/fr/CV_<Prénom>_<Nom>_FR.pdf`

Pensez à renseigner `seo.url` dans `resume.ts` avec cette adresse : elle apparaît en pied de page du PDF.

## Modifier plus tard

Éditez `src/config/resume.ts` sur GitHub et validez : le site et les PDF sont régénérés automatiquement. Pour changer de couleurs, modifiez `theme.preset` (`azure`, `minimal`, `warm`, `ocean`, `forest`, `slate`, `lilac`).

## En cas de problème

| Symptôme | Solution |
|---|---|
| Page 404 | Vérifiez l'étape 3 et attendez la fin de l'action. |
| Croix rouge dans Actions | Lisez le message d'erreur : souvent une apostrophe non échappée dans `'...'`. Utilisez `’` ou des guillemets doubles. |
| Ancienne version affichée | Rechargez sans cache (Ctrl + F5). |
| Avertissements « traduction manquante » | Un texte n'a pas sa version dans chaque langue de `i18n.available`. |
