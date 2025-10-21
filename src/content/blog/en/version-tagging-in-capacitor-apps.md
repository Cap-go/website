---
slug: version-tagging-in-capacitor-apps
title: Version Tagging in Capacitor Apps
description: Learn the essentials of version tagging in Capacitor apps, including best practices for updates, synchronization, and automation.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-03-26T03:19:04.753Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: https://assets.seobotai.com/capgo.app/67e36d7410051fda3b6230a0-1742959155569.jpg
head_image_alt: Mobile Development
keywords: Capacitor, version tagging, semantic versioning, app updates, mobile development
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

Version tagging is essential for managing [Capacitor](https://capacitorjs.com/) apps. It ensures smooth updates, tracks changes, and enhances app reliability across iOS, Android, and web platforms. Here's a quick overview:

-   **Why It Matters**: Tracks updates, enables rollbacks, and ensures stable deployments.
-   **Semantic Versioning**: Use **MAJOR.MINOR.PATCH** to indicate breaking changes, new features, or bug fixes.
-   **Sync Across Platforms**: Align version numbers in `package.json`, iOS `Info.plist`, and Android `build.gradle`.
-   **Automation**: [Automate updates](https://capgo.app/docs/live-updates/update-behavior/) with npm scripts and CI/CD tools.
-   **Live Updates**: Tools like [Capgo](https://capgo.app/) deliver updates to 95% of users within 24 hours.
-   **Beta Management**: Use structured channels for alpha, beta, and production versions.

### Quick Comparison

| Feature | Purpose | Example |
| --- | --- | --- |
| **Semantic Versioning** | Tracks changes clearly | `1.2.3 → 2.0.0` |
| **Sync Versions** | Align across platforms | `npx cap sync` |
| **Automation** | Speeds up version updates | `npm version patch` |
| **Live Updates** | Fast user adoption | Capgo's 95% in 24 hours |
| **Beta Channels** | Controlled testing phases | `1.3.0-beta.1` |

Version tagging simplifies [app updates](https://capgo.app/plugins/capacitor-updater/), keeps users happy, and ensures developers can manage releases effectively.

## How to AUTOMATICALLY configure your [Capacitor](https://capacitorjs.com/) project ⚡️

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-26.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/kYFZkmJ6rAc" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Version Setup in Capacitor

Follow these steps to ensure consistent version management across all platforms in your Capacitor app.

### Setting the Version in `package.json`

The `package.json` file serves as the main source for your app's version details. Here's an example of how to set it up:

```json
{
  "name": "your-app-name",
  "version": "1.2.3",
  "private": true,
  "dependencies": {
    "@capacitor/core": "5.5.0",
    "@capacitor/ios": "5.5.0",
    "@capacitor/android": "5.5.0"
  }
}
```

When updating the version number, use semantic versioning (SemVer) rules:

-   **Major version** (1.x.x): Introduces breaking changes.
-   **Minor version** (x.2.x): Adds new features that are backward-compatible.
-   **Patch version** (x.x.3): Fixes bugs or makes small improvements.

### Keeping Platform Versions in Sync

It's important to align version numbers across all platforms for smooth app deployment. Each platform has its own configuration file for versioning:

| Platform | Configuration File | Version Key |
| --- | --- | --- |
| iOS | Info.plist | CFBundleShortVersionString |
| Android | build.gradle | versionName |
| Web | package.json | version |

After updating the version in `package.json`, use this command to sync the changes with native platform configurations:

```bash
npx cap sync
```

### Using Capacitor CLI for Version Management

The Capacitor CLI offers helpful commands to manage versions:

```bash
# Check the current version of Capacitor
npx cap --version

# Update Capacitor core and platform dependencies
npm install @capacitor/core@latest
npm install @capacitor/ios@latest
npm install @capacitor/android@latest

# Sync version changes to native platforms
npx cap sync
```

Keeping your Capacitor CLI updated ensures compatibility with version-specific features and reduces potential mismatches. Following these steps will help you maintain proper versioning in your app.

## Semantic Version Setup

### Semantic Version Basics

Semantic Versioning (SemVer) uses the format **MAJOR.MINOR.PATCH**, where each part indicates a specific type of change:

| Version Component | Purpose |
| --- | --- |
| **MAJOR** | Introduces breaking changes to the API |
| **MINOR** | Adds new features that remain compatible with previous versions |
| **PATCH** | Fixes bugs or improves performance without breaking compatibility |

This system ensures developers can clearly communicate updates while preserving compatibility across app versions. For example, moving from **1.2.3** to **2.0.0** signals major, breaking updates that require careful planning.

### When to Update Version Numbers

Here's how to decide which version number to update:

| Update Type | When to Use | Version Change Example |
| --- | --- | --- |
| **Major Update** | For breaking API changes or major UI redesigns | 1.2.3 → 2.0.0 |
| **Minor Update** | When introducing new features or marking features as deprecated | 1.2.3 → 1.3.0 |
| **Patch Update** | For bug fixes or small performance tweaks | 1.2.3 → 1.2.4 |

> "We practice agile development and @Capgo is mission-critical in delivering continuously to our users!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Now let’s look at automating these updates to simplify release management.

### Version Update Automation

[Automating version updates](https://capgo.app/docs/plugin/self-hosted/auto-update/) can save time and reduce errors in your Capacitor project. Here's how to set it up:

1.  **NPM Version Scripts**

Add these scripts to your `package.json` file to manage version updates easily:

```json
{
  "scripts": {
    "version:patch": "npm version patch",
    "version:minor": "npm version minor",
    "version:major": "npm version major"
  }
}
```

2.  **CI/CD Integration**  
    Incorporate version updates into your CI/CD pipeline. Capgo supports tools like [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/), and [Jenkins](https://www.jenkins.io/), making it simple to automate the process.

> "@Capgo is a must-have tool for developers seeking productivity by bypassing lengthy bugfix reviews." - Bessie Cooper [\[1\]](https://capgo.app/)

## Version Tag Methods

### Git Version Tags

Git version tags are a reliable way to keep track of [Capacitor app releases](https://capgo.app/docs/). To create clear and informative tags, combine semantic versioning with a brief description:

```bash
git tag -a v1.2.3 -m "Release v1.2.3: Added offline mode support"
```

To maintain consistency across your team, use a standardized tagging format:

| Tag Component | Format | Example |
| --- | --- | --- |
| Release Version | v\[MAJOR\].\[MINOR\].\[PATCH\] | v1.2.3 |
| Beta Release | v\[VERSION\]-beta.\[NUMBER\] | v1.2.3-beta.1 |
| Release Candidate | v\[VERSION\]-rc.\[NUMBER\] | v1.2.3-rc.2 |

### Build Number Integration

Build numbers help track individual builds within each version. For both iOS and Android, increment the build number with every submission:

```json
{
  "ios": {
    "version": "1.2.3",
    "build": "10234"
  },
  "android": {
    "version": "1.2.3",
    "versionCode": "10234"
  }
}
```

The build number should always increase, even if the version remains the same. This ensures each app store submission is uniquely identified while keeping the versioning clear for users.

### Beta Version Management

Managing beta versions requires a structured process to distribute test builds. Capgo’s [channel system](https://capgo.app/docs/plugin/cloud-mode/channel-system/) simplifies this with the following steps:

1.  **Channel Setup**

Create separate channels for each testing phase:

```json
{
  "beta": {
    "version": "1.3.0-beta.1",
    "users": "beta-testers"
  },
  "production": {
    "version": "1.2.3",
    "users": "all"
  }
}
```

2.  **Control User Access**

Set up permissions to control who gets access to beta versions. This ensures only approved testers receive beta builds while production users get stable releases.

3.  **Version Progression**

Use a clear version progression system to track the development stages:

| Stage | Version Format | Purpose |
| --- | --- | --- |
| Alpha | 1.3.0-alpha.1 | Internal testing |
| Beta | 1.3.0-beta.1 | External testing group |
| RC (Release Candidate) | 1.3.0-rc.1 | Final testing before release |
| Production | 1.3.0 | Public release |

This approach ensures thorough testing and smooth transitions between development stages, keeping version tracking organized and transparent throughout the process.

## App Version Display

Displaying accurate version information in your app is key to keeping users informed and managing updates effectively.

### Getting Version with Capacitor

You can retrieve version details using Capacitor with this code:

```typescript
import { App } from '@capacitor/app';

async function getAppInfo() {
  const info = await App.getInfo();
  console.log(`Version: ${info.version}`);
  console.log(`Build: ${info.build}`);
}
```

For a more streamlined approach, create a reusable function:

```typescript
export const getVersionString = async () => {
  const info = await App.getInfo();
  return `v${info.version} (${info.build})`;
};
```

This function simplifies the process of displaying version information in your app's interface.

### Version UI Implementation

Here's an example of how to integrate version display into a settings component:

```typescript
@Component({
  selector: 'app-settings',
  template: `
    <div class="version-info">
      <span>Version: {{ versionString }}</span>
      <span *ngIf="updateAvailable" class="update-badge">
        Update Available
      </span>
    </div>
  `
})
```

Common places to show version details include:

| Location | Purpose | Implementation |
| --- | --- | --- |
| Settings Screen | Full version and build | Detailed version information |
| About Page | Basic version display | Version number only |
| App Footer | Minimal display | Condensed version string |

In addition to displaying version info, integrating an update check system can improve the user experience.

### Update Check System

An update check system ensures users have access to the latest features and fixes. Capgo provides real-time notifications and controlled update channels to manage this process:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

async function checkForUpdates() {
  const current = await CapacitorUpdater.current();
  const latest = await CapacitorUpdater.getLatest();

  if (current.version !== latest.version) {
    await CapacitorUpdater.download({
      version: latest.version
    });
  }
}
```

> "We practice agile development and @Capgo is mission-critical in delivering continuously to our users!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

You can also add a user-facing update notification, like this:

```typescript
@Component({
  template: `
    <update-modal 
      [version]="newVersion"
      [features]="updateFeatures"
      (updateNow)="performUpdate()"
    />
  `
})
```

For enterprise apps, Capgo's channel system allows you to control update distribution:

| Channel | Update Type | Target Audience |
| --- | --- | --- |
| Production | Stable releases | All users |
| Beta | Pre-release versions | Test group |
| Critical | Emergency fixes | Affected users |

This method ensures app reliability while tracking update performance through Capgo's analytics dashboard.

## Version Management Solutions

Let’s dive deeper into advanced solutions for managing app versions effectively.

### Version Tool Options

When selecting version control tools, it’s important to focus on those that simplify updates, secure your code, and support both app store releases and live updates.

Here are some key features to look for:

| Feature | Importance | Impact |
| --- | --- | --- |
| Live Updates | Critical | Minimizes delays caused by app store reviews |
| Security | Essential | Safeguards user data and code integrity |
| Analytics | Important | Measures update success and user adoption |
| CI/CD Integration | Useful | Streamlines deployment processes |
| Cost Efficiency | Strategic | Influences long-term budget planning |

One standout tool in this space is Capgo, which offers features specifically designed for [Capacitor apps](https://capgo.app/blog/capacitor-comprehensive-guide/).

### [Capgo](https://capgo.app/) Version Control Features

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-26.jpg?auto=compress)

Capgo provides robust version management capabilities, including:

-   **23.5M successful updates delivered**
-   **95% of users updated within 24 hours**
-   **82% global success rate**
-   **434ms average API response time worldwide**

Here’s an example of how to use Capgo for version control:

```typescript
// Capgo version control example
import { CapacitorUpdater } from '@capgo/capacitor-updater';

const versionControl = {
  async checkVersion() {
    const current = await CapacitorUpdater.current();
    return current.version;
  },

  async deployUpdate(version: string) {
    await CapacitorUpdater.setChannel({
      channel: 'production',
      version: version
    });
  }
};
```

> "We are currently giving a try to @Capgo since Appcenter stopped live updates support on hybrid apps and @AppFlow is way too expensive." - Simon Flack [\[1\]](https://capgo.app/)

### Team Size Solutions

Capgo offers flexible plans to accommodate teams of all sizes, making version management scalable and efficient.

| Team Size | Plan | Key Features |
| --- | --- | --- |
| Solo Developer | Basic cloud hosting | Live updates, 1,000 MAU |
| Small Team (2-5) | Maker plan | 10,000 MAU, 500GB bandwidth |
| Medium Team (6-20) | Team plan | 100,000 MAU, permissions |
| Enterprise | Custom PAYG | Unlimited MAU, dedicated support |

For larger teams, Capgo’s channel system enables precise control over version deployment:

```typescript
const enterpriseVersionControl = {
  channels: {
    production: 'stable-releases',
    beta: 'early-access',
    internal: 'development'
  },

  async deployToChannel(channel: string, version: string) {
    await CapacitorUpdater.setChannel({
      channel: channel,
      version: version
    });
  }
};
```

> "We practice agile development and @Capgo is mission-critical in delivering continuously to our users!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Capgo also includes an analytics dashboard to monitor version adoption rates and detect potential issues early. With built-in encryption and customizable hosting options, teams can maintain security while scaling their deployment workflows.

## Conclusion

Understanding version tagging is key to simplifying development and deployment processes. Here's a quick recap of the main ideas and steps to get started.

### Key Takeaways

Version tagging helps developers maintain smooth and reliable updates. Proper version control offers clear advantages:

| Benefit | Impact | Outcome |
| --- | --- | --- |
| Instant Updates | Shorter review timelines | Faster user adoption [\[1\]](https://capgo.app/) |
| Version Control | Better code management | Higher success rates [\[1\]](https://capgo.app/) |
| Update Tracking | Real-time monitoring | Faster issue resolution [\[1\]](https://capgo.app/) |
| Distribution Control | Targeted rollouts | Multi-platform support |

These results highlight the importance of using effective version management tools.

### How to Begin

To put these benefits into action, follow these steps:

-   **Set up version tracking**: Use semantic versioning in your `package.json` file and integrate necessary plugins.
-   **Add update checks**: Implement systems to verify and track version updates.
-   **Configure distribution channels**: Create separate environments for production, beta, and development.

Finally, consider adding a live update system to ensure deployments are both fast and secure.
