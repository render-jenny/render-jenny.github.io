# Decisions log

Important decisions for render-jenny.github.io, newest last: hard to undo, sets the direction, costs money, involves the law or personal data, or one the owner would explain to a client. Smaller choices go in the changelog and the spec. When a decision changes, add a new entry and mark the old one Superseded. Never delete one.

**Status:** Accepted · Proposed (the owner hasn't confirmed it yet) · Superseded

## Summary

| #    | Decision                                                                         | Status   |
| ---- | -------------------------------------------------------------------------------- | -------- |
| D001 | Set up with Foundation: a static portfolio page                                  | Accepted |
| D002 | Host on GitHub Pages, from a public repo (an exception to private by default)    | Accepted |
| D003 | Plain HTML, CSS and JavaScript: no framework and no build step                   | Proposed |
| D004 | Stage live, without an expert review of security and privacy                     | Proposed |
| D005 | No third-party requests: the page loads nothing from other websites              | Proposed |

## Decisions

### D001 Set up with Foundation

- **Date:** 2026-11-17
- **Decision:** the portfolio page is a Foundation project: `CLAUDE.md` imports `../foundation/software.md`, with decisions, a handover, a spec, commit and push checks, and CI. It is a static page, so there are no package dependencies, linter or formatter to run (see D003).
- **Why:** Foundation is the owner's way of working for every project, and the page needs to be editable safely in future, with saved versions and checks.
- **Options considered:** leaving it as an unversioned folder (no history, no checks, nothing to publish from).
- **Reviewed:** 2026-11-17, set up in a session with Claude; a fresh-subagent review before publishing is recorded in the handover.

### D002 Host on GitHub Pages, from a public repo

- **Date:** 2026-11-17
- **Decision:** the page is served by GitHub Pages from the `main` branch of a public repo named `render-jenny.github.io`. This is an exception to Foundation's "new repos are private" rule (F022). Foundation's host trigger is met like this: the host was chosen after checking GitHub's current rule; `main` deploys automatically when it changes; there is no preview link for each pull request, because Pages doesn't offer one, so changes are looked at locally first.
- **Why:** the owner asked for a GitHub page. On GitHub Free, Pages publishes only from public repos ([GitHub Docs, "GitHub's plans"](https://docs.github.com/en/get-started/learning-about-github/githubs-products)). The repo holds only what the owner has chosen to publish: the page, its demo videos and screenshots (made-up data), and its checks.
- **Options considered:** (1) a public repo on the free plan (chosen); (2) a paid GitHub plan, which publishes Pages from a private repo but still serves a public site (costs money, price not checked, needs the owner's approval first); (3) another host such as Vercel, listed in `stack.md` for Next.js projects (the address would not be a `github.io` one).
- **Reviewed:** 2026-11-17, confirmed by the owner ("yes and make a public repo").

### D003 Plain HTML, CSS and JavaScript

- **Date:** 2026-11-17
- **Decision:** one `index.html` with its styles and a small script, and media files beside it. No framework, no package manager, no build step. This departs from `stack.md`, which defaults web projects to Next.js with Tailwind.
- **Why:** it is a single static page with no server, accounts or shared state. A framework would add dependencies to keep updated and a build to maintain, for no gain. GitHub Pages serves the files as they are.
- **Options considered:** Next.js with a static export; React with Vite. Either would mean a build and dependencies for one page.
- **Reviewed:** 2026-11-17, proposed by Claude; the owner is asked to confirm.

### D004 Stage live, without an expert review

- **Date:** 2026-11-17
- **Decision:** the project's stage is live, because the page is open to everyone. Foundation asks for an expert review of security and privacy before live; this is proposed as not needed, because the page is static and collects nothing: no accounts, no forms, no cookies, no analytics, no third-party requests (D005). Visitors' addresses are logged by GitHub under its own policy, which this project can't control.
- **Why:** an expert review is meant for apps that hold users' data. If the page gains a contact form, analytics, comments or accounts, the personal data, online safety and running-a-service triggers in `software-reference.md` apply first, and this decision must be revisited.
- **Options considered:** calling it alpha (wrong: alpha is for demos, and this is open to everyone); paying for an expert review (out of proportion for a static page).
- **Reviewed:** 2026-11-17, proposed by Claude; the owner is asked to confirm.

### D005 No third-party requests

- **Date:** 2026-11-17
- **Decision:** the page loads nothing from other websites: system fonts, no scripts or analytics, no embeds. Demo videos are files in `media/`, not YouTube embeds. Links to other sites are fine. `tests/check.mjs` fails if the page starts loading anything from elsewhere.
- **Why:** privacy by design (UK GDPR Article 25): a visitor's browser doesn't contact anyone but GitHub, so the page needs no cookie banner or privacy notice, and loads quickly.
- **Options considered:** web fonts from a font service and embedded videos (both send visitors' addresses to another company).
- **Reviewed:** 2026-11-17, proposed by Claude; the owner is asked to confirm.
