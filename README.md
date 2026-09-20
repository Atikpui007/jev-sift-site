# jev-sift site

Marketing site for jev-sift. Vite + React + Tailwind + shadcn/ui, deployed on Vercel at https://jev-sift.vercel.app.

```
npm install
npm run dev      # local
npm run build    # dist/
```

- The GitHub handle used in the install commands lives in one place: `src/lib/site.ts` (`GH_USER`), or set `VITE_GH_USER` at build time.
- The demo video is a fixed asset: put it at `public/video/demo.mp4` (optional poster: `public/video/poster.jpg`). There is no upload control by design.
- All sample data on the page is invented (`src/session.ts`).
