# AI 사장님 매출 비서 - Project Plan

## Product Goal

Build an AI work assistant SaaS for Korean and global small business owners. The first product value is helping owners generate customer replies, review responses, and promotional posts from store information and FAQs.

## Current Phase

Day 2 mock generation screens are complete. The app now has customer inquiry reply, review reply, and promotional post generation flows using local state and mock data only.

## Priorities

- Build the minimum workflow for store setup, mock text generation, FAQ management, and copy-ready result previews.
- Keep the first experience simple enough for non-technical owners to use in minutes.
- Defer platform integrations, automation, payments, and advanced analytics until after MVP validation.

## Working Decisions

- Framework: Next.js 16 App Router
- UI: React 19 and Tailwind CSS 4
- AI: OpenAI API planned later, not implemented on Day 1.
- Data/Auth: Supabase planned later, not implemented on Day 1.
- Deployment: Vercel
- Visual design support: Canva connector is available for editable marketing assets, social posts, pitch visuals, and brand-style design drafts.
- First user: small business owners who directly manage customer inquiries, reviews, and promotions.
- MVP scope: customer inquiry replies, review replies, promotional posts, FAQ management, and store information management.
- Day 1 implementation uses mock data and local UI only.
- Codex is used for planning, implementation, and progress reporting.
- VS Code is used to inspect and manually edit the project files.

## Open Questions

- Which auth method should be used first: email OTP, password, or social login?
- Which OpenAI model should be the MVP default?
- Should generation history be included in the first deploy or remain P1?
- For Day 3, should FAQ management come before generation history, or should recent generated results become the next monetization signal?

## Next Milestone

Implement Day 3 FAQ management and generation history UI without OpenAI, Supabase, login, or payment integrations.
