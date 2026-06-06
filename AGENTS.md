# Codex Project Instructions

## Next.js Rules

This is not the Next.js version you may know from training data.

- Before changing Next.js code, read the relevant guide in
  `node_modules/next/dist/docs/`.
- Follow the installed Next.js version's APIs, conventions, file structure,
  and deprecation notices.

## Working Agreement

Codex is the command center for planning and progress. VS Code is the primary
place for reviewing and editing implementation files.

VS Code is used for practical review of implementation files only. Codex should
own progress communication: show the current checklist while work is in
progress, then finish with a concise text summary of what was completed and a
copy-ready next command that can be given to a general ChatGPT or to Codex.

Canva is connected for visual design support. Use Canva when the project needs
editable marketing assets, social posts, pitch visuals, presentation materials,
or brand-style design drafts. Keep product implementation in the codebase; use
Canva for visual collateral and reviewable design artifacts.

For every implementation request:

1. Read `docs/PROJECT_PLAN.md`, `docs/CHECKLIST.md`, and `docs/PROGRESS.md`
   before starting.
2. Update `docs/PROJECT_PLAN.md` when scope, priorities, or architecture change.
3. Update `docs/CHECKLIST.md` when a task starts, changes, or completes.
4. Update `docs/PROGRESS.md` after meaningful work with:
   - what changed
   - verification performed
   - blockers or decisions
   - the next concrete action
5. Keep implementation changes visible and reviewable in VS Code.
6. Do not mark work complete until relevant checks have run.
7. During work, report progress through `docs/CHECKLIST.md` updates.
8. At completion, summarize:
   - completed work
   - created or modified files
   - verification performed
   - remaining issues or cautions
   - next recommended command for the following step

Keep progress notes concise and current. Replace stale status instead of
building an endless activity log.
