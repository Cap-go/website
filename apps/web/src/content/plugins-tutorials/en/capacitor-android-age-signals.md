---
locale: en
---
# Using @capgo/capacitor-android-age-signals Package

The `@capgo/capacitor-android-age-signals` package provides access to Google Play's Age Signals API, allowing you to detect supervised accounts, verify user ages, and comply with child safety regulations in your Android app. This tutorial will guide you through installation, configuration, and usage.

**Important**: This plugin is Android-only and requires Google Play Services.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-android-age-signals
npx cap sync android
```

## Prerequisites

- Android device with Google Play Services
- Minimum Android API level 21 (Android 5.0)
- Google Play Store installed on the device
- App published on Google Play Console (for production use)

## Basic Usage

### Importing the Plugin

```typescript
import { AgeSignals, UserStatus } from '@capgo/capacitor-android-age-signals';
```

### Checking Age Signals

The plugin provides a single method to retrieve all age-related information:

```typescript
async function checkUserAge() {
  try {
    const result = await AgeSignals.checkAgeSignals();

    console.log('User Status:', result.userStatus);
    console.log('Age Range:', result.ageLower, '-', result.ageUpper);

    return result;
  } catch (error) {
    console.error('Failed to check age signals:', error);
    return null;
  }
}
```

## Understanding User Status

The API returns one of six possible user statuses:

### 1. Verified

User is 18+ and age-verified by Google:

```typescript
if (result.userStatus === UserStatus.Verified) {
  console.log('User is 18+ and verified');
  // Allow full access to mature content
  enableAllFeatures();
}
```

### 2. Supervised

User has a supervised Google Account:

```typescript
if (result.userStatus === UserStatus.Supervised) {
  console.log(`User age: ${result.ageLower}-${result.ageUpper}`);
  console.log('Install ID:', result.installId);

  // Apply age-appropriate restrictions
  if (result.ageLower < 13) {
    applyCoppaRestrictions();
  } else if (result.ageUpper < 18) {
    applyTeenRestrictions();
  }
}
```

### 3. SupervisedApprovalPending

Guardian approval is pending:

```typescript
if (result.userStatus === UserStatus.SupervisedApprovalPending) {
  console.log('Waiting for guardian approval');
  console.log('Requested on:', result.mostRecentApprovalDate);

  showPendingApprovalMessage(
    `Your guardian needs to approve this app. ` +
    `We sent the request on ${result.mostRecentApprovalDate}.`
  );
}
```

### 4. SupervisedApprovalDenied

Guardian denied app access:

```typescript
if (result.userStatus === UserStatus.SupervisedApprovalDenied) {
  console.log('Guardian denied access');

  showBlockedMessage(
    'Your guardian did not approve this app. ' +
    'Please contact them for more information.'
  );

  // Block access or show alternative content
  redirectToAlternativeContent();
}
```

### 5. Unknown

User should verify status in Play Store:

```typescript
if (result.userStatus === UserStatus.Unknown) {
  console.log('Age verification needed');

  showVerificationPrompt(
    'Please verify your age in the Google Play Store to continue.'
  );
}
```

### 6. Empty

No age signal available (default for most users):

```typescript
if (result.userStatus === UserStatus.Empty) {
  console.log('No age signal - use fallback verification');

  // Implement your own age gate
  showAgeGateDialog();
}
```

## Implementing COPPA Compliance

For users under 13, you must comply with COPPA (Children's Online Privacy Protection Act):

```typescript
async function applyCoppaCompliance() {
  const result = await AgeSignals.checkAgeSignals();

  if (result.userStatus === UserStatus.Supervised && result.ageLower < 13) {
    console.log('COPPA compliance required');

    // 1. Disable data collection
    disableAnalytics();
    disableAdvertising();
    disableCookies();

    // 2. Disable social features
    disableChatFeatures();
    disableUserProfiles();
    disableSocialSharing();

    // 3. Require verifiable parental consent
    const hasParentalConsent = await checkParentalConsent(result.installId);

    if (!hasParentalConsent) {
      await requestParentalConsent(result.installId);
      blockAccessUntilConsent();
    }

    // 4. Limit data retention
    setDataRetentionPeriod(30); // days

    // 5. Enable parental controls
    enableParentalDashboard();
  }
}
```

## Age-Appropriate Content Filtering

Adjust content based on user age:

```typescript
async function loadAgeAppropriateContent() {
  const result = await AgeSignals.checkAgeSignals();

  let contentRating: string;

  switch (result.userStatus) {
    case UserStatus.Verified:
      contentRating = 'MATURE_17+';
      break;

    case UserStatus.Supervised:
      if (result.ageUpper <= 12) {
        contentRating = 'EVERYONE';
      } else if (result.ageUpper <= 17) {
        contentRating = 'TEEN';
      } else {
        contentRating = 'MATURE_17+';
      }
      break;

    case UserStatus.SupervisedApprovalPending:
    case UserStatus.SupervisedApprovalDenied:
      // Use lower age bound for safety
      contentRating = result.ageLower < 13 ? 'EVERYONE' : 'TEEN';
      break;

    default:
      // Safe default for unknown users
      contentRating = 'TEEN';
  }

  console.log('Loading content rated:', contentRating);
  loadContent(contentRating);
}
```

## Handling Guardian Approvals

Monitor and respond to guardian approval status:

```typescript
async function handleGuardianApprovals() {
  const result = await AgeSignals.checkAgeSignals();

  switch (result.userStatus) {
    case UserStatus.SupervisedApprovalPending:
      // Show waiting screen
      showApprovalPendingUI({
        message: 'Waiting for guardian approval',
        ageRange: `${result.ageLower}-${result.ageUpper}`,
        requestedDate: result.mostRecentApprovalDate,
        installId: result.installId,
      });

      // Set up periodic check
      scheduleApprovalCheck(result.installId);
      break;

    case UserStatus.SupervisedApprovalDenied:
      // Show denied screen
      showApprovalDeniedUI({
        message: 'Your guardian did not approve this app',
        deniedDate: result.mostRecentApprovalDate,
      });

      // Log denial for analytics
      logGuardianDenial(result.installId);
      break;

    case UserStatus.Supervised:
      // Approved - check if this is a state change
      const previousStatus = loadPreviousStatus();

      if (previousStatus === 'SUPERVISED_APPROVAL_PENDING') {
        // Just got approved!
        showApprovalGrantedNotification();
        logGuardianApproval(result.installId);
      }

      // Save current status
      savePreviousStatus(result.userStatus);
      break;
  }
}
```

## Complete Age Verification Service

Here's a comprehensive service for managing age verification:

```typescript
import { AgeSignals, UserStatus } from '@capgo/capacitor-android-age-signals';

export interface AgeVerificationResult {
  isAllowed: boolean;
  userType: 'child' | 'teen' | 'adult' | 'unknown';
  restrictions: string[];
  message: string;
}

export class AgeVerificationService {
  private cachedResult: any = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 300000; // 5 minutes

  async verifyAge(): Promise<AgeVerificationResult> {
    try {
      // Check cache first
      if (this.isCacheValid()) {
        return this.processResult(this.cachedResult);
      }

      // Fetch fresh data
      const result = await AgeSignals.checkAgeSignals();

      // Update cache
      this.cachedResult = result;
      this.cacheTimestamp = Date.now();

      return this.processResult(result);
    } catch (error) {
      console.error('Age verification failed:', error);

      return {
        isAllowed: false,
        userType: 'unknown',
        restrictions: ['Verification failed'],
        message: 'Unable to verify age. Please try again.',
      };
    }
  }

  private isCacheValid(): boolean {
    if (!this.cachedResult) return false;

    const elapsed = Date.now() - this.cacheTimestamp;
    return elapsed < this.CACHE_DURATION;
  }

  private processResult(result: any): AgeVerificationResult {
    switch (result.userStatus) {
      case UserStatus.Verified:
        return {
          isAllowed: true,
          userType: 'adult',
          restrictions: [],
          message: 'Verified adult user',
        };

      case UserStatus.Supervised:
        return this.handleSupervised(result);

      case UserStatus.SupervisedApprovalPending:
        return {
          isAllowed: false,
          userType: this.getUserType(result.ageLower),
          restrictions: ['Pending guardian approval'],
          message: `Waiting for guardian approval. Requested on ${result.mostRecentApprovalDate}`,
        };

      case UserStatus.SupervisedApprovalDenied:
        return {
          isAllowed: false,
          userType: this.getUserType(result.ageLower),
          restrictions: ['Guardian denied access'],
          message: 'Your guardian did not approve this app',
        };

      case UserStatus.Unknown:
        return {
          isAllowed: false,
          userType: 'unknown',
          restrictions: ['Age verification required'],
          message: 'Please verify your age in Google Play Store',
        };

      case UserStatus.Empty:
      default:
        return {
          isAllowed: false,
          userType: 'unknown',
          restrictions: ['No age signal'],
          message: 'Age verification needed',
        };
    }
  }

  private handleSupervised(result: any): AgeVerificationResult {
    const age = result.ageLower;
    const userType = this.getUserType(age);
    const restrictions: string[] = [];

    if (age < 13) {
      restrictions.push('COPPA restrictions apply');
      restrictions.push('No data collection');
      restrictions.push('No social features');
      restrictions.push('Parental consent required');

      return {
        isAllowed: false,
        userType,
        restrictions,
        message: `User is under 13 (${result.ageLower}-${result.ageUpper})`,
      };
    } else if (age < 18) {
      restrictions.push('Age-appropriate content only');
      restrictions.push('Moderated features');

      return {
        isAllowed: true,
        userType,
        restrictions,
        message: `Teen user (${result.ageLower}-${result.ageUpper})`,
      };
    } else {
      return {
        isAllowed: true,
        userType: 'adult',
        restrictions: [],
        message: `Supervised adult (${result.ageLower}+)`,
      };
    }
  }

  private getUserType(age: number): 'child' | 'teen' | 'adult' | 'unknown' {
    if (age < 13) return 'child';
    if (age < 18) return 'teen';
    if (age >= 18) return 'adult';
    return 'unknown';
  }

  async checkRevocation(): Promise<boolean> {
    const result = await AgeSignals.checkAgeSignals();
    const storedId = localStorage.getItem('age_signals_install_id');

    if (result.installId && storedId && result.installId !== storedId) {
      console.log('App was revoked and reinstalled');
      localStorage.setItem('age_signals_install_id', result.installId);
      return true;
    }

    if (result.installId) {
      localStorage.setItem('age_signals_install_id', result.installId);
    }

    return false;
  }

  clearCache() {
    this.cachedResult = null;
    this.cacheTimestamp = 0;
  }
}
```

## Usage in Your App

### App Startup

```typescript
import { AgeVerificationService } from './services/age-verification';

const ageService = new AgeVerificationService();

async function initializeApp() {
  const verification = await ageService.verifyAge();

  if (!verification.isAllowed) {
    showBlockedScreen(verification.message);
    return;
  }

  // Apply restrictions based on user type
  if (verification.userType === 'teen') {
    applyTeenRestrictions(verification.restrictions);
  } else if (verification.userType === 'child') {
    applyCoppaRestrictions();
    return; // Block access until parental consent
  }

  // Continue app initialization
  loadMainContent();
}
```

### Feature Gating

```typescript
async function canAccessFeature(feature: string): Promise<boolean> {
  const verification = await ageService.verifyAge();

  const ageGates = {
    chat: 13,
    socialSharing: 13,
    matureContent: 18,
    gambling: 18,
    dating: 18,
  };

  if (!verification.isAllowed) {
    return false;
  }

  const requiredAge = ageGates[feature] || 0;

  if (verification.userType === 'adult') {
    return true;
  }

  if (verification.userType === 'teen') {
    return requiredAge < 18;
  }

  if (verification.userType === 'child') {
    return requiredAge === 0;
  }

  return false;
}
```

## Best Practices

1. **Cache Results**: Age signals don't change frequently, cache for 5-10 minutes

2. **Handle All States**: Implement logic for all UserStatus values

3. **Respect Denials**: Never bypass guardian denial status

4. **Store Install ID**: Track install IDs to detect revocations

5. **Fallback Logic**: Have alternative verification for Unknown/Empty states

6. **Privacy First**: Minimize data collection for supervised users

7. **Test Thoroughly**: Test with different age ranges and approval states

## Compliance Checklist

### COPPA (Under 13)

- [ ] Obtain verifiable parental consent
- [ ] Disable data collection and tracking
- [ ] Disable behavioral advertising
- [ ] Limit data sharing with third parties
- [ ] Provide parental access to data
- [ ] Implement secure deletion of data

### GDPR (EU Users)

- [ ] Obtain lawful consent from guardian
- [ ] Provide clear privacy notices
- [ ] Enable data access and portability
- [ ] Implement right to erasure
- [ ] Design with privacy by default

### General Best Practices

- [ ] Regular compliance audits
- [ ] Clear terms of service
- [ ] Transparent data practices
- [ ] User-friendly parental controls
- [ ] Regular security assessments

## Troubleshooting

### Empty Status Returned

**Causes:**
- User outside supported regions
- Device without Google Play Services
- User hasn't set up Family Link
- New account without verification

**Solution:**
```typescript
if (result.userStatus === UserStatus.Empty) {
  // Implement alternative age verification
  showManualAgeGate();
}
```

### Unknown Status

**User should:**
1. Open Google Play Store
2. Go to Settings → Family
3. Complete age verification

**In your app:**
```typescript
if (result.userStatus === UserStatus.Unknown) {
  showInstructions(
    '1. Open Google Play Store\n' +
    '2. Go to Settings → Family\n' +
    '3. Complete age verification\n' +
    '4. Return to this app'
  );
}
```

### API Errors

**Common errors:**
- Google Play Services not available
- Network connectivity issues
- API temporarily unavailable

**Handling:**
```typescript
try {
  const result = await AgeSignals.checkAgeSignals();
} catch (error) {
  if (error.message.includes('Play Services')) {
    showPlayServicesError();
  } else if (error.message.includes('network')) {
    showNetworkError();
  } else {
    showGenericError();
  }
}
```

## Conclusion

The `@capgo/capacitor-android-age-signals` plugin provides essential age verification capabilities for Android apps, helping you comply with child safety regulations while providing age-appropriate experiences. By properly implementing age signals, you can protect young users and meet regulatory requirements.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/age-signals/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-android-age-signals).
