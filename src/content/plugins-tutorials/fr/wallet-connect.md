---
locale: fr
---

Chanter le paquet @capgo/walletconnect

Le paquet `@capgo/walletconnect` fournit des fonctionnalités pour intégrer WalletConnect dans votre application Ionic Capacitor. WalletConnect est un protocole ouvert qui permet aux applications décentralisées (dApps) de se connecter avec des portefeuilles mobiles en utilisant des QR codes chiffrés.

Pour commencer à utiliser le paquet `@capgo/walletconnect` dans votre application, suivez les étapes ci-dessous :

## Étape 1 : Installer le Paquet

[[BLOC_DE_CODE]]

## Étape 2 : Importer le Paquet

Dans votre fichier TypeScript où vous souhaitez utiliser la fonctionnalité `WalletConnect`, importez le paquet :

[[BLOC_DE_CODE]]

## Étape 3 : Créer une Session WalletConnect

Pour créer une session WalletConnect, utilisez la méthode `WalletConnectcreateSession()`. Cela ouvrira un scanner de QR code où l'utilisateur pourra scanner le QR code fourni par la dApp.

[[BLOC_DE_CODE]]

## Étape 4 : Écouter les Événements de Session

Pour écouter les événements liés à la session WalletConnect, utilisez la méthode `WalletConnectaddListener()`. Les noms des événements auxquels vous pouvez écouter sont :

- `sessionRequest`: Déclenché lorsqu'une demande de session est reçue du portefeuille mobile.
- `sessionApproved`: Déclenché lorsque la demande de session est approuvée par l'utilisateur.
- `sessionConnected`: Déclenché lorsque la session est connectée avec succès.
- `sessionDisconnected`: Déclenché lorsque la session est déconnectée.

[[BLOC_DE_CODE]]

## Étape 5 : Approuver une Demande de Session

Lorsqu'une demande de session est reçue, vous pouvez l'approuver en appelant la méthode `WalletConnectapproveSession()`.

[[BLOC_DE_CODE]]

## Étape 6 : Obtenir la Session

Pour obtenir l'objet de session actuel, utilisez la méthode `WalletConnectgetSession()`.

[[BLOC_DE_CODE]]

## Étape 7 : Déconnecter la Session

Pour déconnecter la session actuelle, utilisez la méthode `WalletConnectdisconnectSession()`.

[[BLOC_DE_CODE]]

C'est tout ! Vous avez maintenant intégré avec succès le paquet `@capgo/walletconnect` dans votre application Ionic Capacitor et pouvez utiliser les fonctionnalités de WalletConnect.

Remarque : Les étapes ci-dessus fournissent un aperçu de base de l'utilisation du paquet `@capgo/walletconnect`. Pour des fonctionnalités et des options plus détaillées, référez-vous à la documentation du paquet. Malheureusement, je n'ai pas les informations nécessaires pour générer un tutoriel sur l'utilisation du paquet `@capgo/ngx-intl-tel-input-app`.