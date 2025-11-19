# Plugin Documentation Template

This document defines the standard structure for all Capgo plugin documentation.

## Directory Structure

Each plugin should have:
```
src/content/docs/docs/plugins/[plugin-name]/
├── index.mdx              # Plugin overview page
└── getting-started.mdx    # Installation and usage guide
```

## 1. Index Page Template (index.mdx)

```mdx
---
title: "@capgo/[plugin-name]"
description: [Brief one-line description of the plugin]
tableOfContents: false
next: false
prev: false
sidebar:
  order: 1
  label: "Introduction"
hero:
  tagline: [Longer description highlighting key benefits]
  image:
    file: ~public/icons/plugins/[plugin-name].svg
  actions:
    - text: Get started
      link: /docs/plugins/[plugin-name]/getting-started/
      icon: right-arrow
      variant: primary
    - text: Github
      link: https://github.com/Cap-go/[repository-name]/
      icon: external
      variant: minimal
---

import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid stagger>
  <Card title="[Feature 1]" icon="rocket">
    [Description with optional emoji]
  </Card>
  <Card title="[Feature 2]" icon="setting">
    [Description with optional emoji]
  </Card>
  <Card title="[Feature 3]" icon="approve-check">
    [Description with optional emoji]
  </Card>
  <Card title="Getting Started" icon="open-book">
    Check the [Getting Started Guide](/docs/plugins/[plugin-name]/getting-started/) to install and configure the plugin.
  </Card>
</CardGrid>
```

### Valid Starlight Icons for Cards

Use only these built-in Starlight icons:

**Most Common:**
- `rocket` - New features, fast performance
- `star` - Premium features, highlights
- `setting` - Configuration, setup
- `open-book` - Documentation, learning
- `puzzle` - Integration, extensibility
- `pencil` - Editing, customization
- `approve-check` - Validation, success
- `approve-check-circle` - Completion, verification
- `shield-check` - Security, protection

**Additional Options:**
- `document` - Files, content
- `magnifier` - Search, discovery
- `comment` - Communication, feedback
- `translate` - Localization
- `heart` - Favorites, likes
- `information` - Help, info
- `laptop` - Desktop/web features
- `download` - Downloads, imports
- `moon` - Dark mode, themes
- `list-format` - Lists, organization
- `random` - Randomization, variety
- `siren` - Alerts, warnings

**Platform Icons:**
- `github`, `gitlab`, `bitbucket` - Version control
- `discord`, `twitter`, `youtube` - Social platforms

**NEVER USE:**
- ❌ `seti:android` - Invalid prefix
- ❌ `apple` - Not in Starlight set
- ❌ `facebook` - Not in Starlight set
- ❌ Any custom icon names not in the list above

### For Custom Icons
If you need custom platform icons (e.g., Google, Facebook, Apple logos), use the `customIcon` prop with `MicroCard` component:
```jsx
<MicroCard href="..." title="Google" customIcon="/icons/google.svg">
  Description
</MicroCard>
```

## 2. Getting Started Page Template (getting-started.mdx)

Choose one of these two approved formats:

### Format A: Modern (Recommended for new plugins)

Uses `PackageManagers` component and `Steps` for better UX.

```mdx
---
title: Getting Started
description: [Brief description of what users will learn]
sidebar:
  order: 2
---

import { Steps } from '@astrojs/starlight/components';
import { PackageManagers } from 'starlight-package-managers'

<Steps>
1. **Install the package**
   <PackageManagers pkg="@capgo/[plugin-name]" pkgManagers={['npm', 'pnpm', 'yarn', 'bun']} />

2. **Sync with native projects**
   <PackageManagers type="exec" pkg="cap" args="sync" pkgManagers={['npm', 'pnpm', 'yarn', 'bun']} />

3. **Configure permissions** (if needed)

   ### iOS
   Add to `Info.plist`:
   ```xml
   [iOS configuration]
   ```

   ### Android
   Add to `AndroidManifest.xml`:
   ```xml
   [Android configuration]
   ```
</Steps>

## Usage

Import and use the plugin:

```typescript
import { [PluginName] } from '@capgo/[plugin-name]';

// Basic usage example
const example = async () => {
  const result = await [PluginName].method();
  console.log(result);
};
```

## API Reference

### method(...)

```typescript
method(options: MethodOptions) => Promise<MethodResult>
```

Description of what this method does.

| Param         | Type              |
| ------------- | ----------------- |
| **`options`** | `MethodOptions` |

**Returns:** `Promise<MethodResult>`

## Interfaces

### MethodOptions

| Prop       | Type      | Description           |
| ---------- | --------- | --------------------- |
| **`prop1`** | `string`  | Description           |
| **`prop2`** | `number`  | Description           |

## Best Practices

1. **Practice 1**: Description
2. **Practice 2**: Description
3. **Practice 3**: Description
```

### Format B: Classic (For consistency with existing plugins)

Uses `Tabs` component with explicit `TabItem` elements.

```mdx
---
title: Getting Started
description: [Brief description of what users will learn]
sidebar:
  order: 2
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

## Installation

<Tabs>
  <TabItem label="npm">
    ```bash
    npm install @capgo/[plugin-name]
    npx cap sync
    ```
  </TabItem>
  <TabItem label="yarn">
    ```bash
    yarn add @capgo/[plugin-name]
    npx cap sync
    ```
  </TabItem>
  <TabItem label="pnpm">
    ```bash
    pnpm add @capgo/[plugin-name]
    npx cap sync
    ```
  </TabItem>
  <TabItem label="bun">
    ```bash
    bun add @capgo/[plugin-name]
    npx cap sync
    ```
  </TabItem>
</Tabs>

## Platform Configuration (if needed)

### iOS
[iOS-specific configuration]

### Android
[Android-specific configuration]

## Usage

```typescript
import { [PluginName] } from '@capgo/[plugin-name]';

// Usage example
```

## API

### method(...)

```typescript
method(options: MethodOptions) => Promise<MethodResult>
```

[Method description]

## Interfaces

[Interface definitions]
```

## 3. Frontmatter Standards

### Index Page
```yaml
---
title: "@capgo/[plugin-name]"
description: [Description]
tableOfContents: false
next: false
prev: false
sidebar:
  order: 1
  label: "Introduction"
hero:
  tagline: [Tagline]
  image:
    file: ~public/icons/plugins/[plugin-name].svg
  actions: [...]
---
```

### Getting Started Page
```yaml
---
title: Getting Started
description: [Description]
sidebar:
  order: 2
---
```

**Note:** The `label` field is optional in `sidebar` for getting-started pages.

## 4. Content Guidelines

### Descriptions
- **Index description**: Brief, one-line summary (50-100 characters)
- **Getting started description**: Action-oriented, describes what the user will learn

### Code Examples
- Use TypeScript for all code examples
- Include error handling where appropriate
- Show complete, working examples
- Use proper formatting and indentation

### API Documentation
- Document all public methods
- Include parameter tables
- Specify return types
- Provide interface definitions

### Best Practices Section
- Include practical tips
- Highlight common pitfalls
- Provide performance recommendations
- Note platform-specific considerations

## 5. Common Sections

Include these sections when relevant:

1. **Installation** - Always required
2. **Platform Configuration** - When permissions/setup needed
3. **Usage** - Basic usage examples
4. **API Reference** - Method documentation
5. **Interfaces** - TypeScript type definitions
6. **Complete Example** - Advanced usage
7. **Best Practices** - Recommended patterns
8. **Platform Notes** - iOS/Android differences
9. **Troubleshooting** - Common issues

## 6. Validation Checklist

Before publishing plugin documentation:

- [ ] Both index.mdx and getting-started.mdx exist
- [ ] All icons used are from valid Starlight icon set
- [ ] Plugin icon SVG exists in `/public/icons/plugins/`
- [ ] Installation instructions include all package managers
- [ ] Platform configurations are documented
- [ ] API methods are fully documented
- [ ] TypeScript interfaces are defined
- [ ] Code examples are tested and working
- [ ] Links to GitHub repository are correct
- [ ] Frontmatter follows standards

## 7. Migration Guide

When updating existing plugin documentation:

1. **Check icons**: Ensure all `icon` props use valid Starlight icons
2. **Standardize installation**: Choose Format A or B consistently
3. **Update frontmatter**: Add missing fields like `tableOfContents: false`
4. **Review imports**: Use correct component imports
5. **Test links**: Verify all internal links work
6. **Check consistency**: Match structure with other plugin docs

## Examples

**Good Examples:**
- [uploader](/docs/plugins/uploader/) - Modern format with Steps
- [wifi](/docs/plugins/wifi/) - Modern format with comprehensive API docs
- [background-geolocation](/docs/plugins/background-geolocation/) - Classic format with platform setup

**Recently Fixed:**
- [native-purchases](/docs/plugins/native-purchases/) - Fixed invalid `seti:android` and `apple` icons
- [social-login](/docs/plugins/social-login/) - Fixed `facebook` and `apple` icons
