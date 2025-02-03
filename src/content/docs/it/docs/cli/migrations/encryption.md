---
title: Crittografia
description: Codifica dei dati con un nuovo metodo di crittografia
sidebar:
  order: 5
locale: it
---

Questa documentazione spiegherà come crittografare i tuoi dati con il nuovo sistema di crittografia e rimuovere quello vecchio

Scopri di più sul nuovo sistema di crittografia nel [blog post](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing)

---

Per prima cosa, crea una nuova coppia di chiavi con il seguente comando:

```bash
npx @capgo/cli key create
```

Questo comando creerà una nuova coppia di chiavi nella tua app; è imperativo conservare la chiave privata in un luogo sicuro. Non bisogna mai committare la chiave privata nel controllo del codice sorgente né condividerla con parti non fidate

Questo comando rimuoverà anche la vecchia chiave dal tuo config Capacitor, ma non rimuoverà i vecchi file delle chiavi. La CLI li mantiene per permetterti di continuare a inviare aggiornamenti live per le app che non hanno ricevuto un aggiornamento dall'app store e stanno ancora usando il vecchio plugin. Questo facilita la migrazione

Quando ti viene chiesto dalla migrazione "Vuoi configurare la crittografia con il nuovo canale per supportare le vecchie app e facilitare la migrazione?", accetta. Aggiungerà una nuova opzione "defaultChannel" al tuo config Capacitor. Questo farà sì che la tua app utilizzi il canale "encryption_v2". Questo assicurerà che la nuova crittografia sia usata solo dalle app che la supportano. Le app che non hanno ricevuto un aggiornamento dall'app store continueranno a utilizzare il canale predefinito precedente

---

Ora, devi compilare il tuo bundle JS e caricarlo sul nuovo canale. Esegui il seguente comando:

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

---

Quindi, esegui questo comando per consentire alle app di auto-assegnarsi al canale "encryption_v2"

:::caution
Questo è necessario per far funzionare la nuova opzione "defaultChannel"
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

---

Ora puoi eseguire l'app; userà il nuovo sistema di crittografia

Per caricare il nuovo bundle JS sul vecchio canale, devi solo eseguire il seguente comando:

```bash
npx @capgo/cli bundle upload --channel production
```

---

Non devi preoccuparti del config Capacitor, non viene mai caricato su Capgo

Quando tutti gli utenti avranno aggiornato le loro app (può richiedere fino a 3/4 mesi), puoi rimuovere "defaultChannel" dal tuo config Capacitor

E poi, puoi rimuovere il vecchio canale con il seguente comando:

```bash
npx @capgo/cli channel delete encryption_v2
```

---

Dopo aver eliminato il canale "encryption_v2", tutte le app che lo utilizzano come predefinito inizieranno a utilizzare il canale "production"