---
title: "@capgo/capacitor-updater Plugin"
description: "Technical reference for the Capacitor Updater plugin that powers Capgo's live update functionality."
sidebar:
  order: 1
---

import { LinkCard, Aside } from '@astrojs/starlight/components';

## Overview

The `@capgo/capacitor-updater` plugin is the core technology that enables live updates in Capacitor apps. This section contains technical documentation for developers who need to:

- Understand the plugin's API methods
- Configure advanced plugin settings
- Debug update issues
- Implement custom update flows
- Run self-hosted update servers

<Aside type="tip">
  If you're looking for general information about how live updates work or how to get started, please refer to the main [Live Updates documentation](/docs/live-updates/).
</Aside>

## Quick Links

<LinkCard
  title="Live Updates Documentation"
  description="Learn about channels, update behavior, rollbacks, and more in the main Live Updates section."
  href="/docs/live-updates/"
/>

<LinkCard
  title="Getting Started Guide"
  description="Follow our quickstart guide to add live updates to your app."
  href="/docs/getting-started/quickstart/"
/>

## Plugin Documentation

This technical reference covers:

- **[Plugin API](/docs/plugin/api/)** - All available methods and their usage
- **[Plugin Settings](/docs/plugin/settings/)** - Configuration options for capacitor.config
- **[Known Issues](/docs/plugin/known-issues/)** - Common problems and solutions
- **[Debugging](/docs/plugin/debugging/)** - How to troubleshoot update issues
- **[Statistics API](/docs/plugin/statistics-api/)** - Track update metrics
- **[Local Development](/docs/plugin/local-dev/getting-started/)** - Test updates locally
- **[Self-Hosted Mode](/docs/plugin/self-hosted/getting-started/)** - Run your own update server

## Installation

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

For setup and configuration, see the [Getting Started guide](/docs/getting-started/quickstart/).

