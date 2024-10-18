---
locale: fr
---

Utilisation de @capgo/nativegeocoder pour la géocodage

Le paquet `@capgo/nativegeocoder` est un plugin Capacitor qui fournit des fonctionnalités de géocodage et de géocodage inverse. Le géocodage est le processus de conversion d'adresses en coordonnées géographiques (latitude et longitude) et vice versa.

Pour utiliser le paquet `@capgo/nativegeocoder`, suivez les étapes ci-dessous :

### Étape 1 : Installer le paquet

Installez le paquet en utilisant npm :

[[BLOC_DE_CODE]]

### Étape 2 : Synchroniser votre projet

Exécutez la commande suivante pour synchroniser votre projet :

[[BLOC_DE_CODE]]

### Étape 3 : Importer le plugin

Dans votre code, importez `NativeGeocoder` depuis `@capgo/nativegeocoder` :

[[BLOC_DE_CODE]]

### Étape 4 : Mettre en œuvre la fonctionnalité de géocodage

Le plugin `@capgo/nativegeocoder` fournit deux méthodes principales pour le géocodage :

#### Géocodage inverse

Le géocodage inverse est le processus de conversion de coordonnées géographiques (latitude et longitude) en une adresse.

[[BLOC_DE_CODE]]

La méthode `reverseGeocode` prend un objet avec les propriétés latitude et longitude. Elle retourne l'adresse comme résultat.

#### Géocodage direct

Le géocodage direct est le processus de conversion d'une adresse en coordonnées géographiques (latitude et longitude).

[[BLOC_DE_CODE]]

La méthode `forwardGeocode` prend un objet avec la propriété adresse. Elle retourne les coordonnées comme résultat.

### Conclusion

Le paquet `@capgo/nativegeocoder` fournit un moyen simple et efficace d'effectuer du géocodage dans votre projet Capacitor. En suivant les étapes décrites dans ce tutoriel, vous pouvez facilement intégrer la fonctionnalité de géocodage dans votre application.