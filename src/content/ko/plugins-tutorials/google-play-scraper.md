---
locale: ko
---

@capgo/google-play-scraper 패키지 노래 부르기

## 설치

`@capgo/google-play-scraper` 패키지를 사용하려면 npm을 통해 설치해야 합니다.

```bash
npm install @capgo/google-play-scraper
```

## 사용 예

다음은 `@capgo/google-play-scraper` 패키지를 사용하여 Google Play 스토어에서 데이터를 스크랩하는 방법의 예입니다.

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

위의 예에서는 먼저 `@capgo/google-play-scraper` 패키지에서 `GooglePlayScraper` 클래스를 가져옵니다. 

그런 다음 'getAppDetails()' 메소드를 사용하여 특정 앱의 세부정보를 스크랩할 수 있습니다. 앱 ID를 매개변수로 제공하고 앱 이름, 개발자 이름, 평점 등과 같은 다양한 세부정보가 포함된 개체를 반환합니다.

마찬가지로 'getAppReviews()' 메소드를 사용하여 앱 리뷰를 스크랩할 수 있습니다. 앱 ID와 정렬 및 가져올 리뷰 수와 같은 추가 옵션을 제공합니다. 이는 리뷰 텍스트, 평점, 리뷰어 이름 등

## 결론

`@capgo/google-play-scraper` 패키지는 Google Play 스토어에서 데이터를 스크랩하는 편리한 방법을 제공합니다. 이를 사용하여 앱 세부정보, 리뷰 등을 가져올 수 있습니다. 이 패키지를 사용하면 Play 스토어에서 정보를 쉽게 수집할 수 있습니다. 귀하의 애플리케이션이나 기타 관심 있는 앱에 대해