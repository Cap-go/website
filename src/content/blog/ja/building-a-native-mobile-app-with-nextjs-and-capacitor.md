---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: 2024 Next.js 14とCapacitorでネイティブモバイルアプリを作成する：ステップバイステップガイド
description: >-
  Next.js
  14とCapacitorを使用してネイティブモバイルアプリを作成する方法を、この包括的なガイドで学びましょう。機能豊富で高性能なモバイルアプリケーションを構築するための最新のベストプラクティスとテクニックを探求します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14とCapacitorのイラストレーション
keywords: >-
  Next.js 14, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
# はじめに

このチュートリアルでは、2024年における[Next.js](https://nextjs.org/) 14と[Capacitor](https://capacitorjs.com/)の強力な組み合わせを使用してネイティブモバイルアプリを作成する方法を探ります。これらの最新テクノロジーを活用することで、高性能で機能豊富なモバイルアプリケーションを簡単に構築できます。また、[Konsta UI](https://konstaui.com/)とTailwind CSSを使用してモバイルUIを強化する方法も紹介しますが、この手順はオプションです。

人気のReactフレームワークであるNext.jsはWebアプリケーション構築のための堅実な基盤を提供し、Capacitorを使用することで、大きな変更やReact Nativeのような新しいスキルを学ぶ必要なく、Next.jsアプリをネイティブモバイルアプリに変換できます。このチュートリアルでは、新しいNext.jsアプリのセットアップから始めて、Capacitorを統合してネイティブモバイル体験を作成するまでのプロセスをガイドします。

### Next.jsとCapacitorを使用する利点

- **コードの再利用性**: Next.jsを使用すると、再利用可能なコンポーネントを作成し、Webアプリとモバイルアプリでコードを共有できるため、開発時間と労力を節約できます。
- **パフォーマンス**: Next.jsは、サーバーサイドレンダリングやコード分割などの組み込みのパフォーマンス最適化を提供し、高速な読み込み時間とスムーズなユーザー体験を確保します。
- **ネイティブ機能**: Capacitorは、カメラや位置情報などのネイティブデバイス機能へのアクセスを提供し、機能豊富なモバイルアプリを構築できます。
- **簡素化された開発**: Capacitorを使用すると、馴染みのあるWeb技術を使用してモバイルアプリを開発およびテストできるため、学習曲線が減少し、開発プロセスが効率化されます。

## Next.jsアプリの準備

まず、`create-next-app`コマンドを使用して新しいNext.jsアプリケーションを作成しましょう：

次に、プロジェクトディレクトリに移動します：

ネイティブモバイルアプリを作成するには、Next.jsプロジェクトの静的エクスポートを生成する必要があります。`package.json`ファイルを更新して、プロジェクトのビルドとエクスポート用のスクリプトを含めます：

`npm run static`コマンドを実行すると、画像最適化の非互換性によりエラーが発生する可能性があります。これを解決するには、`next.config.js`ファイルを開いて以下のように修正します：

これで、`npm run static`を実行すると問題なく動作し、プロジェクトのルートに新しい`out`フォルダが作成されます。このフォルダは次のステップでCapacitorによって使用されます。

## Next.js 14アプリへのCapacitorの追加

Next.jsアプリをネイティブモバイルコンテナにパッケージ化するには、以下の手順に従います：

1. 開発依存関係として[Capacitor CLI](https://capacitorjs.com/docs/cli/)をインストールします：

2. Next.jsプロジェクトでCapacitorを初期化します：

初期化プロセス中、アプリ名とバンドルIDのデフォルト値を受け入れるためにEnterを押すことができます。

3. 必要なCapacitorパッケージをインストールします：

4. ネイティブプラットフォームを追加します：

Capacitorはプロジェクトのルートに各プラットフォーム（`ios`と`android`）のフォルダを作成します。これらのフォルダにはそれぞれiOSとAndroidのネイティブプロジェクトが含まれています。

Androidプロジェクトにアクセスしてビルドするには、[Android Studio](https://developer.android.com/studio)がインストールされている必要があります。iOS開発には、[Xcode](https://developer.apple.com/xcode/)がインストールされたMacが必要です。

5. Capacitorを設定します：

`capacitor.config.ts`ファイルを開き、`webDir`プロパティをNext.jsビルドの出力ディレクトリを指すように更新します：

6. プロジェクトをビルドして同期します：

`npm run static`コマンドはNext.jsプロジェクトをビルドして静的ファイルをエクスポートし、`npx cap sync`はWebコードをネイティブプラットフォームと同期します。

## ネイティブアプリのビルドとデプロイ

ネイティブモバイルアプリをビルドしてデプロイするには、以下の手順に従います：
iOSアプリを開発するには**Xcode**が、Androidアプリを開発するには**Android Studio**がインストールされている必要があります。さらに、アプリをアプリストアで配布する予定がある場合は、iOSの場合はApple Developer Program、Androidの場合はGoogle Play Consoleに登録する必要があります。

1. ネイティブプロジェクトを開きます：

iOSの場合：

Androidの場合：

2. アプリをビルドして実行します：

![android-studio-run](/android-studio-run.webp)

- Android Studioでは、プロジェクトの準備が整うのを待ってから、「実行」ボタンをクリックして接続されているデバイスまたはエミュレータにアプリをデプロイします。
![xcode-run](/xcode-run.webp)

- Xcodeでは、実際のデバイスにアプリをデプロイするために署名アカウントを設定します。これを初めて行う場合、Xcodeがプロセスをガイドします（Apple Developer Programに登録している必要があることに注意してください）。設定が完了したら、「再生」ボタンをクリックして接続されているデバイスでアプリを実行します。

おめでとうございます！Next.jsウェブアプリをモバイルデバイスに正常にデプロイしました。

<Note>
  <p>開発中はもっと速い方法もあります...</p>
</Note>

## Capacitorライブリロード

開発中は、ライブリロードを活用して変更をモバイルデバイスで即座に確認できます。この機能を有効にするには、以下の手順に従います：

1. ローカルIPアドレスを見つけます：

- macOSでは、ターミナルで以下のコマンドを実行します：

- Windowsでは、以下を実行します：
  出力からIPv4アドレスを探します。

2. サーバー設定を含むように`capacitor.config.ts`ファイルを更新します：

`YOUR_IP_ADDRESS`をあなたのローカルIPアドレスに置き換えてください。

3. 変更をネイティブプロジェクトに適用します：

`copy`コマンドは、プロジェクト全体を更新せずにウェブフォルダと設定の変更をネイティブプロジェクトにコピーします。

4. Android StudioまたはXcodeを使用してデバイスでアプリを再ビルドして実行します。

これで、Next.jsアプリに変更を加えるたびに、モバイルアプリが自動的にリロードされてその変更が反映されます。

注意：新しいプラグインをインストールしたりネイティブファイルに変更を加えたりする場合は、ライブリロードはWebコードの変更にのみ適用されるため、ネイティブプロジェクトを再ビルドする必要があります。

## Capacitorプラグインの使用

Capacitorプラグインを使用すると、Next.jsアプリからネイティブデバイスの機能にアクセスできます。例として[Shareプラグイン](https://capacitorjs.com/docs/apis/share/)の使用方法を見てみましょう：

1. Shareプラグインをインストールします：

2. Shareプラグインを使用するように`pages/index.js`ファイルを更新します：

3. 変更をネイティブプロジェクトと同期します：

前述したように、新しいプラグインをインストールする場合は、同期操作を実行してからアプリをデバイスに再デプロイする必要があります。これを行うには、以下のコマンドを実行します：

4. デバイスでアプリを再ビルドして実行します。

これで、「Share now!」ボタンをクリックすると、ネイティブの共有ダイアログが表示され、他のアプリとコンテンツを共有できるようになります。

<Note>
  <p>ボタンをよりモバイルフレンドリーに見せるために、私のお気に入りのUIコンポーネントライブラリであるNext.js（意図的な言葉遊びではありません）を使用してスタイリングを追加できます。</p>
</Note>

## Konsta UIの追加

私は何年もの間、素晴らしいクロスプラットフォームアプリケーションを構築するために[Ionic](https://ionicframework.com/)を使用してきました。
しかし、現在では[tailwindcss](https://tailwindcss.com/)が既にある場合、Next.jsとの統合が非常にハッキーで価値がないため、もはや推奨していません。

iOSとAndroid固有のスタイリングに適応する本当に素晴らしい見た目のモバイルUIが必要な場合は、Kosta UIをお勧めします。

[tailwindがすでにインストールされている](https://tailwindcss.com/docs/guides/nextjs/)必要があります。
Next.jsアプリのモバイルUIを強化するために、iOSとAndroidのスタイリングに適応するモバイルフレンドリーなUIコンポーネントライブラリである[Konsta UI](https://konstaui.com/)を使用できます。Konsta UIを統合するには、以下の手順に従います：

1. 必要なパッケージをインストールします：

2. `tailwind.config.js`ファイルを更新します：

3. `pages/_app.js`でKonsta UIの`App`コンポーネントでアプリをラップします：

### 例ページ

すべてのセットアップが完了したら、Next.jsページでKonsta UI Reactコンポーネントを使用できます。

4. Konsta UIコンポーネントを使用するように`pages/index.js`ファイルを更新します：

5. 開発サーバーを再起動してアプリを再ビルドします。

これで、Next.jsアプリはKonsta UIを使用したネイティブな見た目のモバイルUIを持つようになりました。

## パフォーマンス最適化

Next.jsとCapacitorアプリの最適なパフォーマンスを確保するために、以下のベストプラクティスを考慮してください：

- 未使用の依存関係とアセットを削除してアプリサイズを最小化する。
- 画像やその他のメディアファイルを最適化して読み込み時間を短縮する。
- コンポーネントとページの遅延読み込みを実装して初期読み込みのパフォーマンスを向上させる。
- Next.jsのサーバーサイドレンダリング（SSR）を使用してアプリの読み込み速度と検索エンジン最適化（SEO）を向上させる。
- Webビューのキャッシュとアプリのバンドルなど、Capacitorの組み込みの最適化を活用する。

## 結論

このチュートリアルでは、Next.jsとCapacitorを使用してネイティブモバイルアプリを構築する方法を探りました。これらのテクノロジーのパワーを活用することで、高性能で機能豊富なモバイルアプリケーションを簡単に作成できます。

Next.jsアプリのセットアップ、Capacitorの統合、モバイルデバイスへのアプリのビルドとデプロイの手順について説明しました。さらに、Capacitorプラグインの使用、Konsta UIを使用したモバイルUIの強化、パフォーマンス最適化技術についても説明しました。

Next.jsとCapacitorアプリをさらに発展させるには、[Capgo](https://capgo.app/)を検討して、シームレスなライブアップデートを実現し、ユーザーが常に最新の機能とバグ修正にアクセスできるようにすることをお勧めします。

このガイドで説明したベストプラクティスと技術に従うことで、Next.jsとCapacitorを使用して素晴らしいネイティブモバイルアプリを構築する準備が整います。

## リソース

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Capacitor ドキュメント](https://capacitorjs.com/docs)
- [Konsta UI ドキュメント](https://konstaui.com/docs)
- [Capgo - Capacitorアプリのライブアップデート](https://capgo.app/)

アプリ開発を楽しんでください！

Capgoがより良いアプリをより速く構築するのにどのように役立つか学びましょう。今すぐ[無料アカウントにサインアップ](/register/)してください。
