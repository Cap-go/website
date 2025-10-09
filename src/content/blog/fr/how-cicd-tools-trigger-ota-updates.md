---
slug: wie-cicd-tools-ota-updates-auslösen
title: Les outils CI/CD déclenchent des mises à jour OTA
description: >-
  Découvrez comment les outils CI/CD améliorent les mises à jour OTA et
  garantissent des déploiements d'applications plus rapides, plus sûrs et plus
  fiables grâce à des processus automatisés.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-12T08:43:18.401Z
updated_at: 2025-10-09T00:13:34.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67abf1dcdd71129bfb8de766-1739349815106.jpg
head_image_alt: Développement Mobile
keywords: 'CI/CD, OTA updates, automation, app deployment, security, Capgo, Capacitor'
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
Les outils CI/CD rendent les mises à jour par liaison radio (OTA) plus rapides, plus sûres et plus fiables en automatisant le processus. Voici comment :

-   **Que sont les mises à jour OTA ?** Elles vous permettent de mettre à jour instantanément les ressources de l'application comme HTML, CSS et JavaScript via un CDN, en évitant les délais d'approbation des app stores.
-   **Comment la CI/CD aide :** Les outils d'automatisation comme [GitHub Actions](https://docs.github.com/actions) rationalisent les étapes clés comme les vérifications de build, la validation de sécurité et le déploiement, réduisant les erreurs de 72% et permettant des correctifs le jour même.
-   **Fonctionnalités clés :**
    -   **Sécurité :** Utilisez HTTPS, la signature de code et le chiffrement pour protéger les mises à jour.
    -   **Déploiements progressifs :** Déployez d'abord les mises à jour vers de petits groupes pour détecter rapidement les problèmes.
    -   **Options de restauration :** Rétablissez automatiquement les mises à jour si les taux d'erreur augmentent.
-   **Outils mis en avant :** [Capgo](https://capgo.app/) simplifie les mises à jour OTA avec des commandes CLI, l'intégration de webhooks et le suivi détaillé des métriques.

L'automatisation des mises à jour OTA assure une livraison plus rapide, moins d'erreurs et une meilleure stabilité des applications. Ci-dessous, vous trouverez des instructions étape par étape pour configurer les applications [Capacitor](https://capacitorjs.com/) avec des pipelines CI/CD.

## [Appflow](https://ionic.io/appflow/live-updates) Live Updates : Déployez des mises à jour instantanées directement auprès de vos utilisateurs

![Appflow](https://mars-images.imgix.net/seobot/screenshots/ionic.io-f18932d1af08bf70cb14b84540039486-2025-02-12.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/Twj-Bx6ZRw8" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Préparer [Capacitor](https://capacitorjs.com/) pour les mises à jour OTA

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-02-12.jpg?auto=compress)

La configuration de Capacitor pour les mises à jour [automatisées par liaison radio](https://capgo.app/blog/open-source-licecing/) (OTA) implique trois étapes clés : configurer l'installation, mettre en œuvre les mesures de sécurité et [intégrer un système de mise à jour](https://capgo.app/docs/plugin/cloud-mode/hybrid-update). Ce processus assure la compatibilité avec l'automatisation CI/CD tout en sécurisant votre application.

### Configuration des paramètres OTA dans capacitor.config.json

Commencez par mettre à jour le fichier `capacitor.config.json` avec les paramètres nécessaires :

```json
{
  "appId": "com.example.app",
  "appVersion": "2.3.1",
  "plugins": {
    "CapacitorUpdater": {
      "updateUrl": "https://api.example.com/ota",
      "checkFrequency": 3600,
      "channel": "production"
    }
  }
}
```

Définir une fréquence de vérification appropriée minimise les délais de mise à jour - les réduisant jusqu'à 47% [\[2\]](https://github.com/becem-gharbi/esp-ota-cicd).

### Mise en œuvre de la sécurité des mises à jour OTA 

La sécurisation du processus de mise à jour OTA est essentielle pour éviter les mises à jour non autorisées et protéger l'intégrité de votre application. Cela implique trois niveaux de protection :

| Niveau de sécurité | Implémentation | Objectif |
| --- | --- | --- |
| Sécurité HTTPS | Certificate Pinning | Bloque les attaques de l'homme du milieu |
| Signature de code | Signatures ed25519 | Confirme la validité de la mise à jour |
| Sécurité des paquets | Chiffrement AES-256-GCM | Protège le contenu de la mise à jour |

Pour appliquer ces fonctionnalités de sécurité, incluez ce qui suit dans votre configuration :

```json
{
  "security": {
    "publicKey": "-----BEGIN PUBLIC KEY-----...",
    "requireSignedUpdates": true,
    "validateChecksums": true
  }
}
```

### Configuration de [Capgo](https://capgo.app/) pour les mises à jour OTA

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-12.jpg?auto=compress)

Capgo simplifie le processus de mise à jour OTA. Commencez par installer le plugin requis :

```bash
npm install @capgo/capacitor-updater
```

Ensuite, ajoutez les paramètres spécifiques à Capgo dans votre fichier `capacitor.config.json` :

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "apiKey": "CAPGO_XXXX",
      "channel": "production",
      "debug": true
    }
  }
}
```

Capgo utilise le versionnement sémantique avec des identifiants de build comme `2025.02.12-a1b2c3d` pour un suivi précis des mises à jour. Cela facilite la gestion et le suivi du cycle de vie des mises à jour de votre application.

## Création de pipelines de mise à jour OTA

Une fois que vous avez configuré Capgo dans votre environnement Capacitor, l'étape suivante consiste à le lier aux outils CI/CD pour automatiser la livraison des mises à jour. Cela garantit que les mises à jour sont gérées de manière sécurisée et efficace tout en maintenant la stabilité de votre application.

### Configuration des webhooks pour les mises à jour automatiques

Les webhooks dans votre configuration CI/CD peuvent déclencher automatiquement des mises à jour lorsque des modifications de code surviennent. Par exemple, dans GitHub Actions, vous pouvez créer un fichier de workflow comme celui-ci :

```yaml
name: OTA Update Trigger
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger OTA Update
        run: |
          curl -X POST \
          -H "X-Capgo-Signature: sha256=${{ secrets.CAPGO_SECRET }}" \
          -H "Authorization: Bearer ${{ secrets.CAPGO_API_KEY }}" \
          https://api.capgo.app/deploy
```

Assurez-vous de stocker vos clés API et secrets en toute sécurité dans le [stockage chiffré](https://capgo.app/docs/cli/migrations/encryption/) de votre plateforme CI/CD pour protéger les données sensibles.

### Commandes de mise à jour CLI Capgo

La CLI Capgo offre des commandes clés pour rationaliser la gestion des mises à jour dans votre pipeline. Voici un exemple de workflow de déploiement typique :

| Étape | Commande | Objectif |
| --- | --- | --- |
| Build | `capgo deploy --channel production` | Télécharger les nouveaux artefacts de build |
| Test | `capgo promote build-123 --group beta` | [Publier les mises à jour vers un groupe test](https://capgo.app/blog/how-to-send-specific-version-to-users/) |
| Validation | `capgo metrics get --last-24h` | Vérifier les métriques de succès des mises à jour |
| Publication | `capgo promote build-123 --channel stable` | Déployer la mise à jour pour tous les utilisateurs |

### Méthodes de restauration des mises à jour

Avoir un mécanisme de restauration fiable est essentiel pour maintenir la stabilité de votre application. Votre système doit pouvoir détecter les problèmes et rétablir automatiquement les mises à jour. Par exemple, vous pouvez utiliser des points de contrôle de santé pour surveiller les taux d'erreur et déclencher des restaurations si nécessaire :

```bash
# Rollback script triggered by monitoring
if [ $(curl -s https://api.capgo.app/metrics/errors) -gt 5 ]; then
  capgo rollback v1.2 --channel production
  notify-team "Update rolled back due to high error rate"
fi
```

Cette approche a aidé [Gunnebo Safe Storage](https://www.gunnebosafestorage.com/) à réduire les temps d'arrêt de plusieurs heures à quelques minutes [\[6\]](https://mender.io/blog/mender-ota-updates-and-an-automated-ci-cd-pipeline-at-gunnebo-safe-storage).

Pour les mises à jour à haut risque, envisagez d'utiliser la fonction de déploiement progressif de Capgo. Elle vous permet de déployer d'abord les mises à jour vers des groupes d'utilisateurs plus petits, réduisant ainsi le risque de problèmes généralisés avant une publication complète.

## Méthodes de mise à jour OTA

### Mises à jour progressives et groupes d'utilisateurs

Les mises à jour progressives vous permettent de contrôler le déploiement des mises à jour, assurant une expérience fluide pour les utilisateurs. Par exemple, la commande _promote_ de Capgo (mentionnée précédemment) aide à gérer les groupes bêta. Les données d'entreprise montrant que près de la moitié des applications (49%) nécessitent des mises à jour mensuelles [\[4\]](https://capacitorjs.com/docs/guides/ci-cd), le déploiement progressif devient une stratégie clé pour maintenir la stabilité des applications tout en déployant progressivement les changements.

### Déclencheurs de mise à jour basés sur les métriques

[L'automatisation des mises à jour](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/) basée sur les métriques de performance peut faire gagner du temps et prévenir les problèmes. En configurant des webhooks de surveillance, vous pouvez suivre des métriques importantes et décider de continuer ou de suspendre une mise à jour :

| Type de métrique | Seuil | Action |
| --- | --- | --- |
| Taux de plantage | >2% | Suspendre le déploiement |
| Taux d'erreur | >0,5% | Alerter l'équipe |

Vous pouvez intégrer ces vérifications dans votre pipeline CI/CD pour une surveillance transparente. Voici un exemple :

```bash
if [ $(curl -s $MONITORING_API/crash-rate) -gt 2 ]; then
  capgo pause-rollout --channel production
  notify-team "Update paused: High crash rate detected"
fi
```

Ces métriques sont directement liées au système de suivi des performances, que nous explorerons dans la section suivante.

### Mises à jour rapides

Face à des problèmes de sécurité critiques ou des bugs majeurs, il est important d'avoir un moyen de déployer rapidement des mises à jour. Utilisez des canaux de déploiement accéléré spécifiquement conçus pour les urgences. Ces canaux doivent inclure des vérifications d'attestation des appareils et des options de restauration automatique pour minimiser les risques.

Pour les mises à jour urgentes, vous pouvez déployer en utilisant un canal dédié :

```bash
capgo deploy --critical --channel hotfix
```

Pour améliorer davantage la vitesse de livraison et respecter les normes de conformité, envisagez d'utiliser des canaux géographiques avec des règles CDN. Cela garantit que les mises à jour atteignent efficacement les utilisateurs, quelle que soit leur localisation.

## Suivi des performances des mises à jour

Une fois que vous avez mis en place les méthodes de livraison des mises à jour, il est temps de mesurer leur efficacité. Utilisez ces indicateurs clés de performance pour rester au top :

### Métriques de succès des mises à jour

Concentrez-vous sur trois domaines principaux : **l'achèvement du déploiement**, **le temps de vérification** et **l'adoption par les utilisateurs**. Pour les applications mobiles, les taux de réussite du déploiement se situent généralement entre 95% et 99% [\[1\]](https://embeddedartistry.com/blog/2024/01/15/exploring-serverless-ci-cd-for-embedded-devices/). La surveillance en temps réel via votre pipeline CI/CD peut vous aider à atteindre vos objectifs :

| Métrique | Objectif | Seuil critique |
| --- | --- | --- |
| Achèvement du déploiement | >98% | <95% |
| Verification Time | <45s | \>120s |
| Adoption utilisateur (24h) | >75% | <50% |

### Gestion des erreurs de mise à jour

Les systèmes automatisés peuvent suivre les statuts des mises à jour et répondre aux erreurs. Pour les problèmes majeurs, le système doit restaurer automatiquement les mises à jour si les contrôles de santé des appareils détectent des problèmes. Voici un exemple de ce à quoi cela pourrait ressembler en pratique :

```bash
if [ $DEVICE_SUCCESS_RATE -lt 85 ]; then
    trigger_rollback
fi
```

Ce type de configuration garantit que les défaillances critiques sont traitées rapidement, minimisant les perturbations pour les utilisateurs.

### Réduction de l'utilisation des données

Les mises à jour delta sont un excellent moyen de réduire l'utilisation des données, réduisant la taille des charges utiles de 70 à 90 % par rapport aux mises à jour complètes [\[4\]](https://capacitorjs.com/docs/guides/ci-cd). Ces optimisations peuvent être intégrées directement dans votre pipeline CI/CD avec des règles comme celles-ci :

-   **Mises à jour delta** : Créez des différences binaires pour n'inclure que les composants qui ont changé.
-   **Optimisation des ressources** : Convertissez les images dans des formats comme WebP ou AVIF pour réduire la taille des fichiers.
-   **Déploiements programmés hors pic** : Déployez les mises à jour pendant les périodes de moindre trafic réseau pour minimiser l'impact.

## Conclusion : Mises à jour OTA automatisées

Avec les mises à jour OTA automatisées intégrées aux pipelines CI/CD, les déploiements Capacitor peuvent passer de cycles hebdomadaires à des mises à jour horaires. [JFrog](https://jfrog.com/) souligne cette amélioration d'efficacité, notant un **taux de déploiement 85% plus rapide** pour les applications Capacitor [\[3\]](https://jfrog.com/blog/devops-and-cicd-for-iot/) et des **taux d'adoption de 95%** dans les réseaux stables [\[5\]](https://qbee.io/iot-ota/). Ces résultats proviennent de la suppression des étapes manuelles et de la simplification du processus de mise à jour.

Pour les équipes de développement, cette approche offre des avantages clairs. Parmi les utilisateurs [ESP-IDF](https://www.espressif.com/en/products/sdks/esp-idf), **73% des équipes** utilisent maintenant des vérifications CI pré-fusion [\[1\]](https://embeddedartistry.com/blog/2024/01/15/exploring-serverless-ci-cd-for-embedded-devices/)[\[2\]](https://github.com/becem-gharbi/esp-ota-cicd), conduisant à des versions de meilleure qualité avant la production. Ces efforts s'alignent avec la discussion précédente sur les stratégies de déploiement basées sur les données.

Les pipelines automatisés garantissent également que les mises à jour sont livrées de manière fiable en utilisant des formats compressés et des mises à jour différentielles. En combinant les tests automatisés, les déploiements progressifs et le suivi des performances, les équipes peuvent gérer les mises à jour des applications Capacitor avec efficacité et sécurité.
