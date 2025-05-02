---
slug: guida-passo-passo-per-installare-capacitor-cli
title: 'Installazione della CLI di Capacitor: Guida Passo-Passo'
description: >-
  Impara a installare e configurare Capacitor CLI per trasformare le web app in
  app mobile native in modo efficiente.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-04-04T02:49:43.341Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: Sviluppo Mobile
keywords: 'Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates'
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
original_slug: installing-capacitor-cli-step-by-step-guide
---
**[Capacitor](https://capacitorjs.com/) CLI ti aiuta a trasformare le app web in app native iOS e Android con una sola base di codice.** Ecco come configurarlo rapidamente:

-   **Prerequisiti**: Installa [Node.js](https://nodejs.org/en) (v16+), npm e un framework web (React, Vue, Angular, ecc.).
-   **[Installa Capacitor CLI](https://capgo.app/docs/cli/commands)**: Esegui `npm install @capacitor/cli @capacitor/core` e inizializza il tuo progetto con `npx cap init`.
-   **Prepara le Piattaforme**: Aggiungi il supporto per le piattaforme iOS (`npx cap add ios`) e Android (`npx cap add android`).
-   **Build e Sync**: Usa `npm run build` e `npx cap sync` per trasferire gli asset web ai progetti nativi.
-   **Aggiornamenti Live Opzionali**: Usa strumenti come [Capgo](https://capgo.app/) per pubblicare aggiornamenti istantaneamente senza ritardi dell'app store.

Capacitor CLI semplifica lo sviluppo e la manutenzione delle app. Segui la guida per una configurazione e risoluzione dei problemi senza intoppi.

## Crea un'App Mobile Velocemente! React + [Capacitor](https://capacitorjs.com/) + [Tailwind](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1.jpg)

<Steps>

1. Prepara l'ambiente
2. Installa Capacitor
3. Configura le piattaforme
4. Avvia lo sviluppo

</Steps>

## Prima di Iniziare

Prepara il tuo ambiente seguendo questi passaggi:

### Configura [Node.js](https://nodejs.org/en) e npm

![Node.js](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9.jpg)

Avrai bisogno di Node.js versione 16 o superiore. È consigliata l'ultima versione LTS. Per verificare la tua configurazione, esegui:

```bash
node --version
npm --version
```

Se hai bisogno di aggiornare, scarica Node.js (che include npm) dal sito ufficiale.

Dopo aver confermato che Node.js è pronto, assicurati che il tuo progetto web soddisfi i requisiti necessari di Capacitor.

### Controlla il Tuo Progetto Web

Il tuo progetto web dovrebbe avere:

-   **Un package.json valido**: Assicurati che sia configurato correttamente.
-   **Una directory di build**: Qui risiedono i tuoi asset web (comunemente `dist` o `www`).
-   **Un punto di ingresso**: La tua directory di build deve includere un file `index.html`.

Ecco una rapida panoramica dei campi chiave di `package.json`:

| Campo Richiesto | Valore Esempio | Scopo |
| --- | --- | --- |
| name | "my-app" | Identifica il progetto |
| version | "1.0.0" | Specifica la versione dell'app |
| build directory | "dist" o "www" | Punta agli asset web |

Una volta che Node.js e il progetto web sono pronti, passa all'installazione degli strumenti specifici per piattaforma.

[Continue translation with the next part...]
