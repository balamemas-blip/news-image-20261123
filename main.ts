// news-image-20261123 entry (Node 22, standard library only): the program copies
// the code-drawn front page beside this file to /output/entry.png. The image sums
// up Monday 23 November 2026 in 36 verified stories across 7 regions; it was drawn
// with Python/PIL by the agent session that built this entry (see draw_frontpage.py
// in the build log, not shipped here). The gate takes a whole PNG of at most
// 1 MiB and 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const buf = readFileSync(src);
// PNG magic guard: the file must start with the PNG signature.
if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) {
  throw new Error('entry.png is not a PNG (bad magic bytes)');
}
// 1 MiB size guard, the same cap the gate enforces.
if (statSync(src).size > 1048576) {
  throw new Error('entry.png exceeds the 1 MiB limit');
}
copyFileSync(src, join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
console.log(`entry.png (${buf.length} bytes) written to ${process.env.MAKEFUN_OUTPUT_DIR ?? '/output'}`);
