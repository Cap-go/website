---
slug: secure-token-storage-best-practices-for-mobile-developers
title: "Secure Token Storage: Best Practices for Mobile Developers"
description: Learn best practices for securely storing authentication tokens in mobile apps to protect user data from breaches and attacks.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-05-27T04:28:18.512Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/683504c5d3b966198183bfc0-1748326956628.jpg
head_image_alt: Mobile Development
keywords: token storage, mobile security, iOS Keychain, Android Keystore, secure communication, encryption
tag: Development, Mobile, Security
published: true
locale: en
next_blog: ''
---

Storing authentication tokens securely is critical to mobile app security. Tokens are the keys to user accounts, sensitive data, and services. If compromised, they can lead to **identity theft, financial fraud, and data breaches**. Here's how to protect them:

### Key Takeaways:

-   **Use Platform-Native Secure Storage**: Store tokens in iOS Keychain or Android Keystore for hardware-backed security.
-   **[Encrypt Tokens at Rest](https://capgo.app/docs/cli/migrations/encryption/)**: Use tools like `EncryptedSharedPreferences` (Android) or `CryptoKit` (iOS) for secure encryption.
-   **Limit Token Exposure**: Use short-lived tokens and refresh token rotation to reduce risk.
-   **Secure Communication**: Always use HTTPS and implement certificate pinning to prevent interception.
-   **Manage Token Lifecycles**: Regularly expire, refresh, and revoke tokens to minimize damage from theft.

### Quick Comparison of Storage Methods:

| Storage Method | Security Level | Usability | Best Use Case |
| --- | --- | --- | --- |
| **[In-Memory Storage](https://capgo.app/plugins/capacitor-data-storage-sqlite/)** | High | Low | Short sessions, high-security needs |
| **[Local Storage](https://capgo.app/plugins/capacitor-data-storage-sqlite/)** | Low | High | Non-sensitive data |
| **Secure Cookies** | High | Medium | Web apps with server-side controls |
| **iOS Keychain** | Very High | Medium | iOS apps storing sensitive tokens |
| **Android Keystore** | Very High | Medium | Android apps requiring secure storage |
| **[Custom Encryption](https://capgo.app/docs/cli/migrations/encryption/)** | Variable | Medium | Specialized security requirements |

Start by auditing your app's current token storage methods and implement these best practices to protect your users and your brand.

## Faux Disk Encryption Realities of Secure Storage on Mobile Devices - Daniel Mayer & Drew Suarez

<iframe src="https://www.youtube.com/embed/rJbDRvfqc1I" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Basic Rules for Secure Token Storage

Protecting tokens requires a layered approach to security. By combining multiple safeguards, you ensure that if one measure fails, others still protect sensitive data. For Capacitor apps, following these practices is essential for maintaining token security across platforms.

### Use HTTPS and Certificate Pinning

HTTPS encryption is your first defense against token interception. Every interaction between your app and the server must use HTTPS to encrypt data in transit, preventing exposure to attackers.

To strengthen this further, implement **certificate pinning**. This technique ensures your app communicates only with your trusted server, even if someone attempts to use a counterfeit certificate. By hardcoding your server's certificate or public key into the app, you establish a direct trust relationship between the app and the server.

> "You should pin anytime you want to be relatively certain of the remote host's identity or when operating in a hostile environment. Since one or both are almost always true, you should probably pin all the time." – OWASP pinning cheat sheet [\[5\]](https://www.netguru.com/blog/certificate-pinning-in-ios)

A real-world example: Twitter introduced certificate pinning in its mobile apps after experiencing Man-in-the-Middle (MitM) attacks. Their team embedded the server's SSL certificate public key directly into the app. When users connected, the app verified the certificate against the pinned one. If there was no match, the connection was terminated immediately. This approach significantly reduced MitM attacks and boosted user confidence in the platform [\[5\]](https://www.netguru.com/blog/certificate-pinning-in-ios).

You can choose between **certificate pinning** (validating the entire certificate) for maximum security or **public key pinning** (validating only the public key) for greater flexibility during certificate renewals. Tools like [OkHttp](https://square.github.io/okhttp/) for Android and [Alamofire](https://github.com/Alamofire/Alamofire) for iOS simplify implementing these techniques [\[5\]](https://www.netguru.com/blog/certificate-pinning-in-ios).

Once secure transmission is in place, the next step is to minimize token exposure.

### Limit Token Exposure

Reducing token exposure involves limiting both the scope and lifespan of tokens. The idea is simple: the less time a token is valid and the fewer permissions it has, the lower the risk if it's compromised.

-   Use **short-lived access tokens** with expiration times measured in minutes. Pair them with refresh tokens to maintain user sessions without keeping long-lasting access tokens on the device. This approach ensures stolen tokens quickly become useless.
-   Apply the **principle of least privilege**. For example, if a token is only needed to read user profile data, don't grant it permissions to modify account settings or access payment details.
-   Enable **refresh token rotation**, where a new refresh token is issued each time it's used to request a new access token. If a refresh token is stolen, it becomes invalid after the legitimate app uses it, reducing the risk window [\[4\]](https://workos.com/blog/secure-jwt-storage).

By limiting token exposure, you reduce the chances of significant damage from a breach. Next, encryption ensures tokens remain secure even if a device is physically compromised.

### Encrypt Tokens at Rest

[Encryption at rest](https://capgo.app/docs/cli/migrations/encryption/) safeguards tokens stored on the device. Even if a device is lost, stolen, or compromised by malware, encryption ensures that tokens remain unreadable.

Modern mobile operating systems provide secure, hardware-backed storage options that are far more reliable than standard methods like SharedPreferences on Android or NSUserDefaults on iOS [\[4\]](https://workos.com/blog/secure-jwt-storage).

-   **For Android**: Use `EncryptedSharedPreferences` (available on Android 10 and later). This tool handles encryption and key management automatically, simplifying implementation while enhancing security. For example, the `SecureJWTStorage` class can securely store and retrieve JWTs using `EncryptedSharedPreferences` without requiring complex custom encryption code.
-   **For iOS**: The Keychain offers hardware-level encryption for secure token storage. Developers can use a `KeychainHelper` class to manage JWT tokens or add an extra layer of security by encrypting tokens with [CryptoKit](https://developer.apple.com/documentation/cryptokit/) before storing them in the Keychain [\[4\]](https://workos.com/blog/secure-jwt-storage).

Both Android and iOS leverage hardware-backed encryption, such as the Secure Enclave on iOS and the Hardware Security Module on Android. These components store encryption keys in tamper-resistant hardware, isolated from the main operating system.

Finally, establish clear data retention policies. Automatically remove expired tokens and securely delete sensitive data from the device when it's no longer needed. These practices ensure tokens are only stored for as long as absolutely necessary [\[6\]](https://approov.io/blog/mobile-app-security-best-practices).

## Platform-Specific Token Storage Methods

Each mobile platform provides its own tools for securing tokens, tailored to meet both security and user experience needs. These native options build on core practices like HTTPS, encryption, and limiting exposure, which were discussed earlier.

### Android: Keystore and [EncryptedSharedPreferences](https://developer.android.com/reference/androidx/security/crypto/EncryptedSharedPreferences)

![EncryptedSharedPreferences](https://assets.seobotai.com/capgo.app/683504c5d3b966198183bfc0/3d7bb4094014eecd42576ecc9be1e082.jpg)

Android devices offer robust token protection through the **Keystore system** and **EncryptedSharedPreferences**. The Keystore securely stores cryptographic keys in a protected environment, making them difficult to extract and ensuring they remain non-exportable. This means the keys can only be used for secure operations. Additionally, you can add restrictions like requiring user authentication. For devices running Android 9 (API level 28) or later, **[StrongBox KeyMint](https://developer.android.com/privacy-and-security/keystore)** provides even greater isolation compared to the standard Trusted Execution Environment (TEE). To check if StrongBox is available, use `FEATURE_STRONGBOX_KEYSTORE`, and enable it with `KeyGenParameterSpec.Builder.setIsStrongBoxBacked()`.

EncryptedSharedPreferences offers a simpler way to securely store key–value pairs. It encrypts data and securely manages keys, supporting API levels 23 and above. Arun, an Android Engineer, highlights its ease of use:

> "With just a few lines of code, we can **significantly improve security** by using `EncryptedSharedPreferences`. It's a powerful and easy-to-use solution for securing sensitive data in Android apps."

For best practices, implement error handling, rotate keys every 90–180 days, and avoid storing highly sensitive data (like credit card numbers) in SharedPreferences. Such data should be processed on secure backends instead.

### iOS: Keychain and [Secure Enclave](https://developer.apple.com/documentation/cryptokit/secureenclave)

On iOS, token security relies on the **Keychain** and **Secure Enclave**. The Keychain is a secure repository for sensitive data, such as passwords and tokens, using AES-256-GCM encryption. It employs a dual-key system: one key for metadata and a unique key for each stored item. Metadata keys are protected by the Secure Enclave, which caches them for faster lookups, while secret keys require a round trip to the enclave for added security. The Keychain also supports secure sharing of items among apps from the same developer, managed by the `securityd` daemon.

The Secure Enclave enhances protection with P256 keys and about 4 MB of secure storage. You can further strengthen security by configuring Access Control Lists (ACLs) to require Face ID, Touch ID, or passcode authentication using settings like `kSecAttrAccessibleWhenUnlocked`. For even stricter security, the `.whenPasscodeSetThisDeviceOnly` option ensures data stays tied to the device, reducing the risk of unauthorized access. Be sure to handle edge cases like biometric lockouts or device resets, and regularly audit app entitlements and permissions.

### [Capacitor](https://capacitorjs.com/): Secure Storage Plugin

![Capacitor](https://assets.seobotai.com/capgo.app/683504c5d3b966198183bfc0/7e137b9b90adb3934b29b03381f213c1.jpg)

For cross-platform apps, Capacitor offers a **Secure Storage plugin** that simplifies token security without requiring platform-specific code. On iOS, the plugin stores data in the encrypted system Keychain, while on Android, it encrypts data using AES in GCM mode with a key generated by the Android Keystore before saving it in SharedPreferences. For web environments, the plugin uses unencrypted `localStorage` - but only for debugging purposes.

In February 2025, martinkasa updated the capacitor-secure-storage-plugin to support Capacitor v7, ensuring secure storage of string values across iOS and Android. These plugins are ideal for storing login credentials and JSON data. However, they may lack the granular control offered by native solutions. For enterprise-level apps with advanced security needs, native options like iOS Keychain Services and Android Keystore APIs - or enhanced tools like [Ionic](https://ionic.io/)'s Identity Vault - might be better suited. Capacitor's official documentation also advises using native secure storage for sensitive data, such as encryption keys or session tokens.

When deploying live updates for Capacitor apps, services like **[Capgo](https://capgo.app/)** can further bolster token security. Capgo's end-to-end encryption ensures that updates - including those containing security patches or token management improvements - are delivered securely, maintaining the integrity of your app's security framework.

## Managing Token Lifecycle and Security

Managing tokens effectively involves overseeing their creation, expiration, and revocation. Developers need to design systems that strike a balance between strong security measures and a seamless user experience. Below, we dive into strategies for token expiration, revocation, and secure over-the-air (OTA) updates to help you build a comprehensive token management approach.

### Token Expiration and Refresh Methods

Using short-lived access tokens alongside longer-lasting refresh tokens is a key practice for secure token handling. Access tokens should expire within 5–15 minutes to reduce the risk of misuse if compromised. On the other hand, refresh tokens can remain valid for days or weeks, allowing users to maintain their sessions without frequent re-authentication.

Token expiration plays a critical role in keeping APIs secure and efficient [\[7\]](https://zuplo.com/blog/2025/03/01/token-expiry-best-practices). Pairing this with token rotation - where previously issued tokens are invalidated - adds an extra layer of protection. This method minimizes the damage caused by a compromised refresh token and can also help identify suspicious activity, like the reuse of an old token.

When designing refresh mechanisms, ensure tokens are rigorously validated during the refresh process. Employ rate limiting to guard against brute force attacks and use automated monitoring to detect anomalies, such as refresh requests from multiple locations at the same time. Balancing security and performance is key to protecting user sessions without impacting the overall experience.

### Revoking and Invalidating Tokens

While token expiration is crucial, token revocation adds another layer of security, especially in scenarios like user logout, lost devices, or suspected security breaches. Although stateless JWT access tokens remain valid until they expire, managing refresh tokens effectively can block the issuance of new access tokens.

Revoking tokens promptly prevents unauthorized access to sensitive resources [\[8\]](https://curity.io/resources/learn/oauth-revoke). To invalidate tokens immediately, consider implementing a server-side blacklist that tracks revoked tokens and checks them during API requests. Additionally, Single Logout (SLO) functionality allows users to terminate multiple authentication sessions in one action, ensuring all related refresh tokens across connected services are revoked.

It’s also important to have clear protocols in place for handling compromised tokens. These protocols should include immediate token revocation, automated security alerts, timely notifications to affected users, and the termination of all active sessions tied to the compromised token.

### Secure Token Updates with OTA Systems

Once you’ve established a strong token lifecycle and revocation strategy, secure over-the-air (OTA) updates become essential for maintaining token security as threats evolve. OTA systems allow you to quickly deploy security patches, rotate API keys, update certificates, and refine validation logic - all without requiring manual updates from users.

For developers using Capacitor, tools like Capgo provide a compliant OTA solution with end-to-end encryption. This ensures that security updates are delivered safely to devices while adhering to Apple and Android guidelines. Such systems are particularly useful for addressing urgent security vulnerabilities.

To enhance token security further, monitor your apps and infrastructure for emerging threats. Use OTA systems to roll out runtime defenses and other advanced measures that can immediately block suspicious users or devices, all while ensuring uninterrupted service for legitimate users.

## Comparing Token Storage Options: Security vs. Ease of Use

When deciding how to store tokens securely, it’s all about finding the right balance between security and usability. Your choice can directly affect your app’s vulnerability to attacks and the overall user experience. Let’s break down the trade-offs of different storage methods.

### In-Memory Storage vs. Persistent Storage

**In-memory storage** keeps tokens in application memory or JavaScript variables, making it a highly secure option. Since tokens aren’t written to [persistent storage](https://capgo.app/plugins/capacitor-data-storage-sqlite/), attackers using traditional XSS attacks have fewer opportunities to access them.

But there’s a catch: tokens stored in memory disappear when users refresh the page or open a new tab. This makes in-memory storage less practical for web apps where users expect a seamless browsing experience.

On the other hand, **persistent storage** - methods like local storage, session storage, or cookies - offers a smoother experience. Tokens stored persistently allow users to close their browsers, return later, and pick up where they left off without needing to log in again [\[9\]](https://auth0.com/docs/secure/security-guidance/data-security/token-storage).

However, this convenience comes with security risks. Persistent storage is more vulnerable to XSS attacks, where malicious scripts can steal tokens from local or session storage [\[4\]](https://workos.com/blog/secure-jwt-storage). Cookies, while offering additional configuration options, can also be targeted by CSRF attacks if not secured with proper flags.

For mobile apps using Capacitor, **Web Workers** provide a middle ground. Running in a separate global scope, they enhance security while maintaining usability better than in-memory storage [\[9\]](https://auth0.com/docs/secure/security-guidance/data-security/token-storage). If Web Workers aren’t an option, JavaScript closures can simulate private methods to add an extra layer of protection [\[9\]](https://auth0.com/docs/secure/security-guidance/data-security/token-storage). Mobile developers also need to weigh the pros and cons of native secure storage versus custom encryption.

### Keychain/Keystore vs. Custom Encryption

For mobile applications, **platform-native secure storage** like iOS Keychain and Android Keystore is the gold standard. These solutions offer hardware-backed security, making token extraction far more difficult.

The beauty of these native tools lies in their simplicity. They’re built into the operating systems, so developers don’t have to write extensive code to implement them. Plus, they support features like [biometric authentication](https://capgo.app/plugins/capacitor-native-biometric/) and centralized credential management, which enhance both security and user convenience [\[10\]](https://medium.com/@jaidwivedi20/securing-mobile-apps-part-2-user-data-security-and-database-security-50e02941cc2a).

**Custom encryption**, on the other hand, gives developers more control but comes with significant challenges. Security depends entirely on how well the encryption is implemented and how securely keys are managed [\[10\]](https://medium.com/@jaidwivedi20/securing-mobile-apps-part-2-user-data-security-and-database-security-50e02941cc2a). Many developers underestimate the complexity of creating secure systems, which can lead to vulnerabilities. And since cryptographic standards evolve, custom solutions require ongoing updates and maintenance - making them resource-intensive unless your team has deep expertise in this area.

### Security vs. Usability Comparison Table

| Storage Method | Security Level | Usability | Implementation Complexity | Best Use Case |
| --- | --- | --- | --- | --- |
| In-Memory Storage | High | Low (lost on refresh) | Low | High-security, short sessions |
| Local Storage | Low | High | Low | Non-sensitive data only |
| Session Storage | Medium | High | Low | Temporary session data |
| Secure Cookies | High (with proper flags) | Medium | Medium | Web applications with server support |
| iOS Keychain | Very High | Medium | Low | iOS native/hybrid apps |
| Android Keystore | Very High | Medium | Low | Android native/hybrid apps |
| Custom Encryption | Variable | Medium | High | Specialized security requirements |

This table highlights how platform-native storage options like Keychain and Keystore offer a strong combination of security and ease of implementation, making them ideal for mobile applications. They provide robust protection without requiring developers to master cryptography.

For Capacitor developers, using secure storage plugins to access these native solutions is a smart move. It combines the hardware-backed security of Keychain and Keystore with the cross-platform flexibility that Capacitor offers.

Ultimately, your choice of token storage should align with your app’s threat model and user expectations. Applications handling sensitive data, like healthcare or financial apps, should prioritize security above all else. In contrast, consumer-facing apps might accept slightly higher risks to deliver a smoother user experience. By understanding these trade-offs, you can choose the storage method that best fits your needs.

## Key Takeaways

Protecting user data through secure token storage is not just a technical best practice - it’s a necessity for maintaining your app’s integrity. With **81% of confirmed breaches in 2022 linked to weak, reused, or stolen passwords** [\[12\]](https://www.dogtownmedia.com/choosing-the-right-authentication-methods-for-mobile-app-security), mobile developers need to prioritize robust token security measures.

### Best Practices Summary

An effective token security plan relies on multiple layers of protection. Start by using **platform-native secure storage**, such as iOS Keychain and Android Keystore, which offer hardware-backed security.

**Avoid storing tokens in LocalStorage or IndexedDB** [\[2\]](https://ionic.io/resources/articles/ionic-mobile-app-security-trifecta), as these methods are vulnerable to XSS attacks. Instead, rely on secure storage options built into the operating system, ensuring limited access. For developers using Capacitor, secure storage plugins provide a way to tap into native protections while maintaining cross-platform functionality.

Token lifecycle management is another critical aspect. Regularly expire tokens and implement refresh token rotation, generating a new refresh token each time an access token is requested [\[3\]](https://docs.cyberark.com/identity/latest/en/content/Developer/oidc/tokens/token-storage.htm). Shorter refresh token lifespans reduce the risk of misuse in case of theft.

Keep signing keys confidential, sharing them only with essential services [\[1\]](https://auth0.com/docs/secure/tokens/token-best-practices). Avoid insecure practices like logging tokens or embedding them in URLs [\[11\]](https://curity.io/resources/learn/oauth-for-mobile-apps-best-practices). These steps collectively strengthen your token management strategy.

### Next Steps for Developers

Here’s how you can act on these best practices to improve your app’s token security:

-   **Audit your token storage methods.** If you’re using insecure solutions like LocalStorage, prioritize migrating to platform-native secure storage. For Capacitor apps, adopt secure storage plugins to utilize native protections effectively.
    
-   **Implement layered authentication.** Use simpler methods for low-risk actions, but require [multi-factor authentication](https://capgo.app/docs/webapp/mfa/) (MFA) or biometrics for sensitive operations. According to Microsoft, MFA can block 99.9% of automated cyberattacks [\[12\]](https://www.dogtownmedia.com/choosing-the-right-authentication-methods-for-mobile-app-security). However, consider user experience - studies show that about one-third of users avoid MFA due to its inconvenience [\[12\]](https://www.dogtownmedia.com/choosing-the-right-authentication-methods-for-mobile-app-security).
    
-   **Use OTA (over-the-air) update systems** for secure and immediate rollouts. Tools like Capgo enable encrypted live updates for Capacitor apps, ensuring that security fixes reach users without compromising token safety during updates.
    
-   **Focus on token lifecycle management.** Regular expiration, refresh, and revocation protocols are essential. Ensure your implementation reflects these principles to limit risks.
    
-   **Monitor authentication patterns.** Keep an eye out for unusual activity and adjust your security measures based on evolving threats [\[13\]](https://www.linkedin.com/pulse/authentication-wars-balancing-user-experience-security-mobile-xg3kc). Regular security audits should be a routine part of your development process, not an afterthought.
    

While mobile security continues to evolve, the core principles remain the same: use native secure storage, manage token lifecycles effectively, and ensure encryption is non-negotiable. With **81% of smartphones now equipped with biometrics** as of 2022 [\[12\]](https://www.dogtownmedia.com/choosing-the-right-authentication-methods-for-mobile-app-security), developers have powerful tools to enhance both security and user experience.

Your users are entrusting you with their data - make sure your token storage practices meet the highest standards of security.

## FAQs

::: faq
### Why should mobile developers use iOS Keychain and Android Keystore for secure token storage?

Using platform-native secure storage, such as iOS Keychain and Android Keystore, plays a crucial role in safeguarding sensitive data within mobile apps. These tools come with **[built-in encryption](https://capgo.app/docs/cli/migrations/encryption/)**, ensuring that tokens remain protected from unauthorized access. On top of that, they incorporate **user authentication**, requiring users to confirm their identity before accessing stored data. This adds an extra layer of security.

One of their standout features is that cryptographic keys are **non-exportable**. In other words, these keys cannot be removed from the device, which significantly lowers the risk of them being compromised. Because these systems are designed to integrate seamlessly with their respective platforms, developers can implement them with ease, avoiding the hassle of handling complex encryption processes manually. Leveraging these tools not only strengthens app security but also helps developers meet **modern security standards** and follow **industry-recommended practices**.
:::

::: faq
### What are the best practices for securely managing token lifecycles in mobile apps?

To handle token lifecycles securely in mobile apps, developers should stick to a few essential practices. Start by using **short-lived tokens**, such as those with a 15-minute expiration. This minimizes the window of opportunity for misuse if a token is compromised. To maintain user convenience without sacrificing security, implement **refresh tokens**. These allow new tokens to be issued without forcing users to log in repeatedly.

Proper storage of tokens is critical to prevent unauthorized access. Always rely on platform-specific secure storage solutions, like **Keychain** for iOS or **Android Keystore**. These are specifically built to safeguard sensitive data. Also, steer clear of hardcoding tokens or keeping them in plaintext within the app, as this can expose them to potential threats.

By integrating these practices, developers can enhance the security of token management in mobile applications and protect users from potential vulnerabilities.
:::

::: faq
### What challenges can arise with custom encryption for token storage, and when should it be considered over native solutions?

When it comes to storing tokens in mobile apps, using custom encryption can be a double-edged sword. While it might seem like a tailored solution offers more control, it often brings added complexity, opens the door to potential security gaps, and demands ongoing maintenance to keep up with new threats. Unlike the built-in encryption tools provided by platforms, custom solutions typically lack extensive testing, detailed documentation, and the backing of a strong developer community. This can make debugging and integration a much bigger headache.

That said, there are situations where custom encryption becomes unavoidable - like when you're dealing with extremely sensitive data or trying to meet strict regulatory requirements that standard tools just can't handle. In these cases, it’s crucial for developers to stick to **best practices** to ensure their [encryption methods](https://capgo.app/docs/cli/migrations/encryption/) are not only secure but also reliable and compliant with industry standards. Carefully consider the trade-offs before diving into a custom encryption approach.
:::