# LawMate — Agent Instructions

## Project

LawMate is an AI legal assistant for Thai users: situation analysis, rights, action plans, deadlines, and document drafts — not just law explanations. UI must stay clean and professional (match `_local/mockups/` when available). Avoid generic “AI slop” UI.

## Every work session — checklist before finishing

1. **Recheck errors** — run typecheck/lint/build (or the project’s equivalent) and fix failures you introduced.
2. **Recheck ignore / secrets**
   - Never commit API keys, tokens, passwords, private keys, or real `.env` values.
   - Keep secrets in **GitHub Actions secrets** / environment variables / platform secret managers.
   - Use `.env.example` with placeholder names only when documenting required vars.
   - Confirm `.gitignore` still covers `_local/`, `.env*`, credentials, and build artifacts.
3. **Commit + push** — after meaningful work is done and checks pass, commit and push to the remote. Do not wait to be asked unless the change is ambiguous or destructive.

## Git rules

- Prefer clear, short commit messages focused on why.
- Do not force-push `main` / `master`.
- Do not commit `_local/` or secret files even if asked casually — warn and move secrets to GitHub secrets / env instead.

## Stack

- App lives in `web/` — **Vite + React 19 + TypeScript + Tailwind CSS v4**
- Packages in use: `react-router`, `lucide-react`, `clsx`, `tailwind-merge`, `@fontsource/sarabun`
- Vite plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`
- Path alias: `@/` → `web/src/`
- Do not rewrite frameworks without an explicit request.

### Commands (`web/`)

- `npm run dev` — local demo
- `npm run build` — typecheck + production build
- `npm run lint` — oxlint
