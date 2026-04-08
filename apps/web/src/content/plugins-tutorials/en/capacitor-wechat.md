---
locale: en
---
# Using @capgo/capacitor-wechat Package

The `@capgo/capacitor-wechat` package enables WeChat SDK integration for Capacitor apps, providing authentication, content sharing, payments, and mini-program access. In this tutorial, we will guide you through the installation, configuration, and usage of this package in your Ionic Capacitor app.

## Installation

To install the `@capgo/capacitor-wechat` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-wechat
npx cap sync
```

## Prerequisites

Before using this plugin, you must:

1. Register your app on the [WeChat Open Platform](https://open.weixin.qq.com/)
2. Obtain a WeChat App ID
3. Download and integrate the official WeChat SDK for your target platforms

## iOS Setup

### 1. Configure Info.plist

Add the following to your `Info.plist` file:

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>weixin</string>
  <string>weixinULAPI</string>
</array>

<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>weixin</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>YOUR_WECHAT_APP_ID</string>
    </array>
  </dict>
</array>
```

Replace `YOUR_WECHAT_APP_ID` with your actual WeChat App ID.

### 2. Integrate WeChat SDK

Add the WeChat SDK to your Podfile or download it from the WeChat Open Platform and add it to your project.

## Android Setup

### 1. Configure AndroidManifest.xml

Add the WeChat callback activity to your `AndroidManifest.xml`:

```xml
<manifest>
  <application>
    <activity
      android:name=".wxapi.WXEntryActivity"
      android:exported="true"
      android:label="@string/app_name"
      android:launchMode="singleTask"
      android:theme="@android:style/Theme.Translucent.NoTitleBar">
      <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
      </intent-filter>
    </activity>
  </application>
</manifest>
```

### 2. Integrate WeChat SDK

Add the WeChat SDK dependency to your `build.gradle` or download it from the WeChat Open Platform.

## API Usage

### Check if WeChat is Installed

Before using any WeChat features, check if the WeChat app is installed on the device:

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

async function checkWeChatInstalled() {
  const { installed } = await CapacitorWechat.isInstalled();
  if (installed) {
    console.log('WeChat is installed');
  } else {
    console.log('WeChat is not installed');
    // Prompt user to install WeChat
  }
}
```

### WeChat Authentication

Implement WeChat OAuth login:

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

async function loginWithWeChat() {
  try {
    // Request authorization code
    const { code, state } = await CapacitorWechat.auth({
      scope: 'snsapi_userinfo', // Request user info
      state: 'random_state_string' // CSRF protection
    });

    console.log('Authorization code:', code);

    // Send code to your backend to exchange for access token
    const response = await fetch('https://your-api.com/auth/wechat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const { access_token, openid, userInfo } = await response.json();
    console.log('Logged in successfully:', userInfo);
  } catch (error) {
    console.error('WeChat login failed:', error);
  }
}
```

### Share Content to WeChat

#### Share Text

```typescript
async function shareTextToWeChat() {
  await CapacitorWechat.share({
    scene: 0, // 0 = Chat, 1 = Moments, 2 = Favorite
    type: 'text',
    text: 'Check out this awesome app built with Capacitor!'
  });
}
```

#### Share Link

```typescript
async function shareLinkToWeChat() {
  await CapacitorWechat.share({
    scene: 1, // Share to Moments
    type: 'link',
    title: 'Amazing Capacitor App',
    description: 'Build native mobile apps with web technologies',
    link: 'https://capacitorjs.com',
    thumbUrl: 'https://capacitorjs.com/assets/img/logo.png'
  });
}
```

#### Share Image

```typescript
async function shareImageToWeChat() {
  await CapacitorWechat.share({
    scene: 0, // Share to Chat
    type: 'image',
    imageUrl: 'https://example.com/image.jpg',
    thumbUrl: 'https://example.com/thumb.jpg'
  });
}
```

#### Share Music

```typescript
async function shareMusicToWeChat() {
  await CapacitorWechat.share({
    scene: 0,
    type: 'music',
    title: 'My Favorite Song',
    description: 'Listen to this amazing track',
    mediaUrl: 'https://example.com/music.mp3',
    thumbUrl: 'https://example.com/album-cover.jpg'
  });
}
```

#### Share Video

```typescript
async function shareVideoToWeChat() {
  await CapacitorWechat.share({
    scene: 0,
    type: 'video',
    title: 'Awesome Video',
    description: 'Watch this cool video',
    mediaUrl: 'https://example.com/video.mp4',
    thumbUrl: 'https://example.com/video-thumb.jpg'
  });
}
```

#### Share Mini-Program

```typescript
async function shareMiniProgramToWeChat() {
  await CapacitorWechat.share({
    scene: 0,
    type: 'miniprogram',
    title: 'Check out this Mini Program',
    description: 'Explore our WeChat Mini Program',
    miniProgramUsername: 'gh_xxxxxxxxxxxxx',
    miniProgramPath: 'pages/index/index',
    miniProgramType: 0, // 0 = Release, 1 = Test, 2 = Preview
    miniProgramWebPageUrl: 'https://example.com/fallback',
    thumbUrl: 'https://example.com/mini-program-thumb.jpg'
  });
}
```

### WeChat Pay Integration

Implement WeChat Pay for in-app purchases:

```typescript
async function payWithWeChat(orderId: string) {
  try {
    // Step 1: Get payment parameters from your backend
    const response = await fetch('https://your-api.com/payment/wechat/prepare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    });

    const paymentParams = await response.json();

    // Step 2: Invoke WeChat Pay
    await CapacitorWechat.sendPaymentRequest({
      partnerId: paymentParams.partnerId,
      prepayId: paymentParams.prepayId,
      nonceStr: paymentParams.nonceStr,
      timeStamp: paymentParams.timeStamp,
      package: paymentParams.package, // Usually 'Sign=WXPay'
      sign: paymentParams.sign
    });

    console.log('Payment successful!');

    // Step 3: Verify payment on your backend
    await verifyPaymentOnBackend(orderId);
  } catch (error) {
    console.error('Payment failed:', error);
  }
}
```

### Open WeChat Mini-Program

Launch a WeChat mini-program from your app:

```typescript
async function openWeChatMiniProgram() {
  await CapacitorWechat.openMiniProgram({
    username: 'gh_xxxxxxxxxxxxx', // Mini-program original ID
    path: 'pages/index/index', // Path in mini-program
    type: 0 // 0 = Release, 1 = Test, 2 = Preview
  });
}
```

### Choose Invoice (Business Feature)

For business apps, allow users to select invoices from WeChat:

```typescript
async function chooseWeChatInvoice() {
  try {
    // Get invoice parameters from your backend
    const params = await getInvoiceParamsFromBackend();

    const { cards } = await CapacitorWechat.chooseInvoice({
      appId: params.appId,
      signType: params.signType,
      cardSign: params.cardSign,
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr
    });

    console.log('Selected invoice cards:', cards);
  } catch (error) {
    console.error('Invoice selection failed:', error);
  }
}
```

### Get Plugin Version

Check the native plugin version:

```typescript
async function checkPluginVersion() {
  const { version } = await CapacitorWechat.getPluginVersion();
  console.log('WeChat plugin version:', version);
}
```

## Complete Example

Here's a complete example of a WeChat service class:

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

export class WeChatService {
  private isWeChatInstalled = false;

  async initialize() {
    const { installed } = await CapacitorWechat.isInstalled();
    this.isWeChatInstalled = installed;

    if (!installed) {
      console.warn('WeChat is not installed on this device');
    }

    return installed;
  }

  async login() {
    if (!this.isWeChatInstalled) {
      throw new Error('WeChat is not installed');
    }

    const { code } = await CapacitorWechat.auth({
      scope: 'snsapi_userinfo',
      state: this.generateRandomState()
    });

    // Exchange code for access token on your backend
    return this.exchangeCodeForToken(code);
  }

  async shareToChat(title: string, description: string, url: string, imageUrl: string) {
    if (!this.isWeChatInstalled) {
      throw new Error('WeChat is not installed');
    }

    await CapacitorWechat.share({
      scene: 0, // Chat
      type: 'link',
      title,
      description,
      link: url,
      thumbUrl: imageUrl
    });
  }

  async shareToMoments(title: string, description: string, url: string, imageUrl: string) {
    if (!this.isWeChatInstalled) {
      throw new Error('WeChat is not installed');
    }

    await CapacitorWechat.share({
      scene: 1, // Moments
      type: 'link',
      title,
      description,
      link: url,
      thumbUrl: imageUrl
    });
  }

  async pay(orderId: string) {
    if (!this.isWeChatInstalled) {
      throw new Error('WeChat is not installed');
    }

    const paymentParams = await this.preparePayment(orderId);
    await CapacitorWechat.sendPaymentRequest(paymentParams);
    return this.verifyPayment(orderId);
  }

  private generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private async exchangeCodeForToken(code: string) {
    // Implement your backend API call
    const response = await fetch('/api/auth/wechat', {
      method: 'POST',
      body: JSON.stringify({ code })
    });
    return response.json();
  }

  private async preparePayment(orderId: string) {
    // Implement your backend API call
    const response = await fetch('/api/payment/wechat', {
      method: 'POST',
      body: JSON.stringify({ orderId })
    });
    return response.json();
  }

  private async verifyPayment(orderId: string) {
    // Implement your backend API call
    const response = await fetch(`/api/payment/verify/${orderId}`);
    return response.json();
  }
}
```

## Best Practices

1. **Always check if WeChat is installed** before attempting to use any features
2. **Handle errors gracefully** with proper try-catch blocks
3. **Validate responses on your backend** especially for authentication and payments
4. **Use state parameter** in auth requests for CSRF protection
5. **Compress images** before sharing to reduce data usage and improve performance
6. **Test on real devices** - WeChat features don't work in simulators
7. **Keep SDK updated** - Update the WeChat SDK regularly for security and features
8. **Follow WeChat guidelines** - Adhere to WeChat's platform policies and guidelines

## Troubleshooting

### WeChat Not Opening
- Verify WeChat is installed on the device
- Check that your App ID is correctly configured
- Ensure URL schemes are properly set up in Info.plist (iOS)
- Verify WXEntryActivity is configured correctly (Android)

### Authentication Failing
- Confirm your App ID is registered on WeChat Open Platform
- Check that the app signature matches the one registered
- Verify backend is correctly exchanging the code for tokens
- Ensure redirect URLs are properly configured

### Sharing Not Working
- Verify share content meets WeChat's requirements (image size, URL format, etc.)
- Check that thumbnail images are accessible
- Ensure content complies with WeChat's content policies

### Payment Issues
- Verify merchant account is properly set up
- Check that payment parameters are correctly generated on backend
- Ensure app signature matches the registered one
- Test with small amounts first

## Conclusion

The `@capgo/capacitor-wechat` plugin provides comprehensive WeChat integration for your Capacitor app. By following this tutorial, you can implement authentication, content sharing, payments, and mini-program features to enhance your app's capabilities for Chinese markets.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/wechat/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-wechat).
