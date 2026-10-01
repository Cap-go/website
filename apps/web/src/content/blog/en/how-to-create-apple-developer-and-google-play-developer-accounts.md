---
slug: how-to-create-apple-developer-and-google-play-developer-accounts
title: "How to Create Apple and Google Play Developer Accounts"
description: "How to create Apple Developer and Google Play developer accounts in 2026: fees, D-U-N-S, individual vs organization, verification and the 12-tester rule."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /apple_appstore.webp
head_image_alt: "Apple App Store and Google Play developer account setup"
keywords: apple developer account, google play developer account, create apple developer account, google play console signup, D-U-N-S number, apple developer program cost, google play closed testing 12 testers, developer account organization vs individual
tag: App Store, Google Play, Guides
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "How much does an Apple Developer account cost?"
    answer: "The Apple Developer Program costs 99 USD per membership year, charged in local currency in most regions. Nonprofits, accredited schools and government entities can apply for a fee waiver. The separate Apple Developer Enterprise Program costs 299 USD per year and cannot publish to the App Store."
  - question: "How much does a Google Play developer account cost?"
    answer: "Google Play charges a one-time 25 USD registration fee. There is no yearly renewal. The same fee applies to personal and organization accounts."
  - question: "Do I need a D-U-N-S number as an individual?"
    answer: "No. Apple and Google only ask for a D-U-N-S number when you enroll as an organization. Individual and personal accounts are verified with your legal name, address and, in some cases, a government ID."
  - question: "Does the Google Play 12 testers for 14 days rule apply to me?"
    answer: "It applies to personal Play Console accounts created after November 13, 2023. You must run a closed test with at least 12 testers who stay opted in for 14 consecutive days before you can apply for production access. Organization accounts are not subject to this rule."
  - question: "What happens if my Apple Developer membership expires?"
    answer: "Your apps are removed from sale on the App Store, TestFlight builds stop working and you can no longer upload builds. Renewing restores your apps. Your certificates and App Store Connect data are kept."
---

To publish an app you need two paid accounts: the Apple Developer Program (99 USD per year) for the App Store and a Google Play Console account (25 USD once) for Google Play. Enroll as an individual if you are a solo developer, or as an organization if you have a registered company, which also requires a free D-U-N-S number. Start both enrollments before you write much code, because verification can take anywhere from a few hours to several weeks.

This guide covers what each account costs, which account type to pick, what documents you need, the Google Play closed testing rule for new personal accounts, and the setup you should finish right after approval so your first release is not blocked.

## Quick comparison

| | Apple Developer Program | Google Play Console |
| --- | --- | --- |
| Price | 99 USD per year (local pricing varies) | 25 USD one time |
| Account types | Individual, Organization | Personal, Organization |
| D-U-N-S number | Required for organizations (except government) | Required for organizations |
| Identity check | Legal name, address, phone; 2FA Apple Account | Legal name, address, phone, email; government ID and Android device check for many accounts |
| Typical approval | Hours to 2 days (individual), days to weeks (organization) | Hours to a few days, longer if documents are re-requested |
| Extra launch gate | None | Personal accounts after Nov 13, 2023: 12 testers for 14 days |
| Where you manage apps | App Store Connect + Apple Developer portal | Play Console |

## Individual or organization: pick once, pick carefully

This is the decision people regret most, because switching later is slow on Apple and not possible in place on Google (you create a new account and transfer apps).

**Choose individual / personal when:**

- You are a solo developer without a registered legal entity.
- You are fine with your legal name being shown as the seller on the App Store.
- You want to ship this week.

**Choose organization when:**

- The app belongs to a company, client or agency, and the store should show the company name.
- More than one person needs admin access long term.
- You want to skip Google's 12-tester closed testing requirement.
- You sell to businesses who will look at the seller name.

On Apple, an individual account shows your personal name as the seller. You can still invite team members in App Store Connect, but the Apple Developer portal roles (certificates, identifiers) are more limited than with an organization membership. Apple can convert an individual membership to an organization one through support, but it requires a D-U-N-S number and some back and forth.

On Google, an organization account publicly lists the organization name, address and contact details. A personal account shows the developer name you choose, plus contact details if you monetize.

## What is a D-U-N-S number and how to get one

A D-U-N-S number is a 9-digit identifier assigned by Dun & Bradstreet to a legal entity. Apple and Google use it to confirm that your company exists, that its legal name is correct, and that its address matches.

How to get it:

1. Check if your company already has one. Apple has a D-U-N-S lookup tool in the enrollment flow, and Dun & Bradstreet has a public search.
2. If not, request one for free. Use the lookup tool linked from Apple's enrollment page or D&B's own request form. Do not pay a third party for "expedited" service unless you really need it.
3. Make sure the legal name and address exactly match your company registration. A mismatch is the number one reason for rejected organization enrollments.
4. Wait. Apple says new numbers can take a few business days to show up in its systems, and Google warns it can take up to 30 days. Plan for two weeks.

Government entities enrolling with Apple are exempt from the D-U-N-S requirement. If D&B does not operate in your country, Google support has an alternative verification process.

## How to create an Apple Developer account

### What you need

- An Apple Account with two-factor authentication turned on. For organizations, use an account tied to a company email address, not a personal one.
- Your legal first and last name in the Apple Account. Nicknames or company names in those fields delay enrollment.
- A street address and phone number (no P.O. boxes).
- For organizations: legal entity name (no DBAs or trade names), D-U-N-S number, authority to sign contracts for the company, a work email on the company domain, and a public website on that same domain. A social profile or a parked domain page is not accepted.
- A payment card that works for the 99 USD charge in your region.

### Steps

1. Go to [developer.apple.com/programs/enroll](https://developer.apple.com/programs/enroll/) and sign in. Alternatively, install the **Apple Developer** app on an iPhone or iPad and enroll from there. In many countries the app lets you verify your identity with a photo ID scan, which is often faster.
2. Confirm your personal information and choose **Individual / Sole Proprietor**, **Company / Organization**, or **Government Organization**.
3. For organizations, enter the D-U-N-S number and legal entity details. Apple may call the contact person to confirm authority to sign. Answer the phone.
4. Review and accept the Apple Developer Program License Agreement.
5. Pay. The membership starts when Apple confirms enrollment, not when you pay.
6. Wait for the "Welcome to the Apple Developer Program" email.

### After approval: do these right away

- **Accept agreements in App Store Connect.** Go to **Business** and accept the latest agreements. If you plan paid apps or in-app purchases, complete the Paid Apps Agreement with tax forms and bank details now; it can take a few days to become active and blocks in-app purchase testing until then.
- **Declare your EU trader status.** Under the EU Digital Services Act, App Store Connect asks whether you are a trader. Traders have their address, phone and email displayed on the EU storefronts. Apps without a declared status are not available in the EU.
- **Add team members** under **Users and Access** with the smallest role that works. Developers rarely need Admin.
- **Create an App Store Connect API key** (Users and Access, Integrations) if you plan to automate uploads from CI or a cloud build service. Download the `.p8` file immediately; Apple lets you download it once.
- **Note your Team ID** from the Membership page. Xcode, signing tools and CI all ask for it.

Two dashboards are involved. The **Apple Developer portal** (developer.apple.com/account) holds certificates, identifiers, devices and provisioning profiles. **App Store Connect** (appstoreconnect.apple.com) holds app records, TestFlight, metadata, pricing, reviews and analytics. If you are new to signing, read [iOS certificates and provisioning profiles explained](/blog/ios-certificates-and-provisioning-profiles-explained/) next.

### Apple fee waivers and the Enterprise program

Nonprofits, accredited educational institutions and government entities in eligible countries can request a fee waiver during enrollment. The Apple Developer Enterprise Program (299 USD per year) is a different product for internal apps distributed to employees only. It cannot publish to the App Store and Apple approves it rarely. Most companies should use the standard program with TestFlight, Custom Apps, or Apple Business Manager instead.

## How to create a Google Play developer account

### What you need

- A Google account. For organizations, create a dedicated one (for example `android@yourcompany.com`) so the account does not belong to an employee who might leave.
- 25 USD and a card that supports it.
- Legal name and address, a contact email and phone number. Every contact detail is verified with a one-time code.
- For organizations: D-U-N-S number, organization name and address matching D&B, phone number and website.
- A government-issued ID for identity verification, which Google requests from most new accounts.
- An Android phone or tablet. Google asks many new personal accounts to verify access to a real Android device through the Play Console mobile app.

### Steps

1. Go to [play.google.com/console/signup](https://play.google.com/console/signup) and sign in.
2. Choose **Yourself** (personal) or **An organization or business**.
3. Fill in the developer name shown on Google Play, your contact details, and answer the questions about your Android experience and the apps you plan to publish.
4. Accept the Developer Distribution Agreement and pay the 25 USD fee.
5. Complete identity verification. Upload your ID when asked; the name must match the legal name you entered.
6. Verify the phone number and email with the codes Google sends.
7. If prompted, install the Play Console app on an Android device and sign in with the same account to complete device verification.

### The 12 testers for 14 days rule

If you create a **personal** account after November 13, 2023, you cannot publish straight to production. You must first:

1. Upload a build to a **closed testing** track.
2. Get at least **12 testers** to opt in.
3. Keep them opted in for **14 consecutive days**. A tester who opts out and back in restarts their own count.
4. Apply for production access from the Play Console dashboard. Google asks about your test, your app and your readiness, then reviews the request, usually in about a week.

Plan for this. It adds at least three weeks between your first Android build and your public launch. Recruit testers early: friends, a mailing list, a Google Group you add as a tester list, or your existing users. Use the period to collect real feedback, because Google asks what you learned. Our [Android beta testing guide](/blog/test-flight-android/) explains each Play testing track.

Organization accounts skip this requirement, which is one more reason to register as an organization if you have a company.

### Play App Signing and your upload key

New apps on Google Play must be published as Android App Bundles (AAB) and use **Play App Signing**. Google holds the app signing key and you sign uploads with an **upload key**. If you lose the upload key, Google can reset it after you verify ownership. If you lose an app signing key that you manage yourself outside Play, you cannot update the app.

Create your upload keystore once, back it up in two places, and store the passwords in a password manager. You can generate one with `keytool` or with the [Android keystore generator](/tools/android-keystore-generator/).

```bash
keytool -genkeypair -v \
  -keystore upload-keystore.jks \
  -alias upload \
  -keyalg RSA -keysize 2048 -validity 10000
```

### Android developer verification (outside Google Play)

Starting September 30, 2026, Android requires apps installed on certified devices in Brazil, Indonesia, Singapore and Thailand to come from verified developers with registered package names, and Google plans to expand this globally in 2027. Apps you publish through a verified Play Console account are covered; check the Play Console home page for any app that still needs registration. If you also distribute APKs outside Google Play (direct download, Huawei AppGallery, enterprise), register those package names too.

## Optional stores

- **Huawei AppGallery**: free registration with identity verification. Useful if you have users on Huawei phones without Google services. See [how to publish a Capacitor app on Huawei AppGallery](/blog/publish-capacitor-app-on-huawei-appgallery/).
- **Samsung Galaxy Store** and **Amazon Appstore**: free, smaller audiences, same APK in most cases.

## Common enrollment problems and fixes

**Apple enrollment stuck "pending" for days.** Usually a name mismatch or a D-U-N-S record that does not match. Contact Apple Developer Support from the enrollment page instead of re-applying, which can create duplicate records.

**"Your enrollment could not be completed" with no reason.** Apple sometimes declines without detail, often when an Apple Account was previously tied to a terminated membership. Use a fresh Apple Account with your legal name.

**D-U-N-S address does not match.** Update the record with Dun & Bradstreet first, wait for it to propagate, then retry.

**Google identity verification rejected.** The legal name in Play Console must match the ID exactly, including middle names if they are on the document. Edit the name in the account details and re-upload.

**Google account suspended right after creation.** Google links accounts to previously terminated ones by payment method, device and identity. Do not create a second account to get around anything; appeal through the Play Console help center.

**Payment declined.** Some prepaid and virtual cards are refused. Use a regular credit or debit card in the account holder's name.

## What to do while you wait for approval

Approval time is not wasted time. You can:

- Build the app with Capacitor and run it on simulators and your own devices. A free Apple Account can sign builds to your own iPhone for 7 days.
- Turn on Developer Mode on test devices. See [how to enable Developer Mode on iOS](/blog/enable-ios-developer-mode-ios16/) and [how to enable developer options on Android](/blog/how-to-enable-developer-options-on-android/).
- Generate your Android upload keystore.
- Write your privacy policy and prepare screenshots and copy. Our [store listing guide](/blog/how-to-prepare-app-store-and-google-play-listing/) lists every asset and character limit.
- Set up [Capgo Build](/native-build/) so you can produce signed iOS builds without a Mac once Apple approves you.

## Checklist

- [ ] Decide individual vs organization for each store
- [ ] Get a D-U-N-S number if enrolling as an organization
- [ ] Enable 2FA on the Apple Account, use legal names
- [ ] Enroll in the Apple Developer Program (99 USD per year)
- [ ] Register in Play Console (25 USD once), verify ID, phone, email, device
- [ ] Accept App Store Connect agreements, set up tax and banking if you sell anything
- [ ] Declare EU trader status
- [ ] Create an App Store Connect API key and save the `.p8`
- [ ] Create and back up the Android upload keystore
- [ ] For new personal Play accounts, recruit 12 closed testers

With both accounts approved, the next step is signing. Read [iOS certificates and provisioning profiles explained](/blog/ios-certificates-and-provisioning-profiles-explained/), then follow the end-to-end path in [how to put a web app on the App Store and Google Play](/blog/how-to-put-a-web-app-on-the-app-store/).
