# Deploy PaperHacking to GitHub Pages

This guide walks you through deploying the PaperHacking Workbench landing page to GitHub Pages.

---

## Option 1: Deploy via GitHub Actions (Recommended)

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Name it `paperhacking` (or `paperhacking-landing`, or whatever you prefer)
3. Make it **Public** (required for GitHub Pages free hosting)
4. Click **Create repository**

### Step 2: Push the Code

From your project directory:

```bash
# Navigate to the project folder
cd /path/to/paperhacking-website

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: PaperHacking landing page"

# Add remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/paperhacking.git

# Push
git branch -M main
git push -u origin main
```

### Step 3: Update vite.config.ts for GitHub Pages

Edit `vite.config.ts` to set the correct base URL:

```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/paperhacking/',  // ← Replace with your repo name
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**If your repo is named `paperhacking.github.io` (user/org site):**
```typescript
base: '/',
```

### Step 4: Create GitHub Actions Workflow

Create the file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### Step 5: Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**:
   - Source: **GitHub Actions**
3. Push the workflow file:

```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push
```

4. Go to **Actions** tab and watch the deployment
5. Your site will be live at: `https://YOUR_USERNAME.github.io/paperhacking/`

---

## Option 2: Deploy via `gh-pages` npm package

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 3: Update vite.config.ts

Same as Option 1 — set `base: '/paperhacking/'`.

### Step 4: Deploy

```bash
npm run deploy
```

The `gh-pages` package will push the `dist/` folder to a `gh-pages` branch on your repo.

### Step 5: Enable Pages

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **root**
4. Save

---

## Setting Up a Custom Domain (Optional)

If you own a domain (e.g., `paperhacking.io`):

1. In your repo → **Settings** → **Pages** → **Custom domain**
2. Enter your domain and save
3. Add a `CNAME` file to your `public/` folder:

```bash
echo "paperhacking.io" > public/CNAME
```

4. Update your DNS:
   - **Apex domain** (`paperhacking.io`): Add A records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **www subdomain** (`www.paperhacking.io`): Add CNAME record pointing to `YOUR_USERNAME.github.io`

5. GitHub will automatically issue an SSL certificate (HTTPS)

---

## Project Structure Summary

```
paperhacking/
├── .github/workflows/deploy.yml   # GitHub Actions workflow
├── public/
│   ├── noise.png                  # Grain texture
│   └── og-image.jpg               # Social sharing image
├── src/
│   ├── sections/                  # All 8 page sections
│   │   ├── HeroSection.tsx
│   │   ├── SchedulingSection.tsx
│   │   ├── TemplatesSection.tsx
│   │   ├── SplitEditorSection.tsx
│   │   ├── SynthesisSection.tsx
│   │   ├── TermsGamificationSection.tsx
│   │   ├── OfflineSection.tsx
│   │   └── FooterSection.tsx
│   ├── components/
│   │   └── Navigation.tsx
│   ├── App.tsx                    # Main app with GSAP ScrollTrigger
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML with meta tags
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Preview production build | `npm run preview` |
| Deploy (gh-pages) | `npm run deploy` |

---

## Troubleshooting

**Blank page after deployment?**
- Check that `base` in `vite.config.ts` matches your repo name
- Check browser console for 404 errors
- Ensure all asset paths use relative paths (`./`)

**Images not loading?**
- Files in `public/` are served at root. Reference as `./filename`
- Check that images were copied to `dist/` after build

**Scroll animations not working?**
- GSAP ScrollTrigger requires DOM to be ready
- Check that section refs are properly attached
- Try refreshing ScrollTrigger after load: `ScrollTrigger.refresh()`

---

## Need Help?

- **GitHub Pages docs:** https://pages.github.com/
- **Vite deployment guide:** https://vitejs.dev/guide/static-deploy.html#github-pages
- **PaperHacking repo:** (your repo URL here)

---

*Built with React + Vite + Tailwind + GSAP*
*© Kianoosh Hosseini*
