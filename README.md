# Interactive Resume Template

An open-source interactive resume template. Clone it, fill in your info, deploy it.

Built with React, TypeScript, Tailwind CSS, and Framer Motion.

**[▶ Live Demo](https://clementbouly.github.io/interactive-resume-template/)**

<p align="center">
  <img src="docs/demo.gif" alt="Interactive Resume Template demo" width="480" />
</p>

## Features

- **One config file** — Edit a single TypeScript file with your info
- **Multi-language** — Built-in i18n support (add as many languages as you need)
- **Dark / Light mode** — Auto-detects time of day, with manual toggle
- **6 color presets** — minimal, warm, ocean, forest, slate, lilac (or fully custom)
- **Responsive** — Mobile-first, works on all screen sizes
- **Expandable experiences** — Click to expand details (inline on desktop, modal on mobile)
- **Projects section** — Optional portfolio showcase
- **PDF download** — Optional downloadable resume, one per language
- **SEO & ATS ready** — Full CV content visible to crawlers at build time (JSON-LD, semantic HTML fallback)
- **3D photo flip** — Click the photo for a fun easter egg

## Not a developer? No problem!

You don't need to install anything or write any code. An interactive guide walks you through everything, from creating a GitHub account to sharing your resume link.

**[📖 Follow the step-by-step guide](https://clementbouly.dev/labs/interactive-resume-guide?lang=en)**

> Also available in [Français](https://clementbouly.dev/labs/interactive-resume-guide?lang=fr)

---

## Quick Start (for developers)

### 1. Clone the repo

```bash
git clone https://github.com/clementbouly/interactive-resume-template.git
cd interactive-resume-template
npm install
```

### 2. Add your info

Edit `src/data/resume-config.ts` with your personal information. See [Customization Guide](./docs/CUSTOMIZATION.md) for details.

Add your photo to `public/images/photo.jpg`.

### 3. Preview locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 4. Deploy

```bash
npm run build
```

The `dist/` folder contains your static site. Deploy it anywhere. See [Deployment Guide](./docs/DEPLOYMENT.md) for step-by-step instructions.

## Color Presets

| Preset | Style |
|--------|-------|
| `minimal` | Black and white, clean and neutral (default) |
| `warm` | Wood and earth tones |
| `ocean` | Deep blue, professional and corporate |
| `forest` | Sage green, calm and organic |
| `slate` | Blue-grey, modern and tech |
| `lilac` | Soft purple, elegant and creative |

Set your preset in the config:

```typescript
theme: {
  preset: 'warm',
}
```

## Tech Stack

- [Vite](https://vite.dev/) — Fast build tool
- [React 19](https://react.dev/) — UI framework
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animations

## Project Structure

```
├── vite-plugin-resume-seo.ts       # Build-time SEO injection plugin
src/
├── data/
│   ├── resume-config.ts          # YOUR CONFIG FILE (edit this!)
│   ├── resume-config.example.ts  # Example with comments
│   ├── types.ts                  # TypeScript types
│   └── presets.ts                # Color presets
├── components/
│   └── Resume/                   # All resume components
├── lib/
│   ├── i18n/                     # Language system
│   ├── theme/                    # Dark/light mode
│   └── hooks/                    # Custom hooks
└── App.tsx                       # Entry point
```

## Development with AI agents

This project includes [Agentation](https://agentation.dev/) — a visual feedback toolbar for AI coding agents. When running in development mode (`npm run dev`), a small toolbar appears at the bottom-right of the page.

It lets you click on any element, select text, or annotate parts of your resume, then copy a structured description to your clipboard. Paste it directly into your AI agent's chat to give it precise context about what you want changed.

Agentation is **only active in development** and is automatically stripped from production builds.

> See the [Agentation documentation](https://agentation.dev/features) for more details.

## ATS & SEO

**"Is it ATS-compatible?"** — ATS (Applicant Tracking Systems) today primarily parse PDF and DOCX files. This interactive resume is designed as a **complement** to your PDF, not a replacement.

However, the template does everything possible to make your CV readable by bots and crawlers **without JavaScript**:

- **Build-time SEO injection** — A custom Vite plugin reads your config at build time and injects all data directly into the static HTML. Crawlers see the full CV, not an empty `<div id="root">`
- **JSON-LD structured data** — Your name, job title, skills, and links are embedded as [schema.org/Person](https://schema.org/Person) metadata in the `<head>`, readable by search engines and modern parsers
- **`<noscript>` semantic HTML** — The complete CV (contact, skills, experiences with tasks, education, projects, hobbies) is rendered as clean HTML inside `<noscript>`, so non-JS visitors and bots see everything
- **Static meta tags** — `<title>` and `<meta description>` are set from your config at build time
- **Shareable URL** — Send `?lang=en` directly to recruiters for the right language
- **PDF download** — Per-language PDF files for traditional ATS submissions

**Recommended workflow:** Apply with your PDF, and add the interactive link in your email or LinkedIn message.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT
