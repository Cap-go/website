---
slug: setup-supabase-with-capacitor-social-login
title: 'Setup Supabase Authentication with Capacitor Social Login Plugin'
description: >-
  Learn how to integrate Supabase authentication with the Capgo Social Login plugin for seamless Google, Apple, and Facebook authentication in your Capacitor app.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-07-27T00:00:00.000Z
updated_at: 2026-01-27T22:30:31.000Z
head_image: /supabase_social_login.webp
head_image_alt: Supabase Social Login Integration
keywords: Supabase, Capacitor, social login, authentication, Google, Apple, Facebook, mobile app development, OAuth
tag: Tutorial
published: true
locale: en
next_blog: ''
---

Setting up authentication in mobile apps can be complex, but combining **Supabase** with the **Capgo Social Login plugin** makes it straightforward. This tutorial will guide you through integrating social authentication (Google, Apple, Facebook) with Supabase in your Capacitor app.

## Why Use Supabase with Social Login?

**Supabase** provides a robust backend-as-a-service with built-in authentication, while the **@capgo/capacitor-social-login** plugin offers native social authentication across iOS, Android, and web platforms. Together, they provide:

- Seamless social authentication
- Secure token management
- Cross-platform compatibility
- Real-time database integration
- Built-in user management

## Prerequisites

Before starting, ensure you have:

- A Capacitor project set up
- A Supabase account and project
- Developer accounts for your chosen social providers (Google, Apple, Facebook)

## Step 1: Install and Configure the Social Login Plugin

First, install the Capgo Social Login plugin:

```bash
npm install @capgo/capacitor-social-login
npx cap sync
```

## Step 2: Setup Supabase Project

### Create and Configure Your Supabase Project

1. **Create a Supabase project**:
   - Go to [supabase.com](https://supabase.com/) and sign up/sign in
   - Click **"New Project"**
   - Choose your organization
   - Enter a **Project Name** (e.g., "MyApp Auth")
   - Set a **Database Password** (save this securely)
   - Select your **Region** (choose closest to your users)
   - Click **"Create new project"**

2. **Get your project credentials**:
   - Once created, go to **Settings > API**
   - Copy your **Project URL** (e.g., `https://your-project-ref.supabase.co`)
   - Copy your **anon public** API key
   - Save these for later use in your app

### Configure Authentication Settings

3. **Setup general authentication settings**:
   - Go to **Authentication > Settings**
   - Under **General settings**:
     - Set **Site URL** to your app's URL (e.g., `https://yourdomain.com` or `http://localhost:3000` for development)
     - Add additional **Redirect URLs** if needed:
       ```
       http://localhost:3000
       https://yourdomain.com
       capacitor://localhost (for mobile apps)
       ```

4. **Configure email settings** (optional but recommended):
   - Under **SMTP Settings**, configure your email provider
   - This enables email confirmations and password resets
   - For development, you can use the built-in email service

### Enable Social Authentication Providers

5. **Access the providers section**:
   - Go to **Authentication > Providers** in your Supabase dashboard
   - You'll see a list of available social providers
   - Each provider has an **Enable** toggle and configuration options

Now let's configure each social provider in detail:

## Step 3: Configure Social Providers in Supabase

### Setting up Google Authentication in Supabase

**First, get your Google OAuth credentials:**

Follow our comprehensive Google setup guide: [**Google Authentication Setup**](/docs/plugins/social-login/google/general/)

This guide covers:
- Creating a Google Cloud Project
- Setting up OAuth 2.0 credentials for web, iOS, and Android
- Configuring the consent screen
- Getting the required Client IDs and secrets

**After completing the Google setup, configure it in Supabase:**

1. **Enable Google provider in Supabase**:
   - In your Supabase dashboard, go to **Authentication > Providers**
   - Find **Google** and toggle it **ON**
   - Fill in the configuration:
     - **Client ID**: Your Google OAuth **Web** Client ID (from the Google Cloud Console)
     - **Client Secret**: Your Google OAuth **Web** Client Secret  
     - **Redirect URL**: `https://your-project-ref.supabase.co/auth/v1/callback` (auto-filled)
   - Click **"Save"**

**Important**: Use the **Web Client ID** and **Web Client Secret** in Supabase, even if you're building a mobile app. The mobile client IDs are used separately in the plugin configuration.

### Setting up Apple Authentication in Supabase

**Get Apple credentials:**

Follow our detailed Apple setup guide: [**Apple Authentication Setup**](/docs/plugins/social-login/apple/general/)

This guide covers:
- Setting up your Apple Developer account
- Creating App IDs and Service IDs
- Configuring Sign in with Apple capability
- Generating the required private keys
- Platform-specific setup for iOS, Android, and Web

**After completing the Apple setup, configure it in Supabase:**

1. **Enable Apple provider in Supabase**:
   - Go to **Authentication > Providers** and toggle **Apple** ON
   - Fill in the configuration:
     - **Client ID**: Your Service ID identifier (e.g., `com.yourapp.signin`)
     - **Client Secret**: Generate this JWT using your Apple private key (see [Supabase Apple docs](https://supabase.com/docs/guides/auth/social-login/auth-apple) for the JWT format)
     - **Redirect URL**: `https://your-project-ref.supabase.co/auth/v1/callback` (auto-filled)
   - Click **"Save"**

**Note**: Apple authentication setup is the most complex due to Apple's requirements for Service IDs, private keys, and JWT generation. Follow our documentation carefully for each platform.

### Setting up Facebook Authentication in Supabase

**Get Facebook credentials:**

Follow our complete Facebook setup guide: [**Facebook Authentication Setup**](/docs/plugins/social-login/facebook/)

This guide covers:
- Creating a Facebook Developer account and app
- Adding the Facebook Login product
- Configuring OAuth redirect URIs
- Getting your App ID, App Secret, and Client Token
- Platform-specific configuration for iOS and Android

**After completing the Facebook setup, configure it in Supabase:**

1. **Enable Facebook provider in Supabase**:
   - Go to **Authentication > Providers** and toggle **Facebook** ON
   - Fill in the configuration:
     - **Client ID**: Your Facebook App ID
     - **Client Secret**: Your Facebook App Secret
     - **Redirect URL**: `https://your-project-ref.supabase.co/auth/v1/callback` (auto-filled)
   - Click **"Save"**

**Important**: Make sure to add the Supabase callback URL (`https://your-project-ref.supabase.co/auth/v1/callback`) to your Facebook app's **Valid OAuth Redirect URIs** in the Facebook Login settings.

### Important Supabase Configuration Notes

**Row Level Security (RLS):**
- After setting up authentication, enable RLS on your tables
- Go to **Database > Tables** and toggle **Enable RLS** for each table
- Create policies to control data access based on authenticated users

**User Management:**
- View authenticated users in **Authentication > Users**
- Monitor authentication events in **Authentication > Logs**
- Set up email templates in **Authentication > Email Templates**

**Testing the Configuration:**
- Use Supabase's built-in authentication test tool
- Go to **Authentication > Users** and click **"Invite user"** to test email flows
- Check the **Logs** section for any authentication errors

## Step 4: Configure the Social Login Plugin

Now that Supabase is configured, you need to set up the Social Login plugin with the corresponding credentials. **Important**: The plugin needs the OAuth credentials from the **original providers** (not from Supabase), while Supabase handles the server-side authentication.

### How the Authentication Flow Works

Before diving into configuration, understand the flow:
1. **Plugin authenticates** with the social provider (Google/Apple/Facebook) natively
2. **Plugin receives tokens** (access token, ID token) from the provider
3. **Your app sends these tokens** to Supabase using `signInWithIdToken()`
4. **Supabase validates** the tokens with the provider and creates a user session
5. **Supabase returns** its own JWT token for your app's authenticated requests

### Google Plugin Configuration

The plugin needs your **Web Client ID** for all platforms and optionally an **iOS Client ID** for iOS-specific features:

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

await SocialLogin.initialize({
  google: {
    // Use the same Web Client ID you configured in Supabase
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    
    // Optional: iOS Client ID for iOS-specific features
    iOSClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    
    // Optional: Request offline access for refresh tokens
    mode: 'offline'
  }
});
```

**Key points for Google:**
- Use the **Web Client ID** (not Android/iOS client IDs) for the `webClientId` field
- The plugin will work on all platforms with just the Web Client ID
- The `iOSClientId` is optional and only used for iOS-specific Google features

### Apple Plugin Configuration

Apple configuration differs between iOS and Android:

**For iOS** (native Apple Sign-In):
```typescript
await SocialLogin.initialize({
  apple: {
    // No additional configuration needed for iOS
    // The plugin uses the native Apple Sign-In capability
  }
});
```

**For Android/Web** (requires Service ID):
```typescript
await SocialLogin.initialize({
  apple: {
    clientId: 'YOUR_SERVICE_ID', // The Service ID from Apple Developer Portal
    redirectUrl: 'https://your-project-ref.supabase.co/auth/v1/callback'
  }
});
```

**Key points for Apple:**
- iOS uses native Sign in with Apple (no extra config needed)
- Android/Web requires the Service ID you created in Apple Developer Portal
- The `redirectUrl` should match what you configured in both Apple Developer Portal and Supabase

### Facebook Plugin Configuration

Facebook requires your App ID and Client Token:

```typescript
await SocialLogin.initialize({
  facebook: {
    appId: 'YOUR_FACEBOOK_APP_ID',        // From Facebook Developer Dashboard
    clientToken: 'YOUR_FACEBOOK_CLIENT_TOKEN', // From Facebook Developer Dashboard
    
    // Optional: Use Facebook Limited Login (for enhanced privacy)
    limitedLogin: false // See our Facebook setup guide for important Limited Login details
  }
});
```

**Key points for Facebook:**
- Use the same App ID you configured in Supabase
- Client Token is found in your Facebook App's Basic Settings
- `limitedLogin: true` enables Facebook's privacy-focused Limited Login feature (iOS only)
- **Important**: See our [Facebook setup guide](/docs/plugins/social-login/facebook/#limited-login-ios-only) for detailed Limited Login information, including ATT considerations

### Complete Plugin Initialization

Here's how to initialize all providers together:

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

export async function initializeSocialLogin() {
  await SocialLogin.initialize({
    google: {
      webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      mode: 'offline'
    },
    facebook: {
      appId: 'YOUR_FACEBOOK_APP_ID',
      clientToken: 'YOUR_FACEBOOK_CLIENT_TOKEN',
    },
    apple: {
      // iOS: no config needed
      // Android/Web: uncomment the lines below
      // clientId: 'YOUR_SERVICE_ID',
      // redirectUrl: 'https://your-project-ref.supabase.co/auth/v1/callback'
    }
  });
}
```

**Important Notes:**
- Call `initialize()` **once** when your app starts, not before each login
- You only need to configure the providers you plan to use
- The credentials here are from the **original providers**, not from Supabase
- Make sure the provider credentials match what you configured in Supabase

## Step 5: Setup Supabase Client

Install the Supabase client:

```bash
npm install @supabase/supabase-js
```

Create a Supabase service:

```typescript
// services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-ref.supabase.co';
const supabaseKey = 'your-anon-public-key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

## Step 6: Implement Authentication Flow

Create an authentication service that combines both:

```typescript
// services/auth.ts
import { SocialLogin } from '@capgo/capacitor-social-login';
import { supabase } from './supabase';

export class AuthService {
  
  async initializeSocialLogin() {
    await SocialLogin.initialize({
      google: {
        webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      },
      facebook: {
        appId: 'YOUR_FACEBOOK_APP_ID',
        clientToken: 'YOUR_FACEBOOK_CLIENT_TOKEN',
      },
      apple: {} // iOS configuration
    });
  }

  async signInWithGoogle() {
    try {
      const result = await SocialLogin.login({
        provider: 'google',
        options: {
          scopes: ['email', 'profile']
        }
      });

      const googleResult = result.result;
      if (!googleResult) {
        throw new Error('Google login failed');
      }

      // GoogleLoginResponse is a union type - check responseType to determine flow
      if (googleResult.responseType === 'online') {
        // Online mode: use idToken directly with Supabase
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: googleResult.idToken!,
        });
        if (error) throw error;
        return data;
      } else {
        // Offline mode: exchange serverAuthCode on your backend
        // Your backend should exchange the code for tokens and create a Supabase session
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serverAuthCode: googleResult.serverAuthCode })
        });
        return response.json();
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  async signInWithApple() {
    try {
      const result = await SocialLogin.login({
        provider: 'apple',
        options: {
          scopes: ['email', 'name']
        }
      });

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: result.result?.identityToken!,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Apple sign-in error:', error);
      throw error;
    }
  }

  async signInWithFacebook() {
    try {
      const result = await SocialLogin.login({
        provider: 'facebook',
        options: {
          permissions: ['email', 'public_profile']
        }
      });

      const fbResult = result.result;
      if (!fbResult?.accessToken?.token) {
        throw new Error('Facebook login failed - no access token received');
      }

      // Facebook uses accessToken for Supabase authentication
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'facebook',
        token: fbResult.accessToken.token,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      throw error;
    }
  }

  async signOut() {
    // Sign out from Supabase
    await supabase.auth.signOut();
    
    // Optionally sign out from social providers
    await SocialLogin.logout({
      provider: 'google' // or 'apple', 'facebook'
    });
  }

  getCurrentUser() {
    return supabase.auth.getUser();
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();
```

## Step 7: Implement in Your App

Initialize the service and handle authentication:

```typescript
// main.ts or app component
import { authService } from './services/auth';

async function initializeApp() {
  await authService.initializeSocialLogin();
  
  // Listen to auth state changes
  authService.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      console.log('User signed in:', session.user);
      // Redirect to authenticated area
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
      // Redirect to login
    }
  });
}

initializeApp();
```

Create login buttons in your UI:

```typescript
// Login component
async function handleGoogleLogin() {
  try {
    const user = await authService.signInWithGoogle();
    console.log('Signed in with Google:', user);
  } catch (error) {
    console.error('Login failed:', error);
  }
}

async function handleAppleLogin() {
  try {
    const user = await authService.signInWithApple();
    console.log('Signed in with Apple:', user);
  } catch (error) {
    console.error('Login failed:', error);
  }
}

async function handleFacebookLogin() {
  try {
    const user = await authService.signInWithFacebook();
    console.log('Signed in with Facebook:', user);
  } catch (error) {
    console.error('Login failed:', error);
  }
}

async function handleLogout() {
  try {
    await authService.signOut();
    console.log('Signed out successfully');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
```

## Step 8: Platform-Specific Configuration

### iOS Configuration

For detailed iOS setup instructions, see our platform-specific guides:

- [**Google iOS Setup**](/docs/plugins/social-login/google/ios/) - URL schemes, Info.plist configuration
- [**Apple iOS Setup**](/docs/plugins/social-login/apple/ios/) - Sign in with Apple capability setup  
- [**Facebook iOS Setup** (in general Facebook guide)](/docs/plugins/social-login/facebook/) - Facebook SDK configuration

**Quick summary** - Add to `ios/App/App/Info.plist`:

```xml
<!-- Google Sign-In URL scheme -->
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>YOUR_REVERSED_CLIENT_ID</string>
    </array>
  </dict>
</array>

<!-- Apple Sign-In capability -->
<key>com.apple.developer.applesignin</key>
<array>
  <string>Default</string>
</array>
```

Follow the linked guides for complete iOS setup instructions including Xcode project configuration.

### Android Configuration

For detailed Android setup instructions, see our platform-specific guides:

- [**Google Android Setup**](/docs/plugins/social-login/google/android/) - SHA-1 fingerprints, Google Play Services configuration
- [**Apple Android Setup**](/docs/plugins/social-login/apple/android/) - Service ID configuration for Android
- [**Facebook Android Setup** (in general Facebook guide)](/docs/plugins/social-login/facebook/) - Facebook SDK integration

**Essential Android setup**:

**1. Get your SHA-1 fingerprint** (required for Google):

```bash
# For debug builds (development)
cd android
./gradlew signingReport

# Look for the SHA1 fingerprint under "Variant: debug"
# Add this SHA1 to your Google Cloud Console Android OAuth client
```

**2. Configure AndroidManifest.xml** - Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<!-- Internet permission -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Facebook configuration -->
<meta-data 
  android:name="com.facebook.sdk.ApplicationId" 
  android:value="@string/facebook_app_id"/>
<meta-data 
  android:name="com.facebook.sdk.ClientToken" 
  android:value="@string/facebook_client_token"/>
```

**3. Add Facebook resources** to `android/app/src/main/res/values/strings.xml`:

```xml
<string name="facebook_app_id">YOUR_FACEBOOK_APP_ID</string>
<string name="facebook_client_token">YOUR_FACEBOOK_CLIENT_TOKEN</string>
```

Follow the linked platform guides for complete Android configuration including Google Play Services setup and package name configuration.

## Step 9: Using Supabase Database with Authenticated Users

Once users are authenticated, you can use Supabase's database with Row Level Security (RLS):

```typescript
// Example: Fetch user profile
async function getUserProfile() {
  const { data: user } = await supabase.auth.getUser();
  
  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.user.id)
      .single();
    
    return data;
  }
}

// Example: Update user profile
async function updateUserProfile(updates: any) {
  const { data: user } = await supabase.auth.getUser();
  
  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.user.id);
    
    return data;
  }
}
```

## Important Security Considerations

1. **Never expose sensitive keys** in your client code
2. **Use environment variables** for configuration
3. **Enable Row Level Security** in Supabase
4. **Validate tokens** on your backend if needed
5. **Handle token refresh** automatically with Supabase

## Troubleshooting Common Issues

### Token Mismatch Errors
- Ensure your OAuth provider configurations match between the social login plugin and Supabase
- Check that redirect URLs are correctly configured

### Platform-Specific Issues
- iOS: Verify your bundle ID matches your Apple Developer configuration
- Android: Ensure SHA1 fingerprints are correctly added to Google Console

### Authentication Flow Interruptions
- Implement proper error handling for network issues
- Add loading states during authentication

## Conclusion

You now have a complete authentication system combining Supabase's robust backend with native social login capabilities. This setup provides:

- Secure, native social authentication
- Seamless token management
- Real-time database integration
- Cross-platform compatibility

The combination of Supabase and the Capgo Social Login plugin offers a powerful, scalable authentication solution for your Capacitor apps.

For more advanced features like **multi-factor authentication** or **custom claims**, check out the [Supabase documentation](https://supabase.com/docs/guides/auth/) and the [Social Login plugin documentation](/docs/plugins/social-login/). 
