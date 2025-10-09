---
slug: how-to-add-dependencies-in-capacitor-plugins
title: How to Add Dependencies in Capacitor Plugins
description: Learn to streamline dependency management in Capacitor plugins across platforms with practical steps and best practices.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-03-27T02:08:04.837Z
updated_at: 2025-03-27T02:08:34.795Z
head_image: https://assets.seobotai.com/capgo.app/67e4966a10051fda3b63500a-1743041314795.jpg
head_image_alt: Mobile Development
keywords: Capacitor, plugin dependencies, iOS, Android, JavaScript, CocoaPods, Gradle, development tools
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

**Adding dependencies to [Capacitor](https://capacitorjs.com/) plugins can feel overwhelming, but it’s easier when broken into clear steps. Here’s what you need to know:**

1.  **Understand the tools**:
    
    -   **JavaScript**: Use `npm` to manage dependencies.
    -   **iOS**: Use [CocoaPods](https://cocoapods.org/) or Swift Package Manager (SPM).
    -   **Android**: Use [Gradle](https://gradle.org/) for dependency management.
2.  **Set up your development environment**:
    
    -   Install tools like [Node.js](https://nodejs.org/en), [npm](https://www.npmjs.com/), [Xcode](https://developer.apple.com/xcode/), [Android Studio](https://developer.android.com/studio), CocoaPods, and JDK.
3.  **Start your [Capacitor plugin project](https://capgo.app/blog/capacitor-comprehensive-guide/)**:
    
    -   Use `npm init @capacitor/plugin` to create a new plugin.
4.  **Add JavaScript dependencies**:
    
    -   Use `npm install` for production and development dependencies.
    -   Update `package.json` to include peer dependencies like `@capacitor/core`.
5.  **Handle platform-specific dependencies**:
    
    -   **iOS**: Configure CocoaPods or SPM with libraries like [Alamofire](https://github.com/Alamofire/Alamofire) or [SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON).
    -   **Android**: Use Gradle to add dependencies like Gson or AppCompat.
6.  **Optimize performance**:
    
    -   Pin versions, audit dependencies, and resolve conflicts to ensure stability.
7.  **Use tools like [Capgo](https://capgo.app/) for live updates**:
    
    -   Push updates instantly without app store reviews.

**Quick Comparison of Tools**:

| Platform | Tool | Example Dependency |
| --- | --- | --- |
| JavaScript | npm | `npm install lodash --save` |
| iOS | CocoaPods/SPM | `pod 'Alamofire', '~> 5.6.4'` |
| Android | Gradle | `implementation 'com.google.code.gson:gson:2.10.1'` |

**Why it matters**: Managing dependencies effectively ensures your plugin works seamlessly across platforms, saves time, and avoids errors. Let’s dive deeper into the steps.

## How to create a [Capacitor](https://capacitorjs.com/) plugin for iOS/Android

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-27.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/Dq_BmheGAig" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Setting Up Your Development Environment

Prepare your setup with the necessary tools to handle [Capacitor plugin](https://capgo.app/blog/capacitor-comprehensive-guide/) dependencies effectively.

### Required Development Tools

Here’s a list of tools you’ll need:

| Tool | Version | Purpose |
| --- | --- | --- |
| Node.js | 16.0.0+ | JavaScript runtime environment |
| npm | 8.0.0+ | Package management |
| Xcode | 14.0+ | iOS development (Mac only) |
| Android Studio | Electric Eel+ | Android development |
| CocoaPods | 1.11.0+ | iOS dependency management |
| JDK | 11+ | Android build tools |

### Starting a New Plugin

Use the Capacitor CLI to kick off your plugin project. This includes setting up platforms and naming your plugin using a reverse-domain format (e.g., `com.mycompany.plugin`):

1.  Run the following command:  
    `npm init @capacitor/plugin`
2.  Choose your target platforms (iOS/Android).
3.  Assign a name to your plugin in reverse-domain format.

### Project Setup Steps

1.  **Update `package.json`**
    
    Modify your `package.json` to include the following:
    
    ```json
    {
      "capacitor": {
        "ios": {
          "src": "ios"
        },
        "android": {
          "src": "android"
        }
      },
      "peerDependencies": {
        "@capacitor/core": "^5.0.0"
      }
    }
    ```
    
2.  **Platform-Specific Setup**
    
    -   For **iOS**, ensure your Podfile includes:
        
        ```ruby
        platform :ios, '13.0'
        use_frameworks!
        ```
        
    -   For **Android**, verify your `build.gradle` contains:
        
        ```kotlin
        android {
            compileSdkVersion 33
            defaultConfig {
                minSdkVersion 22
            }
        }
        ```
        
3.  **Set Up Environment Variables**
    
    Configure the following environment variables for your development tools:
    
    | Variable | Purpose | Example Value |
    | --- | --- | --- |
    | ANDROID\_HOME | Android SDK location | /Users/username/Library/Android/sdk |
    | JAVA\_HOME | JDK installation path | /Library/Java/JavaVirtualMachines/jdk-11.0.12.jdk/Contents/Home |
    | XCODE\_SELECT | Xcode command line tools | /Applications/Xcode.app/Contents/Developer |
    

Once your project is set up, you're ready to move on to managing JavaScript dependencies.

## JavaScript Dependencies

Effectively managing JavaScript dependencies is key to maintaining stable plugin performance.

### [npm](https://www.npmjs.com/) Package Installation

![npm](https://mars-images.imgix.net/seobot/screenshots/www.npmjs.com-ac76028e07fa565ed4006978107f5ce6-2025-03-27.jpg?auto=compress)

To install dependencies, use the following commands:

```bash
# Add a production dependency
npm install lodash --save

# Add a development dependency
npm install @types/lodash --save-dev
```

Make sure to manually include peer dependencies in your `package.json` file. Test all dependencies to confirm compatibility across both web and native platforms.

### Managing package.json

Here’s an example `package.json` configuration:

```json
{
  "name": "my-capacitor-plugin",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "@types/lodash": "^4.14.195",
    "@capacitor/core": "^5.0.0"
  },
  "peerDependencies": {
    "@capacitor/core": "^5.0.0"
  }
}
```

To maintain consistency, lock dependency versions appropriately:

| Constraint Type | Example | Use Case |
| --- | --- | --- |
| Exact | "5.0.0" | For critical dependencies requiring a specific version |
| Caret | "^5.0.0" | Allows minor updates and patches |
| Tilde | "~5.0.0" | Restricts updates to patches only |

### Using JavaScript Libraries

When importing libraries, focus on reducing the bundle size:

```typescript
// Import only the required function
import { isEqual } from 'lodash';

export class MyPlugin {
  async compare(options: { value1: any, value2: any }): Promise<boolean> {
    return isEqual(options.value1, options.value2);
  }
}
```

Additionally, ensure proper error handling and type checking:

```typescript
import { Plugin } from '@capacitor/core';
import { validate } from 'your-validation-library';

@Plugin({
  name: 'MyPlugin',
  platforms: ['web', 'ios', 'android']
})
export class MyPlugin {
  async validateData(data: unknown): Promise<void> {
    try {
      if (!validate(data)) {
        throw new Error('Invalid data format');
      }
      // Continue processing if valid
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  }
}
```

Up next, explore how to handle platform-specific dependencies for iOS.

## iOS Dependencies

This section explains how to manage native iOS dependencies in [Capacitor plugins](https://capgo.app/plugins/). Once you've set up your JavaScript dependencies, the next step is handling native iOS dependencies.

### [CocoaPods](https://cocoapods.org/) Setup

![CocoaPods](https://mars-images.imgix.net/seobot/screenshots/cocoapods.org-fd202c6f9998fdf4cafb9b363e43119c-2025-03-27.jpg?auto=compress)

Start by initializing CocoaPods in your iOS directory:

```bash
cd ios
pod init
```

Then, update your `Plugin.podspec` file with the following configurations:

```ruby
Pod::Spec.new do |s|
  s.name = 'MyCapacitorPlugin'
  s.version = '1.0.0'
  s.summary = 'Your plugin description'
  s.platform = :ios, '13.0'
  s.dependency 'Capacitor'
  # Include your iOS dependencies here
  s.dependency 'Alamofire', '~> 5.6.4'
end
```

### Podfile Configuration

After initializing CocoaPods, configure the Podfile to include Capacitor and any additional third-party libraries:

```ruby
platform :ios, '13.0'
use_frameworks!

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
end

target 'Plugin' do
  capacitor_pods
  # Add third-party dependencies
  pod 'KeychainAccess', '~> 4.2.2'
  pod 'SwiftyJSON', '~> 5.0.1'
end

target 'PluginTests' do
  capacitor_pods
end
```

Here are some common dependency configuration patterns:

| Constraint Type | Example | Use Case |
| --- | --- | --- |
| Exact Version | `pod 'KeychainAccess', '4.2.2'` | When precise control is needed, such as for security components |
| Minor Version | `pod 'Alamofire', '~> 5.6'` | For stable APIs that may receive patch updates |
| Major Version | `pod 'SwiftyJSON', '> 5.0'` | When flexibility across updates is acceptable |

### Swift Package Dependencies

If you'd rather not use CocoaPods, Swift Package Manager (SPM) is a good alternative. Add SPM dependencies directly in Xcode with the following configuration in your `Package.swift` file:

```swift
// Package.swift
dependencies: [
    .package(url: "https://github.com/Alamofire/Alamofire.git", .upToNextMajor(from: "5.6.4")),
    .package(url: "https://github.com/SwiftyJSON/SwiftyJSON.git", from: "5.0.1")
]
```

To use SPM dependencies in your plugin code, import them and integrate as needed. For example:

```swift
import Capacitor
import Alamofire

@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
    @objc func makeRequest(_ call: CAPPluginCall) {
        AF.request("https://api.example.com/data").response { response in
            // Process the response
            call.resolve([
                "data": response.data
            ])
        }
    }
}
```

This approach allows you to choose between CocoaPods and Swift Package Manager based on your project requirements.

## Android Dependencies

Set up Android dependencies to ensure smooth native integration. Here's how to manage dependencies for your Capacitor plugin.

### [Gradle](https://gradle.org/) Dependencies

![Gradle](https://mars-images.imgix.net/seobot/screenshots/gradle.org-85d271057dfb5e2e134ec99beaad5682-2025-03-27.jpg?auto=compress)

Add the following configurations to your `build.gradle` file:

```kotlin
android {
    defaultConfig {
        minSdkVersion 22
        targetSdkVersion 33
    }
}

dependencies {
    implementation "androidx.appcompat:appcompat:1.6.1"
    implementation "com.google.code.gson:gson:2.10.1"
    implementation "org.jetbrains.kotlin:kotlin-stdlib:1.8.20"
    implementation project(':capacitor-android')
}
```

Define additional versions in the `buildscript` block:

```kotlin
buildscript {
    ext {
        androidxCoreVersion = '1.10.1'
        kotlinVersion = '1.8.20'
    }
}
```

Once dependencies are configured, make sure to set up the necessary repositories.

### Repository Configuration

In your project-level `build.gradle`, include the required Maven repositories:

```kotlin
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "https://jitpack.io" }
    }
}
```

If you're using custom or private Maven repositories, add credentials like this:

```kotlin
maven {
    url "https://maven.example.com/releases"
    credentials {
        username = project.findProperty("mavenUsername") ?: System.getenv("MAVEN_USERNAME")
        password = project.findProperty("mavenPassword") ?: System.getenv("MAVEN_PASSWORD")
    }
}
```

With repositories set up, address any dependency conflicts that may arise.

### Fixing Compatibility Issues

To handle dependency conflicts, apply version resolutions in your `build.gradle`:

```kotlin
configurations.all {
    resolutionStrategy {
        force "org.jetbrains.kotlin:kotlin-stdlib:1.8.20"
        force "androidx.core:core-ktx:1.10.1"
    }
}
```

Here are strategies for resolving common dependency issues:

| Issue Type | Strategy | Example |
| --- | --- | --- |
| Version Conflict | Force a specific version | `force 'com.google.code.gson:gson:2.10.1'` |
| Multiple Versions | Exclude a module | `exclude group: 'org.json', module: 'json'` |
| Transitive Issues | Use strict versions | `strictly 'androidx.core:core-ktx:1.10.1'` |

For instance, you can exclude conflicting modules like this:

```kotlin
dependencies {
    implementation('library:name:1.0.0') {
        exclude group: 'com.conflicting.dependency'
    }
}
```

Finally, optimize your build process by enabling caching and parallel execution in `gradle.properties`:

```properties
org.gradle.caching=true
org.gradle.parallel=true
org.gradle.jvmargs=-Xmx2048m
```

## [Capgo](https://capgo.app/) Integration

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-27.jpg?auto=compress)

Using Capgo alongside native and JavaScript dependency management makes updating your plugin faster and easier.

### About Capgo

Capgo is a live update platform designed for Capacitor plugins and apps. With over 23.5 million updates delivered across 750 production apps [\[1\]](https://capgo.app/), Capgo allows developers to push updates for dependencies and code instantly - no app store review required. Updates are secured with end-to-end encryption and meet both Apple and Android compliance standards.

### Capgo Update Features

Capgo simplifies managing plugin dependencies with these features:

| Feature | What It Does | Key Metric |
| --- | --- | --- |
| Live Updates | Push updates in minutes | 95% user update rate in 24 hours |
| Partial Updates | Download only changed files | 434ms average API response time |
| Version Control | Manage multiple versions | 82% global success rate |
| Channel System | Target specific user groups | Supports multiple deployment channels |

Source: [\[1\]](https://capgo.app/)

Capgo works seamlessly with CI/CD tools like GitHub Actions, GitLab CI, and Jenkins, automating dependency updates and ensuring consistent plugin versions. These tools make it easier to integrate Capgo into your workflow.

### Setting Up Capgo

Follow these steps to integrate Capgo into your project:

1.  **Install the Capgo CLI**
    
    Run the following command in your terminal:
    
    ```bash
    npx @capgo/cli init
    ```
    
2.  **Configure Update Preferences**
    
    Use the Capgo dashboard to set up deployment channels and preferences. Both cloud-hosted and self-hosted configurations are supported.
    
3.  **Add Update Logic**
    
    Add this code to your main plugin file to enable updates:
    
    ```typescript
    import { Capgo } from '@capgo/capacitor-updater';
    
    // Initialize Capgo
    const capgo = new Capgo({
      appId: 'YOUR_APP_ID',
      channel: 'production'
    });
    
    // Check for updates
    await capgo.checkForUpdate();
    ```
    

> "We practice agile development and @Capgo is mission-critical in delivering continuously to our users!" - Rodrigo Mantica

Capgo also provides an analytics dashboard for real-time insights into update success rates and user activity. Features like one-click rollback and error tracking help resolve any issues quickly, keeping your plugin updates running smoothly.

## Conclusion

### Process Review

Managing dependencies for Capacitor plugins involves aligning the native components (iOS and Android) with their JavaScript counterparts to ensure smooth integration. This process includes platform-specific setups and managing JavaScript packages to achieve the best performance. Following the outlined steps will help maintain stable and efficient plugin functionality.

### Best Practices

To manage dependencies effectively, consider these practices:

| Practice | Benefit | How to Implement |
| --- | --- | --- |
| Version Pinning | Avoids unexpected issues | Use fixed versions in `package.json` |
| Platform Isolation | Minimizes conflicts | Separate native dependencies |
| Regular Updates | Improves security | Apply critical patches promptly |
| Dependency Auditing | Detects risks | Run `npm audit` frequently |

Using live update tools like Capgo can further simplify and improve these practices by enabling real-time updates.

### Capgo Benefits

Capgo simplifies the dependency management process while delivering strong performance. It achieves an impressive **95% user update rate within 24 hours** and maintains a global API response time of **434ms** [\[1\]](https://capgo.app/). With end-to-end encryption, it ensures secure updates that comply with both Apple and Android guidelines. For teams managing multiple plugin versions, Capgo's channel system allows targeted deployments for specific user groups.

Here’s a quick look at Capgo’s performance:

| Metric | Value |
| --- | --- |
| Global API Response Time | 434ms |
| Update Success Rate | 82% |
| User Update Rate (24 Hours) | 95% |