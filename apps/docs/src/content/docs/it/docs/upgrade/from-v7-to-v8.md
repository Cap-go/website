---
title: "Da V7 a V8"
locale: it
description: "Una guida dettagliata sulla transizione dalla versione 7 alla versione 8 dell'updater Capgo, delineando i passaggi necessari e le considerazioni per un processo di aggiornamento di successo, garantendo la compatibilità con le funzionalità e i miglioramenti di Capacitor 8."
sidebar:
  order: 0
---

## Perché questo aggiornamento

Questa versione principale è qui per seguire la versione principale 8 di Capacitor

Prima segui la guida alla migrazione di Capacitor:

[https://capacitorjs.com/docs/updating/8-0](https://capacitorjs.com/docs/updating/8-0/)

## Requisito versione minima iOS

L'obiettivo di distribuzione minimo per iOS è stato aumentato a **15** per garantire che i dispositivi iOS con [CVE-2022-36943](https://nvd.nist.gov/vuln/detail/CVE-2022-36943) siano esclusi. Questa è la versione minima della libreria zip iOS che ha implementato la correzione di sicurezza.

## Installazione

`npm i @capgo/capacitor-updater@8`

Quindi sincronizza l'aggiornamento del codice nativo:

`npx cap sync`

Fatto! Abbastanza facile!

## Novità in V8

La versione 8 di capacitor-updater porta la piena compatibilità con Capacitor 8, garantendo che la tua app possa sfruttare le ultime funzionalità e miglioramenti del sistema operativo mobile.

### Aggiornamenti principali

- **Compatibilità con Capacitor 8**: Supporto completo per le funzionalità native migliorate di Capacitor 8
- **Miglioramenti delle prestazioni**: Processo ottimizzato di distribuzione e installazione degli aggiornamenti
- **Stabilità migliorata**: Correzioni di bug e miglioramenti della stabilità da v7
- **Compatibilità API mantenuta**: Nessuna modifica importante all'API del plugin da v7

## Configurazione

La configurazione rimane la stessa di v7. Le tue impostazioni `capacitor.config` esistenti continueranno a funzionare:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      appId: 'your-app-id',
      version: '1.0.0',
      autoUpdate: true,
      // ... altre impostazioni
    }
  }
}
```

## Lista di controllo della migrazione

- [ ] Seguire la [guida alla migrazione](https://capacitorjs.com/docs/updating/8-0) v8 di Capacitor, verificare le modifiche incompatibili
- [ ] Aumentare l'obiettivo di distribuzione minimo iOS a 15 (richiesto per la correzione CVE-2022-36943)
- [ ] Aggiornare @capgo/capacitor-updater a ^8.0.0
- [ ] Eseguire `npx cap sync`
- [ ] Testare accuratamente la tua app su iOS e Android

## Hai bisogno di aiuto?

Se riscontri problemi durante la migrazione, per favore:

1. Controlla la nostra [documentazione](/docs/live-updates/)
2. Visita la nostra [comunità Discord](https://discord.com/invite/VnYRvBfgA6)
3. Apri un problema su [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
