---
slug: apple-privacy-rules-for-capacitor-apps
title: Regole sulla privacy di Apple per le app Capacitor
description: >-
  Apprenez à respecter les règles de confidentialité d'Apple pour le
  développement d'applications en mettant en œuvre le consentement des
  utilisateurs, la transparence des données et des mises à jour sécurisées.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-31T01:48:03.832Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf-1743385695606.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Apple privacy rules, Capacitor apps, data transparency, user consent, App
  Store compliance, privacy policy
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
**Les règles de confidentialité d'Apple exigent désormais que les développeurs d'applications [Capacitor](https://capacitorjs.com/) se concentrent sur la transparence des données utilisateur et la conformité pour garantir l'approbation de l'App Store et maintenir la confiance des utilisateurs.**

Les étapes clés comprennent :

-  **Manifeste de confidentialité** : Documenter la collecte de données, les API et les détails de suivi.
-  **Consentement de l'utilisateur** : Utiliser la transparence du suivi des applications (ATT) pour les autorisations de suivi.
-  **Accès aux données** : Définir clairement les autorisations pour des fonctionnalités comme la caméra, la localisation et les contacts.
-  **[Politique de confidentialité](https://capgo.app/dp/)** : Fournir une politique accessible et claire décrivant l'utilisation des données.
-  **Tests et mises à jour** : Tester rigoureusement la conformité et utiliser des systèmes de mise à jour sécurisés comme [Capgo](https://capgo.app/).

Ces règles soulignent le contrôle des utilisateurs, la transparence et les mises à jour sécurisées des applications. Les développeurs peuvent suivre le guide pour rester conformes et offrir des applications soucieuses de la vie privée.

## Prévenir le rejet de l'App Store : Ajoutez le Manifeste de confidentialité d'Apple ...

<iframe src="https://www.youtube.com/embed/D7R87wm9IJE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Règles de confidentialité d'Apple expliquées

Apple exige que les développeurs priorisent la clarté et donnent aux utilisateurs le contrôle sur leurs données. Si vous êtes un développeur Capacitor, cela signifie être transparent sur la manière dont votre application collecte et utilise des données, tant pour les utilisateurs que pour les examinateurs d'Apple.

### Documenter les pratiques de données

Conservez des dossiers internes détaillés sur la gestion des données de votre application. Assurez-vous d'inclure :

-  Types de données utilisateur collectées
-  Raisons de la collecte de ces données
-  Détails de tout service tiers ou SDK utilisé
-  Comment les données sont transférées ou partagées

Avoir ces informations organisées aide non seulement à respecter la conformité, mais facilite également la réponse aux questions lors du processus de révision. Assurez-vous de refléter ces pratiques de manière transparente dans vos étiquettes de confidentialité de l'App Store et dans les paramètres de votre application.

### Éléments clés de la divulgation de la confidentialité

Les informations de confidentialité de votre application doivent clairement décrire :

-  Les fonctionnalités système et les autorisations API requises pour le bon fonctionnement de l'application
-  Les catégories de données collectées
-  Toute activité de suivi ou communication avec des services externes
-  Comment les données sont utilisées et pourquoi

Être clair dans vos divulgations aide à établir la confiance avec les utilisateurs et réduit la probabilité de rencontrer des problèmes lors de la révision de l'App Store.

### Chronologie de la conformité

Apple met à jour ses exigences en matière de confidentialité par phases. Restez informé en vérifiant régulièrement les mises à jour pour les développeurs d'Apple afin de garantir que votre application reste conforme aux dernières règles.

## Ajouter des règles de confidentialité à votre application

Découvrez comment mettre en œuvre les règles de confidentialité d'Apple dans votre application Capacitor avec ce guide étape par étape.

### Exigences de configuration

Avant de commencer, assurez-vous des éléments suivants :

-  Vous disposez de **Xcode 15 ou version ultérieure** pour le support du manifeste de confidentialité.
-  Capacitor 6 ou 7 est installé.
-  La cible de déploiement iOS est définie sur **iOS 14.5 ou version ultérieure**.
-  Votre application inclut un fichier `Info.plist` correctement configuré.
-  Vous avez un **compte développeur Apple** avec des certificats valides.

Si vous utilisez Capgo, mettez en place un chiffrement de bout en bout pour protéger la confidentialité des données. Les applications configurées correctement avec Capgo ont atteint un taux de succès mondial de 82 % dans les mises à jour [\[1\]](https://capgo.app/).

Une fois votre environnement prêt, procédez à la création et à la configuration de votre manifeste de confidentialité.

### Guide de configuration du manifeste de confidentialité

1.  **Créer le fichier du manifeste de confidentialité**

Ajoutez un nouveau fichier nommé `PrivacyInfo.xcprivacy` au répertoire racine de votre projet iOS :

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": [],
    "NSPrivacyAccessedAPITypes": []
}
```

2.  **Définir la collecte de données**

Spécifiez les types de données que votre application collecte, tels que :

-  Analytique utilisateur
-  Informations sur l'appareil
-  Modèles d'utilisation
-  Accès au réseau

3.  **Configurer l'accès API**

Listez les API système requises par votre application, y compris :

-  Caméra
-  Localisation
-  Contacts
-  Bibliothèque photo

### Directives de conformité

Après avoir configuré le manifeste de confidentialité, assurez-vous que vos pratiques de collecte de données respectent les normes d'Apple.

**Minimisation des données**  
Collectez uniquement les données nécessaires aux fonctionnalités principales de votre application. Les utilisateurs de Capgo ont rapporté un taux de mise à jour actif de 95 % des utilisateurs dans les 24 heures [\[1\]](https://capgo.app/), prouvant que des approches respectueuses de la vie privée maintiennent l'engagement des utilisateurs.

**Transparence pour l'utilisateur**  
Expliquez clairement :

-  Pourquoi les données sont collectées
-  Combien de temps elles seront conservées
-  Options de contrôle disponibles pour l'utilisateur
-  Toute politique de partage de données

### Exigences de test

Avant la soumission, testez votre application pour garantir la conformité en matière de confidentialité. Concentrez-vous sur ces domaines :

| Zone de test | Points de vérification |
| --- | --- |
| Accès aux données | Vérifiez les invites de permission appropriées. |
| Étiquettes de confidentialité | Confirmez que les déclarations sont précises. |
| Contrôles utilisateur | Testez les fonctionnalités de désinscription. |
| [Stockage des données](https://capgo.app/plugins/capacitor-data-storage-sqlite/) | Vérifiez que le chiffrement est sécurisé. |

Capgo a livré avec succès 23,5 millions de mises à jour tout en maintenant la conformité à la confidentialité [\[1\]](https://capgo.app/), prouvant qu'il est possible de concilier mises à jour et respect de la vie privée.

Suivez ces directives pour vous assurer que votre application est prête pour les tests et la soumission à l'App Store.

## Contrôles de la vie privée des utilisateurs

Cette section se concentre sur la manière de donner aux utilisateurs le contrôle sur le suivi et l'accès aux données, en s'appuyant sur les directives de confidentialité établies.

### Configuration des autorisations de suivi

Pour configurer la transparence du suivi des applications (ATT) dans votre application Capacitor, incluez la clé suivante dans votre fichier `Info.plist` :

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use tracking to provide personalized features and improve app performance</string>
```

Ensuite, gérez la demande de suivi pendant l'initialisation de votre application :

```typescript
import { App } from '@capacitor/app';

async function requestTrackingPermission() {
  const status = await App.requestTrackingAuthorization();
  return status.authorized;
}
```

**Conseils pour la mise en œuvre de l'ATT** :

-  Montrez la boîte de dialogue de permission à un moment significatif de l'expérience utilisateur.
-  Expliquez clairement les avantages du suivi avant que l'invite système n'apparaisse.
-  Respectez les décisions des utilisateurs et proposez des alternatives à ceux qui déclinent.

### Autorisations d'accès aux données

Pour iOS, vous devez définir les autorisations dans le fichier `Info.plist` de votre application. Voici quelques autorisations courantes et leurs descriptions :

| Type d'autorisation | Clé Info.plist | Description de l'utilisation |
| --- | --- | --- |
| Caméra | NSCameraUsageDescription | Requis pour la capture de photos |
| Localisation | NSLocationWhenInUseUsageDescription | Pour les fonctionnalités basées sur la localisation |
| Photos | NSPhotoLibraryUsageDescription | Accès pour enregistrer/charger des images |
| Contacts | NSContactsUsageDescription | Pour l'intégration des contacts |

**Quand demander des autorisations** :

-  Demandez des autorisations uniquement lorsque cela est nécessaire et fournissez un contexte clair.
-  Expliquez brièvement pourquoi chaque autorisation est nécessaire avant de demander.
-  Si un utilisateur refuse une demande, proposez des fonctionnalités ou options alternatives.

Après avoir mis en place les autorisations, assurez-vous que les utilisateurs soient informés de ces pratiques grâce à une politique de confidentialité transparente.

### Affichage de la politique de confidentialité

Rendez la politique de confidentialité de votre application facile à trouver et à comprendre.

**Ce qu'il faut inclure** :

-  Détails sur la collecte de données
-  Comment les données seront utilisées
-  Durées de conservation des données stockées
-  Droits des utilisateurs concernant leurs données
-  Coordonnées pour les préoccupations liées à la vie privée

Vous pouvez ajouter un centre de confidentialité à votre application comme ceci :

```typescript
import { Browser } from '@capacitor/browser';

async function showPrivacyPolicy() {
  await Browser.open({
    url: 'https://your-app.com/privacy-policy'
  });
}
```

**Comment afficher la politique de confidentialité** :

-  Placez le lien de la politique de confidentialité dans les paramètres de l'application pour un accès facile.
-  Utilisez un langage simple et clair pour expliquer les concepts techniques.
-  Ajoutez des visuels pour améliorer la compréhension.
-  Fournissez un historique des versions et informez les utilisateurs des mises à jour.
-  Permettez aux utilisateurs d'exporter leurs données si demandé.

Assurez-vous que les mises à jour de votre application (par exemple, via Capgo) respectent ces paramètres de confidentialité et maintiennent la confiance des utilisateurs.

## Tests et soumission à l'App Store

Une fois que vous avez configuré votre manifeste de confidentialité et les contrôles utilisateur, l'étape suivante consiste à effectuer des tests approfondis pour garantir que tout fonctionne comme prévu. Ce processus aide à confirmer la conformité avant de soumettre votre application à l'App Store.

### Tests de confidentialité dans [Xcode](https://en.wikipedia.org/wiki/Xcode)

Pour commencer, activez le rapport de confidentialité dans Xcode :

```swift
// Enable Privacy Report in Xcode scheme
Edit Scheme > Run > Diagnostics > Enable Privacy Report
```

Exécutez votre application en mode débogage et consultez le rapport de confidentialité dans la console. Voici sur quoi se concentrer lors des tests :

| Zone de test | Ce qu'il faut vérifier |
| --- | --- |
| Suivi des applications | Timing et affichage de la boîte de dialogue ATT |
| Accès aux données | Mise en œuvre correcte des autorisations |
| Utilisation des API | Exhaustivité du manifeste de confidentialité |
| Appels réseau | Sécurité de la transmission des données |

Ces tests garantissent que votre application est prête pour la soumission et respecte les normes de conformité.

### Erreurs de confidentialité courantes

Après les tests, résolvez ces problèmes fréquents pour éviter des retards lors de la soumission :

-  **`privacy-manifest.json` incomplet** : Assurez-vous que toutes les API et tous les domaines de suivi requis sont listés.
-  **Champs de but manquants** : Expliquez clairement la raison de chaque demande d'autorisation.
-  **Demandes de suivi incorrectes** : Ne déclenchez les autorisations de suivi qu'après une action de l'utilisateur.

### Détails de la confidentialité de l'App Store

Lors de la soumission de votre application, fournissez des informations précises sur vos pratiques en matière de confidentialité. Voici ce qu'il faut inclure :

| Catégorie de confidentialité | Informations nécessaires | Exemples |
| --- | --- | --- |
| Collecte de données | Types de données collectées | ID d'appareil, localisation |
| Utilisation des données | Pourquoi les données sont collectées | Fonctionnalité de l'application, analytique |
| Lien des données | Comment les données sont reliées aux utilisateurs | Informations de compte, données d'utilisation |
| Suivi des données | Détails sur le suivi inter-applications | Publicité, analytique |

**Exigences clés de l'App Store** :

-  Mettez à jour l'URL de votre politique de confidentialité avant la soumission.
-  Assurez-vous que les autorisations déclarées correspondent aux fonctionnalités de votre application.
-  Documentez les pratiques de confidentialité pour tout SDK tiers utilisé.
-  Confirmez que toutes les transmissions réseau sont chiffrées pour la sécurité.

## Utilisation de [Capgo](https://capgo.app/) pour les mises à jour

![Capgo Live Update Dashboard Interface](https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf/f3ac818a2fec22e90998e19561d68a19.jpg)

Capgo propose un système sécurisé pour les mises à jour en direct tout en respectant les règles de confidentialité d'Apple.

### Fonctionnalités de confidentialité de Capgo

Le système de mise à jour de Capgo est conçu avec la sécurité et la vie privée à l'esprit :

| Fonctionnalité | Avantage en matière de confidentialité |
| --- | --- |
| Chiffrement de bout en bout | Assure que seuls les utilisateurs autorisés peuvent déchiffrer les mises à jour |
| Conformité à l'App Store | S'aligne sur les strictes exigences de confidentialité d'Apple |
| Déploiement sécurisé | Protège la distribution des mises à jour |
| Contrôle d'accès | Permet une gestion détaillée des autorisations |

Estas características protegen las actualizaciones y mantienen la privacidad del usuario.

> "La única solución con verdadera encriptación de extremo a extremo, los demás solo firman actualizaciones" - Capgo [\[1\]](https://capgo.app/)

### Implementación de Actualizaciones con Capgo

Así es como implementar actualizaciones que cumplan con la privacidad utilizando Capgo:

1.  **Instala el plugin de Capgo**:
    
    Ejecuta el siguiente comando para comenzar:
    
    ```bash
    npx @capgo/cli init
    ```
    
2.  **Configura tus ajustes de privacidad**:
    
    Actualiza tu manifiesto de privacidad para incluir los dominios y APIs de Capgo.
    
3.  **Configura canales de actualización encriptados**:
    
    Crea canales separados para diferentes etapas de implementación para asegurar actualizaciones seguras.
    

Capgo garantiza que el 95% de los usuarios activos reciban actualizaciones en un plazo de 24 horas, con una tasa de éxito global del 82% [\[1\]](https://capgo.app/). El sistema de canales también facilita la gestión del targeting de actualizaciones.

### Actualizaciones de Grupos de Usuarios en Capgo

Capgo te permite dirigir de forma segura grupos de usuarios específicos durante las actualizaciones:

| Tipo de Actualización | Consideraciones de Privacidad | Implementación |
| --- | --- | --- |
| Pruebas Beta | Limita la exposición a usuarios selectos | Utiliza un canal separado con acceso restringido |
| Despliegues por Etapas | Lanzamiento gradual a los usuarios | Distribuye actualizaciones según porcentajes |

> "Practicamos desarrollo ágil y @Capgo es crítico para entregar continuamente a nuestros usuarios!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Los permisos detallados de Capgo aseguran que solo los miembros autorizados del equipo puedan acceder y gestionar actualizaciones de forma segura.

## Resumen

### Requisitos Clave de Privacidad

Las reglas de privacidad de Apple para [aplicaciones de Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) describen las siguientes necesidades:

| Requisito | Detalles |
| --- | --- |
| **Manifiesto de Privacidad** | Incluir dominios, APIs y declaraciones de seguimiento necesarios. |
| **Consentimiento del Usuario** | Utilizar el marco ATT para solicitar permisos de seguimiento de los usuarios. |
| **Acceso a Datos** | Configurar permisos para acceder a fotos, ubicación y contactos. |
| **Política de Privacidad** | Proporcionar una política clara y accesible tanto en la aplicación como en la lista de la App Store. |
| **Seguridad de Actualizaciones** | Asegurarse de que las actualizaciones en vivo utilicen canales de despliegue encriptados. |

### Lista de Verificación de Implementación

Sigue esta lista de verificación para cumplir con los requisitos de Apple:

-   **Configurar el Manifiesto de Privacidad**  
    Agrega declaraciones de API, enumera dominios de seguimiento y documenta los propósitos del uso de datos.
    
-   **Configurar Permisos de Usuario**  
    Implementa el diálogo ATT, configura acceso para fotos y medios, y habilita servicios de ubicación.
    
-   **Sistema de Actualización Seguro**  
    Utiliza una solución de actualización que cumpla con la privacidad, configura canales encriptados y controla el targeting de usuarios.
    

La plataforma de Capgo proporciona una forma confiable de cumplir con estos estándares de privacidad mientras mantiene tu aplicación funcional y centrada en el usuario [\[1\]](https://capgo.app/).
