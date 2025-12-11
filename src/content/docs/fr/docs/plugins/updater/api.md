---
title: "Fonctions et paramètres"
locale: fr
description: "Toutes les méthodes et paramètres disponibles du plugin"
sidebar:
  order: 2
---

# Configuration du plugin Updater

Consultez le [Readme](https://github.com/Cap-go/capacitor-updater) sur Github pour plus d'informations.

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater peut être configuré avec ces options :

| Prop                         | Type                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Par défaut                                         | Depuis  |
| ---------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>                             | Configure le nombre de millisecondes pendant lesquelles le plugin natif doit attendre avant de considérer une mise à jour comme 'échouée'. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                                             | <code>10000 // (10 secondes)</code>                |         |
| **`responseTimeout`**        | <code>number</code>                             | Configure le nombre de millisecondes pendant lesquelles le plugin natif doit attendre avant de considérer un délai d'expiration de l'API. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                                             | <code>20 // (20 secondes)</code>                   |         |
| **`autoDeleteFailed`**       | <code>boolean</code>                            | Configure si le plugin doit automatiquement supprimer les bundles échoués. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code>                            | Configure si le plugin doit automatiquement supprimer les bundles précédents après une mise à jour réussie. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code>                            | Configure si le plugin doit utiliser la mise à jour automatique via un serveur de mise à jour. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code>                            | Supprime automatiquement les bundles précédemment téléchargés lorsqu'un nouveau bundle d'application natif est installé sur l'appareil. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                                               | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>                             | Configure l'URL / point de terminaison vers lequel les vérifications de mise à jour sont envoyées. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                    | <code>https://plugin.capgo.app/updates</code>      |         |
| **`channelUrl`**             | <code>string</code>                             | Configure l'URL / point de terminaison pour les opérations de canal. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>                             | Configure l'URL / point de terminaison vers lequel les statistiques de mise à jour sont envoyées. Disponible uniquement pour Android et iOS. Définir à "" pour désactiver les rapports de statistiques.                                                                                                                                                                                                                                                                                                                                                                           | <code>https://plugin.capgo.app/stats</code>        |         |
| **`publicKey`**              | <code>string</code>                             | Configure la clé publique pour le chiffrement de bout en bout des mises à jour en direct Version 2. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>undefined</code>                             | 6.2.0   |
| **`version`**                | <code>string</code>                             | Configure la version actuelle de l'application. Sera utilisée pour la première demande de mise à jour. Si non définie, le plugin obtiendra la version du code natif. Disponible uniquement pour Android et iOS.                                                                                                                                                                                                                                                                                                                                                                  | <code>undefined</code>                             | 4.17.48 |
| **`directUpdate`**           | <code>boolean \| 'always' \| 'atInstall' \| 'onLaunch'</code> | Configure quand le plugin doit installer directement les mises à jour. Uniquement pour le mode autoUpdate. Fonctionne bien pour les applications de moins de 10 Mo et avec les téléversements effectués avec le flag --partial. Les zip ou applications de plus de 10 Mo seront relativement lents à mettre à jour pour les utilisateurs. - false : Ne jamais faire de mises à jour directes (utiliser le comportement par défaut : téléchargement au démarrage, installation en arrière-plan) - atInstall : Mise à jour directe uniquement lorsque l'application est installée ou mise à jour depuis le store, sinon agir comme directUpdate = false - onLaunch : Mise à jour directe uniquement lors de l'installation de l'application, mise à jour depuis le store ou après l'arrêt de l'application, sinon agir comme directUpdate = false - always : Mise à jour directe dans tous les cas précédents (application installée, mise à jour depuis le store, après l'arrêt ou la reprise de l'application), ne jamais agir comme directUpdate = false - true : (déprécié) Identique à "always" pour la rétrocompatibilité. Disponible uniquement pour Android et iOS. | <code>false</code>                                 | 5.1.0   |
| **`autoSplashscreen`**       | <code>boolean</code>                            | Gérer automatiquement le masquage du splashscreen lors de l'utilisation de directUpdate. Lorsqu'activé, le plugin masquera automatiquement le splashscreen après l'application des mises à jour ou lorsqu'aucune mise à jour n'est nécessaire. Cela supprime le besoin d'écouter manuellement les événements appReady et d'appeler SplashScreen.hide(). Fonctionne uniquement lorsque directUpdate est défini sur "atInstall", "always" ou true. Nécessite que le plugin @capacitor/splash-screen soit installé et configuré avec launchAutoHide: false. Nécessite que autoUpdate et directUpdate soient activés. Disponible uniquement pour Android et iOS. | <code>false</code>                                 | 7.6.0   |
| **`periodCheckDelay`**       | <code>number</code>                             | Configure le délai de période pour la vérification périodique des mises à jour. L'unité est en secondes. Disponible uniquement pour Android et iOS. Ne peut pas être inférieur à 600 secondes (10 minutes).                                                                                                                                                                                                                                                                                                                                                                      | <code>600 // (10 minutes)</code>                   |         |
| **`localS3`**                | <code>boolean</code>                            | Configure le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>undefined</code>                             | 4.17.48 |
| **`localHost`**              | <code>string</code>                             | Configure le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>undefined</code>                             | 4.17.48 |
| **`localWebHost`**           | <code>string</code>                             | Configure le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>undefined</code>                             | 4.17.48 |
| **`localSupa`**              | <code>string</code>                             | Configure le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>undefined</code>                             | 4.17.48 |
| **`localSupaAnon`**          | <code>string</code>                             | Configure le CLI pour utiliser un serveur local pour les tests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>undefined</code>                             | 4.17.48 |
| **`localApi`**               | <code>string</code>                             | Configure le CLI pour utiliser une API locale pour les tests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>undefined</code>                             | 6.3.3   |
| **`localApiFiles`**          | <code>string</code>                             | Configure le CLI pour utiliser une API de fichiers locale pour les tests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>undefined</code>                             | 6.3.3   |
| **`allowModifyUrl`**         | <code>boolean</code>                            | Permet au plugin de modifier dynamiquement l'updateUrl, le statsUrl et le channelUrl depuis le côté JavaScript.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code>                                 | 5.4.0   |
| **`defaultChannel`**         | <code>string</code>                             | Définir le canal par défaut pour l'application dans la configuration. Sensible à la casse. Ce paramètre remplacera le canal par défaut défini dans le cloud, mais respectera toujours les remplacements effectués dans le cloud.                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 5.5.0   |
| **`appId`**                  | <code>string</code>                             | Configure l'ID de l'application dans la configuration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>undefined</code>                             | 6.0.0   |
| **`keepUrlPathAfterReload`** | <code>boolean</code>                            | Configure le plugin pour conserver le chemin URL après un rechargement. ATTENTION : Lorsqu'un rechargement est déclenché, 'window.history' sera effacé.                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>false</code>                                 | 6.8.0   |
| **`disableJSLogging`**       | <code>boolean</code>                            | Désactiver la journalisation JavaScript du plugin. Si true, le plugin ne journalisera pas dans la console JavaScript. Seule la journalisation native sera effectuée.                                                                                                                                                                                                                                                                                                                                                                                                              | <code>false</code>                                 | 7.3.0   |
| **`shakeMenu`**              | <code>boolean</code>                            | Activer le geste de secousse pour afficher le menu de mise à jour à des fins de débogage/test                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | <code>false</code>                                 | 7.5.0   |

## Exemples

Dans `capacitor.config.json` :

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 seconde),
      "responseTimeout": 10 // (10 secondes),
      "autoDeleteFailed": false,
      "autoDeletePrevious": false,
      "autoUpdate": false,
      "resetWhenUpdate": false,
      "updateUrl": https://example.com/api/auto_update,
      "channelUrl": https://example.com/api/channel,
      "statsUrl": https://example.com/api/stats,
      "publicKey": undefined,
      "version": undefined,
      "directUpdate": undefined,
      "autoSplashscreen": undefined,
      "periodCheckDelay": undefined,
      "localS3": undefined,
      "localHost": undefined,
      "localWebHost": undefined,
      "localSupa": undefined,
      "localSupaAnon": undefined,
      "localApi": undefined,
      "localApiFiles": undefined,
      "allowModifyUrl": undefined,
      "defaultChannel": undefined,
      "appId": undefined,
      "keepUrlPathAfterReload": undefined,
      "disableJSLogging": undefined,
      "shakeMenu": undefined
    }
  }
}
```

Dans `capacitor.config.ts` :

```ts
/// <reference types="@capgo/capacitor-updater" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1 seconde),
      responseTimeout: 10 // (10 secondes),
      autoDeleteFailed: false,
      autoDeletePrevious: false,
      autoUpdate: false,
      resetWhenUpdate: false,
      updateUrl: https://example.com/api/auto_update,
      channelUrl: https://example.com/api/channel,
      statsUrl: https://example.com/api/stats,
      publicKey: undefined,
      version: undefined,
      directUpdate: undefined,
      autoSplashscreen: undefined,
      periodCheckDelay: undefined,
      localS3: undefined,
      localHost: undefined,
      localWebHost: undefined,
      localSupa: undefined,
      localSupaAnon: undefined,
      localApi: undefined,
      localApiFiles: undefined,
      allowModifyUrl: undefined,
      defaultChannel: undefined,
      appId: undefined,
      keepUrlPathAfterReload: undefined,
      disableJSLogging: undefined,
      shakeMenu: undefined,
    },
  },
};

export default config;
```

</docgen-config>

<docgen-index>

* [`notifyAppReady()`](#notifyappready)
* [`setUpdateUrl(...)`](#setupdateurl)
* [`setStatsUrl(...)`](#setstatsurl)
* [`setChannelUrl(...)`](#setchannelurl)
* [`download(...)`](#download)
* [`next(...)`](#next)
* [`set(...)`](#set)
* [`delete(...)`](#delete)
* [`list(...)`](#list)
* [`reset(...)`](#reset)
* [`current()`](#current)
* [`reload()`](#reload)
* [`setMultiDelay(...)`](#setmultidelay)
* [`cancelDelay()`](#canceldelay)
* [`getLatest(...)`](#getlatest)
* [`setChannel(...)`](#setchannel)
* [`unsetChannel(...)`](#unsetchannel)
* [`getChannel()`](#getchannel)
* [`listChannels()`](#listchannels)
* [`setCustomId(...)`](#setcustomid)
* [`getBuiltinVersion()`](#getbuiltinversion)
* [`getDeviceId()`](#getdeviceid)
* [`getPluginVersion()`](#getpluginversion)
* [`isAutoUpdateEnabled()`](#isautoupdateenabled)
* [`removeAllListeners()`](#removealllisteners)
* [`addListener('download', ...)`](#addlistenerdownload-)
* [`addListener('noNeedUpdate', ...)`](#addlistenernoneedupdate-)
* [`addListener('updateAvailable', ...)`](#addlistenerupdateavailable-)
* [`addListener('downloadComplete', ...)`](#addlistenerdownloadcomplete-)
* [`addListener('majorAvailable', ...)`](#addlistenermajoravailable-)
* [`addListener('updateFailed', ...)`](#addlistenerupdatefailed-)
* [`addListener('downloadFailed', ...)`](#addlistenerdownloadfailed-)
* [`addListener('appReloaded', ...)`](#addlistenerappreloaded-)
* [`addListener('appReady', ...)`](#addlistenerappready-)
* [`isAutoUpdateAvailable()`](#isautoupdateavailable)
* [`getNextBundle()`](#getnextbundle)
* [`setShakeMenu(...)`](#setshakemenu)
* [`isShakeMenuEnabled()`](#isshakemenuenabled)
* [Interfaces](#interfaces)
* [Alias de types](#type-aliases)

</docgen-index>

# Méthodes

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notifier Capacitor Updater que le bundle actuel fonctionne (un retour en arrière se produira si cette méthode n'est pas appelée à chaque lancement de l'application)
Par défaut, cette méthode doit être appelée dans les 10 premières secondes après le lancement de l'application, sinon un retour en arrière se produira.
Modifiez ce comportement avec {@link appReadyTimeout}

**Retourne :** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Définir l'updateUrl pour l'application, elle sera utilisée pour vérifier les mises à jour.

| Param         | Type                                            | Description                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | contient l'URL à utiliser pour vérifier les mises à jour. |

**Depuis :** 5.4.0

--------------------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Définir la statsUrl pour l'application, elle sera utilisée pour envoyer des statistiques. Passer une chaîne vide désactivera la collecte de statistiques.

| Param         | Type                                          | Description                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | contient l'URL à utiliser pour envoyer les statistiques. |

**Depuis :** 5.4.0

--------------------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Définir la channelUrl pour l'application, elle sera utilisée pour définir le canal.

| Param         | Type                                              | Description                                      |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | contient l'URL à utiliser pour définir le canal. |

**Depuis :** 5.4.0

--------------------


## download(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Télécharger un nouveau bundle depuis l'URL fournie, il doit être un fichier zip, avec des fichiers à l'intérieur ou avec un identifiant unique à l'intérieur avec tous vos fichiers

| Param         | Type                                                        | Description                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | Les {@link <a href="#downloadoptions">DownloadOptions</a>} pour télécharger un nouveau bundle zip. |

**Retourne :** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## next(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Définir le prochain bundle à utiliser lorsque l'application sera rechargée.

| Param         | Type                                          | Description                                                                                   |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Contient l'ID du prochain Bundle à définir au prochain lancement de l'application. {@link <a href="#bundleinfo">BundleInfo.id</a>} |

**Retourne :** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## set(...)

```typescript
set(options: BundleId) => Promise<void>
```

Définir le bundle actuel et recharger immédiatement l'application.

| Param         | Type                                          | Description                                                                                       |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objet {@link <a href="#bundleid">BundleId</a>} contenant le nouvel ID de bundle à définir comme actuel. |

--------------------


## delete(...)

```typescript
delete(options: BundleId) => Promise<void>
```

Supprimer le bundle spécifié du stockage natif de l'application. Utiliser avec {@link list} pour obtenir les ID des Bundles stockés.

| Param         | Type                                          | Description                                                                                                                                   |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objet {@link <a href="#bundleid">BundleId</a>} contenant l'ID d'un bundle à supprimer (noter que c'est l'ID du bundle, PAS le nom de version) |

--------------------


## list(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Obtenir tous les bundles téléchargés localement dans votre application

| Param         | Type                                                | Description                                                            |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Les {@link <a href="#listoptions">ListOptions</a>} pour lister les bundles |

**Retourne :** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------


## reset(...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Réinitialiser l'application au bundle 'builtin' (celui envoyé à l'Apple App Store / Google Play Store) ou au dernier bundle chargé avec succès.

| Param         | Type                                                  | Description                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Contenant {@link <a href="#resetoptions">ResetOptions.toLastSuccessful</a>}, `true` réinitialise au bundle intégré et `false` réinitialisera au dernier bundle chargé avec succès. |

--------------------


## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Obtenir le bundle actuel, si aucun n'est défini, renvoie 'builtin'. currentNative est le bundle d'origine installé sur l'appareil

**Retourne :** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------


## reload()

```typescript
reload() => Promise<void>
```

Recharger la vue

--------------------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Définit un tableau {@link <a href="#delaycondition">DelayCondition</a>} contenant les conditions que le Plugin utilisera pour retarder la mise à jour.
Une fois toutes les conditions remplies, le processus de mise à jour redémarrera comme d'habitude, la mise à jour sera donc installée après une mise en arrière-plan ou l'arrêt de l'application.
Pour le type 'date', la valeur doit être une chaîne de date iso8601.
Pour le type 'background', la valeur doit être un nombre en millisecondes.
Pour le type 'nativeVersion', la valeur doit être le numéro de version.
Pour le type 'kill', la valeur n'est pas utilisée.
La fonction a un comportement incohérent, l'option kill déclenche la mise à jour après le premier arrêt et non après la prochaine mise en arrière-plan comme les autres options. Cela sera corrigé dans une future version majeure.

| Param         | Type                                                                  | Description                                                                                                |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Contenant le tableau {@link <a href="#multidelayconditions">MultiDelayConditions</a>} des conditions à définir |

**Depuis :** 4.3.0

--------------------


## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Annuler une {@link <a href="#delaycondition">DelayCondition</a>} pour traiter une mise à jour immédiatement.

**Depuis :** 4.0.0

--------------------


## getLatest(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Obtenir le dernier bundle disponible depuis l'URL de mise à jour

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Retourne :** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Depuis :** 4.0.0

--------------------


## setChannel(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Définir le canal pour cet appareil. Le canal doit autoriser l'auto-attribution pour que cela fonctionne.
N'utilisez pas cette méthode pour définir le canal au démarrage.
Cette méthode sert à définir le canal après que l'application est prête et que l'utilisateur a interagi.
Si vous voulez définir le canal au démarrage, utilisez le {@link PluginsConfig} pour définir le canal par défaut.
Cette méthode envoie au backend Capgo une requête pour lier l'ID de l'appareil au canal. Capgo peut accepter ou refuser selon les paramètres de votre canal.

| Param         | Type                                                            | Description                                                                      |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Est le {@link <a href="#setchanneloptions">SetChannelOptions</a>} canal à définir |

**Retourne :** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Depuis :** 4.7.0

--------------------


## unsetChannel(...)

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Désactiver le canal pour cet appareil. L'appareil reviendra ensuite au canal par défaut

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Depuis :** 4.7.0

--------------------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Obtenir le canal pour cet appareil

**Retourne :** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Depuis :** 4.8.0

--------------------


## listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

Lister tous les canaux disponibles pour cet appareil qui permettent l'auto-attribution

**Retourne :** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**Depuis :** 7.5.0

--------------------


## setCustomId(...)

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Définir un ID personnalisé pour cet appareil

| Param         | Type                                                              | Description                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | est le {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId à définir |

**Depuis :** 4.9.0

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Obtenir la version de l'application native ou la version intégrée si définie dans la configuration

**Retourne :** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Depuis :** 5.2.0

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Obtenir l'ID unique utilisé pour identifier l'appareil (envoyé au serveur de mise à jour automatique)

**Retourne :** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Obtenir la version native du plugin Capacitor Updater (envoyée au serveur de mise à jour automatique)

**Retourne :** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Obtenir l'état de la configuration de mise à jour automatique.

**Retourne :** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------


## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Supprimer tous les écouteurs pour ce plugin.

**Depuis :** 1.0.0

--------------------


## addListener('download', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement de téléchargement du bundle dans l'application. Se déclenche une fois qu'un téléchargement a commencé, pendant le téléchargement et une fois terminé.
Cela vous renverra tous les pourcentages de téléchargement pendant le téléchargement

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Retourne :** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Depuis :** 2.0.11

--------------------


## addListener('noNeedUpdate', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement indiquant qu'aucune mise à jour n'est nécessaire, utile lorsque vous voulez forcer la vérification à chaque lancement de l'application

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Retourne :** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Depuis :** 4.0.0

--------------------


## addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement de mise à jour disponible, utile lorsque vous voulez forcer la vérification à chaque lancement de l'application

| Param              | Type                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Retourne :** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Depuis :** 4.0.0

--------------------


## addListener('downloadComplete', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Écouter les événements downloadComplete.

| Param              | Type                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Retourne :** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Depuis :** 4.0.0

--------------------


## addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement de mise à jour majeure dans l'application, vous informe quand une mise à jour majeure est bloquée par le paramètre disableAutoUpdateBreaking

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Retourne :** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Depuis :** 2.3.0

--------------------


## addListener('updateFailed', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement d'échec de mise à jour dans l'application, vous informe quand une mise à jour n'a pas pu être installée au prochain démarrage de l'application

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Retourne :** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Depuis :** 2.3.0

--------------------


## addListener('downloadFailed', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement d'échec de téléchargement dans l'application, vous informe lorsqu'un téléchargement de bundle a échoué

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Retourne :** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Depuis :** 4.0.0

--------------------


## addListener('appReloaded', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Écouter l'événement de rechargement dans l'application, vous informe lorsqu'un rechargement s'est produit

| Param              | Type                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Retourne :** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Depuis :** 4.3.0

--------------------


## addListener('appReady', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement "app ready" dans l'application, vous informe lorsque l'application est prête à être utilisée

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'appReady'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Retourne :** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Depuis :** 5.1.0

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Vérifier si la mise à jour automatique est disponible (non désactivée par serverUrl).

**Retourne :** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Obtenir le prochain bundle qui sera utilisé lors du rechargement de l'application.
Renvoie null si aucun prochain bundle n'est défini.

**Retourne :** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Depuis :** 6.8.0

--------------------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Activer ou désactiver le menu de secousse à des fins de débogage/test

| Param         | Type                                                                | Description                                              |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> | Contient le boolean enabled pour activer ou désactiver le menu de secousse |

**Depuis :** 7.5.0

--------------------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Obtenir l'état actuel du menu de secousse

**Retourne :** <code>Promise&lt;<a href="#shakemenuenabled">ShakeMenuEnabled</a>&gt;</code>

**Depuis :** 7.5.0

--------------------


## Interfaces


### AppReadyResult

| Prop         | Type                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Prop             | Type                                                  |
| ---------------- | ----------------------------------------------------- |
| **`id`**         | <code>string</code>                                   |
| **`version`**    | <code>string</code>                                   |
| **`downloaded`** | <code>string</code>                                   |
| **`checksum`**   | <code>string</code>                                   |
| **`status`**     | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ChannelUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### DownloadOptions

Cette URL et ces versions sont utilisées pour télécharger le bundle depuis le serveur. Si vous utilisez le backend, toutes les informations seront fournies par la méthode getLatest.
Si vous n'utilisez pas le backend, vous devez fournir l'URL et la version du bundle. Checksum et sessionKey sont requis si vous avez chiffré le bundle avec la commande CLI encrypt, vous devriez les recevoir comme résultat de la commande.

| Prop             | Type                         | Description                                                                                                                                                      | Par défaut             | Depuis |
| ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------ |
| **`url`**        | <code>string</code>          | L'URL du fichier zip du bundle (par exemple : dist.zip) à télécharger. (Cela peut être n'importe quelle URL. Par exemple : Amazon S3, un tag GitHub, tout autre endroit où vous avez hébergé votre bundle.) |                        |        |
| **`version`**    | <code>string</code>          | Le code/nom de version de ce bundle/version                                                                                                                     |                        |        |
| **`sessionKey`** | <code>string</code>          | La clé de session pour la mise à jour, lorsque le bundle est chiffré avec une clé de session                                                                    | <code>undefined</code> | 4.0.0  |
| **`checksum`**   | <code>string</code>          | La somme de contrôle pour la mise à jour, elle devrait être en sha256 et chiffrée avec une clé privée si le bundle est chiffré                                  | <code>undefined</code> | 4.0.0  |
| **`manifest`**   | <code>ManifestEntry[]</code> | Le manifeste pour les téléchargements multi-fichiers                                                                                                            | <code>undefined</code> | 6.1.0  |


### ManifestEntry

| Prop               | Type                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### BundleId

| Prop     | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| Prop          | Type                      |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Prop      | Type                 | Description                                                                                                                                   | Par défaut         | Depuis |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | Si renvoyer la liste brute des bundles ou le manifeste. Si true, la liste tentera de lire la base de données interne au lieu des fichiers sur le disque. | <code>false</code> | 6.14.0 |


### ResetOptions

| Prop                   | Type                 |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Prop         | Type                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code>                               |


### MultiDelayConditions

| Prop                  | Type                          |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| Prop        | Type                                                      | Description                              |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Configurer les conditions de délai dans setMultiDelay |
| **`value`** | <code>string</code>                                       |                                          |


### LatestVersion

| Prop             | Type                         | Description                | Depuis |
| ---------------- | ---------------------------- | -------------------------- | ------ |
| **`version`**    | <code>string</code>          | Résultat de la méthode getLatest | 4.0.0  |
| **`checksum`**   | <code>string</code>          |                            | 6      |
| **`major`**      | <code>boolean</code>         |                            |        |
| **`message`**    | <code>string</code>          |                            |        |
| **`sessionKey`** | <code>string</code>          |                            |        |
| **`error`**      | <code>string</code>          |                            |        |
| **`old`**        | <code>string</code>          |                            |        |
| **`url`**        | <code>string</code>          |                            |        |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 6.1    |


### GetLatestOptions

| Prop          | Type                | Description                                                                                     | Par défaut             | Depuis |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ------ |
| **`channel`** | <code>string</code> | Le canal pour obtenir la dernière version. Le canal doit autoriser 'self_assign' pour fonctionner | <code>undefined</code> | 6.8.0  |


### ChannelRes

| Prop          | Type                | Description                   | Depuis |
| ------------- | ------------------- | ----------------------------- | ------ |
| **`status`**  | <code>string</code> | État actuel du canal défini   | 4.7.0  |
| **`error`**   | <code>string</code> |                               |        |
| **`message`** | <code>string</code> |                               |        |


### SetChannelOptions

| Prop                    | Type                 |
| ----------------------- | -------------------- |
| **`channel`**           | <code>string</code>  |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| Prop                    | Type                 |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes

| Prop           | Type                 | Description                     | Depuis |
| -------------- | -------------------- | ------------------------------- | ------ |
| **`channel`**  | <code>string</code>  | État actuel de l'obtention du canal | 4.8.0  |
| **`error`**    | <code>string</code>  |                                 |        |
| **`message`**  | <code>string</code>  |                                 |        |
| **`status`**   | <code>string</code>  |                                 |        |
| **`allowSet`** | <code>boolean</code> |                                 |        |


### ListChannelsResult

| Prop           | Type                       | Description                | Depuis |
| -------------- | -------------------------- | -------------------------- | ------ |
| **`channels`** | <code>ChannelInfo[]</code> | Liste des canaux disponibles | 7.5.0  |


### ChannelInfo

| Prop                 | Type                 | Description                                     | Depuis |
| -------------------- | -------------------- | ----------------------------------------------- | ------ |
| **`id`**             | <code>string</code>  | L'ID du canal                                   | 7.5.0  |
| **`name`**           | <code>string</code>  | Le nom du canal                                 | 7.5.0  |
| **`public`**         | <code>boolean</code> | Si c'est un canal public                        | 7.5.0  |
| **`allow_self_set`** | <code>boolean</code> | Si les appareils peuvent s'auto-attribuer à ce canal | 7.5.0  |


### SetCustomIdOptions

| Prop           | Type                |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| Prop          | Type                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### DeviceId

| Prop           | Type                |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| Prop          | Type                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| Prop          | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### DownloadEvent

| Prop          | Type                                              | Description                                    | Depuis |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ------ |
| **`percent`** | <code>number</code>                               | État actuel du téléchargement, entre 0 et 100. | 4.0.0  |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |        |


### NoNeedEvent

| Prop         | Type                                              | Description                                    | Depuis |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ------ |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | État actuel du téléchargement, entre 0 et 100. | 4.0.0  |


### UpdateAvailableEvent

| Prop         | Type                                              | Description                                    | Depuis |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ------ |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | État actuel du téléchargement, entre 0 et 100. | 4.0.0  |


### DownloadCompleteEvent

| Prop         | Type                                              | Description                          | Depuis |
| ------------ | ------------------------------------------------- | ------------------------------------ | ------ |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Émis lorsqu'une nouvelle mise à jour est disponible. | 4.0.0  |


### MajorAvailableEvent

| Prop          | Type                | Description                                | Depuis |
| ------------- | ------------------- | ------------------------------------------ | ------ |
| **`version`** | <code>string</code> | Émis lorsqu'une nouvelle version majeure est disponible. | 4.0.0  |


### UpdateFailedEvent

| Prop         | Type                                              | Description                           | Depuis |
| ------------ | ------------------------------------------------- | ------------------------------------- | ------ |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Émis lorsqu'une mise à jour a échoué à s'installer. | 4.0.0  |


### DownloadFailedEvent

| Prop          | Type                | Description                | Depuis |
| ------------- | ------------------- | -------------------------- | ------ |
| **`version`** | <code>string</code> | Émis lorsqu'un téléchargement échoue. | 4.0.0  |


### AppReadyEvent

| Prop         | Type                                              | Description                           | Depuis |
| ------------ | ------------------------------------------------- | ------------------------------------- | ------ |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Émis lorsque l'application est prête à être utilisée. | 5.2.0  |
| **`status`** | <code>string</code>                               |                                       |        |


### AutoUpdateAvailable

| Prop            | Type                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


### SetShakeMenuOptions

| Prop          | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### ShakeMenuEnabled

| Prop          | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


## Alias de types


### BundleStatus

pending : Le bundle est en attente d'être **DÉFINI** comme prochain bundle.
downloading : Le bundle est en cours de téléchargement.
success : Le bundle a été téléchargé et est prêt à être **DÉFINI** comme prochain bundle.
error : Le téléchargement du bundle a échoué.

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-api>
