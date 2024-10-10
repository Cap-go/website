---
locale: fr
---

chanter @capgo/google-play-scraper

##Installation

Pour utiliser le package `@capgo/google-play-scraper`, vous devez l'installer via npm :

```bash
npm install @capgo/google-play-scraper
```

## Exemple d'utilisation

Voici un exemple de la façon dont vous pouvez utiliser le package `@capgo/google-play-scraper` pour récupérer des données du Google Play Store :

```typescript
import { GooglePlayScraper } from '@capgo/google-play-scraper';

// Scrape app details

async function scrapeAppDetails() {
  try {
    const appId = 'com.example.app';
    
    const appDetails = await GooglePlayScraper.getAppDetails(appId);
    
    console.log(appDetails);
  } catch (error) {
    console.error(error);
  }
}

scrapeAppDetails();

// Scrape app reviews

async function scrapeAppReviews() {
  try {
    const appId = 'com.example.app';
    
    const reviews = await GooglePlayScraper.getAppReviews(appId, { 
      sort: 'recent', 
      num: 10 
    });
    
    console.log(reviews);
  } catch (error) {
    console.error(error);
  }
}

scrapeAppReviews();
```

Dans l'exemple ci-dessus, nous importons d'abord la classe `GooglePlayScraper` du package `@capgo/google-play-scraper` 

Ensuite, nous pouvons utiliser la méthode `getAppDetails()` pour récupérer les détails d'une application spécifique. Nous fournissons l'ID de l'application en tant que paramètre et il renvoie un objet avec divers détails tels que le nom de l'application, le nom du développeur, les notes, etc.

De même, nous pouvons utiliser la méthode `getAppReviews()` pour récupérer les avis sur les applications. Nous fournissons l'ID de l'application et des options supplémentaires telles que le tri et le nombre d'avis à récupérer. Il renvoie un tableau d'avis avec des détails tels que le texte de l'avis, la note, nom du réviseur, etc.

## Conclusion

Le package `@capgo/google-play-scraper` fournit un moyen pratique d'extraire des données du Google Play Store. Vous pouvez l'utiliser pour récupérer des détails sur des applications, des avis, etc. Avec ce package, vous pouvez facilement collecter des informations sur le Play Store. pour votre candidature ou toute autre application d'intérêt