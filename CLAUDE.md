@../foundation/software.md

# render-jenny.github.io: project rules

This project follows Foundation's software rules (imported above), adopted in D001 in [docs/decisions.md](docs/decisions.md). The rules below win where they're more specific.

- **Stage:** live: a public, static portfolio page with no accounts, no forms and nothing collected from visitors (D004). **Client work:** no.
- **Stack:** plain HTML, CSS and JavaScript in one file, `index.html`, with pictures and videos in `media/`. No framework and no build step (D003). Hosted on GitHub Pages from `main` (D002).
- **Tests:** `node tests/check.mjs` (prints only failures and a total; `--verbose` for every check). `.githooks/test` runs it before each commit, and CI runs it too.
- **Screen checks:** a phone (360px and 320px), a laptop (1280px) and the owner's window (about 1470 x 830), each in light and dark. Look at every change in a browser before shipping it.
- **Accessibility:** WCAG 2.2 AA. Measure text and control contrast against the worst-case water colour in light and dark; keep one `h1`; keep a visible focus ring; keep the pause button; respect reduced motion. Text that sits straight on the water must stay on the pale part of the page (the headings are on solid labels for this reason).
- **No third-party requests.** The page loads nothing from other websites (no fonts, scripts, analytics or embeds), and `tests/check.mjs` fails if it does. Why: that is why the page needs no cookie banner or privacy notice (D005). Videos are files in `media/`, not embeds.
- **What the page says must be true.** Describe a project by what it does today, not by what its README plans. Don't add a skill or a project the owner hasn't built, or a client name the client hasn't agreed to. Why: an unfinished claim ("works offline") had to be removed on 17 November 2026.
- **The private email address stays off the page.** Use the public contact address the owner chooses. `tests/check.mjs` fails if any Gmail address appears.
- **Demos use made-up data only,** and nothing from another publisher's site (cut from the Stone Island News video on 17 November 2026).
- **Decisions:** [docs/decisions.md](docs/decisions.md). **Handover:** [docs/handover.md](docs/handover.md). **Changes:** [CHANGELOG.md](CHANGELOG.md). **Spec:** [specs/01-portfolio-page.md](specs/01-portfolio-page.md).
