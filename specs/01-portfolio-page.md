# Spec 01: the portfolio page

A single public page where a visitor (often someone hiring) learns who Jenny is, sees her work and her skills, and can reach her.

## What the page must do

1. Say who Jenny is in the first screen: her name, her GitHub name, her role and a short introduction.
2. Show three projects, each with a plain description of what it does today, its tools, and a label saying whether it is live, open code or private.
3. Let a visitor watch a demo of Stone Island News and of Bootcamp Connect, with the steps written out for anyone who can't watch.
4. Tell Jenny's background (music, her studio, the bootcamp) in a short About section.
5. List her skills in groups.
6. Give a way to contact her. At the moment this is GitHub only; a public email address is still to come (see the handover).
7. Work on a phone, a laptop and a large screen, in light and dark, and with a keyboard.
8. Let a visitor pause all movement, and stop the movement for visitors who reduce motion.

## Acceptance criteria

- `node tests/check.mjs` passes: language set, one `h1`, skip link, no placeholder text, every picture has alt text and a size, every file the page uses exists, every dialog has a name, nothing is loaded from other websites, and the media folder is within its size limits.
- All text and controls meet WCAG 2.2 AA contrast, measured in light and dark at the lightest and darkest water.
- At 320px wide there is no sideways scrolling, and nothing important is hidden behind the pause button.
- The page loads no cookies, scripts or fonts from other websites.
- No claim on the page describes something that isn't built.
- No private email address, client name or other publisher's content is on the page or in the videos.
