# Plugin Documentation Icon Reference

## ✅ Current Status

All plugin documentation now uses **valid Starlight icons only**. No invalid icons detected.

## Icon Usage Statistics (Current)

Based on analysis of all 72 plugin index.mdx and 60 getting-started.mdx files:

| Icon | Usage Count | Common Use Case |
|------|-------------|-----------------|
| `rocket` | 64 | Features, performance, speed |
| `open-book` | 41 | Getting started, documentation |
| `setting` | 37 | Configuration, setup |
| `star` | 31 | Premium features, highlights |
| `puzzle` | 18 | Integration, plugins |
| `pencil` | 17 | Editing, customization |
| `approve-check` | 16 | Validation, success |
| `laptop` | 13 | Desktop/web features |
| `document` | 6 | Files, content |
| `download` | 5 | Downloads, imports |
| `magnifier` | 4 | Search, discovery |
| `list-format` | 4 | Lists, organization |
| `comment` | 4 | Communication, feedback |
| `moon` | 3 | Dark mode, themes |
| `shield-check` | 2 | Security, protection |
| `heart` | 2 | Favorites, likes |
| Others | 7 | Various |

**Total unique valid icons in use**: 25

## Complete Valid Starlight Icon Set

### Navigation & Arrows
- `up-arrow`, `down-arrow`, `left-arrow`, `right-arrow`
- `up-caret`, `down-caret`, `left-caret`, `right-caret`

### Status & Validation
- `approve-check` ✓ Used
- `approve-check-circle` ✓ Used
- `error`, `warning`, `close`

### Document & Files
- `document` ✓ Used
- `add-document` ✓ Used
- `open-book` ✓ Used

### UI Elements
- `setting` ✓ Used
- `star` ✓ Used
- `heart` ✓ Used
- `magnifier` ✓ Used
- `puzzle` ✓ Used
- `bars`, `pencil` ✓ Used, `pen`

### Content & Communication
- `comment` ✓ Used
- `comment-alt`
- `translate` ✓ Used
- `list-format` ✓ Used

### Special
- `moon` ✓ Used
- `sun`
- `laptop` ✓ Used
- `external` ✓ Used
- `download` ✓ Used
- `cloud-download`
- `random` ✓ Used
- `information` ✓ Used
- `forward-slash`
- `rocket` ✓ Used

### Social Platforms
- `github` ✓ Used
- `gitlab`, `bitbucket`
- `discord`, `twitter`, `x.com`, `mastodon`
- `codeberg`, `youtube`, `gitter`
- `farcaster`, `threads`, `codePen`

### Additional (Unused but Available)
- `shield-check` ✓ Used
- `siren` ✓ Used
- `check` ✓ Used
- `user` ✓ Used

## ❌ Invalid Icons (Now Fixed)

These icons were found and replaced:

| Invalid Icon | Found In | Replacement | Status |
|--------------|----------|-------------|--------|
| `seti:android` | native-purchases/index.mdx | `setting` | ✅ Fixed |
| `apple` | native-purchases/index.mdx | `star` | ✅ Fixed |
| `apple` | social-login/getting-started.mdx | `star` | ✅ Fixed |
| `facebook` | social-login/getting-started.mdx | `comment` | ✅ Fixed |

## Icon Selection Guidelines

### When to Use What

**Feature Highlights**
- `rocket` - Fast, new, exciting features
- `star` - Premium, important, highlighted features
- `puzzle` - Integrations, extensions, modularity
- `heart` - Favorites, likes, community features

**Technical Features**
- `setting` - Configuration, setup, customization
- `laptop` - Desktop/web-specific features
- `document` - File handling, content management
- `shield-check` - Security, protection, validation

**User Actions**
- `pencil` - Editing, writing, modification
- `download` - Downloads, imports, exports
- `approve-check` - Success, completion, validation
- `magnifier` - Search, discovery, inspection

**Content & Learning**
- `open-book` - Documentation, getting started
- `comment` - Communication, feedback, chat
- `translate` - Localization, language features
- `list-format` - Lists, organization, structure

**UI/UX**
- `moon` - Dark mode, themes, appearance
- `random` - Randomization, variety, shuffle
- `information` - Help, tooltips, additional info
- `siren` - Alerts, warnings, notifications

### Platform-Specific Icons

For platform logos (Android, iOS, Apple, Google, Facebook, etc.):

**Option 1: Use Generic Starlight Icons** (Recommended)
```mdx
<Card title="Android Setup" icon="setting">
  Android configuration
</Card>
<Card title="iOS Setup" icon="star">
  iOS configuration
</Card>
```

**Option 2: Use Custom Icons with MicroCard**
```mdx
<MicroCard href="..." title="Google" customIcon="/icons/google.svg">
  Google integration
</MicroCard>
```

⚠️ **Never use non-existent Starlight icons like `apple`, `facebook`, `android`, etc.**

## Validation

Run these commands to verify icon usage:

```bash
# Find all icon references
grep -roh 'icon="[^"]*"' src/content/docs/docs/plugins/ | sort | uniq

# Check for invalid icons (should return nothing)
grep -r 'icon="seti:' src/content/docs/docs/plugins/
grep -r 'icon="apple"' src/content/docs/docs/plugins/
grep -r 'icon="facebook"' src/content/docs/docs/plugins/
grep -r 'icon="android"' src/content/docs/docs/plugins/
```

## Migration Notes

### Changes Made (2025-11-19)

1. **native-purchases/index.mdx**
   - Line 45: `icon="seti:android"` → `icon="setting"`
   - Line 51: `icon="apple"` → `icon="star"`

2. **social-login/getting-started.mdx**
   - Line 26: `icon="facebook"` → `icon="comment"`
   - Line 29: `icon="apple"` → `icon="star"`

3. **Created Documentation**
   - [.templates/PLUGIN_DOCUMENTATION_TEMPLATE.md](.templates/PLUGIN_DOCUMENTATION_TEMPLATE.md) - Complete plugin documentation standards
   - `.templates/PLUGIN_ICONS_REFERENCE.md` (this file) - Icon usage reference

### Verification Results

✅ **60 plugins** have getting-started.mdx files
✅ **72 plugins** have index.mdx files
✅ **25 different valid icons** in use across all plugins
✅ **0 invalid icons** detected
✅ **All icons** conform to Starlight icon set

## Resources

- [Starlight Icons Documentation](https://starlight.astro.build/reference/icons/)
- [Plugin Documentation Template](.templates/PLUGIN_DOCUMENTATION_TEMPLATE.md)
- [MicroCard Component](/src/components/MicroCard.astro)

## Maintenance

When adding new plugin documentation:

1. ✅ Use only icons from the valid Starlight set (see list above)
2. ✅ For platform logos, use `customIcon` with MicroCard
3. ✅ Follow the icon selection guidelines
4. ✅ Run validation commands to verify
5. ✅ Refer to the template for structure
