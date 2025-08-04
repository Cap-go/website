---
slug: top-api-security-standards-for-app-store-compliance
title: Top API Sicherheitsstandards für die App Store-Konformität
description: >-
  Lerne die wichtigsten API-Sicherheitsstandards kennen, um sicherzustellen,
  dass deine App die Anforderungen des App Stores erfüllt und gleichzeitig
  Benutzerdaten schützt.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-24T01:52:28.048Z
updated_at: 2025-04-24T01:52:43.928Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6809811c9bd9ce97f26b7b78-1745459563928.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  API security, OAuth 2.0, OpenID Connect, TLS, JWT, app store compliance, user
  data protection
tag: 'Development, Mobile, Security'
published: true
locale: de
next_blog: ''
---
Die Sicherung der API Ihrer App ist entscheidend, um die Anforderungen des Apple App Store und Google Play zu erfüllen. Dieser Leitfaden beschreibt **fünf wichtige API-Sicherheitsstandards**, die Ihnen helfen, Plattformregeln einzuhalten, Benutzerdaten zu schützen und die App-Leistung zu verbessern.

### Wichtige Erkenntnisse:

-   **[OAuth 2.0](https://oauth.net/2/)**: Sichere Benutzerauthentifizierung mit Token-basiertem Zugriff.
-   **[OpenID Connect](https://de.wikipedia.org/wiki/OpenID_Connect)**: Identitätsebene für erweiterte Benutzerverifizierung.
-   **TLS/SSL**: [Daten verschlüsseln](https://capgo.app/docs/cli/migrations/encryption/) während der Übertragung um Manipulation zu verhindern.
-   **JWT-Sicherheit**: Token durch korrekte Signierung und Speicherung schützen.
-   **API-Ratenbegrenzungen**: APIs durch Anfragelimits vor Missbrauch schützen.

Durch die Implementierung dieser Standards stellen Sie sicher, dass Ihre [Capacitor App](https://capgo.app/plugins/ivs-player/) die Zulassungskriterien erfüllt und gleichzeitig Benutzerdaten sicher bleiben. Bereit für mehr Details? Gehen wir es Schritt für Schritt durch.

## API-Schlüssel in Frontend-App mit Proxy-Server & Benutzer sichern...

<iframe src="https://www.youtube.com/embed/-HJeBV70zIE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 1. [OAuth 2.0](https://oauth.net/2/) Implementierung

![OAuth 2.0](https://assets.seobotai.com/capgo.app/6809811c9bd9ce97f26b7b78/d1868b22bd285dedc49624e0c0ea2ab6.jpg)

OAuth 2.0 ist ein weit verbreitetes Protokoll zur sicheren Autorisierung von mobilen Apps. Es ermöglicht Drittanbieter-Apps den Zugriff auf Benutzerressourcen, ohne sensible Anmeldedaten preiszugeben. Plattformen wie Apple und Google erfordern eine sichere, standardkonforme Authentifizierung, und OAuth 2.0 erfüllt diese Anforderungen durch Token-basierte Sicherheit und kontrollierten API-Zugriff.

So richten Sie OAuth 2.0 in Ihrer Capacitor-App ein:

### Wichtige Autorisierungsabläufe

-   **Autorisierungscode mit PKCE (Proof Key for Code Exchange):** Der sicherste Flow, ideal für mobile Apps.
-   **Impliziter Flow:** Nur verwenden, wenn für ältere Systeme erforderlich.
-   **Client Credentials:** Für Service-zu-Service-Kommunikation.

### Schritte zur Integration

1.  **Token-Management**
    
    -   Token sicher abrufen.
    -   Token in [verschlüsseltem Speicher](https://capgo.app/docs/cli/migrations/encryption/) speichern, um unbefugten Zugriff zu verhindern.
    -   Token-Aktualisierung automatisieren, um unterbrechungsfreien Zugriff zu gewährleisten.
    -   Token-Signaturen validieren, um Authentizität zu bestätigen.
2.  **Sicherheitsmaßnahmen**
    
    -   Zugriff durch Konfiguration von Scopes einschränken.
    -   Token-Ablaufzeiten festlegen, um Risiken zu minimieren.
    -   Ratenbegrenzung anwenden, um Missbrauch zu verhindern.
    -   Authentifizierungsversuche auf verdächtige Aktivitäten überwachen.
3.  **App Store-Konformität**
    
    -   Von Apple genehmigte OAuth-Provider verwenden.
    -   Google Plays Sicherheitsrichtlinien einhalten.
    -   Authentifizierungsabläufe Ihrer App klar dokumentieren.
    -   Prüfprotokolle für Überprüfung und Fehlerbehebung führen.

Für zusätzlichen Schutz sollten Sie OAuth 2.0 mit anderen Authentifizierungsmethoden kombinieren. Dieser Ansatz schützt nicht nur sensible Benutzerdaten, sondern hilft auch bei der Sicherung von API-Endpunkten und stellt die Einhaltung der Plattformanforderungen sicher [\[1\]](https://capgo.app/)\[2\].

## 2. [OpenID Connect](https://de.wikipedia.org/wiki/OpenID_Connect) Einrichtung

OpenID Connect baut auf OAuth 2.0 auf und fügt eine Identitätsebene hinzu, um eine sichere Benutzerauthentifizierung zu gewährleisten.

### Wichtige Implementierungsschritte

1.  **Identity Token Einstellungen**
    
    -   Scopes wie `openid`, `profile` und `email` definieren.
    -   Access Token Lebensdauer zwischen 15-30 Minuten festlegen.
    -   Refresh Token Rotation für erhöhte Sicherheit aktivieren.
2.  **Benutzerauthentifizierungsprozess**
    
    -   Native Authentifizierung über System-Browser und Geräte-Biometrie nutzen.
    -   Token sicher in verschlüsseltem Speicher aufbewahren.
    -   Token immer serverseitig validieren.
3.  **Claims-Management**
    
    -   Nur die tatsächlich benötigten Benutzerinformationen anfordern.
    -   Korrektes Session-Management zur Aufrechterhaltung der Sicherheit implementieren.

### Plattformspezifische Richtlinien

**Für iOS:**

-   **ASWebAuthenticationSession** für sichere Authentifizierung verwenden.
-   **Sign in with Apple** bei Bedarf unterstützen.
-   Token sicher in der Keychain speichern.
-   Certificate Pinning für zusätzlichen Schutz aktivieren.

**Für Android:**

-   **Chrome Custom Tabs** für Authentifizierungsabläufe verwenden.
-   Anmeldedaten mit dem Android Keystore sichern.
-   **Google Sign-In** wo zutreffend integrieren.
-   **[SafetyNet](https://developers.google.com/android/reference/com/google/android/gms/safetynet/SafetyNetApi) Attestation** für zusätzliche Sicherheit aktivieren.

### Sicherheits-Best-Practices

-   Abmeldeprozesse implementieren, um Sitzungen effektiv zu beenden.
-   Statusparameter zum Schutz vor CSRF-Angriffen verwenden.
-   **HTTP Strict Transport Security (HSTS)** für sichere Verbindungen aktivieren.
-   Authentifizierungsversuche überwachen, um verdächtiges Verhalten zu erkennen.

Stellen Sie abschließend sicher, dass alle Authentifizierungsaustausche während der Übertragung durch TLS/SSL geschützt sind.

## 3. TLS/SSL Sicherheit

TLS/SSL stellt sicher, dass Ihre Daten während der Übertragung verschlüsselt bleiben. TLS (Transport Layer Security) schützt den API-Verkehr vor Abhören oder Manipulation.

### Wichtige Sicherheitspraktiken

-   Verwenden Sie **TLS v1.2 oder höher** für alle API-Kommunikation. Dies hält OAuth-Token und OpenID-Identitätsbestätigungen zwischen Client und Server privat.
-   Wenden Sie **Certificate Pinning** für iOS- und Android-Anwendungen an.
-   Aktivieren Sie **HTTP Strict Transport Security (HSTS)** auf Ihren Servern, um sichere Verbindungen zu erzwingen.

### Capacitor-Einrichtung

Richten Sie Capacitors HTTP-Plugin oder WKWebView/NSSecureTransport ein, um ungültige Zertifikate zu blockieren. Für Live-Updates bieten Tools wie Capgo eine Ende-zu-Ende-Verschlüsselung, die sowohl Apple- als auch Google-Richtlinien erfüllt [\[1\]](https://capgo.app/).

## 4. JWT-Sicherheitsmaßnahmen

JSON Web Tokens (JWT) sind essentiell für die Sicherung der API-Kommunikation, besonders bei der Einhaltung von App Store-Anforderungen. Sie verbessern Ihr OAuth 2.0 und OpenID Connect Setup durch Fokussierung auf die Sicherheit der Token selbst.

### Token-Signierungsrichtlinien

-   Verwenden Sie **asymmetrisches RS256 (RSA-SHA256)** zum Signieren von Token und rotieren Sie private Schlüssel alle 90 Tage.
-   Speichern Sie JWTs in **[verschlüsseltem sicherem Speicher](https://capgo.app/docs/cli/migrations/encryption/)**, um unbefugten Zugriff zu verhindern.
-   Validieren Sie Schlüsselelemente wie **Signatur**, **Aussteller (iss)**, **Zielgruppe (aud)** und **Ablauf**.
-   Halten Sie die Payload minimal - fügen Sie nur notwendige Claims hinzu, ergänzen Sie eine eindeutige ID (_jti_) und vermeiden Sie sensible Daten.

### Token-Lebenszyklus-Management

-   Token **5 Minuten vor Ablauf** aktualisieren, um unterbrechungsfreien Zugriff sicherzustellen.
-   Eine **Widerrufsliste** (z.B. mit [Redis](https://redis.io/)) pflegen, um kompromittierte Token sofort zu invalidieren.

### Fehlerbehandlung

Bei Fehlern **generische Fehlermeldungen** wie `invalid_token` zurückgeben, um keine Validierungsdetails preiszugeben.

### App Store-Konformität

Für App Store-spezifische Anforderungen stellen Sie sicher, dass Ihre JWT-Implementierung:

-   Die **Keychain-Speicherrichtlinien** der Plattform einhält.
-   Angemessenes **Audit-Logging** für alle Token-bezogenen Operationen enthält.

## 5. API-Ratenbegrenzungen

Die Verwaltung der Häufigkeit von API-Zugriffen ist genauso wichtig wie deren Absicherung. Ratenbegrenzungen helfen, Missbrauch zu verhindern, vor DDoS-Angriffen zu schützen und eine faire Ressourcenverteilung unter Benutzern sicherzustellen.

### Strategien zur Ratenbegrenzung

Sobald Ihre Token gesichert sind, ist es Zeit zu entscheiden, wie viele Anfragen jeder Client stellen kann.

**Anfragelimits**

-   Anfragen basierend auf IP-Adressen beschränken
-   Benutzerkontingente an API-Schlüssel binden
-   Gelegentliche Bursts zulassen, um Verkehrsspitzen zu bewältigen

**Zeitbasierte Limits**

-   _Festes Fenster_: Limits in regelmäßigen Intervallen zurücksetzen (z.B. jede Minute oder Stunde)
-   _Gleitendes Fenster_: Nutzung über einen rollierenden Zeitraum verfolgen
-   _Token Bucket_: Token für Anfragen ausgeben, die über Zeit aufgefüllt werden

### Implementierungsrichtlinien

**Header und Antwort-Codes**

Bei der Durchsetzung von Limits hilfreiche Header in Ihre Antworten einbinden:

-   HTTP 429 ("Too Many Requests") verwenden, wenn Limits überschritten werden
-   Header wie `X-RateLimit-Limit`, `X-RateLimit-Remaining` und `X-RateLimit-Reset` hinzufügen, um Benutzer zu informieren
-   Einen `Retry-After` Header einfügen, um anzuzeigen, wann sie es erneut versuchen können

### Überwachung und Warnungen

Behalten Sie die API-Nutzung mit diesen Schritten im Auge:

-   API-Nutzung in Echtzeit überwachen, um Muster zu erkennen
-   Verdächtige Aktivitäten identifizieren und blockieren
-   Warnungen für ungewöhnliche Verkehrsspitzen einrichten
-   Ratenlimit-Verletzungen für zukünftige Analysen protokollieren

### Fehlerantwort-Beispiel

Wenn ein Client das Ratenlimit überschreitet, mit einer klaren JSON-Nachricht antworten. Zum Beispiel:

```json
{
  "error": "rate_limit_exceeded",
  "message": "Request quota exceeded",
  "retry_after": "<seconds until reset>"
}
```

### Ratenlimit-Speicherung

Um Ratenlimits effizient durchzusetzen, verwenden Sie einen verteilten Cache wie Redis oder [Memcached](https://memcached.org/). Diese Systeme helfen bei der Verfolgung von Anfragezählern über mehrere Instanzen hinweg bei gleichzeitiger hoher Leistung.

Weiter: App Store Sicherheitsregeln.

## App Store Sicherheitsregeln

Lassen Sie uns die von Apple und Google durchgesetzten Netzwerk- und Speichersicherheitsanforderungen betrachten. Diese Regeln gehen über OAuth-Token und Ratenlimits hinaus und stellen sicher, dass Ihre App die Plattformstandards erfüllt.

### iOS-Anforderungen

-   **App Transport Security (ATS)** muss aktiviert sein:
    -   TLS 1.2 oder neuer
    -   Perfect Forward Secrecy (PFS)
    -   Zertifikate mit mindestens SHA-256
-   Sensible Daten mit der Keychain schützen.
-   Certificate Pinning für sichere Kommunikation einrichten.
-   Alle lokalen Daten verschlüsseln.

### Android-Anforderungen

-   **Network Security Config** verwenden für:
    -   Einschränkung von Klartext-Traffic.
    -   Definition von Certificate Pinning Regeln.
    -   Bei Bedarf benutzerdefinierte Zertifizierungsstellen angeben.
-   Dateien sicher verschlüsseln.
-   SafetyNet Attestation für Geräteintegritätsprüfungen konfigurieren.
-   Android Keystore für sicheres Schlüsselmanagement nutzen.

### Gemeinsame Plattformregeln

Beide Plattformen teilen mehrere wichtige Sicherheitsanforderungen:

-   HTTPS für alle Verbindungen verwenden.
-   Zertifikate ordnungsgemäß validieren.
-   SSL/TLS-Einstellungen sicher konfigurieren.
-   Lokalen Speicher mit Verschlüsselung schützen.
-   Detaillierte Prüfprotokolle führen.
-   Dokumentation Ihrer Sicher

## API-Zugriffskontrollmethoden

Der Schutz Ihrer API-Endpunkte geht über die bloße Sicherung des Plattformtransports und der Token hinaus. Fein abgestimmte Zugriffskontrollen sind der Schlüssel zur Gewährleistung der API-Sicherheit.

### Wichtige Zugriffskontrollmethoden

-   **API-Schlüssel-Validierung**  
    Verwenden Sie kryptografisch sichere Schlüssel mit festgelegten Ablaufdaten. Automatisieren Sie die Schlüsselrotation alle 90 Tage und setzen Sie Ratenlimits und Nutzungskontingente pro Schlüssel durch. Protokollieren Sie die Schlüsselverwendung immer zu Prüfzwecken. Diese Methode funktioniert gut zusammen mit OAuth 2.0 für Service-zu-Service-Aufrufe.
    
-   **OAuth-Scopes-Durchsetzung**  
    Weisen Sie API-Berechtigungen spezifische Scopes zu und validieren Sie diese bei jeder Anfrage. Weisen Sie Anfragen ohne ordnungsgemäße Autorisierung zurück und dokumentieren Sie die Scope-Anforderungen klar für App Store-Überprüfungen. Die Kombination von Scopes mit JWT-Claims kann den Zugriff weiter einschränken.
    
-   **Rollenbasierte Zugriffskontrolle (RBAC)**  
    Definieren Sie Rollen mit präzisen Berechtigungen und weisen Sie diese über Ihr Authentifizierungssystem zu. Überprüfen Sie Rollenberechtigungen bei jedem API-Aufruf und speichern Sie Rollenzuweisungen sicher in verschlüsseltem Speicher.
    
-   **Token-Überprüfung & -Widerruf**  
    Führen Sie Echtzeit-Token-Validierung durch und pflegen Sie eine zentralisierte Blacklist für kompromittierte Token. Ermöglichen Sie sofortigen Widerruf und richten Sie Überwachung ein, um verdächtige Token-Aktivitäten zu kennzeichnen.

### Plattform-Compliance

Für die Genehmigung auf Plattformen wie Apple's App Store oder Google Play:

-   Dokumentieren Sie Ihre Zugriffskontrollmethoden klar während Sicherheitsüberprüfungen.
-   Behandeln Sie unautorisierte Anfragen mit korrekten Fehlerantworten.
-   Führen Sie detaillierte Zugriffsaufzeichnungen für Prüfzwecke.
-   Aktivieren Sie Echtzeit-Überwachung zur schnellen Behandlung von Sicherheitsvorfällen.

Diese Maßnahmen entsprechen den Sicherheitsrichtlinien von Apple und Google und stellen sicher, dass Ihre API deren Standards erfüllt.

## API-Sicherheitstools für Capacitor

Sobald Sie Zugriffskontrollen eingerichtet haben, besteht der nächste Schritt darin, Tools zu integrieren, die diese Schutzmaßnahmen nahtlos in Ihren Capacitor-Workflow implementieren. Tools, die OAuth, TLS und JWT-Protokolle unterstützen, sind essentiell für die Sicherung von Capacitor-Apps bei gleichzeitiger Gewährleistung reibungsloser Updates.

### Wichtige Sicherheitsfunktionen

Effektive Sicherheitstools für Capacitor sollten Folgendes beinhalten:

-   **Ende-zu-Ende-Verschlüsselung** zum Schutz von Daten und Ermöglichung sofortiger Updates
-   **Analytik und Fehlerverfolgung** zur Überwachung der App-Leistung und Probleme
-   **Rollback-Funktionalität** für schnelle Korrekturen
-   **CI/CD-Integration** und flexible Hosting-Optionen
-   **App Store-Compliance-Prüfungen** zur Erfüllung von Plattformanforderungen
-   **Gestaffelte Rollout-Möglichkeiten** für kontrollierte Updates
-   **Sofortige Versionsrückgänge** zur Behebung kritischer Probleme
-   **Gezielte Benutzerkontrolle** für personalisierte Updates

### Top-Empfehlung: [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/6809811c9bd9ce97f26b7b78/29f394e74984c052f31714ba4759b80a.jpg)

Capgo ist ein herausragendes Tool für die Verwaltung von Live-Updates in Capacitor-Apps unter Einhaltung der Apple- und Google-Richtlinien. Es verfügt über eine globale Update-Erfolgsrate von 82% und eine beeindruckende durchschnittliche API-Antwortzeit von 434 ms [\[1\]](https://capgo.app/).

### Leistungskennzahlen

Capgo gewährleistet schnelle und effektive Updates:

-   **95% der Nutzer** erhalten Updates innerhalb von 24 Stunden
-   Wird von **über 1.900 Produktions-Apps** weltweit genutzt [\[1\]](https://capgo.app/)

### Überwachung und Analytik

Um die App-Leistung und Compliance aufrechtzuerhalten, konzentrieren Sie sich auf die Verfolgung dieser Metriken:

-   **Update-Erfolgsraten**: Der Prozentsatz der Nutzer, die die neueste Version verwenden
-   **API-Antwortzeiten**: Ein kritisches Maß für die Update-Auslieferungsgeschwindigkeit

Die regelmäßige Überprüfung dieser Metriken hilft sicherzustellen, dass Ihre App die App Store-Anforderungen erfüllt und eine reibungslose Benutzererfahrung bietet.  
[\[1\]](https://capgo.app/) Capgo Nutzungsstatistiken

## Zusammenfassung

Um alles zusammenzufassen, hier wie die fünf Schlüsselstandards zusammenpassen: **Sichere Authentifizierung** (OAuth 2.0 mit PKCE, OpenID Connect), **starke Verschlüsselung** (TLS 1.2+ und korrekte JWT-Nutzung) und **API-Ratenbegrenzung** sind entscheidend für die Erfüllung der App Store-Anforderungen von Apple und Google in Capacitor-Apps.

Konzentrieren Sie sich auf die Aufrechterhaltung von **Ende-zu-Ende-Verschlüsselung**, **kontinuierliche Überwachung**, **gestaffelte Rollouts** über Beta-Kanäle und die Integration von **CI/CD-Pipelines** mit Rollback-Optionen. Diese Schritte haben in der Praxis Erfolg gezeigt, wobei Implementierungen eine beeindruckende globale Erfolgsrate von 82% bei der Update-Auslieferung erreichen [\[1\]](https://capgo.app/).

## FAQs

:::faq
### Wie kann ich OAuth 2.0 in meiner Capacitor-App implementieren, um App Store-Sicherheitsstandards zu erfüllen?

Um **OAuth 2.0** in Ihrer Capacitor-App zu implementieren und dabei die Compliance mit App Store-Sicherheitsstandards sicherzustellen, müssen Sie einige wichtige Schritte befolgen:

1.  **OAuth-Provider einrichten**: Registrieren Sie Ihre App bei einem OAuth-Provider (z.B. Google, Apple oder einem anderen Dienst) und erhalten Sie die erforderlichen Anmeldedaten wie Client-ID und Client-Secret.
2.  **OAuth-Bibliothek integrieren**: Verwenden Sie eine Bibliothek wie `@capacitor-community/oauth2` für nahtlose Integration mit Capacitor-Apps. Dies hilft bei der Verwaltung von Authentifizierungsabläufen und Token-Handling.
3.  **Redirect-URIs konfigurieren**: Stellen Sie sicher, dass die Redirect-URIs Ihrer App in den Einstellungen des OAuth-Providers korrekt eingerichtet sind, um Authentifizierungs-Callbacks sicher zu handhaben.
4.  **Token sicher verwalten**: Verwenden Sie sicheren Speicher (z.B. Capacitor's Secure Storage Plugin) zur Speicherung von Zugriffs- und Aktualisierungstoken, um Ende-zu-Ende-Verschlüsselung zu gewährleisten.

Durch Befolgen dieser Schritte können Sie sicherstellen, dass Ihre App die Sicherheitsstandards erfüllt und gleichzeitig eine reibungslose Authentifizierungserfahrung bietet. Plattformen wie **Capgo** können auch Ihren App-Update-Prozess verbessern und dabei die Einhaltung der Apple- und Google-Anforderungen sicherstellen, während Echtzeit-Updates an Benutzer geliefert werden.
:::

:::faq
### Welche Schritte kann ich unternehmen, um sicherzustellen, dass meine API die Sicherheitsstandards von Apple und Google für App Store-Compliance erfüllt?

Um sicherzustellen, dass Ihre API den Sicherheitsstandards von Apple und Google entspricht, konzentrieren Sie sich auf die Implementierung robuster Sicherheitspraktiken wie **Ende-zu-Ende-Verschlüsselung**, sichere Authentifizierungsmethoden und Datenschutzmaßnahmen. Diese sind entscheidend für die Erfüllung der Compliance-Anforderungen.

Wenn Sie Capacitor-Apps entwickeln, können Tools wie Capgo die Compliance vereinfachen. Capgo ermöglicht es Ihnen, Updates, Fehlerbehebungen und Funktionen sofort zu pushen, ohne App Store-Genehmigungen zu benötigen, während die Apple- und Android-Richtlinien eingehalten werden. Dies stellt sicher, dass Ihre App mühelos sicher und aktuell bleibt.
:::

:::faq
### Was sind die besten Tools und Praktiken zur Überwachung und Verwaltung der API-Sicherheit in meiner App?

Für effektives API-Sicherheitsmanagement in Ihrer App sollten Sie Tools in Betracht ziehen, die Echtzeit-Updates, Verschlüsselung und nahtlose Integration mit Entwicklungs-Workflows ermöglichen. **Capgo** bietet eine leistungsstarke Lösung für Capacitor-Apps und ermöglicht Entwicklern, Updates, Fehlerbehebungen und neue Funktionen sofort zu pushen, ohne auf App Store-Genehmigungen warten zu müssen. Dies stellt sicher, dass Ihre App konform und aktuell bleibt.

Capgo bietet auch **Ende-zu-Ende-Verschlüsselung**, Integration mit CI/CD-Pipelines und die Möglichkeit, Updates bestimmten Benutzergruppen zuzuweisen. Diese Funktionen verbessern nicht nur die Sicherheit, sondern optimieren auch den Update-Prozess und machen es einfacher, die Compliance mit den App Store-Anforderungen von Apple und Google aufrechtzuerhalten.
:::
