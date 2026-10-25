# Deployment Guide

Your resume is a static site. After running `npm run build`, the `dist/` folder contains everything you need.

## GitHub Pages (free, recommended)

The easiest way to deploy your resume for free.

### Automatic deployment with GitHub Actions

1. Push your repo to GitHub

2. The workflow file at `.github/workflows/deploy.yml` will automatically build and deploy to GitHub Pages on every push to `main`.

3. Go to your repo **Settings > Pages** and set:
   - Source: **GitHub Actions**

4. Your resume will be live at `https://YOUR_USERNAME.github.io/interactive-resume-template/`

### Custom domain (optional)

1. In your repo **Settings > Pages > Custom domain**, enter your domain (e.g., `resume.janedoe.com`)
2. Add a `CNAME` record in your DNS pointing to `YOUR_USERNAME.github.io`
3. Create a `public/CNAME` file with your domain name

## Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **New Project** and import your repo
3. Vercel auto-detects Vite — just click **Deploy**
4. Your resume is live at `your-project.vercel.app`

**Custom domain**: Settings > Domains > Add your domain

## Netlify

1. Go to [netlify.com](https://www.netlify.com) and sign in with GitHub
2. Click **New site from Git** and select your repo
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy**

**Custom domain**: Domain settings > Add custom domain

## Other static hosts

Any static hosting works. Just upload the contents of the `dist/` folder:

- **Cloudflare Pages**: Connect your repo, build command `npm run build`, output `dist`
- **Firebase Hosting**: `firebase init hosting` then `firebase deploy`
- **Render**: New Static Site, build command `npm run build`, publish `dist`
- **Surge**: `npm install -g surge` then `surge dist`
