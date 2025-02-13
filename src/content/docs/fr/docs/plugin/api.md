---
title: Fonctions et paramètres
description: Les méthodes et configurations disponibles du plugin
sidebar:
  order: 2
locale: fr
---

# Configuration du Plugin Updater

Voir le [Readme](https://github.com/Cap-go/capacitor-updater) Github pour plus d'informations

<docgen-config>

CapacitorUpdater peut être configuré avec ces options :

| Prop                         | Type                 | Description                                                                                                                                                                                     | Par défaut                                         | Depuis  |
| ---------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>  | Configure le nombre de millisecondes pendant lesquelles le plugin natif doit attendre avant de considérer une mise à jour comme 'échouée' Disponible uniquement pour Android et iOS           | <code>10000 // (10 secondes)</code>                |         |
| **`responseTimeout`**        | <code>number</code>  | Configure le nombre de millisecondes pendant lesquelles le plugin natif doit attendre avant de considérer l'API comme expirée Disponible uniquement pour Android et iOS                      | <code>20 // (20 secondes)</code>                   |         |
| **`autoDeleteFailed`**       | <code>boolean</code> | Configure si le plugin doit automatiquement supprimer les bundles échoués Disponible uniquement pour Android et iOS                                                                          | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code> | Configure si le plugin doit automatiquement supprimer les bundles précédents après une mise à jour réussie Disponible uniquement pour Android et iOS                                        | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code> | Configure si le plugin doit utiliser la mise à jour automatique via un serveur de mise à jour Disponible uniquement pour Android et iOS                                                     | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code> | Supprime automatiquement les bundles précédemment téléchargés lors de l'installation d'une nouvelle version native de l'application Disponible uniquement pour Android et iOS               | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>  | Configure l'URL / point de terminaison vers lequel les vérifications de mise à jour sont envoyées Disponible uniquement pour Android et iOS                                                  | <code>https://plugincapgoapp/updates</code>      |         |
| **`channelUrl`**             | <code>string</code>  | Configure l'URL / point de terminaison pour les opérations de canal Disponible uniquement pour Android et iOS                                                                                | <code>https://plugincapgoapp/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>  | Configure l'URL / point de terminaison vers lequel les statistiques de mise à jour sont envoyées Disponible uniquement pour Android et iOS Mettre à "" pour désactiver les rapports stats | <code>https://plugincapgoapp/stats</code>        |         |
| **`privateKey`**             | <code>string</code>  | Configure la clé privée pour le chiffrement de bout en bout des mises à jour en direct Disponible uniquement pour Android et iOS Déprécié en version 620, sera supprimé en version 700   | <code>undefined</code>                             |         |
| **`publicKey`**              | <code>string</code>  | Configure la clé publique pour le chiffrement de bout en bout des mises à jour en direct Version 2 Disponible uniquement pour Android et iOS                                                | <code>undefined</code>                             | 620   |
| **`version`**                | <code>string</code>  | Configure la version actuelle de l'application Sera utilisé pour la première demande de mise à jour Si non défini, le plugin obtiendra la version du code natif Disponible pour Android/iOS | <code>undefined</code>                             | 41748 |
| **`directUpdate`**           | <code>boolean</code> | Fait installer directement la mise à jour par le plugin lorsque l'application vient d'être mise à jour/installée Uniquement pour le mode autoUpdate Android et iOS uniquement              | <code>undefined</code>                             | 510   |
| **`periodCheckDelay`**       | <code>number</code>  | Configure le délai de vérification périodique des mises à jour en secondes Disponible uniquement pour Android et iOS Ne peut pas être inférieur à 600 secondes (10 minutes)              | <code>600 // (10 minutes)</code>                   |         |
| **`localS3`**                | <code>boolean</code> | Configure le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé                                                                                     | <code>undefined</code>                             | 41748 |
| **`localHost`**              | <code>string</code>  | Configure le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé                                                                                     | <code>undefined</code>                             | 41748 |
| **`localWebHost`**           | <code>string</code>  | Configure le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé                                                                                     | <code>undefined</code>                             | 41748 |
| **`localSupa`**              | <code>string</code>  | Configure le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé                                                                                     | <code>undefined</code>                             | 41748 |
| **`localSupaAnon`**          | <code>string</code>  | Configure le CLI pour utiliser un serveur local pour les tests                                                                                                                                | <code>undefined</code>                             | 41748 |
| **`localApi`**               | <code>string</code>  | Configure le CLI pour utiliser une API locale pour les tests                                                                                                                                  | <code>undefined</code>                             | 633   |
| **`localApiFiles`**          | <code>string</code>  | Configure le CLI pour utiliser une API de fichiers locale pour les tests                                                                                                                      | <code>undefined</code>                             | 633   |
| **`allowModifyUrl`**         | <code>boolean</code> | Permet au plugin de modifier dynamiquement updateUrl, statsUrl et channelUrl depuis le côté JavaScript                                                                                        | <code>false</code>                                 | 540   |
| **`defaultChannel`**         | <code>string</code>  | Définit le canal par défaut pour l'application dans la configurationVoici la traduction en français :

| <code>undefined</code> | 550 |
| **`appId`** | <code>string</code> | Configurer l'identifiant de l'application dans la configuration | <code>undefined</code> | 600 |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | Configurer le plugin pour conserver le chemin URL après un rechargement ATTENTION : Lorsqu'un rechargement est déclenché, 'windowhistory' sera effacé | <code>false</code> | 680 |

## Exemples

Dans `capacitorconfigjson` :

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
      "updateUrl": https://examplecom/api/auto_update,
      "channelUrl": https://examplecom/api/channel,
      "statsUrl": https://examplecom/api/stats,
      "privateKey": undefined,
      "publicKey": undefined,
      "version": undefined,
      "directUpdate": undefined,
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
      "keepUrlPathAfterReload": undefined
    }
  }
}
```

Dans `capacitorconfigts` :

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
      updateUrl: https://examplecom/api/auto_update,
      channelUrl: https://examplecom/api/channel,
      statsUrl: https://examplecom/api/stats,
      privateKey: undefined,
      publicKey: undefined,
      version: undefined,
      directUpdate: undefined,
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
    },
  },
};

export default config;
```

</docgen-config>

<docgen-index>

* [`notifyAppReady()`](#notifyappready)
* [`setUpdateUrl()`](#setupdateurl)  
* [`setStatsUrl()`](#setstatsurl)
* [`setChannelUrl()`](#setchannelurl)
* [`download()`](#download)
* [`next()`](#next)
* [`set()`](#set)
* [`delete()`](#delete)
* [`list()`](#list)
* [`reset()`](#reset)
* [`current()`](#current)
* [`reload()`](#reload)
* [`setMultiDelay()`](#setmultidelay)
* [`cancelDelay()`](#canceldelay)
* [`getLatest()`](#getlatest)
* [`setChannel()`](#setchannel)
* [`unsetChannel()`](#unsetchannel)
* [`getChannel()`](#getchannel)
* [`setCustomId()`](#setcustomid)
* [`getBuiltinVersion()`](#getbuiltinversion)
* [`getDeviceId()`](#getdeviceid)
* [`getPluginVersion()`](#getpluginversion)
* [`isAutoUpdateEnabled()`](#isautoupdateenabled)
* [`removeAllListeners()`](#removealllisteners)
* [`addListener('download', )`](#addlistenerdownload-)
* [`addListener('noNeedUpdate', )`](#addlistenernoneedupdate-)
* [`addListener('updateAvailable', )`](#addlistenerupdateavailable-)
* [`addListener('downloadComplete', )`](#addlistenerdownloadcomplete-)
* [`addListener('majorAvailable', )`](#addlistenermajoravailable-)
* [`addListener('updateFailed', )`](#addlistenerupdatefailed-)
* [`addListener('downloadFailed', )`](#addlistenerdownloadfailed-)
* [`addListener('appReloaded', )`](#addlistenerappreloaded-)
* [`addListener('appReady', )`](#addlistenerappready-)
* [`isAutoUpdateAvailable()`](#isautoupdateavailable)
* [`getNextBundle()`](#getnextbundle)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

# Méthodes

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notifier Capacitor Updater que le bundle actuel fonctionne (un retour en arrière se produira si cette méthode n'est pas appelée à chaque lancement de l'application)
Par défaut, cette méthode doit être appelée dans les 10 premières secondes après le lancement de l'application, sinon un retour en arrière se produira
Modifiez ce comportement avec {@link appReadyTimeout}

**Retourne:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------

## setUpdateUrl()

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Définir l'updateUrl pour l'application, elle sera utilisée pour vérifier les mises à jour

| Param | Type | Description |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | contient l'URL à utiliser pour vérifier les mises à jour |

**Depuis:** 540

--------------------

## setStatsUrl()

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Définir la statsUrl pour l'application, elle sera utilisée pour envoyer des statistiques. Passer une chaîne vide désactivera la collecte de statistiques

| Param | Type | Description |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | contient l'URL à utiliser pour envoyer les statistiques |

**Depuis:** 540

--------------------

## setChannelUrl()

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Définir la channelUrl pour l'application, elle sera utilisée pour définir le canal

| Param | Type | Description |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | contient l'URL à utiliser pour définir le canal |

**Depuis:** 540

--------------------

## download()

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Télécharger un nouveau bundle depuis l'URL fournie, il doit être un fichier zip, avec des fichiers à l'intérieur ou avec un identifiant unique à l'intérieur avec tous vos fichiers

| Param | Type | Description |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | Les {@link <a href="#downloadoptions">DownloadOptions</a>} pour télécharger un nouveau bundle zip |

**Retourne:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## next()

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Définir le prochain bundle à utiliser lorsque l'application sera rechargée| Param | Type | Description |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Contient l'ID du prochain Bundle à définir lors du prochain lancement de l'application {@link <a href="#bundleinfo">BundleInfoid</a>} |

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## set()

```typescript
set(options: BundleId) => Promise<void>
```

Définit le bundle actuel et recharge immédiatement l'application

| Param | Type | Description |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objet {@link <a href="#bundleid">BundleId</a>} contenant le nouveau bundle id à définir comme actuel |

--------------------

## delete()

```typescript
delete(options: BundleId) => Promise<void>
```

Supprime le bundle spécifié du stockage natif de l'application. Utiliser avec {@link list} pour obtenir les ID des Bundles stockés

| Param | Type | Description |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objet {@link <a href="#bundleid">BundleId</a>} contenant l'ID d'un bundle à supprimer (noter que c'est l'id du bundle, PAS le nom de la version) |

--------------------

## list()

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Obtenir tous les bundles téléchargés localement dans votre application

| Param | Type | Description |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Les {@link <a href="#listoptions">ListOptions</a>} pour lister les bundles |

**Returns:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------

## reset()

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Réinitialiser l'application au bundle 'builtin' (celui envoyé à l'Apple App Store / Google Play Store) ou au dernier bundle chargé avec succès

| Param | Type | Description |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Contenant {@link <a href="#resetoptions">ResetOptionstoLastSuccessful</a>}, `true` réinitialise au bundle intégré et `false` réinitialisera au dernier bundle chargé avec succès |

--------------------

## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Obtenir le bundle actuel, si aucun n'est défini, renvoie 'builtin'. currentNative est le bundle d'origine installé sur l'appareil

**Returns:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------

## reload()

```typescript
reload() => Promise<void>
```

Recharger la vue

--------------------

## setMultiDelay()

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

| Param | Type | Description |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Contenant le tableau {@link <a href="#multidelayconditions">MultiDelayConditions</a>} des conditions à définir |

**Since:** 430

--------------------

## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Annule une {@link <a href="#delaycondition">DelayCondition</a>} pour traiter une mise à jour immédiatement

**Since:** 400

--------------------

## getLatest()

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Obtenir le dernier bundle disponible depuis l'URL de mise à jour

| Param | Type | 
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Since:** 400

--------------------

## setChannel()

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Définit le canal pour cet appareil. Le canal doit autoriser l'auto-attribution pour que cela fonctionne.
N'utilisez pas cette méthode pour définir le canal au démarrage lorsque `autoUpdate` est activé dans {@link PluginsConfig}.
Cette méthode sert à définir le canal après que l'application est prête.
Cette méthode envoie au backend Capgo une requête pour lier l'ID de l'appareil au canal. Capgo peut accepter ou refuser selon les paramètres de votre canal.

| Param | Type | Description |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Est le canal {@link <a href="#setchanneloptions">SetChannelOptions</a>} à définir |

**Returns:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Since:** 470

--------------------

## unsetChannel()

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Désactive le canal pour cet appareilL'appareil reviendra ensuite au canal par défaut

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Since:** 470

--------------------

## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Obtenir le canal pour cet appareil

**Returns:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Since:** 480

--------------------

## setCustomId()

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Définir un ID personnalisé pour cet appareil

| Param         | Type                                                              | Description                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | est le {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId à définir |

**Since:** 490

--------------------

## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Obtenir la version de l'application native ou la version intégrée si définie dans la configuration

**Returns:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Since:** 520

--------------------

## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Obtenir l'ID unique utilisé pour identifier l'appareil (envoyé au serveur de mise à jour automatique)

**Returns:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------

## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Obtenir la version native du plugin Capacitor Updater (envoyée au serveur de mise à jour automatique)

**Returns:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------

## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Obtenir l'état de la configuration de mise à jour automatique

**Returns:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------

## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Supprimer tous les écouteurs pour ce plugin

**Since:** 100

--------------------

## addListener('download', )

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement de téléchargement du bundle dans l'application. Se déclenche une fois qu'un téléchargement a commencé, pendant le téléchargement et une fois terminé

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2011

--------------------

## addListener('noNeedUpdate', )

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement indiquant qu'aucune mise à jour n'est nécessaire, utile lorsque vous voulez forcer la vérification à chaque lancement de l'application

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('updateAvailable', )

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement de mise à jour disponible, utile lorsque vous voulez forcer la vérification à chaque lancement de l'application

| Param              | Type                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('downloadComplete', )

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Écouter les événements downloadComplete

| Param              | Type                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('majorAvailable', )

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement de mise à jour majeure dans l'application, vous informe quand une mise à jour majeure est bloquée par le paramètre disableAutoUpdateBreaking

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 230

--------------------

## addListener('updateFailed', )

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement d'échec de mise à jour dans l'application, vous informe quand une mise à jour n'a pas pu être installée au prochain démarrage de l'application

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 230

--------------------

## addListener('downloadFailed',```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement d'échec de téléchargement dans l'application, vous informe lorsqu'un téléchargement de bundle a échoué

| Param | Type | 
|----------|-------------|
| **`eventName`** | <code>'downloadFailed'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('appReloaded', )

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Écouter l'événement de rechargement dans l'application, vous informe lorsqu'un rechargement s'est produit

| Param | Type |
|----------|-------------|
| **`eventName`** | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 430

--------------------

## addListener('appReady', )

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Écouter l'événement "app ready" dans l'application, vous informe lorsque l'application est prête à être utilisée

| Param | Type |
|----------|-------------|
| **`eventName`** | <code>'appReady'</code> |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 510

--------------------

## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Vérifier si la mise à jour automatique est disponible (non désactivée par serverUrl)

**Returns:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------

## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Obtenir le prochain bundle qui sera utilisé lors du rechargement de l'application
Renvoie null si aucun prochain bundle n'est défini

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Since:** 680

--------------------

## Interfaces


### AppReadyResult

| Prop | Type |
|----------|-------------|
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Prop | Type |
|----------|-------------|
| **`id`** | <code>string</code> |
| **`version`** | <code>string</code> |
| **`downloaded`** | <code>string</code> |
| **`checksum`** | <code>string</code> |
| **`status`** | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Prop | Type |
|----------|-------------|
| **`url`** | <code>string</code> |


### StatsUrl

| Prop | Type |
|----------|-------------|
| **`url`** | <code>string</code> |


### ChannelUrl

| Prop | Type |
|----------|-------------|
| **`url`** | <code>string</code> |


### DownloadOptions

| Prop | Type | Description | Default | Since |
|----------|-------------|-------------|---------|--------|
| **`url`** | <code>string</code> | L'URL du fichier zip du bundle (par exemple : distzip) à télécharger (Cela peut être n'importe quelle URL, par exemple : Amazon S3, un tag GitHub, tout autre endroit où vous avez hébergé votre bundle) | | |
| **`version`** | <code>string</code> | Le code/nom de version de ce bundle/version | | |
| **`sessionKey`** | <code>string</code> | La clé de session pour la mise à jour | <code>undefined</code> | 400 |
| **`checksum`** | <code>string</code> | La somme de contrôle pour la mise à jour | <code>undefined</code> | 400 |


### BundleId

| Prop | Type |
|----------|-------------|
| **`id`** | <code>string</code> |


### BundleListResult

| Prop | Type |
|----------|-------------|
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Prop | Type | Description | Default | Since |
|----------|-------------|-------------|---------|--------|
| **`raw`** | <code>boolean</code> | Indique s'il faut renvoyer la liste brute des bundles ou le manifeste. Si vrai, la liste tentera de lire la base de données interne au lieu des fichiers sur le disque | <code>false</code> | 6140 |


### ResetOptions

| Prop | Type |
|----------|-------------|
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Prop | Type |
|----------|-------------|
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code> |


### MultiDelayConditions

| Prop | Type |
|----------|-------------|
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| Prop | Type | Description |
|----------|-------------|-------------|
| **`kind`** | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Configurer les conditions de délai dans setMultiDelay |
| **`value`** | <code>string</code> | |


### LatestVersion

| Prop | Type | Description | Since |
|----------|-------------|-------------|--------|
| **`version`** | <code>string</code> | Résultat de la méthode getLatest | 40| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 61   |


### ManifestEntry

| Prop               | Type                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### GetLatestOptions

| Prop          | Type                | Description                                                                                      | Default                | Since |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------ | ---------------------- | ----- |
| **`channel`** | <code>string</code> | Le canal pour obtenir la dernière version. Le canal doit autoriser 'self_assign' pour fonctionner | <code>undefined</code> | 680   |


### ChannelRes

| Prop          | Type                | Description                    | Since |
| ------------- | ------------------- | ------------------------------ | ----- |
| **`status`**  | <code>string</code> | État actuel du canal défini    | 470   |
| **`error`**   | <code>string</code> |                                |       |
| **`message`** | <code>string</code> |                                |       |


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

| Prop           | Type                 | Description                     | Since |
| -------------- | -------------------- | ------------------------------- | ----- |
| **`channel`**  | <code>string</code>  | État actuel de l'obtention du canal | 480   |
| **`error`**    | <code>string</code>  |                                 |       |
| **`message`**  | <code>string</code>  |                                 |       |
| **`status`**   | <code>string</code>  |                                 |       |
| **`allowSet`** | <code>boolean</code> |                                 |       |


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

| Prop          | Type                                              | Description                                    | Since |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | État actuel du téléchargement, entre 0 et 100  | 400   |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | État actuel du téléchargement, entre 0 et 100  | 400   |


### UpdateAvailableEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | État actuel du téléchargement, entre 0 et 100  | 400   |


### DownloadCompleteEvent

| Prop         | Type                                              | Description                             | Since |
| ------------ | ------------------------------------------------- | --------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Émis quand une nouvelle mise à jour est disponible | 400   |


### MajorAvailableEvent

| Prop          | Type                | Description                                           | Since |
| ------------- | ------------------- | ----------------------------------------------------- | ----- |
| **`version`** | <code>string</code> | Émis quand une nouvelle version majeure est disponible | 400   |


### UpdateFailedEvent

| Prop         | Type                                              | Description                                      | Since |
| ------------ | ------------------------------------------------- | ------------------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Émis quand une mise à jour a échoué à l'installation | 400   |


### DownloadFailedEvent

| Prop          | Type                | Description                            | Since |
| ------------- | ------------------- | -------------------------------------- | ----- |
| **`version`** | <code>string</code> | Émis quand un téléchargement échoue    | 400   |


### AppReadyEvent

| Prop         | Type                                              | Description                            | Since |
| ------------ | ------------------------------------------------- | -------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Émis quand l'application est prête à être utilisée | 520   |
| **`status`** | <code>string</code>                               |                                        |       |


### AutoUpdateAvailable

| Prop            | Type                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


## Type Aliases


### BundleStatus

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>
