---
title: Migrazione da AppFlow a Capgo
description: Guida completa per migrare la tua app da Ionic AppFlow a Capgo
sidebar:
  order: 7
---

## Perché migrare a Capgo?

Con l'annuncio della chiusura di Ionic AppFlow, la migrazione a Capgo offre una transizione perfetta per il tuo flusso di lavoro di sviluppo di app mobili. Capgo offre funzionalità migliorate, prestazioni superiori e significativi risparmi sui costi mantenendo tutte le funzionalità critiche necessarie.

### Vantaggi Principali
- Distribuzione degli aggiornamenti più veloce (< 1 minuto vs 10 minuti)
- Prezzi più convenienti (14$/mese vs 499$/mese)
- Crittografia end-to-end inclusa in tutti i piani
- Maggiore controllo sui canali di aggiornamento
- Opzioni complete di integrazione CI/CD

## Passaggi di Migrazione

### 1. Migrazione degli Aggiornamenti Live

#### Rimuovere le Dipendenze Precedenti
```bash
npm uninstall @ionic/appflow
# Rimuovere le configurazioni specifiche di AppFlow da capacitor.config.json
```

#### Installare Capgo
```bash
npm install @capgo/capacitor-updater
npx cap sync
```

#### Aggiornare la Configurazione
Aggiungi la configurazione Capgo al tuo `capacitor.config.json`:
```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true
    }
  }
}
```

### 2. Migrazione CI/CD

Capgo offre opzioni flessibili per CI/CD:

#### Opzione 1: Usa il tuo CI/CD Esistente
Segui i nostri tutorial dettagliati per configurare CI/CD con piattaforme popolari:
- [Configurazione Build iOS](https://capgo.app/blog/automatic-capacitor-ios-build-github-action/)
- [Configurazione Build Android](https://capgo.app/blog/automatic-capacitor-android-build-github-action/)
- [Integrazione GitHub Actions](https://capgo.app/blog/github-action-capacitor/)

#### Opzione 2: CI/CD Gestito
Lascia che gestiamo noi la tua configurazione CI/CD con il nostro [servizio gestito](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you).

### 3. Configurazione dei Canali

1. Creare canali nella dashboard Capgo:
```bash
npx @capgo/cli channel create production
npx @capgo/cli channel create staging
```

2. Configurare le impostazioni dei canali:
```bash
# Configurare il canale di produzione
npx @capgo/cli channel update production --no-downgrade --no-upgrade

# Configurare il canale di staging
npx @capgo/cli channel update staging
```

### 4. Test della Migrazione

1. **Testare gli Aggiornamenti Live**
```bash
# Creare e caricare un bundle di test
npx @capgo/cli bundle create --channel staging
```

2. **Verificare la Ricezione degli Aggiornamenti**
- Installare l'app su un dispositivo di test
- Verificare che gli aggiornamenti vengano ricevuti correttamente
- Verificare il processo di installazione degli aggiornamenti
- Testare la funzionalità di ripristino

## Risoluzione dei Problemi

### Problemi Comuni

#### Aggiornamenti Non Ricevuti
- Verificare la configurazione dei canali
- Controllare i log del dispositivo
- Assicurare una connettività di rete adeguata
- Validare il formato della versione del bundle

## Prossimi Passi

1. [Crea un account Capgo](/register/)
2. Segui la nostra [guida rapida](/docs/getting-started/quickstart/)
3. Configura l'[integrazione CI/CD](/docs/getting-started/cicd-integration/)
4. Configura gli [aggiornamenti live](/docs/live-updates/)

Per i team aziendali che richiedono supporto dedicato durante la migrazione, [programma una chiamata con il nostro team](https://cal.com/martindonadieu/capgo-enterprise-inquiry).
