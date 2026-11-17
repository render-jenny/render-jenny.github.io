# render-jenny.github.io

Jenny Shen's portfolio page: who she is, three projects with demos, and her skills. It's live at https://render-jenny.github.io.

**Stage:** live (a static page: no accounts, no forms, nothing collected from visitors). **Stack:** plain HTML, CSS and JavaScript in one file, with pictures and videos in `media/`. No framework and no build step (D003). Hosted on GitHub Pages from `main` (D002).

## Run it

Open `index.html` in any modern browser. No internet connection is needed.

## Test it

You need [Node.js](https://nodejs.org/) 18 or later.

```
node tests/check.mjs             # prints only failures and a total
node tests/check.mjs --verbose   # prints every check
```

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The whole page: the styles, the content and the small script that draws the sea. |
| `media/` | Demo videos, posters and screenshots of Jenny's own projects, with made-up demo data. |
| `tests/check.mjs` | The checks: structure, links, pictures, no third-party requests, size. |
| `.githooks/` | Foundation's commit and push checks. After cloning, run `git config core.hooksPath .githooks`. |
| `docs/decisions.md`, `docs/handover.md` | Why things are the way they are, and what happened in each session. |
| `specs/` | What the page must do, with acceptance criteria. |
| `CLAUDE.md` | How we work: standards and rules for every change. |

## How we work

The project follows Foundation, Jenny's shared software rules, kept in a separate repo that is private for now. Changes go through a pull request with CI checks, then squash and merge.

## Copyright

Copyright © 2026 Jenny Shen. All rights reserved. The videos and screenshots show Jenny's own projects, using made-up demo data.
