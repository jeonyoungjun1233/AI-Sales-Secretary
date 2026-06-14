# AI 사장님 매출 비서 - Project Plan

## Product Goal

Build an AI work assistant SaaS for Korean and global small business owners. The first product value is helping owners generate customer replies, review responses, and promotional posts from store information and FAQs.

## Current Phase

Day 6 browser-based work memory layer is in progress. Day 5 monthly calendar UX, dashboard schedule preview, GitHub push, and Vercel production deployment are complete.

## Priorities

- Build the minimum workflow for store setup, mock text generation, FAQ management, and copy-ready result previews.
- Keep the first experience simple enough for non-technical owners to use in minutes.
- Make the core app routes look and behave like a mobile app, not a blog or desktop dashboard.
- Add a calendar-style daily work view so owners have a reason to return every day.
- Improve the calendar into a real monthly mobile view with date selection and local schedule creation.
- Add a browser-based memory layer so generation history, schedules, FAQs, and store information feel continuous before the database step.
- Add a `/history` screen so owners can reuse recently created replies and promotional text.
- Show saved time and recent work on the dashboard to strengthen subscription value.
- Keep app copy short, direct, and focused on the next action.
- Prepare a provider-based generation architecture before connecting paid external generation services.
- Keep user-facing screens focused on business outcomes instead of technical provider details.
- Defer platform integrations, automation, payments, and advanced analytics until after MVP validation.

## Working Decisions

- Framework: Next.js 16 App Router
- UI: React 19 and Tailwind CSS 4
- AI: provider architecture is being prepared on Day 4; real external calls are still not implemented.
- Data/Auth: Supabase planned later, not implemented yet.
- Deployment: Vercel
- Visual design support: Canva connector is available for editable marketing assets, social posts, pitch visuals, and brand-style design drafts.
- First user: small business owners who directly manage customer inquiries, reviews, and promotions.
- MVP scope: customer inquiry replies, review replies, promotional posts, FAQ management, and store information management.
- Current implementation uses mock/provider-based generation and browser-based temporary storage.
- Day 6 intentionally keeps browser memory separate from future Supabase persistence.
- Bottom navigation stays simple; history is reachable from the dashboard and app header instead of adding a fifth tab.
- Codex is used for planning, implementation, and progress reporting.
- VS Code is used to inspect and manually edit the project files.

## Open Questions

- Which auth method should be used first: email OTP, password, or social login?
- Which external generation provider should be connected first after Day 4?
- Should generation history or business profile become the first Supabase-backed data feature?
- Which daily workflow creates the strongest reason to subscribe: calendar, generation history, or FAQ quality improvement?
- What usage limit and plan boundary should be shown before paid conversion?

## Next Milestone

Complete the Day 6 browser memory layer, `/history` screen, dashboard value summary, monetization/benchmark documents, local verification, GitHub push, and Vercel production deployment without connecting OpenAI, Supabase, login, payment, or real notification features.
