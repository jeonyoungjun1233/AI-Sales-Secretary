# Codex Checklist

This is the live checklist shown and maintained by Codex.

## In Progress

- [ ] Day 9 Supabase storage separation and beta demo flow.

## Up Next

- [x] Add browser-specific temporary storage separation.
- [x] Harden `/api/storage/[resource]` with per-browser filtering.
- [x] Update Supabase schema and apply guide.
- [x] Add beta demo data and beta notice UI.
- [x] Re-run `npm run env:check`, `npm run supabase:check`, `npm run lint`, and `npm run build`.
- [ ] Commit, push, and verify Vercel production deployment.
- [x] Move or restore `.env.local` to the project root without exposing values.
- [x] Re-run `npm run env:check`.
- [x] Re-run `npm run env:vercel`.
- [x] Verify real OpenAI generation locally.
- [x] Add Supabase server storage routes without exposing keys.
- [ ] Run Supabase SQL schema in the Supabase dashboard.
- [ ] Re-run `npm run supabase:check` after schema creation.
- [x] Verify real OpenAI generation in production after deployment.
- [x] Confirm latest Vercel production deployment is `READY`.
- [ ] Keep login, payment, and real notification features out until the planned integration step.

## Workspace

- [x] Connect Codex planning and progress documents.
- [x] Create a VS Code workspace and desktop shortcut.
- [x] Add VS Code development, lint, and build tasks.
- [x] Add a Codex-visible live checklist.
- [x] Set VS Code as implementation review space and Codex as checklist/final-summary command center.
- [x] Confirm Canva connector availability for project visual design support.

## Product Planning

- [x] Define the first target user and their main problem.
- [x] Write PRD.
- [x] Define MVP scope and 7-day plan.
- [x] Define user flow.
- [x] Define screen flow.
- [x] Draft database schema.
- [x] Create Codex task list.

## Day 1 Implementation

- [x] Confirm App Router project structure.
- [x] Read required product planning documents.
- [x] Read relevant installed Next.js docs.
- [x] Create shared UI components.
- [x] Implement landing page.
- [x] Implement dashboard page.
- [x] Implement setup page.
- [x] Improve Day 1 visual design for landing, dashboard, and setup pages.
- [x] Add preview reply and usage summary components.
- [x] Remove developer-facing wording from user-visible Day 1 screens.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Verify `/`, `/dashboard`, and `/setup` render correctly.
- [x] Create `docs/DAY1_REPORT.md`.
- [x] Prepare Day 2 implementation instruction.

## Day 1 Review

- [x] Review landing page from UX, design, and monetization perspectives.
- [x] Review dashboard from next-action clarity and monetization perspectives.
- [x] Review setup page from onboarding and value clarity perspectives.
- [x] Generate Canva Instagram carousel concept.
- [x] Create `docs/DAY1_REVIEW.md`.
- [x] Update `docs/PROGRESS.md`.

## Day 2 Implementation

- [x] User approved Day 2 implementation start.
- [x] Read required Day 2 planning documents.
- [x] Read relevant installed Next.js docs.
- [x] Add mock generation helpers.
- [x] Add shared generation UI components.
- [x] Implement `/generate/inquiry`.
- [x] Implement `/generate/review`.
- [x] Implement `/generate/promo`.
- [x] Connect dashboard cards to generation pages.
- [x] Connect landing CTA to an active Day 2 flow.
- [x] Add temporary save feedback to `/setup`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Verify `/`, `/dashboard`, `/setup`, `/generate/inquiry`, `/generate/review`, and `/generate/promo`.
- [x] Create `docs/DAY2_REPORT.md`.
- [x] Update `docs/PROGRESS.md`.

## Deployment

- [x] Run `npm run lint` before deployment attempt.
- [x] Run `npm run build` before deployment attempt.
- [x] Commit Day 1 and Day 2 work locally.
- [x] Configure GitHub `origin` remote.
- [x] Push local commit to GitHub `main`.
- [x] Link project to Vercel through Git integration.
- [x] Deploy to Vercel.
- [x] Confirm Vercel build generated `/`, `/dashboard`, `/setup`, and `/generate/*` routes.
- [x] Make Vercel deployment publicly accessible without Vercel Authentication.
- [x] Confirm `https://ai-sales-secretary.vercel.app/` returns HTTP 200.
- [x] Confirm deployed core routes return HTTP 200.
- [x] Commit and push Day 3 mobile app changes.
- [x] Confirm Day 3 Vercel deployment generated `/calendar`.
- [x] Confirm Day 3 production routes return HTTP 200.
- [x] Commit and push Day 4 provider and FAQ changes.
- [x] Confirm Day 4 Vercel deployment generated `/faq`.
- [x] Confirm Day 4 production routes return HTTP 200.
- [x] Commit and push Day 5 calendar UX changes.
- [x] Confirm Day 5 Vercel deployment generated monthly `/calendar`.
- [x] Confirm Day 5 production routes return HTTP 200.

## Day 3 Implementation

- [x] Read required Day 3 planning documents.
- [x] Read relevant installed Next.js docs.
- [x] Add mobile app shell.
- [x] Add bottom tab navigation.
- [x] Redesign `/dashboard` as a mobile app home screen.
- [x] Add `/calendar` with local state schedule UI.
- [x] Apply mobile app shell to `/setup`.
- [x] Apply mobile app shell to `/generate/inquiry`, `/generate/review`, and `/generate/promo`.
- [x] Improve mock generation result variety.
- [x] Improve landing page app preview and loss-focused problem copy.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Verify `/`, `/dashboard`, `/setup`, `/generate/inquiry`, `/generate/review`, `/generate/promo`, and `/calendar`.
- [x] Create `docs/DAY3_REPORT.md`.
- [x] Update `docs/PROGRESS.md`.

## Day 4 Implementation

- [x] User approved Day 4 implementation start.
- [x] Read required Day 4 planning documents.
- [x] Read relevant installed Next.js docs.
- [x] Add AI provider types and router.
- [x] Add mock provider and future provider placeholder.
- [x] Add prompt template files.
- [x] Route inquiry, review, and promo generation through `agentRouter`.
- [x] Improve loading, empty, and guidance states on generation screens.
- [x] Add basic FAQ management UI.
- [x] Add generation history type definitions.
- [x] Create `docs/AI_AGENT_ARCHITECTURE.md`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Verify `/`, `/dashboard`, `/setup`, `/generate/inquiry`, `/generate/review`, `/generate/promo`, `/calendar`, and `/faq`.
- [x] Create `docs/DAY4_REPORT.md`.
- [x] Update `docs/PROGRESS.md`.

## Day 5 Implementation

- [x] User approved Day 5 calendar UI improvement start.
- [x] Read required Day 5 planning and progress documents.
- [x] Read relevant installed Next.js docs.
- [x] Rebuild `/calendar` as a monthly calendar UI.
- [x] Add year and month controls.
- [x] Add date selection and event dots.
- [x] Add selected day schedule list.
- [x] Add local state schedule creation flow.
- [x] Improve dashboard calendar preview.
- [x] Shorten key app copy.
- [x] Create `docs/DAY5_REPORT.md`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Verify `/`, `/dashboard`, `/calendar`, `/setup`, `/generate/inquiry`, `/generate/review`, `/generate/promo`, and `/faq`.

## Day 6 Implementation

- [x] User approved Day 6 work memory layer start.
- [x] Read required Day 6 planning and progress documents.
- [x] Read relevant installed Next.js docs.
- [x] Add browser storage types and safe storage helpers.
- [x] Add generation history store.
- [x] Add calendar event store.
- [x] Add FAQ store.
- [x] Add business profile store.
- [x] Add `/history` route.
- [x] Save generated inquiry replies, review replies, and promotional posts.
- [x] Save calendar events after creation.
- [x] Save FAQ entries after creation.
- [x] Save store profile information after clicking save.
- [x] Show recent history and saved-time value on `/dashboard`.
- [x] Keep history out of bottom navigation to avoid crowding the mobile shell.
- [x] Create `docs/DAY6_REPORT.md`.
- [x] Create monetization and competitor benchmark documents.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Verify `/`, `/dashboard`, `/calendar`, `/setup`, `/generate/inquiry`, `/generate/review`, `/generate/promo`, `/faq`, and `/history`.
- [x] Commit and push Day 6 changes.
- [x] Confirm Day 6 Vercel production deployment.

## Day 7 Production AI Setup

- [x] User approved Day 7 production AI setup start.
- [x] Read required Day 7 planning and progress documents.
- [x] Read relevant installed Next.js docs.
- [x] Check `.gitignore` and environment file Git tracking.
- [x] Confirm `.env.local` is not tracked by Git.
- [x] Add explicit environment file ignore rules.
- [x] Add `scripts/check-env.mjs`.
- [x] Add `scripts/sync-vercel-env.mjs`.
- [x] Add `env:check` and `env:vercel` scripts.
- [x] Add `/api/generate` server Route.
- [x] Implement `openaiProvider` with fetch-based server calls.
- [x] Keep fallback to `mockProvider`.
- [x] Route inquiry, review, and promo screens through `/api/generate`.
- [x] Include business profile, FAQ, today's events, and recent history in generation requests.
- [x] Create `docs/ENVIRONMENT_DEPLOYMENT.md`.
- [x] Create `docs/DAY7_REPORT.md`.
- [x] Run `npx vercel whoami`.
- [x] Run `npm run env:check` and confirm `.env.local` is missing.
- [x] Run `npm run env:vercel` and confirm `.env.local` is required.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Verify local routes and generation fallback.
- [x] Commit and push Day 7 changes.
- [x] Confirm Vercel production deployment.
- [x] Confirm production core routes return HTTP 200.
- [x] Confirm production `/api/generate` fallback response.
- [x] Confirm production runtime error/fatal log scan is clean.
- [ ] Sync Vercel environment variables after `.env.local` is restored.
- [ ] Verify production uses real OpenAI generation after env sync.

## Day 8 Runtime Connection

- [x] User confirmed environment values were added in VS Code.
- [x] Confirm `.env.local` is currently under `app/` instead of the project root.
- [x] Normalize environment variable loading without printing values.
- [x] Verify OpenAI real generation path.
- [x] Add Supabase REST client and server routes.
- [x] Connect business profile, FAQ, calendar events, and history to server storage with browser fallback.
- [x] Add Supabase schema/setup documentation.
- [x] Add `npm run supabase:check`.
- [x] Run `npm run env:check`.
- [x] Run `npm run env:vercel`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Verify local OpenAI generation UI.
- [x] Verify Supabase config is detected.
- [x] Confirm Supabase storage tables are still missing.
- [ ] Verify core routes after production deployment.

## Completion Rules

- [x] Relevant implementation checks pass.
- [x] `docs/PROGRESS.md` reflects the latest result.
- [x] The next concrete action is clearly stated.
- [x] Final user report includes completed work, file changes, verification, remaining issues, and next command summary.
