#!/usr/bin/env node

/**
 * Generate archive-stats.json from MANIFEST.md
 * This file is consumed by index.html to populate the stats grid
 * 
 * Output: data/archive-stats.json
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = 'MANIFEST.md';
const STATS_OUTPUT = 'data/archive-stats.json';

function parseManifest(content) {
  const entries = [];
  const lines = content.split('\n');
  
  let inTable = false;
  
  for (const line of lines) {
    if (line.includes('|') && !inTable && line.includes('Filename')) {
      inTable = true;
      continue;
    }
    
    if (inTable && line.includes('|')) {
      if (line.includes('---')) continue;
      
      const parts = line.split('|').map(p => p.trim());
      
      if (parts.length >= 6 && parts[0] && !isNaN(parts[0])) {
        const entry = {
          number: parseInt(parts[0]),
          filename: parts[1],
          type: parts[2],
          logic: parts[3],
          reference: parts[4],
          status: parts[5],
          tier: parts[6] || '',
        };
        
        if (entry.filename && entry.filename !== 'Filename') {
          entries.push(entry);
        }
      }
    }
    
    if (inTable && line.startsWith('#') && !line.includes('|')) {
      break;
    }
  }
  
  return entries;
}

function generateStats(entries) {
  const stats = {
    generatedAt: new Date().toISOString(),
    totalImages: entries.length,
    byStatus: {
      PROVEN: 0,
      PROBABLE: 0,
      UNVERIFIED: 0,
      NULL: 0,
    },
    byTier: {
      'Tier 1': 0,
      'Tier 2': 0,
      'Tier 3': 0,
      'Tier 4': 0,
      'Unclassified': 0,
    },
    byType: {},
    lastUpdated: null,
    dataIntegrity: {
      completeReferences: 0,
      missingReferences: 0,
      completeStatus: 0,
    }
  };
  
  // Categorize entries
  entries.forEach(entry => {
    // Count by status
    for (const status of Object.keys(stats.byStatus)) {
      if (entry.status.includes(status)) {
        stats.byStatus[status]++;
        break;
      }
    }
    
    // Count by tier
    if (entry.tier) {
      const tierMatch = entry.tier.match(/Tier \d|Tier [1-4]|Context/);
      if (tierMatch) {
        const tierName = tierMatch[0].includes('Context') ? 'Unclassified' : tierMatch[0];
        if (stats.byTier[tierName] !== undefined) {
          stats.byTier[tierName]++;
        }
      } else {
        stats.byTier['Unclassified']++;
      }
    } else {
      stats.byTier['Unclassified']++;
    }
    
    // Count by type
    if (entry.type) {
      stats.byType[entry.type] = (stats.byType[entry.type] || 0) + 1;
    }
    
    // Check data integrity
    if (entry.reference && entry.reference !== 'UNVERIFIED' && entry.reference !== 'Context' && entry.reference !== '') {
      stats.dataIntegrity.completeReferences++;
    } else {
      stats.dataIntegrity.missingReferences++;
    }
    
    if (Object.values(stats.byStatus).some(v => v > 0)) {
      stats.dataIntegrity.completeStatus++;
    }
  });
  
  // Get latest git commit date for "last updated"
  try {
    const result = require('child_process')
      .execSync('git log -1 --format=%aI images/ 2>/dev/null || echo ""', { encoding: 'utf-8' })
      .trim();
    if (result) stats.lastUpdated = result;
  } catch (e) {
    // Fallback if git not available
    stats.lastUpdated = new Date().toISOString();
  }
  
  return stats;
}

function main() {
  console.log('📊 Generating archive statistics...\n');
  
  try {
    const manifest = fs.readFileSync(MANIFEST_PATH, 'utf-8');
    const entries = parseManifest(manifest);
    const stats = generateStats(entries);
    
    // Ensure output directory exists
    fs.mkdirSync(path.dirname(STATS_OUTPUT), { recursive: true });
    
    // Write JSON file
    fs.writeFileSync(STATS_OUTPUT, JSON.stringify(stats, null, 2));
    
    console.log(`✅ Statistics generated successfully!\n`);
    console.log(`📈 Total images: ${stats.totalImages}`);
    console.log(`   PROVEN: ${stats.byStatus.PROVEN}`);
    console.log(`   PROBABLE: ${stats.byStatus.PROBABLE}`);
    console.log(`   UNVERIFIED: ${stats.byStatus.UNVERIFIED}`);
    console.log(`   NULL: ${stats.byStatus.NULL}\n`);
    console.log(`📊 Tier 1: ${stats.byTier['Tier 1']} | Tier 2: ${stats.byTier['Tier 2']} | Tier 3: ${stats.byTier['Tier 3']} | Tier 4: ${stats.byTier['Tier 4']}\n`);
    console.log(`📄 Output: ${STATS_OUTPUT}\n`);
    console.log('Stats object structure:');
    console.log(JSON.stringify(stats, null, 2));
    
  } catch (error) {
    console.error(`❌ Error generating statistics:`, error.message);
    process.exit(1);
  }
}

main();
