---
slug: introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: >-
  Introduction du chiffrement de bout en bout dans capacitor-updater avec la
  signature de code
description: >-
  Utilisation du chiffrement RSA + AES pour crypter les mises à jour, conçu pour
  les entreprises et les applications à haute sécurité
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2024-08-27T00:00:00.000Z
head_image: /secure_upload.webp
head_image_alt: Téléchargement sécurisé de Capgo
keywords: >-
  E2E, code signing, RSA, AES, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Solution
published: true
locale: fr
next_blog: ''
---
[Capacitor-updater](https://github.com/Cap-go/capacitor-updater/) prend désormais en charge le chiffrement de code de bout en bout. La signature de code garantit que les mises à jour exécutées par les appareils des utilisateurs finaux n'ont pas été altérées et offre un niveau de protection supplémentaire au-delà de la sécurité web standard de Capacitor-updater.

## La sécurité par défaut de Capacitor-updater

Par défaut, le modèle de sécurité de Capgo est similaire à celui des hébergeurs web. Capgo stocke les mises à jour [chiffrées au repos](https://cloud.google.com/docs/security/encryption/default-encryption/) et les sert via HTTPS en utilisant des chiffrements modernes. De même, la publication d'une mise à jour depuis l'ordinateur d'un développeur utilise toujours HTTPS.

![Capgo obtient un A+ au test HTTPS de SSL Labs](/ssllabs_report.webp)

La sécurité par défaut de Capgo obtient un A+ au test HTTPS de SSL Labs (https://www.ssllabs.com, novembre 2022)

Comme les meilleurs hébergeurs web, Capgo utilise HTTPS pour protéger la confidentialité et l'intégrité des connexions réseau entre le serveur et les appareils des utilisateurs finaux. C'est un excellent niveau de sécurité qui fonctionne bien à la fois pour le web et les applications Ionic qui utilisent Capgo.

## La chaîne d'approvisionnement de l'infrastructure cloud

Une autre chose que Capgo et la plupart des hébergeurs web ont en commun est qu'ils fonctionnent sur une infrastructure cloud de bas niveau, souvent d'AWS, GCP ou d'un autre fournisseur cloud populaire. Le matériel et les logiciels exploités par ces fournisseurs cloud et Capgo ou d'autres hébergeurs web font partie de la chaîne d'approvisionnement cloud.

La chaîne d'approvisionnement cloud et son modèle de sécurité fonctionnent pour un grand nombre de sites web et d'applications. Chaque développeur web qui utilise un fournisseur cloud fait confiance à ce fournisseur et s'attend à ce que les fichiers qu'il télécharge soient les fichiers qui sont exécutés ou servis sans être altérés. Et les fournisseurs cloud travaillent dur pour maintenir leur infrastructure sécurisée.

Mais évidemment, des vulnérabilités matérielles et logicielles sont découvertes. Les fournisseurs cloud corrigent les vulnérabilités selon des calendriers opportuns, préviennent de manière proactive les logiciels malveillants (par exemple [Google's SLSA](https://security.googleblog.com/2021/06/introducing-slsa-end-to-end-framework.html/)), et construisent des couches de défense en profondeur, et en pratique, l'infrastructure cloud s'est avérée répondre aux besoins de sécurité de la plupart des sites web et des applications. Cependant, certaines applications Ionic incluent l'infrastructure cloud compromise dans leurs modèles de menaces. Pour ces applications Capacitor JS avec les exigences de sécurité les plus élevées au-dessus du web, nous avons intégré la signature de code de bout en bout dans Capgo et le [protocole standard des mises à jour Capgo](/docs/self-hosted/auto-update/update-endpoint/).

## Signature de code de bout en bout avec Capgo

La signature de code de bout en bout de Capgo utilise la cryptographie à clé publique pour garantir que les appareils des utilisateurs finaux n'exécutent que des mises à jour non modifiées et originales du développeur de l'application Capacitor.

"De bout en bout" signifie que cette sécurité couvre le flux depuis le moment où un développeur publie une mise à jour jusqu'au moment où l'appareil d'un utilisateur final reçoit et exécute la mise à jour. "La signature de code" consiste à utiliser la cryptographie et une clé privée secrète pour "signer" le code, puis à utiliser une clé publique de confiance pour vérifier la signature.

Voici un schéma simple* pour expliquer comment cela fonctionne :

![Schéma de chiffrement Capgo](/encryption_flow.webp)

* Complexe en pratique, la cryptographie est difficile

*Définition* :
- AES : Advanced Encryption Standard, un algorithme de chiffrement symétrique, une clé pour le chiffrement et le déchiffrement.
- RSA : Rivest–Shamir–Adleman, un algorithme de chiffrement asymétrique, deux clés sont utilisées : une clé publique et une clé privée.
- Cypher : Les données chiffrées.
- Clé de session : Une clé AES utilisée pour chiffrer et déchiffrer les données.
- Somme de contrôle : Un hachage calculé pour un fichier
- Signature : Une somme de contrôle qui a été chiffrée avec une clé RSA privée. Elle peut être vérifiée avec une clé RSA publique

Nous utilisons l'algorithme AES pour chiffrer la mise à jour. Une clé AES aléatoire est générée pour chaque téléchargement, puis la clé AES et la somme de contrôle (ci-après "signature") sont chiffrées avec la clé RSA privée du développeur. La clé RSA publique du développeur est utilisée dans l'application pour déchiffrer la clé AES et la signature (la reconvertissant en somme de contrôle). Plus tard, la clé AES déchiffrée est utilisée pour déchiffrer la mise à jour ; une somme de contrôle de la mise à jour déchiffrée est calculée, et elle est comparée avec la signature déchiffrée.

Nous utilisons deux algorithmes de chiffrement différents car RSA ne peut pas être utilisé pour chiffrer de grandes quantités de données. AES est utilisé pour chiffrer la mise à jour et RSA est utilisé pour chiffrer la clé AES et la somme de contrôle.

Avec cela, même Capgo ne peut pas lire le contenu de votre bundle. C'est un modèle de sécurité robuste qui est utilisé par de nombreux clients entreprise.

**Mise à jour chiffrement V2 2024-08-27 :**
- Nous avons changé le type de clé stockée dans l'application. Cela a été fait pour empêcher de déduire la clé publique (précédemment utilisée pour le chiffrement) de la clé privée (précédemment utilisée pour le déchiffrement). Maintenant, l'application stocke la clé publique (maintenant utilisée pour le déchiffrement).
- Nous avons changé la somme de contrôle de l'algorithme CRC32 à l'algorithme SHA256. Nous avons également commencé à [signer le bundle](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Signing_messages). Lorsque le chiffrement V2 est configuré, une mise à jour doit avoir une signature valide. Ceci est strictement appliqué par le plugin.
- Nous appliquons maintenant une signature valide lorsque le chiffrement V2 est configuré.
Ces 3 changements ont été effectués après une analyse de sécurité d'un membre de la communauté. Ils sont là pour prévenir les attaques cryptographiques pendant la mise à jour.

Si vous utilisiez le chiffrement V1, migrez vers V2 pour bénéficier des nouvelles fonctionnalités de sécurité. Suivez les [instructions de migration](/docs/cli/migrations/encryption/).

Avec la signature de code de bout en bout, Capgo devient une infrastructure cloud "sans confiance". Si l'un des fournisseurs cloud de Capgo ou même Capgo lui-même devait modifier une mise à jour signée, les appareils des utilisateurs finaux rejetteraient cette mise à jour et exécuteraient la mise à jour précédente de confiance déjà présente sur l'appareil.

Bien que le niveau web HTTPS soit suffisant pour de nombreuses applications, certaines grandes entreprises trouvent attrayant le niveau de sécurité supplémentaire de la signature de code de bout en bout. Certaines de ces entreprises créent des applications financières qui émettent des transactions permanentes de haute valeur. D'autres entreprises ont des RSSI qui incluent l'infrastructure cloud compromise dans leurs modèles de menaces. Nous avons intégré la signature de code de bout en bout dans Capgo pour ces cas d'utilisation et sommes intéressés d'en savoir plus des entreprises ayant des besoins de sécurité de niveau supérieur.

## Mise en route pour les clients entreprise

Pour les grandes entreprises ou les projets qui accordent une grande importance à la sécurité, nous voulons rendre la signature de code facile à configurer et à maintenir. À cette fin, nous fournissons désormais les fonctionnalités suivantes :

-   Configuration rapide des certificats et configuration
-   Prise en charge de la signature de code des serveurs de développement avec Capgo et les builds de développement
-   Signature de code en production sur chaque mise à jour

La signature de code Capgo est disponible pour tous les clients. Pour commencer, suivez les [instructions de configuration](/docs/cli/commands/#end-to-end-encryption-trustless).

## Crédits

Merci beaucoup à [Ionic](https://ionic.com/), cet article est basé sur [cet article](https://ionic.io/blog/introducing-the-ionic-end-to-end-testing-reference-example/) réécrit avec chat-gpt-3 et adapté.
