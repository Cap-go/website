---
slug: Wie Capacitor Plattform-Unterschiede handhabt
title: Wie Capacitor Plattformunterschiede handhabt
description: >-
  Erfahren Sie, wie Sie Plattformunterschiede in der mobilen App-Entwicklung
  effektiv verwalten können, indem Sie eine einzige Codebasis für iOS und
  Android verwenden.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-25T02:08:36.160Z
updated_at: 2025-03-25T02:08:56.741Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e200987856e801f1f26fa8-1742868536741.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Capacitor, mobile development, cross-platform, iOS, Android, custom plugins,
  UI design, live updates
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
original_slug: how-capacitor-handles-platform-differences
---
[Capacitor](https://capacitorjs.com/) hilft Entwicklern dabei, Apps für iOS und Android mit der gleichen Codebasis zu erstellen und dabei plattformspezifische Unterschiede zu berücksichtigen. Es vereinfacht die Integration nativer Funktionen, stellt die Einhaltung von Plattformrichtlinien sicher und optimiert die Leistung. Wichtige Highlights:

-   **Plattformerkennung**: Nutzen Sie `Capacitor.getPlatform()` für plattformspezifischen Code.
-   **Integrierte Plugins**: Einheitliche APIs für Funktionen wie Kamera, Speicher und Geolokalisierung.
-   **Benutzerdefinierte Plugins**: Native Code-Ergänzungen für spezielle Anforderungen.
-   **UI-Anpassungen**: Befolgen Sie Designregeln für iOS (z.B. [SF Symbols](https://developer.apple.com/sf-symbols/), abgerundete Buttons) und Android (z.B. [Material Icons](https://developers.google.com/fonts/docs/material_icons), linksbündige Buttons).
-   **Konfiguration**: Anpassung der Einstellungen in `capacitor.config.json` für beide Plattformen.
-   **Live Updates mit [Capgo](https://capgo.app/)**: Sofortige Bereitstellung von Updates ohne App Store Verzögerungen, mit bis zu 95% Nutzerakzeptanz innerhalb von 24 Stunden.

### Schneller Vergleich

| Funktion | iOS | Android |
| --- | --- | --- |
| **Navigation** | Tab-Leisten unten, Zurück-Button links | Navigationsleiste oben, Navigation unten |
| **Typografie** | San Francisco Schrift | Roboto Schrift |
| **Plugins (z.B. Kamera)** | [AVFoundation](https://developer.apple.com/documentation/avfoundation/) | [Camera2 API](https://developer.android.com/media/camera/camera2) |
| **Build-Ausgabe** | `.ipa` Datei | `.aab` oder `.apk` Datei |

Capacitor überbrückt die Lücke zwischen Web- und nativer App-Entwicklung und erleichtert die Erstellung plattformübergreifender Apps bei gleichzeitiger Beibehaltung plattformspezifischer Optimierungen.

Der Erfolg im Plattform-Management hängt von der Verwendung der richtigen Werkzeuge und der Einhaltung plattformspezifischer Richtlinien ab. Durch die Konzentration auf robuste Erkennungs- und Management-Strategien können Entwickler sicherstellen, dass ihre Apps auf iOS und Android gleichermaßen reibungslos funktionieren.
