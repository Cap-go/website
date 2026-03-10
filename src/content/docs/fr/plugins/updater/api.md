---
title: Fonctions et paramètres
description: Toutes les méthodes et paramètres disponibles du plugin
sidebar:
  order: 2
locale: fr
---
# Configuration du plugin de mise à jour

Consultez le [Readme](https://github.com/Cap-go/capacitor-updater) de Github pour plus d'informations.

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater peut être configuré avec ces options :| Accessoire | Tapez | Descriptif | Par défaut | Depuis |
| ---------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`** | <code>numéro</code> | Configurez le nombre de millisecondes que le plugin natif doit attendre avant de considérer une mise à jour comme « échouée ». Disponible sur Android, iOS et Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>10000 // (10 secondes)</code> |         |
| **`responseTimeout`** | <code>numéro</code> | Configurez le nombre de millisecondes que le plugin natif doit attendre avant de prendre en compte le délai d'attente API. Disponible sur Android, iOS et Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>20000 // (20 secondes)</code> |         |
| **`autoDeleteFailed`** | <code>booléen</code> | Configurez si le plugin doit utiliser la suppression automatique des bundles ayant échoué. Disponible sur Android, iOS et Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>true</code> |         |
| **`autoDeletePrevious`** | <code>booléen</code> | Configurez si le plugin doit utiliser la suppression automatique des bundles précédents après une mise à jour réussie. Disponible sur Android, iOS et Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>true</code> |         |
| **`autoUpdate`** | <code>booléen</code> | Configurez si le plugin doit utiliser la mise à jour automatique via un serveur de mise à jour. Disponible sur Android, iOS et Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>true</code> |         |
| **`resetWhenUpdate`** | <code>booléen</code> | Supprimez automatiquement les bundles téléchargés précédents lorsqu'un bundle d'applications natives plus récent est installé sur l'appareil. Disponible sur Android, iOS et Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>true</code> |         |
| **`updateUrl`** | <code>string</code> | Configurez l'URL/le point de terminaison auquel les vérifications de mise à jour sont envoyées. Disponible sur Android, iOS et Electron.| <code>https://plugin.capgo.app/updates</code> |         |
| **`channelUrl`** | <code>string</code> | Configurez l'URL/le point de terminaison pour les opérations de canal. Disponible sur Android, iOS et Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`** | <code>string</code> | Configurez l'URL/le point de terminaison auquel les statistiques de mise à jour sont envoyées. Disponible sur Android, iOS et Electron. Réglez sur "" pour désactiver les rapports de statistiques.                                                                                                                                                                                                                                                                                                                                                                                                                                       | <code>https://plugin.capgo.app/stats</code> |         |
| **`publicKey`** | <code>string</code>                             | Configure the public key for end to end live update encryption Version 2. Available on Android, iOS, and Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                                             | <code>undefined</code>                             | 6.2.0 |
| **`version`** | <code>string</code>                             | Configurez la version actuelle de l'application. Celui-ci sera utilisé pour la première demande de mise à jour. If not set, the plugin will get the version from the native code. Disponible sur Android, iOS et Electron.| <code>undefined</code> | 4.17.48 |
| **`directUpdate`** | <code>booléen \| 'toujours' \| 'atInstall' \| 'au lancement'</code> | Configurez quand le plugin doit diriger l’installation des mises à jour. Uniquement pour le mode autoUpdate. Fonctionne bien pour les applications de moins de 10 Mo et avec les téléchargements effectués à l'aide de l'indicateur --delta. Les fichiers Zip ou les applications de plus de 10 Mo seront relativement lents à mettre à jour pour les utilisateurs. - false : ne jamais effectuer de mises à jour directes (utiliser le comportement par défaut : télécharger au démarrage, défini en arrière-plan) - atInstall : mise à jour directe uniquement lorsque l'application est installée, mise à jour depuis le magasin, sinon agir comme directUpdate = false - onLaunch : mise à jour directe uniquement sur l'application installée, mise à jour depuis le magasin ou après la suppression de l'application, sinon agir comme directUpdate = false - toujours : mise à jour directe dans tous les cas précédents (application installée, mise à jour depuis le magasin, après la suppression ou la reprise de l'application), ne jamais agir comme directUpdate = false - true : (obsolète) Idem comme "toujours" pour une compatibilité descendante. Disponible sur Android, iOS et Electron. | <code>false</code> | 5.1.0 |
| **`autoSplashscreen`** | <code>booléen</code> | Gérez automatiquement le masquage de l’écran de démarrage lors de l’utilisation de directUpdate. Lorsqu'il est activé, le plugin masquera automatiquement l'écran de démarrage une fois les mises à jour appliquées ou lorsqu'aucune mise à jour n'est nécessaire. Cela supprime le besoin d'écouter manuellement les événements appReady et d'appeler SplashScreen.hide(). Fonctionne uniquement lorsque directUpdate est défini sur "atInstall", "always" ou true. Nécessite que le plugin @capacitor/splash-screen soit installé et configuré avec launchAutoHide : false. Nécessite l’activation d’autoUpdate et de directUpdate. Disponible sur Android et iOS.                      | <code>false</code> | 7.6.0 |
| **`periodCheckDelay`** | <code>numéro</code> | Configurez le délai pour la vérification de la mise à jour de la période. l'unité est en secondes. Disponible sur Android, iOS et Electron. Ne peut pas être inférieur à 600 secondes (10 minutes).                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>600 // (10 minutes)</code> |         |
| **`localS3`** | <code>booléen</code> | Configurez le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé.| <code>undefined</code> | 4.17.48 |
| **`localHost`** | <code>string</code> | Configurez le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code> | 4.17.48 |
| **`localWebHost`** | <code>string</code> | Configurez le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code> | 4.17.48 |
| **`localSupa`** | <code>string</code> | Configurez le CLI pour utiliser un serveur local pour les tests ou un serveur de mise à jour auto-hébergé.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code> | 4.17.48 |
| **`localSupaAnon`** | <code>string</code> | Configurez le CLI pour utiliser un serveur local pour les tests.| <code>non défini</code> | 4.17.48 |
| **`localApi`** | <code>string</code> | Configurez le CLI pour utiliser une API locale pour les tests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code> | 6.3.3 |
| **`localApiFiles`** | <code>string</code> | Configurez le CLI pour utiliser une API de fichier local pour les tests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>undefined</code> | 6.3.3 |
| **`allowModifyUrl`** | <code>booléen</code> | Autorisez le plugin à modifier dynamiquement updateUrl, statsUrl et channelUrl du côté JavaScript.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code> | 5.4.0 |
| **`defaultChannel`** | <code>string</code> | Définissez le canal par défaut pour l'application dans la configuration. Sensible aux majuscules et minuscules. Ce paramètre remplacera le canal par défaut défini dans le cloud, mais respectera toujours les remplacements effectués dans le cloud.                                                                                                                                                                                                                                                                                                                                                                                      | <code>undéfini</code> | 5.5.0 |
| **`appId`**                  | <code>string</code> | Configurez l'ID de l'application pour l'application dans la configuration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>undefined</code> | 6.0.0 |
| **`keepUrlPathAfterReload`** | <code>booléen</code> | Configurez le plugin pour conserver le chemin de l'URL après un rechargement. AVERTISSEMENT : lorsqu'un rechargement est déclenché, 'window.history' sera effacé.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code> | 6.8.0 |
| **`disableJSLogging`** | <code>booléen</code> | Désactivez la journalisation JavaScript du plugin. si c'est vrai, le plugin ne se connectera pas à la console JavaScript. seul le log natif sera réalisé | <code>false</code> | 7.3.0 |
| **`shakeMenu`** | <code>booléen</code> | Activer le geste de secousse pour afficher le menu de mise à jour à des fins de débogage/test | <code>false</code> | 7.5.0 |## Exemples

Dans `capacitor.config.json` :

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 second),
      "responseTimeout": 10 // (10 second),
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

Dans `capacitor.config.ts` :

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1 second),
      responseTimeout: 10 // (10 second),
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
* [`setUpdateUrl(...)`](#setupdateur)
* [`setStatsUrl(...)`](#setstatsurl)
* [`setChannelUrl(...)`](#setchannelurl)
* [`download(...)`](#téléchargement)
* [`next(...)`](#suivant)
* [`set(...)`](#ensemble)
* [`delete(...)`](#delete)
* [`list(...)`](#liste)
* [`reset(...)`](#réinitialisation)
* [`current()`](#actuel)
* [`reload()`](#rechargement)
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
* [Type d'alias](#type-aliases)

</docgen-index>

# Méthodes

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Informez Capacitor Updater que le bundle actuel fonctionne (une restauration se produira si cette méthode n'est pas appelée à chaque lancement d'application)
Par défaut, cette méthode doit être appelée dans les 10 premières secondes après le lancement de l'application, sinon une restauration se produira.
Modifiez ce comportement avec {@link appReadyTimeout}

**Retours :** <code>Promise<<a href="#appreadyresult">AppReadyResult</a>></code>

--------------------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Définissez la updateUrl pour l'application, elle sera utilisée pour vérifier les mises à jour.

| Paramètres | Tapez | Descriptif |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | contient l'URL à utiliser pour vérifier les mises à jour. |

**Depuis :** 5.4.0

--------------------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Définissez la statsUrl pour l'application, elle sera utilisée pour envoyer des statistiques. Passer une chaîne vide désactivera la collecte de statistiques.| Paramètres | Tapez | Descriptif |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | contient l'URL à utiliser pour l'envoi des statistiques. |

**Depuis :** 5.4.0

--------------------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Définissez le ChannelUrl pour l'application, celui-ci sera utilisé pour définir le canal.

| Paramètres | Tapez | Descriptif |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | contient l'URL à utiliser pour définir la chaîne. |

**Depuis :** 5.4.0

--------------------


## téléchargement(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Téléchargez un nouveau bundle à partir de l'URL fournie, il doit s'agir d'un fichier zip, avec des fichiers à l'intérieur ou avec un identifiant unique à l'intérieur avec tous vos fichiers

| Paramètres | Tapez | Descriptif |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">Options de téléchargement</a></code> | Le {@link <a href="#downloadoptions">DownloadOptions</a>} pour télécharger un nouveau zip de bundle. |

**Retours :** <code>Promesse<<a href="#bundleinfo">BundleInfo</a>></code>

--------------------


## suivant(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Définissez le prochain bundle à utiliser lorsque l'application est rechargée.

| Paramètres | Tapez | Descriptif |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Contient l’ID du prochain Bundle à définir lors du prochain lancement de l’application. {@link <a href="#bundleinfo">BundleInfo.id</a>} |

**Retours :** <code>Promesse<<a href="#bundleinfo">BundleInfo</a>></code>

--------------------


## ensemble(...)

```typescript
set(options: BundleId) => Promise<void>
```

Définissez le bundle actuel et rechargez immédiatement l'application.| Paramètres | Tapez | Descriptif |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objet {@link <a href="#bundleid">BundleId</a>} contenant le nouvel identifiant de bundle à définir comme actuel. |

--------------------


## supprimer(...)

```typescript
delete(options: BundleId) => Promise<void>
```

Supprime le bundle spécifié du stockage de l'application native. À utiliser avec {@link list} pour obtenir les identifiants de bundle stockés.

| Paramètres | Tapez | Descriptif |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objet {@link <a href="#bundleid">BundleId</a>} contenant l'ID d'un bundle à supprimer (notez qu'il s'agit de l'ID du bundle, PAS du nom de la version) |

--------------------


## liste(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Obtenez tous les bundles téléchargés localement dans votre application

| Paramètres | Tapez | Descriptif |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Le {@link <a href="#listoptions">ListOptions</a>} pour répertorier les offres groupées |

**Retours :** <code>Promise<<a href="#bundlelistresult">BundleListResult</a>></code>

--------------------


## réinitialiser (...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Réinitialisez l'application sur le bundle `builtin` (celui envoyé à Apple App Store / Google Play Store) ou le dernier bundle chargé avec succès.

| Paramètres | Tapez | Descriptif |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Contenant {@link <a href="#resetoptions">ResetOptions.toLastSuccessful</a>}, `true` se réinitialise au bundle intégré et `false` sera réinitialisé au dernier bundle chargé avec succès. |

--------------------


## actuel()

```typescript
current() => Promise<CurrentBundleResult>
```Obtenez le bundle actuel, si aucun n'est défini, il renvoie `builtin`. currentNative est le bundle d'origine installé sur l'appareil

**Retours :** <code>Promise<<a href="#currentbundleresult">CurrentBundleResult</a>></code>

--------------------


## recharger()

```typescript
reload() => Promise<void>
```

Recharger la vue

--------------------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Définit un tableau {@link <a href="#delaycondition">DelayCondition</a>} contenant les conditions que le plugin utilisera pour retarder la mise à jour.
Une fois que toutes les conditions sont remplies, le processus de mise à jour redémarrera comme d'habitude, la mise à jour sera donc installée après une mise en arrière-plan ou la suppression de l'application.
Pour le type `date`, la valeur doit être une chaîne de date iso8601.
Pour le genre `background`, la valeur doit être un nombre en millisecondes.
Pour le genre `nativeVersion`, la valeur doit être le numéro de version.
Pour le genre `kill`, la valeur n'est pas utilisée.
La fonction a un comportement incohérent, l'option kill déclenche la mise à jour après le premier kill et non après le prochain arrière-plan comme les autres options. Ce problème sera corrigé dans une prochaine version majeure.

| Paramètres | Tapez | Descriptif |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Contenant le tableau {@link <a href="#multidelayconditions">MultiDelayConditions</a>} de conditions à définir |

**Depuis :** 4.3.0

--------------------


##cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Annule un {@link <a href="#delaycondition">DelayCondition</a>} pour traiter une mise à jour immédiatement.

**Depuis :** 4.0.0

--------------------


## getLatest(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Obtenez le dernier bundle disponible à partir de l'URL de mise à jour

| Paramètres | Tapez |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Retours :** <code>Promesse<<a href="#latestversion">LatestVersion</a>></code>

**Depuis :** 4.0.0

--------------------


## setChannel(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Définit le canal pour cet appareil. Le canal doit avoir `allow_device_self_set` activé pour que cela fonctionne.**Remarques importantes :**
- N'utilisez pas cette méthode pour définir le canal au démarrage. Utilisez plutôt le `defaultChannel` dans votre configuration Capacitor.
- Cette méthode est destinée à être utilisée une fois que l'application est prête et que l'utilisateur a interagi (par exemple, en optant pour un programme bêta).
- **Les chaînes publiques ne peuvent pas être auto-attribuées.** Si une chaîne est marquée comme `public`, l'appel de `setChannel()` renverra une erreur. Pour utiliser une chaîne publique, appelez plutôt `unsetChannel()` - l'appareil reviendra automatiquement sur la chaîne publique correspondante.
- Utilisez `listChannels()` pour découvrir quels canaux sont disponibles et s'ils permettent l'auto-attribution.

| Paramètres | Tapez | Descriptif |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Le canal {@link <a href="#setchanneloptions">SetChannelOptions</a>} est-il à définir |

**Retours :** <code>Promise<<a href="#channelres">ChannelRes</a>></code>

**Depuis :** 4.7.0

--------------------


## unsetChannel(...)

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Annulez la priorité du canal pour cet appareil. Après avoir appelé cette méthode, l'appareil recevra automatiquement les mises à jour du **canal public** qui correspondent à ses conditions (plate-forme, type d'appareil, type de build).

Ceci est utile lorsque :
- Vous souhaitez remettre un appareil sur la piste de mise à jour par défaut
- Vous souhaitez utiliser une chaîne publique (puisque les chaînes publiques ne peuvent pas être auto-attribuées via `setChannel()`)

| Paramètres | Tapez |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Depuis :** 4.7.0

--------------------


##getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Obtenez la chaîne pour cet appareil

**Retours :** <code>Promise<<a href="#getchannelres">GetChannelRes</a>></code>

**Depuis :** 4.8.0

--------------------


## listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

Répertoriez toutes les chaînes disponibles pour cet appareil. Renvoie les canaux compatibles avec l'environnement actuel de l'appareil (plate-forme, émulateur/appareil réel, version dev/prod) et qui sont soit publics, soit autorisant l'auto-affectation.

Chaque canal du résultat comprend :
- `public` : Si `true`, il s'agit d'un **canal par défaut**. Vous ne pouvez pas vous y attribuer vous-même en utilisant `setChannel()`. Au lieu de cela, si vous supprimez votre attribution de canal à l'aide de `unsetChannel()`, l'appareil recevra automatiquement les mises à jour de ce canal public.
- `allow_self_set` : Si `true`, il s'agit d'un **canal auto-attribuable**. Vous pouvez attribuer explicitement l'appareil à ce canal en utilisant `setChannel()`.

**Retours :** <code>Promise<<a href="#listchannelsresult">ListChannelsResult</a>></code>

**Depuis :** 7.5.0

--------------------


## setCustomId(...)

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```Définir un identifiant personnalisé pour cet appareil

| Paramètres | Tapez | Descriptif |
| ------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | est le {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId à définir |

**Depuis :** 4.9.0

--------------------


##getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Obtenez la version native de l'application ou la version intégrée si elle est définie dans la configuration

**Retours :** <code>Promesse<<a href="#builtinversion">BuiltinVersion</a>></code>

**Depuis :** 5.2.0

--------------------


##getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Obtenez un identifiant unique utilisé pour identifier l'appareil (envoyé au serveur de mise à jour automatique)

**Retours :** <code>Promesse<<a href="#deviceid">DeviceId</a>></code>

--------------------


##getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Obtenez la version native du plugin Capacitor Updater (envoyée au serveur de mise à jour automatique)

**Retours :** <code>Promesse<<a href="#pluginversion">PluginVersion</a>></code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Obtenez l'état de la configuration de la mise à jour automatique.

**Retours :** <code>Promise<<a href="#autoupdateenabled">AutoUpdateEnabled</a>></code>

--------------------


## RemoveAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Supprimez tous les écouteurs de ce plugin.

**Depuis :** 1.0.0

--------------------


## addListener('télécharger', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement de téléchargement du bundle dans l'application. Se déclenche une fois qu'un téléchargement a commencé, pendant le téléchargement et une fois terminé.
Cela vous renverra tous les pourcentages de téléchargement pendant le téléchargement

| Paramètres | Tapez |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'télécharger'</code> |
| **`listenerFunc`** | <code>(état : <a href="#downloadevent">DownloadEvent</a>) => void</code> |

**Renvois :** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Depuis :** 2.0.11

--------------------


## addListener('noNeedUpdate', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement sans qu'il soit nécessaire de le mettre à jour, utile lorsque vous souhaitez forcer la vérification à chaque lancement de l'application

| Paramètres | Tapez |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`** | <code>'noNeedUpdate'</code> |
| **`listenerFunc`** | <code>(état : <a href="#noneedevent">NoNeedEvent</a>) => void</code> |**Renvois :** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Depuis :** 4.0.0

--------------------


## addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement de mise à jour disponible, utile lorsque vous souhaitez forcer la vérification à chaque lancement de l'application

| Paramètres | Tapez |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'mise à jour disponible'</code> |
| **`listenerFunc`** | <code>(état : <a href="#updateavailableevent">UpdateAvailableEvent</a>) => void</code> |

**Retours :** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Depuis :** 4.0.0

--------------------


## addListener('downloadComplete', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez les événements downloadComplete.

| Paramètres | Tapez |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'téléchargementComplet'</code> |
| **`listenerFunc`** | <code>(état : <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) => void</code> |

**Retours :** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Depuis :** 4.0.0

--------------------


## addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement de mise à jour majeure dans l'application, informez-vous lorsque la mise à jour majeure est bloquée en définissant DisableAutoUpdateBreaking

| Paramètres | Tapez |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`** | <code>'majorAvailable'</code> |
| **`listenerFunc`** | <code>(état : <a href="#majoravailableevent">MajorAvailableEvent</a>) => void</code> |

**Retours :** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Depuis :** 2.3.0

--------------------


## addListener('updateFailed', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement d'échec de la mise à jour dans l'application, vous informez lorsque la mise à jour n'a pas pu être installée au prochain démarrage de l'application.

| Paramètres | Tapez |
| ------------------ | ------------------------------------------------------------------------------------ |
| **`eventName`** | <code>'updateFailed'</code> |
| **`listenerFunc`** | <code>(état : <a href="#updatefailedevent">UpdateFailedEvent</a>) => void</code> |**Retours :** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Depuis :** 2.3.0

--------------------


## addListener('downloadFailed', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement d'échec de téléchargement dans l'application, vous informez lorsqu'un téléchargement de bundle a échoué

| Paramètres | Tapez |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`** | <code>'échec du téléchargement'</code> |
| **`listenerFunc`** | <code>(état : <a href="#downloadfailedevent">DownloadFailedEvent</a>) => void</code> |

**Renvois :** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Depuis :** 4.0.0

--------------------


## addListener('appReloaded', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement de rechargement dans l'application, informez-vous quand le rechargement a eu lieu

| Paramètres | Tapez |
| ------------------ | -------------------------- |
| **`eventName`** | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() => void</code> |

**Renvois :** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Depuis :** 4.3.0

--------------------


## addListener('appReady', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement de préparation de l'application dans l'application et informez-vous lorsque l'application est prête à être utilisée.

| Paramètres | Tapez |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'appReady'</code> |
| **`listenerFunc`** | <code>(état : <a href="#appreadyevent">AppReadyEvent</a>) => void</code> |

**Renvois :** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Depuis :** 5.1.0

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Obtenez si la mise à jour automatique est disponible (non désactivée par serverUrl).

**Retours :** <code>Promise<<a href="#autoupdateavailable">AutoUpdateAvailable</a>></code>

--------------------


##getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Obtenez le prochain bundle qui sera utilisé lors du rechargement de l'application.
Renvoie null si aucun bundle suivant n'est défini.

**Retours :** <code>Promesse<<a href="#bundleinfo">BundleInfo</a> | nul></code>

**Depuis :** 6.8.0

--------------------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Activer ou désactiver le menu shake à des fins de débogage/test| Paramètres | Tapez | Descriptif |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> | Contient un booléen activé pour activer ou désactiver le menu Shake |

**Depuis :** 7.5.0

--------------------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Obtenez l'état actuel du menu shake

**Retours :** <code>Promise<<a href="#shakemenuenabled">ShakeMenuEnabled</a>></code>

**Depuis :** 7.5.0

--------------------


##Interfaces


### AppReadyRésultat

| Accessoire | Tapez |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### Informations groupées

| Accessoire | Tapez |
| ---------------- | ----------------------------------------------------- |
| **`id`** | <code>string</code> |
| **`version`** | <code>string</code> |
| **`downloaded`** | <code>string</code> |
| **`checksum`** | <code>string</code> |
| **`status`** | <code><a href="#bundlestatus">BundleStatus</a></code> |


### Mettre à jour l'URL

| Accessoire | Tapez |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| Accessoire | Tapez |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### URL de la chaîne

| Accessoire | Tapez |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### Options de téléchargement

Cette URL et ces versions sont utilisées pour télécharger le bundle depuis le serveur. Si vous utilisez le backend, toutes les informations seront fournies par la méthode getLatest.
Si vous n'utilisez pas le backend, vous devez fournir l'URL et la version du bundle. La somme de contrôle et la sessionKey sont requises si vous avez chiffré le bundle avec la commande CLI encrypt, vous devriez les recevoir à la suite de la commande.| Accessoire | Tapez | Descriptif | Par défaut | Depuis |
| ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`** | <code>string</code> | L'URL du fichier zip du bundle (par exemple : dist.zip) à télécharger. (Il peut s'agir de n'importe quelle URL. Par exemple : Amazon S3, une balise GitHub, tout autre endroit où vous avez hébergé votre offre groupée.) |                        |       |
| **`version`** | <code>string</code> | Le code/nom de version de ce bundle/version |                        |       |
| **`sessionKey`** | <code>string</code> | La clé de session pour la mise à jour, lorsque le bundle est chiffré avec une clé de session | <code>undefined</code> | 4.0.0 |
| **`checksum`** | <code>string</code> | La somme de contrôle pour la mise à jour, elle doit être en sha256 et chiffrée avec une clé privée si le bundle est chiffré | <code>undefined</code> | 4.0.0 |
| **`manifest`** | <code>ManifestEntry[]</code> | Le manifeste pour les téléchargements multi-fichiers Delta (manifeste) | <code>non défini</code> | 6.1.0 |


###Entrée du manifeste

| Accessoire | Tapez |
| ------------------ | -------------------------------- |
| **`file_name`** | <code>chaîne \| null</code> |
| **`file_hash`** | <code>chaîne \| null</code> |
| **`download_url`** | <code>chaîne \| null</code> |


### BundleId

| Accessoire | Tapez |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListRésultat

| Accessoire | Tapez |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### Options de liste| Accessoire | Tapez | Descriptif | Par défaut | Depuis |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>booléen</code> | S'il faut renvoyer la liste brute des bundles ou le manifeste. Si c'est vrai, la liste tentera de lire la base de données interne au lieu des fichiers sur le disque. | <code>false</code> | 6.14.0 |


### Réinitialiser les options

| Accessoire | Tapez |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>booléen</code> |


### CurrentBundleResult

| Accessoire | Tapez |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code> |


### MultiDelayConditions

| Accessoire | Tapez |
| ------------------------------------ | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### Condition de délai

| Accessoire | Tapez | Descriptif |
| ----------- | --------------------------------------------------------- | --------------------------------------------- |
| **`kind`** | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Configurer les conditions de retard dans setMultiDelay |
| **`value`** | <code>string</code> |                                          |


### Dernière version| Accessoire | Tapez | Descriptif | Depuis |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Résultat de la méthode getLatest | 4.0.0 |
| **`checksum`** | <code>string</code> |                            | 6 |
| **`major`** | <code>booléen</code> |                            |       |
| **`message`** | <code>string</code> |                            |       |
| **`sessionKey`** | <code>string</code> |                            |       |
| **`error`** | <code>string</code> |                            |       |
| **`old`** | <code>string</code> |                            |       |
| **`url`** | <code>string</code> |                            |       |
| **`manifest`** | <code>ManifestEntry[]</code> |                            | 6.1 |


### Obtenir les dernières options

| Accessoire | Tapez | Descriptif | Par défaut | Depuis |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | La chaîne pour obtenir la dernière version pour La chaîne doit autoriser 'self_assign' pour que cela fonctionne | <code>undefined</code> | 6.8.0 |


### Résolution du canal

| Accessoire | Tapez | Descriptif | Depuis |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`** | <code>string</code> | État actuel du canal défini | 4.7.0 |
| **`error`** | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### Définir les options de canal

| Accessoire | Tapez |
| ----------------------- | -------------------- |
| **`channel`** | <code>string</code> |
| **`triggerAutoUpdate`** | <code>booléen</code> |


### Désactiver les options de canal

| Accessoire | Tapez |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>booléen</code> |


### GetChannelRes| Accessoire | Tapez | Descriptif | Depuis |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`percent`** | <code>numéro</code> | État actuel du téléchargement, entre 0 et 100. | 4.0.0 |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### Aucun événement nécessaire

| Accessoire | Tapez | Descriptif | Depuis |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | État actuel du téléchargement, entre 0 et 100. | 4.0.0 |


### UpdateAvailableEvent

| Accessoire | Tapez | Descriptif | Depuis |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | État actuel du téléchargement, entre 0 et 100. | 4.0.0 |


### TéléchargerCompleteEvent

| Accessoire | Tapez | Descriptif | Depuis |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Émettre lorsqu'une nouvelle mise à jour est disponible. | 4.0.0 |


### ÉvénementMajorAvailable

| Accessoire | Tapez | Descriptif | Depuis |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | Émettez lorsqu’un nouveau bundle majeur est disponible. | 4.0.0 |


### UpdateFailedEvent

| Accessoire | Tapez | Descriptif | Depuis |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Émettre lorsqu'une mise à jour n'a pas pu être installée. | 4.0.0 |


###TéléchargementFailedEvent

| Accessoire | Tapez | Descriptif | Depuis |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Émettre lorsqu'un téléchargement échoue. | 4.0.0 |


### AppReadyÉvénement
