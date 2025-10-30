---
slug: how-to-pass-app-store-review-iap
title: How to Pass App Store Review for In-App Purchases in 2025
description: Complete guide to getting your app with in-app purchases approved on iOS and Android. Learn common rejection reasons, requirements, and best practices for 2025.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-10-30T00:00:00.000Z
updated_at: 2025-10-30T04:17:55.000Z
head_image: /native-purchases/review-guides/ios-review-hero.webp
head_image_alt: App Store Review Process for In-App Purchases
keywords: app store review, in-app purchases, iOS review, Android review, subscription approval, IAP guidelines, 2025 app review
tag: Mobile, IAP, App Store, Google Play
published: true
locale: en
next_blog: ''
---

Getting your app approved on the App Store and Google Play can be challenging, especially when implementing in-app purchases (IAP) and subscriptions. With stricter guidelines in 2025, understanding what reviewers look for is crucial. This comprehensive guide covers everything you need to pass review on your first submission.

> **Need detailed setup instructions?** Check our complete guides: [iOS App Store Review](/docs/plugins/native-purchases/ios-app-store-review/) | [Android Play Store Review](/docs/plugins/native-purchases/android-play-store-review/)

## Why Apps with IAP Get Rejected

Apps with in-app purchases face higher scrutiny because they involve real money transactions. According to [Apple's App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase) and [Google Play's monetization policies](https://play.google.com/about/monetization-ads/), the top rejection reasons in 2025 are:

1. **Unclear pricing** (42% of rejections)
2. **Missing or confusing subscription terms** (31%)
3. **Deceptive UI patterns** (18%)
4. **Privacy policy violations** (9%)

Let's dive into how to avoid each of these pitfalls.

## iOS App Store Requirements

> 📖 **Comprehensive iOS Guide:** For complete setup instructions, see our [iOS App Store Review Guide](/docs/plugins/native-purchases/ios-app-store-review/)

### 1. Crystal-Clear Pricing Transparency

Apple requires exact pricing disclosure **before** the purchase button. This is non-negotiable.

**What Apple Wants to See:**
- Price clearly displayed: "$9.99/month"
- Billing frequency stated upfront
- What users get for their money
- When charges occur
- Cancellation instructions visible

![UI Design Best Practices](/native-purchases/review-guides/ui-design-dos-donts.webp)

**Common Mistake:**
Hiding price until users tap "Subscribe" or showing price only in fine print.

**Solution:**
```typescript
// Example: Compliant subscription display
<div className="subscription-card">
  <h2>Premium Plan</h2>
  <p className="price">$9.99/month</p>
  <ul>
    <li>✓ Ad-free experience</li>
    <li>✓ Unlimited cloud storage</li>
    <li>✓ Priority support</li>
  </ul>
  <p className="terms">
    Renews automatically. Cancel anytime in Settings.
  </p>
  <button>Subscribe Now</button>
</div>
```

**Price Consistency Rule:**
All prices must match across:
- App Store listing
- In-app purchase screens
- Subscription management
- Marketing materials

Even a $1 discrepancy triggers automatic rejection.

### 2. Subscription Plan Presentation

Apple flags apps that use "dark patterns" to push expensive tiers.

**Required:**
- Display all subscription tiers equally
- No pre-selected premium options
- Clear feature comparison
- Easy-to-find cheaper alternatives

**Forbidden:**
- Auto-defaulting to annual plans
- Hiding monthly options behind extra taps
- Using countdown timers to create false urgency
- Fake scarcity ("Only 3 spots left!")

### 3. Restore Purchases Functionality

Every app with IAP must provide a restore purchases button that works without requiring support contact. Learn more in our [Getting Started Guide](/docs/plugins/native-purchases/getting-started/).

**Implementation:**
```typescript
import { NativePurchases } from '@capgo/native-purchases';

async function restorePurchases() {
  try {
    const { customerInfo } = await NativePurchases.restorePurchases();

    if (customerInfo.activeSubscriptions.length > 0) {
      showSuccess('Purchases restored!');
      unlockPremiumFeatures();
    } else {
      showInfo('No previous purchases found.');
    }
  } catch (error) {
    showError('Restore failed. Please try again.');
  }
}
```

### 4. Privacy Compliance (Section 5.1.1)

2025 brings stricter privacy enforcement. Apple now requires:

**For Every Permission:**
- Clear explanation **before** requesting
- Specific use case (not generic)
- How data is stored/shared
- Whether it's optional

**Example `Info.plist` entries:**
```xml
<key>NSCameraUsageDescription</key>
<string>Camera access lets you scan product barcodes for quick upgrades. Photos are never uploaded.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Location shows relevant local content in your Premium subscription.</string>
```

**Inaccurate privacy labels are a top rejection reason in 2025.**

## Android Google Play Requirements

> 📖 **Comprehensive Android Guide:** For complete setup instructions, see our [Android Play Store Review Guide](/docs/plugins/native-purchases/android-play-store-review/)

### 1. Mandatory Google Play Billing

For digital goods (subscriptions, in-app content), you **must** use Google Play Billing. Alternative payment methods will be rejected.

**Digital Goods (Must Use Play Billing):**
- Subscriptions to features
- In-app currency
- Digital content (ebooks, music)
- Premium unlocks

**Physical Goods (Cannot Use Play Billing):**
- Real merchandise
- Physical services
- Nonprofit donations

**Implementation with native-purchases:**

For complete Android setup, see [Android Sandbox Testing](/docs/plugins/native-purchases/android-sandbox-testing/) and [Creating Subscriptions](/docs/plugins/native-purchases/android-create-subscription/).

```typescript
import { NativePurchases } from '@capgo/native-purchases';

// Automatically uses Google Play Billing on Android
await NativePurchases.configure({
  apiKey: 'your_api_key'
});

const { products } = await NativePurchases.getProducts({
  productIdentifiers: ['premium_monthly']
});
```

### 2. Transparent Auto-Renewal

Google requires clear disclosure that subscriptions auto-renew, including:
- Renewal notification before charge
- Price reminder
- Easy cancellation access

**Compliant UI:**
```typescript
<div className="subscription-terms">
  <p>Subscription renews automatically at $9.99/month</p>
  <p>Cancel anytime in Google Play Subscriptions</p>
  <p>Next billing date: February 15, 2025</p>
  <button onClick={openManagement}>
    Manage in Google Play
  </button>
</div>
```

### 3. Privacy Policy Requirements

**Mandatory for IAP apps:**
1. Privacy policy URL in Play Console
2. Privacy policy link accessible in-app
3. Accurate Data Safety section declarations

**Data Safety Must Declare:**
- Purchase history collection
- Email addresses (for receipts)
- Device IDs (fraud prevention)
- Analytics data

![App Description Guidelines](/native-purchases/review-guides/description-guidelines-1.webp)

## Common Rejection Reasons Across Both Platforms

### 1. Metadata Mismatches

**Why It Fails:**
- Screenshots show features not in current version
- Description promises functionality that doesn't exist
- Pricing differs from what's in the app

![Metadata Checklist](/native-purchases/review-guides/metadata-checklist.webp)

**Prevention:**
- Update screenshots for every submission
- Match description to actual features
- Test all claims are accurate
- Remove outdated promotional text

### 2. Misleading Marketing

**Automatic Rejection Triggers:**
- "#1 app" without proof
- "Unlimited" with hidden limits
- Fake reviews or ratings
- Competitor bashing

![Marketing Guidelines](/native-purchases/review-guides/description-guidelines-2.webp)

**Best Practice:**
Be specific and factual:
- ✓ "Join 50,000+ users"
- ✗ "Best app in the world"
- ✓ "Save up to 30% with annual plan"
- ✗ "Limited time offer!"

### 3. Broken Purchase Flows

**Test These Before Submission:**
- Products load correctly
- Purchase completes successfully
- Premium features unlock immediately
- Restore purchases works
- Error messages are user-friendly
- Network failures handled gracefully

```typescript
// Comprehensive error handling
async function handlePurchase(productId: string) {
  try {
    const { customerInfo } = await NativePurchases.purchaseProduct({
      productIdentifier: productId
    });

    if (customerInfo.entitlements.active['premium']) {
      unlockPremiumFeatures();
    }
  } catch (error: any) {
    switch (error.code) {
      case 'USER_CANCELLED':
        // Silent - user backed out
        break;
      case 'ITEM_ALREADY_OWNED':
        await NativePurchases.restorePurchases();
        break;
      case 'NETWORK_ERROR':
        showError('Check your connection and try again.');
        break;
      default:
        showError('Purchase failed. Please try again.');
    }
  }
}
```

## Pre-Submission Checklist

![Pre-Submission Checklist](/native-purchases/review-guides/pre-submission-checklist.webp)

Use this checklist before every submission. For detailed testing procedures:
- **iOS Testing:** [iOS Sandbox Testing Guide](/docs/plugins/native-purchases/ios-sandbox-testing/)
- **Android Testing:** [Android Sandbox Testing Guide](/docs/plugins/native-purchases/android-sandbox-testing/)

### Testing
- [ ] Test all subscription tiers
- [ ] Verify free trials work correctly
- [ ] Test introductory offers
- [ ] Confirm restore purchases works
- [ ] Test on multiple devices
- [ ] Verify sandbox/test accounts work

### Pricing & Terms
- [ ] Prices match across all platforms
- [ ] Subscription terms clearly stated
- [ ] Cancellation instructions visible
- [ ] Billing frequency displayed
- [ ] Free trial duration accurate

### Privacy & Permissions
- [ ] Privacy policy linked in store
- [ ] Privacy policy accessible in-app
- [ ] All permissions justified
- [ ] Info.plist descriptions clear (iOS)
- [ ] Data Safety completed (Android)

### Metadata
- [ ] Screenshots show current version
- [ ] Description matches features
- [ ] No placeholder text
- [ ] Age rating correct
- [ ] All claims are testable

### Code Quality
- [ ] No crashes on launch
- [ ] All features work as described
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] Network errors handled

## Review Timeline Expectations

![Review Timeline](/native-purchases/review-guides/review-timeline.webp)

**iOS:**
- Standard: 24-48 hours
- Peak periods: 3-5 days
- Weekends: No reviews
- Expedited: Available for critical bugs

**Android:**
- Initial: 7 days average
- Updates: Usually faster
- Rolling reviews: Can go live anytime
- Policy violations: Immediate suspension possible

**Pro Tip:** Submit iOS apps Monday-Wednesday to avoid weekend delays.

## What to Do If Rejected

![Clarification Process](/native-purchases/review-guides/clarification-process.webp)

### Step 1: Understand the Issue
- Read rejection notice carefully
- Note specific guideline cited
- Check examples provided
- Look for patterns in feedback

### Step 2: Fix Thoroughly
- Address root cause, not symptoms
- Test fix extensively
- Document all changes
- Screenshot before/after

### Step 3: Respond Professionally

![Documentation Requests](/native-purchases/review-guides/request-documents.webp)

**iOS Resolution Center:**
```
Thank you for the feedback. I have addressed the issue:

Issue: Subscription pricing not clear upfront

Fix: Added explicit pricing display on subscription screen
showing "$9.99/month" before purchase button. Also added
cancellation instructions on the same screen.

Screenshots showing changes are attached. Test account
provided in App Review Notes.
```

**Android Appeal:**
```
Subject: Policy Violation Appeal - [App Name]

I have received notification regarding [Policy X.Y].

Changes made:
1. Updated subscription UI to show all pricing upfront
2. Added clear cancellation instructions
3. Implemented restore purchases functionality

Version [X.Y.Z] addresses all concerns. Test account
credentials provided below for verification.
```

### Step 4: Resubmit Quickly
- Resubmissions are reviewed faster
- Usually within 24 hours
- Include test account
- Reference previous submission

## 2025 Updates and New Requirements

### iOS Changes
**AI Functionality Disclosure** (New)
- Must label AI-generated content
- Explain AI usage
- Document content safety

**Enhanced Subscription Clarity**
- Side-by-side plan comparisons required
- No hiding cheaper options
- Clear upgrade/downgrade paths

**Privacy Intensification**
- Section 5.1.1 enforcement increased
- More scrutiny on data justification
- Stricter children's app rules

### Android Changes
**Alternative Billing** (Regional)
- Allowed in EEA, South Korea
- Must still offer Google Play option
- Reduced service fees

**Subscription API Requirements**
- New apps must use monetization.subscriptions APIs
- Legacy billing APIs deprecated
- Better subscription management tools

## Best Practices for Success

### 1. Use Proper SDKs

The [@capgo/native-purchases](https://github.com/Cap-go/native-purchases) plugin handles both platforms correctly:

```typescript
// Single API for iOS and Android
await NativePurchases.configure({
  apiKey: 'your_api_key'
});

// Automatically uses correct billing system
const { products } = await NativePurchases.getProducts({
  productIdentifiers: ['premium_monthly']
});

// Platform-specific logic handled automatically
await NativePurchases.purchaseProduct({
  productIdentifier: 'premium_monthly'
});
```

### 2. Implement Proper Error Handling

Handle all purchase states gracefully:
- User cancellation (silent)
- Network errors (retry option)
- Already owned (restore)
- Product unavailable (inform user)
- Payment pending (check later)

### 3. Communicate Clearly

Users should always know:
- What they're buying
- How much it costs
- When they'll be charged
- How to cancel
- What happens after trial

### 4. Test Extensively

**iOS Sandbox:**
- Create test accounts in App Store Connect
- Configure on device (Settings > App Store > Sandbox)
- Note accelerated subscription durations

**Android License Testing:**
- Add test accounts in Play Console
- See "Test purchase" notification
- No real charges occur

## Resources

### Platform Documentation
- [iOS App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Developer Policies](https://play.google.com/about/developer-content-policy/)
- [iOS In-App Purchase Guidelines](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase)
- [Google Play Billing Documentation](https://developer.android.com/google/play/billing)

### Implementation Guides
- [iOS Setup Guide for native-purchases](/docs/plugins/native-purchases/ios-sandbox-testing/)
- [Android Setup Guide for native-purchases](/docs/plugins/native-purchases/android-sandbox-testing/)
- [iOS Subscription Groups](/docs/plugins/native-purchases/ios-subscription-group/)
- [Android Subscriptions](/docs/plugins/native-purchases/android-create-subscription/)

### Detailed Review Guides
- [Complete iOS App Store Review Guide](/docs/plugins/native-purchases/ios-app-store-review/)
- [Complete Android Play Store Review Guide](/docs/plugins/native-purchases/android-play-store-review/)

### Need Expert Help?

Getting stuck with app review or need hands-on assistance? Our team provides dedicated support for in-app purchase implementation and review preparation.

**[Book a consultation call with us](https://cal.com/team/capgo/capacitor-consulting-services)** to get personalized help with:
- IAP implementation review
- App Store review preparation
- Submission strategy guidance
- Rejection resolution assistance
- Complete setup and testing support

We've helped hundreds of apps pass review successfully!

## Conclusion

Passing app review with in-app purchases in 2025 requires attention to detail, clear communication, and proper implementation. The key takeaways:

1. **Transparency is mandatory** - Show pricing upfront, always
2. **Follow platform rules** - Use required billing systems
3. **Test thoroughly** - Catch issues before reviewers do
4. **Communicate clearly** - Users should never be confused
5. **Prepare documentation** - Have test accounts ready

By following this guide and using proper tools like the [native-purchases plugin](https://github.com/Cap-go/native-purchases), you'll significantly increase your chances of first-time approval.

Remember: Reviewers are looking for apps that respect users and follow guidelines. Build with that mindset, and approval will follow.

**Need help implementing in-app purchases?** Check out our [comprehensive documentation](/docs/plugins/native-purchases/) or reach out to the community for support.
