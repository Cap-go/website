---
locale: fr
---

Utilisation de @capgo/nativegeocoder pour le géocodage

Le package `@capgo/nativegeocoder` est un plugin Capacitor qui fournit des fonctionnalités natives de géocodage direct et inverse. Le géocodage est le processus de conversion d'adresses en coordonnées géographiques (latitude et longitude) et vice versa.

Pour utiliser le package `@capgo/nativegeocoder`, suivez les étapes ci-dessous :

### Étape 1 : Installer le package

Installez le package à l'aide de npm :

```bash
npm install @capgo/nativegeocoder
```

### Étape 2 : Synchronisez votre projet

Exécutez la commande suivante pour synchroniser votre projet :

```bash
npx cap sync
```

### Étape 3 : Importer le plugin

Dans votre code, importez le `NativeGeocoder` depuis `@capgo/nativegeocoder` :

```javascript
import { NativeGeocoder } from '@capgo/nativegeocoder';
```

### Étape 4 : Implémenter la fonctionnalité de géocodage

Le plugin `@capgo/nativegeocoder` propose deux méthodes principales de géocodage :

#### Géocodage inversé

Le géocodage inversé est le processus de conversion de coordonnées géographiques (latitude et longitude) en adresse

```typescript
const reverseOptions = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const address = NativeGeocoder.reverseGeocode(reverseOptions);
console.log(address);
```

La méthode `reverseGeocode` prend un objet avec les propriétés de latitude et de longitude. Elle renvoie l'adresse en conséquence

#### Transférer le géocodage

Le géocodage direct est le processus de conversion d'une adresse en coordonnées géographiques (latitude et longitude)

```typescript
const forwardOptions = {
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
};

const coordinates = NativeGeocoder.forwardGeocode(forwardOptions);
console.log(coordinates);
```

La méthode `forwardGeocode` prend un objet avec la propriété address Elle renvoie les coordonnées en conséquence

### Conclusion

Le package `@capgo/nativegeocoder` fournit un moyen simple et efficace d'effectuer le géocodage dans votre projet Capacitor. En suivant les étapes décrites dans ce tutoriel, vous pouvez facilement intégrer la fonctionnalité de géocodage dans votre application.