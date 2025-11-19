const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

const newKeys = {
  "footer_tagline": "Improving the Capacitor ecosystem,",
  "footer_tagline_subtitle": "one plugin at a time.",
  "soc2_compliant": "SOC 2 Type II Compliant"
};

files.forEach(file => {
  const filePath = path.join(messagesDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    
    let changed = false;
    for (const [key, value] of Object.entries(newKeys)) {
      if (!json[key]) {
        json[key] = value;
        changed = true;
      }
    }

    if (changed) {
      // Sort keys alphabetically to maintain order if desired, or just write back
      const sortedJson = Object.keys(json).sort().reduce((acc, key) => {
        acc[key] = json[key];
        return acc;
      }, {});
      
      fs.writeFileSync(filePath, JSON.stringify(sortedJson, null, 2) + '\n');
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes for ${file}`);
    }
  } catch (e) {
    console.error(`Error processing ${file}:`, e);
  }
});
