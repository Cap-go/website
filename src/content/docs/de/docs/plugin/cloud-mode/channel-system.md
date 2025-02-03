---
title: Kanal-System
description: So verwenden Sie das Kanalsystem mit capacitor-updater
sidebar:
  order: 6
locale: de
---

Capgo und Capacitor-Updater verfügen über ein leistungsstarkes Kanalsystem

## Was Sie mit Kanälen machen können:

* Geräte einem Kanal für Entwicklung und Beta-Tests zuordnen
* Einen Kanal pro Entwicklungszweig verwenden und Ihr Team sich selbst vom Telefon aus zuweisen lassen

## Geräte einem Kanal zuordnen:

* Den Kanal als Standard festlegen, jedes Mal wenn ein neues Gerät Capgo nach einem Update fragt, wird dieser Kanal antworten
* Die **deviceId** (mit der [**getDeviceId**](/docs/plugin/api#getdeviceid) Methode) an Ihr Backend senden und sie über die Capgo Public API zuweisen
* Den Kanal selbstzuweisbar machen (mit der [**setChannel**](/docs/plugin/api#setchannel) Methode) und das Gerät den Kanal abonnieren lassen (mit oder ohne Benutzerinteraktion) mit der `setChannel` Methode des Plugins
* Die Option `defaultChannel` in der [Konfiguration](/docs/plugin/settings#defaultchannel) verwenden, um den Standardkanal für alle Geräte mit dieser Plugin-Konfiguration festzulegen

:::note
Sie können ein Gerät auch direkt einem Bundle zuweisen
:::

## Kanal-Optionen

<figure><img src="/channel_setting_1webp" alt=""><figcaption></figcaption></figure>

Details zu jeder Option:

| Option                                           | Beschreibung                                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **Automatische Herabstufung unter Native deaktivieren** | Kein Update senden, wenn die Native-Version der App größer ist als die Kanalversion                    |
| **Automatische Aktualisierung über Major deaktivieren** | Kein Update senden, wenn die Native-Version der App niedriger ist als ein Major (**1**23) der Kanalversion |
| **Automatische Aktualisierung über Minor deaktivieren** | Kein Update senden, wenn die Native-Version der App niedriger ist als ein Minor (1**2**3) der Kanalversion |
| **Gerät-Selbstzuweisung erlauben**               | Ein Gerät die `setChannel` Methode für diesen Kanal verwenden lassen                                  |
| **IOS**                                          | IOS-Geräten erlauben, Updates von diesem Kanal herunterzuladen                                        |
| **Android**                                      | Android-Geräten erlauben, Updates von diesem Kanal herunterzuladen                                    |
| **Emulator erlauben**                            | Emulatoren erlauben, Updates von diesem Kanal zu erhalten                                             |
| **Entwicklungs-Build erlauben**                  | Entwicklungs-Builds erlauben, Updates von diesem Kanal zu erhalten                                    |

:::note
Capgo führt für Sie automatische Filterung durch. Wenn Sie eine CI/CD konfiguriert haben, um Ihre Version an Google Play zu senden, wird Google Play Ihre App jedes Mal auf über 20 echten Geräten ausführen. Während der ersten 4 Stunden eines neuen Bundles blockieren wir Google-Rechenzentrum-IPs, um zu verhindern, dass sie in Ihren Statistiken gezählt werden
:::

:::note
Capgo zählt Emulatoren und Entwicklungs-Builds **nicht** in Ihrer Nutzung, aber beachten Sie, dass Sie nicht mehr als 3% davon haben dürfen, sonst wird Ihr Konto gesperrt, bis Sie es beheben
:::