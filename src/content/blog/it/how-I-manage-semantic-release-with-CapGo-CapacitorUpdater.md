---
slug: come-rapido-cloud-gestisce-semantic-release-con-CapGo-CapacitorUpdater
title: Come Rapido Cloud gestisce il Semantic Release con Capgo CapacitorUpdater
description: >-
  Ecco come ho configurato semantic release per gestire i rilasci delle mie
  applicazioni che utilizzano CapGo CapacitorUpdater
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
head_image: /rapido_cloud_study_case.webp
head_image_alt: Studio del caso rapido cloud
keywords: >-
  semantic release, semantic-release, CapGo, CapacitorUpdater, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Case Study
published: true
locale: it
next_blog: ''
original_slug: how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
---
## 1. Introduzione

Su Rapido Cloud (www.rapido.cloud), sto sviluppando un'applicazione mobile per i clienti Salesforce per distribuire facilmente la propria applicazione mobile personalizzata senza dover passare attraverso i difficili passaggi dell'utilizzo del Salesforce Mobile SDK o del Salesforce Mobile Publisher.

Ho sviluppato questa app mobile su una piattaforma moderna e "standard" con componenti e strumenti diffusi tra cui Ionic 8, Angular 18, TypeScript, Capacitor e ora CapGo CapacitorUpdater. Questi sono più semplici da gestire per i clienti che non vogliono gestire le specifiche della piattaforma Salesforce come i Lightning Web Components; ed è più facile ed economico per me assumere sviluppatori e manutentori di applicazioni mobili Ionic + Angular.

Questo articolo spiega il mio design, le mie scelte e l'implementazione che rendono CapGo e `semantic-release` una soluzione ottimale per gestire automaticamente tutti i deployment tramite Github Actions. Tutto questo è stato progettato, testato e documentato durante il piacevole periodo di prova gratuito di 14 giorni di CapGo CapacitorUpdater.

## 2. Perché usare CapGo? Perché usare semantic-release?
CapGo CapacitorUpdater mi ha attratto con la sua promessa di rendere i deployment delle app mobili molto più semplici, rapidi e flessibili rispetto al processo standard di distribuzione tramite Apple AppStore/Google PlayStore.
Questa è la mia prima applicazione mobile che pubblico sugli store, essendomi concentrato in passato sulle web app, solitamente sviluppate su Salesforce Experience Cloud.

Ero piuttosto preoccupato della curva di apprendimento per avere successo ma sono riuscito a pubblicare la mia app su Apple TestFlight abbastanza facilmente. Ero quindi in grado di utilizzare CapGo CapacitorUpdater per distribuire i miei aggiornamenti molto più velocemente.

Il mio primo requisito e caso di test era di distribuire per me stesso per testare la mia app come una vera app mobile sul mio telefono, invece di testare in un emulatore mobile o in un simulatore tramite il browser mobile Nexus suggerito da Ionic. Questo perché la mia app utilizza funzionalità native come la Geolocalizzazione o l'accesso alla Galleria Foto e alla Fotocamera. Non avendo l'esperienza passata di testare un'app mobile Capacitor, non ero sicuro se tutto avrebbe funzionato correttamente: niente di meglio che testare l'app reale, in condizioni reali!

Quindi CapGo CapacitorUpdater mi ha aiutato ad aggiornare la mia applicazione sul mio mobile, in diretta, 1 minuto dopo aver salvato una nuova funzionalità o correzione nel mio codice sorgente: così liberatorio, così flessibile e facile da configurare!

## 3. Il mio modello di branching e release, e come semantic-release si adatta

Ora che ho il mio delivery ai server CapGo funzionante correttamente, devo automatizzarlo e integrarlo nella mia pipeline CI/CD.

### Ecco come organizzo il mio modello di branching e release

Per ogni applicazione, sia mobile, web o Salesforce:
- **lo sviluppo** viene effettuato su branch `feature/...` derivati da `main`, e vengono uniti in `main` che è il riferimento per la maggior parte dei branch di sviluppo, al di fuori della manutenzione e delle funzionalità specifiche per delivery personalizzati (maggiori dettagli in seguito)
- **i deployment vengono attivati __dai branch di release__** che possono essere: `production`, branch di prerelease (`alpha`, `beta`, `nightly`, ecc.) e anche branch specifici per cliente o contesto per delivery personalizzati
- **i deployment vengono attivati da una pull request** che viene unita in un branch di deployment. Non uso deployment attivati da tag perché semantic release gestisce i tag e tutto il resto per me.

Fondamentalmente, questo è il Gitlab Flow:

![Gitlab Flow](/RBW_Gitlab_Flow.webp)

*Gitlab Flow - fonte https://faun.dev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Una nota a margine su come funziona semantic-release:

In un branch di deployment, quando semantic-release viene attivato, calcolerà automaticamente il nuovo numero di versione su questo branch, a seconda del numero di versione del tag precedente sul branch e delle correzioni o funzionalità consegnate. Le correzioni creeranno una nuova versione patch, mentre le funzionalità creeranno una nuova versione minor. Include anche automaticamente la prerelease `alpha`, `beta`, ecc. nel numero di versione.

Semantic release genera il changelog dai tuoi commit, raggruppando correzioni e funzionalità come definito nei commit convenzionali (vedi https://www.conventionalcommits.org/en/about) e configurato in semantic release.

Aggiornerà anche tutte le tue pull request unite su git (Github, nel mio caso) e i relativi issues con commenti che li collegano al tag e al release. Infine, in questo release Github, allegherà asset come codice sorgente, binari se necessario, `CHANGELOG.md`, ecc.

## 4. Branch, release/prerelease, canali in semantic release e in CapGo

Ecco cosa voglio che semantic release faccia per i deployment CapGo.

### Voglio che semantic release generi il numero di versione

CapGo ha sviluppato e documentato la propria versione dello strumento "Conventional Commits" `standard-version`, con il loro fork repo `standard-version` (https://github.com/Cap-go/standard-version), e i loro propri repo `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version) e `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version). Hanno documentato sul loro blog lo schema di versione utilizzato da CapGo nei loro deployment (https://capgo.app/blog/how-version-work-in-capgo/). I bundle JavaScript seguono il "standard" semver "Semantic Versioning" (https://semver.org) che anche `semantic-release` segue (ovviamente!)

Quindi è fantastico, ed è un sollievo per me perché uso ampiamente `semantic-release`.

### Voglio anche che semantic release generi deployment di app su diversi canali

Come menzionato sopra, ho bisogno di distribuire versioni prerelease da branch come `alpha`, `beta`, `nightly` ecc., ma anche versioni specifiche per cliente su branch come `production-customer-jones`, `production-customer-doe`, ecc.

CapGo fornisce la funzionalità "canali" che è esattamente ciò che supporta anche semantic release, quindi sono entusiasta di farli lavorare insieme. Questi si adattano anche alle diverse build di branch gestite da XCode Cloud (vedi più avanti per maggiori dettagli).

I numeri di versione semver generati da semantic release sulle prerelease appaiono come `1.0.0-alpha.1`. Le build successive su questo branch incrementeranno il numero di build a `1.0.0-alpha.2`, ecc. Sebbene non sia documentato esplicitamente, questi numeri di versione sono supportati da CapGo, che è una grande notizia per me: userò i canali e le prerelease di semantic release per generare versioni della mia app con i canali Capgo.

## 5. Come posso usare CapGo per rilasciare la mia applicazione?

Per automatizzare il deployment dei bundle della tua app su CapGo, devi usare il comando CLI CapGo `bundle upload`. Digita `npx @capgo/cli@latest bundle upload --help` per ottenere le numerose opzioni di upload. Tra queste, useremo le seguenti:
- CHANNEL è il canale CapGo su cui vogliamo distribuire (es. `alpha`)
- VERSION è generato da semantic release (es. `1.0.0-alpha.1`)
- CAPGO_APIKEY è fornito da CapGo per identificare univocamente il login della tua pipeline CI/CD
- CAPGO_APPID è fornito da CapGo per identificare univocamente la tua applicazione (es. `com.mystartup.mysuperapp`)

## 6. La mia configurazione semantic release + CapGo CapacitorUpdate

Infine, come si incastra tutto questo insieme?

![Versioni del bundle dell'app costruite con semantic release e Github Actions](/RBW_CapGo_channels_and_versions.webp)

*Versioni del bundle dell'app costruite con semantic release e Github Actions*

### Automazione semantic release con Github Actions

La bellezza di semantic release è che l'automazione del deployment, sotto forma di un workflow Github Action, è molto semplice. Questo apparirà molto simile su altre piattaforme CI/CD.

Questo semplicemente installa l'ambiente NodeJS, poi chiama semantic release.

Per ogni merge su un branch elencato in `branches`, semantic release attiverà un deployment.
Imposta `CAPGO_APIKEY` nei segreti del tuo repository.
Aggiorna il tuo `CAPGO_APPID` qui.

Il comportamento di semantic release è impostato nel suo file di configurazione `.releaserc.json`.
Ecco le mie impostazioni, spiegate di seguito:

- `branches`: 
  - `branches` imposta la configurazione dei branch (`name`), mappati sul canale CapGo (`channel`) e come verrà chiamato il numero di versione prerelease (`prerelease`). Per esempio, se `branch.prerelease = "development"`, il numero di versione generato da semantic release sarà `x.y.z-development.n`
  - i deployment sui branch `alpha` e `alpha-nocapgo` distribuiranno entrambi l'app sul canale `alpha`, ma con nomi di prerelease diversi nel numero di versione
  - i deployment sui branch degli sviluppatori `dev-rupert` o `dev-paul` distribuiranno entrambi sul canale `development` di CapGo, tutti con la stessa parola chiave `development` prerelease nel numero di versione
- `verifyConditions`: nella prima fase di semantic release, verifica di avere l'accesso corretto a Github. Spero di aggiungere qui più tardi un controllo di autenticazione per la CLI CapGo
- `@semantic-release/commit-analyzer`: cose standard di semantic release - vedi la loro documentazione (https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator`: genera il file changelog come `CHANGELOG.md`
- `@semantic-release/git`: committa i seguenti file che sono stati aggiornati dalla build Ionic dell'applicazione e dal lavoro di semantic release (`package.json`, `CHANGELOG.md` e `ios/App/App.xcodeproj/project.pbxproj` - non faccio ancora build per Android)
- `@semantic-release/github`: allega il file `CHANGELOG.md` al release Github come asset
- `@semantic-release/exec`: usa questi 2 comandi per preparare la build dell'app (`prepareCmd`) e poi per costruire effettivamente e distribuire il bundle dell'app ai server CapGo (`publishCmd`)

Noterai che non c'è bisogno di armeggiare spiegando come vogliamo che il numero di versione venga calcolato e incrementato, come dobbiamo generare un changelog, un tag o release Github, ecc.: tutto è gestito di default da semantic release, con una configurazione minima.

### Costruire nuovi binari con XCode Cloud

Integrare tutto questo con XCode Cloud per creare nuove versioni del binario dell'applicazione è semplice (non sto ancora distribuendo su Google Play, ma quella build dovrebbe essere simile):
- Ho configurato un processo XCode Cloud per compilare quando c'è una modifica sul branch che desidero utilizzare per questo (es. `production`)
- su questo branch, ho impostato XCode Cloud per compilare solo quando il file `CHANGELOG.md` viene aggiornato. Questo viene aggiornato dopo ogni versione generata da semantic release
- Posso attivare build su diversi branch per simulare il deployment per diversi canali. In ogni configurazione di build di XCode Cloud su un branch diverso, imposto manualmente una variabile d'ambiente con il valore di `branch.channel` definito in `releaserc.json` (sì, questa è una duplicazione manuale) e quindi, se volessi, potrei distribuire una diversa applicazione AppStore per ogni applicazione cliente personalizzata distribuita da un branch di release personalizzato, come menzionato prima.

![Building app binaries on XCode Cloud with CapGo channels](/RBW_XCode_Cloud_building.webp)

*Compilazione dei binari dell'app su XCode Cloud con i canali CapGo*

## 7. Conclusione

In conclusione, sono molto contento di essere riuscito a integrare CapGo CapacitorUpdater nella mia pipeline standard di semantic release, rapidamente entro il periodo di prova di 14 giorni, e il risultato è il seguente:
- i numeri di versione del bundle vengono generati automaticamente da semantic release e sono compatibili con i server CapGo
- semantic release distribuisce automaticamente i bundle dell'applicazione CapGo, utilizzando anche i canali CapGo
- questo si integra perfettamente con le build dei binari dell'applicazione di XCode Cloud

### Prossimi passi

Attualmente sono nella fase di sviluppo di questa app. La renderò presto disponibile ai tester attraverso TestFlight (per iOS). Considerando la potenza di CapGo, pubblicherò sicuramente una versione gratuita dell'app sull'AppStore per i test, che verrà aggiornata regolarmente con CapGo durante i test. Successivamente distribuirò un'altra versione (a pagamento) dell'app sull'AppStore, sotto un altro record, e la aggiornerò regolarmente anche con CapGo.

Spero di aggiungere una migliore verifica pre-build dei prerequisiti di `bundle upload` di CapGo nella mia configurazione semantic release.

Ora ho una pipeline semantic release pulita, semplice e riproducibile per future app mobili sviluppate con Ionic + Angular + Capacitor.

## Autore - Rupert Barrow

Ho oltre 22 anni di esperienza con Salesforce, come cliente e utente, come partner e integratore, architetto, sviluppatore, analista di business e consulente. Ho co-fondato e co-gestito Altius Services come COO e CTO per 13 anni, un partner SI Salesforce di successo in Francia, prima di intraprendere una nuova avventura come solopreneur Salesforce con la mia offerta di prodotto **Rapido Cloud**.

Potete trovarmi su LinkedIn su https://linkedin.com/in/rbarrow.

Potete dare un'occhiata alle nostre offerte Salesforce su https://www.rapido-companion.app e https://www.rapido.cloud (in sviluppo).
