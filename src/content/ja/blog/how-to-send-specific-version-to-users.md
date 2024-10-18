---
slug: how-to-send-specific-version-to-users
title: ユーザーやグループに特定のアップデートを送信する方法。
description: >-
  ユーザーがTestFlightやGoogleベータプロセスを使わずにベータ版を試せるようにしましょう。Ionicアプリにボタンを追加するだけで、彼らはアクセスできます！
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: TestFlightの代替イラスト
tag: alternatives
published: true
locale: ja
next_blog: ''
---

## はじめに

私のアプリと同様に、Capgoのアップデートシステムを楽しみ始めると、「もっと欲しい」と感じ始めるでしょう。

私もその感覚を得ましたが、Capgoの制作者なので、覗いてみることができました！

> すべてオープンソースなので、あなたにもその力があります :)

Capacitorアプリ配信プロセスで直面した次の問題は、他のチームメンバーにアップデートをテストさせることです！

TestFlightでは、問題はシンプルで、チームに人を招待し、使い方を理解させるのに時間がかかります！

そしてもちろん、Appleに送信するたびに、ランダムなレビューが行われるプロセスがあり、それは5分か5時間か、わかりません。

これにより、プレゼンテーションが何度も遅れました…

Googleではさらに悪く、私の人生の大きな謎です。プロダクション版を公開するのに2時間未満で済むのに、クローズドベータを公開するのには1〜2日かかります。


## 解決策

これを修正するために、Capgoにチャネルシステムを作成しました。

`npx @capgo/cli@latest bundle upload -c production`はすべてのユーザーにアップデートを行います（プロダクションチャネルがデフォルトに設定されている場合）。

`npx @capgo/cli@latest bundle upload -c development`を実行すると、バージョンは異なるチャネルに落ちます。これは[GitHubアクション](/blog/manage-dev-and-prod-build-with-github-actions/)で自動化できます。

ユーザーがチャネルからアップデートを受け取る方法は2つあります。

### 超自動化された方法

これはチャネル設定のために自分のバックエンドを作成したくない場合に便利で、実装も速いです。

この場合、必要なことは、自分のチャネルの1つを自己設定可能に許可することだけです。

![Capgoで自己設定を許可](/self_setwebp)

次に、あなたのIonicアプリのコードにこれを追加します。最良の体験を得るためには、「ベータ版に登録」などのボタンをクリックした後に使用します。
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### 手動方式

これは内部チームにとって便利で、実装も速いです。
ユーザーがアプリからデバイスIDをコピーして手動で送信できるようにします。このコードが役立ちます：
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
アプリ内のどこかにボタンを隠すか、`admin`ロールを持つユーザーのみに見えるボタンを表示します。

次に、ウェブアプリまたはネイティブアプリのCapgoに行き、アプリ管理者として接続し、アプリを選択し、デバイスリストをクリックします。

検索バーにデバイスIDを入力し、見つかったものをクリックし、次にチャネルリンクをクリックして`development`を選択します。チームメンバーにアプリを再度開くように指示し、30秒待ってから閉じます。

彼はあなたのバージョンを受け取るはずです。


### 自動方式

これはベータテスターにとって便利ですが、実装には時間がかかります。

手動方式と同様に、デバイスIDを取得する必要があります。
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

しかし、今回はそれを自動的にあなたのバックエンドに送信する必要があります。どうするかはあなたにお任せします。

データベースに保存することをお勧めします。これが後であなたの生活を楽にします。

その後、バックエンドの中でCapgoバックエンドにも送信する必要があります。以下にコードの2つの例を示します：
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
そして、デバイスIDをボディにPOSTメソッドで追加し、削除用のDELETEメソッドで送信します。
</details>

これを設定した後、アプリにチャネルにオプトインするボタンを追加し、ウェブアプリでそれが設定されているか確認してください。

`null`を送信してオーバーライドを削除することもできます。

デバイスでどのオーバーライドが設定されているかをプログラムで確認する必要がある場合は、同じURLで取得できます。

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```