# PaperHacking Workbench — Landing Page

A landing page for PaperHacking Workbench, a desktop app for academic researchers.

**Live site:** https://paperhacking.io (update with your actual URL)

---

## About the App

PaperHacking is a workbench for taking structured notes on research papers, building a personal glossary, and turning reading into synthesis.

Built by [Kianoosh Hosseini](https://kianoosh.info) — 5th year Cognitive Neuroscience PhD student.

---

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- GSAP + ScrollTrigger (animations)
- shadcn/ui components

---

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## Deploy to GitHub Pages

1. Update `base` in `vite.config.ts` to match your repo name
2. Run `npm run build`
3. Push the `dist/` folder contents to `gh-pages` branch, OR
4. Use GitHub Actions for automatic deployment

See [GITHUB_PAGES_GUIDE.md](GITHUB_PAGES_GUIDE.md) for detailed instructions.
