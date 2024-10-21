---
slug: self-hosted-capgo
title: Selbstgehostetes Capgo
description: >-
  Das Selbsthosten von Capgo ermöglicht es Ihnen, Capacitor Live-Updates an Ihre
  Nutzer zu verteilen, ohne den Cloud-Dienst von Capgo verwenden zu müssen.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: selbst gehostetes Capgo
tag: Solution
published: true
locale: de
next_blog: ''
---

Dieser Artikel bietet eine schrittweise Anleitung zur Selbstinstallation von Capgo sowie eine Diskussion der Vor- und Nachteile des Self-Hostings.

# Einführung

Self-Hosting ist eine Form des Betreibens einer eigenen Website oder Anwendung, indem man selbst einen Server und ein Netzwerk einrichtet. Anstatt einen Platform-as-a-Service oder einen öffentlichen Cloud-Anbieter zu nutzen, betreiben diejenigen, die sich für Self-Hosting entscheiden, ihre eigenen Netzwerke und sind neben der Erstellung ihrer Website oder Anwendung auch für die Wartung und Verfügbarkeit verantwortlich.

Der einfachste Weg, mit Capgo zu beginnen, ist unser [offizieller verwalteter Dienst in der Cloud](https://capgoapp/), aber wenn Sie bereit sind, sich selbst darum zu kümmern, können Sie Capgo auch auf Ihrem eigenen Server selbst hosten.

## Was ist Self-Hosting?

Self-Hosting bezieht sich im digitalen Kontext auf die Praxis, eigene Server oder Hosting-Infrastruktur zu betreiben, um die eigene Online-Präsenz und Dienste zu verwalten und zu kontrollieren. Anstatt sich auf Drittanbieter für das Hosting zu verlassen, entscheiden sich Einzelpersonen und Organisationen dafür, ihre Server, Websites, Anwendungen und Datenspeicher nach eigenen Vorstellungen einzurichten und zu verwalten.

## Warum entscheidet man sich für Self-Hosting?

Es gibt viele Gründe, warum sich Menschen für Self-Hosting entscheiden. Einige der häufigsten Vorteile sind:

* **Privatsphäre und Kontrolle:** Self-Hosting gibt Ihnen vollständige Kontrolle über Ihre Daten und Privatsphäre. Sie müssen sich keine Sorgen darüber machen, dass Drittanbieter Ihre Aktivitäten verfolgen oder Ihre Daten verkaufen.

* **Kosteneinsparungen:** Self-Hosting kann langfristig kostengünstiger sein, besonders wenn Sie viele Ressourcen nutzen oder mehrere Dienste betreiben.

* **Anpassung:** Self-Hosting gibt Ihnen die Flexibilität, Ihre Anwendungen und Dienste an Ihre spezifischen Bedürfnisse anzupassen.

* **Lernen und Experimentieren:** Self-Hosting kann eine großartige Möglichkeit sein, etwas über Linux, Systemadministration und andere technische Themen zu lernen. Es kann auch eine unterhaltsame Art sein, mit neuer Software und neuen Diensten zu experimentieren.

* **Unabhängigkeit:** Self-Hosting reduziert Ihre Abhängigkeit von externen Anbietern. Sie sind nicht deren Nutzungsbedingungen, Preisänderungen oder möglichen Serviceunterbrechungen ausgeliefert. Diese Unabhängigkeit kann für Unternehmen und Einzelpersonen, die sich bei kritischen Funktionen auf ihre Online-Präsenz verlassen, entscheidend sein.

## Was ist der Unterschied zwischen Capgo Cloud und Capgo Self-Hosted?

Es gibt nur eine Version von Capgo. Sowohl mein Cloud- als auch mein Self-Hosted-Produkt sind völlig gleichwertig. Es gibt keine Premium- und exklusive kommerzielle Version mit einem besseren oder vollständigeren Funktionsumfang.

Sie erhalten bei beiden das gleiche Dashboard, die gleichen umsetzbaren Metriken und das gleiche Engagement für den [Respekt der Privatsphäre Ihrer Besucher](https://capgoapp/privacy/).

Ich begann mit der Entwicklung von Capgo im Dezember 2018 und startete das SaaS-Abonnementgeschäft im Mai 2019. Das Projekt ist sehr lebendig, wird aktiv weiterentwickelt und wächst schnell. Es ist auch robust und bewährt.

Hier sind die Unterschiede zwischen Capgo Cloud und Capgo Self-Hosted:

|   | Cloud | Self-hosted |
| --- | --- | --- |
| **Hosting** | Einfach und bequem. Es dauert 2 Minuten, um Ihr erstes Update zu senden, hohe Verfügbarkeit, Backups, Sicherheit und Wartung werden alle von mir für Sie erledigt. Ich kümmere mich um alles, damit Sie sich keine Sorgen machen müssen. | Sie machen alles selbst. Sie benötigen einen Server und müssen Ihre Infrastruktur verwalten. Sie sind verantwortlich für Installation, Wartung, Upgrades, Serverkapazität, Verfügbarkeit, Backup, Sicherheit, Stabilität, Konsistenz, Ladezeit und so weiter. |
| **Speicherung** | Alle Besucherdaten werden ausschließlich auf EU-eigener Cloud-Infrastruktur verarbeitet. Ich bewahre Ihre Website-Daten auf einem sicheren, verschlüsselten Server in Deutschland auf. Dies stellt sicher, dass Ihre Website-Daten durch die strengen Datenschutzgesetze der Europäischen Union geschützt sind und die DSGVO eingehalten wird. Ihre Website-Daten verlassen niemals die EU. | Sie haben die volle Kontrolle und können Ihr Capgo auf jedem beliebigen Server in jedem gewünschten Land hosten. Hosten Sie es auf einem Server in Ihrem Keller oder bei einem beliebigen Cloud-Anbieter, wo immer Sie möchten, selbst bei solchen, die nicht DSGVO-konform sind.|
| **Rohdaten** | Sie sehen alle Ihre Website-Statistiken und -Metriken auf meinem modern aussehenden, einfach zu bedienenden und schnell ladenden Dashboard. Sie können die Statistiken nur aggregiert im Dashboard sehen. | Sind Sie ein Analyst und möchten Zugriff auf die Rohdaten? Wenn Sie Capgo selbst hosten, haben Sie diese Option. Nehmen Sie die Daten direkt aus der Datenbank und importieren Sie sie in ein Datenanalysetool Ihrer Wahl. |
| **Kosten** | Mit der Bereitstellung eines Updater-Dienstes sind Kosten verbunden, daher erhebe ich eine Abonnementgebühr. | Sie müssen nur für Ihren Server und die Kosten bezahlen, die mit dem Betrieb eines Servers verbunden sind. Sie müssen nie Gebühren an mich zahlen, nur an Ihren Cloud-Anbieter. |
| **Premium Support** | Echter Support, der von echten Menschen geliefert wird, die Capgo entwickeln und warten. | Premium-Support ist nicht inbegriffen. Die selbstgehostete Version wird nur von der Community unterstützt. |
| **Veröffentlichungen** | Kontinuierlich entwickelt und verbessert mit neuen Funktionen und Updates mehrmals pro Woche. | Es handelt sich um eine langfristige Version, die zweimal jährlich veröffentlicht wird, sodass die neuesten Funktionen nicht sofort verfügbar sind, da sie zuerst in der Cloud getestet werden. |

# Verwendung der CLI mit selbstgehostetem Capgo
Um die CLI mit selbstgehostetem Capgo zu verwenden, bearbeiten Sie die capacitor.config.ts aus Ihrem App-Verzeichnis und stellen Sie sie wie folgt ein:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      localHost: "http://localhost:5173",
      localWebHost: "http://localhost:5173",
      localSupa: "http://localhost:54321",
      localSupaAnon: "see_notes",
    },
  },
};
```

Hinweis: Um localSupaAnon zu erhalten, folgen Sie bitte diesem [Tutorial](https://capgo.app/docs/self-hosted/local-dev/getting-started/) und kopieren Sie den Anon-Schlüssel in localSupaAnon.

# Verwendung des Capacitor Updaters mit selbstgehostetem Capgo

**Voraussetzung**

Geklontes [Capgo](https://github.com/Cap-go/capgo/)

Um den Capacitor Updater mit selbstgehostetem Capgo zu verwenden, bearbeiten Sie die `capacitor.config.ts` aus Ihrem App-Verzeichnis und stellen Sie sie wie folgt ein:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      statsUrl: "http://localhost:54321/functions/v1/stats",
      channelUrl: "http://localhost:54321/functions/v1/channel_self",
      updateUrl: "http://localhost:54321/functions/v1/updates"
    },
  },
};
```

Dies ermöglicht es Ihnen, lokales Capgo in der Entwicklung zu verwenden. Standardmäßig reicht dies jedoch nicht aus.

# Fazit

Zusammenfassend kann das Selbsthosten von Capgo eine gute Option für Organisationen sein, die über die Ressourcen und das Fachwissen dafür verfügen. Es bietet eine Reihe von Vorteilen, einschließlich Kontrolle über den Update-Prozess, Sicherheit und Compliance. Es ist jedoch wichtig, die Vorteile und Herausforderungen sorgfältig abzuwägen, bevor man sich für das Selbsthosten entscheidet.

Wenn Sie in Erwägung ziehen, Capgo selbst zu hosten, empfehle ich Ihnen, zunächst die Capgo [Selbsthosting-Dokumentation](https://capgo.app/docs/self-hosted/getting-started/) zu lesen. Dies wird Ihnen ein gutes Verständnis der Anforderungen und Risiken des Selbsthostings vermitteln.