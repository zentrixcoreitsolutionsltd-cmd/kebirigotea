# Kebirigo Tea Factory Platform

Official web application, CTC quality specifications, farmer portal, factory cupping laboratory, and export portal for **Kebirigo Tea Factory Company Limited** (KTDA).

---

## 🚀 Quick Deployment Guide via GitHub

### Option A: GitHub Pages (Automatic CI/CD included)

This repository comes pre-configured with a GitHub Actions workflow in `.github/workflows/deploy.yml` that builds and deploys your website automatically whenever you push to `main` or `master`.

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Kebirigo Tea Factory Platform"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click on **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - Your site will automatically build and deploy within 1–2 minutes!
   - Your live URL will appear at: `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

### Option B: Deploy to Vercel / Netlify / Cloudflare Pages

1. Connect your GitHub repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Set the build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**.

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📁 Application Structure

- `index.html` — Factory Overview, Export Portal, Farmer Catchment Explorer & Cupping Lab
- `index-1.html` — Factory Retail Shop & CTC Packets
- `product.html` — CTC Grade Technical Specs (BP1, PF1, PD, D1, F1, Dust)
- `view.html` — Shopping Cart & Order Summary
- `pay$submit.html` — Checkout & M-Pesa Payment Gateway
- `vite.config.ts` — Vite Multi-Page App (MPA) configuration with portable `./` base paths
- `.github/workflows/deploy.yml` — Automated GitHub Pages deployment pipeline
