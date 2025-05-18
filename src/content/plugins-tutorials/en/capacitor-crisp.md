---
locale: en
---
# Using @capgo/capacitor-crisp Package

The `@capgo/capacitor-crisp` package allows you to integrate Crisp, a native SDK, into your Capacitor app. It provides methods for configuring Crisp, opening the chatbox, setting user details, sending events, and more.

To get started with the `@capgo/capacitor-crisp` package, follow these steps:

## Installation

1. Open your terminal and navigate to your Capacitor app's root directory.
2. Run the following command to install the package:

```bash
npm install @capgo/capacitor-crisp
npx cap sync
```

## Initialize Crisp

Before using any of the methods provided by the `@capgo/capacitor-crisp` package, you need to configure Crisp with your website ID. Add the following code to your project:

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.configure({ websiteID: '******-****-****-****-********' });
```

Replace `'******-****-****-****-********'` with your actual Crisp website ID.

### iOS Integration

If you're targeting iOS, you need to add the following permissions to your app's Info.plist file:

- Privacy - Camera Usage Description (NSCameraUsageDescription)
- Privacy - Photo Library Additions Usage Description (NSPhotoLibraryAddUsageDescription)

Make sure to provide a description for each permission explaining why your app needs it.

### Android Integration

There are no additional steps required for Android integration.

## Open the Chatbox

To open the Crisp chatbox in your app, use the `openMessenger` method provided by the `@capgo/capacitor-crisp` package. Add the following code to your project:

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.openMessenger();
```

This will open the Crisp chatbox for users to start a conversation with your support team.

## Additional Functionality

The `@capgo/capacitor-crisp` package provides several other methods for customizing and interacting with Crisp. Here are some of the available methods:

- `setTokenID`: Set the token ID for the user.
- `setUser`: Set the user's details such as nickname, phone number, email, and avatar.
- `pushEvent`: Send a custom event to Crisp.
- `setCompany`: Set the company details including name, URL, description, employment, and geolocation.
- `setInt`: Set a custom integer value.
- `setString`: Set a custom string value.
- `sendMessage`: Send a chat message to Crisp.
- `setSegment`: Set the segment for the user.
- `reset`: Reset the Crisp configuration.

For more information on these methods and their parameters, refer to the official documentation of the `@capgo/capacitor-crisp` package.

That's it! You've learned how to use the `@capgo/capacitor-crisp` package to integrate Crisp into your Capacitor app. Enjoy seamless communication with your users through the Crisp chatbox.
