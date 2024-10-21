---
slug: how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: Wie Rapido Cloud das Semantic Release mit CapGo CapacitorUpdater verwaltet
description: >-
  So habe ich Semantic Release eingerichtet, um Veröffentlichungen meiner
  Anwendungen zu verwalten, die CapGo CapacitorUpdater verwenden
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
tag: Case Study
published: true
locale: de
next_blog: ''
---

# Wie Rapido Cloud Semantic Release mit CapGo CapacitorUpdater verwaltet

## 1 Einführung

Bei Rapido Cloud (wwwrapidocloud) entwickle ich eine mobile Anwendung für Salesforce-Kunden, um ihre eigene gebrandete mobile Anwendung einfach bereitstellen zu können, ohne die schwierigen Schleifen der Verwendung des Salesforce Mobile SDK oder des Salesforce Mobile Publisher durchlaufen zu müssen.

Ich habe diese mobile App auf einer modernen und "standardmäßigen" Plattform mit weit verbreiteten Komponenten und Tools entwickelt, darunter Ionic 8, Angular 18, TypeScript, Capacitor und jetzt CapGo CapacitorUpdater. Diese sind einfacher zu handhaben für Kunden, die keine Salesforce-Plattformspezifika wie Lightning Web Components verwalten möchten; und es ist für mich einfacher und günstiger, Entwickler und Betreuer von Ionic + Angular mobilen Anwendungen zu rekrutieren.

Dieser Artikel erklärt mein Design, meine Entscheidungen und Implementierung, die CapGo und `semantic-release` zu einer sehr erfolgreichen Selbstverständlichkeit für die automatische Verwaltung aller Bereitstellungen über Github Actions machen. All dies wurde während der angenehmen 14-tägigen kostenlosen Testphase von CapGo CapacitorUpdater entworfen, getestet und dokumentiert.

## 2 Warum CapGo verwenden? Warum semantic-release verwenden?

CapGo CapacitorUpdater hat mich mit seinem Versprechen angezogen, die Bereitstellung von mobilen Apps viel einfacher, schneller und flexibler zu gestalten als der Standard-Bereitstellungsprozess über Apple AppStore/Google PlayStore.
Dies ist meine erste mobile Anwendung, die ich in die Stores bringe, nachdem ich mich in der Vergangenheit auf Web-Apps konzentriert habe, die in der Regel auf der Salesforce Experience Cloud entwickelt wurden.

Ich hatte etwas Angst vor der Lernkurve, um dies erfolgreich zu machen, aber ich habe meine App recht einfach auf Apple TestFlight gebracht. Dann war ich in der Lage, CapGo CapacitorUpdater zu verwenden, um meine Updates viel schneller bereitzustellen.

Meine erste Anforderung und mein erster Testfall war, die App für mich selbst bereitzustellen, um sie als echte mobile App auf meinem eigenen Telefon zu testen, anstatt in einem mobilen Emulator oder in einem Simulator über den von Ionic vorgeschlagenen Nexus-Mobilbrowser zu testen. Das liegt daran, dass meine App native Funktionen wie Geolokalisierung oder den Zugriff auf die Fotogalerie und Kamera verwendet. Da ich keine Erfahrung mit dem Testen einer Capacitor-Mobile-App hatte, war ich mir nicht sicher, ob alles richtig funktionieren würde: Nichts ist besser, als die echte App unter realen Bedingungen zu testen!

CapGo CapacitorUpdater half mir also, meine Anwendung auf meinem Mobilgerät live zu aktualisieren, 1 Minute nachdem ich eine neue Funktion oder Fehlerbehebung in meinem Quellcode gespeichert hatte: so entlastend, flexibel und einfach einzurichten!

## 3 Mein Branching- und Release-Modell und wie semantic-release dazu passt

Jetzt, da meine Bereitstellung auf CapGo-Servern korrekt funktioniert, muss ich dies automatisieren und in meine CI/CD-Pipeline einbinden.

### So organisiere ich mein Branching- und Release-Modell

Für jede Anwendung, ob mobil, Web oder Salesforce:
- **Entwicklung** wird auf `feature/`-Branches von `main` durchgeführt, und sie werden in `main` zusammengeführt, der die Referenz für die meisten Entwicklungszweige ist, außerhalb von Wartung und spezifischen Funktionen für benutzerdefinierte Lieferungen (mehr dazu unten)
- **Bereitstellungen werden __von Release-Branches__ ausgelöst**, die sein können: `production`, Vorabversions-Branches (`alpha`, `beta`, `nightly`, etc.) und auch kundenspezifische oder kontextspezifische Branches für benutzerdefinierte Lieferungen
- **Bereitstellungen werden durch einen Pull Request ausgelöst**, der in einen Bereitstellungs-Branch zusammengeführt wird. Ich verwende keine tag-gesteuerten Bereitstellungen, da semantic-release Tags und alles andere für mich verwaltet

Im Grunde ist dies der Gitlab Flow:

![Gitlab Flow](/RBW_Gitlab_Flowwebp)

*Gitlab Flow - Quelle https://faundev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Eine Randbemerkung dazu, wie semantic-release funktioniert:

In einem Bereitstellungs-Branch berechnet semantic-release bei Auslösung automatisch die neue Versionsnummer auf diesem Branch, abhängig von der Versionsnummer des vorherigen Tags auf dem Branch und den gelieferten Fehlerbehebungen oder Funktionen. Fehlerbehebungen erzeugen eine neue Patch-Version, während Funktionen eine neue Minor-Version erzeugen.Es fügt auch automatisch die Vorabversion `alpha`, `beta` usw. in die Versionsnummer ein.

Semantic Release generiert das Changelog aus Ihren Commits, gruppiert Fehlerbehebungen und Funktionen, wie in Conventional Commits definiert (siehe https://www.conventionalcommits.org/en/about) und in Semantic Release konfiguriert.

Es aktualisiert auch alle Ihre zusammengeführten Git-Pull-Requests (in meinem Fall GitHub) und zugehörigen Issues mit Kommentaren, die sie mit dem Tag und Release verknüpfen. Schließlich fügt es diesem GitHub-Release Assets wie Quellcode, falls erforderlich Binärdateien, `CHANGELOG.md` usw. hinzu.

## 4. Branches, Releases/Vorabreleases, Kanäle in Semantic Release und CapGo

Was ich möchte, dass Semantic Release für CapGo-Bereitstellungen tut, ist Folgendes:

### Ich möchte, dass Semantic Release die Versionsnummer generiert

CapGo hat ihre eigene Version des "Conventional Commits" `standard-version`-Tools entwickelt und dokumentiert, mit ihrem geforkt Repository `standard-version` (https://github.com/Cap-go/standard-version) sowie ihren eigenen `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version) und `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version) Repositories. Sie haben in ihrem Blog das von CapGo in ihren Bereitstellungen verwendete Versionierungsschema dokumentiert (https://capgo.app/blog/how-version-work-in-capgo/). JavaScript-Bundles folgen der "Standard"-Semver "Semantischen Versionierung" (https://semver.org), der `semantic-release` ebenfalls folgt (offensichtlich!).

Das ist großartig und eine Erleichterung für mich, da ich `semantic-release` intensiv nutze.

### Ich möchte auch, dass Semantic Release App-Bereitstellungen auf verschiedenen Kanälen generiert

Wie oben erwähnt, muss ich Vorabversionen von Branches wie `alpha`, `beta`, `nightly` usw. bereitstellen, aber auch kundenspezifische Versionen auf Branches wie `production-customer-jones`, `production-customer-doe` usw.

CapGo bietet die "Kanäle"-Funktion, die genau das ist, was Semantic Release auch unterstützt, also bin ich begeistert, sie zusammenarbeiten zu lassen. Diese passen auch zu den verschiedenen Branch-Builds, die von XCode Cloud verwaltet werden (siehe mehr dazu weiter unten).

Von Semantic Release generierte Semver-Versionsnummern für Vorabreleases sehen wie `1.0.0-alpha.1` aus. Aufeinanderfolgende Builds auf diesem Branch erhöhen die Build-Nummer auf `1.0.0-alpha.2` usw. Obwohl nicht explizit dokumentiert, werden diese Versionsnummern von CapGo unterstützt, was eine großartige Nachricht für mich ist: Ich werde Semantic Release-Kanäle und Vorabreleases verwenden, um Versionen meiner App mit CapGo-Kanälen zu generieren.

## 5. Wie kann ich CapGo verwenden, um meine Anwendung zu veröffentlichen?

Um die Bereitstellung Ihrer App-Bundles an CapGo zu automatisieren, müssen Sie den CapGo CLI-Befehl `bundle upload` verwenden. Geben Sie `npx @capgo/cli@latest bundle upload --help` ein, um die zahlreichen Upload-Optionen zu erhalten. Davon werden wir die folgenden verwenden:

- CHANNEL ist der CapGo-Kanal, auf dem wir bereitstellen möchten (z.B. `alpha`)
- VERSION wird von Semantic Release generiert (z.B. `1.0.0-alpha.1`)
- CAPGO_APIKEY wird von CapGo bereitgestellt, um Ihre CI/CD-Pipeline-Anmeldung eindeutig zu identifizieren
- CAPGO_APPID wird von CapGo bereitgestellt, um Ihre Anwendung eindeutig zu identifizieren (z.B. `com.mystartup.mysuperapp`)

## 6. Mein Semantic Release + CapGo Capacitor Update Setup

Wie fügt sich das alles schließlich zusammen?

![App-Bundle-Versionen, die mit Semantic Release und GitHub Actions erstellt wurden](/RBW_CapGo_channels_and_versions.webp)

*App-Bundle-Versionen, die mit Semantic Release und GitHub Actions erstellt wurden*

### Semantic Release-Automatisierung mit GitHub Actions

Die Schönheit von Semantic Release liegt darin, dass die Bereitstellungsautomatisierung in Form eines GitHub Action Workflows sehr einfach ist. Dies wird auf anderen CI/CD-Plattformen sehr ähnlich aussehen.

Dies installiert lediglich die NodeJS-Umgebung und ruft dann Semantic Release auf.

Für jeden Merge auf einem in `branches` aufgelisteten Branch wird Semantic Release eine Bereitstellung auslösen.
Setzen Sie `CAPGO_APIKEY` in den Geheimnissen Ihres Repositories.
Aktualisieren Sie hier Ihre `CAPGO_APPID`.

Das Verhalten von Semantic Release wird in seiner Konfigurationsdatei `releaser.json` festgelegt.Hier sind meine Einstellungen, unten erklärt:
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```

- `branches`:
  - `branches` legt die Konfiguration der Branches (`name`) fest, die dem CapGo-Kanal (`channel`) zugeordnet sind und wie die Vorabversions-Nummer genannt wird (`prerelease`). Zum Beispiel, wenn `branchprerelease = "development"`, wird die von Semantic Release generierte Versionsnummer `xyz-developmentn` sein.
  - Deployments auf die `alpha` und `alpha-nocapgo` Branches werden beide die App auf dem `alpha` Kanal deployen, aber mit unterschiedlichen Prerelease-Namen in der Versionsnummer.
  - Deployments auf die Entwickler-Branches `dev-rupert` oder `dev-paul` werden beide auf dem `development` Kanal auf CapGo deployen, alle mit dem gleichen `development` Prerelease-Stichwort in der Versionsnummer.
- `verifyConditions`: In der ersten Phase von Semantic Release prüft es, ob es den korrekten Zugriff auf Github hat. Ich hoffe, hier später eine Authentifizierungsprüfung für die CapGo CLI hinzuzufügen.
- `@semantic-release/commit-analyzer`: Standard Semantic Release Funktionen - siehe deren Dokumentation (https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator`: Generiert die Changelog-Datei als `CHANGELOG.md`
- `@semantic-release/git`: Committet die folgenden Dateien, die durch den Ionic-Build der Anwendung und durch die Semantic Release Arbeit aktualisiert wurden (`package.json`, `CHANGELOG.md` und `ios/App/App.xcodeproj/project.pbxproj` - ich baue noch nicht für Android)
- `@semantic-release/github`: Hängt die `CHANGELOG.md` Datei als Asset an das Github Release an
- `@semantic-release/exec`: Verwendet diese 2 Befehle, um den Build der App vorzubereiten (`prepareCmd`) und dann effektiv das App-Bundle auf die CapGo-Server zu bauen und zu deployen (`publishCmd`)

Sie werden bemerken, dass es keine Herumbastelei gibt, um zu erklären, wie wir die Versionsnummer berechnen und inkrementieren wollen, wie wir ein Changelog, einen Github-Tag oder Release generieren müssen, usw.: Alles wird standardmäßig von Semantic Release mit minimaler Konfiguration gehandelt.

### Neue Binärdateien mit XCode Cloud bauen

Die Integration all dessen mit XCode Cloud, um neue Versionen der Anwendungsbinärdatei zu bauen, ist einfach (ich deploye noch nicht auf Google Play, aber dieser Build sollte ähnlich sein):
- Ich richte einen XCode Cloud Prozess ein, der baut, wenn es eine Änderung auf dem Branch gibt, den ich dafür verwenden möchte (z.B. `production`)
- Auf diesem Branch stelle ich XCode Cloud so ein, dass es nur baut, wenn die `CHANGELOG.md` Datei aktualisiert wird. Diese wird nach jeder von Semantic Release generierten Version aktualisiert.
- Ich kann Builds auf verschiedenen Branches auslösen, um das Deployment für verschiedene Kanäle zu simulieren. In jeder Konfiguration des XCode Cloud Builds auf einem anderen Branch setze ich manuell eine Umgebungsvariable mit dem Wert von `branch.channel`, der in `releaserc.json` festgelegt ist (ja, das ist eine manuelle Duplizierung) und dann könnte ich, wenn ich wollte, eine andere AppStore-Anwendung für jede benutzerdefinierte Kundenanwendung deployen, die von einem benutzerdefinierten Release-Branch deployt wird, wie zuvor erwähnt.


![App-Binärdateien auf XCode Cloud mit CapGo-Kanälen bauen](/RBW_XCode_Cloud_building.webp)

*App-Binärdateien auf XCode Cloud mit CapGo-Kanälen bauen*


## 7 Fazit

Zusammenfassend bin ich sehr zufrieden, dass ich CapGo CapacitorUpdater in meine Standard-Semantic-Release-Pipeline integrieren konnte, schnell innerhalb der 14-tägigen Testperiode, und das Ergebnis ist Folgendes:
- Bundle-Versionsnummern werden automatisch von Semantic Release generiert und sind kompatibel mit den CapGo-Servern
- Semantic Release deployt automatisch CapGo-Anwendungsbundles und nutzt dabei auch CapGo-Kanäle
- Dies passt gut zu XCode Cloud Builds von Anwendungsbinärdateien

### Nächste Schritte

Ich befinde mich derzeit in der Entwicklungsphase dieser App. Ich werde sie schnell über TestFlight (für iOS) Testern zur Verfügung stellen. Angesichts der Leistungsfähigkeit von CapGo werde ich höchstwahrscheinlich eine kostenlose Version der App für Tests im AppStore veröffentlichen, die während der Tests regelmäßig mit CapGo aktualisiert wird.Ich werde dann eine weitere (kostenpflichtige) Version der App im AppStore unter einem anderen Eintrag veröffentlichen und diese ebenfalls regelmäßig mit CapGo aktualisieren.

Ich hoffe, eine bessere Vorab-Überprüfung der Voraussetzungen für den CapGo `bundle upload` in meine Semantic Release-Konfiguration einzubauen.

Ich habe jetzt eine saubere, einfache und reproduzierbare Semantic Release-Pipeline für zukünftige mobile Apps, die mit Ionic + Angular + Capacitor entwickelt werden.

## Autor - Rupert Barrow

Ich verfüge über 22 Jahre Erfahrung mit Salesforce, als Kunde und Benutzer, als Partner und Integrator, Architekt, Entwickler, Business Analyst und Berater. Ich habe Altius Services als COO und CTO 13 Jahre lang mitbegründet und mitgeleitet, ein erfolgreicher Salesforce SI-Partner in Frankreich, bevor ich mich mit meinem **Rapido Cloud** Produktangebot auf ein neues Abenteuer als Salesforce-Solopreneur begeben habe.

Sie finden mich auf LinkedIn unter https://linkedincom/in/rbarrow 

Einen Blick auf unsere Salesforce-Angebote können Sie unter https://wwwrapido-companionapp und https://wwwrapidocloud (in Entwicklung) werfen.