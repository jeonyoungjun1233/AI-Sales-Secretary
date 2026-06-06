# Codex Checklist

This is the live checklist shown and maintained by Codex.

## In Progress

- [ ] Push Day 3 changes and verify Vercel production deployment.

## Up Next

- [ ] Confirm Day 3 commit appears on GitHub `main`.
- [ ] Confirm Vercel production deployment is ready.
- [ ] Keep OpenAI, Supabase, login, and payment out until the planned integration step.
- [ ] Use local state or mock data for the next frontend workflow.

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
- [ ] Commit and push Day 3 mobile app changes.
- [ ] Confirm Day 3 Vercel deployment generated `/calendar`.
- [ ] Confirm Day 3 production routes return HTTP 200.

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

## Completion Rules

- [x] Relevant implementation checks pass.
- [x] `docs/PROGRESS.md` reflects the latest result.
- [x] The next concrete action is clearly stated.
- [x] Final user report includes completed work, file changes, verification, remaining issues, and next command summary.
