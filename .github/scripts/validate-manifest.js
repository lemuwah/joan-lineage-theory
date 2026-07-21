const fs = require('fs');
const path = require('path');

const manifestPath = 'MANIFEST.md';
const imagesDir = 'images';
const reportPath = '.github/scripts/validation-report.md';

function safeReadFile(p) {
  try {
    return fs.readFileSync(p, 'utf-8');
  } catch (err) {
    console.error(`❌ ERROR: Cannot read file: ${p}`);
    console.error(err);
    process.exit(1);
  }
}

function safeReadDir(p) {
  try {
    return fs.readdirSync(p);
  } catch (err) {
    console.error(`❌ ERROR: Cannot read directory: ${p}`);
    console.error(err);
    process.exit(1);
  }
}

// Normalize filenames so .JPG / .jfif / .jpeg all compare cleanly
function normalizeName(name) {
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, ext);
  if (ext === '.jpeg' || ext === '.jfif') return `${base}.jpg`;
  return `${base}${ext}`;
}

function readManifest() {
  const raw = safeReadFile(manifestPath);
  return raw
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && !line.toLowerCase().startsWith('image manifest'))
    .map(normalizeName);
}

function readImages() {
  return safeReadDir(imagesDir)
    .filter(name => !name.startsWith('.')) // ignore hidden files
    .map(normalizeName);
}

function validate() {
  const manifestFiles = readManifest();
  const imageFiles = readImages();

  const manifestSet = new Set(manifestFiles);
  const imageSet = new Set(imageFiles);

  const missing = manifestFiles.filter(f => !imageSet.has(f));
  const extra = imageFiles.filter(f => !manifestSet.has(f));

  let report = '# Validation Report\n\n';
  report += 'This report is generated automatically from MANIFEST.md and /images.\n\n';

  if (missing.length > 0) {
    report += '## Missing files (listed in MANIFEST.md but not found in /images)\n';
    missing.forEach(f => { report += `- ${f}\n`; });
    report += '\n';
  }

  if (extra.length > 0) {
    report += '## Extra files (present in /images but not listed in MANIFEST.md)\n';
    extra.forEach(f => { report += `- ${f}\n`; });
    report += '\n';
  }

  if (missing.length === 0 && extra.length === 0) {
    report += 'All files match MANIFEST.md.\n';
  }

  fs.writeFileSync(reportPath, report);

  if (missing.length > 0 || extra.length > 0) {
    process.exit(1);
  }
}

validate();
