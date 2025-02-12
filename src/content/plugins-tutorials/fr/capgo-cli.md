---
locale: fr
---

Utilisation de @capgo/cli pour télécharger et télécharger des fichiers vers Capgo Cloud

[@capgo/cli](https://wwwnpmjscom/package/@capgo/cli/) est un outil d'interface en ligne de commande (CLI) qui vous permet de télécharger et de télécharger des fichiers vers et depuis le Capgo Cloud Dans ce tutoriel, nous allons passer en revue les étapes pour utiliser @capgo/cli pour gérer les fichiers dans le Capgo Cloud

### Étape 1 : Inscription

Avant d'utiliser @capgo/cli, vous devez enregistrer un compte sur [capgoapp](https://capgoapp/) et obtenir votre clé API

### Étape 2 : Installation

Pour installer @capgo/cli, ouvrez votre terminal et exécutez la commande suivante :

```bash
npm install -g @capgo/cli
```

### Étape 3 : Connexion à Capgo Cloud

Pour vous connecter au Capgo Cloud en utilisant @capgo/cli, exécutez la commande suivante :

```bash
npx @capgo/cli login [apikey]
```

Remplacez `[apikey]` par votre clé API obtenue lors de l'inscription Vous pouvez également utiliser le drapeau `--local` pour enregistrer la clé API dans le dossier local

### Étape 4 : Ajouter une nouvelle application à Capgo Cloud

Pour ajouter une nouvelle application au Capgo Cloud, utilisez la commande suivante :

```bash
npx @capgo/cli add [appId]
```

Remplacez `[appId]` par votre identifiant d'application au format `comtestapp` Vous pouvez également utiliser les drapeaux `--icon`, `--name` et `--apikey` pour personnaliser l'icône, le nom et la clé API de l'application

### Étape 5 : Télécharger une version sur Capgo Cloud

Pour télécharger une version de votre application sur le Capgo Cloud, exécutez la commande suivante :

```bash
npx @capgo/cli upload [appId]
```

Remplacez `[appId]` par votre identifiant d'application Vous pouvez utiliser les drapeaux `--apikey`, `--path`, `--channel`, `--external`, `--key`, `--key-data`, `--no-key`, `--bundle` et `--iv-session-key` pour personnaliser les options de téléchargement

### Étape 6 : Gestion des canaux

Vous pouvez créer et supprimer des canaux dans le Capgo Cloud en utilisant @capgo/cli 

Pour ajouter un nouveau canal, utilisez la commande :

```bash
npx @capgo/cli channel add [channelId] [appId]
```

Remplacez `[channelId]` par le nom du nouveau canal et `[appId]` par votre identifiant d'application

Pour supprimer un canal, utilisez la commande :

```bash
npx @capgo/cli channel delete [channelId] [appId]
```

Remplacez `[channelId]` par le nom du canal à supprimer et `[appId]` par votre identifiant d'application

### Étape 7 : Chiffrement de bout en bout

@capgo/cli prend en charge le chiffrement de bout en bout pour votre code Vous pouvez générer une paire de clés RSA en utilisant la commande suivante :

```bash
npx @capgo/cli key create
```

Vous pouvez enregistrer la clé privée dans la configuration de votre application en exécutant :

```bash
npx @capgo/cli key save
```

Pour chiffrer un fichier zip avec votre clé, utilisez la commande :

```bash
npx @capgo/cli encrypt [path/to/zip]
```

Pour déchiffrer un fichier zip avec votre clé, utilisez la commande :

```bash
npx @capgo/cli encrypt [path/to/zip] [ivSessionKey]
```

Remplacez `[path/to/zip]` et `[ivSessionKey]` par les valeurs appropriées

### Conclusion

Dans ce tutoriel, nous avons appris à utiliser @capgo/cli pour télécharger et télécharger des fichiers vers et depuis le Capgo Cloud @capgo/cli fournit une interface de ligne de commande pratique pour gérer les versions et les canaux de votre application Pour plus d'informations, consultez la [documentation](https://capgoapp/docs/) officielle