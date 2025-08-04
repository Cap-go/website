# Fix Text Issues and Inconsistencies Across Website

## Summary

This PR addresses multiple text issues, typos, and inconsistencies found throughout the Capgo website codebase. The fixes improve text quality, consistency, and professionalism across all pages and languages.

## Issues Fixed

### ✅ Completed

1. **Fixed "Sanbox" typo → "Sandbox"**
   - Updated in all message files (en.json, fr.json, es.json, de.json, it.json, ja.json, ko.json, id.json)
   - Affects the Capacitor Sandbox App references
   - Also fixed iOS capitalization in the description

2. **Fixed grammatical error "it's" → "its"**
   - Updated possessive form in legal disclaimer text
   - Applied to: privacy.astro, tos.astro, disclaimer.astro, eula.astro, dp.astro, dpa.astro

3. **Improved legal disclaimer clarity**
   - Changed awkward phrasing "associated with only link to English" to clearer "Please refer to the English source for legal matters"
   - Updated "automatic translated" to "automatically translated"

4. **Fixed "langauges" → "languages"**
   - Corrected typo in GitHub workflow file: `.github/workflows/fix_code_languages_all.yml`

### 🔄 Remaining Work

1. **"IOS" → "iOS" throughout codebase**
   - Found 80+ files with incorrect Apple branding
   - Affects blog posts in all languages
   - Affects some message files and documentation

2. **Truncated "Android" text in message files**
   - Some translations are cut off mid-word
   - Needs completion of translations

## Files Changed

- `messages/*.json` (8 files) - Typo fixes and iOS capitalization
- `src/pages/*.astro` (6 files) - Legal disclaimer improvements  
- `.github/workflows/fix_code_languages_all.yml` - Typo fix

## Impact

- Improves professionalism and brand consistency
- Ensures proper Apple branding compliance (iOS vs IOS)
- Makes legal disclaimers clearer and more grammatically correct
- Fixes typos that could affect user perception

## Testing

- Text changes only, no functional impact
- All affected pages should display corrected text
- Multilingual content properly updated

## Next Steps

The remaining iOS capitalization fixes across blog content can be addressed in a follow-up PR due to the extensive scope (80+ files across multiple languages).