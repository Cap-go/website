---
title: 暗号化
description: Chiffrer les données avec une nouvelle méthode de chiffrement
sidebar:
  order: 5
locale: fr
---

Cette documentation expliquera comment chiffrer vos données avec le nouveau système de chiffrement et supprimer l'ancien

En savoir plus sur le nouveau système de chiffrement dans le [blog post](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing)

---

Tout d'abord, créez une nouvelle paire de clés avec la commande suivante :

```bash
npx @capgo/cli key create
```

Cette commande créera une nouvelle paire de clés dans votre application ; il est impératif de stocker la clé privée dans un endroit sûr. Il ne faut jamais soumettre la clé privée au contrôle de source ni la partager avec une partie non fiable

Cette commande supprimera également l'ancienne clé de votre configuration Capacitor, mais ne supprimera pas les anciens fichiers de clés. Le CLI les conserve pour vous permettre de continuer à envoyer des mises à jour en direct pour les applications qui n'ont pas reçu de mise à jour de l'App Store et qui utilisent toujours l'ancien plugin. Cela facilite la migration

Lorsque la migration vous demande "Voulez-vous configurer le chiffrement avec le nouveau canal afin de prendre en charge les anciennes applications et faciliter la migration ?", veuillez accepter. Cela ajoutera une nouvelle option "defaultChannel" à votre configuration Capacitor. Cela fera en sorte que votre application utilise le canal "encryption_v2". Cela garantira que le nouveau chiffrement n'est utilisé que par les applications qui le prennent en charge. Les applications qui n'ont pas reçu de mise à jour de l'App Store continueront à utiliser le canal par défaut précédent

---

Maintenant, vous devez construire votre bundle JS et le télécharger sur le nouveau canal. Veuillez exécuter la commande suivante :

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

---

Ensuite, exécutez cette commande pour permettre aux applications de s'auto-assigner au canal "encryption_v2"

:::caution
Ceci est nécessaire pour que la nouvelle option "defaultChannel" fonctionne
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

---

Vous pouvez maintenant exécuter l'application ; elle utilisera le nouveau système de chiffrement

Pour télécharger le nouveau bundle JS sur l'ancien canal, il vous suffit d'exécuter la commande suivante :

```bash
npx @capgo/cli bundle upload --channel production
```

---

Vous n'avez pas besoin de vous soucier de la configuration Capacitor, elle n'est jamais téléchargée vers Capgo

Lorsque tous les utilisateurs auront mis à jour leurs applications (cela peut prendre jusqu'à 3/4 mois), vous pourrez supprimer le "defaultChannel" de votre configuration Capacitor

Ensuite, vous pourrez supprimer l'ancien canal avec la commande suivante :

```bash
npx @capgo/cli channel delete encryption_v2
```

---

Après avoir supprimé le canal "encryption_v2", toutes les applications qui l'utilisent comme canal par défaut commenceront à utiliser le canal "production"