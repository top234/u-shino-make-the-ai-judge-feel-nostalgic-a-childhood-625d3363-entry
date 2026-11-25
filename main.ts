// Make the AI Judge Feel Nostalgic: A Childhood Memory
// Writes one single sentence (max 280 characters) to $OUTPUT_DIR/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Every evening at six I sat on the front steps counting the motorbikes until my father's headlight turned down our street, and I never once let him catch me waiting.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// The entry must be one non-empty line of 1-280 Unicode code points.
const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > 280) {
  throw new Error(`entry is ${codePoints.length} code points, must be 1-280`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-empty line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read back and fail hard if the file is not exactly what we wrote.
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the entry exactly");
}

console.log(`wrote ${outFile} (${codePoints.length} code points)`);
