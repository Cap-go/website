---
slug: how-to-use-semantic-versioning-with-capgo-ota-updates
title: How to Use Semantic Versioning with Capgo OTA Updates
description: "Learn how to streamline app updates and version control using Semantic Versioning with Capgo's OTA updates for Capacitor apps."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-03-03T04:48:38.491Z
updated_at: 2025-03-18T13:14:09.597Z
head_image: https://assets.seobotai.com/capgo.app/67c4f6356c9ebce91891f4e6-1740977344964.jpg
head_image_alt: Mobile Development
keywords: Semantic Versioning, Capgo, OTA updates, Capacitor apps, version control, app updates, deployment, CI/CD
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

**Want to simplify [app updates](https://capgo.app/plugins/capacitor-updater/) and version control?** Semantic Versioning (SemVer) combined with [Capgo](https://capgo.app/)'s Over-The-Air (OTA) updates makes managing [Capacitor](https://capacitorjs.com/) apps easier and faster. Here's how:

-   **Semantic Versioning Basics:** Versions use the format `MAJOR.MINOR.PATCH`:
    
    -   **MAJOR:** For breaking changes.
    -   **MINOR:** For new features that are backward-compatible.
    -   **PATCH:** For bug fixes.
-   **Why Use SemVer with Capgo?**
    
    -   Clear communication about updates.
    -   Smarter version management.
    -   Avoid dependency conflicts.
    -   Organized release planning.
-   **[Capgo Setup](https://capgo.app/docs/cli/commands/) Steps:**
    
    1.  Install Capgo's updater plugin.
    2.  Configure your app's version in `capacitor.config.json` and other files.
    3.  Initialize with your API key.
    4.  Use [Capgo CLI](https://capgo.app/docs/cli/commands) to bundle and upload updates.
-   **[Manage Versions and Channels](https://capgo.app/docs/webapp/channels/):**
    
    -   Use separate channels (e.g., "beta" for testing, "production" for stable releases).
    -   Control update policies (auto-update patches, manual approval for major changes).
    -   Rollback options for failed updates.
-   **Deployment Process:**
    
    -   Update version numbers following SemVer rules.
    -   Test thoroughly before deploying.
    -   Use CLI commands to upload and distribute updates.

Capgo ensures updates reach users quickly and reliably, with tools to handle disruptions and maintain stability. Perfect for teams using CI/CD workflows to automate updates.

**Quick Tip:** Always test updates and use channels to manage staged rollouts effectively.

## Semantic Versioning | Level Up

<iframe src="https://www.youtube.com/embed/FNmzO-8Pu0A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## [Capgo](https://capgo.app/) Setup Guide

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-03.jpg?auto=compress)

Here's how to set up Capgo for managing OTA updates and version control with ease.

### Initial Setup Steps

Start by installing the [Capgo updater plugin](https://capgo.app/docs/plugin/self-hosted/manual-update/):

```bash
npm install @capgo/capacitor-updater  
npx cap sync
```

Make sure your `capacitor.config.json` file uses a semantic version format:

```json
{ 
  "appId": "com.example.app", 
  "appName": "My App", 
  "version": "1.0.0" 
}
```

For older projects, update version details in these locations:

-   `package.json` (look for the `version` field)
-   `android/app/build.gradle` (update `versionName`)
-   `ios/App/App.xcodeproj/project.pbxproj` (update `CURRENT_PROJECT_VERSION`)

Once configured, initialize Capgo with your API key:

```bash
npx @capgo/cli@latest init YOUR_API_KEY
```

**Quick Reference Table:**

| Setup Phase | Key Action | Verification Step |
| --- | --- | --- |
| Installation | Install plugin and sync | Check `package.json` |
| Configuration | Set version numbers | Verify across all files |
| Initialization | Connect with API key | Test connection status |
| Build | Create initial bundle | Confirm upload success |

### Version Control Integration

Capgo works well with CI/CD platforms, making [automated updates](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/) simple. Supported platforms include:

-   [GitHub Actions](https://docs.github.com/actions)
-   [GitLab CI](https://docs.gitlab.com/ee/ci/)
-   [Azure DevOps](https://azure.microsoft.com/en-us/products/devops)
-   [Jenkins](https://www.jenkins.io/)
-   [CircleCI](https://circleci.com/)

If you're working on local development, you can disable auto-updates by adding this to your configuration:

```json
{ 
  "plugins": { 
    "CapacitorUpdater": { 
      "autoUpdate": false 
    } 
  } 
}
```

This ensures Capgo won't overwrite your local changes. Once your setup is ready, upload your first version:

```bash
npx @capgo/cli@latest bundle upload  
npx @capgo/cli@latest channel set production -s default
```

Finally, notify the native plugin about the bundle's health in your app's main file:

```javascript
import { CapacitorUpdater } from '@capgo/capacitor-updater';  
CapacitorUpdater.notifyAppReady();
```

This setup ensures your app is ready for smooth OTA deployments and version management.

## Using Semantic Versioning with Capgo

### Version Number Management

Capgo uses Semantic Versioning (SemVer) to manage app versions, formatted as **MAJOR.MINOR.PATCH**. Here's how it works:

-   **Major Version (X.0.0)**: Increase the MAJOR number for changes that break compatibility.
-   **Minor Version (1.X.0)**: Increase the MINOR number for new features that remain compatible.
-   **Patch Version (1.0.X)**: Increase the PATCH number for bug fixes that don't affect compatibility.

| Version Type | When to Increment | [Auto-Update Behavior](https://capgo.app/docs/plugin/cloud-mode/auto-update/) |
| --- | --- | --- |
| Major (X.0.0) | For breaking API changes | Requires manual approval |
| Minor (1.X.0) | For new features | Configurable in Capgo |
| Patch (1.0.X) | For bug fixes | Usually automatic |

By sticking to SemVer rules, you can simplify version management and ensure smoother updates across your deployment channels.

### Version Control Guidelines

Capgo allows you to manage deployments effectively by setting up distinct channels for different stages of your workflow.

-   **[Channel-Based Version Management](https://capgo.app/docs/webapp/channels/)**: Organize your deployment process by creating separate channels for testing and production. For example:
    
    -   Use a "beta" channel (e.g., 1.2.0-beta) for testing new features.
    -   Keep a "production" channel (e.g., 1.2.0) for stable releases.
    -   Add platform-specific channels (e.g., "ios-hotfix" with version 1.2.1) when addressing platform-specific issues.
-   **Update Policy Configuration**: Control how updates are applied using Capgo's configuration options. For instance:
    
    ```json
    {
      "plugins": {
        "CapacitorUpdater": {
          "disableAutoUpdate": "minor"
        }
      }
    }
    ```
    
    This setup ensures that users automatically receive patch updates, while minor and major updates require manual approval.
    
-   **Version Rollback Strategy**: Use pre-release identifiers to maintain clear rollback options. This approach allows you to revert to a previous version if problems occur, while keeping versioning consistent across all channels.
    

These best practices make it easier to manage updates, test new features, and maintain stability in your app's deployment process.



## OTA Update Deployment

Once your version management setup is ready, follow these steps to deploy OTA updates effectively.

### Update Preparation

Start by updating the version in **package.json** and **capacitor.config.json**. Make sure the version follows the SemVer format (MAJOR.MINOR.PATCH):

-   **Bug Fix**: Increase the PATCH number (e.g., 1.0.1 → 1.0.2)
-   **New Feature**: Increase the MINOR number (e.g., 1.0.0 → 1.1.0)
-   **Breaking Change**: Increase the MAJOR number (e.g., 1.0.0 → 2.0.0)

Thoroughly test your build and confirm the app communicates with the server using `notifyAppReady`.

Next, decide on your [update strategy](https://capgo.app/docs/plugin/cloud-mode/hybrid-update). You can choose from:

-   **Auto-Update**: Automatically enforce minimum version requirements.
-   **Manual Control**: Specify exact version requirements for updates.
-   **Channel-Based**: Use channels for testing and staged rollouts.

### Capgo CLI Update Commands

Use Capgo's CLI to deploy your update with ease. Here's how:

```bash
# Initialize Capgo in your project
npx @capgo/cli@latest init [apikey]

# Upload your update bundle
npx @capgo/cli bundle upload [appId]

# Add a new distribution channel
npx @capgo/cli channel add [channelId] [appId]
```

Capgo ensures secure deployment with end-to-end encryption and safe key management.

> "@Capgo is a smart way to make hot code pushes (and not for all the money in the world like with @AppFlow) 🙂"

Once deployed, you can monitor updates through Capgo's dashboard. Updates typically reach users within minutes after they open the app. The process works like this:

-   The app checks for updates.
-   Downloads the update in the background.
-   Marks the new version as active when the user exits the app.
-   Applies the update on the next launch.

For enterprise-level deployments, you might want to integrate CI/CD automation.

> "We practice agile development and @Capgo is mission-critical in delivering continuously to our users!"

## Problem Solving and Tips

### Version Management Issues

Managing semantic versioning in Capgo can sometimes complicate update deployments. To avoid overwriting your development work, configure the following in your `capacitor.config.json` file:

```json
{ 
  "plugins": { 
    "CapacitorUpdater": { 
      "autoUpdate": false 
    } 
  } 
}
```

If an update fails, here's what you can do:

-   Set `autoUpdate` to `false` during development.
-   Uninstall the app.
-   Reinstall it with the corrected version.
-   Re-enable auto-updates once everything is stable.

For major version updates, use the `disableAutoUpdateBreaking` flag and listen for the `majorAvailable` event to handle updates properly:

```javascript
CapacitorUpdater.addListener('majorAvailable', (info) => {
  console.log(`Major update available: ${info.version}`);
  // Add your update prompt logic here
});
```

By combining these configurations with good team practices, you can maintain version consistency and reduce errors.

### Team Version Control

Once individual updates are managed, it's crucial for teams to establish strong version control practices.

> "Testing each change before merging it with the main repository will reinforce stability and avoid costly errors" [\[4\]](https://www.autorabit.com/blog/9-tips-for-working-on-a-multi-developer-team/)

Here are some methods to ensure consistency:

-   Define one branch as the **main repository** to act as the source of truth.
-   Use separate Capgo channels for development and production environments.
-   Automate version uploads via CI/CD pipelines.
-   Document all code changes with clear and detailed commit messages.

For larger teams, the following version management matrix can help organize updates:

| Environment | Channel | Auto-Update | Version Pattern |
| --- | --- | --- | --- |
| Development | dev | Disabled | 0.x.x |
| Staging | beta | Enabled | x.x.x-beta |
| Production | stable | Enabled | x.x.x |

### Update Recovery Steps

Even with precautions, updates can fail. If that happens, follow these recovery steps:

1.  Roll back to a previous stable bundle.
2.  Increment version numbers for any new fixes (note: version numbers cannot be reused after deletion) [\[2\]](https://github.com/Cap-go/CLI).
3.  Verify updates during app startup to ensure they work as expected.

Capgo's updater is designed to handle disruptions. For example, if the server is unreachable or an update is deleted, the app continues to function normally [\[3\]](https://capgo.app/docs/faq/). Additionally, failed network requests are automatically retried during the next app launch [\[3\]](https://capgo.app/docs/faq/). This built-in resilience minimizes downtime and ensures smoother operations.

## Summary

Semantic Versioning, combined with Capgo, has made OTA updates for Capacitor apps more efficient. With 947.6 million updates delivered and 1,400 production apps using this system [\[1\]](https://capgo.app/), deployment processes have become 81% more efficient [\[1\]](https://capgo.app/). This setup allows developers to push updates quickly and in a controlled manner, bypassing app store delays.

Here’s what developers are saying:

> "We rolled out [Capgo OTA updates](https://web.capgo.app/resend_email) in production for our user base of +5000. We're seeing very smooth operation almost all our users are upto date within minutes of the OTA being deployed to @Capgo." - colenso [\[1\]](https://capgo.app/)

The MAJOR.MINOR.PATCH versioning system makes it easy to communicate breaking changes, new features, and bug fixes [\[5\]](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/). This is especially helpful for teams managing several releases each week through Capgo's platform.

Capgo’s [encrypted solution](https://capgo.app/docs/cli/migrations/encryption/), integrated with CI/CD tools, is also budget-friendly - cutting costs by up to $26,100 over five years [\[1\]](https://capgo.app/). Its customizable channels ensure updates reach the right users at the right time.

> "We practice agile development and @Capgo is mission-critical in delivering continuously to our users!" - Rodrigo Mantica [\[1\]](https://capgo.app/)