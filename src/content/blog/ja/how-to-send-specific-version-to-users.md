---
slug: come-inviare-una-versione-specifica-agli-utenti
title: 特定のユーザーまたはグループに更新を送信する方法
description: TestFlight や Google のベータプロセスを使用せずにベータ版を試すことができます。Ionic アプリにボタンを追加するだけで完了です！
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: TestFlight 代替案のイラスト
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: alternatives
published: true
locale: ja
next_blog: ''
---
## はじめに

Capgoのアップデートシステムを私のアプリのように楽しみ始めると、「もっと何かできないだろうか？」と感じ始めるでしょう。

私もそう感じましたが、Capgoの開発者として、中身を確認することができました！

> すべてがオープンソースなので、あなたにもその力があります :)

Capacitorアプリの配布プロセスで次に感じた課題は、他のチームメンバーにアップデートをテストしてもらうことでした！

TestFlightの場合、チームに人を招待して使い方を理解してもらうのに時間がかかるという単純な問題があります！

そしてもちろん、Appleに送信するたびに、ボットによるランダムなレビュープロセスがあり、5分かかることもあれば5時間かかることもあり、予測できません。

このために私のプレゼンテーションが何度も遅れました...

Googleの場合はさらに悪く、人生の大きな謎の1つですが、本番バージョンのリリースは2時間以内に完了するのに、クローズドベータのリリースには1-2日かかります。

## 解決策

これを解決するために、Capgoにチャンネルシステムを作成しました。

`npx @capgo/cli@latest bundle upload -c production` はすべてのユーザーに更新を適用します（productionチャンネルがデフォルトに設定されている場合）

`npx @capgo/cli@latest bundle upload -c development` を実行すると、バージョンは異なるチャンネルに配信され、これは[GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/)で自動化できます。

その後、ユーザーがチャンネルからアップデートを受け取る方法は2つあります

### 完全自動化方式

これは、チャンネル設定用の独自のバックエンドを作成したくない場合に便利で、実装が早いです。

この方法では、チャンネルの1つをセルフセット可能に設定するだけです。

![Allow set self in Capgo](/self_set.webp)

そして、Ionicアプリのコードに以下を追加します。最適な体験のために、「ベータに登録」のようなボタンをユーザーがクリックした後にこれを使用してください：
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### 手動方式

これは内部チームに便利で、実装が早いです。
ユーザーがアプリからdeviceIDをコピーして手動で送信できるようにします。以下のコードで取得できます：
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
アプリのどこかにボタンを隠すか、`admin`ロールを持つログインユーザーにのみボタンを表示するなどします。

その後、WebアプリまたはネイティブアプリのCapgoに、アプリ管理者としてログインし、アプリを選択し、デバイスリストをクリックします。

検索バーにdeviceIDを入力し、見つかったものをクリックして、チャンネルリンクをクリックし、`development`を選択し、チームメイトにアプリを再度開いてもらい、30秒待って開閉してもらいます。

そうすると、あなたのバージョンが適用されるはずです。

### 自動方式

これはベータテスター向けに便利ですが、実装に時間がかかります。

手動方式と同様に、deviceIDを取得する必要があります：
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

ただし今回は、自動的にバックエンドに送信する必要があります。その方法は自由に決めてください。

後々便利になるので、データベースに保存することをお勧めします。

そしてバックエンドでCapgoバックエンドにも送信する必要があります。以下に2つのコード例を示します：
<details>
  <summary>NodeJS</summary>

```js
import axios from 'axios'

await axios.post('https://api.capgo.app/device', {
  app_id: 'YOUR_APP_ID',
  device_id: 'DEVICE_ID',
  channel: 'CHANNEL_NAME', // The name of the channel, or undefined if version_id provided
  version_id: 'VERSION_NAME' // this is optionnal, if provide it will override the channel, that usefull when you want to debug only one user.
}, {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})
```
</details>

<details>
  <summary>Cloudflare</summary>
  
```js
addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      err => new Response(err.stack, { status: 500 })
    )
  )
})

async function handleRequest(request) {
  const { pathname, method } = new URL(request.url)
  const body = await request.json()
  const newBody = JSON.stringify({
    app_id: 'YOUR_APP_ID',
    device_id: body.device_id,
    channel: 'alpha'
  })
  const newUrl = new URL('https://api.capgo.app/device')
  const options = {
    headers: {
      authorization: 'YOUR_API_KEY',
    },
    method: 'POST',
    body: newBody
  }

  if (request.method === 'DELETE') {
    // DELETE the channel link
    options.method = 'DELETE'
    return fetch(newUrl.toString(), options)
  }

  return fetch(newUrl.toString(), options)
}
```
デプロイされたURLにPOSTメソッドでdevice_idをボディに含めて送信して追加し、DELETEメソッドで削除します。
</details>

これを設定した後、アプリにチャンネルのオプトイン用のボタンを追加し、Webアプリで設定されているか確認してください。

オーバーライドを削除するために`null`を送信することもできます。

デバイスに設定されているオーバーライドをプログラムで確認する必要がある場合は、同じURLで取得できます：

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```
