---
slug: introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: >-
  Introduction du cryptage de bout en bout dans le programme de mise à jour des
  condensateurs avec signature de code
description: >-
  Utilisation de la cryptographie RSA + AES pour chiffrer les mises à jour,
  conçues pour les applications d'entreprise et de haute sécurité
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2024-08-27T00:00:00.000Z
head_image: /secure_upload.webp
head_image_alt: Téléchargement sécurisé Capgo
tag: Solution
published: true
locale: fr
next_blog: ''
---

[Capacitor-updater](https://githubcom/Cap-go/capacitor-updater/) prend désormais en charge le cryptage du code de bout en bout. La signature du code garantit que les mises à jour exécutées par les appareils des utilisateurs finaux n'ont pas été falsifiées et fournit un niveau de protection supplémentaire supérieur à la sécurité Web standard de Capacitor-updater

## La sécurité par défaut de Capacitor-updater

Par défaut, le modèle de sécurité de Capgo est similaire à celui des fournisseurs d'hébergement Web. Capgo stocke les mises à jour [chiffrées au repos](https://cloudgooglecom/docs/security/encryption/default-encryption/) et les diffuse via HTTPS à l'aide de chiffrements modernes. De même, la publication d'une mise à jour depuis l'ordinateur d'un développeur utilise toujours HTTPS

![Capgo obtient un A+ au test HTTPS de SSL Labs](/ssllabs_reportwebp)

La sécurité par défaut de Capgo obtient un A+ au test HTTPS de SSL Labs (https://wwwssllabscom, novembre 2022)

Comme les meilleurs hébergeurs Web de leur catégorie, Capgo utilise HTTPS pour protéger la confidentialité et l'intégrité des connexions réseau entre le serveur et les appareils des utilisateurs finaux. Il s'agit d'un excellent niveau de sécurité qui fonctionne bien à la fois pour le Web et les applications Ionic qui utilisent Capgo.

## La chaîne d'approvisionnement de l'infrastructure cloud

Une autre chose que Capgo et la plupart des hébergeurs Web ont en commun est qu'ils fonctionnent sur une infrastructure cloud de niveau inférieur, souvent provenant d'AWS, de GCP ou d'un autre fournisseur de cloud populaire. Le matériel et les logiciels exploités par ces fournisseurs de cloud et Capgo ou d'autres hébergeurs Web font partie du chaîne d'approvisionnement en nuage

La chaîne d'approvisionnement du cloud et son modèle de sécurité fonctionnent pour un grand nombre de sites Web et d'applications. Chaque développeur Web qui utilise un fournisseur de cloud fait confiance à ce fournisseur et s'attend à ce que les fichiers qu'il télécharge soient ceux qui sont exécutés ou servis sans être falsifiés. les fournisseurs de cloud travaillent dur pour assurer la sécurité de leur infrastructure

Mais évidemment, les vulnérabilités matérielles et logicielles sont découvertes. Les fournisseurs de cloud corrigent les vulnérabilités en temps opportun et préviennent de manière proactive les logiciels malveillants (par exemple [SLSA de Google](https://securitygoogleblogcom/2021/06/introducing-slsa-end-to-end-frameworkhtml/ )), et construisons des couches de défense en profondeur, et dans la pratique, l'infrastructure cloud s'est avérée répondre aux besoins de sécurité de la plupart des sites Web et des applications. Cependant, certaines applications Ionic incluent une infrastructure cloud compromise dans leurs modèles de menace. Pour ces applications Capacitor JS avec la plus haute sécurité exigences au-dessus du Web, nous avons créé un code de bout en bout pour la connexion à Capgo et au [protocole standard Capgo Updates](/docs/self-hosted/auto-update/update-endpoint/)

## Signature de code de bout en bout avec Capgo

La signature de code de bout en bout de Capgo utilise la cryptographie à clé publique pour garantir que les appareils des utilisateurs finaux exécutent uniquement les mises à jour originales non modifiées du développeur de l'application Capacitor.

« De bout en bout » signifie que cette sécurité couvre le flux depuis le moment où un développeur publie une mise à jour jusqu'au moment où l'appareil d'un utilisateur final reçoit et exécute la mise à jour. La « signature de code » utilise la cryptographie et une clé privée secrète pour « signer » le code. , puis en utilisant une clé publique de confiance pour vérifier la signature

Voici un schéma simple* pour expliquer son fonctionnement :

![Schéma de chiffrement Capgo](/encryption_flowwebp)

* Complexe en pratique, la cryptographie est difficile

*Définition*:
- AES : Advanced Encryption Standard, un algorithme de chiffrement symétrique, une clé pour le chiffrement et le déchiffrement
- RSA : Rivest–Shamir–Adleman, un algorithme de chiffrement asymétrique, deux clés sont utilisées : une clé publique et une clé privée
- Cypher : Les données cryptées
- Clé de session : une clé AES utilisée pour crypter et déchiffrer les données
- Somme de contrôle : un hachage calculé pour un fichier
- Signature : une somme de contrôle chiffrée avec une clé RSA privée. Elle peut être vérifiée avec une clé RSA publique. 

Nous utilisons l'algorithme AES pour crypter la mise à jour. Une clé AES aléatoire est générée pour chaque téléchargement, puis la clé AES et la somme de contrôle (ci-après « signature ») sont cryptées avec la clé RSA privée du développeur. La clé RSA publique du développeur est utilisée dans le application pour déchiffrer la clé AES et la signature (en la reconvertissant en somme de contrôle)Plus tard, la clé AES déchiffrée est utilisée pour déchiffrer la mise à jour ; une somme de contrôle de la mise à jour déchiffrée est calculée et comparée à la signature déchiffrée

Nous utilisons deux algorithmes de chiffrement différents car RSA ne peut pas être utilisé pour chiffrer de grandes quantités de données. AES est utilisé pour chiffrer la mise à jour et RSA est utilisé pour chiffrer la clé AES et la somme de contrôle.

Avec cela, même Capgo ne peut pas lire le contenu de votre offre groupée. Il s'agit d'un modèle de sécurité robuste utilisé par de nombreuses entreprises clientes.

**Mise à jour du cryptage V2 2024-08-27 :**
- Nous avons changé le type de clé stockée dans l'application. Cela a été fait afin d'éviter de déduire la clé publique (précédemment utilisée pour le cryptage) de la clé privée (précédemment utilisée pour le déchiffrement). Désormais, l'application stocke la clé publique (maintenant utilisée). pour le décryptage)
- Nous avons basculé la somme de contrôle de l'algorithme CRC32 vers l'algorithme SHA256. Nous avons également commencé [la signature du bundle](https://enwikipediaorg/wiki/RSA_(cryptosystem)#Signing_messages) Lorsque le cryptage V2 est configuré, une mise à jour doit avoir une signature valide Ceci est strictement appliqué par le plugin
- Nous appliquons désormais un cryptage de signature valide V2 configuré
Ces 3 changements ont été effectués après une analyse de sécurité par un membre de la communauté. Ils sont là pour prévenir les attaques cryptographiques lors de la mise à jour.

Si vous avez utilisé le chiffrement V1, migrez vers la V2 pour bénéficier des nouvelles fonctionnalités de sécurité. Suivez les [instructions de migration](/docs/cli/migrations/encryption/)

Avec la signature de code de bout en bout, Capgo devient une infrastructure cloud « sans confiance ». Si l'un des fournisseurs de cloud de Capgo ou même Capgo lui-même modifiait une mise à jour signée par code, les appareils des utilisateurs finaux rejetteraient cette mise à jour et exécuteraient la précédente mise à jour fiable. mise à jour déjà présente sur l'appareil

Bien que HTTPS au niveau du Web soit suffisant pour de nombreuses applications, certaines grandes entreprises trouvent attrayant le niveau de sécurité supplémentaire offert par la signature de code de bout en bout. Certaines de ces entreprises créent des applications financières qui émettent des transactions permanentes de grande valeur. D'autres entreprises ont des RSSI qui incluent infrastructure cloud compromise dans leurs modèles de menace. Nous avons créé un code de connexion de bout en bout à Capgo pour ces cas d'utilisation et souhaitons en savoir plus sur les entreprises ayant des besoins de sécurité de niveau supérieur.

## Premiers pas pour les entreprises clientes

Pour les grandes entreprises ou les projets profondément soucieux de la sécurité, nous souhaitons rendre la signature de code facile à configurer et à maintenir. À cette fin, nous proposons désormais les fonctionnalités suivantes :

- Installation et configuration rapides du certificat
- Prise en charge des serveurs de développement de signature de code avec Capgo et les versions de développement
- Signature du code de production à chaque mise à jour

La signature de code Capgo est disponible pour tous les clients. Pour commencer, suivez les [instructions de configuration](/docs/cli/commands/#end-to-end-encryption-trustless)

## Crédits

Merci beaucoup à [Ionic](https://ioniccom/), cet article est basé sur [cet article](https://ionicio/blog/introducing-the-ionic-end-to-end-testing-reference- exemple/) réécrit avec chat-gpt-3 et adapté