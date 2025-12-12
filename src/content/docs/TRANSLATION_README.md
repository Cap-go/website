# Chinese Documentation Translation Guide

## Overview

This document describes the translation workflow for converting English documentation to Simplified Chinese (locale: zh).

## Current Status

- **Files Identified**: 182 files with English content and `locale: zh`
- **Files Completed**: 2
  - `docs/cli/overview.mdx` - TRANSLATED
  - `docs/live-updates/integrations/azure-devops.mdx` - TRANSLATED
- **Files Remaining**: 180

## File Structure

```
landing/src/content/docs/
├── docs/                  # English source files (NO locale specified)
├── zh/docs/               # Chinese translations (locale: zh)
├── en/docs/               # English translations (locale: en)
├── es/docs/               # Spanish translations
├── fr/docs/               # French translations
└── ...other locales
```

## Translation Requirements

### Frontmatter (YAML)
All Chinese files MUST have:
```yaml
---
title: "Chinese Title"
description: "Chinese description"
locale: zh
---
```

### Content Rules
1. **Preserve Code Blocks**: All code, shell commands, and YAML examples remain unchanged
2. **Preserve Technical Terms**: Keep English terms for:
   - Product names: Capgo, JavaScript, TypeScript, Node.js
   - Acronyms: API, CLI, CI/CD, HTML, CSS, JSON, YAML
   - Framework names: React, Vue, Angular, Next.js, Nuxt

3. **Translate UI Text**:
   - Headers, titles, and descriptions
   - Instructions and explanations
   - Button labels and UI element descriptions

4. **Maintain Markdown Structure**:
   - Headings (`##`, `###`, etc.) translated but structure preserved
   - Lists, tables, and code blocks unchanged
   - Links and URLs preserved
   - Component tags unchanged: `<Card>`, `<Steps>`, `<Aside>`, `<CardGrid>`

5. **Consistency**:
   - Use Simplified Chinese throughout (中文)
   - Maintain terminology across all files
   - Use professional, technical tone

## Translation Workflow

### Option 1: Using Claude API (Recommended)

#### Setup
```bash
# Set your API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Run the batch translator
python3 /tmp/batch_translate_claude.py
```

#### How It Works
1. Reads English source file from `docs/` directory
2. Extracts frontmatter and body content
3. Sends body content to Claude for translation
4. Preserves frontmatter with `locale: zh` added
5. Writes translated content back to `zh/` directory

### Option 2: Manual Translation

#### For Each File:

1. **Read English source**:
   ```bash
   cat landing/src/content/docs/docs/path/to/file.mdx
   ```

2. **Check current Chinese version**:
   ```bash
   cat landing/src/content/docs/zh/docs/path/to/file.mdx
   ```

3. **Translate body content** while preserving:
   - Frontmatter structure
   - Code blocks
   - Technical terms
   - Links and URLs

4. **Update the file**:
   ```bash
   # Edit with your editor of choice
   nano landing/src/content/docs/zh/docs/path/to/file.mdx
   ```

5. **Verify**:
   - Check that `locale: zh` is present
   - Ensure all code blocks are intact
   - Verify markdown formatting

### Option 3: Using Commercial Translation API

Integrate with:
- Google Translate API
- Microsoft Translator API
- AWS Translate
- Other professional translation services

## Batch Processing

### Lists of Files to Translate

**Fully English Files (26+ files)**
- docs/plugin/api.md
- docs/plugins/contacts/getting-started.mdx
- docs/plugins/crisp/getting-started.mdx
- docs/plugins/native-biometric/getting-started.mdx
- docs/plugins/native-purchases/ios-create-subscription.mdx
- docs/plugins/native-purchases/ios-introductory-offer.mdx
- docs/plugins/native-purchases/ios-subscription-group.mdx
- docs/plugins/nativegeocoder/getting-started.mdx
- docs/plugins/navigation-bar/getting-started.mdx
- docs/plugins/pedometer/getting-started.mdx
- docs/plugins/screen-recorder/getting-started.mdx
- docs/plugins/social-login/getting-started.mdx
- docs/plugins/uploader/index.mdx
- docs/plugins/video-player/getting-started.mdx
- docs/plugins/volume-buttons/getting-started.mdx
- And 11+ more...

**Mixed Content Files (12+ files)**
Various plugin index files and integration guides with partial English

## Quality Assurance

### Checklist for Each Translated File

- [ ] Frontmatter has `locale: zh`
- [ ] Title is translated to Chinese
- [ ] Description is translated to Chinese
- [ ] All code blocks preserved exactly
- [ ] All command examples unchanged
- [ ] All YAML/JSON config files unchanged
- [ ] Technical terms (Capgo, API, etc.) kept in English
- [ ] All links and URLs preserved
- [ ] Markdown formatting maintained
- [ ] Component tags unchanged
- [ ] Chinese language is Simplified (not Traditional)
- [ ] Professional technical tone maintained
- [ ] No blank lines or formatting issues

### Verification

After translating, verify the file:

```bash
# Check frontmatter
head -20 landing/src/content/docs/zh/docs/path/to/file.mdx

# Count English vs Chinese content
grep -o '[a-z]' landing/src/content/docs/zh/docs/path/to/file.mdx | wc -l
grep -o '[\u4e00-\u9fff]' landing/src/content/docs/zh/docs/path/to/file.mdx | wc -l
```

## Common Translation Terms

### Technical Terms (Keep English)
- Capgo, Capacitor, Ionic
- JavaScript, TypeScript, Node.js, npm, yarn
- React, Vue, Angular, Svelte, Next.js, Nuxt
- Git, GitHub, GitLab, Bitbucket
- Docker, Kubernetes, Docker Hub
- API, REST, GraphQL, WebSocket
- CI/CD, GitHub Actions, GitLab CI, Jenkins
- HTML, CSS, JSON, YAML, XML, CSV
- AWS, Google Cloud, Azure, Firebase
- Database, SQL, MongoDB, PostgreSQL, Redis

### Commonly Translated Terms

| English | Chinese | English | Chinese |
|---------|---------|---------|---------|
| Install | 安装 | Deploy | 部署 |
| Configure | 配置 | Setup | 设置 |
| Build | 构建 | Test | 测试 |
| Run | 运行 | Execute | 执行 |
| Debug | 调试 | Error | 错误 |
| Warning | 警告 | Success | 成功 |
| Documentation | 文档 | Guide | 指南 |
| Tutorial | 教程 | Example | 示例 |
| API Reference | API 参考 | Features | 功能 |
| Usage | 使用方法 | Integration | 集成 |
| Troubleshooting | 故障排除 | FAQ | 常见问题 |
| Security | 安全 | Performance | 性能 |
| Preview | 预览 | Production | 生产 |
| Staging | 测试环境 | Development | 开发 |
| Channel | 频道 | Update | 更新 |
| Version | 版本 | Release | 发布 |

## Automation Scripts

### batch_translate_claude.py
- Uses Claude API to translate files in batch
- Requires ANTHROPIC_API_KEY environment variable
- Processes files sequentially with error handling
- Logs progress and errors

### verify_translations.py
- Validates all translated files
- Checks for required frontmatter
- Verifies code block preservation
- Reports statistics

## Troubleshooting

### Issue: Files not found
- Ensure files exist in both `docs/` (source) and `zh/docs/` (target)
- Check file paths use forward slashes

### Issue: Encoding problems
- Ensure UTF-8 encoding for all files
- Use `file` command to verify: `file -i filename`

### Issue: Partial translations
- Some files may have mixed content
- Translate only the English portions
- Preserve existing Chinese content where present

### Issue: Code blocks corrupted
- Verify code fence markers (```) are preserved
- Check indentation is unchanged
- Ensure language identifiers (yaml, shell, bash) are preserved

## Getting Help

- Review completed translations for patterns
- Consult quality assurance checklist
- Verify against source English files
- Check consistency with other translated files

## Next Steps

1. Set up API key for automated translation
2. Run batch translation for remaining 180 files
3. Implement verification and quality checks
4. Review samples of translated files
5. Build and preview to verify rendering
6. Commit changes to version control

## Resources

- Capgo documentation: https://capgo.app
- Chinese language style guide: TBD
- Translation glossary: /tmp/translation_dictionary.json
- Files list: /tmp/files_list.txt
- Translation jobs: /tmp/translation_jobs.json
