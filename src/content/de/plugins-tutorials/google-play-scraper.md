---
locale: de
---

sing @capgo/google-play-scraper Paket

## Installation

Um das `@capgo/google-play-scraper` Paket zu verwenden, müssen Sie es über npm installieren:

```bash
npm install @capgo/google-play-scraper
```

## Beispielverwendung

Hier ist ein Beispiel, wie Sie das `@capgo/google-play-scraper` Paket verwenden können, um Daten aus dem Google Play Store zu scrapen:

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

Im obigen Beispiel importieren wir zunächst die Klasse `GooglePlayScraper` aus dem `@capgo/google-play-scraper` Paket.

Dann können wir die Methode `getAppDetails()` verwenden, um die Details einer bestimmten App zu scrapen. Wir geben die App-ID als Parameter an und sie gibt ein Objekt mit verschiedenen Details wie dem App-Namen, dem Namen des Entwicklers, Bewertungen usw. zurück.

Ebenso können wir die Methode `getAppReviews()` verwenden, um App-Bewertungen zu scrapen. Wir geben die App-ID und zusätzliche Optionen wie Sortierung und die Anzahl der abzurufenden Bewertungen an. Sie gibt ein Array von Bewertungen mit Details wie dem Bewertungstext, der Bewertung, dem Namen des Bewerters usw. zurück.

## Fazit

Das `@capgo/google-play-scraper` Paket bietet eine bequeme Möglichkeit, Daten aus dem Google Play Store zu scrapen. Sie können es verwenden, um App-Details, Bewertungen und mehr abzurufen. Mit diesem Paket können Sie problemlos Informationen aus dem Play Store für Ihre Anwendung oder eine andere App von Interesse sammeln.