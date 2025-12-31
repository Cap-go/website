# Agent Instructions

Instructions for AI agents working on this codebase.

## Critical Requirements

### Use Bun

**Never use npm, yarn, or pnpm. Always use bun.**

```bash
# Correct
bun install
bun run dev
bun run build
bun add package-name

# Wrong - do not use
npm install
npm run dev
yarn add package-name
```

### SEO Checklist

Before completing any page modification, verify:

- [ ] Page has unique `title` and `description` in content object
- [ ] JSON-LD structured data is present (use `src/lib/ldJson.ts` helpers)
- [ ] All images have descriptive `alt` text
- [ ] Headings follow proper hierarchy (h1 > h2 > h3)
- [ ] Blog posts include article OG tags (`ogType`, `articlePublishedTime`, etc.)

### Accessibility Checklist

Before completing any component modification, verify:

- [ ] All interactive elements are keyboard accessible
- [ ] Decorative SVGs have `aria-hidden="true"`
- [ ] Form inputs have labels or `aria-label`
- [ ] Dynamic content uses `aria-live` regions
- [ ] Focus states are visible
- [ ] Icon-only buttons have `aria-label`

## File Patterns

### Adding a New Page

1. Create page in `src/pages/`
2. Import Layout and ldJson helpers
3. Define title, description, and structured data
4. Pass content object to Layout

Example:
```astro
---
import Layout from '@/layouts/Layout.astro'
import { createServiceLdJson, createLdJsonGraph } from '@/lib/ldJson'

const title = 'Page Title | Capgo'
const description = 'Page description for SEO'

const serviceLdJson = createServiceLdJson(Astro.locals.runtimeConfig.public, {
  name: title,
  description,
  url: Astro.url.href,
  serviceType: 'Software Development Service',
  areaServed: ['Worldwide'],
})

const ldJSON = createLdJsonGraph(Astro.locals.runtimeConfig.public, serviceLdJson, {
  includeOrganization: true,
})

const content = { title, description, ldJSON }
---

<Layout content={content}>
  <!-- Page content -->
</Layout>
```

### Adding Icons/SVGs

Always add accessibility attributes:

```astro
<!-- Decorative icon (hidden from screen readers) -->
<svg aria-hidden="true" class="...">...</svg>

<!-- Meaningful icon (needs label) -->
<div role="img" aria-label="Description of icon">
  <svg aria-hidden="true">...</svg>
</div>
```

### Adding Form Inputs

Always include labels:

```astro
<!-- With visible label -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- With aria-label (no visible label) -->
<input type="search" aria-label="Search plugins" />
```

## Testing

After making changes:

1. Run `bun run build` to check for build errors
2. Validate structured data at https://search.google.com/test/rich-results
3. Test keyboard navigation (Tab, Enter, Escape)
4. Check color contrast and focus visibility
