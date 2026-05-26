---
locale: en
---
# Using @capgo/capacitor-android-sms-retriever

`@capgo/capacitor-android-sms-retriever` provides Android SMS Retriever and Phone Number Hint APIs for Capacitor apps.

Use it when you need passwordless phone verification without asking for SMS permissions. Android listens for one app-targeted verification SMS for up to five minutes and returns the message through Capacitor listeners.

## Install

```bash
bun add @capgo/capacitor-android-sms-retriever
bunx cap sync android
```

## What This Plugin Exposes

- `startWatch` starts the Android SMS Retriever watch.
- `stopWatch` stops the active watch.
- `getHashString` returns the app hash required in verification SMS messages.
- `getPhoneNumber` opens Android Phone Number Hint for SIM-based phone number selection.
- `smsReceived`, `smsRetrieverTimeout`, and `smsRetrieverError` events cover the verification lifecycle.

## Example Usage

```typescript
import { AndroidSmsRetriever } from '@capgo/capacitor-android-sms-retriever';

const { hash } = await AndroidSmsRetriever.getHashString();
console.log('SMS hash:', hash);

await AndroidSmsRetriever.addListener('smsReceived', ({ message }) => {
  console.log('Verification SMS:', message);
});

await AndroidSmsRetriever.startWatch();
```

## Phone Number Hint

```typescript
const { phoneNumber } = await AndroidSmsRetriever.getPhoneNumber();
console.log(phoneNumber);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-android-sms-retriever/
- Docs: /docs/plugins/android-sms-retriever/

## Keep going from Using @capgo/capacitor-android-sms-retriever

If you are using **Using @capgo/capacitor-android-sms-retriever** to plan native plugin work, connect it with [@capgo/capacitor-android-sms-retriever](/docs/plugins/android-sms-retriever/) for the implementation detail in @capgo/capacitor-android-sms-retriever, [Getting Started](/docs/plugins/android-sms-retriever/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
