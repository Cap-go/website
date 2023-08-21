# Using @capgo/google-play-scraper Package

## Installation

To use the `@capgo/google-play-scraper` package, you need to install it via npm:

```bash
npm install @capgo/google-play-scraper
```

## Example Usage

Here is an example of how you can use the `@capgo/google-play-scraper` package to scrape data from the Google Play Store:

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

In the above example, we first import the `GooglePlayScraper` class from the `@capgo/google-play-scraper` package. 

Then, we can use the `getAppDetails()` method to scrape the details of a specific app. We provide the app ID as a parameter and it returns an object with various details such as the app name, developer name, ratings, etc.

Similarly, we can use the `getAppReviews()` method to scrape app reviews. We provide the app ID and additional options such as sorting and the number of reviews to fetch. It returns an array of reviews with details such as the review text, rating, reviewer name, etc.

## Conclusion

The `@capgo/google-play-scraper` package provides a convenient way to scrape data from the Google Play Store. You can use it to fetch app details, reviews, and more. With this package, you can easily gather information from the Play Store for your application or any other app of interest.