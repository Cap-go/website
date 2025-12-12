---
slug: secure-storage-for-offline-tokens-in-capacitor
title: Sichere Speicherung für Offline-Token in Capacitor
description: >-
  Erfahren Sie, wie Sie Authentifizierungs-Token für die Offline-Speicherung
  sicher mit Verschlüsselung und biometrischen Kontrollen in mobilen Anwendungen
  speichern können.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-19T02:09:43.027Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6802fa419291ae98c5002559-1745028797889.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  offline tokens, secure storage, AES-256 encryption, biometric authentication,
  token management
tag: 'Development, Mobile, Security'
published: true
locale: de
next_blog: ''
---
**Möchten Sie die Authentifizierungstoken Ihrer App offline sicher aufbewahren?** Hier ist, was Sie wissen müssen:

-   **Token encryptieren**: Verwenden Sie AES-256-Verschlüsselung mit iOS Keychain oder Android Keystore.
-   **Zugriff kontrollieren**: Fügen Sie [biometrische Authentifizierung](https://capgo.app/plugins/capacitor-native-biometric/) für zusätzliche Sicherheit hinzu.
-   **Token-Management**: Verwenden Sie kurzlebige Token, erneuern Sie diese sicher und rotieren Sie die Schlüssel regelmäßig.
-   **Beste Werkzeuge**: Probieren Sie **@[capacitor](https://capacitorjs.com/)\-community/secure-storage** oder **[Ionic Identity Vault](https://ionic.io/docs/identity-vault/)** für plattformübergreifenden verschlüsselten Speicher aus.

Diese Schritte schützen Benutzerdaten, verhindern den Diebstahl von Token und gewährleisten einen sicheren Offline-Zugriff. Lesen Sie weiter für detaillierte Vergleiche und Einrichtungsanleitungen.

## [Ionic Identity Vault](https://ionic.io/docs/identity-vault/): Sichere mobile biometrische Authentifizierung

![Ionic Identity Vault](https://assets.seobotai.com/capgo.app/6802fa419291ae98c5002559/e2484017084695edeec1f98ae40b009b.jpg)

<iframe src="https://www.youtube.com/embed/DsXx7oEcOS0" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Sicherheitsstandards für Offline-Token

Um eine sichere Speicherung zu gewährleisten, verwenden Sie **AES-256-Verschlüsselung** über iOS Keychain oder Android Keystore. Implementieren Sie **PKCE** während der ersten OAuth2-Codeaustausche und stellen Sie sicher, dass kurzlebige Refresh-Token nach jeder Verwendung rotiert werden. Fügen Sie zudem **biometrische Authentifizierung** hinzu, um den Zugriff auf Token zu schützen und die allgemeine Sicherheit zu erhöhen.

## Implementierung von sicherer Speicherung

Um die zuvor besprochenen AES‑256-Verschlüsselung, PKCE und biometrische Kontrollen zu verwenden, beginnen Sie mit der Installation des Secure Storage-Plugins:

```bash
npm install @capacitor-community/secure-storage
```

Überprüfen Sie die Plugin-Dokumentation für Details zur Einrichtung von Verschlüsselungsschlüsseln, [Aktivierung der biometrischen Authentifizierung](https://capgo.app/plugins/capacitor-native-biometric/) und zum Umgang mit der Speicherung, dem Abruf und der Erneuerung von Offline-Token.

Sobald dies eingerichtet ist, fahren Sie mit der Definition von Methoden zur Speicherung von Token und zur Verwaltung ihres Lebenszyklus im Offline-Modus fort, die im nächsten Abschnitt behandelt wird.

## Analyse der Speicherlösungen

Bei der Auswahl sicherer Speicheroptionen für Offline-Token in Capacitor-Anwendungen müssen Entwickler Faktoren wie [Verschlüsselungsmethoden](https://capgo.app/docs/cli/migrations/encryption/), Kompatibilität zwischen Plattformen und die Integrationserleichterung abwägen. Im Folgenden finden Sie einen Überblick über wichtige Secure-Storage-Plugins zur Verwaltung von Offline-Token.

### Vergleich der Plugin-Funktionen

-   **@capacitor-community/secure-storage**: Bietet AES-256-Verschlüsselung mit iOS Keychain und Android Keystore, unterstützt [biometrisches Entsperren](https://capgo.app/plugins/capacitor-native-biometric/) und umfasst eine automatische Schlüsselrotation.
-   **@ionic/storage**: Enthält keine integrierte Verschlüsselung, benötigt einen manuellen Wrapper für die Sicherheit und verfügt nicht über Funktionen zur biometrischen Authentifizierung.
-   **Native SecureStorage**: Funktioniert ausschließlich mit dem iOS Keychain, unterstützt jedoch kein Android.
-   **@ionic-enterprise/identity-vault**: Bietet Hardware-verschlüsselte Speicherung, unterstützt biometrische Authentifizierung und verwaltet effektiv den sicheren Token-Lebenszyklus.

## Zusammenfassung

Hier ist eine kurze Übersicht über die wichtigsten Praktiken und Werkzeuge zur Speicherung von Offline-Token:

-   **Token verschlüsseln** unter Verwendung von hardwaregestützten Schlüsselspeichern, [gesichert mit Biometrie](https://capgo.app/plugins/capacitor-native-biometric/).
-   Implementieren Sie strikte Richtlinien für die Ausgabe, das Ablaufdatum, die Rotation und die Erneuerung von Token.

Für plattformübergreifende Verschlüsselung sind Werkzeuge wie **@capacitor-community/secure-storage** und **Ionic Identity Vault** ausgezeichnete Optionen. Außerdem bietet **[Capgo](https://capgo.app/)** End-to-End-Verschlüsselung, CI/CD-Integrationen und benutzerspezifische Rollouts und erfüllt gleichzeitig die Anforderungen der Apple- und Android-Stores.

### Werkzeuge und Ressourcen

-   **@capacitor-community/secure-storage**: Verschlüsselte Schlüssel-Wert-Speicherung für iOS und Android.
-   **Ionic Identity Vault**: Unternehmensspeicher mit biometrischer Sicherheit.
-   **Capgo**: Bietet Live-Updates mit verschlüsselter CI/CD-Bereitstellung.
