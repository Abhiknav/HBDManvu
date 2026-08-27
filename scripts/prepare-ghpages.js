/**
 * Post-build step for GitHub Pages.
 *
 * GitHub Pages serves static files only — it has no SPA fallback, so a
 * direct hit or refresh on /experience would 404. Copying index.html to
 * 404.html makes Pages serve the app for unknown paths, letting the
 * Angular router take over and resolve the route client-side.
 *
 * .nojekyll stops Pages running the output through Jekyll, which would
 * otherwise strip files and folders beginning with an underscore.
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'dist', 'manvi-birthday', 'browser');
const indexHtml = path.join(outDir, 'index.html');

if (!fs.existsSync(indexHtml)) {
  console.error(`prepare-ghpages: build output not found at ${indexHtml}`);
  process.exit(1);
}

fs.copyFileSync(indexHtml, path.join(outDir, '404.html'));
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

console.log('prepare-ghpages: wrote 404.html and .nojekyll');
