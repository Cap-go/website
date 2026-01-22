# Claude Code Instructions

This is the Capgo landing website built with Astro.

## Package Manager

**Always use `bun` instead of `npm` or `yarn`.**

- Install dependencies: `bun install`
- Run scripts: `bun run <script>`
- Add packages: `bun add <package>`
- Remove packages: `bun remove <package>`

## SEO Best Practices

When creating or modifying pages, always consider SEO:

### Structured Data (JSON-LD)

- Use the helpers in `src/lib/ldJson.ts` to add structured data
- Service pages should use `createServiceLdJson` with `createLdJsonGraph`
- Blog posts use `createNewsArticleLdJson`
- FAQ sections should include `createFAQPageLdJson`
- List/catalog pages should use `createItemListLdJson`
- Always include organization data via `includeOrganization: true`

### Meta Tags

- Every page must have a unique `title` and `description`
- Blog posts should include article-specific OG tags:
  - `ogType: 'article'`
  - `articlePublishedTime`
  - `articleModifiedTime`
  - `articleSection`
  - `articleTags`
- Use `keywords` prop for relevant search terms

### Content

- Use semantic HTML headings (h1, h2, h3) in proper hierarchy
- Include descriptive alt text for all images
- Use canonical URLs for duplicate content
- Ensure hreflang tags are present for localized pages

## Accessibility Best Practices

### ARIA and Semantics

- Add `aria-label` to interactive elements without visible text
- Use `aria-hidden="true"` on decorative SVGs and icons
- Add `role="img"` with `aria-label` to icon containers
- Use `aria-live="polite"` for dynamic content updates
- Add `aria-expanded` to dropdown toggles

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Include skip navigation link (already in Layout.astro)
- Ensure visible focus states on all focusable elements
- Use proper focus management in modals and dropdowns

### Landmarks and Structure

- Use `<main>` landmark for primary content
- Use `<nav>` for navigation sections
- Use `<header>` and `<footer>` appropriately
- Use `<section>` with proper headings

### Forms

- All inputs must have associated labels or `aria-label`
- Use `aria-describedby` for error messages
- Group related fields with `<fieldset>` and `<legend>`

### Images and Media

- All images must have descriptive `alt` text
- Decorative images should have `alt=""`
- Iframes must have `title` attribute

## Project Structure

- Pages: `src/pages/`
- Components: `src/components/`
- Layouts: `src/layouts/`
- Translations: `src/paraglide/messages.ts`
- SEO helpers: `src/lib/ldJson.ts`
- Styles: Tailwind CSS

## SEO Static Checker

The project includes a comprehensive SEO static checker that runs after each build. It validates:

- Metadata (title, description, canonical, charset, lang)
- HTML validity (duplicate tags, doctype, duplicate IDs)
- Content length (title, description, H1 length limits)
- Headings (H1 presence, heading hierarchy)
- Links (broken links, empty hrefs, generic anchor text)
- Images (alt attributes, broken images, file size)
- Social tags (OpenGraph, Twitter cards)
- International SEO (hreflang validation)
- Structured data (JSON-LD validation)
- Duplicates (across pages)

### Configuration

- `seo-checker.config.json` - Main configuration file
- `seo-checker.exclusions.json` - Specific issue exclusions

### Excluding Issues

To exclude a specific issue, add it to `seo-checker.exclusions.json`:

```json
{
  "exclusions": [
    {
      "fingerprint": "SEO00147::blog/old-post/index.html::/broken-link",
      "reason": "Legacy link, intentionally kept for redirects"
    },
    {
      "ruleId": "SEO00153",
      "filePath": "icons/**/*.html",
      "reason": "Icon pages use decorative images"
    }
  ]
}
```

Exclusion types (from most to least specific):
1. `fingerprint` - Exact issue match (rule + file + element)
2. `ruleId` + `filePath` - Rule for specific file pattern
3. `ruleId` + `elementPattern` - Rule for specific element content
4. `ruleId` - Disable entire rule (use config.rules.disabled instead)

## Common Commands

```bash
bun run dev           # Start development server
bun run build         # Build for production
bun run preview       # Preview production build
bun run seo:check     # Run SEO checker manually
bun run seo:check:json  # Output as JSON
bun run seo:check:report  # Save report to file
```
