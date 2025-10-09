---
slug: privacy-manifest-for-ios-apps
title: Privacy Manifest for iOS Apps
description: "Learn about Apple's new Privacy Manifest requirements for iOS apps, including compliance steps and implications for developers starting May 2024."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-05-21T11:49:21.738Z
updated_at: 2025-05-21T11:50:39.357Z
head_image: https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/682d66c84fa53d42207e6f25-1747828239357.jpg
head_image_alt: Mobile Development
keywords: Privacy Manifest, iOS apps, data privacy, Apple guidelines, app compliance, developer resources
tag: Development, Mobile, Security
published: true
locale: en
next_blog: ''
---

**Starting May 1, 2024, Apple requires all iOS apps on the App Store to include Privacy Manifests.** These files, known as `PrivacyInfo.xcprivacy`, outline how apps and their dependencies handle user data. Non-compliance can result in app rejection or removal. Here's what you need to know:

-   **What is a Privacy Manifest?**  
    A structured file that documents:
    
    -   Data collected by your app and third-party SDKs.
    -   APIs used for sensitive data or tracking.
    -   Domains accessed by the app.
-   **Why does it matter?**
    
    -   Ensures transparency in data practices.
    -   Keeps App Store Privacy Labels accurate.
    -   Avoids app review delays or rejections.
-   **Key compliance steps:**
    
    1.  Use [Xcode](https://developer.apple.com/xcode/) 15 or later to create and configure the `PrivacyInfo.xcprivacy` file.
    2.  Document all APIs, data types, and tracking domains.
    3.  Obtain Privacy Manifests from third-party SDK providers.
    4.  Validate using Xcode’s Privacy Report.
-   **Deadlines:**
    
    -   **May 1, 2024:** Enforcement began.
    -   Apps must now include Privacy Manifests to be approved.

Non-compliance risks include App Store rejection, legal issues, and loss of user trust. Tools like automated scanners and privacy generators can simplify the process. Stay proactive to ensure your app meets Apple’s privacy standards.

## WWDC23: Get started with privacy manifests | Apple

<iframe src="https://www.youtube.com/embed/OQMF4LDqscc" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Apple's Privacy Manifest Rules

Apple's privacy manifest introduces a requirement for transparent disclosure of data collection and API usage across all components of iOS apps.

To comply, developers must include a **PrivacyInfo.xcprivacy** file that outlines three critical elements:

-   **Required reason API declarations**: Clearly state why specific APIs are being used.
-   **Data usage categories**: Specify what types of data are collected and how they are used.
-   **Domain usage documentation**: Detail the domains accessed by the app [\[3\]](https://www.adjust.com/glossary/privacy-manifests).

### Compliance Deadlines

Apple has established firm deadlines for meeting these requirements:

| Date | Milestone |
| --- | --- |
| May 1, 2024 | Mandatory enforcement begins |
| Post–May 2024 | Ongoing monitoring continues |

These dates highlight the urgency for developers to align their apps with the new rules to avoid disruptions.

### Non-Compliance Risks

Failure to comply with these guidelines can lead to severe consequences, including:

-   **Immediate App Store rejection**: Non-compliant apps will not be approved for distribution.
-   **Legal exposure**: Non-disclosure of data practices could result in regulatory action.
-   **Reputational damage**: Users may lose trust in apps that fail to meet transparency standards [\[2\]](https://softteco.com/blog/apple-privacy-changes).

> "Apps using specific APIs must declare their intended use in a privacy manifest file, effective May 1, 2024." – Apple [\[6\]](https://www.donnywals.com/how-to-add-a-privacy-manifest-file-to-your-app-for-required-reason-api-usage)

For developers using over-the-air (OTA) update solutions like [Capgo](https://capgo.app/), compliance is especially important. These update mechanisms, along with data handling practices, must be explicitly documented.

Additionally, every SDK and framework integrated into your app must include its own privacy manifest, outlining its data collection and API usage. During the App Store submission process, Xcode will compile these individual manifests into a unified Privacy Report [\[3\]](https://www.adjust.com/glossary/privacy-manifests).

## Required Tools and Setup

To implement Privacy Manifests in your iOS apps, you'll need to set up your development environment with the necessary tools and credentials. These steps will help you prepare to create a compliant **PrivacyInfo.xcprivacy** file.

### System Requirements

Make sure you have the following installed and configured:

-   **Xcode 15 or later**: This is the minimum version that supports Privacy Manifests [\[1\]](https://blog.ostorlab.co/apple-privacy-manifest-file.html).
    -   Available on the Mac App Store (stable release).
    -   Beta versions can be downloaded from the Apple Developer portal \[16\].
-   **macOS**: Use a stable version to ensure compatibility with Xcode.

### Developer Credentials

To work with Privacy Manifests and submit your app to the App Store, you'll need the following credentials:

| **Requirement** | **Purpose** | **Validation** |
| --- | --- | --- |
| Apple Developer Account | For app submission and certificate management | Requires an annual subscription. |
| Development Certificate | Enables code signing and development builds. | Must be valid and up to date. |
| Distribution Certificate | Required for submitting apps to the App Store. | Needs renewal every 12 months. |
| Provisioning Profiles | Used for device testing and deployment. | Must align with the app's bundle identifier. |

To create your **PrivacyInfo.xcprivacy** file, open Xcode and go to **New > File > iOS > Resource > App Privacy** [\[1\]](https://blog.ostorlab.co/apple-privacy-manifest-file.html). Place this file in the root directory of your app's bundle resources to ensure it's recognized during the build process.

Starting in Spring 2024, Apple will require all apps submitted to App Store Connect to include approved reasons for any listed API usage [\[7\]](https://forums.developer.apple.com/forums/thread/747709).

Once your tools and credentials are ready, you can move on to building the Privacy Manifest file directly in Xcode.

## Building the Privacy Manifest File

Creating a Privacy Manifest file in Xcode can be straightforward with the right steps and tools. Here's how you can set it up and streamline the process using automation.

### [Xcode](https://developer.apple.com/xcode/) Setup Steps

![Xcode](https://assets.seobotai.com/capgo.app/682d66c84fa53d42207e6f25/15516018a4284df8a7d0585815c62b4c.jpg)

1.  **Create the Privacy Manifest File**
    
    Open Xcode, navigate to **File > New > File**, and select "App Privacy File" under the Resource section. Make sure your app's target is selected during this process [\[8\]](https://www.ottorinobruni.com/how-to-create-a-privacyinfo-xcprivacy-file-your-practical-guide-to-ensuring-appstore-approval).
    
2.  **Configure Required Keys**
    
    Add the following keys to your newly created `PrivacyInfo.xcprivacy` file:
    
    | Key | Description | Required Value |
    | --- | --- | --- |
    | NSPrivacyTracking | Indicates if the app uses data for tracking | Boolean (true/false) |
    | NSPrivacyTrackingDomains | Lists domains used for tracking | Array of domains |
    | NSPrivacyCollectedDataTypes | Data types collected | Array of dictionaries |
    | NSPrivacyAccessedAPITypes | API access details | Array of dictionaries |
    
3.  **Validate Configuration**
    
    After configuring the file, verify your setup by generating a privacy report in Xcode. To do this:
    
    -   Create an archive by going to **Product > Archive**.
    -   Right-click the generated archive.
    -   Select **Generate Privacy Report** [\[8\]](https://www.ottorinobruni.com/how-to-create-a-privacyinfo-xcprivacy-file-your-practical-guide-to-ensuring-appstore-approval).

Using automation tools can help cut down on repetitive tasks and ensure consistency.

### Automation Methods

**[Privado.ai](https://www.privado.ai/) Integration**  
Privado's Privacy Manifest generator, introduced in June 2024, simplifies the process by automating code scanning and report generation. This tool:

-   Scans your code and SDK dependencies.
-   Maps out data collection practices.
-   Auto-fills privacy reports.
-   Links responses directly to the corresponding sections of your source code [\[10\]](https://www.privado.ai/post/apple-privacy-manifest-generator).

**App Privacy Manifest Fixer**  
Launched in April 2025, this tool uses shell scripts to:

-   Analyze your manifest and automatically resolve compliance issues.
-   Seamlessly integrate with your existing build processes.
-   Support custom templates for different project types [\[11\]](https://github.com/crasowas/app_privacy_manifest_fixer).

For consistent results, include these tools in your project directory. This ensures smooth manifest generation across your team and CI/CD pipelines.

When utilizing [over-the-air updates](https://capgo.app/blog/open-source-licecing/) through platforms like [Capgo](https://capgo.app), ensure your Privacy Manifest reflects any data collection or API usage tied to update functionality. Maintaining transparency here is key to staying compliant with App Store requirements while benefiting from modern update features.

## Data Collection and API Documentation

Once you've built your manifest file in Xcode, the next step is documenting your app's API usage and data collection practices. This is essential not only to meet Apple's compliance requirements but also to establish trust with your users.

### API Usage Documentation

Your **PrivacyInfo.xcprivacy** file must list all APIs that access sensitive information. When documenting API usage in your Privacy Manifest, include both the API categories and the approved reasons for their usage.

Here’s a quick overview of what needs to be documented:

| **API Category** | **Common Usage** | **Required Documentation** |
| --- | --- | --- |
| File Timestamp | Install date tracking | Declare purpose code (e.g., C617.1) |
| User Defaults | Settings persistence | Include reason code (e.g., CA92.1) |
| Disk Space | Update verification | Declare NSPrivacyAccessedAPICategoryDiskSpace usage reason |

This level of detail ensures a seamless connection between your manifest file and your data collection practices.

> "You are responsible for all code included in your apps, per the App Store Review Guidelines. This includes any data collection and tracking practices." - Tony, Privacy Engineering, Apple [\[5\]](https://developer.apple.com/videos/play/wwdc2023/10060)

When implementing over-the-air updates, pay particular attention to **disk space API declarations**. For instance, Firebase Analytics version 10.24.0 resolved ITMS-91053 errors in April 2024 by addressing issues related to **NSPrivacyAccessedAPICategoryDiskSpace** and **NSPrivacyAccessedAPICategoryUserDefaults** [\[12\]](https://stackoverflow.com/questions/78163859/itms-91053-missing-api-declaration-privacy).

### Data Types and Categories

Your Privacy Manifest must clearly outline all data types collected and categorize them appropriately. Specifically, you need to document the following:

-   Whether the data links to the user's identity.
-   Whether the data is used for tracking purposes.
-   If both apply, specify the approved purpose from Apple's predefined list.

For apps using third-party SDKs, ensure each SDK includes its own privacy manifest. For example, Persona SDK v2.18.0+ automatically declares the following data types:

-   **Coarse location** (e.g., IP address)
-   **Device ID** (device-level identification)
-   **User ID** (account-level identification)
-   **Diagnostic data** (e.g., error logs)
-   **Product interaction** (e.g., flow events)

To stay compliant, regularly audit your codebase to identify APIs that require inclusion in your Privacy Manifest [\[13\]](https://community.latenode.com/t/app-store-submission-warning-undeclared-api-usage-in-privacy-manifest/12207). This kind of proactive review can help avoid submission delays and keep your app aligned with Apple's evolving privacy standards.

## Third-Party SDK Management

Third-party SDKs must align with Apple's Privacy Manifest standards to comply with regulations and maintain user trust. These standards, discussed earlier, are equally important for third-party SDKs. Below, you'll find details on managing OTA updates in Capacitor apps and ensuring SDK compliance.

### Capacitor and OTA Updates

When using over-the-air (OTA) updates in Capacitor apps, it's crucial to configure your privacy manifest accurately. For apps employing live update solutions, you need to declare specific API usage in the privacy manifest:

| API Category | Required Declaration | Purpose |
| --- | --- | --- |
| Disk Space | NSPrivacyAccessedAPICategoryDiskSpace | Update package storage |
| User Defaults | NSPrivacyAccessedAPICategoryUserDefaults | Update configuration |
| Network Access | NSPrivacyAccessedAPICategoryNetworkInformation | Update delivery |

Capgo simplifies this process by integrating privacy manifest compliance into its OTA update system. It automatically declares the required APIs and data access, ensuring your app remains compliant while benefiting from real-time updates.

Now, let's explore the key steps for verifying SDK compliance.

### SDK Compliance Checks

After addressing OTA update declarations, it's essential to ensure all integrated SDKs meet the necessary standards. With 88% of organizations using thousands of cloud apps [\[16\]](https://spin.ai/blog/third-party-applications-audit), robust SDK compliance checks are a must.

-   **Automated Scanning**  
    Use tools like [Ostorlab.co](https://ostorlab.co/) to scan your app's IPA file [\[1\]](https://blog.ostorlab.co/apple-privacy-manifest-file.html). This complements the insights provided by your Xcode Privacy Report, offering a thorough analysis of your app's compliance.
    
-   **Version Management**  
    If an SDK lacks a privacy manifest, you'll need to manually declare its data usage in your app's `PrivacyInfo.xcprivacy` file [\[14\]](https://stackoverflow.com/questions/77400419/necessity-of-privacy-manifest-for-third-party-sdk-in-app-review). This step ensures transparency and adherence to Apple's guidelines.
    
-   **Security Implementation**  
    Mismanaged SDKs can lead to significant consequences. For instance, [Tilting Point Media](https://www.tiltingpoint.com/) faced a $500,000 settlement on June 18, 2024, for CCPA and COPPA violations due to improperly configured SDKs [\[15\]](https://www.privado.ai/post/how-privado-continuously-audits-app-sdks-and-ensures-compliance). To avoid similar pitfalls:
    
    -   [Encrypt sensitive data](https://capgo.app/docs/cli/migrations/encryption/) before it’s handled by SDKs.
    -   Apply least-privilege access principles to limit unnecessary permissions.
    -   Continuously monitor SDK usage within your app.
    -   Regularly audit SDK policies to ensure they remain compliant.

## Testing and Submission Process

Before you submit your app, you’ll need to test your Privacy Manifest implementation following Apple’s required procedures, effective May 1, 2024 [\[9\]](https://bitrise.io/blog/post/enforcement-of-apple-privacy-manifest-starting-from-may-1-2024).

### Xcode Privacy Report

Once you’ve set up your Privacy Manifest, the next step is testing its accuracy. Using Xcode 15, archive your project and generate a **Privacy Report** [\[8\]](https://www.ottorinobruni.com/how-to-create-a-privacyinfo-xcprivacy-file-your-practical-guide-to-ensuring-appstore-approval). This report provides an overview of your app’s declared data types, SDK practices, API usage, and tracking domains.

> "Xcode 15 can aggregate all the privacy manifests in your app's project, and produce a privacy report that summarizes the declared data uses... This helps you review, understand, and describe the privacy practices of your app and its dependencies." - Tony, Privacy Engineering, Apple [\[5\]](https://developer.apple.com/videos/play/wwdc2023/10060)

For further validation, you can use the Points of Interest instrument in Xcode 15 to detect any connections to tracking domains [\[5\]](https://developer.apple.com/videos/play/wwdc2023/10060).

### Submission Requirements

After reviewing the Privacy Report, ensure the following key components are ready for submission:

| **Requirement** | **Description** | **Verification Method** |
| --- | --- | --- |
| Privacy Manifest File | `.plist` file documenting data collection | Confirm file presence in Xcode |
| SDK Compliance | Privacy-impacting SDKs must include manifests | Check SDK documentation |
| API Usage Declaration | Approved reasons for Required Reason APIs | Match Privacy Report with App Store data |
| SDK Signatures | Privacy-impacting SDKs must be signed | Verify SDK signatures |

**Important Steps to Verify:**

-   Link the Privacy Manifest to your app target [\[17\]](https://stackoverflow.com/questions/78298380/get-blank-pdf-when-generating-privacy-report-using-xcode).
-   Confirm that third-party SDKs include their privacy bundles [\[17\]](https://stackoverflow.com/questions/78298380/get-blank-pdf-when-generating-privacy-report-using-xcode).
-   Accurately document and declare all tracking domains [\[5\]](https://developer.apple.com/videos/play/wwdc2023/10060).

> "Check that the privacy manifest matches your understanding of the third-party SDK's functionality." - Tony, Privacy Engineering at Apple [\[5\]](https://developer.apple.com/videos/play/wwdc2023/10060)

For a practical example, take the CodeWithChris team. In October 2023, they successfully implemented Apple’s privacy requirements while building their mood tracker app. They relied on Xcode’s privacy report to ensure every aspect of their app met Apple’s new standards before submission [\[18\]](https://codewithchris.com/privacy-manifest-experience).

## Updates and Maintenance

Keeping your Privacy Manifest up-to-date is just as important as maintaining your app's codebase. As [privacy policies](https://capgo.app/dp/) evolve, regular updates ensure compliance and streamline the approval process.

### Policy Update Tracking

Staying aligned with Apple's privacy policies is critical for maintaining App Store compliance. Since the May 1, 2024 enforcement deadline, developers have been required to keep a close eye on changes to privacy regulations and API specifications.

| **Update Type** | **Monitoring Method** | **Action Required** |
| --- | --- | --- |
| Apple Policy Changes | Developer Portal Notifications | Review manifest compliance |
| SDK Changes | Release Notes review | Update privacy bundles |
| API Requirements | Xcode Release Notes | Verify Required Reason APIs |

For instance, [InMobi](https://advertising.inmobi.com/)'s SDK version 10.7.2 included a detailed privacy manifest, which serves as a strong example of third-party documentation [\[4\]](https://verve.com/blog/mobile-performance-after-ios-privacy-manifest-enforcement-advertisers).

> "Developers are responsible for all code included in their apps" - Apple [\[4\]](https://verve.com/blog/mobile-performance-after-ios-privacy-manifest-enforcement-advertisers)

### Version Control

Beyond monitoring policy updates, systematic version control is essential for ensuring long-term compliance with Apple's evolving requirements. This step builds on earlier measures, helping developers maintain consistency and accountability.

-   **Automated Verification**  
    Automated checks can improve deployment success rates by identifying compliance issues in real time. They also enable quick rollbacks if problems arise, reducing downtime.
    
-   **SDK Integration Tracking**  
    Keep a detailed log of SDK versions and their associated privacy manifests. For example, Spotify's mobile team reduced app crashes by 15% over 30 days through precise SDK tracking and targeted fixes in August 2024 [\[20\]](https://docs.appcircle.io/versioning/ios-version).
    
-   **Change Management**  
    Document every change thoroughly:
    
    -   Record the reasons for updates
    -   Note affected APIs and data types
    -   Maintain an audit trail to simplify compliance reviews

Using version control tools with automated build and version management capabilities can make this process smoother. For example, [Appcircle](https://appcircle.io/)’s versioning system allows developers to manage build numbers and track versions through environment variables or Xcode integration [\[20\]](https://docs.appcircle.io/versioning/ios-version).

## Summary and Resources

Staying compliant with Apple's privacy standards requires ongoing attention and the right tools. Managing a Privacy Manifest is not a one-and-done task - it demands accuracy and regular updates. Recent findings reveal that many developers still fall short of compliance [\[1\]](https://blog.ostorlab.co/apple-privacy-manifest-file.html).

Here are some essential tools and resources to help streamline implementation:

| **Resource Type** | **Purpose** | **Access Method** |
| --- | --- | --- |
| Xcode Privacy Report | Validate privacy manifests | Xcode 15+ |
| Apple Developer Portal | Stay updated on policies | Developer account |
| WWDC Sessions | Get technical guidance | Apple Developer app |
| SDK Documentation | Ensure third-party compliance | Individual SDK portals |

These tools simplify the process of maintaining compliance, especially when it comes to validation and documentation. Developers can also explore automated solutions for privacy manifest management. For instance, _Capgo_ provides a live update feature for Capacitor apps, enabling quick updates while adhering to App Store requirements.

Starting in Spring 2024, Apple will require apps to resolve all privacy manifest and Required Reason API issues before they can be submitted or updated in the App Store [\[5\]](https://developer.apple.com/videos/play/wwdc2023/10060). To stay ahead, developers should:

-   Collect privacy manifests from third-party SDK providers.
-   Document all tracking domains and Required Reason API usage.
-   Regularly validate manifests using Xcode's privacy report.
-   Keep thorough records of data collection practices.

For further guidance, these resources are indispensable:

-   **Apple Developer Website**: Access updates on privacy requirements and policy changes [\[19\]](https://developer.apple.com/news).
-   **App Store Connect**: Review submission guidelines and requirements [\[19\]](https://developer.apple.com/news).
-   **WWDC Videos**: Watch technical sessions for privacy-related insights [\[21\]](https://appleinsider.com/articles/25/05/14/apples-developer-app-receives-an-update-ahead-of-wwdc-2025).

## FAQs

::: faq
### What happens if iOS app developers don’t meet Apple’s Privacy Manifest requirements by May 1, 2024?

Failing to meet Apple’s Privacy Manifest requirements by May 1, 2024, could have **serious repercussions** for iOS app developers. Your app might face rejection during the App Store review process, lose certain features, or even be removed from the store altogether.

Beyond that, non-compliance could subject future app submissions to **greater scrutiny**, potentially delaying approval times. These setbacks don’t just affect your app’s availability - they can also erode user trust and diminish your app’s presence in the marketplace. Staying ahead of the deadline helps ensure your app remains compliant and accessible to your audience.
:::

::: faq
### How can developers ensure third-party SDKs in their iOS apps meet Apple's Privacy Manifest requirements?

To meet Apple's **Privacy Manifest** requirements, developers must include a `PrivacyInfo.xcprivacy` file in their app or SDK. This file needs to clearly detail the types of data being collected and explain the purpose behind using specific APIs. Additionally, developers should confirm whether the third-party SDKs they rely on fall under Apple's guidelines for requiring a privacy manifest and signature.

Starting May 1, 2024, every app submitted to the App Store must comply with these rules. It's important for developers to work closely with their SDK providers to ensure accurate reporting of data practices, making it easier to align with the app's privacy manifest. Following these steps not only helps avoid App Store rejections but also fosters user trust by promoting transparency in data handling.
:::

::: faq
### How can developers create and maintain a Privacy Manifest for their iOS apps to comply with Apple's policies?

Developers working on iOS apps can create and manage a Privacy Manifest by adhering to Apple's guidelines and utilizing available tools. Apple's official documentation provides detailed instructions on setting up a **PrivacyInfo.xcprivacy** file, which specifies the data your app collects and any third-party SDKs in use. For step-by-step assistance, Apple’s WWDC23 video on privacy manifests is an excellent resource, covering how to identify privacy practices and generate privacy reports using Xcode 15 or later.

To streamline compliance, tools such as mobile app consent software can help manage SDKs and ensure proper user consent is obtained. These tools make it easier to stay aligned with Apple's data-sharing policies while fostering transparency with users. For developers using Capacitor apps, platforms like Capgo offer real-time update capabilities while maintaining compliance with privacy requirements.
:::