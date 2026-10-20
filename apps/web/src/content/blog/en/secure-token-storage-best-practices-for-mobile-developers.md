---
slug: secure-token-storage-best-practices-for-mobile-developers
title: 'Secure Token Storage: Best Practices for Mobile Developers'
description: 'Secure token storage best practices for mobile developers: Keychain, Keystore-backed DataStore, refresh token rotation, and migrating off EncryptedSharedPreferences.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-27T04:28:18.512Z
updated_at: 2026-10-20T12:47:48.000Z
head_image: /blog-images/secure-token-storage-best-practices-for-mobile-developers.webp
head_image_alt: 'Secure Token Storage: Best Practices for Mobile Developers'
keywords: ''
tag: 'Mobile, Security'
published: true
locale: en
next_blog: ''
---
**Store authentication tokens in platform-backed encrypted storage, not in WebView localStorage or plain SharedPreferences.** On iOS, use the **Keychain**. On Android, protect keys with **Android Keystore** (software, TEE, or StrongBox depending on the device) and persist ciphertext with **Jetpack DataStore + Tink**. **`EncryptedSharedPreferences` is deprecated** in `androidx.security.crypto`; plan migrations now. For [Capacitor](https://capacitorjs.com/) apps, combine transport security (HTTPS, pinning) with native-backed storage plugins instead of duplicating crypto in JavaScript.

## How We Chose These Storage Patterns

Every recommendation here passes four filters. First, hardware backing: the secret material must either live in Keychain/Keystore or be encrypted with keys that do. Second, an officially supported migration path — if Google or Apple has deprecated the approach, we don't recommend it for new code. Third, Capacitor compatibility: the pattern must work from a plugin boundary without exposing raw keys to JavaScript. Fourth, revocability: a leaked credential must be invalidatable server-side.

That last filter is why refresh token rotation appears throughout this article. In our review of the 2024 incident data Chainalysis assembled, compromises involving private keys and credentials drove the majority of stolen cryptocurrency — including more than $305 million taken from Japan's DMM Bitcoin and $235 million from India's WazirX — and the common failure was sealant-grade trust in a single, continuously valid credential ([Chainalysis 2024 crime report](https://www.chainalysis.com/blog/2024-crypto-crime-mid-year-update-part-1/)). Mobile auth tokens fail the same way: a long-lived bearer token in plaintext storage is a standing invitation. We'd stop recommending any architecture that persists a non-rotating credential indefinitely.

## Principles that apply on every platform

The table below compresses into snapshots; the underlying logic is the access/refresh token split. An **access token** is short-lived — minutes, not days — and is what your API calls present. Because its blast radius is small and it dies quickly, it belongs in memory only, rebuilt on each app launch. The **refresh token** is the durable secret that lets you mint new access tokens, so it alone earns a place in persistent, hardware-backed encrypted storage. Different lifetimes justify different homes; storing both the same way is where most leaks start.

The full sequence at runtime looks like this: the app launches with no access token, calls your auth server with the persisted refresh token, receives a fresh access token in memory, and destroys the old refresh token because the server rotates it on every use. If the server ever sees an already-consumed refresh token presented again, it treats that as theft evidence and revokes the whole token family. On logout, the client wipes local storage and the server revokes the grant — deleting data locally without server revocation is hoping, not security.

| Practice | Why it matters |
|---|---|
| Short-lived access tokens | Limits damage if a token leaks |
| Refresh token rotation | Invalidates stolen refresh tokens after legitimate use |
| HTTPS only | Stops casual network interception |
| Certificate pinning (when justified) | Reduces risk from improperly issued or custom roots; see OWASP certificate pinning guidance |
| No tokens in logs, URLs, or analytics | Tokens in observability tools become breaches |
| Revocation on logout | Server-side invalidation beats hoping the client deletes data |

[@capgo/capacitor-ssl-pinning](https://capgo.app/plugins/capacitor-ssl-pinning/) can pin TLS for Capacitor HTTP on iOS and Android when you need stricter transport controls.

## Android: Keystore and DataStore (not EncryptedSharedPreferences)

Google deprecated the `androidx.security.crypto` helpers, including [`EncryptedSharedPreferences`](https://developer.android.com/reference/androidx/security/crypto/EncryptedSharedPreferences) and [`MasterKey`](https://developer.android.com/reference/androidx/security/crypto/MasterKey). The package summary tells developers to use [`KeyGenerator` with the AndroidKeyStore provider](https://developer.android.com/reference/androidx/security/crypto/package-summary) for new key material.

### Recommended pattern

Use one Tink-backed pipeline end to end:

1. Build a Tink keyset with `AndroidKeysetManager`, storing the master key in Android Keystore via an `android-keystore://` URI (see the [`datastore-tink` release notes](https://developer.android.com/jetpack/androidx/releases/datastore)).
2. Obtain an `Aead` primitive from that keyset.
3. Add `androidx.datastore:datastore-tink` (available from [DataStore 1.3.0-rc01](https://developer.android.com/jetpack/androidx/releases/datastore#1.3.0-rc01); stable 1.2.x does not ship this artifact), wrap your `Serializer` with [`AeadSerializer`](https://developer.android.com/reference/kotlin/androidx/datastore/tink/AeadSerializer), and pass it to `DataStore`. When multiple stores share one `Aead` key, give each store unique `associatedData`, such as a stable value derived from its filename.

Google documents this as the supported replacement path for deprecated `androidx.security.crypto` helpers. Do not mix a standalone JCA `SecretKey` with `AeadSerializer`; the serializer expects a Tink `Aead` instance.

A note on versioning: because the `datastore-tink` artifact only exists from 1.3.0-rc01 onward, teams pinned to stable 1.2.x releases will find the documented replacement missing from their dependency tree. That gap is several releases old now, and in our editorial view it's the main reason migration plans still stall — decide deliberately whether to ride a release candidate or wait, rather than letting it happen by accident.

### Keystore options worth knowing

- **`setIsStrongBoxBacked(true)`** when [`FEATURE_STRONGBOX_KEYSTORE`](https://developer.android.com/reference/android/content/pm/PackageManager#FEATURE_STRONGBOX_KEYSTORE) is available for stronger key isolation.
- **User authentication** binding (`setUserAuthenticationRequired`) when tokens should be accessible only after biometrics or device credential.
- **Avoid Auto Backup** for files that hold keysets or ciphertext unless you understand restore behavior; Google's EncryptedSharedPreferences docs warned about backup restoring ciphertext without keys.

Native Kotlin or Java modules in Capacitor should implement this pattern inside the plugin; JavaScript should receive only opaque handles or session state, not raw keys.

## iOS: Keychain and Secure Enclave

The **Keychain** remains the correct place for tokens on iOS. Items are encrypted and protected by the system. Use a narrowly scoped accessibility constant and **Access Control** when you need Face ID, Touch ID, or passcode gating.

The accessibility choice is a real decision, not a default to copy. Pick `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` when tokens must be usable by background work — push-triggered refreshes, background fetch — but must never migrate to a new device via backup. Pick `kSecAttrAccessibleWhenUnlockedThisDeviceOnly` for foreground-only token use, where the tighter window is worth the constraint. In both cases, enable `kSecUseDataProtectionKeychain` on modern targets so you get the data-protection Keychain rather than the legacy file-based one.

[CryptoKit](https://developer.apple.com/documentation/cryptokit/) helps when you encrypt payloads yourself, but for standard OAuth-style bearer tokens, storing the token string directly in Keychain with correct accessibility is usually enough. Secure Enclave-backed keys (a P-256 key generated with `SecureEnclave` in CryptoKit) only pay off when the key itself must never leave the secure hardware — think signing operations or device attestation. They can't hold a token string for you; they protect your own envelope key. If you're not rotating envelopes and managing that lifecycle, plain Keychain storage is simpler and no less safe. Extra app-layer encryption only helps when you also rotate keys and manage envelopes carefully.

Capacitor's `@capacitor/preferences` writes to **UserDefaults**, which is **not** secret storage. Do not put tokens there.

## Capacitor: secure storage options in the Cap-go org

Cap-go does **not** ship a package named "secure storage," but two plugins cover common Capacitor needs:

| Plugin | Best for | Native backing |
|---|---|---|
| [@capgo/capacitor-native-biometric](https://capgo.app/plugins/capacitor-native-biometric/) `setData` / `getSecureData` | Small secrets (session tokens, API keys) | iOS Keychain; Android Keystore-backed encryption in SharedPreferences |
| [@capgo/capacitor-data-storage-sqlite](https://capgo.app/plugins/capacitor-data-storage-sqlite/) with encryption options | Larger or structured local data | SQLite with optional SQLCipher |

The [key-value storage guide](https://capgo.app/blog/capacitor-key-value-storage/) compares Preferences, SQLite stores, and `NativeBiometric.setData` for secrets.

Requires `@capgo/capacitor-native-biometric` **8.6.0 or later** (match the plugin major version to your Capacitor major version). Example with biometric-gated reads:

```typescript
import {
  AccessControl,
  NativeBiometric,
} from '@capgo/capacitor-native-biometric';

const TOKEN_KEY = 'auth.refresh_token';

export async function saveRefreshToken(token: string) {
  await NativeBiometric.setData({
    key: TOKEN_KEY,
    value: token,
    accessControl: AccessControl.BIOMETRY_CURRENT_SET,
  });
}

export async function loadRefreshToken(): Promise<string | null> {
  try {
    const { value } = await NativeBiometric.getSecureData({
      key: TOKEN_KEY,
      reason: 'Unlock your session',
      title: 'Authenticate',
    });
    return value ?? null;
  } catch {
    return null;
  }
}
```

`getData` only returns values stored **without** `accessControl`. For biometric protection, always pair `BIOMETRY_CURRENT_SET` or `BIOMETRY_ANY` with `getSecureData`.

For web builds, never persist production tokens in `localStorage`. Use your backend's web session model instead.

## Token lifecycle on the server and client

Yes, mobile apps should store refresh tokens — the alternative is forcing users through re-authentication on every launch, which is worse security theater than real security. The nuance is *where* and *how*: persist only the refresh token, only in Keychain or Keystore-backed storage, and only with rotation and server-side revocation behind it.

Rotation is what makes persistence safe. Issue refresh tokens as **one-time-use** credentials: each redemption returns a new refresh token and invalidates the old one. The server keeps a short **reuse-detection window** — if a supposedly-consumed token is presented again, it treats the family as compromised and revokes the entire chain, forcing a fresh login on every device that shared it. Allow a small grace period (a few seconds to a minute) for racing requests and offline reconnects, where a legitimate client may present the old token one final time before it learns about the replacement. No grace period at all locks out users on flaky connections; too long a window stretches the attack surface.

Where each token lives follows directly from its lifetime:

- Issue **access tokens** with short TTLs (minutes, not days), and hold them **in memory only** during the session.
- Persist the **refresh token** in Keychain or Keystore-backed encrypted storage, and rotate it as above.
- On password change, logout, or device loss, **revoke** refresh tokens server-side — the client deleting local data is not revocation.
- Consider a lightweight **token binding** strategy (device key attestation or app instance IDs) when your threat model requires it.

When you ship security fixes to token handling in Capacitor apps, [Capgo live updates](https://capgo.app/docs/live-updates/) can deliver eligible web-layer changes quickly if you stay within store policies. Native storage changes still require a store build.

## Storage options compared

| Method | Security | Capacitor fit |
|---|---|---|
| In-memory JS variable | High while running, lost on kill | OK for access token only during session |
| `localStorage` / Preferences | Low | Settings only, never secrets |
| iOS Keychain / Android Keystore | High | Via native code or Cap-go plugins |
| DataStore + Tink (Android native) | High | Custom Capacitor plugin or native auth SDK |
| Custom crypto in JS | Variable | Avoid; keys in JS are extractable |

Worth noting on that last row: the failure mode of JavaScript crypto isn't weak algorithms, it's placement. Any key a JS runtime can read can be exfiltrated by whatever else is in the runtime, so "high security" is structurally unreachable from that layer no matter which library you pick.

## Migration checklist from EncryptedSharedPreferences

1. Inventory which keys hold secrets versus public config.
2. Implement DataStore + `AeadSerializer` with a Keystore-backed Tink keyset.
3. Migrate with `SharedPreferencesMigration` using a producer that opens the legacy **EncryptedSharedPreferences** instance (not plain `SharedPreferences`), then delete legacy files after a successful read.
4. Ship the native change in a store release; test backup and restore on a physical device.
5. Remove `androidx.security.crypto` dependencies when nothing references them.

## FAQ

### Should I encrypt tokens before putting them in Keychain?

Usually no extra layer is required for standard bearer tokens if Keychain accessibility matches your threat model. Add envelope encryption when regulations or key rotation policies require it.

### Does SQLCipher in a Capacitor plugin replace Keystore?

SQLCipher protects the database file, but you still need a strong key in Keystore or Keychain to decrypt the database. Treat encryption passphrase handling as part of your secure storage design.

### Can I store tokens in Capacitor Preferences with obfuscation?

Obfuscation is not encryption. Preferences maps to UserDefaults and SharedPreferences without hardware-backed protection.

### Should mobile apps store refresh tokens?

Yes — but only in Keychain or Keystore-backed encrypted storage, paired with server-side rotation and revocation. Not storing them means re-authentication on every launch, which users defeat by demanding weaker login requirements. What's never acceptable is the refresh token in Preferences, localStorage, or any plaintext file.

### What's the most secure way to store access tokens in a modern app?

Don't persist them at all. Keep the short-lived access token in memory during the session and rebuild it from the refresh token on each launch. Persist only the refresh token — in iOS Keychain or Android Keystore-backed encrypted storage — and let rotation plus revocation limit the damage if a device is ever compromised.

## Keep going from Secure Token Storage: Best Practices for Mobile Developers

If you are using **Secure Token Storage: Best Practices for Mobile Developers** to plan security and compliance, connect it with [Encryption](https://capgo.app/docs/live-updates/encryption/) for the implementation detail in Encryption, [Compliance](https://capgo.app/docs/live-updates/compliance/) for the implementation detail in Compliance, [Capgo Security Scanner](https://capgo.app/security-scanner/) for the product workflow in Capgo Security Scanner, [Capgo Security](https://capgo.app/security/) for the product workflow in Capgo Security, and [Capgo Trust Center](https://capgo.app/trust/) for the product workflow in Capgo Trust Center.
