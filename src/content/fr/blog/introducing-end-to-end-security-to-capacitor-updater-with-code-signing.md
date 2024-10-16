---
slug: introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: >-
  Introduction du chiffrement de bout en bout pour capacitor-updater avec
  signature de code
description: >-
  Utilisation du chiffrement RSA + AES pour crypter les mises à jour, conçu pour
  les entreprises et les applications avec des exigences de sécurité élevées
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2024-08-27T00:00:00.000Z
head_image: /secure_upload.webp
head_image_alt: Chargement Sécurisé Capgo
tag: Solution
published: true
locale: fr
next_blog: ''
---

[Capacitor-updater](https://githubcom/Cap-go/capacitor-updater/) prend désormais en charge le chiffrement de code de bout en bout. La signature de code garantit que les mises à jour exécutées par les appareils des utilisateurs finaux n'ont pas été falsifiées et offre un niveau de protection supplémentaire par rapport à la sécurité standard de niveau web de Capacitor-updater.

## La sécurité par défaut de Capacitor-updater

Par défaut, le modèle de sécurité de Capgo est similaire à celui des fournisseurs d'hébergement web. Capgo stocke les mises à jour [chiffrées au repos](https://cloudgooglecom/docs/security/encryption/default-encryption/) et les sert via HTTPS en utilisant des chiffrements modernes. De même, la publication d'une mise à jour depuis l'ordinateur d'un développeur utilise toujours HTTPS.

![Capgo obtient un A+ au test HTTPS de SSL Labs](/ssllabs_reportwebp)

La sécurité par défaut de Capgo obtient un A+ au test HTTPS de SSL Labs (https://wwwssllabscom, novembre 2022).

Comme les meilleurs hébergeurs web, Capgo utilise HTTPS pour protéger la confidentialité et l'intégrité des connexions réseau entre le serveur et les appareils des utilisateurs finaux. C'est un excellent niveau de sécurité qui fonctionne bien à la fois pour le web et les applications Ionic qui utilisent Capgo.

## La chaîne d'approvisionnement de l'infrastructure cloud

Une autre chose que Capgo et la plupart des hébergeurs web ont en commun est qu'ils fonctionnent sur une infrastructure cloud de bas niveau, souvent d'AWS, GCP ou d'un autre fournisseur cloud populaire. Le matériel et les logiciels exploités par ces fournisseurs cloud et Capgo ou d'autres hébergeurs web font partie de la chaîne d'approvisionnement cloud.

La chaîne d'approvisionnement cloud et son modèle de sécurité fonctionnent pour un grand nombre de sites web et d'applications. Chaque développeur web qui utilise un fournisseur cloud fait confiance à ce fournisseur et s'attend à ce que les fichiers qu'il télécharge soient les fichiers qui sont exécutés ou servis sans être altérés. Et les fournisseurs cloud travaillent dur pour maintenir leur infrastructure sécurisée.

Mais évidemment, des vulnérabilités matérielles et logicielles sont découvertes. Les fournisseurs cloud corrigent les vulnérabilités selon des calendriers opportuns, préviennent de manière proactive les logiciels malveillants (par exemple [Google's SLSA](https://securitygoogleblogcom/2021/06/introducing-slsa-end-to-end-frameworkhtml/)), et construisent des couches de défense en profondeur, et en pratique, l'infrastructure cloud a démontré qu'elle répondait aux besoins de sécurité de la plupart des sites web et des applications. Cependant, certaines applications Ionic incluent l'infrastructure cloud compromise dans leurs modèles de menaces. Pour ces applications Capacitor JS avec les exigences de sécurité les plus élevées au-dessus du web, nous avons intégré la signature de code de bout en bout dans Capgo et le [protocole standard Capgo Updates](/docs/self-hosted/auto-update/update-endpoint/).

## Signature de code de bout en bout avec Capgo

La signature de code de bout en bout de Capgo utilise la cryptographie à clé publique pour garantir que les appareils des utilisateurs finaux n'exécutent que des mises à jour non modifiées et originales du développeur de l'application Capacitor.

"De bout en bout" signifie que cette sécurité couvre le flux depuis le moment où un développeur publie une mise à jour jusqu'au moment où l'appareil d'un utilisateur final reçoit et exécute la mise à jour. La "signature de code" consiste à utiliser la cryptographie et une clé privée secrète pour "signer" le code, puis à utiliser ultérieurement une clé publique de confiance pour vérifier la signature.

Voici un schéma simple* pour expliquer comment cela fonctionne :

![Schéma de chiffrement Capgo](/encryption_flowwebp)

* Complexe en pratique, la cryptographie est difficile

*Définition* :
- AES : Advanced Encryption Standard, un algorithme de chiffrement symétrique, une clé pour le chiffrement et le déchiffrement
- RSA : Rivest–Shamir–Adleman, un algorithme de chiffrement asymétrique, deux clés sont utilisées : une clé publique et une clé privée
- Cypher : Les données chiffrées
- Clé de session : Une clé AES utilisée pour chiffrer et déchiffrer les données
- Checksum : Un hash calculé pour un fichier
- Signature : Un checksum qui a été chiffré avec une clé RSA privée. Il peut être vérifié avec une clé RSA publique.

Nous utilisons l'algorithme AES pour chiffrer la mise à jour. Une clé AES aléatoire est générée pour chaque téléchargement, puis la clé AES et le checksum (ci-après "signature") sont chiffrés avec la clé RSA privée du développeur. La clé RSA publique du développeur est utilisée dans l'application pour déchiffrer la clé AES et la signature (la reconvertissant en checksum).Plus tard, la clé AES déchiffrée est utilisée pour déchiffrer la mise à jour ; une somme de contrôle de la mise à jour déchiffrée est calculée, et elle est comparée avec la signature déchiffrée

Nous utilisons deux algorithmes de chiffrement différents car RSA ne peut pas être utilisé pour chiffrer de grandes quantités de données. AES est utilisé pour chiffrer la mise à jour et RSA est utilisé pour chiffrer la clé AES et la somme de contrôle

Avec cela, même Capgo ne peut pas lire le contenu de votre bundle. C'est un modèle de sécurité robuste qui est utilisé par de nombreux clients d'entreprise

**Chiffrement de mise à jour V2 2024-08-27 :**
- Nous avons changé le type de clé stockée dans l'application. Cela a été fait pour empêcher d'inférer la clé publique (précédemment utilisée pour le chiffrement) à partir de la clé privée (précédemment utilisée pour le déchiffrement). Maintenant, l'application stocke la clé publique (maintenant utilisée pour le déchiffrement)
- Nous avons remplacé la somme de contrôle de l'algorithme CRC32 par l'algorithme SHA256. Nous avons également commencé à [signer le bundle](https://enwikipediaorg/wiki/RSA_(cryptosystem)#Signing_messages). Lorsque le chiffrement V2 est configuré, une mise à jour doit avoir une signature valide. Ceci est strictement appliqué par le plugin
- Nous appliquons maintenant une signature valide lorsque le chiffrement V2 est configuré
Ces 3 changements ont été effectués après une analyse de sécurité d'un membre de la communauté. Ils sont là pour prévenir les attaques cryptographiques lors de la mise à jour

Si vous avez utilisé le chiffrement V1, migrez vers V2 pour bénéficier des nouvelles fonctionnalités de sécurité. Suivez les [instructions de migration](/docs/cli/migrations/encryption/)

Avec la signature de code de bout en bout, Capgo devient une infrastructure cloud "sans confiance". Si l'un des fournisseurs cloud de Capgo ou même Capgo lui-même modifiait une mise à jour signée par code, les appareils des utilisateurs finaux rejetteraient cette mise à jour et exécuteraient la mise à jour précédente et fiable déjà présente sur l'appareil

Bien que le HTTPS au niveau web soit suffisant pour de nombreuses applications, certaines grandes entreprises trouvent attrayant le niveau supplémentaire de sécurité offert par la signature de code de bout en bout. Certaines de ces entreprises développent des applications financières qui émettent des transactions de haute valeur et permanentes. D'autres entreprises ont des RSSI qui incluent l'infrastructure cloud compromise dans leurs modèles de menaces. Nous avons intégré la signature de code de bout en bout dans Capgo pour ces cas d'utilisation et sommes intéressés à en savoir plus sur les entreprises ayant des besoins de sécurité de niveau supérieur

## Démarrage pour les clients entreprise

Pour les grandes entreprises ou projets qui accordent une grande importance à la sécurité, nous voulons rendre la signature de code facile à configurer et à maintenir. À cette fin, nous proposons désormais les fonctionnalités suivantes :

- Configuration rapide du certificat et configuration
- Prise en charge de la signature de code pour les serveurs de développement avec Capgo et les builds de développement
- Signature de code en production à chaque mise à jour

La signature de code Capgo est disponible pour tous les clients. Pour commencer, suivez les [instructions de configuration](/docs/cli/commands/#end-to-end-encryption-trustless)

## Crédits

Merci beaucoup à [Ionic](https://ioniccom/), cet article est basé sur [cet article](https://ionicio/blog/introducing-the-ionic-end-to-end-testing-reference-example/) réécrit avec chat-gpt-3 et adapté