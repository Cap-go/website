---
slug: introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: >-
  Einführung von Ende-zu-Ende-Verschlüsselung für capacitor-updater mit
  Code-Signierung
description: >-
  Verwendung von RSA + AES-Kryptografie zur Verschlüsselung von Updates,
  entwickelt für Unternehmen und Anwendungen mit hohen Sicherheitsanforderungen
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2024-08-27T00:00:00.000Z
head_image: /secure_upload.webp
head_image_alt: Sicheres Hochladen Capgo
tag: Solution
published: true
locale: de
next_blog: ''
---

[Capacitor-updater](https://githubcom/Cap-go/capacitor-updater/) unterstützt jetzt Ende-zu-Ende-Codeverschlüsselung. Code-Signierung stellt sicher, dass die von Endgeräten ausgeführten Updates nicht manipuliert wurden und bietet einen zusätzlichen Schutz über die Standard-Websicherheit von Capacitor-updater hinaus.

## Die Standardsicherheit von Capacitor-updater

Standardmäßig ähnelt Capgos Sicherheitsmodell dem von Web-Hosting-Anbietern. Capgo speichert Updates [verschlüsselt im Ruhezustand](https://cloudgooglecom/docs/security/encryption/default-encryption/) und stellt sie über HTTPS mit modernen Verschlüsselungsverfahren bereit. Auch das Veröffentlichen eines Updates vom Computer eines Entwicklers erfolgt immer über HTTPS.

![Capgo erzielt A+ im HTTPS-Test von SSL Labs](/ssllabs_report.webp)

Capgos Standardsicherheit erzielt A+ im HTTPS-Test von SSL Labs (https://wwwssllabscom, November 2022)

Wie erstklassige Web-Hosts verwendet Capgo HTTPS, um die Privatsphäre und Integrität der Netzwerkverbindungen zwischen Server und Endgeräten zu schützen. Dies ist ein ausgezeichnetes Sicherheitsniveau, das sowohl für das Web als auch für Ionic-Apps, die Capgo verwenden, gut funktioniert.

## Die Cloud-Infrastruktur-Lieferkette

Eine weitere Gemeinsamkeit von Capgo und den meisten Web-Hosts ist, dass sie auf einer Cloud-Infrastruktur niedrigerer Ebene laufen, oft von AWS, GCP oder einem anderen beliebten Cloud-Anbieter. Die von diesen Cloud-Anbietern und Capgo oder anderen Web-Hosts betriebene Hard- und Software ist Teil der Cloud-Lieferkette.

Die Cloud-Lieferkette und ihr Sicherheitsmodell funktionieren für eine große Anzahl von Websites und Apps. Jeder Webentwickler, der einen Cloud-Anbieter nutzt, vertraut diesem Anbieter und erwartet, dass die hochgeladenen Dateien ohne Manipulation ausgeführt oder bereitgestellt werden. Und Cloud-Anbieter arbeiten hart daran, ihre Infrastruktur sicher zu halten.

Aber natürlich werden Hardware- und Software-Schwachstellen entdeckt. Cloud-Anbieter beheben Schwachstellen nach zeitnahen Zeitplänen, verhindern proaktiv böswillige Software (z.B. [Googles SLSA](https://securitygoogleblogcom/2021/06/introducing-slsa-end-to-end-frameworkhtml/)), und bauen Schichten der Verteidigung in der Tiefe auf. In der Praxis hat sich gezeigt, dass die Cloud-Infrastruktur die Sicherheitsanforderungen der meisten Websites und Apps erfüllt. Einige Ionic-Apps beziehen jedoch kompromittierte Cloud-Infrastruktur in ihre Bedrohungsmodelle ein. Für diese Capacitor JS-Apps mit den höchsten Sicherheitsanforderungen über das Web hinaus haben wir die Ende-zu-Ende-Code-Signierung in Capgo und das [Capgo Updates Standardprotokoll](/docs/self-hosted/auto-update/update-endpoint/) integriert.

## Ende-zu-Ende-Code-Signierung mit Capgo

Capgos Ende-zu-Ende-Code-Signierung verwendet Public-Key-Kryptographie, um sicherzustellen, dass die Geräte der Endbenutzer nur unveränderte, originale Updates vom Capacitor-App-Entwickler ausführen.

"Ende-zu-Ende" bedeutet, dass diese Sicherheit den Fluss von dem Zeitpunkt, an dem ein Entwickler ein Update veröffentlicht, bis zu dem Zeitpunkt abdeckt, an dem das Gerät eines Endbenutzers das Update empfängt und ausführt. "Code-Signierung" bedeutet, Kryptographie und einen geheimen privaten Schlüssel zu verwenden, um Code zu "signieren", und später einen vertrauenswürdigen öffentlichen Schlüssel zu verwenden, um die Signatur zu verifizieren.

Hier ist ein einfaches* Schema zur Erklärung der Funktionsweise:

![Capgo Verschlüsselungsschema](/encryption_flow.webp)

* In der Praxis komplex, Kryptographie ist schwierig

*Definition*:
- AES: Advanced Encryption Standard, ein symmetrischer Verschlüsselungsalgorithmus, ein Schlüssel für Ver- und Entschlüsselung
- RSA: Rivest–Shamir–Adleman, ein asymmetrischer Verschlüsselungsalgorithmus, zwei Schlüssel werden verwendet: ein öffentlicher Schlüssel und ein privater Schlüssel
- Chiffre: Die verschlüsselten Daten
- Sitzungsschlüssel: Ein AES-Schlüssel zum Ver- und Entschlüsseln von Daten
- Prüfsumme: Ein für eine Datei berechneter Hash
- Signatur: Eine Prüfsumme, die mit einem privaten RSA-Schlüssel verschlüsselt wurde. Sie kann mit einem öffentlichen RSA-Schlüssel verifiziert werden.

Wir verwenden den AES-Algorithmus zur Verschlüsselung des Updates. Für jeden Upload wird ein zufälliger AES-Schlüssel generiert, dann werden der AES-Schlüssel und die Prüfsumme (im Folgenden "Signatur") mit dem privaten RSA-Schlüssel des Entwicklers verschlüsselt. Der öffentliche RSA-Schlüssel des Entwicklers wird in der App verwendet, um den AES-Schlüssel und die Signatur zu entschlüsseln (und sie wieder in eine Prüfsumme umzuwandeln).Später wird der entschlüsselte AES-Schlüssel verwendet, um das Update zu entschlüsseln; eine Prüfsumme des entschlüsselten Updates wird berechnet und mit der entschlüsselten Signatur verglichen.

Wir verwenden zwei verschiedene Verschlüsselungsalgorithmen, da RSA nicht für die Verschlüsselung großer Datenmengen verwendet werden kann. AES wird zur Verschlüsselung des Updates verwendet und RSA zur Verschlüsselung des AES-Schlüssels und der Prüfsumme.

Dadurch kann selbst Capgo den Inhalt Ihres Bundles nicht lesen. Dies ist ein robustes Sicherheitsmodell, das von vielen Unternehmenskunden verwendet wird.

**Update Verschlüsselung V2 2024-08-27:**
- Wir haben den Schlüsseltyp geändert, der in der App gespeichert wird. Dies wurde getan, um zu verhindern, dass der öffentliche Schlüssel (zuvor für die Verschlüsselung verwendet) vom privaten Schlüssel (zuvor für die Entschlüsselung verwendet) abgeleitet werden kann. Jetzt speichert die App den öffentlichen Schlüssel (jetzt für die Entschlüsselung verwendet).
- Wir haben die Prüfsumme vom CRC32-Algorithmus auf den SHA256-Algorithmus umgestellt. Wir haben auch begonnen, [das Bundle zu signieren](https://enwikipediaorg/wiki/RSA_(cryptosystem)#Signing_messages). Wenn Verschlüsselung V2 konfiguriert ist, muss ein Update eine gültige Signatur haben. Dies wird vom Plugin strikt durchgesetzt.
- Wir setzen jetzt eine gültige Signatur durch, wenn Verschlüsselung V2 konfiguriert ist.
Diese 3 Änderungen wurden nach einer Sicherheitsanalyse eines Community-Mitglieds vorgenommen. Sie dienen dazu, kryptografische Angriffe während des Updates zu verhindern.

Wenn Sie Verschlüsselung V1 verwendet haben, migrieren Sie zu V2, um von den neuen Sicherheitsfunktionen zu profitieren. Befolgen Sie die [Migrationsanweisungen](/docs/cli/migrations/encryption/)

Mit Ende-zu-Ende-Codesignierung wird Capgo zu einer "vertrauenslosen" Cloud-Infrastruktur. Wenn einer der Cloud-Anbieter von Capgo oder sogar Capgo selbst ein codesigniertes Update ändern würde, würden die Geräte der Endbenutzer dieses Update ablehnen und das vorherige, vertrauenswürdige Update ausführen, das bereits auf dem Gerät vorhanden ist.

Während HTTPS auf Webebene für viele Apps ausreichend ist, finden einige große Unternehmen die zusätzliche Sicherheitsebene durch Ende-zu-Ende-Codesignierung attraktiv. Einige dieser Unternehmen entwickeln Finanz-Apps, die hochwertige, dauerhafte Transaktionen durchführen. Andere Unternehmen haben CISOs, die kompromittierte Cloud-Infrastrukturen in ihren Bedrohungsmodellen berücksichtigen. Wir haben die Ende-zu-Ende-Codesignierung für diese Anwendungsfälle in Capgo integriert und sind daran interessiert, mehr von Unternehmen mit höheren Sicherheitsanforderungen zu hören.

## Erste Schritte für Unternehmenskunden

Für große Unternehmen oder Projekte, denen Sicherheit besonders wichtig ist, möchten wir die Codesignierung einfach einzurichten und zu warten machen. Zu diesem Zweck bieten wir nun folgende Funktionen an:

- Schnelle Zertifikatserstellung und -konfiguration
- Unterstützung für die Codesignierung von Entwicklungsservern sowohl mit Capgo als auch mit Entwicklungs-Builds
- Produktions-Codesignierung bei jedem Update

Die Capgo-Codesignierung ist für alle Kunden verfügbar. Um loszulegen, folgen Sie den [Einrichtungsanweisungen](/docs/cli/commands/#end-to-end-encryption-trustless)

## Danksagung

Vielen Dank an [Ionic](https://ioniccom/), dieser Artikel basiert auf [diesem Artikel](https://ionicio/blog/introducing-the-ionic-end-to-end-testing-reference-example/), der mit chat-gpt-3 umgeschrieben und angepasst wurde.