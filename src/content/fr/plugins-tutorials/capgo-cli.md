---
locale: fr
---

Utilisation de @capgo/cli pour le téléchargement et le téléchargement de fichiers sur Capgo Cloud

[@capgo/cli](https://wwwnpmjscom/package/@capgo/cli/) est un outil d'interface de ligne de commande (CLI) qui vous permet de télécharger et de télécharger des fichiers vers et depuis le Cloud Capgo. Dans ce didacticiel, nous va parcourir les étapes pour utiliser @capgo/cli pour gérer les fichiers dans Capgo Cloud

### Étape 1 : Inscription

Avant d'utiliser @capgo/cli, vous devez créer un compte sur [capgoapp](https://capgoapp/) et obtenir votre clé API

### Étape 2 : Installation

Pour installer @capgo/cli, ouvrez votre terminal et exécutez la commande suivante :

```bash
npm install -g @capgo/cli
```

### Étape 3 : Connectez-vous à Capgo Cloud

Pour vous connecter à Capgo Cloud à l'aide de @capgo/cli, exécutez la commande suivante :

```bash
npx @capgo/cli login [apikey]
```

Remplacez `[apikey]` par votre clé API obtenue lors de l'inscription. Vous pouvez éventuellement utiliser l'indicateur `--local` pour enregistrer la clé API dans le dossier local.

### Étape 4 : Ajouter une nouvelle application à Capgo Cloud

Pour ajouter une nouvelle application au Capgo Cloud, utilisez la commande suivante :

```bash
npx @capgo/cli add [appId]
```

Remplacez `[appId]` par votre identifiant d'application au format `comtestapp`. Vous pouvez également utiliser les indicateurs `--icon`, `--name` et `--apikey` pour personnaliser l'icône, le nom et la clé API. pour l'application

### Étape 5 : Télécharger une version sur Capgo Cloud

Pour télécharger une version de votre application sur Capgo Cloud, exécutez la commande suivante :

```bash
npx @capgo/cli upload [appId]
```

Remplacez `[appId]` par votre identifiant d'application. Vous pouvez utiliser `--apikey`, `--path`, `--channel`, `--external`, `--key`, `--key-data Indicateurs `, `--no-key`, `--bundle` et `--iv-session-key` pour personnaliser les options de téléchargement

### Étape 6 : Gérer les canaux

Vous pouvez créer et supprimer des chaînes dans Capgo Cloud en utilisant @capgo/cli 

Pour ajouter une nouvelle chaîne, utilisez la commande :

```bash
npx @capgo/cli channel add [channelId] [appId]
```

Remplacez « [channelId] » par le nom de la nouvelle chaîne et « [appId] » par l'ID de votre application

Pour supprimer une chaîne, utilisez la commande :

```bash
npx @capgo/cli channel delete [channelId] [appId]
```

Remplacez « [channelId] » par le nom de la chaîne à supprimer et « [appId] » par l'ID de votre application

### Étape 7 : Chiffrement de bout en bout

@capgo/cli prend en charge le chiffrement de bout en bout pour votre code. Vous pouvez générer une paire de clés RSA à l'aide de la commande suivante :

```bash
npx @capgo/cli key create
```

Vous pouvez enregistrer la clé privée dans la configuration de votre application en exécutant :

```bash
npx @capgo/cli key save
```

Pour chiffrer un fichier zip avec votre clé, utilisez la commande :

```bash
npx @capgo/cli encrypt [path/to/zip]
```

Pour décrypter un fichier zip avec votre clé, utilisez la commande :

```bash
npx @capgo/cli encrypt [path/to/zip] [ivSessionKey]
```

Remplacez `[path/to/zip]` et `[ivSessionKey]` par les valeurs appropriées

### Conclusion

Dans ce didacticiel, nous avons appris à utiliser @capgo/cli pour charger et télécharger des fichiers vers et depuis Capgo Cloud. @capgo/cli fournit une interface de ligne de commande pratique pour gérer les versions et les canaux de vos applications. Pour plus d'informations, reportez-vous au [documentation] officielle(https://capgoapp/docs/)