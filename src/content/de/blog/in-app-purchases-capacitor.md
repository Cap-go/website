---
slug: in-app-purchases-capacitor
title: In-App-Käufe für Capacitor
description: >-
  Wie man In-App-Käufe für Capacitor-Apps mithilfe des Capacitor
  Purchases-Plugins und RevenueCat implementiert
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: In-App-Käufe mit Revenue Cat
tag: Tutorial
published: true
locale: de
next_blog: ''
---

Capacitor Purchases ist ein Plugin für das Capacitor-Framework, das In-App-Käufe auf iOS und Android ermöglicht. Es bietet eine einfache und konsistente API über mehrere Plattformen hinweg und erleichtert Entwicklern die Implementierung von In-App-Abonnements und -Käufen in ihren mobilen Apps.

Eine der Hauptfunktionen des Capacitor Purchases-Plugins ist die Integration mit RevenueCat, einer Plattform, die Tools für In-App-Abonnements und In-App-Käufe bereitstellt. RevenueCat vereinfacht den Prozess der Implementierung von In-App-Abonnements und -Käufen, indem es eine einfache und konsistente API über mehrere Plattformen hinweg bereitstellt und Aufgaben wie Belegvalidierung und Benutzerverwaltung automatisiert.

Mit RevenueCat können Entwickler problemlos Abonnements verwalten, Einnahmen verfolgen und andere damit verbundene Aufgaben ausführen. Einige von RevenueCat angebotene Funktionen umfassen:

- Automatisierte Belegvalidierung
- Benutzerverwaltung
- Unterstützung für benutzerdefinierte Preismodelle
- Detaillierte Analysen
- Skalierbarkeit

Durch die Verwendung des Capacitor Purchases-Plugins mit RevenueCat können Entwickler Zeit und Aufwand bei der Implementierung von In-App-Abonnements und -Käufen in ihren mobilen Apps sparen und zusätzliche Funktionen bereitstellen, die dazu beitragen können, die Benutzererfahrung zu verbessern und den Umsatz zu steigern.

Mit dem Capacitor Purchases-Plugin und RevenueCat können Entwickler In-App-Abonnements und -Käufe einfach verwalten und verfolgen, Belege validieren und Benutzer über mehrere Plattformen hinweg verwalten. Es ermöglicht auch die Erstellung benutzerdefinierter Preismodelle und liefert detaillierte Analysen zur Verbesserung der Leistung und des Umsatzes.

## Installation

Stellen Sie sicher, dass Sie die neueste Version von Capacitor und dem Capacitor Purchases-Plugin verwenden. Sie können die neueste Version von Capacitor und dem Capacitor Purchases-Plugin auf der Capacitor-Website überprüfen.

Um das Capacitor Purchases-Plugin zu installieren, führen Sie den folgenden Befehl aus:
`npm i @capgo/capacitor-purchases`
Fügen Sie das Plugin zu Ihrem App-Nativcode hinzu:
`npx cap sync`

Fügen Sie die Fähigkeit für In-App-Käufe in Xcode hinzu:

## 1. Erstellen Sie ein RevenueCat-Konto
Diese Anleitung führt Sie durch die Einrichtung von Abonnements und RevenueCat's SDK mit nur wenigen Codezeilen.

Melden Sie sich für ein neues RevenueCat-Konto [hier](https://app.revenuecat.com/) an.

> ### 📘
> 
> 💡 Hier ist ein Tipp!
> 
> RevenueCat empfiehlt, für jede App / jedes Projekt ein separates RevenueCat-Konto zu erstellen, insbesondere wenn Sie vorhaben, die App zu verkaufen. Dies beschleunigt den Übertragungsprozess, da Sie das gesamte Konto übertragen können, anstatt darauf zu warten, dass der RevenueCat-Support einzelne Projekte überträgt.

### Organisationen / Unternehmen

Wir empfehlen die Verwendung eines Firmenkontos bei der Registrierung für RevenueCat und der Einrichtung Ihrer App innerhalb eines Projekts. Sie können den Rest Ihres Teams als [Mitarbeiter](https://www.revenuecat.com/docs/collaborators/) zu Ihrem Projekt einladen, aber **nur der Projektbesitzer kann die Abrechnung verwalten**. Projektmitarbeiter können keine Abrechnungsdetails verwalten.

## 2. Projekt- und App-Konfiguration

### ▶️ Projekt erstellen

Navigieren Sie zum RevenueCat-Dashboard und [fügen Sie ein neues Projekt hinzu](https://app.revenuecat.com/overview/) aus dem Dropdown-Menü in der oberen Navigationsleiste namens _Projekte_.

Das Popup-Modal zum Erstellen eines neuen Projekts

### ▶️ App / Plattform hinzufügen

Wählen Sie in **Projekteinstellungen > Apps** im linken Menü des Projekt-Dashboards die Plattform für die App aus, die Sie hinzufügen möchten.

Projekt-Dashboard zur Auswahl der App-Plattform

Das Feld **App-Name** ist erforderlich, um Ihre App zu RevenueCat hinzuzufügen. Die restlichen Konfigurationsfelder können später hinzugefügt werden. Um Test- und Produktionskäufe durchzuführen, müssen die Bundle-ID (iOS) / Paketname (Android) sowie das Shared Secret (iOS) / Service-Anmeldeinformationen (Android) konfiguriert werden.webp)

Konfigurationsseite für eine Apple App Store App

> ### 📘
> 
> 💡 Hier ist ein Tipp!
> 
> Nach der Registrierung Ihrer App empfiehlt RevenueCat, [Platform Server Notifications](https://wwwrevenuecatcom/docs/server-notifications/) einzurichten. Diese Benachrichtigungen sind nicht erforderlich, beschleunigen aber [Webhooks](https://wwwrevenuecatcom/docs/webhooks/) und Integrationslieferzeiten und reduzieren die Verzögerung bei der Aktualisierung Ihrer Abonnenten.

> ### 📘
> 
> Staging vs. Produktions-Apps und -Benutzer
> 
> RevenueCat selbst hat keine getrennten Umgebungen für Staging und Produktion. Vielmehr werden die zugrunde liegenden Transaktionen für Benutzer durch Sandbox und Produktion unterschieden.
> 
> Jede RevenueCat-App kann sowohl Sandbox- als auch Produktionskäufe in den Stores tätigen. Wenn Sie separate Apps für Staging und Produktion haben, können Sie mehrere Projekte in RevenueCat erstellen, um Ihr Setup widerzuspiegeln.
> 
> Darüber hinaus werden Benutzer nicht nach Umgebung getrennt. Derselbe Benutzer kann gleichzeitig aktive Sandbox-Käufe und aktive Produktionskäufe haben.

### ▶️ Service-Anmeldeinformationen

Service-Anmeldeinformationen müssen eingerichtet werden, damit RevenueCat in Ihrem Namen mit den App Stores kommunizieren kann. Siehe RevenueCat-Anleitungen [App Store Connect Shared Secret](https://wwwrevenuecatcom/docs/itunesconnect-app-specific-shared-secret/), [Play Service Credentials](https://wwwrevenuecatcom/docs/creating-play-service-credentials/) und [Amazon Appstore Shared Secret](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/) für weitere Informationen.

Beachten Sie, dass es bis zu 36 Stunden dauern kann, bis sich Play Service-Anmeldeinformationen in Googles Servern verbreitet haben.

## 3. Produktkonfiguration

### ▶️ Store-Einrichtung

Bevor Sie RevenueCat zum Abrufen von Produkten verwenden können, müssen Sie Ihre Produkte in den jeweiligen Stores konfigurieren. Siehe die folgenden Anleitungen für [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) und [Stripe](https://wwwrevenuecatcom/docs/stripe-products/) für Hilfe bei der Navigation durch diesen Prozess.

Wenn Sie iOS-Produkte verkaufen, stellen Sie sicher, dass Sie Ihre 'Paid Applications Agreement' unterzeichnen und Ihre Bank- und Steuerinformationen in **App Store Connect > Agreements, Tax, and Banking** ausfüllen. **Dies muss abgeschlossen sein, bevor Sie Käufe testen können.**

> ### 📘
> 
> Möchten Sie die Store-Einrichtung beim Testen überspringen?
> 
> Unter iOS können Sie die Konfiguration von Produkten in App Store Connect verzögern, indem Sie stattdessen mit StoreKit-Konfigurationsdateien testen. Diese Konfigurationsdateien erfordern minimale Einrichtung und sind direkt über Xcode konfigurierbar.
> 
> Lesen Sie mehr über die Einrichtung von StoreKit-Konfigurationsdateien im RevenueCat [Sandbox Testing](https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) Leitfaden.

### ▶️ Konfigurieren Sie Produkte und Berechtigungen in RevenueCat

Sobald Ihre In-App-Produkte in [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) oder [Stripe](https://wwwrevenuecatcom/docs/stripe-products/) konfiguriert wurden, müssen Sie diese Konfiguration in das RevenueCat-Dashboard kopieren. RevenueCat verwendet ein Berechtigungssystem, um den Zugriff auf Premium-Funktionen zu steuern, und Angebote, um den Satz von Produkten zu verwalten, die Sie Kunden anbieten.

Berechtigungen sind das Zugriffsrecht, das ein Kunde nach dem Kauf eines bestimmten Produkts "berechtigt" ist.
Angebote sind eine einfache Möglichkeit für Sie, die In-App-Produkte zu organisieren, die Sie auf Ihrer Paywall anbieten möchten, und sie ferngesteuert zu konfigurieren. RevenueCat **empfiehlt** die Nutzung dieser Funktionen, um Ihren Code zu vereinfachen und es Ihnen zu ermöglichen, Produkte ohne App-Update zu ändern.

Siehe [Configuring Products](https://wwwrevenuecatcom/docs/entitlements/), um Ihre Produkte einzurichten und sie dann in Angebote oder Berechtigungen zu organisieren.

![RevenueCat Schritt 4](/revenuecat_step4webp)

## 4Verwendung des RevenueCat Purchases SDK

RevenueCat SDK implementiert nahtlos Käufe und Abonnements über Plattformen hinweg und synchronisiert dabei Token mit dem RevenueCat-Server

Bei Problemen mit dem SDK finden Sie in [Fehlerbehebung der SDKs](https://wwwrevenuecatcom/docs/troubleshooting-the-sdks/) Hilfestellung

> ### 📘
> 
> Verwenden Sie nur Ihren öffentlichen SDK-Schlüssel, um Purchases zu konfigurieren
> 
> Sie finden Ihren öffentlichen SDK-Schlüssel unter dem Reiter **API-Schlüssel** in den **Projekteinstellungen** im Dashboard

Sie sollten die gemeinsam genutzte Instanz von _Purchases_ nur einmal konfigurieren, üblicherweise beim App-Start. Anschließend wird dieselbe Instanz in Ihrer gesamten App geteilt, indem Sie auf die `shared`-Instanz im SDK zugreifen

Weitere Informationen und Best Practices finden Sie im RevenueCat-Leitfaden zur [SDK-Konfiguration](https://docsrevenuecatcom/docs/configuring-sdk/)

Stellen Sie sicher, dass Sie _Purchases_ nur mit Ihrem öffentlichen SDK-Schlüssel konfigurieren. Mehr über die verschiedenen verfügbaren API-Schlüssel in RevenueCat finden Sie im [Authentifizierungsleitfaden](https://wwwrevenuecatcom/docs/authentication/)

```javascript
import { CapacitorPurchases } from '@capgo/capacitor-purchases'
import { isPlatform } from '@ionic/vue' // use the right one for your framework

CapacitorPurchases.setDebugLogsEnabled({ enabled: import.meta.env.DEV }) // Enable to get debug logs in dev mode
if (isPlatform('ios')) {
    CapacitorPurchases.setup({ apiKey:'appl_******'})
} else if (isPlatform('android')) {
    CapacitorPurchases.setup({ apiKey:'goog_******'})
}
```

Während der Entwicklung empfiehlt RevenueCat, ausführlichere Debug-Logs zu aktivieren. Weitere Informationen zu diesen Logs finden Sie in ihrem [Debugging](https://wwwrevenuecatcom/docs/debugging/)-Leitfaden

Wenn Sie RevenueCat neben Ihrem bestehenden Kaufcode verwenden möchten, konsultieren Sie ihren Leitfaden zum [Beobachtermodus](https://wwwrevenuecatcom/docs/observer-mode/)

> ### 📘
> 
> Konfiguration von Purchases mit Benutzer-IDs
> 
> Wenn Sie ein Benutzerauthentifizierungssystem in Ihrer App haben, können Sie zum Zeitpunkt der Konfiguration oder zu einem späteren Zeitpunkt mit einem Aufruf von `logIn()` eine Benutzerkennung bereitstellen. Weitere Informationen finden Sie im RevenueCat-Leitfaden zur [Benutzeridentifizierung](https://wwwrevenuecatcom/docs/user-ids/)

Das SDK ruft automatisch die [konfigurierten Angebote](https://wwwrevenuecatcom/docs/entitlements/#offerings) ab und holt die Produktinformationen von Apple, Google oder Amazon. Somit sind verfügbare Produkte bereits geladen, wenn Kunden Ihren Kaufbildschirm aufrufen

Nachfolgend ein Beispiel zum Abrufen von Angeboten. Sie können Angebote nutzen, um Ihren Paywall-Bildschirm zu organisieren. Weitere Informationen und Best Practices finden Sie im RevenueCat-Leitfaden zur [Anzeige von Produkten](https://wwwrevenuecatcom/docs/displaying-products/)

### ▶️ Verfügbare Produkte abrufen und anzeigen

> ### 📘
> 
> Konfiguration von Purchases mit Benutzer-IDs
> 
> Wenn Sie ein Benutzerauthentifizierungssystem in Ihrer App haben, können Sie zum Zeitpunkt der Konfiguration oder zu einem späteren Zeitpunkt mit einem Aufruf von `logIn()` eine Benutzerkennung bereitstellen. Weitere Informationen finden Sie im RevenueCat-Leitfaden zur [Benutzeridentifizierung](https://wwwrevenuecatcom/docs/user-ids/)

Das SDK ruft automatisch die [konfigurierten Angebote](https://wwwrevenuecatcom/docs/entitlements/#offerings) ab und holt die Produktinformationen von Apple, Google oder Amazon. Somit sind verfügbare Produkte bereits geladen, wenn Kunden Ihren Kaufbildschirm aufrufen

Nachfolgend ein Beispiel zum Abrufen von Angeboten. Sie können Angebote nutzen, um Ihren Paywall-Bildschirm zu organisieren. Weitere Informationen und Best Practices finden Sie im RevenueCat-Leitfaden zur [Anzeige von Produkten](https://wwwrevenuecatcom/docs/displaying-products/)

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Wenn das Abrufen Ihrer [Angebote](https://wwwrevenuecatcom/docs/entitlements/#offerings), [Produkte](https://wwwrevenuecatcom/docs/entitlements/#products) oder verfügbaren [Pakete](https://wwwrevenuecatcom/docs/entitlements/#adding-packages) leer ist, liegt das an einem Konfigurationsproblem im jeweiligen Store

Die häufigsten Gründe dafür im App Store Connect sind eine veraltete 'Paid Applications Agreement' oder Produkte, die sich nicht mindestens im Status 'Ready To Submit' befinden. In GooglePlay tritt dies in der Regel auf, wenn die App nicht auf einem geschlossenen Track veröffentlicht und ein gültiger Testbenutzer hinzugefügt wurde

Weitere Informationen zur Fehlerbehebung dieses Problems finden Sie im RevenueCat [Help Center](https://supportrevenuecatcom/hc/en-us/articles/360041793174/)

### ▶️ Einen Kauf tätigen

Das SDK enthält eine einfache Methode zur Durchführung von KäufenDie `purchase:package`-Methode nimmt ein Paket aus dem abgerufenen Angebot und verarbeitet die Transaktion mit dem jeweiligen App Store.

Das folgende Codebeispiel zeigt den Prozess des Kaufs eines Pakets und der Bestätigung, dass es den Inhalt "your_entitlement_id" freischaltet. Weitere Details zur `purchase:package`-Methode finden Sie im RevenueCat-Leitfaden zu [Käufen tätigen](https://www.revenuecat.com/docs/making-purchases/).

### ▶️ Abonnementstatus prüfen

Sie können diese Methode verwenden, wann immer Sie den aktuellsten Status benötigen, und es ist sicher, diese Methode wiederholt während des Lebenszyklus Ihrer App aufzurufen. _Purchases_ speichert automatisch die neuesten `CustomerInfo`-Daten im Cache, wann immer sie aktualisiert werden - in den meisten Fällen greift diese Methode also auf den Cache zu und läuft sehr schnell.

Es ist üblich, diese Methode aufzurufen, wenn entschieden wird, welche Benutzeroberfläche dem Nutzer angezeigt werden soll, und wann immer der Nutzer eine Aktion durchführt, die eine bestimmte Berechtigungsstufe erfordert.

> ### 📘
> 
> 💡 Hier ein Tipp!
> 
> Sie können viel mehr Informationen über ein Abonnement abrufen, als nur ob es aktiv ist oder nicht. Sehen Sie sich den RevenueCat-Leitfaden zum [Abonnementstatus](https://www.revenuecat.com/docs/customer-info/) an, um zu erfahren, ob das Abonnement zur Erneuerung vorgesehen ist, ob ein Problem mit der Kreditkarte des Benutzers erkannt wurde und mehr.

RevenueCat ermöglicht es Ihren Nutzern, ihre In-App-Käufe wiederherzustellen und alle Inhalte zu reaktivieren, die sie zuvor über dasselbe Store-Konto (Apple-, Google- oder Amazon-Konto) gekauft haben. Wir empfehlen, dass alle Apps eine Möglichkeit für Benutzer haben, die Wiederherstellungsmethode auszulösen. Beachten Sie, dass Apple einen Wiederherstellungsmechanismus für den Fall verlangt, dass ein Benutzer den Zugang zu seinen Käufen verliert (z.B. durch Deinstallieren/Neuinstallieren der App, Verlust der Kontoinformationen usw.).

Wenn zwei verschiedene [App-Benutzer-IDs](https://www.revenuecat.com/docs/user-ids/) Transaktionen aus demselben zugrunde liegenden Store-Konto (Apple-, Google- oder Amazon-Konto) wiederherstellen,
kann RevenueCat versuchen, einen Alias zwischen den beiden App-Benutzer-IDs zu erstellen und sie in Zukunft als denselben Benutzer zu zählen. Weitere Informationen zu den verschiedenen konfigurierbaren Wiederherstellungsverhalten finden Sie im RevenueCat-Leitfaden zur [Wiederherstellung von Käufen](https://www.revenuecat.com/docs/restoring-purchases/).

Da das SDK nahtlos auf jeder Plattform funktioniert, können Änderungen an den Kaufinformationen eines Benutzers aus verschiedenen Quellen stammen. Sie können auf Änderungen in den `CustomerInfo`-Daten eines Kunden reagieren, indem Sie eine optionale Delegatenmethode, `purchases:receivedUpdated:`, implementieren.

Diese Methode wird ausgelöst, wenn das SDK ein aktualisiertes `CustomerInfo`-Objekt von Aufrufen an `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)` oder `restorePurchases()` erhält.

CustomerInfo-Aktualisierungen werden _nicht_ vom RevenueCat-Backend an Ihre App gesendet, Aktualisierungen können nur durch eine ausgehende Netzwerkanfrage an RevenueCat erfolgen, wie oben erwähnt.

Je nach Ihrer App kann es ausreichen, den Delegaten zu ignorieren und Änderungen an Kundeninformationen einfach beim nächsten Start Ihrer App oder in den Abschlussblöcken der SDK-Methoden zu behandeln.

> ### 👍
> 
> Sie haben es geschafft!
> 
> Sie haben nun ein vollständiges Abonnement-Kaufsystem implementiert, ohne einen Monat lang Servercode zu schreiben. Herzlichen Glückwunsch!

### Beispiel-Apps

Um weitere vollständige Beispiele für die Integration des SDK herunterzuladen, gehen Sie zu den Ressourcen für RevenueCat-Beispiel-Apps.

**[Beispiele ansehen](https://www.revenuecat.com/docs/sample-apps/)**

Ich werde bald eine Beispiel-App mit Capacitor und Vuejs veröffentlichen.

Wenn Sie eine tiefere Nutzung des Capacitor SDK benötigen, überprüfen Sie die Dokumentation [hier](https://github.com/Cap-go/capacitor-purchases/).

### Nächste Schritte

- Wenn Sie es noch nicht getan haben, stellen Sie sicher, dass Ihre Produkte korrekt konfiguriert sind, indem Sie den RevenueCat-[Leitfaden zu Berechtigungen](https://www.revenuecat.com/docs/entitlements/) überprüfen.
- Wenn Sie Ihre eigenen Benutzeridentifikatoren verwenden möchten, lesen Sie über das [Festlegen von App-Benutzer-IDs](https://www.revenuecat.com/docs/user-ids/).
- Wenn Sie von einem anderen System zu RevenueCat wechseln, lesen Sie den RevenueCat-Leitfaden zur [Migration Ihrer bestehenden Abonnements](https://www.revenuecatcom/docs/migrating-existing-subscriptions/)
-   Sobald Sie bereit sind, Ihre Integration zu testen, können Sie den RevenueCat-Leitfaden zum [Testen und Debuggen](https://wwwrevenuecatcom/docs/debugging/) befolgen
-   Wenn Sie für das App Store Small Business Program qualifiziert sind, sehen Sie sich den RevenueCat-Leitfaden zur [Bewerbung und Information von RevenueCat](https://wwwrevenuecatcom/docs/app-store-small-business-program/) an


Wenn Sie Live-Updates in Ihrer App benötigen

Schließen Sie sich uns hier an 👇

## Registrieren Sie sich hier, um Ihr Konto zu erhalten

[Capgo](/register/)