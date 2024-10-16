---
locale: jp
---

歌う @capgo/ivs-player

## インストール

@capgo/ivs-player パッケージをインストールするには、以下のコマンドを実行する必要があります：

[[コードブロック]]

## API

@capgo/ivs-player パッケージは以下の API を提供します：

### create(options: { url: string; pip?: boolean; title?: string; subtitle?: string; cover?: string; autoPlay?: boolean; toBack?: boolean; x?: number; y?: number; width?: number; height?: number; }) => Promise

このメソッドは IVS プレーヤーのインスタンスを作成します。URL、ピクチャーインピクチャーモードの有無、ビデオのタイトルと字幕などのさまざまなプロパティを含むオプションオブジェクトをパラメーターとして取ります。作成されたインスタンスに解決する Promise を返します。

### start() => Promise

このメソッドは IVS プレーヤーでビデオの再生を開始します。Promise を返します。

### cast() => Promise

このメソッドはビデオを接続されたデバイスにキャストします。Promise を返します。

### getCastStatus() => Promise

このメソッドはキャスティング機能の状態を取得します。キャスティングがアクティブかどうかを示す isActive プロパティを含むオブジェクトに解決する Promise を返します。

### pause() => Promise

このメソッドはビデオの再生を一時停止します。Promise を返します。

### delete() => Promise

このメソッドは IVS プレーヤーのインスタンスを削除します。Promise を返します。

### getUrl() => Promise

このメソッドは現在再生中のビデオの URL を取得します。Promise を返します。

### getState() => Promise

このメソッドは IVS プレーヤーの現在の状態を取得します。Promise を返します。

### setPlayerPosition() => Promise

このメソッドは画面上の IVS プレーヤーの位置を設定します。x および y 座標をパラメーターとして取り、Promise を返します。

### getPlayerPosition() => Promise

このメソッドは画面上の IVS プレーヤーの現在の位置を取得します。Promise を返します。

### setAutoQuality() => Promise

このメソッドは IVS プレーヤーの自動品質モードを設定します。ブール値をパラメーターとして取り、Promise を返します。

### getAutoQuality() => Promise

このメソッドは IVS プレーヤーの現在の自動品質モードを取得します。Promise を返します。

### setPip() => Promise

このメソッドは IVS プレーヤーのピクチャーインピクチャーモードを設定します。ブール値をパラメーターとして取り、Promise を返します。

### getPip() => Promise

このメソッドは IVS プレーヤーの現在のピクチャーインピクチャーモードを取得します。Promise を返します。

### setFrame() => Promise

このメソッドは IVS プレーヤーのフレームを設定します。数値をパラメーターとして取り、Promise を返します。

### getFrame() => Promise

このメソッドは IVS プレーヤーの現在のフレームを取得します。Promise を返します。

### setMute() => Promise

このメソッドは IVS プレーヤーのミュートモードを設定します。ブール値をパラメーターとして取り、Promise を返します。

### getMute() => Promise

このメソッドは IVS プレーヤーの現在のミュートモードを取得します。Promise を返します。

### setQuality() => Promise

このメソッドは IVS プレーヤーのビデオの品質を設定します。文字列をパラメーターとして取り、Promise を返します。

### getQuality() => Promise

このメソッドは IVS プレーヤーのビデオの現在の品質を取得します。Promise を返します。

### getQualities() => Promise

このメソッドは IVS プレーヤーのビデオの利用可能な品質を取得します。Promise を返します。

### addListener('expandPip', ) => void

このメソッドは expandPip イベントのリスナーを追加します。コールバック関数をパラメーターとして取り、void を返します。

### addListener('closePip', ) => void

このメソッドは closePip イベントのリスナーを追加します。コールバック関数をパラメーターとして取り、void を返します。

### addListener('onState', ) => void

このメソッドは onState イベントのリスナーを追加します。コールバック関数をパラメーターとして取り、void を返します。

### addListener('onCues', ) => void

このメソッドは onCues イベントのリスナーを追加します。コールバック関数をパラメーターとして取り、void を返します。

### addListener('onDuration', ) => void

このメソッドは onDuration イベントのリスナーを追加します。コールバック関数をパラメータとして受け取り、voidを返します

### addListener('onError', ) => void

このメソッドはonErrorイベントのリスナーを追加します。コールバック関数をパラメータとして受け取り、voidを返します

### addListener('onRebuffering', ) => void

このメソッドはonRebufferingイベントのリスナーを追加します。コールバック関数をパラメータとして受け取り、voidを返します

### addListener('onSeekCompleted', ) => void

このメソッドはonSeekCompletedイベントのリスナーを追加します。コールバック関数をパラメータとして受け取り、voidを返します

### addListener('onVideoSize', ) => void

このメソッドはonVideoSizeイベントのリスナーを追加します。コールバック関数をパラメータとして受け取り、voidを返します

### addListener('onQuality', ) => void

このメソッドはonQualityイベントのリスナーを追加します。コールバック関数をパラメータとして受け取り、voidを返します

### addListener('onCastStatus', ) => void

このメソッドはonCastStatusイベントのリスナーを追加します。コールバック関数をパラメータとして受け取り、voidを返します

### removeAllListeners() => void

このメソッドは追加されたすべてのイベントリスナーを削除します。voidを返します

## 結論

@capgo/ivs-playerパッケージは、IVSプレーヤーをCapacitorアプリに統合するための包括的なAPIを提供します。インストール手順に従い、APIドキュメントを参照することで、IVSプレーヤーを使用してアプリで簡単に動画を再生できます。