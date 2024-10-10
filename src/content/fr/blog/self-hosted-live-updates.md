---
slug: self-hosted-live-updates
title: Mises à jour en direct auto-hébergées
description: "Je suis ravi d'annoncer les mises à jour en direct auto-hébergées, la prochaine itération des mises à jour en direct de Capgo\_!"
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Mises à jour auto-hébergées
tag: Solution
published: true
locale: fr
next_blog: ''
---

Je suis ravi d'annoncer la sortie des mises à jour en direct auto-hébergées, qui représentent la dernière évolution des mises à jour en direct de Capgo.

Alors que de nombreuses entreprises utilisent actuellement le SDK Live Updates pour accéder aux mises à jour JavaScript, HTML et CSS les plus récentes pour leurs applications, certaines peuvent rencontrer des obstacles dus aux politiques de l'entreprise, aux réglementations du secteur ou aux restrictions géographiques. Avec les mises à jour en direct auto-hébergées, vous pouvez désormais distribuer des artefacts de build Web via votre infrastructure

Cela signifie que vous pouvez éviter les retards causés par les avis sur l'Apple Store, résoudre les bugs et modifier le contenu plus rapidement, et garantir que vos utilisateurs utilisent toujours la dernière version de votre application. De plus, j'ai entendu de nombreuses grandes entreprises souhaiter tirer parti de Live. Mises à jour mais confrontées à des défis en raison de normes de conformité strictes. Ce problème appartient désormais au passé grâce aux mises à jour en direct auto-hébergées.

## Comment fonctionnent les mises à jour en direct auto-hébergées ?

Le déploiement des mises à jour en direct hébergées par Capgo est un jeu d'enfant à l'aide du [SDK Capgo](https://githubcom/Cap-go/capacitor-updater/) En ce qui concerne les mises à jour en direct auto-hébergées, j'ai amélioré la CLI Capgo avec les fonctionnalités nécessaires pour activer la configuration sur votre infrastructure

Pour garantir une livraison sûre et coordonnée des derniers artefacts de build Web aux utilisateurs finaux, Capgo permet désormais au plugin Capacitor Live Updates d'utiliser une paire de clés publique/privée. Lors de l'utilisation de Live Updates auto-hébergées, une poignée de main supplémentaire est effectuée pour rassurer. que les artefacts téléchargés via le plugin depuis l'infrastructure de l'entreprise ne sont pas modifiés

![Schéma de chiffrement Capgo](/encryption_flowwebp)

Ce qui suit décrit les étapes pour établir l'appariement de clés et le processus ultérieur pour fournir l'expérience mise à jour aux utilisateurs finaux.

### Configuration d'une paire de clés unique

Pour générer une paire de clés publique/privée, les entreprises peuvent utiliser la commande Capgo Cloud CLI suivante :

```shell
npx @capgo/cli@latest key create
```

Cette commande définira les propriétés `CapacitorUpdaterprivateKey` dans votre fichier de configuration
Et générez 2 fichiers clés, `capgo_keypub` et `capgo_key` dans le répertoire racine de votre projet

Cette paire de clés est utilisée pour signer la mise à jour et vérifier la mise à jour côté application

### Workflow de mises à jour en direct auto-hébergées

Pour commencer à implémenter les mises à jour en direct auto-hébergées, une entreprise doit d'abord effectuer une compilation Web de ses corrections de bogues, mises à jour de contenu ou toute autre modification de code Web qu'elle souhaite apporter. Ensuite, elle doit signer l'artefact de compilation à l'aide de la clé privée obtenue. pendant le processus de configuration unique, et enfin télécharger le bundle vers leur emplacement de stockage préféré

Construisez d’abord votre code :
```shell
npm run build
```

Zippez ensuite votre build :
```shell
npx @capgo/cli/latest bundle zip
```

Chiffrez ensuite votre zip :

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Cette commande vous imprimera une ivSessionKey, vous devrez la sauvegarder pour l'étape suivante

Téléchargez maintenant votre zip crypté sur le stockage de votre entreprise et obtenez l'URL du fichier zip.

Capgo doit alors être informé d'un nouveau Live Update prêt à être consommé. Cela se fait via une autre commande CLI :

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Une fois la commande exécutée, Capgo est au courant d'une nouvelle mise à jour prête à être distribuée aux utilisateurs de l'application. Désormais, lorsque l'application est démarrée, le plugin Live Updates vérifie auprès de Capgo si des modifications doivent être apportées.

Capgo répond au plugin par « Oui, une mise à jour est disponible » et le plugin Live Updates télécharge la nouvelle mise à jour en direct en utilisant l'emplacement URL fourni à partir de la commande CLI \`register\` :

```shell
https://abc.com/app/updates/abc123.zip
```

L'API de l'organisation renvoie le package Live Update depuis l'emplacement, et l'application déchiffre le zip et applique la mise à jour en direct Voilà!

## Commencer

Je suis ravi d'étendre la portée des mises à jour en direct à encore plus d'entreprises qu'auparavant. Les organisations et les utilisateurs de l'application Ionic reconnaîtront rapidement les avantages de la distribution sécurisée de Capgo des mises à jour d'applications en direct.

Pour plus d'informations sur les mises à jour en direct auto-hébergées par Capgo, vous pouvez [consulter la documentation](/docs/tooling/cli/#upload-version)Prêt à déployer des mises à jour instantanées d'applications directement auprès de vos utilisateurs ? [Inscrivez-vous ici aujourd'hui !](/register/)