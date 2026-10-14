---
slug: secure-token-storage-best-practices-for-mobile-developers
title: "Secure Token Storage: Best Practices for Mobile Developers"
description: "Store auth tokens with iOS Keychain and Android Keystore-backed encryption. Avoid deprecated EncryptedSharedPreferences; use DataStore with Tink for Android and Capacitor-friendly secure storage options."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-05-27T04:28:18.512Z
updated_at: 2026-10-14T12:00:00.000Z
head_image: /blog-images/secure-token-storage-best-practices-for-mobile-developers.webp
head_image_alt: "\"Secure Token Storage: Best Practices for Mobile Developers\" Capgo blog illustration"
keywords: token storage, mobile security, iOS Keychain, Android Keystore, DataStore, Tink, Capacitor
tag: Development, Mobile, Security
published: true
locale: en
origin: ai
next_blog: ''
faq:
  - question: "Is EncryptedSharedPreferences still recommended for Android tokens?"
    answer: "No. androidx.security.crypto EncryptedSharedPreferences, MasterKey, and MasterKeys are deprecated. Google directs new work to Android Keystore with KeyGenerator and, for structured app data, Jetpack DataStore with the datastore-tink artifact."
  - question: "Where should Capacitor apps store refresh tokens?"
    answer: "Use platform secure storage, not localStorage or @capacitor/preferences. For small secrets in Capacitor, @capgo/capacitor-native-biometric setData uses Keychain and Keystore. For larger encrypted payloads, use @capgo/capacitor-data-storage-sqlite with encryption enabled or a native module you control."
  - question: "What belongs in token lifecycle design?"
    answer: "Short-lived access tokens, refresh token rotation, HTTPS-only transport, optional certificate pinning, and server-side revocation on logout or device loss."
---

**Store authentication tokens in hardware-backed secure storage, not in WebView localStorage or plain SharedPreferences.** On iOS, use the **Keychain**. On Android, generate and hold keys in **Android Keystore** and encrypt token bytes with **Jetpack DataStore + Tink** (or an equivalent Keystore-backed AEAD layer). **`EncryptedSharedPreferences` is deprecated** in `androidx.security.crypto`; plan migrations now. For [Capacitor](https://capacitorjs.com/) apps, combine transport security (HTTPS, pinning) with native-backed storage plugins instead of duplicating crypto in JavaScript.

## Principles that apply on every platform

| Practice | Why it matters |
| --- | --- |
| Short-lived access tokens | Limits damage if a token leaks |
| Refresh token rotation | Invalidates stolen refresh tokens after legitimate use |
| HTTPS only | Stops casual network interception |
| Certificate pinning (when justified) | Reduces risk from mis-issued or custom roots; see [OWASP certificate pinning guidance](https://cheatsheetseries.owasp.org/cheatsheets/Certificate_and_Public_Key_Pinning_Cheat_Sheet.html) |
| No tokens in logs, URLs, or analytics | Tokens in observability tools become breaches |
| Revocation on logout | Server-side invalidation beats hoping the client deletes data |

[@capgo/capacitor-ssl-pinning](https://capgo.app/plugins/capacitor-ssl-pinning/) can pin TLS for Capacitor HTTP on iOS and Android when you need stricter transport controls.

## Android: Keystore and DataStore (not EncryptedSharedPreferences)

Google deprecated the `androidx.security.crypto` helpers, including [`EncryptedSharedPreferences`](https://developer.android.com/reference/androidx/security/crypto/EncryptedSharedPreferences) and [`MasterKey`](https://developer.android.com/reference/androidx/security/crypto/MasterKey). The package summary tells developers to use [`KeyGenerator` with the AndroidKeyStore provider](https://developer.android.com/reference/androidx/security/crypto/package-summary) for new key material.

### Recommended pattern

1. **Generate a symmetric key in Android Keystore** with `KeyGenerator` and `KeyProperties.PURPOSE_ENCRYPT | DECRYPT`, using GCM or another modern block mode supported by your min SDK.
2. **Encrypt token strings** with that key before they touch disk.
3. **Persist ciphertext** with **Jetpack DataStore**, using the [`androidx.datastore:datastore-tink`](https://developer.android.com/jetpack/androidx/releases/datastore) artifact and [`AeadSerializer`](https://developer.android.com/reference/kotlin/androidx/datastore/tink/AeadSerializer) so Tink AEAD wraps your serializer.

Google's DataStore release notes show wiring a Tink keyset with `AndroidKeysetManager` and a `android-keystore://` master key URI, then passing an `AeadSerializer` into `dataStore(...)`. DataStore also documents migration from legacy EncryptedSharedPreferences via `SharedPreferencesMigration` when you need a gradual cutover.

### Keystore options worth knowing

- **`setIsStrongBoxBacked(true)`** when [`FEATURE_STRONGBOX_KEYSTORE`](https://developer.android.com/reference/android/content/pm/PackageManager#FEATURE_STRONGBOX_KEYSTORE) is available for stronger key isolation.
- **User authentication** binding (`setUserAuthenticationRequired`) when tokens should unlock only after biometrics or device credential.
- **Avoid Auto Backup** for files that hold keysets or ciphertext unless you understand restore behavior; Google's EncryptedSharedPreferences docs warned about backup restoring ciphertext without keys.

Native Kotlin or Java modules in Capacitor should implement this pattern inside the plugin; JavaScript should receive only opaque handles or session state, not raw keys.

## iOS: Keychain and Secure Enclave

The **Keychain** remains the correct place for tokens on iOS. Items are encrypted and protected by the system. Use a narrowly scoped accessibility constant (for example `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` when appropriate) and **Access Control** when you need Face ID, Touch ID, or passcode gating.

[CryptoKit](https://developer.apple.com/documentation/cryptokit/) helps when you encrypt payloads yourself, but for standard OAuth-style bearer tokens, storing the token string directly in Keychain with correct accessibility is usually enough. Extra app-layer encryption only helps when you also rotate keys and manage envelopes carefully.

Capacitor's `@capacitor/preferences` writes to **UserDefaults**, which is **not** secret storage. Do not put tokens there.

## Capacitor: secure storage options in the Cap-go org

Cap-go does **not** ship a package named "secure storage," but two plugins cover common Capacitor needs:

| Plugin | Best for | Native backing |
| --- | --- | --- |
| [@capgo/capacitor-native-biometric](https://capgo.app/plugins/capacitor-native-biometric/) `setData` / `getData` | Small secrets (session tokens, API keys) | iOS Keychain, Android Keystore |
| [@capgo/capacitor-data-storage-sqlite](https://capgo.app/plugins/capacitor-data-storage-sqlite/) with encryption options | Larger or structured local data | SQLite with optional SQLCipher |

The [key-value storage guide](/blog/capacitor-key-value-storage/) compares Preferences, SQLite stores, and `NativeBiometric.setData` for secrets.

Example pattern for a refresh token string:

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

const TOKEN_KEY = 'auth.refresh_token';

export async function saveRefreshToken(token: string) {
  await NativeBiometric.setData({ key: TOKEN_KEY, value: token });
}

export async function loadRefreshToken(): Promise<string | null> {
  try {
    const { value } = await NativeBiometric.getData({ key: TOKEN_KEY });
    return value ?? null;
  } catch {
    return null;
  }
}
```

Pair storage with [@capgo/capacitor-native-biometric](https://capgo.app/plugins/capacitor-native-biometric/) authentication APIs when the token should be readable only after biometrics.

For web builds, never persist production tokens in `localStorage`. Use your backend's web session model instead.

## Token lifecycle on the server and client

- Issue **access tokens** with short TTLs (minutes, not days).
- Use **refresh token rotation** so each refresh invalidates the previous refresh token.
- On password change, logout, or device loss, **revoke** refresh tokens server-side.
- Consider a lightweight **token binding** strategy (device key attestation or app instance IDs) when your threat model requires it.

When you ship security fixes to token handling in Capacitor apps, [Capgo live updates](https://capgo.app/docs/live-updates/) can deliver eligible web-layer changes quickly if you stay within store policies. Native storage changes still require a store build.

## Storage options compared

| Method | Security | Capacitor fit |
| --- | --- | --- |
| In-memory JS variable | High while running, lost on kill | OK for access token only during session |
| `localStorage` / Preferences | Low | Settings only, never secrets |
| iOS Keychain / Android Keystore | High | Via native code or Cap-go plugins |
| DataStore + Tink (Android native) | High | Custom Capacitor plugin or native auth SDK |
| Custom crypto in JS | Variable | Avoid; keys in JS are extractable |

## Migration checklist from EncryptedSharedPreferences

1. Inventory which keys hold secrets versus public config.
2. Implement DataStore + `AeadSerializer` with a Keystore-backed Tink keyset.
3. Use `SharedPreferencesMigration` to read old encrypted prefs once, write into DataStore, then delete legacy files.
4. Ship the native change in a store release; test backup and restore on a physical device.
5. Remove `androidx.security.crypto` dependencies when nothing references them.

## FAQ

### Should I encrypt tokens before putting them in Keychain?

Usually no extra layer is required for standard bearer tokens if Keychain accessibility matches your threat model. Add envelope encryption when regulations or key rotation policies require it.

### Does SQLCipher in a Capacitor plugin replace Keystore?

SQLCipher protects the database file, but you still need a strong key in Keystore or Keychain to unlock the database. Treat encryption passphrase handling as part of your secure storage design.

### Can I store tokens in Capacitor Preferences with obfuscation?

Obfuscation is not encryption. Preferences maps to UserDefaults and SharedPreferences without hardware-backed protection.

## Keep going from Secure Token Storage: Best Practices for Mobile Developers

If you are using **Secure Token Storage: Best Practices for Mobile Developers** to plan security and compliance, connect it with [Encryption](/docs/live-updates/encryption/) for the implementation detail in Encryption, [Compliance](/docs/live-updates/compliance/) for the implementation detail in Compliance, [Capgo Security Scanner](/security-scanner/) for the product workflow in Capgo Security Scanner, [Capgo Security](/security/) for the product workflow in Capgo Security, and [Capgo Trust Center](/trust/) for the product workflow in Capgo Trust Center.
