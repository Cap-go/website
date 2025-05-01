How to Vibecode a Plugin with AI
===

In this article, we'll explore how to quickly create a plugin for Capacitor using Native SDK and AI assistance with Cursor. This guide will walk you through the process of building a plugin and setting up a test app to try it out.

## Why Use AI for Plugin Development?

AI tools like Cursor can significantly speed up the development process by generating boilerplate code, suggesting implementations, and debugging issues. This allows developers to focus on the core functionality of their plugins.

## Prerequisites

Before we start, ensure you have the following installed:
- Node.js (latest LTS version)
- npm or yarn
- Capacitor CLI (`npm install @capacitor/cli`)
- Android Studio or Xcode for native development
- Cursor or a similar AI coding assistant

## Step 1: Initialize a New Capacitor Plugin

To create a new Capacitor plugin, use the Capacitor CLI. Open your terminal and run:

```bash
npm init @capacitor/plugin@latest
```

Follow the prompts to name your plugin (e.g., `CapacitorScanbotPlugin`), set the package ID, and choose the platforms (iOS, Android, or both). This will create a basic plugin structure.

## Step 2: Define Plugin Functionality

Decide on a functionality for your plugin. For this example, let's create a plugin that integrates the Scanbot SDK, a third-party SDK for document scanning available on both iOS and Android. We'll name it `ScanbotPlugin`.

In the generated plugin folder, open the `src/definitions.ts` file and define the plugin interface:

```typescript
// src/definitions.ts
export interface ScanbotPlugin {
  startScanner(): Promise<{ scannedData: string }>;
}
```

## Step 3: Implement Native Code with AI Assistance

### Android Implementation

Navigate to `android/src/main/java/com/yourcompany/capacitorscanbotplugin/ScanbotPlugin.java`. Use Cursor to help generate the Android implementation. Ask Cursor to 'Implement a document scanning plugin for Android using Capacitor 6 and Scanbot SDK'.

Cursor might suggest something like:

```java
package com.yourcompany.capacitorscanbotplugin;

import android.content.Intent;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import io.scanbot.sdk.ScanbotSDK;
import io.scanbot.sdk.ui.view.camera.DocumentScannerActivity;

@CapacitorPlugin(name = "ScanbotPlugin")
public class ScanbotPlugin extends Plugin {
    private static final int REQUEST_CODE = 123;

    @PluginMethod
    public void startScanner(PluginCall call) {
        Intent intent = new Intent(getContext(), DocumentScannerActivity.class);
        startActivityForResult(call, intent, REQUEST_CODE);
    }

    @Override
    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
        super.handleOnActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE && resultCode == RESULT_OK) {
            // Handle the scanned data
            String scannedData = "Scanned document data"; // Replace with actual data extraction
            JSObject result = new JSObject();
            result.put("scannedData", scannedData);
            notifyListeners("scannerResult", result);
        }
    }
}
```

### iOS Implementation

For iOS, go to `ios/Plugin/ScanbotPlugin.swift`. Ask Cursor to 'Implement a document scanning plugin for iOS using Capacitor 6 and Scanbot SDK'.

Cursor might provide:

```swift
import Foundation
import Capacitor
import ScanbotSDK

@objc(ScanbotPlugin)
public class ScanbotPlugin: CAPPlugin {
    @objc func startScanner(_ call: CAPPluginCall) {
        let scanner = SBSDKDocumentScannerViewController()
        scanner.delegate = self
        bridge?.viewController?.present(scanner, animated: true, completion: nil)
        call.resolve()
    }
}

extension ScanbotPlugin: SBSDKDocumentScannerViewControllerDelegate {
    public func documentScanner(_ controller: SBSDKDocumentScannerViewController, didFinishWith document: SBSDKScannedDocument?) {
        controller.dismiss(animated: true, completion: nil)
        let result = ["scannedData": document?.description ?? "No data"]
        notifyListeners("scannerResult", result)
    }
}
```

## Step 4: Set Up a Test App

Create a new Capacitor app to test your plugin. Run:

```bash
npx @capacitor/cli create
```

Choose a framework (e.g., Vue.js with setup script) and name your app (e.g., `ScanbotTestApp`). Once created, navigate to the app folder and install your plugin:

```bash
npm install ../path/to/your/CapacitorScanbotPlugin
npx cap sync
```

## Step 5: Test the Plugin

In your test app, open `src/App.vue` and add a button to trigger the scanner:

```vue
<script setup lang="ts">
import { ScanbotPlugin } from 'capacitor-scanbot-plugin';

async function triggerScanner() {
  const result = await ScanbotPlugin.startScanner();
  console.log('Scanned Data:', result.scannedData);
}
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <button @click="triggerScanner" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
      Start Scanner
    </button>
  </div>
</template>
```

Run the app on a physical device to test:

```bash
npx cap run android
# or
npx cap run ios
```

## Step 6: Debug and Refine with AI

If you encounter issues, use Cursor to debug. Ask specific questions like 'Why is my Capacitor plugin not vibrating on Android?' Cursor can suggest checking permissions or updating the Android manifest.

## Conclusion

Using AI tools like Cursor, you can 'vibecode' a Capacitor plugin quickly by leveraging generated code and debugging assistance. This approach lets you focus on creativity and functionality, making plugin development a breeze.

Try it out and see how AI can enhance your development workflow!
