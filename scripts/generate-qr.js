/**
 * Renders the portfolio QR code that sits under the scratch card.
 *
 * The code is generated once and committed as an SVG rather than drawn in
 * the browser, so the page carries no QR library and the image is crisp at
 * any size. Re-run this whenever SCRATCH.portfolioUrl changes — the URL is
 * baked into the pattern, so an edited link with a stale code sends her to
 * the old site with no visible sign anything is wrong.
 *
 *   npm run qr
 */
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const CONFIG = path.join(__dirname, '..', 'src', 'app', 'core', 'content.config.ts');
const OUT = path.join(__dirname, '..', 'src', 'assets', 'scratch', 'portfolio-qr.svg');

function readPortfolioUrl() {
  const source = fs.readFileSync(CONFIG, 'utf8');
  const match = source.match(/portfolioUrl:\s*'([^']*)'/);
  if (!match) {
    throw new Error('could not find portfolioUrl in content.config.ts');
  }
  return match[1];
}

async function main() {
  const url = readPortfolioUrl();

  if (!url) {
    console.log('generate-qr: portfolioUrl is empty — nothing to encode.');
    console.log('             Set it in content.config.ts, then run this again.');
    return;
  }

  const svg = await QRCode.toString(url, {
    type: 'svg',
    // 'M' recovers from ~15% damage, which is plenty for a code displayed
    // on a screen, and keeps the pattern coarse enough to scan small
    errorCorrectionLevel: 'M',
    margin: 1,
    color: { dark: '#2e1a12', light: '#ffffff' },
  });

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, svg);
  console.log(`generate-qr: encoded ${url}`);
  console.log(`             wrote ${path.relative(path.join(__dirname, '..'), OUT)}`);
}

main().catch((err) => {
  console.error('generate-qr failed:', err.message);
  process.exit(1);
});
