---
title: Manuel
description: Comment utiliser la mise à jour Capgo en mode manuel
sidebar:
  order: 3
locale: fr
---

## Avant de commencer

:::tip
Si vous utilisez cet outil gratuitement, prenez le temps de soutenir mon travail avec [GitHub sponsor](https://githubcom/sponsors/riderx/)

J'ai fait le pari d'ouvrir le code source de tout ce que j'ai construit ici

J'aurais pu le garder pour moi et fixer un prix élevé

Au lieu de cela, je veux en faire une entreprise ouverte et transparente

Je pense que cela rendrait notre monde meilleur en s'ouvrant plutôt qu'en se battant et en se cachant

Pour que cela soit possible, il est nécessaire que chacun d'entre nous fasse sa part, y compris vous 🥹

Si l'offre cloud Capgo ne vous convient pas, soutenez un créateur bootstrapped [ICI](https://githubcom/sponsors/riderx/) selon vos conditions
:::

## Installation rapide

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### Configuration

Ajoutez ceci à votre configuration pour désactiver la mise à jour automatique :

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"autoUpdate": false
		}
	}
}
```

Ensuite, ajoutez ce code à votre application pour utiliser le téléchargement manuel

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdaternotifyAppReady()
AppaddListener('appStateChange', async(state) => {
     if (stateisActive) {
       // Effectuer le téléchargement pendant que l'utilisateur utilise l'application pour éviter les échecs
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://githubcom/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // Effectuer le changement lorsque l'utilisateur quitte l'application
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // en cas d'échec, sinon la nouvelle application devra le masquer
       }
     }
 })
```

⚠️ Si vous envoyez une mise à jour défectueuse, l'application reviendra à la dernière version fonctionnelle ou à celle incluse dans la version native, si aucune ne fonctionne

## Application de démonstration

Consultez l'application de démonstration pour plus d'informations

[GitHub - Cap-go/demo-app : application de démonstration avec mode manuel et automatique](https://githubcom/Cap-go/demo-app/)

## Package

Quel que soit le nom que vous choisissez pour le fichier que vous téléchargez depuis l'URL de votre serveur de versions/mises à jour, le fichier zip doit contenir l'intégralité du contenu de votre dossier de sortie de build Capacitor en production, généralement `{répertoire du projet}/dist/` ou `{répertoire du projet}/www/`

C'est là que se trouvera `indexhtml`, et il doit également contenir tous les fichiers JavaScript regroupés, CSS et ressources web nécessaires au fonctionnement de votre application

Ne chiffrez pas ce fichier avec un mot de passe, sinon il ne pourra pas être décompressé