# AI 사장님 매출 비서 - Project Plan

## Product Goal

Build an AI work assistant SaaS for Korean and global small business owners. The first product value is helping owners generate customer replies, review responses, and promotional posts from store information and FAQs.

## Current Phase

Day 11 pricing and usage guard implementation is in progress. The app reads `.env.local` from the project root, calls OpenAI through server routes, and has a Supabase REST storage layer for business profile, FAQs, calendar events, and generation history. Day 11 adds `/pricing`, usage cards, free-plan generation limits, and beta feedback collection before real payment integration.

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

Verify Day 11 pricing and usage flows end to end, then run `supabase/app_storage_schema.sql` in the Supabase SQL editor when ready and re-run `npm run supabase:check`. Keep login, payment, and real notification features out of scope until the next planned integration step.
