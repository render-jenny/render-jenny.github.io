# Spec 02: underwater sound

Closes issue #3. A calm soundtrack for the sea, and quiet sounds for the buttons. Both are made by the browser's Web Audio API, so the page still has no audio files and loads nothing from other websites (D005).

## What it must do

1. A "Sound" button sits beside the pause button. Sound is **off** until the visitor presses it, every visit. Nothing is stored.
2. When on, a soundtrack plays without a gap or a join, for as long as the visitor stays. It is made of:
   - a slow, soft pad of long chords that change about every 16 seconds (a 64-second cycle that repeats);
   - a muffled, "heard from under the water" tone: the sound is filtered, and gets darker as the visitor scrolls deeper;
   - water moving: a quiet swell of filtered noise, rising and falling every 10 seconds or so;
   - a few bubbles, one every 3 to 9 seconds, in two sizes (small and high, or big and low) that follow the depth: near the surface mostly small and high, deeper mostly big and lower, with a few small ones always left; and a sparse melody: a single soft note from a calm scale every 8 to 16 seconds, played with a warm electric-piano tone that fades away, with a faint single echo (not bouncing side to side) on about 4 notes in 10;
   - a long, soft echo (reverb) over everything.
3. It stays uncluttered: never more than one bubble or melody note at once in the foreground, and quiet overall (peak well below full volume).
4. Pressing the button again fades the sound out over about 1.5 seconds, then stops it. Turning it on fades in over about 3 seconds.
5. Button sounds (only while sound is on): a soft rising "bloop" when a button or link-button is pressed and when a demo opens; a soft falling one when a demo closes or the pause button is used.
6. The sound pauses while the tab is hidden and resumes when it is shown again, if sound is on.

## Acceptance criteria

- The sound button is a real `button` with `aria-pressed`, a visible focus ring, a name that says what it does, and enough contrast in light and dark. It is reachable by keyboard.
- It works at 320px wide without sideways scrolling and without covering anything important (it sits with the pause button).
- It is still shown for visitors who reduce motion (sound isn't motion).
- No sound starts before the visitor presses the button (WCAG 1.4.2).
- `node tests/check.mjs` passes, and checks that the page still has no audio file or other website request.
- The page's text doesn't claim anything beyond this.

## Not in this version

Volume slider, saving the choice, hover sounds, music that follows the fish.
