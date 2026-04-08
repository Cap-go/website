---
title: Fonctions et paramètres
description: Toutes les méthodes et paramètres disponibles du plugin
sidebar:
  order: 2
locale: fr
---
# Configuration du plugin de mise à jour

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater peut être configuré avec ces options :Configurez le CLI pour utiliser un serveur local pour les tests. | `undefined` | 4.17.48 |
| **`localApi`** | `string` | Configurez le CLI pour utiliser une API locale pour les tests. | `undefined` | 6.3.3 |
| **`localApiFiles`** | `string` | Configurez le CLI pour utiliser une API de fichier local pour les tests. | `undefined` | 6.3.3 |
| **`allowModifyUrl`** | `boolean` | Autorisez le plugin à modifier dynamiquement updateUrl, statsUrl et channelUrl du côté JavaScript. | `false` | 5.4.0 |
| **`allowModifyAppId`** | `boolean` | Autorisez le plugin à modifier dynamiquement l'appId du côté JavaScript. | `false` | 7.14.0 |
| **`allowManualBundleError`** | `boolean` | Autoriser le marquage des bundles comme erronés à partir de JavaScript lors de l'utilisation de flux de mise à jour manuelle. Lorsqu'il est activé, {@link CapacitorUpdaterPlugin.setBundleError} peut modifier l'état d'un bundle en `error`. | `false` | 7.20.0 |
| **`persistCustomId`** | `boolean` | Conservez le customId défini via {@link CapacitorUpdaterPlugin.setCustomId} lors des redémarrages de l'application. Disponible uniquement pour Android et iOS. | `false (will be true by default in a future major release v8.x.x)` | 7.17.3 |
| **`persistModifyUrl`** | `boolean` | Conservez les paramètres updateUrl, statsUrl et channelUrl définis via {@link CapacitorUpdaterPlugin.setUpdateUrl}, {@link CapacitorUpdaterPlugin.setStatsUrl} et {@link CapacitorUpdaterPlugin.setChannelUrl} lors des redémarrages de l'application. Disponible uniquement pour Android et iOS. | `false` | 7.20.0 |
| **`allowSetDefaultChannel`** | `boolean` | Autorisez ou interdisez la méthode {@link CapacitorUpdaterPlugin.setChannel} pour modifier le defaultChannel. Lorsqu'il est défini sur `false`, l'appel de `setChannel()` renverra une erreur avec le code `disabled_by_config`. | `true` | 7.34.0 |
| **`defaultChannel`** | `string` | Définissez le canal par défaut pour l'application dans la configuration. Sensible aux majuscules et minuscules. Ce paramètre remplacera le canal par défaut défini dans le cloud, mais respectera toujours les remplacements effectués dans le cloud. Cela nécessite que le canal permette aux appareils de se dissocier/s'associer automatiquement dans les paramètres du canal. https://capgo.app/docs/public-api/channels/#channel-configuration-options | `undefined` | 5.5.0 |
| **`appId`** | `string` | Configurez l'ID de l'application pour l'application dans la configuration. | `undefined` | 6.0.0 |
| **`keepUrlPathAfterReload`** | `boolean` | Configurez le plugin pour conserver le chemin de l'URL après un rechargement. AVERTISSEMENT : lorsqu'un rechargement est déclenché, 'window.history' sera effacé. | `false` | 6.8.0 |
| **`disableJSLogging`** | `boolean` | Désactivez la journalisation JavaScript du plugin. si c'est vrai, le plugin ne se connectera pas à la console JavaScript. seul le log natif sera réalisé | `false` | 7.3.0 |
| **`osLogging`** | `boolean` | Activez la journalisation au niveau du système d’exploitation. Lorsqu'ils sont activés, les journaux sont écrits dans le journal système qui peut être inspecté dans les versions de production. - **iOS** : utilise os_log au lieu de Swift.print, les journaux sont accessibles via Console.app ou Instruments - **Android** : journaux vers Logcat (android.util.Log) Lorsqu'elle est définie sur false, la journalisation du système est désactivée sur les deux plates-formes (seule la journalisation de la console JavaScript se produira si elle est activée). Tceci est utile pour déboguer les applications de production (App Store/TestFlight s'appuie sur iOS, ou les APK de production sur Android). | `true` | 8.42.0 |
| **`shakeMenu`** | `boolean` | Activer le geste de secousse pour afficher le menu de mise à jour à des fins de débogage/test | `false` | 7.5.0 |
| **`allowShakeChannelSelector`** | `boolean` | Activez le geste de secousse pour afficher un menu de sélection de canal permettant de basculer entre les canaux de mise à jour. Lorsqu'il est activé ET `shakeMenu` est vrai, le geste de secousse affiche un sélecteur de canal au lieu du menu de débogage par défaut (Go Home/Reload/Close). Après avoir sélectionné une chaîne, l'application vérifie automatiquement les mises à jour et les téléchargements si disponibles. Fonctionne uniquement si les canaux ont `allow_self_set` activé sur le backend. Disponible uniquement pour Android et iOS. | `false` | 8.43.0 |</docgen-config>

## API Référence

<docgen-index>
<!--Auto-generated, do not edit by hand-->

- [`notifyAppReady`](#notifyappready)
- [`setUpdateUrl`](#setupdateur)
- [`setStatsUrl`](#setstatsurl)
- [`setChannelUrl`](#setchannelurl)
- [`download`](#téléchargement)
- [`next`](#suivant)
- [`set`](#ensemble)
- [`delete`](#delete)
- [`setBundleError`](#setbundleerror)
- [`list`](#liste)
- [`reset`](#réinitialisation)
- [`current`](#actuel)
- [`reload`](#rechargement)
- [`setMultiDelay`](#setmultidelay)
- [`cancelDelay`](#canceldelay)
- [`getLatest`](#getlatest)
- [`setChannel`](#setchannel)
- [`unsetChannel`](#unsetchannel)
- [`getChannel`](#getchannel)
- [`listChannels`](#listchannels)
- [`setCustomId`](#setcustomid)
- [`getBuiltinVersion`](#getbuiltinversion)
- [`getDeviceId`](#getdeviceid)
- [`getPluginVersion`](#getpluginversion)
- [`isAutoUpdateEnabled`](#isautoupdateenabled)
- [`removeAllListeners`](#removealllisteners)
- [`addListener('download')`](#addlistenerdownload-)
- [`addListener('noNeedUpdate')`](#addlistenernoneedupdate-)
- [`addListener('updateAvailable')`](#addlistenerupdateavailable-)
- [`addListener('downloadComplete')`](#addlistenerdownloadcomplete-)
- [`addListener('breakingAvailable')`](#addlistenerbreakingavailable-)
- [`addListener('majorAvailable')`](#addlistenermajoravailable-)
- [`addListener('updateFailed')`](#addlistenerupdatefailed-)
- [`addListener('downloadFailed')`](#addlistenerdownloadfailed-)
- [`addListener('appReloaded')`](#addlistenerappreloaded-)
- [`addListener('appReady')`](#addlistenerappready-)
- [`addListener('channelPrivate')`](#addlistenerchannelprivate-)
- [`addListener('onFlexibleUpdateStateChange')`](#addlisteneronflexibleupdatestatechange-)
- [`isAutoUpdateAvailable`](#isautoupdateavailable)
- [`getNextBundle`](#getnextbundle)
- [`getFailedUpdate`](#getfailedupdate)
- [`setShakeMenu`](#setshakemenu)
- [`isShakeMenuEnabled`](#isshakemenuenabled)
- [`setShakeChannelSelector`](#setshakechannelselector)
- [`isShakeChannelSelectorEnabled`](#isshakechannelselectorenabled)
- [`getAppId`](#getappid)
- [`setAppId`](#setappid)
- [`getAppUpdateInfo`](#getappupdateinfo)
- [`openAppStore`](#openappstore)
- [`performImmediateUpdate`](#performimmediateupdate)
- [`startFlexibleUpdate`](#startflexibleupdate)
- [`completeFlexibleUpdate`](#completeflexibleupdate)

</docgen-index>

<docgen-api>
<!--Auto-generated, do not edit by hand-->

### notifierAppReady

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Informez la couche native que JavaScript s'est initialisé avec succès.

**CRITIQUE : vous devez appeler cette méthode à chaque lancement d'application pour empêcher la restauration automatique.**

Il s'agit d'une simple notification pour confirmer que le JavaScript de votre bundle est chargé et exécuté.
Le serveur Web natif a servi avec succès les fichiers du bundle et votre runtime JS a démarré.
C'est tout ce qu'il vérifie – rien de plus complexe.

**Qu'est-ce qui déclenche la restauration :**
- NE PAS appeler cette méthode dans le délai d'attente (par défaut : 10 secondes)
- Échec complet de JavaScript (le bundle ne se chargera pas du tout)

**Qu'est-ce qui ne déclenche PAS la restauration :**
- Erreurs d'exécution après initialisation (échecs API, plantages, etc.)
- Échecs des requêtes réseau
- Erreurs de logique d'application

**IMPORTANT : Appelez-le AVANT toute demande réseau.**
N'attendez pas les API, le chargement de données ou les opérations asynchrones. Appelez-le dès que votre
Le bundle JavaScript commence à s'exécuter pour confirmer que le bundle lui-même est valide.Bonnes pratiques :
- Appelez immédiatement le point d'entrée de votre application (main.js, montage de composant d'application, etc.)
- Ne le mettez pas après des appels réseau ou une initialisation lourde
- Ne l'enveloppez pas dans try/catch avec des conditions
- Ajustez {@link PluginsConfig.CapacitorUpdater.appReadyTimeout} si vous avez besoin de plus de temps

**Retours**

`Promise<AppReadyResult>` — Résout toujours avec succès les informations actuelles du bundle. Cette méthode n’échoue jamais.


--------------------


### setUpdateUrl

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Définissez l'URL de mise à jour de l'application de manière dynamique au moment de l'exécution.

Cela remplace la valeur de configuration {@link PluginsConfig.CapacitorUpdater.updateUrl}.
Nécessite que {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} soit défini sur `true`.

Utilisez {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} pour conserver cette valeur lors des redémarrages de l'application.
Sinon, l'URL sera réinitialisée à la valeur de configuration au prochain lancement de l'application.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `UpdateUrl` | Contient l'URL à utiliser pour vérifier les mises à jour. |

**Retours**

`Promise<void>` — Résout lorsque l'URL est mise à jour avec succès.

**Depuis :** 5.4.0

**Lance :** {Erreur} Si `allowModifyUrl` est faux ou si l'opération échoue.


--------------------


### setStatsUrl

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Définissez l'URL des statistiques de l'application de manière dynamique au moment de l'exécution.

Cela remplace la valeur de configuration {@link PluginsConfig.CapacitorUpdater.statsUrl}.
Nécessite que {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} soit défini sur `true`.

Transmettez une chaîne vide pour désactiver complètement la collecte de statistiques.
Utilisez {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} pour conserver cette valeur lors des redémarrages de l'application.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `StatsUrl` | Contient l'URL à utiliser pour l'envoi des statistiques, ou une chaîne vide à désactiver. |

**Retours**

`Promise<void>` — Résout lorsque l'URL est mise à jour avec succès.

**Depuis :** 5.4.0

**Lance :** {Erreur} Si `allowModifyUrl` est faux ou si l'opération échoue.


--------------------


### setChannelUrl

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Définissez l'URL de la chaîne pour l'application de manière dynamique au moment de l'exécution.

Cela remplace la valeur de configuration {@link PluginsConfig.CapacitorUpdater.channelUrl}.
Nécessite que {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} soit défini sur `true`.

Utilisez {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} pour conserver cette valeur lors des redémarrages de l'application.
Sinon, l'URL sera réinitialisée à la valeur de configuration au prochain lancement de l'application.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `ChannelUrl` | Contient l'URL à utiliser pour les opérations de canal. |

**Retours**

`Promise<void>` — Résout lorsque l'URL est mise à jour avec succès.

**Depuis :** 5.4.0

**Lance :** {Erreur} Si `allowModifyUrl` est faux ou si l'opération échoue.


--------------------


### télécharger

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Téléchargez un nouveau bundle à partir de l'URL fournie pour une installation ultérieure.

Le bundle téléchargé est stocké localement mais n'est pas activé. Pour l'utiliser :
- Appelez {@link next} pour le configurer pour l'installation lors du prochain arrière-plan/redémarrage de l'application.
- Appelez {@link set} pour l'activer immédiatement (détruit le contexte JavaScript actuel)L'URL doit pointer vers un fichier zip contenant soit :
- Vos fichiers d'application directement dans la racine du zip, ou
- Un seul dossier contenant tous vos fichiers d'application

Le bundle doit inclure un fichier `index.html` au niveau racine.

Pour les bundles chiffrés, fournissez les paramètres `sessionKey` et `checksum`.
Pour les mises à jour delta multi-fichiers, fournissez le tableau `manifest`.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `DownloadOptions` | Les {@link DownloadOptions} pour télécharger un nouveau package zip. |

**Retours**

`Promise<BundleInfo>` — Le {@link BundleInfo} du bundle téléchargé.

**Lance :** {Erreur} Si le téléchargement échoue ou si le bundle n'est pas valide.

**Exemple**

```ts
const bundle = await CapacitorUpdater.download({
  url: `https://example.com/versions/${version}/dist.zip`,
  version: version
});
// Bundle is downloaded but not active yet
await CapacitorUpdater.next({ id: bundle.id }); // Will activate on next background
```


--------------------


### suivant

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Définissez le paquet suivant à activer lorsque l'application s'arrête ou redémarre.

Il s'agit de la méthode recommandée pour appliquer les mises à jour, car elle n'interrompt pas la session en cours de l'utilisateur.
Le forfait sera activé lorsque :
- L'application est en arrière-plan (l'utilisateur s'éloigne), ou
- L'application est supprimée et relancée, ou
- {@link reload} est appelé manuellement

Contrairement à {@link set}, cette méthode ne détruit PAS immédiatement le contexte JavaScript actuel.
Votre application continue de fonctionner normalement jusqu'à ce que l'un des événements ci-dessus se produise.

Utilisez {@link setMultiDelay} pour ajouter des conditions supplémentaires avant que la mise à jour ne soit appliquée.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `BundleId` | Contient l’ID du bundle à définir comme suivant. Utilisez {@link BundleInfo.id} à partir d'un ensemble téléchargé. |

**Retours**

`Promise<BundleInfo>` — Le {@link BundleInfo} pour le bundle spécifié.

**Lance :** {Erreur} Lorsqu'il n'y a pas de fichier index.html dans le dossier du bundle ou que le bundle n'existe pas.


--------------------


### défini

```typescript
set(options: BundleId) => Promise<void>
```

Définissez le bundle actuel et rechargez immédiatement l'application.

**IMPORTANT : Il s'agit d'une opération de terminal qui détruit le contexte JavaScript actuel.**

Lorsque vous appelez cette méthode :
- L'ensemble du contexte JavaScript est immédiatement détruit
- L'application se recharge à partir d'un dossier différent avec des fichiers différents
- AUCUN code après cet appel ne sera exécuté
- AUCUNE promesse ne sera résolue
- AUCUN rappel ne sera déclenché
- Les écouteurs d'événements enregistrés après cet appel ne sont pas fiables et risquent de ne jamais se déclencher.

Le rechargement s'effectue automatiquement - vous n'avez rien d'autre à faire.
Si vous devez conserver l'état comme le chemin d'URL actuel, utilisez l'option de configuration {@link PluginsConfig.CapacitorUpdater.keepUrlPathAfterReload}.
Pour d'autres besoins de préservation de l'état, enregistrez vos données avant d'appeler cette méthode (par exemple, à localStorage).

**N'essayez pas** d'exécuter une logique supplémentaire après avoir appelé `set()` - cela ne fonctionnera pas comme prévu.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `BundleId` | Un objet {@link BundleId} contenant le nouvel identifiant de bundle à définir comme actuel. |

**Retours**

`Promise<void>` — Une promesse qui ne sera jamais résolue car le contexte JavaScript est détruit.

**Lance :** {Erreur} Lorsqu'il n'y a pas de fichier index.html dans le dossier du bundle.


--------------------


### supprimer

```typescript
delete(options: BundleId) => Promise<void>
```Supprimez un bundle du stockage local pour libérer de l'espace disque.

Vous ne pouvez pas supprimer :
- Le forfait actuellement actif
- Le bundle `builtin` (la version livrée avec votre application)
- Le forfait défini comme `next` (appelez d'abord {@link next} avec un autre forfait)

Utilisez {@link list} pour obtenir tous les identifiants de bundle disponibles.

**Remarque :** L'ID du bundle n'est PAS le même que le nom de la version.
Utilisez le champ `id` de {@link BundleInfo}, et non le champ `version`.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `BundleId` | Un objet {@link BundleId} contenant l'ID du bundle à supprimer. |

**Retours**

`Promise<void>` — Résout lorsque le bundle est supprimé avec succès.

**Lance :** {Erreur} Si le bundle est actuellement utilisé ou n'existe pas.


--------------------


### setBundleError

```typescript
setBundleError(options: BundleId) => Promise<BundleInfo>
```

Marquez manuellement un bundle comme ayant échoué/erré en mode de mise à jour manuelle.

Ceci est utile lorsque vous détectez qu'un ensemble présente des problèmes critiques et que vous souhaitez éviter
qu'il ne soit plus utilisé. Le statut du bundle sera changé en `error` et le plugin
j'éviterai d'utiliser ce bundle à l'avenir.

**Exigences :**
- {@link PluginsConfig.CapacitorUpdater.allowManualBundleError} doit être défini sur `true`
- Fonctionne uniquement en mode de mise à jour manuelle (lorsque autoUpdate est désactivé)

Cas d'utilisation courant : après avoir téléchargé et testé un ensemble, vous découvrez qu'il présente des
bogues et je veux le marquer comme ayant échoué afin qu'il ne soit pas réessayé.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `BundleId` | Un objet {@link BundleId} contenant l'ID du bundle à marquer comme erroné. |

**Retours**

`Promise<BundleInfo>` — Le {@link BundleInfo} mis à jour avec le statut défini sur `error`.

**Depuis :** 7.20.0

**Lance :** {Erreur} Lorsque le bundle n'existe pas ou que `allowManualBundleError` est faux.


--------------------


### liste

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Obtenez tous les bundles téléchargés localement stockés dans votre application.

Cela renvoie tous les bundles qui ont été téléchargés et sont disponibles localement, notamment :
- Le forfait actuellement actif
- Le bundle `builtin` (livré avec votre application)
- Tous les bundles téléchargés en attente d'activation
- Bundles ayant échoué (avec le statut `error`)

Utilisez-le pour :
- Vérifiez l'espace disque disponible en comptant les bundles
- Supprimez les anciens bundles avec {@link delete}
- Surveiller l'état de téléchargement du bundle

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `OptionsListe | non défini` | Les {@link ListOptions} pour personnaliser la sortie de la liste de bundles. |

**Retours**

`Promise<BundleListResult>` — Une promesse contenant le tableau d'objets {@link BundleInfo}.

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### réinitialiser

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Réinitialisez l’application sur un bon bundle connu.

Cette méthode permet de récupérer des mises à jour problématiques en revenant soit :
- Le bundle `builtin` (la version originale livrée avec votre application à App Store/Play Store)
- Le dernier bundle chargé avec succès (le bundle le plus récent qui a fonctionné correctement)**IMPORTANT : cela déclenche un rechargement immédiat de l'application, détruisant le contexte JavaScript actuel.**
Voir {@link set} pour plus de détails sur les implications de cette opération.

Cas d'utilisation :
- Récupération d'urgence lorsqu'une mise à jour provoque des problèmes critiques
- Test de la fonctionnalité de restauration
- Fournir aux utilisateurs une option « réinitialisation d'usine »

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `Réinitialiser les options | non défini` |  |

**Retours**

`Promise<void>` — Une promesse qui pourrait ne jamais se résoudre car l'application sera rechargée.

**Lance :** {Erreur} Si l'opération de réinitialisation échoue.


--------------------


### actuel

```typescript
current() => Promise<CurrentBundleResult>
```

Obtenez des informations sur le bundle actuellement actif.

Retours :
- `bundle` : informations sur le bundle actuellement actif
- `native` : La version du bundle intégré (la version originale de l'application depuis App/Play Store)

Si aucune mise à jour n'a été appliquée, `bundle.id` sera « intégré », indiquant l'application
exécute la version originale fournie avec l'application native.

Utilisez-le pour :
- Afficher la version actuelle aux utilisateurs
- Vérifiez si une mise à jour est actuellement active
- Comparez avec les mises à jour disponibles
- Enregistrez le bundle actif pour le débogage

**Retours**

`Promise<CurrentBundleResult>` — Une promesse avec le bundle actuel et les informations sur la version native.

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### recharger

```typescript
reload() => Promise<void>
```

Rechargez manuellement l'application pour appliquer une mise à jour en attente.

Cela déclenche le même comportement de rechargement qui se produit automatiquement lorsque l'application est en arrière-plan.
Si vous avez appelé {@link next} pour mettre une mise à jour en file d'attente, l'appel de `reload()` l'appliquera immédiatement.

**IMPORTANT : cela détruit immédiatement le contexte JavaScript actuel.**
Voir {@link set} pour plus de détails sur les implications de cette opération.

Cas d'utilisation courants :
- Application d'une mise à jour immédiatement après le téléchargement au lieu d'attendre l'arrière-plan
- Fournir un bouton "Redémarrer maintenant" aux utilisateurs une fois qu'une mise à jour est prête
- Test des flux de mise à jour pendant le développement

Si aucune mise à jour n'est en attente (pas d'appel à {@link next}), cela recharge simplement le bundle actuel.

**Retours**

`Promise<void>` — Une promesse qui pourrait ne jamais se résoudre car l'application sera rechargée.

**Lance :** {Erreur} Si l'opération de rechargement échoue.


--------------------


### setMultiDelay

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Configurez les conditions qui doivent être remplies avant qu'une mise à jour en attente soit appliquée.

Après avoir appelé {@link next} pour mettre une mise à jour en file d'attente, utilisez cette méthode pour contrôler le moment où elle est appliquée.
La mise à jour ne sera installée qu'une fois que TOUTES les conditions spécifiées seront remplies.

Types de conditions disponibles :
- `background` : Attendez que l'application soit mise en arrière-plan. Spécifiez éventuellement la durée en millisecondes.
- `kill` : Attendez que l'application soit supprimée et relancée (**Remarque :** Le comportement actuel déclenche la mise à jour immédiatement lors de la mise à jour, pas lors de l'arrière-plan suivant. Cela sera corrigé dans la v8.)
- `date` : Attendre une date/heure précise (format ISO 8601)
- `nativeVersion` : Attendez que l'application native soit mise à jour vers une version spécifiqueFormats de valeur de condition :
- `background` : Nombre en millisecondes (par exemple, « 300 000 » pour 5 minutes), ou omettre pour une utilisation immédiate.
- `kill` : aucune valeur requise
- `date` : chaîne de date ISO 8601 (par exemple, `"2025-12-31T23:59:59Z"`)
- `nativeVersion` : chaîne de version (par exemple, `"2.0.0"`)

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `MultiDelayConditions` | Contient le tableau de conditions {@link MultiDelayConditions}. |

**Retours**

`Promise<void>` — Résout lorsque les conditions de délai sont définies.

**Depuis :** 4.3.0

**Lance :** {Erreur} Si l'opération échoue ou si les conditions ne sont pas valides.

**Exemple**

```ts
// Update after user kills app OR after 5 minutes in background
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    { kind: 'kill' },
    { kind: 'background', value: '300000' }
  ]
});
```

**Exemple**

```ts
// Update after a specific date
await CapacitorUpdater.setMultiDelay({
  delayConditions: [{ kind: 'date', value: '2025-12-31T23:59:59Z' }]
});
```

**Exemple**

```ts
// Default behavior: update on next background
await CapacitorUpdater.setMultiDelay({
  delayConditions: [{ kind: 'background' }]
});
```


--------------------


### annulerDélai

```typescript
cancelDelay() => Promise<void>
```

Annulez toutes les conditions de retard et appliquez immédiatement la mise à jour en attente.

Si vous avez défini des conditions de délai avec {@link setMultiDelay}, cette méthode les efface
et déclenche l'application de la mise à jour en attente au prochain arrière-plan ou au prochain redémarrage de l'application.

Ceci est utile lorsque :
- L'utilisateur demande manuellement la mise à jour maintenant (par exemple, clique sur le bouton "Mettre à jour maintenant")
- Votre application détecte que c'est le bon moment pour effectuer la mise à jour (par exemple, l'utilisateur a terminé une tâche critique)
- Vous souhaitez annuler un délai temporel plus tôt

**Retours**

`Promise<void>` — Résout lorsque les conditions de retard sont effacées.

**Depuis :** 4.0.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### obtenir le dernier

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Vérifiez le serveur de mise à jour pour connaître la dernière version du bundle disponible.

Cela interroge votre URL de mise à jour configurée (ou votre backend Capgo) pour voir si un ensemble plus récent
est disponible en téléchargement. Il ne télécharge PAS le bundle automatiquement.

La réponse comprend :
- `version` : Le dernier identifiant de version disponible
- `url` : URL de téléchargement du bundle (si disponible)
- `breaking` : indique si cette mise à jour est marquée comme incompatible (nécessite une mise à jour de l'application native)
- `message` : Message optionnel du serveur
- `manifest` : liste de fichiers pour les mises à jour delta (si vous utilisez des téléchargements multi-fichiers)

Après avoir reçu les dernières informations sur la version, vous pouvez :
1. Comparez-le avec votre version actuelle
2. Téléchargez-le en utilisant {@link download}
3. Appliquez-le en utilisant {@link next} ou {@link set}

**Important : Gestion des erreurs pour "aucune nouvelle version disponible"**

Lorsque la version actuelle de l'appareil correspond à la dernière version sur le serveur (c'est-à-dire que l'appareil est déjà
à jour), le serveur renvoie une réponse 200 avec `error: "no_new_version_available"` et
`message: "No new version available"`. **Cela provoque une erreur de `getLatest()`**, même si
il s'agit d'une condition normale et attendue.

Vous devez détecter cette erreur spécifique pour la gérer correctement :

```typescript
try {
  const latest = await CapacitorUpdater.getLatest();
  // New version is available, proceed with download
} catch (error) {
  if (error.message === 'No new version available') {
    // Device is already on the latest version - this is normal
    console.log('Already up to date');
  } else {
    // Actual error occurred
    console.error('Failed to check for updates:', error);
  }
}
```

Dans ce scénario, le serveur :
- Enregistre la demande avec un message "Aucune nouvelle version disponible"
- Envoie une action statistique "noNew" pour vérifier que l'appareil a vérifié les mises à jour mais qu'il était déjà à jour (effectué sur le backend)

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `Obtenir les dernières options | non défini` | {@link GetLatestOptions} facultatif pour spécifier le canal à vérifier. |

**Retours**

`Promise<LatestVersion>` — Informations sur la dernière version du bundle disponible.

**Depuis :** 4.0.0**Lance :** {Erreur} Lance toujours lorsqu'aucune nouvelle version n'est disponible (`error: "no_new_version_available"`) ou lorsque la requête échoue.


--------------------


### setChannel

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Attribuez cet appareil à un canal de mise à jour spécifique au moment de l'exécution.

Les canaux vous permettent de distribuer différentes versions de bundle à différents groupes d'utilisateurs
(par exemple, « production », « bêta », « mise en scène »). Cette méthode fait basculer l'appareil sur un nouveau canal.

**Exigences :**
- Le canal cible doit permettre l'auto-attribution (configurée dans votre tableau de bord ou backend Capgo)
- Le backend peut accepter ou rejeter la demande en fonction des paramètres du canal

**Quand l'utiliser :**
- Une fois que l'application est prête et que l'utilisateur a interagi (par exemple, en participant au programme bêta)
- Pour implémenter le changement de canal dans l'application (bascule bêta, accès aux testeurs, etc.)
- Pour les changements de canal pilotés par l'utilisateur

**Quand NE PAS utiliser :**
- Au démarrage/initialisation de l'application - utilisez plutôt la configuration {@link PluginsConfig.CapacitorUpdater.defaultChannel}
- Avant l'interaction de l'utilisateur

**Important : écoutez l'événement `channelPrivate`**

Lorsqu'un utilisateur tente de définir un canal qui ne permet pas l'auto-attribution des appareils, la méthode
lancer une erreur ET déclencher un événement {@link addListener}('channelPrivate'). Vous devriez écouter cet événement
pour fournir des commentaires appropriés aux utilisateurs :

```typescript
CapacitorUpdater.addListener('channelPrivate', (data) => {
  console.warn(`Cannot access channel "${data.channel}": ${data.message}`);
  // Show user-friendly message
});
```

Cela envoie une requête au backend Capgo reliant l'ID de votre appareil au canal spécifié.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `SetChannelOptions` | Le {@link SetChannelOptions} contenant le nom de la chaîne et le déclencheur de mise à jour automatique facultatif. |

**Retours**

`Promise<ChannelRes>` — Résultat de l'opération de canal avec état et erreur/message facultatif.

**Depuis :** 4.7.0

**Lance :** {Erreur} Si le canal n'existe pas ou ne permet pas l'auto-attribution.


--------------------


### unsetChannel

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Supprimez l'attribution de canal de l'appareil et revenez au canal par défaut.

Cela dissocie l'appareil de tout canal spécifiquement attribué, le faisant revenir à :
- Le {@link PluginsConfig.CapacitorUpdater.defaultChannel} s'il est configuré, ou
- Le canal par défaut de votre backend pour cette application

Utilisez-le lorsque :
- Les utilisateurs se désengagent des programmes bêta/test
- Vous souhaitez réinitialiser un appareil à la distribution de mise à jour standard
- Test du comportement de commutation de canal

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `UnsetChannelOptions` |  |

**Retours**

`Promise<void>` — Résout lorsque le canal est désarmé avec succès.

**Depuis :** 4.7.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### obtenirChannel

```typescript
getChannel() => Promise<GetChannelRes>
```

Obtenez le canal actuel attribué à cet appareil.

Renvoie des informations sur :
- `channel` : le nom du canal actuellement attribué (le cas échéant)
- `allowSet` : indique si le canal autorise l'auto-affectation
- `status` : État de fonctionnement
- `error`/`message` : Informations supplémentaires (le cas échéant)

Utilisez-le pour :
- Afficher la chaîne actuelle aux utilisateurs (par exemple, "Vous êtes sur la chaîne bêta")
- Vérifiez si un appareil est sur un canal spécifique avant d'afficher les fonctionnalités
- Vérifiez l'attribution des canaux après avoir appelé {@link setChannel}

**Retours**`Promise<GetChannelRes>` — Les informations actuelles sur la chaîne.

**Depuis :** 4.8.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### listeChaînes

```typescript
listChannels() => Promise<ListChannelsResult>
```

Obtenez une liste de tous les canaux disponibles auxquels cet appareil peut s'auto-attribuer.

Renvoie uniquement les canaux où `allow_self_set` est `true`. Ce sont des chaînes qui
les utilisateurs peuvent passer à l'utilisation de {@link setChannel} sans l'intervention de l'administrateur backend.

Chaque chaîne comprend :
- `id` : Identifiant unique du canal
- `name` : nom de canal lisible par l'homme
- `public` : indique si la chaîne est visible publiquement
- `allow_self_set` : toujours `true` dans les résultats (filtré uniquement sur les canaux auto-attribuables)

Utilisez-le pour :
- Créez une interface utilisateur de sélection de chaîne pour les utilisateurs (par exemple, bouton "Rejoindre la bêta")
- Afficher les canaux de test/aperçu disponibles
- Implémenter des fonctionnalités de découverte de canaux

**Retours**

`Promise<ListChannelsResult>` — Liste des canaux auxquels l'appareil peut s'auto-attribuer.

**Depuis :** 7.5.0

**Lance :** {Erreur} Si l'opération échoue ou si la requête adressée au backend échoue.


--------------------


### setCustomId

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Définissez un identifiant personnalisé pour cet appareil.

Cela vous permet d'identifier les appareils par votre propre identifiant personnalisé (ID utilisateur, ID de compte, etc.)
à la place ou en plus de l'ID matériel unique de l'appareil. L'identifiant personnalisé est envoyé
à votre serveur de mise à jour et peut être utilisé pour :
- Cibler des utilisateurs spécifiques pour les mises à jour
- Analyse et suivi des utilisateurs
- Débogage et support (corrélation des appareils avec les utilisateurs)
- Tests A/B ou signalement de fonctionnalités

**Persistance :**
- Lorsque {@link PluginsConfig.CapacitorUpdater.persistCustomId} est `true`, l'ID persiste lors des redémarrages de l'application.
- Lorsque `false`, l'identifiant n'est conservé que pour la session en cours

**Effacement de l'ID personnalisé :**
- Passez une chaîne vide `""` pour supprimer tout identifiant personnalisé stocké

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `SetCustomIdOptions` | Le {@link SetCustomIdOptions} contenant la chaîne d'identifiant personnalisé. |

**Retours**

`Promise<void>` — Résout immédiatement (fonctionnement synchrone).

**Depuis :** 4.9.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### getBuiltinVersion

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Obtenez la version du bundle intégré (la version originale livrée avec votre application native).

Cela renvoie la version du bundle qui était incluse lors de l'installation de l'application.
à partir du App Store ou du Play Store. Ce n'est PAS la version du bundle actuellement active -
utilisez {@link current} pour cela.

Retours :
- La valeur de configuration {@link PluginsConfig.CapacitorUpdater.version} si elle est définie, ou
- La version native de l'application à partir des configurations de la plateforme (package.json, Info.plist, build.gradle)

Utilisez-le pour :
- Afficher la version "usine" aux utilisateurs
- Comparez avec les versions groupées téléchargées
- Déterminer si des mises à jour ont été appliquées
- Incohérences de version de débogage

**Retours**

`Promise<BuiltinVersion>` — La chaîne de version du bundle intégré.

**Depuis :** 5.2.0


--------------------


### getDeviceId

```typescript
getDeviceId() => Promise<DeviceId>
```

Obtenez l'identifiant unique et respectueux de la confidentialité de cet appareil.

Cet ID est utilisé pour identifier l'appareil lors de la communication avec les serveurs de mise à jour.
Il est automatiquement généré et stocké en toute sécurité par le plugin.**Caractéristiques de confidentialité et de sécurité :**
- Généré en tant qu'UUID (non basé sur des identifiants matériels)
- Stocké en toute sécurité dans un stockage sécurisé spécifique à la plate-forme
- Android : Android Keystore (persiste lors des réinstallations d'applications sur API 23+)
- iOS : Porte-clés avec `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`
- Non synchronisé avec le cloud (iOS)
- Suit les meilleures pratiques de confidentialité Apple et Google
- Les utilisateurs peuvent l'effacer via les paramètres système (Android) ou l'accès au trousseau (iOS)

**Persistance :**
L'ID de l'appareil persiste lors des réinstallations d'applications pour conserver une identité cohérente de l'appareil.
pour le suivi et l’analyse des mises à jour.

Utilisez-le pour :
- Débogage des problèmes de livraison des mises à jour (vérifiez quel ID le serveur voit)
- Implémenter des fonctionnalités spécifiques à l'appareil
- Corréler les journaux du serveur avec des appareils spécifiques

**Retours**

`Promise<DeviceId>` — La chaîne d'identifiant unique de l'appareil.

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### getPluginVersion

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Obtenez la version du plugin Capacitor Updater installé dans votre application.

Ceci renvoie la version du code natif du plugin (Android/iOS), qui est envoyé
au serveur de mise à jour à chaque demande. Il ne s'agit PAS de la version de votre application ou de votre version groupée.

Utilisez-le pour :
- Déboguer les problèmes spécifiques au plugin (lors du signalement de bugs)
- Vérifier l'installation et la version du plugin
- Vérifier la compatibilité avec les fonctionnalités backend
- Affichage dans les écrans de débogage/à propos

**Retours**

`Promise<PluginVersion>` — La chaîne de version du plug-in Capacitor Updater.

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### isAutoUpdateEnabled

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Vérifiez si les mises à jour automatiques sont actuellement activées.

Renvoie `true` si {@link PluginsConfig.CapacitorUpdater.autoUpdate} est activé,
ce qui signifie que le plugin recherchera, téléchargera et appliquera automatiquement les mises à jour.

Renvoie `false` en mode manuel, où vous contrôlez le flux de mise à jour à l'aide
{@link getLatest}, {@link download}, {@link next} et {@link set}.

Utilisez-le pour :
- Déterminez le flux de mise à jour utilisé par votre application
- Afficher/masquer l'interface utilisateur de mise à jour manuelle en fonction du mode
- Comportement de mise à jour du débogage

**Retours**

`Promise<AutoUpdateEnabled>` — `true` si la mise à jour automatique est activée, `false` si en mode manuel.

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### supprimer tous les auditeurs

```typescript
removeAllListeners() => Promise<void>
```

Supprimez tous les écouteurs d'événements enregistrés pour ce plugin.

Cela désenregistre tous les écouteurs ajoutés via {@link addListener} pour tous les types d'événements :
- `download`
- `noNeedUpdate`
- `updateAvailable`
- `downloadComplete`
- `downloadFailed`
- `breakingAvailable` / `majorAvailable`
- `updateFailed`
- `appReloaded`
- `appReady`

Utilisez-le pendant le nettoyage (par exemple, lors du démontage de composants ou de la fermeture d'écrans)
pour éviter les fuites de mémoire dues aux écouteurs d'événements persistants.

**Retours**

`Promise<void>` — Résout lorsque tous les écouteurs sont supprimés.

**Depuis :** 1.0.0


--------------------


### addListener('télécharger')

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement de téléchargement du bundle dans l'application. Se déclenche une fois qu'un téléchargement a commencé, pendant le téléchargement et une fois terminé.
Cela vous renverra tous les pourcentages de téléchargement pendant le téléchargement

**Paramètres**| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``télécharger'` |  |
| `listenerFunc` | `(state: DownloadEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 2.0.11


--------------------


### addListener('noNeedUpdate')

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement sans qu'il soit nécessaire de le mettre à jour, utile lorsque vous souhaitez forcer la vérification à chaque lancement de l'application

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``pas de mise à jour nécessaire'` |  |
| `listenerFunc` | `(state: NoNeedEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 4.0.0


--------------------


### addListener('updateAvailable')

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement de mise à jour disponible, utile lorsque vous souhaitez forcer la vérification à chaque lancement de l'application

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``mise à jourDisponible'` |  |
| `listenerFunc` | `(state: UpdateAvailableEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 4.0.0


--------------------


### addListener('downloadComplete')

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez les événements downloadComplete.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``téléchargementComplet'` |  |
| `listenerFunc` | `(state: DownloadCompleteEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 4.0.0


--------------------


### addListener('breakingAvailable')

```typescript
addListener(eventName: 'breakingAvailable', listenerFunc: (state: BreakingAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez les événements de mise à jour de rupture lorsque le backend signale une mise à jour comme incompatible avec l'application actuelle.
Émet la même charge utile que l’ancien écouteur `majorAvailable`.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``breakingDisponible'` |  |
| `listenerFunc` | `(state: MajorAvailableEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 7.22.0


--------------------


### addListener('majorAvailable')

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement de mise à jour majeure dans l'application, informez-vous lorsque la mise à jour majeure est bloquée en définissant DisableAutoUpdateBreaking

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``majeurDisponible'` |  |
| `listenerFunc` | `(state: MajorAvailableEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 2.3.0


--------------------


### addListener('updateFailed')

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement d'échec de la mise à jour dans l'application, vous informez lorsque la mise à jour n'a pas pu être installée au prochain démarrage de l'application.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ''updateFailed'` |  |
| `listenerFunc` | `(state: UpdateFailedEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 2.3.0


--------------------


### addListener('downloadFailed')

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement d'échec de téléchargement dans l'application, vous informez lorsqu'un téléchargement de bundle a échoué

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``Échec du téléchargement'` |  |
| `listenerFunc` | `(state: DownloadFailedEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 4.0.0


--------------------


### addListener('appReloaded')

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement de rechargement dans l'application, informez-vous quand le rechargement a eu lieu

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``appReloaded'` |  |
| `listenerFunc` | `() => void` |  |

**Retours**`Promise<PluginListenerHandle>`

**Depuis :** 4.3.0


--------------------


### addListener('appReady')

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement prêt pour l'application dans l'application, informez-vous lorsque l'application est prête à être utilisée, cet événement est conservé jusqu'à sa consommation.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``appReady'` |  |
| `listenerFunc` | `(state: AppReadyEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 5.1.0


--------------------


### addListener('channelPrivate')

```typescript
addListener(eventName: 'channelPrivate', listenerFunc: (state: ChannelPrivateEvent) => void) => Promise<PluginListenerHandle>
```

Écoutez l'événement privé de canal, déclenché lors de la tentative de définition d'un canal qui n'autorise pas l'auto-attribution d'un appareil.

Cet événement est utile pour :
- Informer les utilisateurs qu'ils ne sont pas autorisés à passer à un canal spécifique
- Implémentation d'une gestion personnalisée des erreurs pour les restrictions de canal
- Enregistrement des tentatives d'accès non autorisées aux chaînes

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``canalPrivé'` |  |
| `listenerFunc` | `(state: ChannelPrivateEvent) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 7.34.0


--------------------


### addListener('onFlexibleUpdateStateChange')

```typescript
addListener(eventName: 'onFlexibleUpdateStateChange', listenerFunc: (state: FlexibleUpdateState) => void) => Promise<PluginListenerHandle>
```

Écoutez les changements d’état de mise à jour flexibles sur Android.

Cet événement se déclenche pendant le processus flexible de téléchargement de la mise à jour, fournissant :
- Progression du téléchargement (octets téléchargés / nombre total d'octets)
- Modifications de l'état de l'installation

**Valeurs d'état d'installation :**
- `UNKNOWN` (0) : Statut inconnu
- `PENDING` (1) : Téléchargement en attente
- `DOWNLOADING` (2) : Téléchargement en cours
- `INSTALLING` (3) : Installation de la mise à jour
- `INSTALLED` (4) : mise à jour installée (redémarrage de l'application nécessaire)
- `FAILED` (5) : échec de la mise à jour
- `CANCELED` (6) : La mise à jour a été annulée
- `DOWNLOADED` (11) : Téléchargement terminé, prêt à installer

Lorsque le statut est `DOWNLOADED`, vous devez inviter l'utilisateur et appeler
{@link completeFlesibleUpdate} pour terminer l'installation.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `eventName` | ``onFlexibleUpdateStateChange'` |  |
| `listenerFunc` | `(state: FlexibleUpdateState) => void` |  |

**Retours**

`Promise<PluginListenerHandle>`

**Depuis :** 8.0.0


--------------------


### isAutoUpdateAvailable

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Vérifiez si la fonctionnalité de mise à jour automatique est disponible (non désactivée par la configuration personnalisée du serveur).

Renvoie `false` lorsqu'un `updateUrl` personnalisé est configuré, comme cela l'indique généralement
vous utilisez un serveur de mise à jour auto-hébergé qui peut ne pas prendre en charge toutes les fonctionnalités de mise à jour automatique.

Renvoie `true` lors de l'utilisation du backend Capgo par défaut ou lorsque la fonctionnalité est disponible.

Ceci est différent de {@link isAutoUpdateEnabled} :
- `isAutoUpdateEnabled()` : Vérifie si le MODE de mise à jour automatique est activé/désactivé
- `isAutoUpdateAvailable()` : Vérifie si la mise à jour automatique est PRISE EN CHARGE avec votre configuration actuelle

**Retours**

`Promise<AutoUpdateAvailable>` — `false` lorsque la updateUrl personnalisée est définie, `true` sinon.

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### getNextBundle

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Obtenez des informations sur le bundle en file d’attente pour être activé lors du prochain rechargement.

Retours :
- Objet {@link BundleInfo} si un bundle a été mis en file d'attente via {@link next}
- `null` si aucune mise à jour n'est en attenteCeci est utile pour :
- Vérifiez si une mise à jour est en attente d'être appliquée
- Afficher le statut "Mise à jour en attente" aux utilisateurs
- Afficher les informations de version de la mise à jour en file d'attente
- Décidez si vous souhaitez afficher une invite "Redémarrer pour mettre à jour"

Le bundle en file d'attente sera activé lorsque :
- L'application est en arrière-plan (comportement par défaut)
- L'application est supprimée et redémarrée
- {@link reload} est appelé manuellement
- Les conditions de délai définies par {@link setMultiDelay} sont remplies

**Retours**

`Promise<BundleInfo | null>` — Les informations sur le bundle en attente, ou `null` si aucune n'est en file d'attente.

**Depuis :** 6.8.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


###getFailedUpdate

```typescript
getFailedUpdate() => Promise<UpdateFailedEvent | null>
```

Récupérez des informations sur le bundle le plus récent dont le chargement a échoué.

Lorsqu'un bundle ne parvient pas à se charger (par exemple, des erreurs JavaScript empêchent l'initialisation, des fichiers manquants),
le plugin revient automatiquement en arrière et stocke les informations sur l'échec. Cette méthode
récupère ces informations d’échec.

**IMPORTANT : La valeur stockée est effacée après avoir été récupérée une fois.**
Appeler cette méthode plusieurs fois ne renverra les informations d'échec qu'au premier appel,
puis `null` lors des appels suivants jusqu'à ce qu'un autre échec se produise.

Retours :
- {@link UpdateFailedEvent} avec informations sur le bundle si un échec a été enregistré
- `null` si aucune panne n'est survenue ou si elle a déjà été récupérée

Utilisez-le pour :
- Montrer aux utilisateurs pourquoi une mise à jour a échoué
- Consigner les informations d'échec pour le débogage
- Implémenter une gestion/rapport d'erreurs personnalisée
- Afficher les notifications de restauration

**Retours**

`Promise<UpdateFailedEvent | null>` — Les informations sur l'échec de la mise à jour (effacées après la première récupération) ou `null`.

**Depuis :** 7.22.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### setShakeMenu

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Activez ou désactivez le menu des gestes de secousse pour le débogage et les tests.

Lorsqu'il est activé, les utilisateurs peuvent secouer leur appareil pour ouvrir un menu de débogage qui affiche :
- Informations sur le forfait actuel
- Forfaits disponibles
- Options pour changer de forfait manuellement
- Statut de mise à jour

Ceci est utile pendant le développement et les tests pour :
- Testez rapidement différentes versions du bundle
- Déboguer les flux de mise à jour
- Basculer entre les bundles de production et de test
- Vérifier les installations du bundle

**Important :** Désactivez cette option dans les versions de production ou activez-la uniquement pour les testeurs internes.

Peut également être configuré via {@link PluginsConfig.CapacitorUpdater.shakeMenu}.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `SetShakeMenuOptions` |  |

**Retours**

`Promise<void>` — Résout lorsque le paramètre est appliqué.

**Depuis :** 7.5.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### isShakeMenuEnabled

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Vérifiez si le menu de débogage des gestes de secousse est actuellement activé.

Renvoie l'état actuel de la fonctionnalité du menu Shake qui peut être basculée via
{@link setShakeMenu} ou configuré via {@link PluginsConfig.CapacitorUpdater.shakeMenu}.

Utilisez-le pour :
- Vérifiez si les fonctionnalités de débogage sont activées
- Afficher/masquer l'interface utilisateur des paramètres de débogage
- Vérifier la configuration lors des tests

**Retours**

`Promise<ShakeMenuEnabled>` — Objet avec `enabled: true` ou `enabled: false`.

**Depuis :** 7.5.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### setShakeChannelSelector

```typescript
setShakeChannelSelector(options: SetShakeChannelSelectorOptions) => Promise<void>
```Activez ou désactivez le sélecteur de canal de secousse au moment de l'exécution.

Lorsqu'il est activé ET que shakeMenu est vrai, secouer l'appareil affiche une chaîne
sélecteur au lieu du menu de débogage. Cela permet aux utilisateurs de basculer entre
mettre à jour les chaînes en secouant leur appareil.

Après avoir sélectionné une chaîne, l'application vérifie automatiquement les mises à jour
et téléchargements si disponibles.

Peut également être configuré via {@link PluginsConfig.CapacitorUpdater.allowShakeChannelSelector}.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `SetShakeChannelSelectorOptions` |  |

**Retours**

`Promise<void>` — Résout lorsque le paramètre est appliqué.

**Depuis :** 8.43.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### isShakeChannelSelectorEnabled

```typescript
isShakeChannelSelectorEnabled() => Promise<ShakeChannelSelectorEnabled>
```

Vérifiez si le sélecteur de canal de secousse est actuellement activé.

Renvoie l'état actuel de la fonction de sélection de canal de secousse qui peut être basculée via
{@link setShakeChannelSelector} ou configuré via {@link PluginsConfig.CapacitorUpdater.allowShakeChannelSelector}.

**Retours**

`Promise<ShakeChannelSelectorEnabled>` — Objet avec `enabled: true` ou `enabled: false`.

**Depuis :** 8.43.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### getAppId

```typescript
getAppId() => Promise<GetAppIdRes>
```

Obtenez l'ID d'application actuellement configuré utilisé pour la communication du serveur de mise à jour.

Renvoie l'ID d'application qui identifie cette application au serveur de mise à jour. Cela peut être :
- La valeur définie via {@link setAppId}, ou
- La valeur de configuration {@link PluginsConfig.CapacitorUpdater.appId}, ou
- L'identifiant d'application par défaut de la configuration de votre application native

Utilisez-le pour :
- Vérifiez quel identifiant d'application est utilisé pour les mises à jour
- Déboguer les problèmes de livraison des mises à jour
- Afficher la configuration de l'application dans les écrans de débogage
- Confirmez l'ID de l'application après avoir appelé {@link setAppId}

**Retours**

`Promise<GetAppIdRes>` — Objet contenant la chaîne `appId` actuelle.

**Depuis :** 7.14.0

**Lance :** {Erreur} Si l'opération échoue.


--------------------


### setAppId

```typescript
setAppId(options: SetAppIdOptions) => Promise<void>
```

Modifiez dynamiquement l'ID d'application utilisé pour la communication du serveur de mise à jour.

Cela remplace l'ID d'application utilisé pour identifier votre application sur le serveur de mise à jour, vous permettant ainsi
pour basculer entre différentes configurations d'application au moment de l'exécution (par exemple, production ou staging)
ID d'application ou configurations multi-locataires).

**Exigences :**
- {@link PluginsConfig.CapacitorUpdater.allowModifyAppId} doit être défini sur `true`

**Considérations importantes :**
- La modification de l'ID de l'application affectera les mises à jour que cet appareil reçoit
- Le nouvel App ID doit exister sur votre serveur de mise à jour
- Ceci est principalement destiné aux cas d'utilisation avancés (multilocation, changement d'environnement)
- La plupart des applications doivent plutôt utiliser {@link PluginsConfig.CapacitorUpdater.appId} basé sur la configuration.

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `SetAppIdOptions` |  |

**Retours**

`Promise<void>` — Résout lorsque l'ID de l'application est modifié avec succès.

**Depuis :** 7.14.0

**Lance :** {Erreur} Si `allowModifyAppId` est faux ou si l'opération échoue.


--------------------


### getAppUpdateInfo

```typescript
getAppUpdateInfo(options?: GetAppUpdateInfoOptions | undefined) => Promise<AppUpdateInfo>
```

Obtenez des informations sur la disponibilité de l'application dans le App Store ou le Play Store.Cette méthode vérifie les magasins d'applications natifs pour voir si une version plus récente de l'application
est disponible en téléchargement. Ceci est différent des mises à jour OTA de Capgo - ceci
vérifie les mises à jour d'applications natives qui nécessitent de passer par les magasins d'applications.

**Différences de plateforme :**
- **Android** : utilise les mises à jour intégrées à l'application de Play Store API pour des informations de mise à jour précises
- **iOS** : interroge la recherche App Store API (nécessite le code du pays pour des résultats précis)

**Renvoie des informations sur :**
- Version actuellement installée
- Version disponible en magasin (le cas échéant)
- Si une mise à jour est disponible
- Priorité de mise à jour (Android uniquement)
- Si les mises à jour immédiates/flexibles sont autorisées (Android uniquement)

Utilisez-le pour :
- Vérifiez si les utilisateurs doivent mettre à jour depuis l'App Store
- Afficher les invites « Mise à jour disponible » pour les mises à jour natives
- Implémenter le contrôle de version (nécessite une version native minimale)
- Combinez avec les mises à jour Capgo OTA pour une stratégie de mise à jour complète

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `GetAppUpdateInfoOptions | non défini` | {@link GetAppUpdateInfoOptions} facultatif avec l'indicatif de pays pour iOS. |

**Retours**

`Promise<AppUpdateInfo>` — Informations sur les versions actuelles et disponibles de l'application.

**Depuis :** 8.0.0

**Lance :** {Erreur} Si l'opération échoue ou si les informations du magasin ne sont pas disponibles.


--------------------


### ouvrirAppStore

```typescript
openAppStore(options?: OpenAppStoreOptions | undefined) => Promise<void>
```

Ouvrez la page de l'application dans le App Store ou Play Store.

Cela dirige l'utilisateur vers la fiche Play Store de votre application où il peut manuellement
mettre à jour l'application. Utilisez-le comme solution de secours lorsque les mises à jour intégrées à l'application ne sont pas disponibles
ou lorsque l'utilisateur doit mettre à jour le iOS.

**Comportement de la plateforme :**
- **Android** : Ouvre Play Store à la page de l'application
- **iOS** : Ouvre App Store à la page de l'application

**Options de personnalisation :**
- `appId` : spécifiez un identifiant App Store personnalisé (iOS) - utile pour ouvrir la page d'une autre application
- `packageName` : spécifiez un nom de package personnalisé (Android) - utile pour ouvrir la page d'une autre application

**Paramètres**

| Nom | Tapez | Descriptif |
| --- | --- | --- |
| `options` | `OuvrirOptionsAppStore | non défini` | {@link OpenAppStoreOptions} facultatif pour personnaliser la page de magasin de l'application à ouvrir. |

**Retours**

`Promise<void>` — Se résout lorsque le magasin est ouvert.

**Depuis :** 8.0.0

**Lance :** {Erreur} Si le magasin ne peut pas être ouvert.


--------------------


### performImmediateUpdate

```typescript
performImmediateUpdate() => Promise<AppUpdateResult>
```

Effectuez une mise à jour immédiate dans l'application sur Android.

Cela déclenche le flux de mise à jour immédiat de Google Play, qui :
1. Affiche une interface utilisateur de mise à jour en plein écran
2. Télécharge et installe la mise à jour
3. Redémarre automatiquement l'application

L'utilisateur ne peut pas continuer à utiliser l'application tant que la mise à jour n'est pas terminée.
C’est idéal pour les mises à jour critiques qui doivent être installées immédiatement.

**Exigences :**
- Android uniquement (génère une erreur sur iOS)
- Une mise à jour doit être disponible (vérifiez d'abord auprès de {@link getAppUpdateInfo})
- La mise à jour doit permettre les mises à jour immédiates (`immediateUpdateAllowed: true`)**Expérience utilisateur :**
- Interface utilisateur de blocage en plein écran
- Progression affichée lors du téléchargement
- L'application redémarre automatiquement après l'installation

**Retours**

`Promise<AppUpdateResult>` — Résultat indiquant la réussite, l'annulation ou l'échec.

**Depuis :** 8.0.0

**Lance :** {Erreur} Si ce n'est pas le cas sur Android, aucune mise à jour n'est disponible ou les mises à jour immédiates ne sont pas autorisées.


--------------------


### startFlexibleUpdate

```typescript
startFlexibleUpdate() => Promise<AppUpdateResult>
```

Démarrez une mise à jour flexible dans l'application sur Android.

Cela déclenche le flux de mise à jour flexible de Google Play, qui :
1. Télécharge la mise à jour en arrière-plan
2. Permet à l'utilisateur de continuer à utiliser l'application
3. Avertit lorsque le téléchargement est terminé
4. Nécessite d'appeler {@link completeFlexibleUpdate} pour l'installation

Surveillez la progression du téléchargement à l’aide de l’écouteur `onFlexibleUpdateStateChange`.

**Exigences :**
- Android uniquement (génère une erreur sur iOS)
- Une mise à jour doit être disponible (vérifiez d'abord auprès de {@link getAppUpdateInfo})
- La mise à jour doit permettre des mises à jour flexibles (`flexibleUpdateAllowed: true`)

**Flux typique :**
1. Appelez `startFlexibleUpdate()` pour commencer le téléchargement
2. Écoutez `onFlexibleUpdateStateChange` pour progresser
3. Lorsque l'état est `DOWNLOADED`, invitez l'utilisateur à redémarrer
4. Appelez `completeFlexibleUpdate()` pour installer et redémarrer

**Retours**

`Promise<AppUpdateResult>` — Résultat indiquant que la mise à jour a été démarrée, annulée ou a échoué.

**Depuis :** 8.0.0

**Lance :** {Erreur} Si ce n'est pas le cas sur Android, aucune mise à jour n'est disponible ou les mises à jour flexibles ne sont pas autorisées.


--------------------


### complèteFlexibleUpdate

```typescript
completeFlexibleUpdate() => Promise<void>
```

Effectuez une mise à jour flexible dans l'application sur Android.

Après le téléchargement d'une mise à jour flexible (statut `DOWNLOADED` dans
`onFlexibleUpdateStateChange`), appelez cette méthode pour installer la mise à jour
et redémarrez l'application.

**Important :** Cela redémarrera immédiatement l'application. Assurez-vous de :
- Enregistrez toutes les données utilisateur avant d'appeler
- Inviter l'utilisateur avant de redémarrer
- Appelez uniquement lorsque l'état du téléchargement est `DOWNLOADED`

**Retours**

`Promise<void>` — Résout lorsque l'installation de la mise à jour commence (l'application redémarrera).

**Depuis :** 8.0.0

**Lance :** {Erreur} Si ce n'est pas sur Android ou si aucune mise à jour téléchargée n'est en attente.


--------------------


</docgen-api>
