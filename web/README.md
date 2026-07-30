# LawMate Web Demo

Vite + React + TypeScript demo for LawMate AI.

## Setup

```bash
cd web
npm install
npm run dev
```

From repo root: `npm run dev`

## Stack

- Vite 8 + `@vitejs/plugin-react` + `@tailwindcss/vite`
- React 19 + TypeScript
- Tailwind CSS v4 (design tokens in `src/index.css`)
- `react-router` (navigation)
- `lucide-react` (icons)
- `clsx` + `tailwind-merge` (`src/lib/cn.ts`)
- `@fontsource/sarabun` (Thai typography)

## Env

Copy `.env.example` → `.env` for local secrets. Never commit `.env`. Use GitHub Actions secrets in CI.
