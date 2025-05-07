---
slug: capacitor-comprehensive-guide
title: 'Capacitor: 総合ガイド'
description: >-
  CapacitorJSは、Web開発者が単一の標準WebコードベースでネイティブのiOS、Android、デスクトップ、プログレッシブWebアプリを構築できる強力なツールです。この包括的なガイドでCapacitorについて知っておくべきことをすべて学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-10T00:00:00.000Z
updated_at: 2023-06-10T00:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: Capacitorガイドイラスト
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Guides
published: true
locale: ja
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) は、開発者が単一の標準的なWebコードベースを使用して、ネイティブのiOS、Android、デスクトップ、およびプログレッシブWebアプリを作成できる多目的ツールです。Ionicチームによって開発されたCapacitorは、開発者がモバイルプラットフォームでのWeb技術の可能性を認識するにつれて、近年大きな注目を集めています。この包括的なガイドでは、Capacitorに関する一般的な質問に答え、その機能、ユースケース、利点について探ります。

## Capacitorとは？

Capacitorは、Web開発者が最新のブラウザで動作する標準的なWeb技術を使用してクロスプラットフォームアプリを構築できる、無料のオープンソース（MITライセンス）プラットフォームです。ネイティブプラットフォームSDK（iOSとAndroid）、コマンドラインツール、プラグインAPI、既製のプラグインで構成されています。Capacitorを使用すると、既存のWebアプリケーションを各プラットフォームでネイティブアプリとして実行でき、JavaScriptを介してネイティブプラットフォームへのフックを提供します。これらのフックは、アプリに直接組み込むことも、再利用と配布のためのスタンドアロンプラグインとして構築することもできます。

## Capacitorで何が作れますか？

Capacitorを使用すると、ネイティブまたは他のクロスプラットフォームツールキットで作成するものを実質的にすべて構築できます。Capacitorアプリはネイティブプラットフォームに完全にアクセスできるため、ほとんどのネイティブ機能を実装できます。ただし、ネイティブUIコントロールをWebアプリビュー階層に直接埋め込むことは課題があり、他の人が使用できる抽象化された技術としてはまだ利用できません。

## Capacitorは誰のためのものですか？

CapacitorはHTML、CSS、JavaScriptのバックグラウンドを持つWeb開発者を対象としています。Webまたはデスクトップアプリ（Electronまたはそれに類似したツールを使用）を構築する場合、Capacitorはモバイルに焦点を当てたクロスプラットフォームアプリを作成するためのソリューションです。

## チームがCapacitorを選ぶべき時はいつですか？

チームがWeb開発スキルと既存のWeb投資を活用してネイティブプラットフォームアプリをデプロイしたい場合、Capacitorを検討すべきです。Capacitorは、データ駆動型アプリ、コンシューマーアプリ、B2B/Eアプリ、エンタープライズアプリに最適です。特にエンタープライズアプリに適しており、Capacitorを開発したIonicは、専用のエンタープライズサポートと機能を提供しています。

## 既存のWebコードを再利用し、新しいコードをWebアプリと共有できますか？

はい！Capacitorは標準的なWebアプリをネイティブで実行するため、チームはWebとモバイル用の単一のコードベースを持つことができ、コンポーネント、ロジック、特定の機能など、Webアプリの一部を再利用できます。

## Capacitorの得意分野と制限は何ですか？

Capacitorは、標準的なWebアプリをネイティブモバイルアプリとして実行し、Webアプリをネイティブ機能で拡張することに優れています。Web開発に精通したチームや、重要なWeb投資を持つチームに最適です。CapacitorはWebGLをサポートしていますが、3D/2Dやグラフィックを多用するアプリには最適ではないかもしれません。Webアプリとネイティブレイヤー間の広範なコミュニケーションを必要とするアプリは、シリアル化によりCapacitorの通信ブリッジがオーバーヘッドを追加する可能性があります。ただし、必要な場合はCapacitorアプリで常にカスタムネイティブコードを実行できます。

## CapacitorでネイティブUIコントロールを混在させることはできますか？

はい、モーダルや親レベルのナビゲーションコンテナなど、Capacitor Web Viewの外部にネイティブUIコントロールを表示できます。Webビュー体験へのネイティブコントロールの埋め込みは可能ですが、他の人が使用できる技術としてはまだ利用できません。

## CapacitorとElectronはどう違いますか？

Capacitorは「モバイル向けのElectron」としてよく説明されます。これは、Electronのモバイル重視の対応物として機能するためです。ただし、Capacitorはより高レベルの抽象化であるため、デプロイメントプラットフォームとしてElectronをターゲットにすることができます。デスクトッププラットフォームのみをターゲットにする必要がある場合は、Electronで十分です。しかし、モバイル、Web、デスクトップ向けのクロスプラットフォームアプリを構築したい場合、CapacitorはElectronやその他のプラットフォームをサポートします。

## CapacitorとIonicはどう違いますか？

IonicはCapacitor、Ionic Framework、Stencil、Appflow、その他のアプリ開発重視の製品を作成する企業です。Capacitorは、アプリのネイティブ側とネイティブアプリとWeb View間の通信を処理するツールキットです。Web Viewアプリで使用されるフレームワークやテクノロジー（Ionic Frameworkを含む）に依存しません。Ionic Frameworkは、Webアプリがネイティブのように見え、感じられる強力なUIコンポーネントを提供するモバイルUIツールキットです。

## CapacitorでIonic Frameworkを使用する必要がありますか？

いいえ、CapacitorはTailwind、Material UI、Chakra、Quasar、Framework7、または独自のカスタムコンポーネントなど、他のUIやCSSフレームワークと一緒に使用できます。ただし、Webアプリでネイティブのような体験を作成するには、Ionic Frameworkは依然として優れたオプションです。

## IonicのCapacitorに関する戦略は何ですか？

IonicはCapacitorの採用を推進することを目指しています。これは、Appflow（モバイルCI/CDサービス）、Ionic Framework、およびエンタープライズソリューションの使用増加につながるためです。Capacitorの成長は意図的なものであり、Web開発者がモバイルアプリを構築するためのよりフロントエンドに依存しないスタックを提供するために作成されました。

## Capacitorを React、Next.js、または Remixで使用できますか？

はい、CapacitorはReact、Next.js、Remixとうまく連携します。ほとんどのReactライブラリやアドオンがCapacitorとシームレスに動作するため、開発者をReact Nativeよりも標準的なReact Web開発に近い状態に保ちます。

## CapacitorとReact Nativeはどう違いますか？

CapacitorとReact Nativeは、クロスプラットフォーム開発のためのツールとプラグインインフラストラクチャを提供する点で類似しています。ただし、React NativeはJSとReactを使用してプラットフォームネイティブUIコントロールを抽象化するWeb風のシステムを使用するのに対し、Capacitorは標準的なWebアプリ用のWeb Viewを提供します。また、Capacitorはネイティブ UIコントロールを管理してJSレイヤーと同期する必要がないため、React Nativeよりも複雑さが少ないです。

## CapacitorはReact Nativeより速いですか？

ワークロードによります。CapacitorはiOSとAndroidのJITエンジンにアクセスできるため、React Nativeよりも高速にJavaScriptを実行できます。ただし、React Nativeはネイティブ UIコントロールを使用するため、UIレンダリングにおいては「より速い」または「より高性能」と考えられる場合があります。一方、Capacitorアプリは主にWeb Viewで実行されます。

## CapacitorとFlutterはどう違いますか？

CapacitorとFlutterはどちらもクロスプラットフォーム開発のためのツールとプラグインインフラストラクチャを提供しますが、CapacitorはJavaScriptと標準的なWeb技術を使用し、FlutterはDartとカスタムUIおよびAPI環境を使用します。UI側では、CapacitorとFlutterの両方がカスタムレンダリングエンジンを使用し、Flutterはそのコンポーネントを描画し、Capacitorは主にWeb Viewで UIをレンダリングします。

## CapacitorをReact Nativeまたはネイティブアプリにモバイルマイクロフロントエンドとして埋め込むことはできますか？

はい、[Ionic Portals](https://ionic.io/portals/)を使用して、CapacitorをReact NativeまたはSwift/Kotlinで構築された従来のネイティブアプリにモバイルマイクロフロントエンドアプローチとして埋め込むことができます。

## Capacitorでの高性能アニメーションのオプションは何ですか？

Ionic Framework、Quasar、Framework7、またはKonsta UIから最適化された既製のコンポーネントを使用するか、Framer Motion、Lottie、またはCSSアニメーションを使用してカスタムアニメーションを構築できます。CSSアニメーションを使用する場合は、パフォーマンスのベストプラクティスに従うようにしてください。

## Capacitorにはいくつのプラグインがありますか？

Capacitorには26のコアプラグインと多数のコミュニティ作成プラグインがあります。コミュニティプラグインのリソースについては、[awesome-capacitor](https://github.com/riderx/awesome-capacitor/)、[capacitor-community](https://github.com/capacitor-community/)組織、および[Capawesome](https://github.com/capawesome-team/)をチェックしてください。

## Capacitor用のVS Code拡張機能はありますか？

はい、[Ionic VS Code Extension](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic)もCapacitor拡張機能として機能し、埋め込みプレビュー、デバイス実行、外部デバッグ、プロジェクト品質の静的解析、セキュリティ分析などの機能を提供します。

## エンタープライズ固有のサポートは利用できますか？

はい、Capgoは[エンタープライズサポートと機能](https://capgo.app/)をCapacitor向けに提供しており、専用サポート、ライブアップデートと認証用のネイティブプラグインなどが含まれます。

## Capacitorを始めるにはどうすればよいですか？

[Capacitorのドキュメント](https://capacitorjs.com/docs/)にアクセスし、アプリにCapacitorをインストールする手順に従ってください。Ionic Frameworkと Angular/React/Vueを使用した定型的なCapacitorアプリから始めたい場合は、[Ionic Frameworkサイト](https://ionicframework.com/)のGet Startedフローに従ってください。
