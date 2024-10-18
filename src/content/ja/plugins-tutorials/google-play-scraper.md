---
locale: ja
---

# @capgo/google-play-scraper パッケージ

## インストール

`@capgo/google-play-scraper` パッケージを使用するには、npm を介してインストールする必要があります：

```bash
npm install @capgo/google-play-scraper
```

## 使用例

こちらが、Google Play ストアからデータをスクレイピングするために `@capgo/google-play-scraper` パッケージを使用する方法の例です：

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

上記の例では、まず `@capgo/google-play-scraper` パッケージから `GooglePlayScraper` クラスをインポートします。

次に、`getAppDetails()` メソッドを使用して特定のアプリの詳細をスクレイピングできます。アプリ ID をパラメーターとして提供すると、アプリ名、開発者名、評価などのさまざまな詳細を含むオブジェクトが返されます。

同様に、`getAppReviews()` メソッドを使用してアプリレビューをスクレイピングできます。アプリ ID と、ソートや取得するレビューの数などの追加オプションを提供します。それにより、レビュー本文、評価、レビュアー名などの詳細を含むレビューの配列が返されます。

## 結論

`@capgo/google-play-scraper` パッケージは、Google Play ストアからデータをスクレイピングする便利な方法を提供します。アプリの詳細、レビュー、その他を取得するために使用できます。このパッケージを使用することで、あなたのアプリケーションや興味のある他のアプリのために、Play ストアから情報を簡単に集めることができます。