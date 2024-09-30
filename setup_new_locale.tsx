import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const newLocale = 'es'

const copyDirectory = (source: string, destination: string) => {
  if (!fs.existsSync(destination))  fs.mkdirSync(destination, { recursive: true });
  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourceFile = path.join(source, file);
    const destFile = path.join(destination, file);
    const stats = fs.statSync(sourceFile);
    if (stats.isDirectory()) copyDirectory(sourceFile, destFile); 
    else {
      console.log(`Replacing /fr/blog/ with /${newLocale}/blog/ in ${destFile}...`)
      const modifiedDestFile = fs.readFileSync(sourceFile, 'utf8').replace('/fr/blog/', `/${newLocale}/blog/`);
      fs.copyFileSync(sourceFile, destFile);
      fs.writeFileSync(destFile, modifiedDestFile, 'utf8')
    }
  });
};

console.log(`Copying src/pages/fr to src/pages/${newLocale}...`)
copyDirectory(path.join(process.cwd(), 'src', 'pages', 'fr'), path.join(process.cwd(), 'src', 'pages', newLocale));
console.log(`Done.\n`)
console.log(`Copying src/content/blog to src/content/${newLocale}/blog...`)
copyDirectory(path.join(process.cwd(), 'src', 'content', 'blog'), path.join(process.cwd(), 'src', 'content', newLocale, 'blog'));
console.log(`Done.\n`)

await new Promise((resolve, reject) => {
  exec('npm run generate:locale:translations', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating locale translations: ${error.message}`);
      return reject(error);
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return reject(new Error(stderr));
    }
    if (stdout) console.log(stdout);
    resolve(true);
  });
});

await new Promise((resolve, reject) => {
  exec('npm run generate:translation.ts', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating translations file: ${error.message}`);
      return reject(error);
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return reject(new Error(stderr));
    }
    if (stdout) console.log(stdout);
    resolve(true);
  });
});

await new Promise((resolve, reject) => {
  exec('npm run generate:blog:translations', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating blog translations: ${error.message}`);
      return reject(error);
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return reject(new Error(stderr));
    }
    if (stdout) console.log(stdout);
    resolve(true);
  });
});