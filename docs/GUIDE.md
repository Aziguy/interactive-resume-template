# Guide — Interactive Resume Template

> **🇫🇷 [Français](#-déployer-votre-cv-interactif--guide-pas-à-pas)** | **🇬🇧 [English](#-deploy-your-interactive-resume--step-by-step-guide)**

---

# 🇫🇷 Déployer votre CV interactif — Guide pas à pas

> **Aucune installation requise.** Tout se fait dans votre navigateur.
> Temps estimé : **20 à 30 minutes**.
> Coût : **0 €**.

---

## Ce dont vous avez besoin

- Un navigateur web (Chrome, Firefox, Safari…)
- Une adresse email
- Votre CV au format PDF (ou vos infos en tête)
- Votre photo de profil (format carré de préférence, ex : 256×256 px)

---

## Étape 1 — Créer un compte GitHub (5 min)

GitHub est la plateforme qui va héberger votre CV gratuitement.

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **Sign up**
3. Renseignez votre email, choisissez un mot de passe et un nom d'utilisateur
4. Suivez les étapes de vérification

> **Votre nom d'utilisateur sera dans l'URL de votre CV :**
> `https://VOTRE-USERNAME.github.io/interactive-resume-template/`
>
> Choisissez quelque chose de professionnel (ex : `jdupont`, `marie-martin`).

> **Astuce :** Si vous nommez votre repo `VOTRE-USERNAME.github.io` au lieu de `interactive-resume-template`, votre URL sera plus courte : `https://VOTRE-USERNAME.github.io/` (voir la section bonus en fin de guide).

---

## Étape 2 — Copier le template (1 min)

1. Allez sur : [github.com/clementbouly/interactive-resume-template](https://github.com/clementbouly/interactive-resume-template)
2. Cliquez sur le bouton **Fork** (en haut à droite)
3. **Gardez le nom par défaut** → laissez `interactive-resume-template`
4. Cliquez sur **Create fork**

Vous avez maintenant votre propre copie.

---

## Étape 3 — Activer GitHub Pages (2 min)

C'est ce qui rend votre CV accessible sur internet.

1. Sur la page de votre fork, cliquez sur l'onglet **Settings** (en haut)
2. Dans le menu de gauche, cliquez sur **Pages**
3. Dans la section **Source**, sélectionnez **GitHub Actions**

C'est tout. Le déploiement se fera automatiquement à chaque modification.

---

## Étape 4 — Générer votre fichier de configuration avec une IA (10 min)

C'est l'étape clé. Une IA va transformer votre CV en code prêt à coller.

1. Ouvrez [ChatGPT](https://chat.openai.com), [Claude](https://claude.ai), ou tout autre assistant IA
2. **Copiez-collez le prompt fourni avec ce guide** (voir `docs/PROMPT-IA.md`)
3. **Uploadez votre CV PDF** dans la conversation (ou décrivez vos infos)
4. L'IA va vous générer le contenu complet du fichier de configuration
5. **Copiez le code généré** (tout le bloc, du `import` jusqu'à la dernière `}`)

> L'IA vous posera peut-être quelques questions (langues souhaitées, thème de couleur…). Répondez et elle ajustera le code.

---

## Étape 5 — Coller votre configuration sur GitHub (3 min)

1. Retournez sur votre fork GitHub
2. Naviguez vers le fichier : cliquez sur `src` → `data` → `resume-config.ts`
3. Cliquez sur l'icône **crayon** ✏️ (en haut à droite du fichier) pour éditer
4. **Sélectionnez tout** le contenu existant (Ctrl+A / Cmd+A)
5. **Collez** le code généré par l'IA (Ctrl+V / Cmd+V)
6. Cliquez sur le bouton vert **Commit changes...**
7. Dans la popup, cliquez sur **Commit changes**

---

## Étape 6 — Ajouter votre photo (2 min)

1. Retournez à la racine de votre repo et naviguez vers `public` → `images`
2. Cliquez sur **Add file** → **Upload files**
3. Glissez-déposez votre photo
4. **Le nom du fichier doit correspondre** à ce qui est dans votre config (par défaut : `photo.jpg`)
5. Cliquez sur **Commit changes**

> Si votre photo est en `.png`, assurez-vous que l'IA a bien mis `photo: '/images/photo.png'` dans le code. Sinon, renommez votre fichier en `photo.jpg` avant de l'uploader.

---

## Étape 7 — Attendre le déploiement (2 min)

Chaque commit déclenche un déploiement automatique.

1. Cliquez sur l'onglet **Actions** de votre repo
2. Vous verrez un workflow en cours (cercle jaune ⟳)
3. Attendez qu'il passe au **vert** ✅ (1 à 2 minutes)

**Si c'est rouge** ❌ : pas de panique, c'est probablement une erreur de syntaxe dans le fichier config. Cliquez sur le workflow pour voir l'erreur, puis retournez voir l'IA avec le message d'erreur — elle vous aidera à corriger.

---

## Étape 8 — Voir votre CV en ligne ! 🎉

Votre CV est accessible à :

```
https://VOTRE-USERNAME.github.io/interactive-resume-template/
```

(Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub.)

---

## Partager votre CV

- **En français** : `https://VOTRE-USERNAME.github.io/interactive-resume-template/?lang=fr`
- **En anglais** : `https://VOTRE-USERNAME.github.io/interactive-resume-template/?lang=en`

Mettez ce lien dans vos emails de candidature, votre signature, votre profil LinkedIn…

---

## Modifier votre CV plus tard

1. Allez sur votre repo GitHub → `src/data/resume-config.ts`
2. Cliquez sur le crayon ✏️
3. Faites vos modifications (ou redemandez à l'IA)
4. Commit → le déploiement se relance automatiquement

---

## Changer le thème de couleur

6 thèmes sont disponibles. Dans votre config, modifiez la ligne `preset` :

| Thème | Style |
|-------|-------|
| `minimal` | Noir et blanc, neutre (par défaut) |
| `warm` | Tons bois et terre |
| `ocean` | Bleu profond, corporate |
| `forest` | Vert sauge, organique |
| `slate` | Bleu-gris, moderne |
| `lilac` | Violet doux, créatif |

---

## Bonus — URL plus propre avec `<username>.github.io`

Par défaut, l'URL de votre CV inclut le nom du repo :
`https://VOTRE-USERNAME.github.io/interactive-resume-template/`

Vous pouvez obtenir une URL plus courte comme `https://VOTRE-USERNAME.github.io/` en renommant votre repo :

1. Allez dans **Settings** (barre du haut de votre repo)
2. Dans **Repository name**, remplacez `interactive-resume-template` par `VOTRE-USERNAME.github.io`
3. Cliquez sur **Rename**

Le prochain déploiement utilisera automatiquement l'URL racine. Aucune autre modification nécessaire — le système de build gère le chemin automatiquement.

---

## En cas de problème

| Problème | Solution |
|----------|----------|
| Déploiement en rouge ❌ | Cliquez dessus → copiez l'erreur → collez-la à l'IA |
| La photo ne s'affiche pas | Vérifiez que le nom de fichier correspond exactement à celui dans la config |
| Page 404 | Vérifiez que GitHub Pages est sur « GitHub Actions » (Étape 3) |
| Le CV affiche les infos de Jane Doe | Vous n'avez pas remplacé le contenu de `resume-config.ts` |

> **À chaque problème, copiez l'erreur et envoyez-la à l'IA avec le prompt fourni.** Elle connaît le projet et saura vous aider.

---

# 🇬🇧 Deploy your interactive resume — Step-by-step guide

> **No installation required.** Everything happens in your browser.
> Estimated time: **20 to 30 minutes**.
> Cost: **Free**.

---

## What you need

- A web browser (Chrome, Firefox, Safari…)
- An email address
- Your resume as a PDF (or just your info)
- A profile photo (square format, e.g. 256×256 px)

---

## Step 1 — Create a GitHub account (5 min)

GitHub is the platform that will host your resume for free.

1. Go to [github.com](https://github.com)
2. Click **Sign up**
3. Enter your email, choose a password and a username
4. Follow the verification steps

> **Your username will be part of your resume URL:**
> `https://YOUR-USERNAME.github.io/interactive-resume-template/`
>
> Choose something professional (e.g. `jdupont`, `marie-martin`).

> **Pro tip:** If you name your repo `YOUR-USERNAME.github.io` instead of `interactive-resume-template`, your URL will be even cleaner: `https://YOUR-USERNAME.github.io/` (see the bonus section at the end).

---

## Step 2 — Copy the template (1 min)

1. Go to: [github.com/clementbouly/interactive-resume-template](https://github.com/clementbouly/interactive-resume-template)
2. Click the **Fork** button (top right)
3. **Keep the default name** → leave `interactive-resume-template`
4. Click **Create fork**

You now have your own copy.

---

## Step 3 — Enable GitHub Pages (2 min)

This is what makes your resume accessible on the internet.

1. On your fork page, click the **Settings** tab (top bar)
2. In the left menu, click **Pages**
3. Under **Source**, select **GitHub Actions**

That's it. Deployment will happen automatically on every change.

---

## Step 4 — Generate your config file with AI (10 min)

This is the key step. An AI will turn your resume into ready-to-paste code.

1. Open [ChatGPT](https://chat.openai.com), [Claude](https://claude.ai), or any other AI assistant
2. **Copy and paste the AI prompt** provided with this guide (see `docs/PROMPT-IA.md`)
3. **Upload your PDF resume** in the conversation (or describe your info)
4. The AI will generate the complete configuration file
5. **Copy the generated code** (the entire block, from `import` to the last `}`)

> The AI may ask a few questions (languages, color theme…). Just answer and it will adjust the code.

---

## Step 5 — Paste your config on GitHub (3 min)

1. Go back to your forked repo on GitHub
2. Navigate to the file: click `src` → `data` → `resume-config.ts`
3. Click the **pencil icon** ✏️ (top right of the file) to edit
4. **Select all** existing content (Ctrl+A / Cmd+A)
5. **Paste** the AI-generated code (Ctrl+V / Cmd+V)
6. Click the green **Commit changes...** button
7. In the popup, click **Commit changes**

---

## Step 6 — Add your photo (2 min)

1. Go back to the root of your repo, then navigate to `public` → `images`
2. Click **Add file** → **Upload files**
3. Drag and drop your photo
4. **The file name must match** what's in your config (default: `photo.jpg`)
5. Click **Commit changes**

> If your photo is `.png`, make sure the AI used `photo: '/images/photo.png'` in the code. Otherwise, rename your file to `photo.jpg` before uploading.

---

## Step 7 — Wait for deployment (2 min)

Each commit triggers an automatic deployment.

1. Click the **Actions** tab of your repo
2. You'll see a running workflow (yellow circle ⟳)
3. Wait for it to turn **green** ✅ (1 to 2 minutes)

**If it's red** ❌: don't panic, it's probably a syntax error in the config file. Click on the workflow to see the error, then go back to the AI with the error message — it will help you fix it.

---

## Step 8 — See your resume online! 🎉

Your resume is live at:

```
https://YOUR-USERNAME.github.io/interactive-resume-template/
```

(Replace `YOUR-USERNAME` with your GitHub username.)

---

## Share your resume

- **In French**: `https://YOUR-USERNAME.github.io/interactive-resume-template/?lang=fr`
- **In English**: `https://YOUR-USERNAME.github.io/interactive-resume-template/?lang=en`

Add this link to your job applications, email signature, LinkedIn profile…

---

## Update your resume later

1. Go to your GitHub repo → `src/data/resume-config.ts`
2. Click the pencil ✏️
3. Make your changes (or ask the AI again)
4. Commit → deployment restarts automatically

---

## Change the color theme

6 themes are available. In your config, change the `preset` line:

| Theme | Style |
|-------|-------|
| `minimal` | Black and white, clean and neutral (default) |
| `warm` | Wood and earth tones |
| `ocean` | Deep blue, professional and corporate |
| `forest` | Sage green, calm and organic |
| `slate` | Blue-grey, modern and tech |
| `lilac` | Soft purple, elegant and creative |

---

## Bonus — Cleaner URL with `<username>.github.io`

By default, your resume URL includes the repo name:
`https://YOUR-USERNAME.github.io/interactive-resume-template/`

You can get a shorter URL like `https://YOUR-USERNAME.github.io/` by renaming your repo:

1. Go to **Settings** (top bar of your repo)
2. Under **Repository name**, change `interactive-resume-template` to `YOUR-USERNAME.github.io`
3. Click **Rename**

The next deployment will automatically use the root URL. No other changes needed — the build system handles the base path automatically.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Red deployment ❌ | Click on it → copy the error → paste it to the AI |
| Photo not showing | Check that the file name matches exactly what's in the config |
| 404 page | Check that GitHub Pages source is set to "GitHub Actions" (Step 3) |
| Shows Jane Doe's info | You haven't replaced the content of `resume-config.ts` |

> **For any problem, copy the error and send it to the AI with the prompt provided.** It knows the project and will help you fix it.
