---
slug: capacitor-cli-commands-for-version-updates
title: Comandos de la CLI de Capacitor para Actualizaciones de Versión
description: Capacitor CLIを使用してアプリを更新するための基本的なコマンドとベストプラクティスを学び、最適なパフォーマンスと互換性を確保しましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-11T21:28:20.329Z
updated_at: 2025-05-11T21:29:40.056Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/682028f45e3fe4823b5e5a52-1746998980056.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, CLI, app updates, mobile development, iOS, Android, migration,
  Capgo, plugins
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI vereinfacht [das Aktualisieren Ihrer App](https://capgo.app/plugins/capacitor-updater/) für iOS und Android. Hier ist, was Sie wissen müssen:

1.   **Warum aktualisieren?** Sicher bleiben, die Leistung verbessern und die Kompatibilität mit den neuesten mobilen Betriebssystemversionen sicherstellen.
2.   **Wichtige Befehle:** Verwenden Sie `npm install @capacitor/cli@latest`, um Capacitor CLI zu aktualisieren, `npx cap migrate`, um Änderungen anzuwenden, und `npx cap sync`, um die [Updates abzuschließen](https://capgo.app/docs/plugin/cloud-mode/hybrid-update).
3.   **Plattformspezifische Schritte:** Aktualisieren Sie iOS mit [CocoaPods](https://cocoapods.org/) (`pod install`) und [Xcode](https://developer.apple.com/xcode/) Einstellungen. Für Android passen Sie die [Gradle](https://gradle.org/) Konfigurationen an und überprüfen die Java-Versionen.
4.   **Verwenden Sie [Capgo](https://capgo.app/) für Live-Updates:** Änderungen sofort ohne Verzögerungen im App-Store bereitstellen, mit Funktionen wie Rollback und Echtzeitanalysen.

Updating stellt sicher, dass Ihre App effizient und benutzerfreundlich bleibt. Befolgen Sie die obigen Schritte für einen reibungslosen Prozess.

## So migrieren Sie Ihre Ionic-App zu [Capacitor](https://capacitorjs.com/) 3

![Capacitor](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/d5H729a-rBM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Bevor Sie aktualisieren

Sich die Zeit zu nehmen, um sich vor der Aktualisierung vorzubereiten, kann Ihnen später Kopfschmerzen ersparen. Ein wenig Vorarbeit hilft, häufige Fallstricke zu vermeiden und sicherzustellen, dass alles reibungslos läuft. Hier ist, worauf Sie sich konzentrieren sollten, um Risiken während des [Aktualisierungsprozesses](https://capgo.app/docs/plugin/cloud-mode/manual-update/) zu minimieren.

### Überprüfen Sie die Systemanforderungen

Das Wichtigste zuerst - stellen Sie sicher, dass Ihre Entwicklungsumgebung die Anforderungen für Capacitor erfüllt. Die Versionen 6 und 7 haben spezifische Softwarebedarfe [\[1\]](https://capgo.app).

Hier ist, was Sie überprüfen sollten:

1.   **Node.js**: Überprüfen Sie, dass Ihre Node.js-Version kompatibel ist.
2.   **Plattformspezifische Tools**:
    -   Für die iOS-Entwicklung sicherstellen, dass die neueste Version von Xcode installiert ist.
    -   Für Android bestätigen, dass [Android Studio](https://developer.android.com/studio) auf dem neuesten Stand ist.

### Lesen Sie die Aktualisierungsnotizen

Aktualisierungsnotizen sind Ihre Landkarte, um zu verstehen, wie sich die Änderungen auf Ihr Projekt auswirken könnten. Nehmen Sie sich die Zeit, Folgendes zu überprüfen:

1.   **Offizielle Dokumentation**: Durchblättern Sie das Änderungsprotokoll und die Migrationsanleitungen von Capacitor.
2.   **Breaking Changes**: Achten Sie besonders auf Abschnitte mit der Bezeichnung "Breaking Changes." Diese heben oft wichtige Updates hervor, die Ihren Arbeitsablauf stören könnten.
3.   **Plugin-Kompatibilität**: Überprüfen Sie, dass alle Capacitor-Plugins in Ihrem Projekt von der neuen Version unterstützt werden.

## CLI-Aktualisierungsbefehle

Diese Befehle helfen Ihnen, Ihre App zu aktualisieren, während sichergestellt wird, dass alles reibungslos weiterläuft.

### Aktualisieren Sie Capacitor CLI

Um auf die neuesten Funktionen zuzugreifen, aktualisieren Sie Ihre Capacitor CLI. Öffnen Sie Ihr Terminal und führen Sie folgendes aus:

```bash
npm install -g @capacitor/cli@latest
```

Sobald es installiert ist, bestätigen Sie das Update, indem Sie Ihre CLI-Version überprüfen:

```bash
npx cap --version
```

### Führen Sie Migrationsbefehle aus

In Ihrem Projektverzeichnis führen Sie die folgenden Befehle aus, um die Kern- und plattformspezifischen Capacitor-Pakete zu aktualisieren:

```bash
# Update core Capacitor packages
npm install @capacitor/core@latest
npm install @capacitor/cli@latest

# Update platform-specific packages
npm install @capacitor/ios@latest
npm install @capacitor/android@latest

# Run the migration command
npx cap migrate
```

Der Befehl `npx cap migrate` wird:

1.   Die Konfigurationen Ihrer App aktualisieren
2.   Abhängigkeiten synchronisieren
3.   Notwendige Projektänderungen anwenden
4.   Plugins auf Kompatibilität validieren

Wenn einige Updates nicht automatisch verarbeitet werden, müssen Sie sie möglicherweise manuell abschließen.

### Führen Sie manuelle Schritte aus

Um Ihr Projekt mit den aktualisierten Plattformen zu synchronisieren, führen Sie Folgendes aus:

```bash
npx cap sync
```

Für zusätzliche Automatisierung können Sie das CLI-Tool von Capgo integrieren, indem Sie Folgendes ausführen:

```bash
npx @capgo/cli init
```

Überprüfen Sie schließlich das Update, indem Sie Ihre App für jede Plattform erstellen:

```bash
# For iOS
npx cap open ios

# For Android
npx cap open android
```

Wenn Sie während der Aktualisierung auf Probleme stoßen, bietet die CLI detaillierte Fehlermeldungen zur Unterstützung bei der Fehlerbehebung. Überprüfen Sie die Build-Ausgabe auf Warnungen oder Fehler, die möglicherweise Ihre Aufmerksamkeit erfordern.

## Plattformaktualisierungen

Nachdem die Kernupdates abgeschlossen sind, besteht der nächste Schritt darin, die Plattformkonfigurationen für iOS- und Android-Projekte zu optimieren.

### iOS-Aktualisierungsschritte

Um mit Ihrem iOS-Projekt zu beginnen, öffnen Sie es in Xcode und befolgen Sie diese Schritte:

1.   **Aktualisieren Sie CocoaPods-Abhängigkeiten**  
    Beginnen Sie, indem Sie Ihre Abhängigkeiten mit CocoaPods aktualisieren. Navigieren Sie zu Ihrem iOS-Projektverzeichnis und führen Sie den folgenden Befehl aus:
    
    ```bash
    cd ios/App
    pod install
    ```
    
2.   **Konfigurieren Sie Xcode-Einstellungen**  
    Stellen Sie sicher, dass diese Xcode-Einstellungen aktualisiert werden, um einen reibungslosen Betrieb und Compliance zu gewährleisten:
    
    | **Einstellung** | **Erforderliche Aktion** | **Zweck** |
    | --- | --- | --- |
    | Deployment-Ziel | Eine minimale iOS-Version festlegen | Kompatibilität sicherstellen |
    | Build-Einstellungen | Identität der Signatur aktualisieren | Anforderungen des App Store erfüllen |
    | Asset-Katalog | Überprüfen Sie Symbol- und Splash-Assets | Visuelle Konsistenz wahren |
    
3.   **Sauberer Build**  
    Löschen Sie zwischengespeicherte Dateien und führen Sie einen sauberen Build durch, um verbleibende Probleme zu vermeiden:
    
    ```bash
    # Clean the build folder
    xcodebuild clean
    # Build the project
    xcodebuild build
    ```
    

Sobald die iOS-Aktualisierungen abgeschlossen sind, können Sie Ihre Aufmerksamkeit dem Android-Projekt zuwenden.

### Android-Aktualisierungsschritte

Für Android öffnen Sie das Projekt in Android Studio und befolgen Sie diese Schritte:

1.   **Aktualisieren Sie die Gradle-Konfiguration**  
    Öffnen Sie Ihre `build.gradle`-Datei und stellen Sie sicher, dass diese Einstellungen korrekt konfiguriert sind:
    
    ```kotlin
    android {
        compileSdkVersion 33
        defaultConfig {
            minSdkVersion 22
            targetSdkVersion 33
        }
    }
    ```
    
2.   **Projektdateien synchronisieren**  
    Synchronisieren Sie das Projekt mit Gradle-Dateien, um sicherzustellen, dass alle Abhängigkeiten auf dem neuesten Stand sind. Dieser Schritt kann auch das Aktualisieren von SDK-Tools und die Behebung von Konflikten umfassen.
    
3.   **Überprüfen Sie die Java-Version**  
    Stellen Sie sicher, dass Sie die richtige Version von Java verwenden, da dies für die Kompatibilität mit Gradle und Android-Funktionen entscheidend ist:
    
    ```bash
    # Check the current Java version
    ./gradlew --version
    ```
    

Achten Sie darauf, Ihre Gradle-Konfiguration genau zu überprüfen. Einige Updates erfordern möglicherweise eine neuere Gradle-Version, um die neuesten Android-Funktionen effektiv zu unterstützen.

## Live-Updates mit [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/0270fe931d56d422c8e52846495749c7.jpg)

Nachdem Ihre Plattform konfiguriert ist, können Sie Capgo verwenden, um Änderungen sofort ohne Warten auf Genehmigungen im App-Store durchzuführen. Dieser Schritt verbessert Ihre Plattformaktualisierungen, indem er Echtzeit-Bereitstellungsmöglichkeiten ermöglicht.

### Capgo einrichten

Der Einstieg in Capgo ist unkompliziert. Sie können es mit einem einfachen Befehl initialisieren:

```bash
npx @capgo/cli init
```

Dieses Feature rationalisiert den Aktualisierungsprozess und hält Ihre App ohne Verzögerungen durch traditionelle Überprüfungszyklen aktuell. Capgo ist sowohl mit Capacitor 6 als auch 7 kompatibel und somit eine flexible Wahl für Ihre bestehende Einrichtung.

| **Merkmal** | **Beschreibung** | **Vorteil** |
| --- | --- | --- |
| Ende-zu-Ende-Verschlüsselung | Eingebaute Sicherheit für Updates | Stellt sicher, dass nur autorisierte Benutzer auf Updates zugreifen können |
| [Kanalsystem](https://capgo.app/docs/plugin/cloud-mode/channel-system/) | Fortschrittliche Aktualisierungsverteilung | Zielgerichtete Benutzersegmente ansprechen |
| Echtzeitanalysen | Überwachung der Update-Leistung | Erfolgsraten und Benutzerinteraktionen verfolgen |

### Sicherheitsmerkmale von Updates

Capgo hat Priorität auf sichere und zuverlässige Updates und erreicht eine Akzeptanzrate von 95 % innerhalb von 24 Stunden und eine globale Erfolgsquote von 82 % [\[1\]](https://capgo.app). Es umfasst mehrere wichtige Sicherheitsmerkmale:

1.   **Rollback-Fähigkeit**: Schnell auf eine frühere Version zurückkehren, wenn Probleme auftreten.
2.   **Fehlerverfolgung**: Probleme identifizieren und lösen, bevor sie die Benutzer beeinträchtigen.
3.   **Channel-basierte Verteilung**: [Updates mit Beta-Gruppen testen](https://capgo.app/blog/how-to-send-specific-version-to-users/), bevor sie breit eingeführt werden.

### CI/CD-Integration

Sobald die Sicherheitsmaßnahmen implementiert sind, können Sie Capgo in Ihre CI/CD-Pipeline integrieren, um eine reibungslose und effiziente Bereitstellung zu gewährleisten. Capgo hat bereits CI/CD für über 50 Apps konfiguriert und bietet kostengünstige Lösungen im Vergleich zu anderen Optionen [\[1\]](https://capgo.app).

Hier ist ein Beispiel für einen Bereitstellungsbefehl:

```bash
npx @capgo/cli deploy --channel production
```

Capgo unterstützt eine Vielzahl von CI/CD-Plattformen, darunter:

1.   [GitHub Actions](https://docs.github.com/actions)
2.   [GitLab CI](https://docs.gitlab.com/ee/ci/)
3.   [Jenkins](https://www.jenkins.io/)
4.   Benutzerdefinierte Pipeline-Setups

> "Wir konfigurieren Ihre CI/CD-Pipeline direkt in Ihrer bevorzugten Plattform, sei es GitHub Actions, GitLab CI oder andere. Wir hosten CI/CD nicht oder berechnen Ihnen keine Gebühren für die Wartung." - Capgo [\[1\]](https://capgo.app)

Für Teams, die fachkundige Unterstützung suchen, bietet Capgo einen professionellen CI/CD-Konfigurationsservice für 2.600 $. Dieses einmalige Setup umfasst die Konfiguration der benutzerdefinierten Pipeline und fachkundige Beratung zu bewährten Praktiken für die Bereitstellung mobiler Apps [\[1\]](https://capgo.app).

## Häufige Probleme beheben

[Capacitor-Aktualisierungen](https://capgo.app/plugins/capacitor-updater/) können manchmal zu Problemen führen, die die Stabilität Ihrer App beeinträchtigen. Hier erfahren Sie, wie Sie diese häufigen Probleme effektiv angehen können.

### Paketkonflikte beheben

Beginnen Sie, indem Sie nach Versionskonflikten bei Ihren Capacitor-Paketen suchen. Verwenden Sie den folgenden Befehl:

```bash
npm ls @capacitor/core
```

Überprüfen Sie die Ausgabe und stellen Sie sicher, dass die Versionen von **@capacitor/core**, **@capacitor/ios** und **@capacitor/android** in Ihrer `package.json`-Datei konsistent sind. Wenn Sie Konflikte feststellen, aktualisieren oder entfernen Sie problematische Pakete, um Ihre Umgebung zu stabilisieren.

Überprüfen Sie danach, dass alle installierten Plugins mit der aktualisierten Capacitor-Version kompatibel sind.

### Überprüfen Sie die Plugin-Unterstützung

Stellen Sie vor der Aktualisierung sicher, dass Ihre Plugins bereit sind, mit der neuesten Capacitor-Version zu arbeiten. Verwenden Sie diese Befehle, um die Plugin-Kompatibilität zu verwalten und zu überprüfen:

| **Aktion** | **Befehl** | **Zweck** |
| --- | --- | --- |
| Plugins auflisten | `npx cap ls` | Zeigt alle installierten Plugins an |
| Versionen überprüfen | `npm outdated` | Identifiziert veraltete Plugins |
| Plugins aktualisieren | `npm update` | Aktualisiert Plugins auf kompatible Versionen |

Wenn Sie Live-Update-Tools wie **Capgo** verwenden, stellen Sie sicher, dass Ihre Plugins dynamische Updates unterstützen. Dies hilft, Laufzeitkonflikte zu vermeiden und sorgt für eine reibungslosere Leistung.

### Build-Fehler beheben

Build-Fehler können je nach Plattform variieren, aber hier sind plattformspezifische Lösungen:

**Für iOS:**

Bereinige deine Build-Ordner mit diesem Befehl:

```bash
xcodebuild clean -workspace ios/App/App.xcworkspace -scheme App
```

**Für Android:**

Leere den Gradle-Cache, indem du folgendes ausführst:

```bash
cd android && ./gradlew clean
```

Wenn Fehler nach dem Bereinigen weiterhin bestehen, musst du möglicherweise die betroffenen Plattformen erneut hinzufügen. So geht’s:

```bash
npx cap rm ios
npx cap rm android
npx cap add ios
npx cap add android
```

Wenn du schließlich Capgo für Live-Updates verwendest, solltest du sicherstellen, dass deine Build-Konfigurationen die Anforderungen der Plattform erfüllen, um weitere Probleme zu vermeiden.

## Zusammenfassung

Dieser Abschnitt hebt die wesentlichen Schritte und Werkzeuge zur [Verwaltung von Updates](https://capgo.app/docs/plugin/cloud-mode/manual-update/) in Capacitor hervor und betont, wie die effektive Nutzung von [Capacitor CLI-Befehlen](https://capgo.app/docs/cli/commands/) reibungslose Workflows in der App-Entwicklung gewährleistet. Die diskutierten Werkzeuge und Strategien zielen darauf ab, Updates zu vereinfachen und potenzielle Risiken zu verringern.

Früher haben wir festgestellt, dass Capgo **1,7K Produktions-Apps** unterstützt und eine beeindruckende **82% Erfolgsquote bei Updates** erzielt [\[1\]](https://capgo.app). seine Sofort-Update-Funktion ermöglicht es **95% der Benutzer, innerhalb von 24 Stunden zu aktualisieren** [\[1\]](https://capgo.app), was die Effizienz demonstriert.

Hier ist eine Übersicht über die Leistungskennzahlen von Capgo:

| Kennzahl | Leistung |
| --- | --- |
| Globale API-Antwortzeit | 434ms |
| 5MB Bundle Downloadgeschwindigkeit | 114ms |
| Erfolgsquote bei Updates | 82% |

> "Wir praktizieren agile Entwicklung, und @Capgo ist für die kontinuierliche Bereitstellung an unsere Benutzer von entscheidender Bedeutung!" - Rodrigo Mantica [\[1\]](https://capgo.app)

Moderne Update-Tools bieten mehrere bemerkenswerte Vorteile:

-   **Ende-zu-Ende-Verschlüsselung** für sichere Lieferung von Updates
-   **Partielle Updates**, die Bandbreite sparen, indem nur modifizierte Komponenten heruntergeladen werden
-   **Rollback mit einem Klick** für eine schnelle Wiederherstellung im Falle von Problemen
-   **Echtzeitanalysen**, um die Update-Leistung und das Benutzerengagement zu überwachen

Diese Funktionen bilden ein robustes Rahmenwerk für die effektive Verwaltung von [Versionsupdates](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/).

Egal, ob du an einer kleinen App arbeitest oder ein größeres Deployment skalierst, die Kombination von Capacitor CLI mit fortschrittlichen Update-Tools gewährleistet eine zuverlässige und effiziente Versionskontrolle in der heutigen sich schnell wandelnden Entwicklungslandschaft.

## FAQs

::: faq
### Welche Herausforderungen könnte ich bei der Aktualisierung meiner App mit Capacitor CLI antreffen und wie kann ich diese angehen?

Wenn du deine App mit dem Capacitor CLI aktualisierst, könnte es zu einigen Problemen kommen. Zu den häufigsten Herausforderungen gehören **Abhängigkeitskonflikte**, **brechende Änderungen in Plugins** oder **plattform-spezifische Konfigurationsprobleme**. Diese Probleme treten oft aufgrund von Unterschieden zwischen Capacitor-Versionen oder Updates von Drittanbieter-Plugins auf.

So kannst du diese Herausforderungen angehen:

-   **Überprüfe die Veröffentlichungsnotizen** für die neue Version, auf die du umsteigst. Achte auf brechende Änderungen oder Anpassungen, die du vornehmen musst.
-   **Teste Updates in einer Staging-Umgebung**, bevor du sie in der Produktion ausrollst. Dies hilft dir, Probleme zu erkennen und zu beheben, bevor sie die Benutzer beeinträchtigen.
-   Halte deine Abhängigkeiten und Plugins regelmäßig auf dem neuesten Stand, um das Risiko von Kompatibilitätsproblemen zu reduzieren.

Für ein noch reibungsloseres Update-Erlebnis möchtest du vielleicht Tools wie _Capgo_ ausprobieren. Dieses Tool ermöglicht es dir, Fehlerbehebungen und neue Funktionen direkt an deine Benutzer zu senden, ohne dass Genehmigungen des App Stores erforderlich sind. Es ist eine großartige Möglichkeit, deine App mit minimalen Ausfallzeiten auf dem neuesten Stand zu halten.
:::

::: faq
### Wie vereinfacht Capgo App-Updates und was sind seine herausragenden Funktionen?

Capgo vereinfacht die Art und Weise, wie Entwickler [App-Updates](https://capgo.app/plugins/capacitor-updater/) bereitstellen, indem sie Änderungen, Fehlerbehebungen und neue Funktionen direkt an die Benutzer weitergeben – ohne die Notwendigkeit von Genehmigungen des App Stores. Dadurch können deine Benutzer die neuesten Updates in nur wenigen Minuten genießen, was ein reibungsloseres und effizienteres Erlebnis schafft.

Hier ist, was Capgo besonders macht:

-   **Ende-zu-Ende-Verschlüsselung** sorgt dafür, dass deine Updates sicher bleiben.
-   **CI/CD-Integration** hilft, reibungslose Arbeitsabläufe aufrechtzuerhalten.
-   **Benutzerspezifische Updates** ermöglichen gezielte Rollouts.
-   **Flexibles Organisationsmanagement** unterstützt Teams jeder Größe.

Capgo ist vollständig Open-Source und erfüllt sowohl die Apple- als auch die Android-Standards und bietet eine zuverlässige Lösung für [Echtzeit-App-Updates](https://capgo.app/blog/live-updates-for-flutter-app/).
:::

::: faq
### Wie kann ich überprüfen, ob meine Plugins mit der neuesten Version von Capacitor kompatibel sind, bevor ich aktualisiere?

Bevor du den Schritt zur neuesten Version von Capacitor wagst, ist es wichtig, sicherzustellen, dass deine Plugins bereit sind, das Update zu bewältigen. Beginne damit, die Dokumentation oder das Repository des Plugins zu durchsuchen, um zu sehen, ob es spezifische Anforderungen oder Updates für Versionen gibt. Die meisten Plugins geben klar an, welche Capacitor-Versionen sie unterstützen, sodass dir dieser Schritt unnötige Kopfschmerzen ersparen kann.

Du kannst auch deine App in einer kontrollierten Umgebung mit der aktualisierten Capacitor-Version testen. Dies ermöglicht es dir, Kompatibilitätsprobleme zu erkennen und zu beheben, bevor das Update in der Produktion live geht. Tools wie **Capgo** können hier lebensrettend sein, da sie es dir ermöglichen, Updates direkt zu pushen, ohne Genehmigungen des App Stores zu benötigen. Das bedeutet, dass du Plugin-bezogene Probleme schnell ansprechen kannst, während du innerhalb der Plattformrichtlinien bleibst.
:::
