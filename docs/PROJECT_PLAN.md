# AI 사장님 매출 비서 - Project Plan

## Product Goal

Build an AI work assistant SaaS for Korean and global small business owners. The first product value is helping owners generate customer replies, review responses, and promotional posts from store information and FAQs.

## Current Phase

Day 13 conversion UX polish is in progress. Day 12 made the one-minute demo flow work; Day 13 focuses on making the first visit sharper, shorter, and more conversion-oriented by improving landing CTAs, industry selection, dashboard priority, action cards, generation options, pricing copy, and beta feedback.

## Priorities

- Build the minimum workflow for store setup, mock text generation, FAQ management, and copy-ready result previews.
- Keep the first experience simple enough for non-technical owners to use in minutes.
- Make the core app routes look and behave like a mobile app, not a blog or desktop dashboard.
- Add a calendar-style daily work view so owners have a reason to return every day.
- Improve the calendar into a real monthly mobile view with date selection and local schedule creation.
- Add a browser-based memory layer so generation history, schedules, FAQs, and store information feel continuous before the database step.
- Add a `/history` screen so owners can reuse recently created replies and promotional text.
- Show saved time and recent work on the dashboard to strengthen subscription value.
- Prevent beta users from seeing each other's saved data before login is added.
- Make the Wednesday demo reliable with sample data and clear beta messaging.
- Add a one-click daily sales action workflow so owners do not need to choose between separate tools.
- Add a pricing and usage experience so the app feels like a paid SaaS before real payment integration.
- Protect paid generation calls with a free-plan limit during beta testing.
- Add a one-minute quick experience so first-time users and judges can understand the app without setup.
- Make the Wednesday demo reliable with an explicit scenario and final QA checklist.
- Polish the first-use conversion path so visitors reach `/demo` or `/agent` with less hesitation.
- Make the Pro plan feel like the natural upgrade for owners who manage replies, reviews, and promotions every day.
- Keep app copy short, direct, and focused on the next action.
- Connect paid external generation services through server-only routes and fallback behavior.
- Keep user-facing screens focused on business outcomes instead of technical provider details.
- Keep API keys out of Git, browser code, logs, and documentation.
- Defer platform integrations, automation, payments, and advanced analytics until after MVP validation.

## Working Decisions

- Framework: Next.js 16 App Router
- UI: React 19 and Tailwind CSS 4
- AI: server route and OpenAI provider path are implemented; real calls require environment variables.
- Data/Auth: Supabase REST storage routes are implemented for MVP data, but Auth is not connected yet.
- Deployment: Vercel
- Visual design support: Canva connector is available for editable marketing assets, social posts, pitch visuals, and brand-style design drafts.
- First user: small business owners who directly manage customer inquiries, reviews, and promotions.
- MVP scope: customer inquiry replies, review replies, promotional posts, FAQ management, and store information management.
- Current implementation uses server-routed generation with fallback and browser-based temporary storage.
- Day 6 intentionally keeps browser memory separate from future Supabase persistence.
- Day 9 uses browser-specific temporary separation for saved business profile, FAQ, calendar, and generation data until Auth is added.
- Day 10 makes `/agent` the primary creation experience and keeps individual generation pages as deeper tools.
- Day 11 keeps the default plan as free until login and payment exist.
- Day 11 shows pricing and upgrade intent without connecting Toss Payments or Stripe.
- Day 12 adds `/demo` as the fastest entry point and keeps it separate from the real setup flow.
- Quick-start examples add to the current browser experience and are used for presentation, onboarding, and beta testing.
- Day 13 keeps `/agent` as the core value screen and makes `/dashboard` lead with today sales action first.
- Day 13 improves conversion copy without adding payment, login, or automation features.
- Supabase SQL still needs to be executed manually in the Supabase Dashboard before remote persistence can be fully verified.
- Bottom navigation stays simple; history is reachable from the dashboard and app header instead of adding a fifth tab.
- Codex is used for planning, implementation, and progress reporting.
- VS Code is used to inspect and manually edit the project files.

## Open Questions

- Which auth method should be used first: email OTP, password, or social login?
- When should production OpenAI generation be verified after `.env.local` is restored?
- Should generation history or business profile become the first Supabase-backed data feature?
- Which daily workflow creates the strongest reason to subscribe: calendar, generation history, or FAQ quality improvement?
- Which payment provider should be connected first after the pricing UI is validated?

## Next Milestone

Verify Day 13 conversion UX polish end to end, deploy it to Vercel production, and use `/ -> /demo -> /agent -> /history -> /calendar -> /pricing -> /feedback` as the Wednesday presentation route. Day 14 should focus on final submission stability, README, QA checklist, and video/demo flow.
