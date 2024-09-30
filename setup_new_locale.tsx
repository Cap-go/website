import fs from 'fs'
import { dump, load } from 'js-yaml'
import path from 'path'
import { exec } from 'child_process'

const newLocale = 'es'

const localePath = path.join(process.cwd(), 'locales', 'en.yml')
const newLocalePath = path.join(process.cwd(), 'locales', newLocale + '.yml')

const translateText = async (text: string, lang: string) => {
  const urlParams = new URLSearchParams({
    string: text,
    from_lang: 'en',
    to_lang: lang,
  })
  const response = await fetch(`https://api.datpmt.com/api/v2/dictionary/translate?${urlParams.toString()}`)
  if (response.status !== 200) {
    console.error(response.statusText)
    process.exit(1)
  }
  return await response.json()
}

console.log('Loading data from locales/en.yml...')
const enLocaleContent = fs.readFileSync(localePath, 'utf8')
const data = load(enLocaleContent) as { [p: string]: string }
const newData = { ...data }
console.log('Done.\n')
console.log(`Translating en.yml to ${newLocale}.yml...`)
await Promise.all(
  Object.keys(data).map(async (key) => {
    newData[key] = await translateText(data[key], newLocale)
  }),
)
fs.writeFileSync(newLocalePath, dump(newData), 'utf8')
console.log(`Wrote ${newLocale}.yml to locales directory.`)
console.log('Done.\n')

const copyDirectory = (source: string, destination: string) => {
  if (!fs.existsSync(destination))  fs.mkdirSync(destination, { recursive: true });
  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourceFile = path.join(source, file);
    const destFile = path.join(destination, file);
    const stats = fs.statSync(sourceFile);
    if (stats.isDirectory()) copyDirectory(sourceFile, destFile); 
    else {
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

const generateTranslations = () => {
  return new Promise((resolve, reject) => {
    exec('tsx generate_translations.tsx', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating translations: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Error output: ${stderr}`);
        return reject(new Error(stderr));
      }
      resolve(true);
    });
  });
};

const generateBlogTranslations = () => {
  return new Promise((resolve, reject) => {
    exec('tsx generate_blog_translations.tsx', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating blog translations: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Error output: ${stderr}`);
        return reject(new Error(stderr));
      }
      console.log(stdout);
      resolve(true);
    });
  });
};

await generateTranslations();
await generateBlogTranslations();
