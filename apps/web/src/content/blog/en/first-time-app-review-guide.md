---
slug: first-time-app-review-guide
title: The Complete First-Time App Review Guide for 2026 - iOS and Android
description: A comprehensive guide for first-time app developers on passing App Store and Play Store reviews, including login requirements, privacy policies, and current Google Play testing requirements.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-10-30T00:00:00.000Z
updated_at: 2026-06-18T14:21:30.000Z
head_image: /app-review-guide.webp
head_image_alt: "The Complete First-Time App Review Guide for 2026 - iOS and Android Capgo blog illustration"
keywords: app store review, play store review, app submission, privacy policy, terms and conditions, social login, app testing, android review, ios review
tag: Development, App Store, Best Practices
published: true
locale: en
next_blog: ''
---

Submitting your first app to the App Store or Play Store can feel overwhelming. With constantly evolving guidelines and stricter enforcement in 2026, getting your app approved requires careful attention to detail. This comprehensive guide walks you through everything you need to know to pass review on your first submission for both iOS and Android platforms.

## Understanding the Review Process in 2026

Both Apple and Google have significantly tightened their review processes in recent years, with particular emphasis on privacy, security, and user experience. Understanding these changes is crucial for first-time developers.

### iOS App Store Review Timeline

- **Standard Review**: 24-48 hours
- **Peak Periods**: 3-5 days (especially during holiday seasons)
- **Weekends**: No reviews processed
- **Expedited Review**: Available for critical bug fixes (must be requested through App Store Connect)

**Pro Tip**: Submit early in the week (Monday-Tuesday) to avoid weekend delays. Monday submissions typically get reviewed by Wednesday.

### App Store Connect Statuses You'll See

- **Prepare for Submission**: Your build or metadata is still being prepared
- **Waiting for Review**: Apple has your submission in queue
- **In Review**: The review team is actively checking the app
- **Pending Developer Release**: Approved, but waiting for your manual release choice
- **Rejected / Unresolved Issues**: Apple needs changes before approval

### Google Play Store Review Timeline (2026 Update)

- **Initial Review**: 3-7 days (significantly longer than previous years)
- **Closed Testing Gate**: 14 days minimum for affected new personal Play Console accounts before you can request production access
- **Production Review After Testing**: Usually another 3-7 days after the closed testing requirement is complete
- **Updates to Existing Apps**: 1-3 days
- **Policy Violations**: Can extend to 14+ days if additional review is triggered

**Important Update**: Google now requires substantially more rigorous testing for some new Play Console accounts, which we'll cover in detail below.

## Apple Developer Account Setup

Before your first iOS release, make sure the Apple side is set up correctly:

- Enroll in the [Apple Developer Program](https://developer.apple.com/programs/enroll/)
- Turn on two-factor authentication for the Apple Account used for enrollment
- Choose the correct membership type:
  - **Individual / Sole Proprietor**: your legal personal name becomes the seller name on the App Store
  - **Organization**: requires a legal entity, a D-U-N-S number, a public website, and a person with authority to bind the company to Apple's agreements
- Use legal names during enrollment. Aliases or company names in the first/last name fields can delay approval
- After enrollment is approved, sign in to App Store Connect and create the app record with the final bundle ID, app name, SKU, and primary language

![Apple Developer Program enrollment page](/app-store-assets/apple-account/apple-developer-program.jpg)

![Continue Apple enrollment on the web](/app-store-assets/apple-account/web-enrollment.png)

![Select the right Apple Developer entity type](/app-store-assets/apple-account/entity-type.png)

**Important**: Apple changes minimum SDK requirements over time. As of **April 28, 2026**, apps uploaded to App Store Connect must use the **iOS & iPadOS 26 SDK or later**.

## The Critical Android Testing Requirement

This is the change that catches most first-time Android publishers off guard:

### 12 Tester Requirement for New Personal Android Accounts

If your Google Play developer account is a **personal account created after November 13, 2023**, you must complete a closed testing period before the app can go to production:

**Requirements**:
- **Minimum 12 Testers**: You must recruit at least 12 opted-in testers
- **14-Day Testing Period**: The app must remain in closed testing for a minimum of 14 consecutive days
- **Production Access Application**: After the testing period, you still need to apply for production access in Play Console
- **Feedback Collection**: You should document the issues found, fixes made, and how testers used the app

### How to Set Up Your Testing Track

<Steps>

1. **Create a Closed Testing Track**
   - Go to Google Play Console
   - Navigate to Test and release > Testing > Closed testing
   - Create a new release in the closed testing track
   - Upload your Android App Bundle (`.aab`)

2. **Recruit Your Testers**

   Where to find testers:
   - Friends and family (easiest starting point)
   - Developer communities (Reddit's /r/androiddev, /r/betatests)
   - Social media followers
   - Beta testing platforms (BetaList, BetaTesting.com)
   - University students (if you have connections)

   **Important**: Make sure testers:
   - Have valid Gmail accounts
   - Actually use Android devices
   - Stay opted in during the full 14-day period

3. **Invite Testers**
   - Create a tester list in Play Console
   - Add tester email addresses
   - Share the opt-in URL with your testers
   - Send reminders to ensure they install and use the app

4. **Monitor Testing Activity**
   - Check Play Console for installation numbers
   - Track crash reports and ANRs (Application Not Responding)
   - Collect feedback from testers
   - Fix any critical issues before promotion

5. **Promote to Production**
   - After 14 days with 12+ opted-in testers
   - Apply for production access from the Play Console dashboard
   - Review all crash reports and feedback
   - Create production release and submit for final review

</Steps>

### Why Google Implemented This

Google introduced this requirement to:
- Reduce low-quality app spam
- Ensure apps are properly tested before reaching users
- Identify malicious apps through real-world usage patterns
- Improve overall Play Store quality

**Reality Check**: This adds at least 2-3 weeks to your launch timeline. Plan accordingly and start recruiting testers early.

## Authentication and Login Requirements

One of the most common rejection reasons is improper implementation of authentication systems, especially social login.

### The Apple Sign-In Requirement (Critical for iOS)

**Apple's Rule**: If your app offers any third-party social login option (Google, Facebook, Twitter, etc.), you **must** also offer Sign in with Apple as an option.

**This applies to**:
- Google Sign-In
- Facebook Login
- Twitter/X Login
- LinkedIn Login
- Any other third-party authentication service

**This does NOT apply to**:
- Email/password only authentication
- Government ID systems
- Enterprise SSO systems (when the app is for that specific enterprise)
- Education provider authentication systems

### Implementing Sign in with Apple

If you're using social login, here's what you need to implement:

```typescript
import { SignInWithApple } from '@capacitor-community/apple-sign-in';

async function signInWithApple() {
  try {
    const result = await SignInWithApple.authorize({
      clientId: 'com.yourapp.service',
      redirectURI: 'https://yourapp.com/auth/callback',
      scopes: 'email name',
      state: '12345',
      nonce: 'nonce',
    });

    // result contains:
    // - identityToken
    // - authorizationCode
    // - email (may be null if user previously authorized)
    // - givenName
    // - familyName

    // Send to your backend for verification
    await verifyAppleToken(result.identityToken);

  } catch (error) {
    console.error('Apple Sign In failed:', error);
  }
}
```

**Important Considerations**:

1. **Email Privacy**: Users can choose to hide their email. Apple provides a private relay email (e.g., `abc123@privaterelay.appleid.com`). Your app must handle this.

2. **First-Time vs Returning Users**: Apple only provides user details (name, email) on the first authorization. Store this information because subsequent sign-ins won't include it.

3. **Button Design**: Apple provides strict design guidelines for the Sign in with Apple button. Use their official assets.

4. **Backend Verification**: Always verify the identity token on your backend server, never trust client-side tokens alone.

### Android Social Login Requirements

While Android doesn't require a specific provider like iOS does, Google has guidelines:

**Google Sign-In Requirements**:
- Must use official Google Sign-In SDK
- Must follow Google's branding guidelines
- Should be the primary option if you're offering it

**Best Practice for Cross-Platform**:
Offer the same login options on both platforms for consistency:
- Email/password
- Sign in with Apple (iOS only, or on Android if you support web-based Apple login)
- Sign in with Google
- Other social options (Facebook, Twitter, etc.)

### Demo Account Requirements

**Critical for Review**: If your app requires login, you **must** provide working demo credentials in the App Review Notes.

```
Demo Account Information:

Username: reviewer@demo.com
Password: ReviewTest123!

OR

Test Phone: +1 555-0123
Test OTP: 123456 (static for review)

Notes:
- This account has full premium features enabled
- All payment flows work in sandbox mode
- Account will reset daily
```

**Common Mistakes**:
- Providing expired credentials
- Demo account doesn't have access to all features
- Not mentioning how to bypass phone verification
- Forgetting to mention sandbox payment details

## Privacy Policy and Legal Requirements

Both app stores now require accessible privacy policies and terms of service **before** your first submission is approved.

### Privacy Policy Requirements

Your privacy policy must:

1. **Be Publicly Accessible**
   - Hosted on a public URL (not behind login)
   - Loadable in standard web browsers
   - Available in the same languages as your app

2. **Cover These Mandatory Topics**:
   - What data you collect (be specific)
   - How you use the collected data
   - Whether data is shared with third parties
   - How long data is retained
   - User rights (access, deletion, portability)
   - Contact information for privacy inquiries
   - Children's privacy (if app is for users under 13/16)

3. **Be Linked In-App**
   - Accessible from settings or account screen
   - Must be one tap away (not buried in menus)
   - Should open in default browser or in-app browser

### Where to Host Your Privacy Policy

**Option 1: Your Website** (Recommended)
```
https://yourapp.com/privacy-policy
https://yourapp.com/terms-of-service
```

**Option 2: GitHub Pages** (Free)
```
https://yourusername.github.io/app-privacy-policy
```

**Option 3: Privacy Policy Generators** (Quick Start)
- [Termly](https://termly.io/products/privacy-policy-generator/)
- [PrivacyPolicies.com](https://www.privacypolicies.com/)
- [FreePrivacyPolicy.com](https://www.freeprivacypolicy.com/)

**Important**: While generators are fine for starting, ensure the policy accurately reflects your actual data practices. Generic templates that don't match your app will be flagged.

### Terms and Conditions Requirements

While not always mandatory, having Terms and Conditions is highly recommended and required if:
- You offer in-app purchases or subscriptions
- You have user-generated content
- You provide any service beyond basic app functionality
- You want legal protection

**Must Include**:
- Acceptable use policy
- Account termination conditions
- Limitation of liability
- Intellectual property rights
- Dispute resolution process
- Refund policy (especially for IAP)

### In-App Implementation

```typescript
// Settings or Account Screen
function LegalLinks() {
  return (
    <div className="legal-section">
      <h3>Legal</h3>
      <a
        href="https://yourapp.com/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
      <a
        href="https://yourapp.com/terms-of-service"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>
      <a
        href="https://yourapp.com/contact"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact Us
      </a>
    </div>
  );
}
```

### App Store Metadata Requirements

Both stores require you to provide the privacy policy URL during app submission:

**iOS - App Store Connect**:
- App Information > General Information > Privacy Policy URL
- Must be HTTPS (HTTP will be rejected)
- Will be displayed on your App Store page
- Add a Support URL with real contact details for users
- Complete the age rating questionnaire before submission

**Android - Google Play Console**:
- Store presence > Store settings > Privacy Policy
- Required for all apps targeting children
- Strongly recommended for all apps

### Privacy Nutrition Labels (iOS)

iOS requires detailed privacy disclosures in "nutrition label" format:

**Categories You Must Declare**:
- **Contact Info**: Email, name, phone number
- **Financial Info**: Payment info, credit card, bank account
- **Location**: Precise or coarse location
- **User Content**: Photos, videos, audio, messages
- **Identifiers**: User ID, device ID, advertising ID
- **Usage Data**: Product interaction, advertising data, crash logs
- **Diagnostics**: Crash data, performance data

**For Each Data Type, Specify**:
- Whether it's collected
- Whether it's linked to user identity
- Whether it's used for tracking
- The purpose of collection

**Common Mistake**: Saying you don't collect data when your analytics SDK does. Audit all third-party SDKs for their data collection.

### Google Play Data Safety Section

Similar to iOS, Android requires a Data Safety declaration:

**Steps**:
1. Go to Play Console > App content > Data safety
2. Answer questions about data collection
3. Specify data types collected
4. Explain security practices (encryption, etc.)
5. Provide privacy policy link

**Critical**: This information is legally binding. Misrepresentation can result in app removal and account suspension.

## Common First-Time Rejection Reasons

Understanding why apps get rejected helps you avoid these pitfalls:

### 1. App Crashes or Doesn't Launch

**Why It Happens**:
- Testing only on emulator, not real device
- Missing error handling for network failures
- Hardcoded API endpoints that are unreachable
- Assuming specific device capabilities (camera, GPS)

**How to Prevent**:
```typescript
// Always implement proper error handling
async function loadData() {
  try {
    const response = await fetch('https://api.yourapp.com/data');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    // Show user-friendly error
    showError('Unable to load data. Please check your connection.');

    // Log for debugging
    console.error('Data load failed:', error);

    // Graceful degradation
    return getCachedData();
  }
}
```

**Testing Checklist**:
- Test on real devices (minimum 2-3 different models)
- Test with poor network (use Network Link Conditioner)
- Test with airplane mode
- Test with permissions denied
- Test with fresh install (no cached data)

### 2. Missing or Broken Core Functionality

**Why It Happens**:
- Features shown in screenshots don't exist yet
- Demo account doesn't have access to advertised features
- Premium features are shown but not implemented
- "Coming Soon" placeholders in the app

**How to Prevent**:
- Only submit when all advertised features are complete
- Make sure demo account has full access
- Remove or disable incomplete features before submission
- Update screenshots to match current build exactly

### 3. Inappropriate Content for Age Rating

**Why It Happens**:
- Age rating set to 4+ but app contains social features
- Age rating doesn't match actual content
- User-generated content without moderation
- Links to unmoderated external content

**How to Set Correct Age Rating**:

**iOS Age Ratings**:
- 4+ (no objectionable content)
- 9+ (infrequent mild content)
- 12+ (moderate content)
- 17+ (frequent/intense content)

**Android Content Ratings**:
- Everyone
- Everyone 10+
- Teen
- Mature 17+
- Adults only 18+

**Important**: If users can share content with each other, you need:
- Content moderation system
- Report/block functionality
- Clear community guidelines
- Age gating if needed

### 4. Deceptive or Misleading Metadata

**Why It Happens**:
- App name promises features that don't exist
- Screenshots from competitors or mockups
- Fake reviews or ratings manipulation
- Description contains superlatives without proof

**Examples of Problematic Metadata**:

❌ **BAD**:
- App Name: "Best Fitness Tracker - #1 App"
- Description: "The most amazing, revolutionary app ever created!"
- Screenshots: Generic stock photos

✅ **GOOD**:
- App Name: "FitTrack - Workout Logger"
- Description: "Track your workouts with customizable routines and progress charts."
- Screenshots: Actual app screens from current build

### 5. Insufficient Testing (Especially Android Closed Testing)

**Why It Happens**:
- Skipping the required 14-day testing period
- Not recruiting enough testers
- Testers don't actually use the app
- No crash monitoring during testing

**How to Prevent**:
- Start recruiting testers 3-4 weeks before planned launch
- Use Firebase Crashlytics or similar during testing
- Actively engage with testers (surveys, feedback forms)
- Fix critical issues before promoting to production

### 6. Permissions Without Justification

**Why It Happens**:
- Requesting location but not using it
- Camera permission without explanation
- Contacts access without clear purpose
- Background location for non-navigation apps

**How to Fix**:

**iOS - Info.plist**:
```xml
<key>NSCameraUsageDescription</key>
<string>Camera access is required to scan QR codes for quick login.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Location helps us show nearby fitness centers and outdoor running routes.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Photo library access lets you upload a profile picture and share workout photos.</string>
```

**Android - Permissions Strategy**:
```xml
<!-- Only request what you actually need -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Use when-in-use rather than always for location -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<!-- Avoid if possible -->
<!-- <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" /> -->
```

**Runtime Permission Request**:
```typescript
import { Camera } from '@capacitor/camera';

async function takePicture() {
  // Request with context
  const permissionStatus = await Camera.requestPermissions();

  if (permissionStatus.camera === 'granted') {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: 'uri'
    });

    return photo;
  } else {
    // Explain why permission is needed
    showDialog(
      'Camera access required',
      'To upload a profile picture, please enable camera access in Settings.'
    );
  }
}
```

## iOS-Specific Requirements

### App Store Screenshots and Previews

**Required Sizes**:
- 6.7" iPhone: 1290 x 2796
- 13" iPad: 2064 x 2752
- 12.9" iPad: 2048 x 2732

**Important**: If your app supports iPad, you must upload iPad screenshots. Do not stretch iPhone screenshots to fit iPad slots.

**Screenshot Best Practices**:
- Must show actual app content (no mockups)
- Remove status bar or show realistic content
- Localize for all supported languages
- Avoid excessive text overlay
- Show key features in first 2-3 screenshots

### App Store Connect Metadata Setup

Before submission, finish these App Store Connect fields:

- **Privacy Policy URL**: required for iOS apps
- **Support URL**: required, and should lead to actual contact information
- **Age Rating**: complete the questionnaire so the app can be published
- **App Review Information**: add a review contact, working demo credentials if login is required, and clear notes for the review team
- **Export Compliance**: answer the encryption questions, or set `ITSAppUsesNonExemptEncryption` in `Info.plist` when appropriate so you do not repeat the same answers every upload

### TestFlight Before App Review

Do one real TestFlight pass before production review:

- Install the exact build from TestFlight
- Sign in with the same review account you plan to provide
- Walk through the purchase, restore, and cancellation path
- Confirm the reviewer can reach key features without hidden setup
- Test on iPhone and iPad if both are supported

### App Preview Videos (Optional but Recommended)

**Requirements**:
- 15-30 seconds length
- Must show actual app footage
- Can include brief text overlays
- No music with copyright issues
- Same resolutions as screenshots

### Sign in with Apple Implementation

Already covered above, but critical for iOS review if you have social login.

### In-App Purchase Requirements

If you offer digital goods or services:

**Required Disclosures**:
- Clear pricing before purchase
- Subscription terms clearly stated
- Cancellation instructions visible
- Restore purchases button

**Example Compliant Subscription Screen**:
```typescript
function SubscriptionOffer() {
  return (
    <div className="subscription-screen">
      <h2>Choose Your Plan</h2>

      <PlanCard>
        <h3>Monthly</h3>
        <p className="price">$9.99/month</p>
        <ul>
          <li>Unlimited workouts</li>
          <li>Personalized plans</li>
          <li>Progress tracking</li>
        </ul>
        <button>Subscribe</button>
      </PlanCard>

      <PlanCard>
        <h3>Annual</h3>
        <p className="price">$79.99/year</p>
        <p className="savings">Save 33%</p>
        <ul>
          <li>Everything in Monthly</li>
          <li>Priority support</li>
        </ul>
        <button>Subscribe</button>
      </PlanCard>

      <div className="subscription-terms">
        <p>
          Subscription automatically renews unless cancelled at least
          24 hours before the end of the current period. Manage your
          subscription in Settings.
        </p>
        <button onClick={restorePurchases}>Restore Purchases</button>
      </div>

      <div className="legal-links">
        <a href="/privacy">Privacy Policy</a> |
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
  );
}
```

## Android-Specific Requirements

### Google Play Console Account Setup

Before your first Android release, make sure the Play Console account and app shell exist:

- Create your developer account at [Play Console signup](https://play.google.com/console/signup)
- In Play Console, go to **Home > Create app**
- Choose the default language, app/game type, and support email
- Accept the required Play policy, export, and Play App Signing declarations
- Decide whether the app is **free** or **paid**

**Important**: Google lets you change a paid app to free later, but once an app has been offered for free, it cannot be switched to paid.

### App Bundle Requirement

**Important**: Google Play requires Android App Bundle (.aab) format, not APK:

```bash
# Sync the native Android project first
bunx cap sync android

# Then build the release app bundle
cd android
./gradlew bundleRelease
```

### Target API Level Requirement

**Current Requirement**: New apps and app updates must target Android 15 (API level 35) or higher.

**Update in android/app/build.gradle**:
```kotlin
android {
    compileSdkVersion 35

    defaultConfig {
        targetSdkVersion 35
        minSdkVersion 23  // Minimum supported version
    }
}
```

### Google Play Data Safety

Already covered above, but absolutely critical for Android approval.

### Closed Testing Track (Current Requirement)

This is the big one for newly created personal developer accounts: the 12 tester, 14-day requirement detailed earlier in this guide.

**Timeline**:
1. Week 1: Recruit testers, set up closed testing
2. Week 2-3: Active testing period (14 days minimum)
3. Week 4: Fix issues, prepare production release
4. Week 5: Submit for production review

### Target Audience and Content Rating

**Content Rating Questionnaire**:
- Required for all apps
- Takes 10-15 minutes to complete
- Determines age rating (Everyone, Teen, Mature, etc.)
- Update it whenever your content changes in a way that affects the answers

**Topics Covered**:
- Violence
- Sexual content
- Profanity
- Controlled substances
- Gambling
- User interaction features

**Important**: If you have user-generated content or social features, you must disclose this and implement moderation.

### Store Listing Requirements

**Required Assets**:
- App icon (512 x 512 PNG)
- Feature graphic (1024 x 500 JPG or PNG)
- Phone screenshots (minimum 2, maximum 8)
- 7" tablet screenshots (optional but recommended)
- 10" tablet screenshots (optional but recommended)

**Description Requirements**:
- Short description (80 characters max)
- Full description (4000 characters max)
- Must accurately describe app functionality
- Cannot include contact information or pricing

## Pre-Submission Checklist

Before you hit submit, go through this comprehensive checklist:

### Technical Requirements

- [ ] App launches successfully on real devices
- [ ] All features shown in screenshots work
- [ ] No placeholder or "Coming Soon" content
- [ ] All third-party API keys are production keys
- [ ] Network error handling implemented
- [ ] Permission requests include clear explanations
- [ ] App doesn't crash under poor network conditions
- [ ] Tested with permissions denied
- [ ] Tested on minimum supported OS version
- [ ] Memory leaks checked and fixed

### Authentication & Login

- [ ] If using social login, Sign in with Apple is included (iOS)
- [ ] Demo account credentials provided in review notes
- [ ] Demo account has access to all features
- [ ] Password reset flow works
- [ ] Logout functionality works correctly
- [ ] Account deletion option available (required by GDPR/CCPA)

### Legal & Privacy

- [ ] Privacy policy publicly accessible
- [ ] Privacy policy URL added to app store listing
- [ ] Terms of service publicly accessible (if applicable)
- [ ] Privacy policy linked in-app (Settings screen)
- [ ] Privacy nutrition labels accurate (iOS)
- [ ] Data safety section completed (Android)
- [ ] All data collection purposes explained
- [ ] Third-party SDK data collection disclosed

### Content & Metadata

- [ ] App name follows guidelines (no keywords stuffing)
- [ ] Description accurately describes functionality
- [ ] Screenshots show actual current app screens
- [ ] Screenshots localized for all supported languages
- [ ] No competitor mentions in description
- [ ] No superlatives without proof
- [ ] Age rating matches actual content
- [ ] Contact email is monitored

### iOS Specific

- [ ] Sign in with Apple implemented (if using social login)
- [ ] All required screenshot sizes provided
- [ ] Real iPad screenshots uploaded if iPad support is enabled
- [ ] Info.plist permission descriptions are clear
- [ ] Support URL added with real contact details
- [ ] Privacy Policy URL added in App Store Connect
- [ ] Age rating questionnaire completed
- [ ] Export compliance answered correctly
- [ ] App Review contact and non-expiring demo account provided
- [ ] Target iOS 15.0 or higher
- [ ] If IAP: pricing clear, restore purchases button present
- [ ] No references to Android or other platforms

### Android Specific

- [ ] App Bundle (.aab) format used
- [ ] Target API 35 or higher
- [ ] Content rating questionnaire completed
- [ ] Feature graphic uploaded
- [ ] Closed testing completed if your Play Console account requires it (12 testers, 14 days)
- [ ] Crash reports from testing reviewed and fixed
- [ ] No references to iOS or other platforms

### Testing (Android Current Requirement)

- [ ] 12+ testers recruited if your Play account requires closed testing
- [ ] Closed testing track created
- [ ] 14 consecutive days of testing completed
- [ ] Testers actually used the app (not just installed)
- [ ] Crash monitoring enabled during testing
- [ ] Critical bugs from testing fixed
- [ ] Feedback from testers documented

## Review Notes: What to Include

Great review notes can mean the difference between instant approval and rejection. Here's what to include:

### Template for Review Notes

```
APP REVIEW INFORMATION

=== Test Account ===
Email: reviewer@testapp.com
Password: TestReview123!
(This account has all premium features enabled)
(This account stays active during review)

=== Review Contact ===
Name: Jane Developer
Email: review@yourapp.com
Phone: +1 555-0100

=== Testing Instructions ===
1. Launch app and tap "Sign In"
2. Enter test credentials above
3. Navigate to "Dashboard" to see main features
4. Tap "Upgrade" to test subscription flow (sandbox mode)
5. Go to Settings > Account to see privacy policy and terms

=== Key Features to Test ===
- Workout tracking (tap "New Workout" on Dashboard)
- Progress charts (Analytics tab)
- Social sharing (Share button on workout details)
- Camera upload for profile picture (Settings > Profile)

=== Third-Party Services ===
- Firebase Authentication (for login)
- Stripe (for payments - sandbox mode)
- AWS S3 (for image uploads)
- Google Maps SDK (for location features)

=== Notes ===
- Location permission is optional, app works without it
- Camera permission only requested when uploading profile picture
- All subscription flows use Apple/Google sandbox environments
- Background location is not used
- Support URL and privacy policy are available from Settings > Account

=== Contact ===
For questions: developer@yourapp.com
Response time: Within 24 hours
```

### iOS-Specific Review Notes

For iOS, also include:

```
=== Device Coverage ===
Tested on: iPhone 15 Pro Max, iPad Pro 13-inch

=== App Store Connect Metadata ===
Support URL: https://yourapp.com/support
Privacy Policy: https://yourapp.com/privacy-policy

=== Submission Notes ===
- iPad screenshots match the current iPad UI
- Export compliance answered for this build
- Sign in with Apple is available on the login screen
```

### Android-Specific Review Notes

For Android, also include:

```
=== Testing Track Information ===
Closed testing period: [Start Date] to [End Date]
Number of active testers: 23
Critical issues found during testing: 2 (both fixed)
Test distribution method: Email invite list

=== Crash Data ===
Testing period crashes: 3 total
Crash rate: 0.8%
All crashes fixed in this build

=== API Levels ===
Target SDK: 35 (Android 15)
Min SDK: 23 (Android 6.0)
Tested on: Android 11, 12, 13, 14, 15
```

## What to Do If Rejected

Don't panic - rejection is common, especially for first-time submissions. Here's how to handle it:

### Steps After Rejection

<Steps>

1. **Read the Rejection Carefully**
   - Note the specific guideline violated (e.g., 4.3, 5.1.1)
   - Read the reviewer's comments thoroughly
   - Look for screenshots if provided

2. **Understand the Issue**
   - Look up the guideline in official documentation
   - Search for similar cases online
   - Check if it's a misunderstanding or legitimate issue

3. **Fix the Root Cause**
   - Don't just patch - fix properly
   - Test the fix extensively
   - Document what you changed

4. **Respond Appropriately**

   If the rejection is correct:
   ```
   Thank you for the feedback. I have addressed the issue:

   Issue: Missing Sign in with Apple option

   Resolution: Added Sign in with Apple as a login option
   alongside Google Sign-In. The button appears on the login
   screen and follows Apple's design guidelines. You can test
   with the provided demo account or by creating a new account
   with Apple Sign-In.

   Changes made in: v1.0.1 (build 2)
   ```

   If you believe it's a misunderstanding:
   ```
   Thank you for reviewing my app. I believe there may be a
   misunderstanding regarding [specific issue]:

   [Explain clearly with screenshots if needed]

   The functionality exists at: Settings > [specific location]

   I've added additional detail to the review notes to help
   locate this feature.
   ```

5. **Resubmit Promptly**
   - Resubmissions are typically reviewed faster (24-48 hours)
   - Include updated review notes explaining the fix
   - Reference the previous submission if helpful

</Steps>

### Common Rejection Responses

**Rejection: "Your app crashes on launch"**

Response:
```
I sincerely apologize for the crash. I have identified and fixed
the issue:

Root cause: The app attempted to fetch data before network
initialization completed, causing a null reference exception.

Fix: Implemented proper async initialization with error handling
and offline mode. The app now gracefully handles network issues.

Testing: Verified on iPhone 12 (iOS 17), iPhone 14 Pro (iOS 17.1),
tested with WiFi, cellular, and airplane mode.

Build version: 1.0.2 (build 3)
```

**Rejection: "Missing privacy policy"**

Response:
```
Thank you for the feedback. I have added the privacy policy:

URL: https://myapp.com/privacy-policy
Location in app: Settings > Privacy Policy (tappable link)
Also added to: App Store Connect > App Information > Privacy Policy URL

The privacy policy covers all data collection as disclosed in the
Privacy Nutrition Labels.
```

**Rejection: "Doesn't comply with 4.2 - Minimum Functionality"**

This is trickier. It means your app doesn't do enough to warrant being an app. Response:

```
Thank you for the feedback. I'd like to clarify the app's
functionality:

Core Features:
1. [Feature 1 with specific details]
2. [Feature 2 with specific details]
3. [Feature 3 with specific details]

The app provides significant utility beyond a simple website by:
- Offline functionality for [specific feature]
- Native camera integration for [specific feature]
- Push notifications for [specific feature]
- Device hardware access for [specific feature]

Test account credentials have been provided to demonstrate all
features. Please let me know if you need additional clarification.
```

## Post-Approval Best Practices

Congratulations! Your app is approved. Here's how to maintain that status:

### Monitoring After Launch

**Critical Metrics to Watch**:
- Crash rate (keep below 1%)
- ANR rate (Android - keep below 0.5%)
- App Store/Play Store ratings
- Review content (respond to all reviews)
- User-reported bugs

**Tools to Use**:
- Firebase Crashlytics
- App Store Connect Analytics
- Google Play Console Vitals
- Sentry or similar error tracking

### Update Guidelines

When submitting updates:
- Test as thoroughly as the initial submission
- Update screenshots if UI changed significantly
- Update privacy labels if data collection changed
- Provide clear "What's New" descriptions
- Consider staged rollouts for major changes

### Staying Compliant

**Annual Requirements**:
- Renew Android content rating (required yearly)
- Update privacy policy if practices change
- Review and update age ratings if content changes
- Audit third-party SDKs for compliance

**Continuous Monitoring**:
- Stay updated on guideline changes
- Join Apple/Google developer newsletters
- Participate in developer communities
- Follow App Store/Play Store policy blogs

## Resources and Further Reading

### Official Documentation

**Apple**:
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
- [Privacy and Data Use](https://developer.apple.com/app-store/user-privacy-and-data-use/)

**Google**:
- [Developer Policy Center](https://support.google.com/googleplay/android-developer/answer/9858738)
- [Launch Checklist](https://developer.android.com/distribute/best-practices/launch/launch-checklist)
- [Data Safety Section](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Testing Guidelines](https://support.google.com/googleplay/android-developer/answer/9845334)

### Community Resources

- [r/androiddev](https://reddit.com/r/androiddev) - Android developer community
- [r/iOSProgramming](https://reddit.com/r/iOSProgramming) - iOS developer community
- [Stack Overflow](https://stackoverflow.com/) - Technical questions
- [Indie Hackers](https://www.indiehackers.com/) - Indie developer community

### Privacy Policy Tools

- [Termly Privacy Policy Generator](https://termly.io/)
- [PrivacyPolicies.com](https://www.privacypolicies.com/)
- [Free Privacy Policy](https://www.freeprivacypolicy.com/)

## Need Help with Your App Review?

If you're feeling overwhelmed or want expert guidance to ensure your app passes review on the first try, we're here to help!

**[Book a consultation call with our team](https://book.capgo.app/consulting-services/)** for personalized assistance with:
- App Store and Play Store review preparation
- Privacy policy and legal documentation review
- Sign in with Apple implementation
- Testing strategy and tester recruitment
- Review note preparation
- Rejection response and appeals
- Complete app submission process

Our team has helped hundreds of developers successfully navigate the app review process and can save you weeks of trial and error.

## Conclusion

Submitting your first app can be daunting, but with proper preparation, you can pass review on the first try. Remember these key points:

1. **Start Early**: Especially for Android - recruit those 12 testers at least 3 weeks before your planned launch
2. **Privacy First**: Have your privacy policy ready and accurately reflect your data practices
3. **Apple Sign-In**: If you use any social login, you must include Sign in with Apple on iOS
4. **Test Thoroughly**: Test on real devices, with poor networks, and with permissions denied
5. **Be Honest**: Accurate metadata and privacy disclosures prevent rejection and legal issues
6. **Detailed Review Notes**: Help reviewers understand your app quickly

The current Android testing requirements add time to the process, but they ultimately result in better apps and fewer post-launch issues. Plan for an extra 3-4 weeks for Android submissions, and you'll be well-positioned for success.

Good luck with your app launch! Remember, even if you get rejected, it's a learning opportunity. Most successful apps go through multiple rounds of review before approval.

**Don't want to go it alone?** [Schedule a consultation](https://book.capgo.app/consulting-services/) and let our experts guide you through the process.

---

*Need help with implementing live updates after your app is approved? Check out [Capgo's live update solution](/docs/getting-started/) for seamless app updates without app store review.*

## Keep going from The Complete First-Time App Review Guide for 2026 - iOS and Android

If you are using **The Complete First-Time App Review Guide for 2026 - iOS and Android** to plan security and compliance, connect it with [Encryption](/docs/live-updates/encryption/) for the implementation detail in Encryption, [Compliance](/docs/live-updates/compliance/) for the implementation detail in Compliance, [Capgo Security Scanner](/security-scanner/) for the product workflow in Capgo Security Scanner, [Capgo Security](/security/) for the product workflow in Capgo Security, and [Capgo Trust Center](/trust/) for the product workflow in Capgo Trust Center.
