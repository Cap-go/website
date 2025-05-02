---
slug: configuration-de-surveillance-des-performances-das-dans-capacitor
title: Configuration de la surveillance des performances dans Capacitor
description: >-
  Apprenez à configurer la surveillance des performances dans votre application
  en utilisant Firebase et Sentry pour améliorer l'efficacité et la satisfaction
  des utilisateurs.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-23T05:36:41.635Z
updated_at: 2025-03-23T05:37:33.934Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67df674387fa49042c75b4e1-1742708253934.jpg
head_image_alt: Développement mobile
keywords: >-
  Capacitor, performance monitoring, Firebase, Sentry, mobile app development,
  error tracking, monitoring tools
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
original_slug: configuracion-de-monitoreo-de-rendimiento-das-en-capacitor
---
**Vous souhaitez optimiser les performances de votre application [Capacitor](https://capacitorjs.com/) ?** Des outils de surveillance comme [Firebase](https://firebase.google.com/) et [Sentry](https://sentry.io/) peuvent vous aider à suivre les crashes, l'utilisation des ressources et les temps de réponse, garantissant une meilleure expérience utilisateur. Voici un aperçu rapide :

-   **Pourquoi surveiller les performances** : Identifier les crashes, optimiser l'utilisation des ressources et améliorer les temps de réponse.
-   **Outils à utiliser** :
    -   **Firebase** : Données de performance en temps réel, surveillance du réseau et suivi d'événements personnalisés.
    -   **Sentry** : Suivi détaillé des erreurs, analyse des traces d'appel et notifications en temps réel.
-   **Étapes de configuration** :
    -   Installer le SDK Firebase ou Sentry.
    -   Configurer votre application pour le suivi des métriques de performance ou des erreurs.
    -   Utiliser les tableaux de bord pour analyser et améliorer les performances de l'application.

**Comparaison rapide** :

| Fonctionnalité | Firebase | Sentry |
| --- | --- | --- |
| Surveillance en temps réel | Léger délai | Quasi instantané |
| Support natif | Android, iOS | Android, iOS, Web |
| Métriques personnalisées | Basique | Flexible |
| Complexité d'intégration | Workflows basés sur Google | Configuration SDK simple |

Pour les mises à jour en direct, intégrez des outils comme **[Capgo](https://capgo.app/)** pour déployer les correctifs instantanément sans délais de l'app store. Commencez la surveillance dès aujourd'hui pour améliorer l'efficacité et la satisfaction des utilisateurs de votre application.

## Optimisez la santé de l'application avec [Firebase](https://firebase.google.com/) Performance Monitoring ...

![Firebase](https://mars-images.imgix.net/seobot/screenshots/firebase.google.com-ab24bd47674782df651734052f495a0c-2025-03-23.jpg?auto=compress)

<Steps>

## Sélectionnez un outil de surveillance

Choisissez un outil de surveillance qui correspond aux exigences de votre application et à l'expertise de votre équipe. Voici un aperçu de Firebase Performance Monitoring et Sentry pour vous aider à décider.

### Comparaison des outils

| Fonctionnalité | Firebase Performance Monitoring | Sentry |
| --- | --- | --- |
| Modèle tarifaire | Niveau gratuit avec options payantes évolutives | Niveau gratuit avec plans de croissance abordables |
| Surveillance en temps réel | Aperçu des performances avec léger délai | Surveillance quasi instantanée |
| Support des plateformes natives | Android et iOS | Android, iOS et web |
| Complexité d'intégration | Fonctionne avec les services Google | Configuration SDK simple |
| Suivi d'événements personnalisés | Métriques personnalisées basiques | Suivi d'événements personnalisés flexible |
| Période de rétention | Limitée sur le niveau gratuit | Étendue sur tous les plans |

### Critères de sélection

Lors du choix entre ces outils, considérez les points suivants :

-   **Taille de l'application et trafic** : Pour les applications attendant une croissance rapide, Firebase est un choix solide. Sentry pourrait mieux convenir aux implémentations à plus petite échelle.
-   **Exigences techniques** : Firebase nécessite [Google Play Services](https://en.wikipedia.org/wiki/Google_Play_Services), ce qui le rend idéal pour les applications dans cet écosystème. Sentry fonctionne indépendamment, offrant plus de flexibilité entre les plateformes.
-   **Expérience de l'équipe** : Firebase s'aligne bien avec les équipes déjà familières avec les outils Google, tandis que la configuration SDK simple de Sentry est plus facile pour des cas d'utilisation plus larges.
-   **Contraintes budgétaires** : Les deux outils offrent des niveaux gratuits, mais comparez les coûts des fonctionnalités évolutives pour s'assurer qu'ils correspondent à votre budget.
-   **Objectifs d'intégration** : Firebase s'intègre parfaitement aux workflows basés sur Google, tandis que Sentry est particulièrement performant dans le suivi des erreurs.
-   **Exigences réglementaires** : Assurez-vous que l'outil est conforme aux normes comme le [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation), en particulier si votre application traite des données sensibles des utilisateurs.
-   **Fréquence des mises à jour** : Si les mises à jour fréquentes sont critiques, des outils comme Capgo peuvent accélérer les correctifs en direct, complétant votre configuration de surveillance.

## Guide de configuration Firebase

La configuration de Firebase Performance Monitoring dans votre [application Capacitor](https://capgo.app/plugins/ivs-player/) nécessite quelques étapes claires pour assurer un suivi précis des données.

### Installer le SDK Firebase

Commencez par ajouter le SDK Firebase à votre projet et le configurer pour votre(vos) plateforme(s) :

-   **Installer les dépendances Firebase**

Exécutez les commandes suivantes pour installer les packages Firebase nécessaires :

```bash
npm install @capacitor-firebase/performance
npm install firebase
```

-   **Initialiser Firebase**

Configurez Firebase dans votre fichier d'application principal :

```typescript
import { FirebasePerformance } from '@capacitor-firebase/performance';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Add your Firebase configuration object here
};

initializeApp(firebaseConfig);
await FirebasePerformance.initializePerformance();
```

-   **Ajouter les configurations de plateforme**

Mettez à jour votre fichier `capacitor.config.json` pour activer la surveillance des performances :

```json
{
  "plugins": {
    "FirebasePerformance": {
      "collectMetrics": true,
      "instrumentationEnabled": true,
      "dataCollectionEnabled": true
    }
  }
}
```

### Configurer le suivi des performances

Vous pouvez commencer à suivre des activités spécifiques de l'application comme les requêtes de base de données ou les requêtes réseau en utilisant Firebase Performance Monitoring.

-   **Suivre les requêtes de base de données**

```typescript
async function trackDatabaseQuery() {
  const trace = await FirebasePerformance.startTrace({ traceName: 'database_query' });

  // Perform your database operation
  await performDatabaseOperation();

  await FirebasePerformance.stopTrace({ traceName: 'database_query' });
}
```

-   **Surveiller les requêtes réseau**

```typescript
await FirebasePerformance.setAttributes({
  traceName: 'api_call',
  attributes: {
    endpoint: '/users',
    method: 'GET'
  }
});
```

-   **Suivre les métriques personnalisées**

Pour les métriques personnalisées, comme le suivi de la valeur d'un panier d'achat :

```typescript
await FirebasePerformance.putMetric({
  traceName: 'checkout_flow',
  metricName: 'cart_value',
  value: 99.99
});
```

Une fois ces traces implémentées, vous pouvez examiner les données collectées dans la Console Firebase.

### Utiliser la Console Firebase

Après avoir configuré la surveillance, vous pouvez visualiser et analyser les données de performance de votre application dans la Console Firebase :

1.  **Accéder aux données de performance**
    
    -   Connectez-vous à la Console Firebase.
    -   Sélectionnez votre projet.
    -   Naviguez vers **Performance Monitoring**.
    -   Choisissez votre application dans le menu déroulant.
2.  **Surveiller les métriques clés**
    

Le tableau de bord fournit des aperçus de divers indicateurs de performance, notamment :

-   Temps de démarrage de l'application
-   Taux de réussite des requêtes réseau
-   Temps de rendu des écrans
-   Résultats des traces personnalisées

3.  **Configurer des rapports personnalisés**

Créez des rapports sur mesure pour analyser des aspects spécifiques des performances de votre application, tels que :

-   Différences de performance par localisation
-   Métriques basées sur le type d'appareil
-   Effets des conditions réseau
-   Modèles dans les traces personnalisées

Utilisez ces outils pour identifier et résoudre efficacement les goulots d'étranglement de performance.

## Configuration du suivi des erreurs [Sentry](https://sentry.io/)

![Sentry](https://mars-images.imgix.net/seobot/screenshots/sentry.io-925fc70e12ac801815ba3ab27e6adcda-2025-03-23.jpg?auto=compress)

Firebase gère les métriques de performance, mais Sentry est tout au sujet de la capture et du diagnostic des erreurs. Ensemble, ils vous donnent une configuration de surveillance solide.

### Installer le SDK Sentry

Commencez par installer les packages Sentry requis :

```bash
npm install @sentry/capacitor
# Add the Sentry package for your specific framework
```

Une fois installé, configurez Sentry dans le point d'entrée de votre application.

### Initialiser Sentry

Configurez Sentry dans le point d'entrée de votre application en utilisant la configuration suivante :

```typescript
import * as Sentry from "@sentry/capacitor";
import { BrowserTracing } from "@sentry/browser";

Sentry.init({
    dsn: "your-project-dsn",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.2,
    environment: "production",
    release: "app-version@" + process.env.VERSION,
    dist: process.env.BUILD_NUMBER,
    debug: false
});
```

Cette configuration inclut le suivi des versions, qui lie les erreurs à des versions spécifiques de l'application.

### Configurer le suivi des erreurs

Vous pouvez personnaliser davantage le suivi des erreurs en utilisant des limites d'erreur personnalisées et des blocs try-catch.

**Limites d'erreur personnalisées :**

```typescript
class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
        Sentry.captureException(error, { extra: errorInfo });
    }
}
```

**Suivi d'erreurs spécifiques :**

```typescript
try {
    riskyOperation();
} catch (error) {
    Sentry.captureException(error, {
        tags: { operation: "data_sync", severity: "critical" },
        extra: { userId: currentUser.id, timestamp: new Date().toISOString() }
    });
}
```

**Surveillance des performances :**

```typescript
const transaction = Sentry.startTransaction({
    name: "API Request",
    op: "http.request"
});

try {
    await makeApiCall();
} finally {
    transaction.finish();
}
```

Ces méthodes garantissent que votre application enregistre efficacement les erreurs, les rendant plus faciles à suivre et à résoudre via Sentry.

### Utiliser le tableau de bord Sentry

Le tableau de bord Sentry fournit des outils pour approfondir les erreurs et mieux les comprendre :

-   **Surveillance en temps réel** : Vérifiez la fréquence des erreurs, l'état de résolution et les utilisateurs affectés.
-   **Analyse des erreurs** : Examinez les traces d'appel, regroupez les erreurs similaires et filtrez par environnement.
-   **Alertes** : Définissez des seuils d'erreur, configurez les options de notification et créez des règles d'alerte personnalisées.

Ce tableau de bord rend le diagnostic et la correction des problèmes simples.

## Meilleures pratiques de surveillance

### Se concentrer sur les métriques clés

L'analyse de Capgo sur 750 applications en production [\[1\]](https://capgo.app/) met en évidence les métriques clés à surveiller :

-   **Taux de réussite des mises à jour** : Visez au moins 82%.
-   **Vitesse de mise à jour** : Le CDN global devrait livrer 5 MB en 114 ms.
-   **Adoption par les utilisateurs** : 95% des utilisateurs devraient se mettre à jour dans les 24 heures.
-   **Temps de réponse de l'API** : Maintenez-le sous 500 ms (moyenne globale de 434 ms).

Configurez des alertes pour détecter rapidement toute déviation dans ces métriques.

### Créer des règles d'alerte efficaces

Voici un exemple de configuration d'alertes pour la surveillance des performances :

```typescript
// Example alert configuration
{
    performance: {
        apiLatency: {
            threshold: 1000, // ms
            period: "5m",
            condition: "above"
        },
        errorRate: {
            threshold: 1.0, // percentage
            period: "15m",
            condition: "above"
        },
        updateSuccess: {
            threshold: 75, // percentage
            period: "1h",
            condition: "below"
        }
    }
}
```

### Maintenir la surveillance et l'ajustement

Une fois vos alertes en place, concentrez-vous sur la surveillance continue et l'amélioration :

-   **Vérifications régulières des performances** : Examinez les taux de réussite des mises à jour par région, analysez les tendances d'erreurs pour différentes versions d'application et surveillez les temps de réponse de l'API pendant les heures de pointe.
    
-   **Déploiements progressifs pour les mises à jour** : Commencez avec 10% des utilisateurs pendant les premières 24 heures. Si tout fonctionne bien, augmentez à 50% et finalisez le déploiement après 48 heures de performance stable.
    
-   **Optimisation continue** : Enquêtez sur les mises à jour échouées, identifiez les points d'API lents et évaluez l'engagement des utilisateurs après les mises à jour pour assurer des améliorations durables.
    

## Mises à jour et surveillance [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-23.jpg?auto=compress)

### Fonctionnalités principales de Capgo

Le système de mise à jour en direct de Capgo, testé sur 750 applications en production, livre des bundles de 5MB en seulement 114ms [\[1\]](https://capgo.app/).

Les fonctionnalités clés incluent :

-   **Analytiques en temps réel** : Surveillez les taux de réussite des mises à jour, qui atteignent actuellement une moyenne de 82% dans le monde [\[1\]](https://capgo.app/).
-   **Déploiement instantané** : Déployez des correctifs critiques sans attendre les approbations de l'app store.
-   **Mises à jour partielles** : Téléchargez uniquement les composants modifiés, économisant bande passante et temps.
-   **Contrôle de version** : Annulez rapidement les mises à jour qui impactent négativement les performances.

Ce système s'intègre facilement avec les outils de surveillance existants, assurant un fonctionnement fluide.

> "Nous avons déployé les mises à jour OTA de Capgo en production pour notre base d'utilisateurs de +5000. Nous constatons un fonctionnement très fluide, presque tous nos utilisateurs sont à jour en quelques minutes après le déploiement de l'OTA sur @Capgo." - colenso [\[1\]](https://capgo.app/)

### Combiner les outils avec Capgo

Les analyses de Capgo permettent des déploiements progressifs, aidant les équipes à assurer la stabilité avant une version complète.

| Aspect de surveillance | Intégration Capgo | Outils supplémentaires |
| --- | --- | --- |
| Suivi des erreurs | Surveillance des erreurs intégrée | Associer à Sentry pour des traces détaillées |
| Métriques de performance | Suit les taux de réussite des mises à jour | Utiliser Firebase pour les données d'interaction utilisateur |
| Temps de réponse | Surveillance des réponses API | Améliorer avec des événements temporels Firebase personnalisés |

Pour configurer efficacement le système de canaux de Capgo :

-   Déployez d'abord les mises à jour auprès des testeurs bêta.
-   Utilisez les analyses de Capgo pour surveiller les métriques de performance.
-   Étendez progressivement le déploiement à l'ensemble des utilisateurs.

> "Nous pratiquons le développement agile et @Capgo est essentiel pour livrer en continu à nos utilisateurs !" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Avec 23,5M de mises à jour livrées mondialement, le tableau de bord en temps réel de Capgo fournit des aperçus clairs, permettant aux équipes de prendre des décisions éclairées sur les mises à jour et les améliorations de performance.

## Prochaines étapes

### Points principaux

Surveiller les métriques clés est crucial pour un monitoring efficace des performances. Utilisez des outils pour suivre ces indicateurs critiques :

| **Type de métrique** | **Domaines clés** | **Outils recommandés** |
| --- | --- | --- |
| Performance de l'app | Temps de réponse, plantages | Firebase Performance |
| Suivi des erreurs | Taux d'exceptions, traces d'exécution | Sentry |
| Analyses des mises à jour | Succès de distribution | Capgo Analytics |

Approfondissez ces métriques et outils à travers les ressources listées ci-dessous.

### En savoir plus

Les outils et pratiques de monitoring de performance évoluent constamment. Restez à jour en explorant ces guides et stratégies :

**Documentation officielle** :

-   Documentation Firebase Performance Monitoring
-   Guide d'intégration Sentry pour Capacitor
-   Guides officiels d'optimisation des performances de Capacitor

**Implémentation avancée** : Explorez le système d'analyse de Capgo, utilisé avec succès dans plus de 750 applications en production [\[1\]](https://capgo.app/). Leur documentation fournit des insights sur les modèles de surveillance et les stratégies de mise à jour en direct qui fonctionnent parfaitement avec d'autres outils de suivi des performances.
