---
slug: 5-steps-to-implement-oauth2-in-capacitor-apps
title: 5 Schritte zur Implementierung von OAuth2 in Capacitor-Apps
description: >-
  Integrieren Sie sichere OAuth2-Authentifizierung in Ihre Capacitor-App mit
  dieser prägnanten Anleitung zu wesentlichen Schritten und bewährten Methoden.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-27T12:26:34.111Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/683598e6d3b96619818496d3-1748348849256.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  OAuth2, Capacitor, authentication, mobile apps, security, token storage, PKCE,
  app integration
tag: 'Development, Mobile, Security'
published: true
locale: de
next_blog: ''
---
**Möchten Sie sichere [OAuth2](https://en.wikipedia.org/?title=OAuth2&redirect=no)-Authentifizierung zu Ihrer [Capacitor](https://capacitorjs.com/)-App hinzufügen? Hier ist eine schnelle Anleitung für den Einstieg.**

OAuth2 ist ein Protokoll, das Benutzern ermöglicht, Zugriff auf ihre Daten zu teilen, ohne Passwörter preiszugeben. Es ist ideal für [Capacitor Apps](https://capgo.app/blog/capacitor-comprehensive-guide/), da es plattformübergreifend auf iOS, Android und Web funktioniert. Außerdem hält es Ihre App sicher, indem es Tokens anstelle der Speicherung sensibler Anmeldedaten verwendet.

So integrieren Sie OAuth2 in nur 5 Schritten in Ihre [Capacitor App](https://capgo.app/plugins/ivs-player/):

1. **OAuth2-Provider einrichten**: Wählen Sie einen Provider (z.B. Google, [Auth0](https://auth0.com/)), konfigurieren Sie Redirect-URIs und verwalten Sie Client-Anmeldedaten sicher.
2. **OAuth2-Plugin installieren und konfigurieren**: Fügen Sie das `@byteowls/capacitor-oauth2`-Plugin hinzu und richten Sie plattformspezifische Einstellungen ein (z.B. `Info.plist` für iOS, `AndroidManifest.xml` für Android).
3. **Authentifizierungsablauf erstellen**: Verwenden Sie das Plugin, um Benutzeranmeldung, Token-Speicherung und Abmeldung sicher zu handhaben. Aktivieren Sie [PKCE](https://oauth.net/2/pkce/) für zusätzlichen Schutz.
4. **Plattformübergreifend testen**: Überprüfen Sie den Ablauf auf iOS, Android und Webbrowsern. Beheben Sie häufige Probleme wie Redirect-URI-Fehlanpassungen oder PKCE-Fehler.
5. **Implementierung absichern**: Speichern Sie Tokens in sicherem Speicher ([Keychain](https://en.wikipedia.org/wiki/Keychain_\(software\))/Keystore), verwenden Sie HTTPS und richten Sie starke [Content Security Policies](https://capgo.app/security/) ein.

### Schneller Vergleich: Sichere Token-Speicheroptionen

| Speicheroption | Am besten für | Sicherheitsstufe | Offline-Zugriff | Anwendungsbeispiel |
| --- | --- | --- | --- | --- |
| **Sicherer Speicher** | Mobile Apps | Hoch | Ja | Refresh-Tokens |
| **Arbeitsspeicher** | Temporärer Zugriff | Mittel | Nein | Aktive Zugriffstoken |
| **HttpOnly Cookies** | Webanwendungen | Hoch | Ja | Browser-basierte Sitzungen |

## So fügen Sie Google Sign In mit [Capacitor](https://capacitorjs.com/) zu Ihrer [Ionic](https://ionicframework.com/) App hinzu

![Capacitor](https://assets.seobotai.com/capgo.app/683598e6d3b96619818496d3/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/GwtpoWZ_78E" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Schritt 1: Richten Sie Ihren [OAuth2](https://en.wikipedia.org/?title=OAuth2&redirect=no)-Provider ein

Die korrekte Einrichtung Ihres OAuth2-Providers ist der erste und wichtigste Schritt, um einen reibungslosen Ablauf zu gewährleisten. Dies beinhaltet die Auswahl eines Providers, der Ihren App-Anforderungen entspricht, die Konfiguration technischer Details wie Redirect-URIs und die sichere Verwaltung Ihrer Anmeldedaten. Diese Schritte ebnen den Weg für die Installation des OAuth2-Plugins in der nächsten Phase.

### Wählen Sie einen OAuth2-Provider

Beginnen Sie mit der Auswahl eines OAuth2-Providers, der zu Ihrer App-Funktionalität, den Sicherheitsanforderungen und der Kompatibilität passt. Die Art der Anwendung, die Sie entwickeln, spielt eine wichtige Rolle bei der Bestimmung des OAuth 2.0-Flows, den Sie verwenden werden, was sich direkt auf Ihre Providerwahl auswirkt [\[2\]](https://auth0.com/docs/get-started/authentication-and-authorization-flow/which-oauth-2-0-flow-should-i-use). Für Capacitor-basierte Apps wird empfohlen, den Authorization Code Flow mit PKCE zu verwenden - dies ist die bevorzugte Methode für mobile Anwendungen.

Beim Vergleich von Providern konzentrieren Sie sich auf deren Sicherheitsfunktionen. Achten Sie auf Optionen wie signierte Cookies, CSRF-Token-Validierung und verschlüsselte JWTs. Wenn Ihre App mit sensiblen Daten arbeitet, ist die Unterstützung für [Multi-Faktor-Authentifizierung](https://capgo.app/docs/webapp/mfa/) ein Muss. Wägen Sie bei der Bewertung Kosten und Funktionen basierend auf Ihren Anforderungen ab, ohne sich in langwierigen Vergleichen zu verlieren.

### Redirect-URIs konfigurieren

Redirect-URIs sind entscheidend - sie teilen dem OAuth2-Provider mit, wohin Benutzer nach erfolgreicher Authentifizierung weitergeleitet werden sollen. Die richtige Konfiguration dieser URIs gewährleistet eine nahtlose Erfahrung auf mobilen und Web-Plattformen.

Für mobile Apps verwenden Sie benutzerdefinierte URL-Schemas, typischerweise im Format `com.example.app://callback`, wobei `com.example.app` Ihrer App-Paket-ID entspricht. Im Web verwenden Sie `window.location.origin` als Redirect-URI. Beim lokalen Testen funktioniert eine URL wie `http://localhost:8100/callback` gut.

iOS-Benutzer sollten beachten, dass Capacitors Browser-Plugin [SFSafariViewController](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller) verwendet. Ab iOS 11 teilt dies keine Cookies mit Safari, was Single Sign-On-Funktionalität beeinflussen kann. Wenn SSO essenziell ist, erwägen Sie die Verwendung eines Plugins, das [ASWebAuthenticationSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession) unterstützt [\[3\]](https://auth0.com/docs/quickstart/native/ionic-angular/interactive).

### Client-Anmeldedaten verwalten

Client-Anmeldedaten identifizieren Ihre App beim OAuth2-Provider und bestehen aus einer Client-ID und einem Client-Secret. Betrachten Sie die Client-ID als öffentlichen Identifikator, während das Client-Secret wie ein privater Schlüssel behandelt werden sollte.

Codieren Sie Client-Secrets niemals direkt in Ihre App oder committen Sie sie in die Versionskontrolle. Verwenden Sie stattdessen Umgebungsvariablen oder ein sicheres Geheimnisverwaltungssystem zur Speicherung. Wählen Sie außerdem kurzlebige Tokens mit minimalen Berechtigungen, um die Exposition zu begrenzen und die Sicherheit zu erhöhen.

## Schritt 2: OAuth2-Plugin installieren und konfigurieren

Nachdem Ihr OAuth2-Provider bereit ist, besteht der nächste Schritt darin, das Plugin zu Ihrer Capacitor-App hinzuzufügen und es für iOS, Android und Web-Plattformen einzurichten.

### Plugin installieren

Das `@byteowls/capacitor-oauth2`-Plugin funktioniert mit den meisten OAuth2-Providern. Um Kompatibilitätsprobleme zu vermeiden, müssen Sie die Version installieren, die zu Ihrem Capacitor-Setup passt.

Hier sind die Installationsbefehle basierend auf Ihrer Capacitor-Version:

- **Capacitor v5**: `npm i @byteowls/capacitor-oauth2`
- **Capacitor v4**: `npm i @byteowls/capacitor-oauth2@4`
- **Capacitor v3**: `npm i @byteowls/capacitor-oauth2@3`

Nach der Installation führen Sie den Sync-Befehl (`npx cap sync`) aus, um Ihre nativen Abhängigkeiten zu aktualisieren. Dieser Schritt ist entscheidend, um sicherzustellen, dass das Plugin korrekt in Ihre iOS- und Android-Projekte integriert wird. Das Überspringen kann zu Build-Fehlern beim Kompilieren für mobile Plattformen führen.

### Plugin-Einstellungen konfigurieren

Nach der Installation müssen Sie das Plugin entsprechend Ihrem OAuth2-Provider-Setup konfigurieren. Dies geschieht über das `oauth2Options`-Objekt beim Aufruf der `authenticate()`-Methode. Wichtige zu definierende Parameter sind:

- **appId**: Ihre Client-ID vom OAuth2-Provider.
- **authorizationBaseUrl**: Der Autorisierungs-Endpunkt des Providers.
- **responseType**: Typischerweise auf `"code"` für mobile Apps gesetzt.
- **redirectUrl**: Muss mit der in Schritt 1 konfigurierten Redirect-URL übereinstimmen.

Sie können auch zusätzliche Parameter wie `accessTokenEndpoint`, `scope` und plattformspezifische Optionen festlegen, um den Authentifizierungsprozess feinzusteuern.

Für Android aktualisieren Sie Ihre `AndroidManifest.xml` und `strings.xml` Dateien mit den korrekten Schema- und Host-Informationen. Unter iOS modifizieren Sie die `Info.plist` Datei, um Ihr Redirect-URL-Schema zu registrieren. Diese plattformspezifischen Änderungen stellen sicher, dass Benutzer nach der Authentifizierung zu Ihrer App zurückgeleitet werden.

### Kapazitor-Versionskompatibilität prüfen

Es ist wichtig zu überprüfen, ob die Plugin-Version zu Ihrer Capacitor-Version passt. Nicht übereinstimmende Versionen können Build-Fehler oder Laufzeitprobleme verursachen. Das `@byteowls/capacitor-oauth2`-Plugin richtet sich streng nach Capacitor-Releases, also überprüfen Sie die Kompatibilität vor dem Fortfahren.

| Plugin-Version | Kompatible Capacitor-Version | Hinweise |
| --- | --- | --- |
| 5.x | 5.x.x | Benötigt [Xcode](https://developer.apple.com/xcode/) 14.1. Wichtige Änderungen im Changelog vermerkt. |
| 4.x | 4.x.x | Benötigt Xcode 12.0. Wichtige Änderungen im Changelog vermerkt. |
| 3.x | 3.x.x | Benötigt Xcode 12.0. Wichtige Änderungen im Changelog vermerkt. |
| 2.x | 2.x.x | Benötigt Xcode 11.4. Wichtige Änderungen im Changelog vermerkt. |
| 1.x | 1.x.x |     |

Wenn Sie für iOS entwickeln, achten Sie besonders auf die Xcode-Versionsanforderungen. Die Verwendung einer inkompatiblen Version verhindert den erfolgreichen Build Ihrer App. Die Plugin-Dokumentation enthält detaillierte Kompatibilitätstabellen, die eine großartige Ressource für die Fehlerbehebung bei versionsbezogenen Problemen sind.

Wenn Sie nach der Installation auf Probleme stoßen, deinstallieren Sie die aktuelle Plugin-Version, installieren Sie die korrekte für Ihre Capacitor-Version und führen Sie den Sync-Befehl erneut aus. Diese Methode ist weitaus effektiver als zu versuchen, inkompatible Versionen zum Laufen zu bringen.

## Schritt 3: OAuth2-Authentifizierungsablauf erstellen

Mit Ihrem eingerichteten Plugin ist es Zeit, einen voll funktionsfähigen Authentifizierungsablauf zu erstellen. Dieser Schritt stellt die sichere Benutzeranmeldung, Token-Verwaltung und Abmeldung sicher und macht Ihre App fähig, Benutzersitzungen plattformübergreifend zu verwalten.

### Anmeldeablauf erstellen

Der Anmeldeprozess beginnt mit dem Aufruf von `authenticate()` mit einem Options-Objekt. Dieses Objekt sollte Ihre `authorizationBaseUrl`, `redirectUrl` und den `responseType` auf `'code'` gesetzt enthalten, um die PKCE-Anforderungen zu erfüllen. Das Plugin öffnet sicher die Anmeldeseite des Providers, wo Benutzer ihre Anmeldedaten eingeben können. Nach erfolgreicher Anmeldung leitet der Provider Benutzer mit Tokens und Benutzerdetails zurück zu Ihrer App.

Hier ist der beste Teil: Benutzer geben ihre Anmeldedaten direkt beim OAuth2-Provider ein, sodass Ihre App niemals Zugriff auf sensible Informationen hat. Die Methode gibt ein Antwortobjekt zurück, das den Zugriffstoken, Refresh-Token und Benutzerdaten wie E-Mail oder Profildetails enthält.

Auf iOS und Android verwendet dieser Prozess eine sichere Web-Ansicht, die Cookies mit dem System-Browser teilt. Auf Web-Plattformen basiert er auf Standard-Browser-Weiterleitungen. Die richtige Konfiguration Ihrer Redirect-URL gewährleistet eine reibungslose Benutzererfahrung unabhängig von der Plattform.

### Token-Speicherung und Aktualisierung handhaben

Sobald Benutzer angemeldet sind, ist die sichere Verwaltung von Tokens Ihre nächste Priorität. Dies umfasst die sichere Speicherung von Tokens und deren automatische Aktualisierung, um Sitzungsunterbrechungen zu vermeiden. Hier ist, wie Sie damit umgehen können:

Here's the German translation:

-   **Access Tokens**: Speichern Sie diese im Arbeitsspeicher für schnellen und temporären Zugriff.
-   **Refresh Tokens**: Nutzen Sie sichere Speicherung, wie das `capacitor-secure-storage` Plugin, das Tokens mit AES-256 über iOS Keychain oder [Android Keystore](https://developer.android.com/privacy-and-security/keystore) verschlüsselt. Dies stellt sicher, dass Tokens geschützt bleiben, selbst wenn das Gerät kompromittiert wird.

Wenn Ihre App neu startet, prüfen Sie auf gespeicherte Tokens, um Benutzer wieder anzumelden, ohne dass diese ihre Anmeldedaten erneut eingeben müssen.

| Speichermethode | Sicherheitsstufe | Leistung | Offline-Zugriff | Beste Anwendung |
| --- | --- | --- | --- | --- |
| **Sicherer Speicher** | AES-256 Hardware | Mittel | Ja | Refresh Tokens, langfristige Daten |
| **Arbeitsspeicher** | Hoch (temporär) | Hoch | Nein | Aktive Access Tokens |
| **Regulärer Speicher** | Niedrig | Hoch | Ja | Nicht-sensible Einstellungen |

Um Sitzungen aktiv zu halten, erneuern Sie Tokens bevor sie ablaufen. Prüfen Sie vor API-Aufrufen, ob das Access Token kurz vor dem Ablauf steht. Falls ja, nutzen Sie das Refresh Token, um ein neues Access Token von Ihrem OAuth2-Anbieter zu erhalten. Für zusätzliche Zuverlässigkeit implementieren Sie eine Logik, die die Token-Erneuerung wiederholt, wenn die Netzwerkverbindung wiederhergestellt wird. Wenn das Refresh Token abgelaufen oder widerrufen wurde, leiten Sie Benutzer zurück zum Login-Prozess zur erneuten Authentifizierung.

### Abmeldefunktion hinzufügen

Ein sicherer und effektiver Abmeldeprozess ist ebenso wichtig. Beginnen Sie mit dem Widerruf des Refresh Tokens über den Endpunkt des Anbieters. Löschen Sie dann Tokens aus dem sicheren Speicher und setzen Sie Benutzerdaten zurück, um sicherzustellen, dass alle Sitzungen beendet werden.

Das einfache Löschen lokaler Tokens reicht nicht aus. OAuth2-Anbieter behalten oft serverseitige Sitzungen bei, die Benutzer automatisch erneut authentifizieren könnten. Das Widerrufen des Refresh Tokens unterbricht die Token-Kette, die mit der Autorisierungsgenehmigung verknüpft ist, und stellt sicher, dass gespeicherte Anmeldedaten nicht wiederverwendet werden können.

> "JWT Access Tokens können nicht widerrufen werden. Sie sind gültig bis sie ablaufen. Da es sich um Bearer-Tokens handelt, gibt es keine Möglichkeit, sie ungültig zu machen." – lihua.zhang, Auth0 Mitarbeiter [\[5\]](https://community.auth0.com/t/invalidating-an-access-token-after-user-logout/101398)

Um Tokens zu widerrufen, rufen Sie den Token-Widerrufendpunkt des Anbieters mit dem Refresh Token auf, bevor Sie den lokalen Speicher löschen. Diese serverseitige Aktion verhindert Token-Missbrauch, selbst wenn Anmeldedaten kompromittiert wurden. Nach dem Widerruf entfernen Sie Tokens aus dem sicheren Speicher, setzen Sie zwischengespeicherte Benutzerdaten zurück und leiten Sie Benutzer zurück zum Anmeldebildschirm.

Bei Single Sign-On (SSO)-Konfigurationen entscheiden Sie, ob die Abmeldung auch Sitzungen für andere Apps beenden soll, die denselben Anbieter nutzen. Stellen Sie außerdem sicher, dass der Abmeldeprozess bei Netzwerkunterbrechungen reibungslos funktioniert, indem Sie Abmeldeanfragen lokal speichern und sie wiederholen, wenn die Verbindung wiederhergestellt ist. Dies gewährleistet eine ordnungsgemäße Bereinigung auf Anbieterseite.

## Schritt 4: Testen Sie Ihre OAuth2-Integration

Nach der Einrichtung Ihrer OAuth2-Konfiguration und der Entwicklung des Authentifizierungsablaufs ist der nächste Schritt das gründliche Testen. Dies stellt sicher, dass Ihre Integration nahtlos über Geräte und Plattformen hinweg funktioniert und Ihren Benutzern ein zuverlässiges Erlebnis bietet. Das Testen umfasst die Überprüfung der Funktionalität auf mobilen Geräten und Webbrowsern sowie die Identifizierung und Behebung potenzieller Probleme vor der Veröffentlichung Ihrer App.

### Testen auf iOS und Android

Beginnen Sie mit dem Testen des gesamten Authentifizierungsprozesses auf physischen iOS- und Android-Geräten.

-   **Für iOS**: Stellen Sie sicher, dass Ihr URL-Schema korrekt in der `Info.plist`-Datei konfiguriert ist und bestätigen Sie, dass Ihre App Weiterleitungen vom OAuth2-Anbieter ordnungsgemäß handhabt. Vermeiden Sie die Verwendung von `WKWebView` für Autorisierungsanfragen, da dies zu einem `disallowed_useragent`-Fehler führen kann. Verwenden Sie stattdessen Bibliotheken wie Google Sign-In für iOS oder OpenID Foundation's AppAuth für iOS, um Authentifizierungsabläufe effektiv zu handhaben [\[6\]](https://developers.google.com/identity/protocols/oauth2/native-app).
    
-   **Für Android**: Überprüfen Sie, ob Ihr `AndroidManifest.xml` die korrekten Intent-Filter für die Handhabung von Weiterleitungs-URIs enthält. Ähnlich wie bei iOS vermeiden Sie die Verwendung von `android.webkit.WebView` für Autorisierungsanfragen, da dies ebenfalls zu `disallowed_useragent`-Fehlern führen kann. Entscheiden Sie sich für Bibliotheken wie Google Sign-In oder OpenID AppAuth für Android [\[6\]](https://developers.google.com/identity/protocols/oauth2/native-app).
    

In beiden Fällen testen Sie Fehlerszenarios, wie einen nicht verfügbaren Autorisierungsserver [\[7\]](https://www.testim.io/blog/how-to-test-oauth-authentication). Wenn Ihre App mehrere Berechtigungen (Scopes) anfordert, überprüfen Sie, welche gewährt wurden und behandeln Sie Situationen, in denen einige verweigert werden könnten [\[6\]](https://developers.google.com/identity/protocols/oauth2/native-app).

### Testen im Web

Für Webplattformen verwenden Sie Entwicklertools, um Netzwerkanfragen zu überwachen und die Token-Sicherheit sicherzustellen. Tools wie OAuth 2.0 Playground können Ihnen beim Testen Ihres Ablaufs helfen [\[10\]](https://www.oauth.com/playground), während HTTP-Intercepting-Proxies wie [ZAP](https://www.zaproxy.org/) oder [BurpSuite](https://portswigger.net/burp) tiefere Einblicke während des Testens bieten [\[11\]](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/05-Testing_for_OAuth_Weaknesses).

Verwenden Sie beim Testen den Authorization Code Grant mit PKCE, da dies der empfohlene Ansatz für öffentliche Clients ist. Stellen Sie sicher, dass Geheimnisse sicher über POST-Parameter oder Header-Werte statt über URL-Parameter übertragen werden. Implementieren Sie zusätzlich Sicherheits-Header wie `Referrer-Policy` zum verbesserten Schutz [\[11\]](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/05-Testing_for_OAuth_Weaknesses).

### Häufige Probleme beheben

Während des Testens können Sie auf häufige Probleme stoßen, die behoben werden müssen:

-   **Falsche Weiterleitungs-URIs**: Nicht übereinstimmende Weiterleitungs-URIs verursachen oft "unauthorized client"-Fehler. Stellen Sie sicher, dass die Weiterleitungs-URI exakt über die Einstellungen Ihres OAuth2-Anbieters, die `capacitor.config.json`-Datei in Ihrer Capacitor-App und die nativen Plattform-Manifeste übereinstimmt.
    
    > "Die SSO-akzeptierte Route muss die Kombination aus iosScheme und hostname unterstützen: ionic://com.myapp.mybundle" - LBopp [\[8\]](https://forum.ionicframework.com/t/redirect-back-to-app-after-oauth2-oidc-login/201056)
    
-   **PKCE-Verifizierungsfehler**: Bestätigen Sie, dass PKCE unterstützt und korrekt konfiguriert ist, da es für die Sicherheit Ihrer App wesentlich ist [\[9\]](https://capacitorjs.com/docs/guides/security).
    
-   **Plugin-Implementierungsfehler**: Fehler wie "Plugin is not implemented on iOS" weisen typischerweise auf fehlende Konfigurationen oder Probleme innerhalb der Capacitor-Umgebung hin. Aktivieren Sie Logging in Ihrem OAuth2-Plugin, um diese Probleme zu identifizieren und zu beheben [\[4\]](https://github.com/capacitor-community/generic-oauth2).
    
-   **State-Mismatch-Fehler**: Wenn der State-Parameter in der Autorisierungsanfrage nicht mit dem in der Weiterleitungsantwort übereinstimmt, könnte dies auf ein Sicherheitsrisiko hinweisen. Dies ist besonders relevant bei der Verwendung benutzerdefinierter OAuth-Handler für Anbieter wie Facebook. Überprüfen Sie sorgfältig Ihren benutzerdefinierten Handler-Code auf Fehler oder Fehlkonfigurationen [\[4\]](https://github.com/capacitor-community/generic-oauth2).
    

## Schritt 5: Sichern Sie Ihre OAuth2-Implementierung

Der Schutz Ihrer OAuth2-Integration ist entscheidend für die Sicherung sensibler Daten und die Minimierung von Schwachstellen. Nachfolgend finden Sie wichtige Praktiken, um sicherzustellen, dass Ihre Implementierung sicher bleibt.

### Aktivieren Sie [PKCE](https://oauth.net/2/pkce/) für bessere Sicherheit

![PKCE](https://assets.seobotai.com/capgo.app/683598e6d3b96619818496d3/a1d07053135329feb5e83364c4428d00.jpg)

Eine der effektivsten Möglichkeiten, Ihren Autorisierungsablauf zu sichern, ist die Aktivierung von PKCE (Proof Key for Code Exchange). PKCE hilft, unbefugte Abfangversuche von Autorisierungscodes zu verhindern. So funktioniert es:

-   Beginnen Sie mit der Generierung eines zufälligen `code_verifier`, der zwischen 43 und 128 Zeichen lang ist.
-   Erstellen Sie dann eine `code_challenge`, indem Sie den `code_verifier` mit SHA-256 hashen und das Ergebnis im base64 URL-Format kodieren.

Wenn Sie das `capacitor-community/generic-oauth2`-Plugin verwenden, ist die Aktivierung von PKCE unkompliziert. Hier ist ein Beispiel für die Konfiguration:

```javascript
{
  responseType: "code",
  pkceEnable: true,
  redirectUrl: "com.companyname.appname:/"
}
```

Dieses Plugin handhabt PKCE automatisch und unterstützt den Code Flow nicht ohne es. Die `code_challenge_method` ist standardmäßig auf "S256" für ordnungsgemäße Validierung eingestellt [\[12\]](https://developer.constantcontact.com/api_guide/pkce_flow.html).

### Verwenden Sie sicheren Speicher für Tokens

Die sichere Speicherung von OAuth2-Tokens ist essentiell, um unbefugten Zugriff zu verhindern. Für native mobile Apps nutzen Sie den sicheren Speicher des Betriebssystems:

-   Unter iOS verwenden Sie die **Keychain** für hardwaregestützte Verschlüsselung und OS-Level-Schutz.
-   Unter Android verwenden Sie den **Keystore**, der auch [biometrische Authentifizierung](https://capgo.app/plugins/capacitor-native-biometric/) für zusätzliche Sicherheit unterstützen kann.

Für Webanwendungen speichern Sie Tokens in **HttpOnly secure cookies** mit dem `SameSite`-Attribut, um Cross-Site-Scripting (XSS)-Risiken zu minimieren.

Hier ist ein schneller Vergleich der sicheren Speicheroptionen:

| Speicheroption | Am besten für | Sicherheitsvorteile | Überlegungen |
| --- | --- | --- | --- |
| iOS Keychain | Native iOS-Apps | Hardwaregestützte Verschlüsselung und OS-Level-Schutz | Erfordert plattformspezifische Implementierung |
| Android Keystore | Native Android-Apps | Sicherer Speicher mit möglichem biometrischem Schutz | Variiert je nach Gerätesicherheitsfunktionen |
| HttpOnly Cookies | Webbrowser | Resistent gegen XSS und sichere automatische Übertragung | Muss für Same-Domain-API-Zugriff konfiguriert werden |
| Backend for Frontend | Alle Plattformen | Tokens werden nie dem Client ausgesetzt | Erfordert zusätzliche Server-Infrastruktur |

Für zusätzliche Sicherheit erwägen Sie die Verwendung kurzlebiger Access Tokens und verschlüsselter Speicherung. Zum Beispiel begrenzt Auth0 aktive Refresh Tokens auf 200 pro Benutzer pro Anwendung, um Risiken zu reduzieren [\[13\]](https://auth0.com/docs/secure/tokens/token-best-practices). Sie können die Sicherheit auch mit einem Backend for Frontend (BFF)-Proxy verbessern, der HttpOnly-Cookies verwendet [\[14\]](https://infinum.com/blog/secure-token-storage-oauth2).

### Content Security Policies einrichten

Neben sicherer Speicherung kann die Implementierung starker Content Security Policies (CSP) Ihre App vor Angriffen wie Cross-Site-Scripting (XSS) und Code-Injection schützen. Sie können CSP auf Server-Ebene über den `Content-Security-Policy` HTTP-Header oder durch Hinzufügen eines `<meta>` Tags in Ihrem HTML konfigurieren.

Wichtige Direktiven, auf die Sie sich konzentrieren sollten:

-   **default-src**: Legt Fallback-Regeln für alle Inhaltstypen fest.
-   **script-src**: Steuert, welche JavaScript-Dateien ausgeführt werden dürfen.
-   **connect-src**: Verwaltet API-Aufrufe und OAuth2-Interaktionen.
-   **frame-ancestors**: Verhindert Clickjacking durch Einschränkung, wer Ihre App in einem iframe einbetten darf.

Verwenden Sie für maximalen Schutz strenge Nonces oder Hashes anstelle breiter Zulassungslisten und vermeiden Sie Direktiven wie `unsafe-inline` oder `unsafe-eval`. Wenn Ihre App von HTTP zu HTTPS wechselt, erwägen Sie die Direktive `upgrade-insecure-requests`. Um sicherzustellen, dass Ihre OAuth2-Inhalte nicht anderswo eingebettet werden können, setzen Sie `frame-ancestors 'none'`.

## Fazit und nächste Schritte

### Wichtige Erkenntnisse

Sie haben erfolgreich OAuth2-Authentifizierung in Ihrer Capacitor-App implementiert, indem Sie fünf Kernschritte befolgt haben. Dazu gehörten das Einrichten Ihres OAuth2-Providers, die Installation der erforderlichen Plugins, die Erstellung des Authentifizierungsablaufs, das Testen auf verschiedenen Plattformen und die Absicherung Ihrer Integration mittels PKCE und korrekter Token-Speicherung. Es ist wichtig zu beachten, dass OAuth 2.0 ein **Autorisierungsprotokoll** ist, kein Authentifizierungsprotokoll [\[1\]](https://auth0.com/intro-to-iam/what-is-oauth-2). Der Hauptfokus liegt auf der Gewährung von Zugriff und nicht auf der Überprüfung der Benutzeridentität.

Sicherheit ist besonders für mobile Apps entscheidend. Organisationen, die OAuth 2.0 nutzen, berichten von einem 34% Rückgang bei API-Zugriffssicherheitsvorfällen im Vergleich zu denen, die sich auf grundlegende Authentifizierungsmethoden verlassen [\[19\]](https://api7.ai/es/learning-center/api-101/oauth-2.0-secure-api-access). Durch die Einbindung bewährter Praktiken - wie die Verwendung kurzlebiger Zugriffstoken, die Implementierung von PKCE und die sichere Speicherung von Tokens - haben Sie eine solide Grundlage für das Authentifizierungssystem Ihrer App geschaffen.

Jetzt können Sie Möglichkeiten erkunden, die Funktionalität Ihrer App zu erweitern und dabei diesen sicheren Rahmen beizubehalten.

### Weitere Funktionen hinzufügen

Mit implementiertem OAuth2 haben Sie die Möglichkeit, Ihre App um zusätzliche Funktionen zu erweitern. Zum Beispiel:

-   **[OpenID Connect](https://openid.net/developers/how-connect-works/) (OIDC)**: Erweitern Sie OAuth 2.0 um Benutzerauthentifizierung und Single Sign-On (SSO) Funktionen [\[16\]](https://developer.okta.com/docs/concepts/oauth-openid).
-   **Multi-Faktor-Authentifizierung (MFA)**: Erhöhen Sie die Sicherheit durch eine zusätzliche Schutzebene [\[17\]](https://blog.saaspass.com/multi-factor-authentication-mfa-with-openid-connect-protocol-d6b64c49c99c).
-   **Progressive Profiling**: Sammeln Sie schrittweise Benutzerdaten zur Verbesserung des Onboardings und der Benutzererfahrung [\[15\]](https://www.descope.com/blog/post/oauth2-react-authentication-authorization).

Für die laufende Wartung und Updates erwägen Sie Tools wie [Capgo](https://capgo.app/), mit dem Sie Live-Updates, Fehlerbehebungen und neue Funktionen sofort bereitstellen können - ohne auf App-Store-Genehmigungen warten zu müssen. Dies kann besonders nützlich sein, um Sicherheitspatches zu behandeln oder neue Authentifizierungsfunktionen schnell einzuführen.

### Weitere Ressourcen

Um Ihre OAuth2-Implementierung weiter zu verbessern, nutzen Sie diese Ressourcen und Strategien:

-   **API Gateway Sicherheit**: Stärken Sie Ihre Bereitstellung durch Implementierung von Authentifizierungs- und Autorisierungsmaßnahmen, Caching sowie robustem Logging und Analytics [\[20\]](https://moldstud.com/articles/p-best-practices-for-deploying-api-gateways-in-production).
    
-   **Aaron Pareckis Rat**: Laut Aaron Parecki, Autor von _OAuth 2.0 Simplified_:
    
    > "Der Authorization Code Flow ist der sicherste der OAuth 2.0 Flows und sollte wann immer möglich für serverseitige Anwendungen verwendet werden" [\[18\]](https://blog.dreamfactory.com/implementing-oauth-2.0-in-rest-apis-complete-guide).
    

Hier ist eine schnelle Referenztabelle für Ihre nächsten Schritte:

| Phase | Hauptfokusgebiete |
| --- | --- |
| Systemkonfiguration | Token-Lebenszyklen verwalten, HTTPS erzwingen und sensible Informationen sicher speichern |
| Token-Management | Kurzlebige Zugriffstoken verwenden und Refresh-Tokens rotieren |
| Validierungsprozess | Signaturen verifizieren und Token-Ablauf prüfen |

Bleiben Sie durch regelmäßige Sicherheitsaudits und Aktualisierung Ihrer Implementierung auf dem neuesten Stand. OAuth 2.1 führt beispielsweise Verbesserungen ein, wie die Anforderung von PKCE für alle Autorisierungscode-Anfragen und die Abschaffung weniger sicherer Flows [\[19\]](https://api7.ai/es/learning-center/api-101/oauth-2.0-secure-api-access). Zusätzlich bieten die Capacitor-Dokumentation und OAuth2-Plugin-Repositories fortlaufende technische Unterstützung, um das Authentifizierungssystem Ihrer App zu pflegen und zu verbessern.

## FAQs

::: faq
### Warum sollte ich den Authorization Code Flow mit PKCE für OAuth2 in mobilen Apps verwenden?

## Warum den Authorization Code Flow mit PKCE für mobile Apps nutzen?

Der **Authorization Code Flow mit PKCE** ist die bevorzugte Wahl für mobile Apps, da er die Sicherheit erhöht, indem er Risiken wie Autorisierungscode-Abfangen und Man-in-the-Middle-Angriffe adressiert. PKCE (Proof Key for Code Exchange) funktioniert durch Hinzufügen einer zusätzlichen Schutzebene: Es erfordert eine einzigartige Code-Challenge, die der Autorisierungsserver validiert. Dies stellt sicher, dass nur die beabsichtigte App den Authentifizierungsprozess abschließen kann.

Mobile Apps, die als öffentliche Clients eingestuft werden, können keine Client-Secrets sicher speichern. Hier kommt PKCE ins Spiel - es ermöglicht die sichere Authentifizierung von Benutzern ohne Preisgabe sensibler Daten. Das Ergebnis? Ein sichererer, zuverlässigerer Anmeldeprozess, der die gesamte Benutzererfahrung verbessert.
:::

::: faq
### Was ist der beste Weg, OAuth2-Tokens in iOS-, Android- und Web-Apps sicher zu speichern?

Um OAuth2-Tokens auf verschiedenen Plattformen sicher aufzubewahren, ist es wichtig, **plattformspezifische sichere Speicherlösungen** zu verwenden. Für iOS ist die bevorzugte Option Keychain Services, während Android-Nutzer sich auf das Android Keystore System verlassen sollten. Diese Tools wurden speziell entwickelt, um sensible Daten einschließlich Tokens zu schützen. Im Web können sichere Cookies oder verschlüsselter Browser-Speicher als effektive Alternativen dienen.

Die Hinzufügung von Verschlüsselung, wie AES-256, bietet eine zusätzliche Sicherheitsebene für Tokens. Die Verwendung von **kurzlebigen Tokens** und deren sichere Erneuerung bei Bedarf reduziert das Risiko weiter. Die Implementierung von **PKCE (Proof Key for Code Exchange)** während des OAuth2-Prozesses ist ein weiterer kluger Schritt, um unberechtigten Zugriff zu blockieren. Für noch stärkeren Schutz erwägen Sie die Integration biometrischer Authentifizierung, die sicherstellt, dass nur der rechtmäßige Benutzer auf die gespeicherten Tokens zugreifen kann.
:::

::: faq
### Was sind die häufigsten Probleme beim Testen der OAuth2-Integration in Capacitor-Apps und wie können sie behoben werden?

Bei der Testung der OAuth2-Integration in Capacitor-Apps können Entwickler auf einige häufige Hindernisse stoßen. Hier ist ein schneller Überblick, worauf Sie achten sollten:

-   **Ungültige Client-Anmeldedaten**: Stellen Sie sicher, dass Ihre Client-ID und Secret korrekt eingerichtet sind und mit den Details in der Konfiguration Ihres OAuth-Providers übereinstimmen. Selbst ein kleiner Tippfehler kann Probleme verursachen.
-   **Redirect-URI-Fehlanpassung**: Die Redirect-URI in Ihrer App muss exakt mit der beim OAuth-Provider registrierten übereinstimmen. Überprüfen Sie dies, um unnötige Kopfschmerzen zu vermeiden.
-   **Token-Ablauf**: Tokens haben keine unbegrenzte Gültigkeit. Richten Sie ein zuverlässiges Token-Erneuerungssystem ein, um abgelaufene Tokens reibungslos zu behandeln und die Benutzererfahrung unterbrechungsfrei zu halten.
-   **Scope-Fehlkonfiguration**: Die in Ihrer App angeforderten Scopes müssen mit denen in Ihrem OAuth-Provider konfigurierten übereinstimmen. Nicht übereinstimmende Scopes können zu unerwarteten Fehlern führen.

Um diese Probleme anzugehen, nehmen Sie sich Zeit, das OAuth-Setup Ihrer App gründlich zu überprüfen. Implementieren Sie eine robuste Fehlerbehandlung, um Probleme frühzeitig zu erkennen und zu beheben, und testen Sie Ihren Authentifizierungsablauf unter verschiedenen Szenarien. Tools wie Capgo können das Leben erleichtern, indem sie es ermöglichen, Updates und Fehlerbehebungen direkt an Ihre App zu pushen, ohne auf App-Store-Genehmigungen warten zu müssen, wodurch die Entwicklung effizient und die Benutzer zufrieden bleiben.
:::
