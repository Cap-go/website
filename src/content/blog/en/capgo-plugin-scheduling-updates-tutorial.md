---
slug: capgo-plugin-scheduling-updates-tutorial
title: "Capgo Plugin: Scheduling Updates Tutorial"
description: Learn how to efficiently schedule and manage OTA updates for Capacitor apps using an innovative plugin that ensures fast and secure deployments.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-05-24T04:20:44.227Z
updated_at: 2025-05-24T04:21:34.048Z
head_image: https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/68311bb4d3b96619817f3ed6-1748060494048.jpg
head_image_alt: Mobile Development
keywords: Capgo, OTA updates, Capacitor, app development, update scheduling, mobile apps, CI/CD integration, app security
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

[Capgo](https://capgo.app/) simplifies over-the-air (OTA) updates for [Capacitor](https://capacitorjs.com/) apps, allowing developers to push updates instantly without app store delays. Here's what you need to know:

-   **What is Capgo?** An open-source plugin for delivering secure, [instant updates](https://capgo.app/docs/) to app JavaScript and assets.
-   **Why use it?** Updates reach 95% of users within 24 hours, featuring end-to-end encryption, CI/CD integration, and rollback options.
-   **Key features:**
    -   **Auto-update scheduling** for precise rollouts.
    -   **Channel support** for beta testing or staged releases.
    -   **Performance stats:** 434ms API response, 114ms for 5MB downloads.
-   **Setup steps:** [Install the plugin](https://capgo.app/docs/plugin/cloud-mode/getting-started/), configure settings, and [enable auto-updates](https://capgo.app/docs/plugin/self-hosted/auto-update/) with `CapacitorUpdater.notifyAppReady()`.

Capgo ensures updates are fast, secure, and user-friendly, making it a must-have for developers managing frequent app changes.

## Setting Up [Capgo](https://capgo.app/) for Update Scheduling

![Capgo](https://assets.seobotai.com/capgo.app/68311bb4d3b96619817f3ed6/146f21857bbfc9b0e31de0c031b7d889.jpg)

To schedule updates with Capgo, you’ll need to install the plugin, set up your project, and configure the [auto-update features](https://capgo.app/docs/plugin/cloud-mode/auto-update/) to suit your needs. This process ensures your app can handle updates efficiently while maintaining compatibility with Capgo’s server.

### Installing and Configuring the Plugin

Start by installing the [Capgo updater plugin](https://capgo.app/docs/plugin/self-hosted/manual-update/). Run the following commands:

```bash
npm install @capgo/capacitor-updater
npx cap sync
npx @capgo/cli init
```

Next, configure your app settings in the `capacitor.config.ts` or `capacitor.config.json` file. Two critical fields - **appId** and **version** - identify your app to the Capgo server and ensure that updates are compatible. Make sure your app version adheres to [Semantic Versioning](https://semver.org/) (e.g., 1.0.0) [\[4\]](https://capgo.app/docs/plugin/cloud-mode/auto-update).

Here’s an example of the basic configuration in `capacitor.config.json`:

| Setting | Purpose | Example Value |
| --- | --- | --- |
| `autoUpdate` | Enables automatic updates | `true` |
| `updateUrl` | URL for checking updates | `'https://api.capgo.app/updates'` |
| `appId` | Identifies your app to Capgo | `'com.yourcompany.yourapp'` |
| `version` | Current app version | `'1.0.0'` |

During development, it’s a good idea to set `autoUpdate` to `false`. This prevents the system from overwriting your work with updates. Once your app is ready for production, switch `autoUpdate` back to `true` to enable updates for your users.

### Setting Up Auto-Update Features

With auto-update enabled, Capgo can handle background downloads and installations. The system periodically checks for updates and ensures users always have the latest version of your app.

One key step is implementing the `notifyAppReady()` function within your app. Use the `CapacitorUpdater.notifyAppReady()` method as early as possible after the app starts. This confirms that the new version is functioning properly. If the function isn’t called within the specified timeout, the system will revert to the last working version [\[4\]](https://capgo.app/docs/plugin/cloud-mode/auto-update).

Here are some configuration options to fine-tune auto-update behavior:

| Setting | Description | Default Value |
| --- | --- | --- |
| `appReadyTimeout` | Time (in ms) to wait before considering an update failed | `10000` (10 seconds) |
| `responseTimeout` | Time (in seconds) to wait for API requests to respond | `20` |
| `autoDeleteFailed` | Automatically deletes failed update bundles | `true` |
| `autoDeletePrevious` | Deletes previous bundles after successful updates | `true` |
| `directUpdate` | Installs updates directly upon app update/installation | `undefined` |
| `defaultChannel` | Sets the default update channel | `undefined` |

The `statsUrl` setting, which defaults to `https://api.capgo.app/stats`, allows you to monitor update performance and success rates via Capgo’s analytics dashboard [\[6\]](https://capgo.app/docs/plugin/settings).

For production environments, using CI/CD pipelines to upload new versions is highly recommended. This ensures consistency in your update process and minimizes the risk of manual errors during releases [\[4\]](https://capgo.app/docs/plugin/cloud-mode/auto-update).

Finally, remember that over-the-air (OTA) updates are limited to changes in HTML, CSS, and JavaScript files [\[5\]](https://capgo.app/docs/getting-started/quickstart)[\[7\]](https://capgo.app/docs/plugin/self-hosted/getting-started). Any modifications to native code will require submitting an updated version through the app store.

## How to Schedule and Prioritize Updates

Once you've configured your update system, the next step is to plan when and how updates should be delivered. Using smart scheduling and prioritization ensures updates are rolled out efficiently with minimal disruption to users.

### Scheduling Updates Based on App State

The best way to time updates is by understanding your app's behavior and how users interact with it. Tools like Capgo let you define **delay conditions**, postponing updates until certain criteria are met - like when the app is in the background or a specific date arrives [\[3\]](https://github.com/Cap-go/capacitor-updater)[\[10\]](https://classic.yarnpkg.com/en/package/@capgo/capacitor-updater).

For example, you can use Capacitor's App plugin combined with the Capgo updater to track when the app enters an idle state. This setup allows you to trigger update checks during low-activity periods, ensuring a smoother experience for users.

### Considering Network and Device Conditions

A good scheduling strategy also takes network and device conditions into account before starting downloads. For larger updates, prioritize **Wi-Fi connections** to avoid using cellular data, which can lead to incomplete downloads.

Battery life is another critical factor. Updates should only proceed if the device has enough power to complete the installation. Capgo allows you to program these checks, ensuring updates are initiated only when conditions are ideal. Once these basics are in place, you can focus on prioritizing updates for different user groups.

### Prioritizing Updates for Different User Groups

Capgo offers tools to tailor update strategies for various user segments by using separate channels. This approach ensures updates are delivered in a way that aligns with each group's needs.

| User Segment | Channel Type | [Update Strategy](https://capgo.app/docs/plugin/cloud-mode/hybrid-update) |
| --- | --- | --- |
| Power Users | Beta Channel | Early access to new features |
| Regular Users | Production Channel | Gradual rollouts prioritizing stability |
| Low Activity Users | Stable Channel | Updates focused on core functionality |

For even more control, you can implement percentage-based rollouts or allow specific groups to opt in [\[9\]](https://capgo.app/docs/faq). This method works particularly well for QA teams or organizations that require a [controlled update process](https://capgo.app/docs/live-updates/update-behavior/).

For simpler apps, stick to separate channels. For apps with a diverse user base, consider combining multiple strategies to meet various needs effectively.

## Testing and Monitoring Update Schedules

Once you've set up your update scheduling strategy, it's time to ensure everything runs smoothly before releasing it to users. Testing and monitoring are critical steps to catch potential issues early and ensure a seamless update experience.

### How to Test Update Scheduling

Testing [scheduled updates](https://capgo.app/docs/live-updates/update-behavior/) requires an environment that closely mirrors your production setup. This ensures that any issues encountered during testing are likely to reflect real-world scenarios.

To get started, you'll need specific tools and software versions. Your testing environment should include:

-   **Capacitor CLI** version 6.0 or higher
-   **[Node.js](https://nodejs.org/en)** 16.0 or newer
-   The latest **Capgo plugin**
-   A testing framework like **[Cypress](https://www.cypress.io/)** or **[Appium](http://appium.io/)** for automated testing

Focus your testing on these key areas: [update detection](https://capgo.app/docs/plugin/cloud-mode/hybrid-update), download, installation, and rollback. Each phase should meet strict performance and reliability standards.

| Test Type | Focus Area | Target Metrics |
| --- | --- | --- |
| **Update Detection** | Version checking | ~434ms response time |
| **Download Process** | Bundle download | 5MB bundle in ~114ms |
| **Installation** | Update application | Successful integration |
| **Rollback** | Version reversion | Successful rollback |

Pay close attention to configuration details, as mismatched version numbers in your `capacitor.config.json` file can disrupt the update process. Double-check that all version numbers align with your deployment settings.

Additionally, ensure updates are triggered only under specific conditions, such as when the app is in the background or when Wi-Fi is available. Simulate interruption scenarios, like network disruptions, to test the system's resilience.

Thorough testing sets the stage for effective performance tracking once updates are live.

### Tracking Update Performance

After testing is complete, shift your focus to monitoring how updates perform in real time. This step is essential for maintaining a reliable update system.

Capgo offers real-time analytics that provide immediate insights into update performance. Through its dashboard, you can track key metrics such as update success rates, download speeds, and user engagement patterns as updates roll out.

> "Track update success rates and user engagement in real-time" - Capgo [\[8\]](https://capgo.app/)

Capgo's data highlights what a well-optimized update system can achieve. For example, 95% of active users are typically updated within 24 hours, and the platform reports an 82% global success rate for updates [\[8\]](https://capgo.app/). These benchmarks can serve as a reference point for evaluating your own system's performance.

Error tracking is another valuable feature. Capgo captures logs and metrics, helping you identify patterns in failed updates or slow downloads before they escalate. If an update creates unexpected issues, Capgo's one-click rollback feature allows you to quickly revert to a previous version.

> "One-click rollback to any previous version if needed" - Capgo [\[8\]](https://capgo.app/)

To optimize your update strategy further, monitor performance across different user segments and device types. Capgo's [channel system](https://capgo.app/docs/plugin/cloud-mode/channel-system/) lets you target specific groups for staged rollouts, reducing the risk of widespread issues. Set up alerts for critical metrics, such as high failure rates or unusually slow downloads, so you can address problems promptly. Consistent monitoring not only helps you resolve issues quickly but also improves your update process over time, leading to better performance and happier users.

## Best Practices and Advanced Methods

Once you've mastered basic scheduling and monitoring, it's time to explore advanced strategies that can take your OTA update system to the next level. These methods can improve performance, ease server demands, and strengthen security.

### Using Staggered and Time-Based Updates

Staggered rollouts are a smart way to reduce risks and manage server resources more effectively. Instead of pushing updates to everyone at once, you can control the rollout's pace and timing, ensuring a smoother process.

Take advantage of Capgo's channel system to manage these staggered rollouts. For instance, start with a small group of beta users to test the update. Once you’re confident, gradually expand the rollout to larger user groups.

Time-based deployments are another useful tactic. By scheduling updates during off-peak hours - like late nights or weekends - you can minimize disruptions to users' workflows. This is especially important for business apps where uptime is critical.

Capgo combines the power of [Cloudflare](https://www.cloudflare.com/) and [Supabase](https://supabase.com/) to handle high-volume rollouts reliably [\[12\]](https://github.com/Cap-go/capgo). You might also consider a 24-hour adoption cycle aimed at reaching 95% of active users. This approach gives you enough time to monitor each phase while maintaining fast deployment speeds.

### Making Update Bundles Smaller

Smaller update bundles mean faster downloads and less strain on users' bandwidth. One effective method is delta updates, which send only the changes made since the last version, reducing the amount of data transferred [\[11\]](https://www.regamiota.com/post/implementing-ota-updates-best-practices-for-manufacturers).

It’s also crucial to use transfer protocols with retry mechanisms. These ensure that updates can resume where they left off if a download is interrupted [\[11\]](https://www.regamiota.com/post/implementing-ota-updates-best-practices-for-manufacturers).

Set performance goals to enhance the user experience. For example, aim for download speeds under 500ms and delivery times under 150ms for 5MB packages via a CDN. These benchmarks ensure users face minimal delays during updates, complementing efficient scheduling practices.

### Maintaining Security and Compliance

Security should be a top priority in your update process. Protect your updates with end-to-end encryption to ensure secure transmission and storage. This is non-negotiable in today’s connected world.

Regular security audits and penetration testing are key to identifying and fixing vulnerabilities before they can be exploited [\[13\]](https://www.t-systems.com/dk/en/insights/newsroom/expert-blogs/over-the-air-automotive-security-1046054). The rise in remote attacks - accounting for over 95% of automotive cyberattacks in 2023 - underscores the need for robust defenses [\[13\]](https://www.t-systems.com/dk/en/insights/newsroom/expert-blogs/over-the-air-automotive-security-1046054).

Recent incidents in the automotive industry have shown how critical it is to respond quickly to vulnerabilities [\[13\]](https://www.t-systems.com/dk/en/insights/newsroom/expert-blogs/over-the-air-automotive-security-1046054). To stay ahead, implement a multi-layered security monitoring system with clear response protocols:

| Alert Level | Trigger | Response Action |
| --- | --- | --- |
| Low | Unusual access patterns | Investigate immediately and document findings |
| Medium | Multiple failed operations | Temporarily suspend key usage |
| High | Confirmed compromise | Rotate the key without delay |
| Critical | Active exploit detected | Replace all system keys immediately |

Security measures should cover all bases, from data encryption and secure storage to enforcing HTTPS connections and role-based access controls. Regular SSL/TLS validation and authentication tests will help ensure these protections remain effective.

Finally, keep users informed and engaged. Provide clear notifications about upcoming updates, detailing what’s changing and any actions they might need to take [\[11\]](https://www.regamiota.com/post/implementing-ota-updates-best-practices-for-manufacturers). Give users the option to schedule or defer updates, which not only improves their experience but also helps meet regulatory requirements.

## Summary and Next Steps

Now that you’ve explored the full range of OTA scheduling tools with Capgo, you’re equipped to manage updates efficiently - balancing speed, safety, and user experience. From installation and configuration to advanced rollout strategies and security measures, these techniques set you up for success.

The key to effective scheduling lies in starting small, monitoring performance metrics, and scaling gradually. For example, achieving a 95% adoption rate within 24 hours is entirely possible when you combine a well-planned rollout with reliable infrastructure [\[1\]](https://capgo.app/blog). These practices ensure [smooth updates](https://capgo.app/docs/live-updates/update-behavior/) while maintaining high performance.

> "Capgo solves a major problem for Capacitor application developers: how to deploy updates quickly without going through the tedious app store process. And it does it brilliantly, offering a robust solution." - Thomas Sanlis, Uneed Review [\[2\]](https://www.uneed.best/blog/capgo-review)

Capgo’s simplicity is one of its standout features. In April 2025, Thomas Sanlis from Uneed demonstrated just how accessible it is. With no prior experience in Capacitor, he installed Capgo in a [Nuxt 3](https://nuxt.com/) project in about 20 minutes. He then simulated a bug fix by editing text on the home page and redeploying the update - all in under a minute [\[2\]](https://www.uneed.best/blog/capgo-review).

Ready to roll out your updates? Start with a **15-day free trial** to explore Capgo’s scheduling features and see how they align with your app’s needs [\[2\]](https://www.uneed.best/blog/capgo-review). When you’re prepared to deploy, the CLI command `npx @capgo/cli@latest bundle upload --channel=Production` makes the process seamless [\[2\]](https://www.uneed.best/blog/capgo-review).

**Keep an eye on your progress** by tracking update adoption rates, setting up automated error tracking for quick rollbacks, and using staged rollouts to control delivery [\[1\]](https://capgo.app/blog). Make sure your app confirms updates as outlined earlier [\[4\]](https://capgo.app/docs/plugin/cloud-mode/auto-update).

In a constantly evolving OTA update landscape, Capgo stands out as a reliable, long-term solution. Its open-source foundation and compliance with both Apple and Android guidelines ensure it’s ready to meet your needs now and in the future.

Start implementing these strategies today to make your update process more efficient and keep your users satisfied. Capgo’s tools are here to help you streamline deployments and enhance the overall experience.

## FAQs

::: faq
### How does Capgo keep over-the-air updates secure for Capacitor apps?

Capgo secures over-the-air (OTA) updates for [Capacitor apps](https://capgo.app/blog/capacitor-comprehensive-guide/) through **end-to-end encryption**, ensuring update data stays protected from creation to delivery on the user’s device. This approach prevents any interception or tampering during transmission.

To strengthen security further, Capgo uses advanced key management techniques. By implementing [encryption algorithms](https://capgo.app/docs/cli/migrations/encryption/) like RSA-4096 and AES-256, it securely generates and stores keys. Each update is also verified and monitored for integrity before deployment, adding another layer of protection.

With these measures in place, developers can deliver updates confidently, keeping user data safe while meeting platform security standards.
:::

::: faq
### What are the best practices for testing and monitoring scheduled updates with Capgo?

To make scheduled updates with Capgo as smooth and effective as possible, here are some practical tips to keep in mind:

-   **Keep update file sizes small** by using methods like differential updates and compression. This not only speeds up downloads but also helps reduce delays when users launch the app.
-   **Plan updates for off-peak hours** to minimize disruptions. Pair this with phased rollouts to introduce changes gradually. This way, you can monitor performance in real time and make quick fixes if any issues pop up.
-   Leverage **real-time analytics** to track how updates are performing and measure user engagement. Adding an auto-rollback feature ensures that failed updates are quickly reversed, keeping the user experience smooth and uninterrupted.

By following these steps, developers can manage updates efficiently while keeping users happy.
:::

::: faq
### How do I use Capgo's channel system to prioritize updates for different user groups?

With Capgo's channel system, you can tailor updates for different user groups by creating specific channels like **production**, **beta**, or **staging**. This method allows you to deliver updates to targeted users, test new features with smaller audiences, and push urgent fixes quickly - bypassing the need for app store approvals.

You can also assign roles such as **Admin**, **Developer**, or **Viewer** to manage access and permissions for each channel. This structure streamlines phased testing and ensures updates are deployed gradually and effectively to your users.
:::
