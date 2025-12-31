---
slug: self-hosted-live-updates
title: Mises à jour en direct auto-hébergées
description: >-
  Je suis ravi d'annoncer Self-hosted Live Updates, la prochaine itération de
  Capgo Live Updates !
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /self_hosted.webp
head_image_alt: Mises à jour auto-hébergées
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: fr
next_blog: ''
---
Je suis ravi d'annoncer la sortie des Mises à jour en direct auto-hébergées, qui représente la dernière évolution des Mises à jour en direct de Capgo.

Bien que de nombreuses entreprises utilisent actuellement le SDK Live Updates pour accéder aux mises à jour JavaScript, HTML et CSS les plus récentes pour leurs applications, certaines peuvent rencontrer des obstacles en raison des politiques d'entreprise, des réglementations sectorielles ou des restrictions géographiques. Avec les Mises à jour en direct auto-hébergées, vous pouvez désormais distribuer des artefacts de build web via votre infrastructure.

Cela signifie que vous pouvez éviter les délais causés par les examens de l'App Store, corriger les bugs et modifier le contenu plus rapidement, et garantir que vos utilisateurs utilisent toujours la dernière version de votre application. De plus, j'ai entendu de nombreuses grandes entreprises qui souhaiteraient utiliser Live Updates mais font face à des défis en raison de normes de conformité strictes. Ce problème appartient désormais au passé grâce aux Mises à jour en direct auto-hébergées.

## Comment fonctionnent les mises à jour en direct auto-hébergées ?

Déployer des Mises à jour en direct hébergées par Capgo est un jeu d'enfant en utilisant le [Capgo SDK](https://github.com/Cap-go/capacitor-updater/). Quant aux Mises à jour en direct auto-hébergées, j'ai amélioré le CLI Capgo avec les fonctionnalités nécessaires pour permettre la configuration sur votre infrastructure.

Pour assurer une livraison sûre et coordonnée des derniers artefacts de build web aux utilisateurs finaux, Capgo permet maintenant au plugin Capacitor Live Updates d'utiliser un couplage de clés publique/privée. Lors de l'utilisation des Mises à jour en direct auto-hébergées, une poignée de main supplémentaire est effectuée pour garantir que les artefacts téléchargés via le plugin depuis l'infrastructure de l'entreprise sont inaltérés.

![Schéma de chiffrement Capgo](/encryption_flow.webp)

Voici les étapes pour établir le couplage des clés et le processus ultérieur de livraison de l'expérience mise à jour aux utilisateurs finaux.

### Configuration unique de la paire de clés

Pour générer une paire de clés publique/privée, les entreprises peuvent utiliser la commande CLI Capgo Cloud suivante :

```shell
npx @capgo/cli@latest key create
```

Cette commande définira les propriétés `CapacitorUpdater.privateKey` dans votre fichier de configuration.
Et générera 2 fichiers de clés, `capgo_key.pub` et `capgo_key` dans le répertoire racine de votre projet.

Cette paire de clés est utilisée pour signer la mise à jour et vérifier la mise à jour côté application.

### Flux de travail des mises à jour en direct auto-hébergées

Pour commencer à implémenter les Mises à jour en direct auto-hébergées, une entreprise doit d'abord effectuer un build web de ses corrections de bugs, mises à jour de contenu ou tout autre changement de code basé sur le web qu'elle souhaite faire. Ensuite, elle doit signer l'artefact de build en utilisant la clé privée obtenue lors du processus de configuration unique, et enfin télécharger le bundle vers leur emplacement de stockage préféré.

D'abord, construisez votre code :
```shell
npm run build
```

Puis zippez votre build :
```shell
npx @capgo/cli@latest bundle zip
```

Puis chiffrez votre zip :

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Cette commande vous affichera une ivSessionKey, vous devez la sauvegarder pour l'étape suivante.

Maintenant, téléchargez votre zip chiffré vers votre stockage d'entreprise et obtenez l'URL du fichier zip.

Capgo doit ensuite être informé qu'une nouvelle Mise à jour en direct est prête à être consommée. Cela se fait via une autre commande CLI :

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Une fois la commande exécutée, Capgo est conscient qu'une nouvelle mise à jour est prête à être distribuée aux utilisateurs de l'application. Maintenant, lorsque l'application est démarrée, le plugin Live Updates vérifie auprès de Capgo si des changements doivent être téléchargés.

Capgo répond au plugin avec "Oui, une mise à jour est disponible" et le plugin Live Updates télécharge la nouvelle mise à jour en direct en utilisant l'URL fournie par la commande CLI `register` :

```shell
https://abc.com/app/updates/abc123.zip
```

L'API de l'organisation renvoie le bundle de Mise à jour en direct depuis l'emplacement, et l'application déchiffre le zip et applique la mise à jour en direct. Voilà !

## Commencez

Je suis ravi d'étendre la portée des Mises à jour en direct à encore plus d'entreprises qu'auparavant. Les organisations et les utilisateurs d'applications Ionic reconnaîtront rapidement les avantages de la distribution sécurisée des mises à jour d'applications par Capgo.

Pour plus d'informations sur les Mises à jour en direct auto-hébergées par Capgo, vous pouvez [consulter la documentation](/docs/cli/commands/#upload-version). Prêt à déployer des mises à jour instantanées d'applications directement à vos utilisateurs ? [Inscrivez-vous ici aujourd'hui !](/register/)
