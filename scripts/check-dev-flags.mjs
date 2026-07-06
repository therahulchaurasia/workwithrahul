// Build guard: blocks `next build` if dev-only cache-bypass flags are still in
// the source. Runs via the npm `prebuild` hook. See memory/CLAUDE.md.
import { readFileSync } from "node:fs";

const FILE = "src/app/layout.tsx";
const FORBIDDEN = ["force-dynamic", "force-no-store"];

const src = readFileSync(FILE, "utf8");
const hits = FORBIDDEN.filter((flag) => src.includes(flag));

if (hits.length > 0) {
  console.error(
    `\n[31m✖ Build blocked:[0m dev-only cache flags found in ${FILE}: ${hits.join(
      ", "
    )}\n  Remove the "DEV-ONLY cache bypass" block before building for production.\n`
  );
  process.exit(1);
}
