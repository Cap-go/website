import fs from 'fs';
import path from 'path';

const pluginsFile = fs.readFileSync('src/config/plugins.ts', 'utf8');

// 1. Parse imports
const importRegex = /import\s+(\w+)\s+from\s+'astro-heroicons\/mini\/([\w.]+)'/g;
const iconMap = {};
let match;
while ((match = importRegex.exec(pluginsFile)) !== null) {
  iconMap[match[1]] = match[2];
}

// 2. Parse actions
const actionsStart = pluginsFile.indexOf('export const actions = [');
const actionsEnd = pluginsFile.lastIndexOf(']');
const actionsContent = pluginsFile.substring(actionsStart, actionsEnd);

// Split by "}," to get rough objects
const objectStrings = actionsContent.split('},');

const plugins = [];

for (const str of objectStrings) {
  const nameMatch = str.match(/name:\s*'([^']+)'/);
  const hrefMatch = str.match(/href:\s*'([^']+)'/);
  const titleMatch = str.match(/title:\s*'([^']+)'/);
  const iconMatch = str.match(/icon:\s*(\w+)/);

  if (nameMatch && hrefMatch && titleMatch && iconMatch) {
    plugins.push({
      name: nameMatch[1],
      href: hrefMatch[1],
      title: titleMatch[1],
      iconVar: iconMatch[1]
    });
  }
}

// 3. Gradient Logic
const gradients = [
  ['#3b82f6', '#06b6d4'], // blue-500 to cyan-500
  ['#a855f7', '#ec4899'], // purple-500 to pink-500
  ['#22c55e', '#10b981'], // green-500 to emerald-500
  ['#f97316', '#ef4444'], // orange-500 to red-500
  ['#6366f1', '#a855f7'], // indigo-500 to purple-500
  ['#ec4899', '#f43f5e'], // pink-500 to rose-500
  ['#14b8a6', '#22c55e'], // teal-500 to green-500
  ['#ef4444', '#f97316'], // red-500 to orange-500
  ['#06b6d4', '#3b82f6'], // cyan-500 to blue-500
  ['#eab308', '#f97316'], // yellow-500 to orange-500
];

const getGradient = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

// 4. Generate SVGs
const outputDir = 'public/icons/plugins';
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

for (const plugin of plugins) {
  const iconFile = iconMap[plugin.iconVar];
  if (!iconFile) {
      console.log(`Icon file not found for ${plugin.title} (${plugin.iconVar})`);
      continue;
  }

  const iconPath = path.join('node_modules/astro-heroicons/mini', iconFile);
  if (!fs.existsSync(iconPath)) {
      console.log(`Icon path does not exist: ${iconPath}`);
      continue;
  }

  const iconContent = fs.readFileSync(iconPath, 'utf8');
  // Extract all path elements
  const pathMatches = iconContent.match(/<path[^>]+>/g);
  if (!pathMatches) {
      console.log(`No path found in ${iconFile}`);
      continue;
  }
  
  const pathElements = pathMatches.map(pathElement => {
      if (pathElement.includes('fill="')) {
          return pathElement.replace(/fill="[^"]+"/, 'fill="white"');
      } else {
          return pathElement.replace('<path', '<path fill="white"');
      }
  }).join('\n    ');

  // Get slug from href
  let slug = plugin.href.split('/').filter(Boolean).pop();
  if (slug.startsWith('capacitor-')) {
      slug = slug.replace('capacitor-', '');
  }
  if (slug === 'ricoh360-camera-plugin') {
      slug = 'ricoh360-camera';
  }

  const svg = `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="56" height="56" rx="12" fill="#119eff" />
  <g transform="translate(12, 12) scale(1.6)">
    ${pathElements}
  </g>
</svg>`;

  fs.writeFileSync(path.join(outputDir, `${slug}.svg`), svg);
  console.log(`Generated ${slug}.svg`);
}
