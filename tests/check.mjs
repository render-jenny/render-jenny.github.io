// Checks for the portfolio page (index.html). Prints only the failures and a total; add --verbose to see every check.
// It needs Node 18 or later and nothing else.
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const verbose = process.argv.includes('--verbose');
let passed = 0;
const failures = [];
function check(name, ok, detail = '') {
  if (ok) { passed++; if (verbose) console.log('ok    ' + name); }
  else failures.push(name + (detail ? ': ' + detail : ''));
}

// 1. The basics every page needs
check('the page declares its language', /<html[^>]*\slang="en"/.test(html));
check('the page has a title', /<title>[^<]{3,}<\/title>/.test(html));
check('the page has a description', /<meta name="description" content="[^"]{20,}"/.test(html));
check('the page fits a phone (viewport meta tag)', /<meta name="viewport"/.test(html));
check('the page supports light and dark', /<meta name="color-scheme" content="light dark">/.test(html));
check('the page respects reduced motion', /prefers-reduced-motion: reduce/.test(html));
check('there is a skip link', /class="skip-link" href="#main"/.test(html));
check('there is exactly one h1', (html.match(/<h1[\s>]/g) || []).length === 1, `found ${(html.match(/<h1[\s>]/g) || []).length}`);
check('visitors can pause the movement', /id="pause"/.test(html) && /aria-pressed/.test(html));

check('visitors can switch the sound on (it starts off)', /id="sound"[^>]*aria-pressed="false"/.test(html));
check('the mixer has a labelled Music slider and Effects slider', /<label>Music <input id="mix-music" type="range"/.test(html) && /<label>Effects <input id="mix-fx" type="range"/.test(html));
check('sound never starts by itself', !/<audio\b|autoplay/i.test(html) && !/\.resume\(\)/.test(html.split('function setSound')[0]));
check('the page uses no audio files (the sound is made in the browser)', !/\.(mp3|wav|ogg|m4a|aac|flac)\b/i.test(html));

// 2. No unfinished text, and the private email address never appears
check('no placeholder text is left', !/PLACEHOLDER|lorem ipsum/i.test(html));
check('no Gmail address is on the page (the public contact address is not a Gmail one)', !/@(gmail|googlemail)\.com/i.test(html));

// 3. Links and pictures
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
check('every id is unique', dupes.length === 0, dupes.join(', '));
const missingAnchors = [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]).filter(id => !ids.includes(id));
check('every in-page link points at something', missingAnchors.length === 0, missingAnchors.join(', '));
const missingLabels = [...html.matchAll(/aria-labelledby="([^"]+)"/g)].map(m => m[1]).filter(id => !ids.includes(id));
check('every aria-labelledby points at something', missingLabels.length === 0, missingLabels.join(', '));
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
check('every picture has alt text and a size', imgs.every(t => /\salt="[^"]+"/.test(t) && /\swidth="\d+"/.test(t) && /\sheight="\d+"/.test(t)), `${imgs.filter(t => !/\salt="[^"]+"/.test(t)).length} without alt`);
const mediaRefs = [...new Set([...html.matchAll(/media\/[A-Za-z0-9._-]+/g)].map(m => m[0]))];
const missingMedia = mediaRefs.filter(f => !existsSync(join(root, f)));
check('every file in media/ that the page uses exists', missingMedia.length === 0, missingMedia.join(', '));
check('every dialog has a name', [...html.matchAll(/<dialog\b[^>]*>/g)].every(m => /aria-labelledby=/.test(m[0])));
check('every video has a source file', [...html.matchAll(/<video\b[\s\S]*?<\/video>/g)].every(m => /<source src="media\/[^"]+"/.test(m[0])));

// 4. The page loads nothing from other websites (no fonts, scripts, trackers); links out are fine
const external = [...html.matchAll(/<(script|link|img|video|audio|source|iframe)\b[^>]*>/g)]
  .filter(m => /\s(src|href|poster)="(https?:)?\/\//.test(m[0])).map(m => m[0].slice(0, 70));
check('nothing is loaded from other websites', external.length === 0, external.join(' | '));
check('no web fonts or imports from other websites', !/@import|fonts\.googleapis|url\(\s*["']?https?:/.test(html));

// 5. Size, so the page stays quick and inside GitHub Pages limits
check('index.html is under 250 KB', statSync(join(root, 'index.html')).size < 250 * 1024);
const files = readdirSync(join(root, 'media')).map(f => ({ f, size: statSync(join(root, 'media', f)).size }));
const MB = 1024 * 1024;
check('each file in media/ is under 25 MB', files.every(x => x.size < 25 * MB), files.filter(x => x.size >= 25 * MB).map(x => x.f).join(', '));
check('media/ is under 60 MB in total', files.reduce((n, x) => n + x.size, 0) < 60 * MB);

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed, ${passed} passed:\n` + failures.map(f => '  - ' + f).join('\n') + '\n');
  process.exit(1);
}
console.log(`All ${passed} checks passed.`);
