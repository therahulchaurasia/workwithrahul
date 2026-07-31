// Case-study screenshot capture. Drives the installed Chrome at a viewport and
// pixel ratio fixed in code, so Windows display scaling, the DevTools zoom-to-fit
// dropdown, and scrollbar width can't shift the output. Every file lands at
// identical dimensions, run to run.
//
//   npm run shots              capture everything in SHOTS
//   npm run shots -- --headed  watch it work (needed for logins / bot checks)
//   npm run shots -- --only=withsam-home
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// 1440x900 is exactly 16:10, the ratio the gallery grid renders, so the shots
// drop into the layout without cropping.
const VIEWPORT = { width: 1440, height: 900 };
// Capture at 2x and downscale. Supersampling keeps small UI text crisp in a way
// that capturing at 1600 directly does not.
const SCALE = 2;
// Widest the gallery ever renders an image is 630 CSS px (1350px container, 40px
// padding, two columns, 10px gap), so 1600 covers a 2x display with headroom.
const OUT_WIDTH = 1600;
const OUT_DIR = "public/showcase";

// One entry per image. `out` becomes <out>.webp in public/showcase.
// `scrollTo` is CSS pixels from the top, or "bottom"; omit for the top of the
// page. `hover` is a selector to park the cursor on, for capturing hover states.
// `hide` takes extra CSS selectors to drop for this shot only.
const SHOTS = [
  // Shot 1 of each project also becomes its card in Selected Work, where the
  // box is 5:4 and crops the sides, so keep the subject centred here.
  { url: "https://withsam.in/", out: "withsam-home" },
  // Framed just below the SHOWCASE marquee. Including the marquee put a 9px
  // strip of clipped text on the top edge that read as a cropping mistake
  // rather than a design element, and pushed the cards off centre.
  { url: "https://withsam.in/", out: "withsam-work", scrollTo: 956 },
  {
    url: "https://withsam.in/",
    out: "withsam-connect",
    scrollTo: "bottom",
    nudgeUp: 40,
    hover: 'a[href^="mailto:connect"]',
  },
  { url: "https://withsam.in/videos", out: "withsam-videos" },
  { url: "https://withsam.in/about-me", out: "withsam-about" },
  {
    url: "https://withsam.in/blogs/how-to-create-and-animate-straight-and-dashed-lines-in-davinci-resolve",
    out: "withsam-blog",
  },

  // Asahi Ramen. The site is uneven, so these are framed on the sections worth
  // showing rather than whole pages.
  { url: "https://asahiramen.in/", out: "asahi-hero" },
  // The footer embeds a Google map that needs a few seconds before its info
  // card has any text in it.
  {
    url: "https://asahiramen.in/",
    out: "asahi-footer",
    scrollTo: "bottom",
    settle: 6000,
  },
  {
    url: "https://asahiramen.in/menu",
    out: "asahi-menu",
    anchor: 'h2:has-text("Ramen Bowls")',
    anchorOffset: -60,
  },
  {
    url: "https://asahiramen.in/about-us",
    out: "asahi-about",
    anchor: 'h2:has-text("The Story of")',
    anchorOffset: -40,
  },

  // Pandya Infra. Framer mounts sections lazily, so the settle is longer than
  // default across the board here.
  {
    url: "https://pandya-infra.framer.website/",
    out: "pandya-hero",
    approachUp: true,
    settle: 1500,
  },
  {
    url: "https://pandya-infra.framer.website/",
    out: "pandya-works",
    anchor: 'h2:has-text("Featured Works")',
    anchorOffset: -80,
    settle: 1500,
  },
  {
    url: "https://pandya-infra.framer.website/",
    out: "pandya-services",
    anchor: 'h2:has-text("What We Do")',
    anchorOffset: -80,
    settle: 1500,
  },
  // Ridgeway is the template's demo entry and the only project page with real
  // copy in it, so it's the one that actually shows the case-study layout
  // working. The client's own entries are still unpopulated.
  {
    url: "https://pandya-infra.framer.website/projects/ridgeway-cultural-pavilion",
    out: "pandya-detail",
    anchor: 'text="Details"',
    anchorOffset: -40,
    settle: 1500,
  },

  // Mid-animation frame. The section stacks an outlined copy of the paragraph
  // under a dark one masked by a linear-gradient, and the gradient stop is the
  // fill progress. It tracks scroll linearly at ~0.162% per pixel: 0% at
  // y=1900, 100% by y=2560. 2250 lands around 57%, filled enough to read as
  // deliberate. Re-measure if the section above it changes height.
  {
    url: "https://pandya-infra.framer.website/",
    out: "pandya-fill",
    scrollTo: 2250,
    settle: 1500,
  },

  // Carousel plus footer in one frame: together they run 1006px tall, which
  // won't fit a 900px viewport. 1680x1050 is still exactly 16:10 and does.
  {
    url: "https://pandya-infra.framer.website/",
    out: "pandya-footer",
    viewport: { width: 1680, height: 1050 },
    scrollTo: "bottom",
    settle: 2500,
  },
];

// Overlays that sit on top of otherwise good shots. Removed from the DOM rather
// than hidden, so anything they were covering reflows back into place.
const DISMISS = [
  "[id*='cookie' i]",
  "[class*='cookie' i]",
  "[id*='consent' i]",
  "[class*='consent' i]",
  "[aria-label*='cookie' i]",
  "#onetrust-consent-sdk",
  ".grecaptcha-badge",
  "[id*='intercom' i]",
  "[class*='crisp-client' i]",
  "[id*='drift' i]",
  // Framer's free-plan badge. A hosting artifact, not part of the design, and
  // it disappears the moment a site moves to a custom domain.
  "#__framer-badge-container",
  "[class*='framer-badge' i]",
  "a[href*='framer.com']",
];

const args = process.argv.slice(2);
const headed = args.includes("--headed");
const only = args
  .find((a) => a.startsWith("--only="))
  ?.slice("--only=".length)
  .split(",");

async function capture(page, shot) {
  // Per-shot viewport, still 16:10. A smaller one renders the page larger
  // relative to the frame, which is how you make a thin strip like a marquee
  // survive the downscale into a 629px gallery slot.
  await page.setViewportSize(shot.viewport ?? VIEWPORT);
  await page.goto(shot.url, { waitUntil: "load", timeout: 45_000 });

  // Freeze animation rather than disabling it: a zero duration snaps every
  // keyframe to its end state, so scroll-reveal content is visible instead of
  // stuck at opacity 0, and nothing is caught mid-transition.
  await page.addStyleTag({
    content: `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important;}`,
  });

  for (const selector of [...DISMISS, ...(shot.hide ?? [])]) {
    await page
      .locator(selector)
      .evaluateAll((nodes) => nodes.forEach((n) => n.remove()))
      .catch(() => {});
  }

  // Walk to the bottom and back so lazy-loaded images decode before we shoot,
  // otherwise half the page captures as empty placeholder boxes.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  // Anchoring to an element beats a hardcoded pixel offset: the offset moves
  // when the viewport changes or the site ships a layout tweak, the element
  // doesn't. anchorOffset is usually negative, to leave air above the target.
  let scrollTo = shot.scrollTo ?? 0;
  if (shot.anchor) {
    const top = await page
      .locator(shot.anchor)
      .first()
      .evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    scrollTo = top + (shot.anchorOffset ?? 0);
  }

  await page.evaluate((y) => {
    const top = y === "bottom" ? document.body.scrollHeight : y;
    window.scrollTo({ top, behavior: "instant" });
  }, scrollTo);

  // Some headers only reveal on a sustained upward scroll, and an instant jump
  // gives their handler nothing to react to. Overshoot below the target and
  // walk up to it in steps. Needed at the very top of a page, where nudgeUp
  // has nowhere to go.
  if (shot.approachUp && typeof scrollTo === "number") {
    for (let offset = 300; offset >= 0; offset -= 60) {
      await page.evaluate(
        (y) => window.scrollTo({ top: y, behavior: "instant" }),
        scrollTo + offset
      );
      await page.waitForTimeout(80);
    }
  }

  // Headers that hide on downward scroll stay hidden when we jump straight to a
  // deep offset. A short scroll back up reads as "going up" and brings them in.
  if (shot.nudgeUp) {
    await page.waitForTimeout(200);
    await page.evaluate(
      (px) => window.scrollBy({ top: -px, behavior: "instant" }),
      shot.nudgeUp
    );
  }

  await page.evaluate(() => document.fonts.ready);
  // Third-party embeds (maps, players) paint well after load fires and will
  // otherwise be captured half-drawn. `settle` buys them time.
  await page.waitForTimeout(shot.settle ?? 600);

  // Move the real cursor rather than page.hover(): hover() scrolls the target
  // into view and would undo the scrollTo we just set.
  if (shot.hover) {
    const box = await page.locator(shot.hover).first().boundingBox();
    if (!box) throw new Error(`hover target not found: ${shot.hover}`);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(300);
  }

  const raw = await page.screenshot({ type: "png" });
  const file = path.join(OUT_DIR, `${shot.out}.webp`);
  const { width, height } = await sharp(raw)
    .resize({ width: OUT_WIDTH })
    .webp({ quality: 80 })
    .toFile(file);

  return { file, width, height };
}

const queue = only ? SHOTS.filter((s) => only.includes(s.out)) : SHOTS;

if (queue.length === 0) {
  console.error(
    `No shot named "${only?.join(", ")}". Known: ${SHOTS.map((s) => s.out).join(", ")}`
  );
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

// channel: "chrome" uses the Chrome already on this machine, which is why the
// install skips playwright's 150MB browser download.
const browser = await chromium.launch({ channel: "chrome", headless: !headed });
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: SCALE,
});
const page = await context.newPage();

let failed = 0;

for (const shot of queue) {
  try {
    const { file, width, height } = await capture(page, shot);
    console.log(`  ${file}  ${width}x${height}`);
  } catch (err) {
    failed += 1;
    console.error(`  ${shot.out} failed: ${err.message}`);
  }
}

await browser.close();

if (failed > 0) process.exit(1);
