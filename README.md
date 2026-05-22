# baileywallace.ai

Personal portfolio. Next.js 14 (App Router) + Tailwind CSS, deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Edit content

- Hero text and metadata: `app/components/Hero.tsx`
- About copy: `app/components/About.tsx`
- Project list (six cards): `app/lib/projects.ts`
- Footer contact channels: `app/components/Footer.tsx`

## Add real screenshots later

Each project card uses a generated SVG signature (see `app/components/ProjectGlyph.tsx`). When you want to swap in real screenshots, drop images into `public/projects/` and replace the `<ProjectGlyph />` call in `ProjectCard.tsx` with an `<Image>` element pointed at the file.

## Deploy

1. Push this folder to a new GitHub repo.
2. In Vercel, **New Project → Import** that repo. No environment variables needed.
3. Add the custom domain `baileywallace.ai` under **Settings → Domains** once the domain is registered.

## Design notes

- Type: Fraunces (display, via next/font), Manrope (sans), IBM Plex Mono (telemetry labels).
- Palette: deep ink-black background, warm off-white text, one signal-amber accent.
- Cards reveal on scroll via an `IntersectionObserver` in `RevealOnScroll.tsx`. Reduced-motion preference is respected.
- No em dashes anywhere in the copy. If you add new text, keep it that way.
