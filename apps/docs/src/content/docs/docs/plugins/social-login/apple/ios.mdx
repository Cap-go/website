---
title: Apple login on IOS
description: This comprehensive guide will walk you through the process of setting up Apple Login using Capacitor on iOS devices, ensuring a seamless integration by covering all necessary steps and configurations.
sidebar:
    order: 2
---

import { Steps } from '@astrojs/starlight/components';

Let's break down what you are going to need in order to setup Apple login on IOS.

<Steps>
1. Configure the capabilities of your app.

    In order to do this, please open Xcode, click on `App`
    ![App XCode](/social-login-assets/app-xcode.png)

2. Make sure that you select the right target.

    ![XCode App Target](/social-login-assets/xcode-app-target.png)

3. Please make sure that you add the `Sign in with Apple` capability.

    ![App XCode Add Capability](/social-login-assets/app-xcode-add-cap.png)

    ![App XCode Add Capability](/social-login-assets/sign-with-apple-cap.png)

    :::caution
    If you don't see the `Sign in with Apple` capability, configure the [Account & Organizational Data Sharing](https://developer.apple.com/account/resources/services/cwa/configure/)
    :::

4. Initialize the Apple Login in your app.

    :::note
    I am using Vue as my framework, the exact implementation will vary depending on the framework of your choice
    :::

    ```ts
    //  onMounted is vue specific
    onMounted(() => {
    SocialLogin.initialize({
        apple: {}
    })
    });
    ```

5. Create a button that will begin the login process.

    Said button should call the following function:

    ```ts
    async function loginApple() {
    const res = await SocialLogin.login({
        provider: 'apple',
        options: {}
    })
    ```

6. Run your app on a **<u>PHYSICAL</u>** device and test it. 

    If you followed the steps closely you will see the following screen after clicking your button.

    ![Apple Sign In prompt on iOS device](/social-login-assets/apple-sign-in-ios-final.png)
</Steps>

That's it! You are all set.

## Initialize Apple login

Call `initialize` with the `apple` provider before login. On iOS, `clientId` is not used by the operating system directly; the plugin uses it to know which provider to initialize.

```typescript
await SocialLogin.initialize({
  apple: {
    clientId: 'your-client-id',
  },
});

const res = await SocialLogin.login({
  provider: 'apple',
  options: {
    scopes: ['email', 'name'],
  },
});
```

## Keep going from Apple login on IOS

If you are using **Apple login on IOS** to plan authentication and account flows, connect it with [Using @capgo/capacitor-social-login](/plugins/capacitor-social-login/) for the native capability in Using @capgo/capacitor-social-login, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, and [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication.
