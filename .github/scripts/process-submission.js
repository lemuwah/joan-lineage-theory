const fs = require('fs');
const path = require('path');

// Read the raw JSON data parsed from the GitHub Issue Form
const rawData = process.env.PARSED_DATA;
const issueNum = process.env.ISSUE_NUMBER;

if (!rawData) {
  console.error("No issue data found.");
  process.exit(1);
}

const issueData = JSON.parse(rawData);

// Extract fields using the exact 'id' tags defined in your submit-source.yml
const archiveId = issueData['archive-id'] || 'Unknown Archive';
const iiifManifest = issueData['iiif-manifest'] || '';
const teiSnippet = issueData['tei-snippet'] || '';
const marksObserved = issueData['mark-verification'] || [];

// Create a clean filename slug based on the archive identifier
const slug = archiveId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const filename = `issue-${issueNum}-${slug}`;

// Ensure target directories exist inside your repository structure
fs.mkdirSync(path.join(__dirname, '../../data/submissions/tei'), { recursive: true });
fs.mkdirSync(path.join(__dirname, '../../data/submissions/manifests'), { recursive: true });

// 1. Build and write the Markdown file for your collection frontend / GIS mapping data
const mdContent = `---
layout: primary_source
issue_id: ${issueNum}
archive_citation: "${archiveId.replace(/"/g, '\\"')}"
iiif_manifest: "${iiifManifest}"
marks_verified: ${JSON.stringify(marksObserved)}
date_processed: "${new Date().toISOString().split('T')[0]}"
---

### Contributed Data Record
This record was extracted automatically via the Submit Evidence pipeline from issue #${issueNum}.

* **Archive:** ${archiveId}
* **IIIF Source:** ${iiifManifest ? `[Manifest Link](${iiifManifest})` : 'None provided'}
`;

fs.writeFileSync(path.join(__dirname, `../../data/submissions/${filename}.md`), mdContent);

// 2. Build and write the standalone raw TEI fragment for your text compilation pipelines
if (teiSnippet.trim().length > 0) {
  const teiContent = `<!-- TEI fragment from Issue #${issueNum} -->
<docImago source="${iiifManifest}">
  <headerDecl>
    <sourceDesc>
      <p>${archiveId}</p>
    </sourceDesc>
  </headerDecl>
  <body>
    ${teiSnippet}
  </body>
</docImago>`;
  
  fs.writeFileSync(path.join(__dirname, `../../data/submissions/tei/${filename}.xml`), teiContent);
}

console.log(`Successfully generated files for ${filename}`);
