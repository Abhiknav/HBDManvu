/**
 * Builds web-sized copies of every photo.
 *
 * Photos come off a phone at ~3000x4000 and 3-4MB each. The site displays
 * them between 170px and 260px wide, so serving the originals meant tens
 * of megabytes on the wire AND softer pictures, because a browser
 * squeezing a 3024px image into 253px in one filtering step loses detail.
 *
 * Originals stay exactly where they are and are never modified — this
 * writes resized copies to src/assets-web, which is what Angular actually
 * serves (see the assets entry in angular.json). Drop new photos into
 * src/assets as usual; they get picked up on the next build.
 *
 * Re-encoding is skipped when an up-to-date copy already exists, so only
 * newly added photos cost anything after the first run.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'src', 'assets');
const OUT = path.join(__dirname, '..', 'src', 'assets-web');

/**
 * .heic is included deliberately: iPhones shoot it by default and no
 * browser can display it, so these used to be dropped and simply never
 * appear. Everything here is re-encoded to .jpg, which fixes that for
 * free — photos can be copied straight off a phone.
 */
const CONVERTIBLE_RE = /\.(jpe?g|png|webp|avif|tiff?|heic|heif)$/i;
/** copied through untouched — resizing would drop the animation */
const PASSTHROUGH_RE = /\.(gif|svg|ico)$/i;

/**
 * Longest-edge budget per folder, roughly 3x the largest size each is
 * ever displayed at, which leaves headroom for high-density screens
 * without paying for the full original.
 */
const WIDTH_BY_FOLDER = {
  wall: 520, // small tiles, and softened behind a scrim anyway
  balloons: 560,
  memories: 900, // largest on screen and the most closely looked at
  scratch: 700,
  story: 900,
  default: 700,
};

const QUALITY = 80;

function budgetFor(relDir) {
  const top = relDir.split('/')[0];
  return WIDTH_BY_FOLDER[top] ?? WIDTH_BY_FOLDER.default;
}

/** every directory under src/assets that holds images */
function walk(dir, rel = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(abs, relPath));
    else out.push({ abs, rel: relPath });
  }
  return out;
}

function isStale(srcPath, outPath) {
  if (!fs.existsSync(outPath)) return true;
  return fs.statSync(srcPath).mtimeMs > fs.statSync(outPath).mtimeMs;
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.log('optimize-photos: no src/assets folder, nothing to do');
    return;
  }

  const files = walk(SRC);
  /** guards against two source files resolving to the same .jpg output */
  const seen = new Map();
  const failed = [];
  let converted = 0;
  let copied = 0;
  let skipped = 0;
  let srcBytes = 0;
  let outBytes = 0;

  for (const file of files) {
    const relDir = path.dirname(file.rel).split(path.sep).join('/');
    const isConvertible = CONVERTIBLE_RE.test(file.rel);
    const isPassthrough = PASSTHROUGH_RE.test(file.rel);
    if (!isConvertible && !isPassthrough) continue;

    // everything convertible is emitted as .jpg regardless of source type
    const parsed = path.parse(file.rel);
    const outRel = isConvertible ? path.join(parsed.dir, `${parsed.name}.jpg`) : file.rel;
    const outPath = path.join(OUT, outRel);

    if (isConvertible && seen.has(outRel) ) {
      console.warn(
        `  !! ${file.rel} and ${seen.get(outRel)} both become ${outRel} — keeping the first`
      );
      continue;
    }
    if (isConvertible) seen.set(outRel, file.rel);

    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    if (!isStale(file.abs, outPath)) {
      skipped++;
      srcBytes += fs.statSync(file.abs).size;
      outBytes += fs.statSync(outPath).size;
      continue;
    }

    try {
      if (isPassthrough) {
        fs.copyFileSync(file.abs, outPath);
        copied++;
      } else {
        await sharp(file.abs)
          // honours the EXIF orientation flag phones set, so portrait shots
          // do not come out sideways once the metadata is stripped
          .rotate()
          .resize({
            width: budgetFor(relDir),
            height: budgetFor(relDir),
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
          .toFile(outPath);
        converted++;
      }
    } catch (err) {
      // one unreadable photo must not take the whole build down — a
      // truncated phone transfer is a normal thing to hit
      failed.push({ file: file.rel, reason: err.message.split('\n')[0] });
      seen.delete(outRel);
      if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
      continue;
    }

    srcBytes += fs.statSync(file.abs).size;
    outBytes += fs.statSync(outPath).size;
  }

  // drop copies whose source has since been deleted or renamed
  let pruned = 0;
  if (fs.existsSync(OUT)) {
    const sourceOutRels = new Set(
      files
        .filter((f) => CONVERTIBLE_RE.test(f.rel) || PASSTHROUGH_RE.test(f.rel))
        .map((f) => {
          const p = path.parse(f.rel);
          const rel = CONVERTIBLE_RE.test(f.rel) ? path.join(p.dir, `${p.name}.jpg`) : f.rel;
          return rel.split(path.sep).join('/');
        })
    );
    for (const existing of walk(OUT)) {
      if (!sourceOutRels.has(existing.rel)) {
        fs.unlinkSync(existing.abs);
        pruned++;
      }
    }
  }

  const mb = (b) => (b / 1048576).toFixed(1);
  console.log(
    `optimize-photos: ${converted} resized, ${copied} copied, ${skipped} already current` +
      (pruned ? `, ${pruned} pruned` : '') +
      ` — ${mb(srcBytes)}MB -> ${mb(outBytes)}MB served`
  );

  if (failed.length) {
    console.warn(
      `\n  !! ${failed.length} photo(s) could not be read and will NOT appear:\n` +
        failed.map((f) => `     ${f.file}  (${f.reason})`).join('\n') +
        `\n     Usually a truncated copy — re-copy it from the phone.\n`
    );
  }
}

main().catch((err) => {
  console.error('optimize-photos failed:', err.message);
  process.exit(1);
});
