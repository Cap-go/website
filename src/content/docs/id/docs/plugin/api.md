---
title: 기능 및 설정
description: Semua metode dan pengaturan yang tersedia pada plugin ini
sidebar:
  order: 2
locale: id
---

# Konfigurasi Plugin Updater

Lihat [Readme](https://githubcom/Cap-go/capacitor-updater) Github untuk informasi lebih lanjut

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater dapat dikonfigurasi dengan opsi-opsi berikut:

| Properti                     | Tipe                 | Deskripsi                                                                                                                                                                                    | Nilai Default                                      | Sejak   |
| ---------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>  | Mengatur jumlah milidetik plugin native harus menunggu sebelum menganggap pembaruan 'gagal' Hanya tersedia untuk Android dan iOS                                                         | <code>10000 // (10 detik)</code>                   |         |
| **`responseTimeout`**        | <code>number</code>  | Mengatur jumlah milidetik plugin native harus menunggu sebelum menganggap API timeout Hanya tersedia untuk Android dan iOS                                                                | <code>20 // (20 detik)</code>                      |         |
| **`autoDeleteFailed`**       | <code>boolean</code> | Mengatur apakah plugin harus otomatis menghapus bundle yang gagal Hanya tersedia untuk Android dan iOS                                                                                    | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code> | Mengatur apakah plugin harus otomatis menghapus bundle sebelumnya setelah pembaruan berhasil Hanya tersedia untuk Android dan iOS                                                        | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code> | Mengatur apakah plugin harus menggunakan Pembaruan Otomatis melalui server pembaruan Hanya tersedia untuk Android dan iOS                                                                | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code> | Otomatis menghapus bundle yang sudah diunduh sebelumnya ketika bundle aplikasi native yang lebih baru dipasang ke perangkat Hanya tersedia untuk Android dan iOS                        | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>  | Mengatur URL / endpoint tempat pemeriksaan pembaruan dikirim Hanya tersedia untuk Android dan iOS                                                                                         | <code>https://plugincapgoapp/updates</code>      |         |
| **`channelUrl`**             | <code>string</code>  | Mengatur URL / endpoint untuk operasi channel Hanya tersedia untuk Android dan iOS                                                                                                        | <code>https://plugincapgoapp/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>  | Mengatur URL / endpoint tempat statistik pembaruan dikirim Hanya tersedia untuk Android dan iOS Atur ke "" untuk menonaktifkan pelaporan statistik                                      | <code>https://plugincapgoapp/stats</code>        |         |
| **`privateKey`**             | <code>string</code>  | Mengatur kunci privat untuk enkripsi pembaruan langsung end-to-end Hanya tersedia untuk Android dan iOS Tidak digunakan lagi di versi 620 akan dihapus di versi 700                | <code>undefined</code>                             |         |
| **`publicKey`**              | <code>string</code>  | Mengatur kunci publik untuk enkripsi pembaruan langsung end-to-end Versi 2 Hanya tersedia untuk Android dan iOS                                                                          | <code>undefined</code>                             | 620   |
| **`version`**                | <code>string</code>  | Mengatur versi saat ini dari aplikasi Ini akan digunakan untuk permintaan pembaruan pertama Jika tidak diatur, plugin akan mengambil versi dari kode native Hanya untuk Android dan iOS | <code>undefined</code>                             | 41748 |
| **`directUpdate`**           | <code>boolean</code> | Membuat plugin langsung memasang pembaruan ketika aplikasi baru saja diperbarui/dipasang Hanya untuk mode autoUpdate Hanya tersedia untuk Android dan iOS                               | <code>undefined</code>                             | 510   |
| **`periodCheckDelay`**       | <code>number</code>  | Mengatur jeda periode untuk pemeriksaan pembaruan berkala dalam satuan detik Hanya tersedia untuk Android dan iOS Tidak boleh kurang dari 600 detik (10 menit)                         | <code>600 // (10 menit)</code>                     |         |
| **`localS3`**                | <code>boolean</code> | Mengatur CLI untuk menggunakan server lokal untuk pengujian atau server pembaruan yang dihost sendiri                                                                                        | <code>undefined</code>                             | 41748 |
| **`localHost`**              | <code>string</code>  | Mengatur CLI untuk menggunakan server lokal untuk pengujian atau server pembaruan yang dihost sendiri                                                                                        | <code>undefined</code>                             | 41748 |
| **`localWebHost`**           | <code>string</code>  | Mengatur CLI untuk menggunakan server lokal untuk pengujian atau server pembaruan yang dihost sendiri                                                                                        | <code>undefined</code>                             | 41748 |
| **`localSupa`**              | <code>string</code>  | Mengatur CLI untuk menggunakan server lokal untuk pengujian atau server pembaruan yang dihost sendiri                                                                                        | <code>undefined</code>                             | 41748 |
| **`localSupaAnon`**          | <code>string</code>  | Mengatur CLI untuk menggunakan server lokal untuk pengujian                                                                                                                                  | <code>undefined</code>                             | 41748 |
| **`localApi`**               | <code>string</code>  | Mengatur CLI untuk menggunakan api lokal untuk pengujian                                                                                                                                     | <code>undefined</code>                             | 633   |
| **`localApiFiles`**          | <code>string</code>  | Mengatur CLI untuk menggunakan file api lokal untuk pengujian                                                                                                                                | <code>undefined</code>                             | 633   |
| **`allowModifyUrl`**         | <code>boolean</code> | Mengizinkan plugin untuk memodifikasi updateUrl, statsUrl dan channelUrl secara dinamis dari sisi JavaScript                                                                                | <code>false</code>                                 | 540   |
| **`defaultChannel`**         | <code>string</code>  | Mengatur channel default untuk aplikasi dalam konfigurasi                                                                                                                                    | <code>undefined</code>                             |         || <code>undefined</code>                             | 550   |
| **`appId`**                  | <code>string</code>  | Mengkonfigurasi ID aplikasi untuk aplikasi dalam konfigurasi                                                                                                                                        | <code>undefined</code>                             | 600   |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | Mengkonfigurasi plugin untuk mempertahankan path URL setelah pemuatan ulang PERINGATAN: Ketika pemuatan ulang dipicu, 'windowhistory' akan dihapus                                                | <code>false</code>                                 | 680   |

## Contoh

Dalam `capacitorconfigjson`:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 detik),
      "responseTimeout": 10 // (10 detik),
      "autoDeleteFailed": false,
      "autoDeletePrevious": false,
      "autoUpdate": false,
      "resetWhenUpdate": false,
      "updateUrl": https://examplecom/api/auto_update,
      "channelUrl": https://examplecom/api/channel,
      "statsUrl": https://examplecom/api/stats,
      "privateKey": undefined,
      "publicKey": undefined,
      "version": undefined,
      "directUpdate": undefined,
      "periodCheckDelay": undefined,
      "localS3": undefined,
      "localHost": undefined,
      "localWebHost": undefined,
      "localSupa": undefined,
      "localSupaAnon": undefined,
      "localApi": undefined,
      "localApiFiles": undefined,
      "allowModifyUrl": undefined,
      "defaultChannel": undefined,
      "appId": undefined,
      "keepUrlPathAfterReload": undefined
    }
  }
}
```

Dalam `capacitorconfigts`:

```ts
/// <reference types="@capgo/capacitor-updater" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1 detik),
      responseTimeout: 10 // (10 detik),
      autoDeleteFailed: false,
      autoDeletePrevious: false,
      autoUpdate: false,
      resetWhenUpdate: false,
      updateUrl: https://examplecom/api/auto_update,
      channelUrl: https://examplecom/api/channel,
      statsUrl: https://examplecom/api/stats,
      privateKey: undefined,
      publicKey: undefined,
      version: undefined,
      directUpdate: undefined,
      periodCheckDelay: undefined,
      localS3: undefined, 
      localHost: undefined,
      localWebHost: undefined,
      localSupa: undefined,
      localSupaAnon: undefined,
      localApi: undefined,
      localApiFiles: undefined,
      allowModifyUrl: undefined,
      defaultChannel: undefined,
      appId: undefined,
      keepUrlPathAfterReload: undefined,
    },
  },
};

export default config;
```

</docgen-config>

<docgen-index>

* [`notifyAppReady()`](#notifyappready)
* [`setUpdateUrl()`](#setupdateurl)
* [`setStatsUrl()`](#setstatsurl)
* [`setChannelUrl()`](#setchannelurl)
* [`download()`](#download)
* [`next()`](#next)
* [`set()`](#set)
* [`delete()`](#delete)
* [`list()`](#list)
* [`reset()`](#reset)
* [`current()`](#current)
* [`reload()`](#reload)
* [`setMultiDelay()`](#setmultidelay)
* [`cancelDelay()`](#canceldelay)
* [`getLatest()`](#getlatest)
* [`setChannel()`](#setchannel)
* [`unsetChannel()`](#unsetchannel)
* [`getChannel()`](#getchannel)
* [`setCustomId()`](#setcustomid)
* [`getBuiltinVersion()`](#getbuiltinversion)
* [`getDeviceId()`](#getdeviceid)
* [`getPluginVersion()`](#getpluginversion)
* [`isAutoUpdateEnabled()`](#isautoupdateenabled)
* [`removeAllListeners()`](#removealllisteners)
* [`addListener('download', )`](#addlistenerdownload-)
* [`addListener('noNeedUpdate', )`](#addlistenernoneedupdate-)
* [`addListener('updateAvailable', )`](#addlistenerupdateavailable-)
* [`addListener('downloadComplete', )`](#addlistenerdownloadcomplete-)
* [`addListener('majorAvailable', )`](#addlistenermajoravailable-)
* [`addListener('updateFailed', )`](#addlistenerupdatefailed-)
* [`addListener('downloadFailed', )`](#addlistenerdownloadfailed-)  
* [`addListener('appReloaded', )`](#addlistenerappreloaded-)
* [`addListener('appReady', )`](#addlistenerappready-)
* [`isAutoUpdateAvailable()`](#isautoupdateavailable)
* [`getNextBundle()`](#getnextbundle)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

# Metode

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Memberi tahu Capacitor Updater bahwa bundle saat ini berfungsi (rollback akan terjadi jika metode ini tidak dipanggil setiap kali aplikasi diluncurkan)
Secara default metode ini harus dipanggil dalam 10 detik pertama setelah peluncuran aplikasi, jika tidak rollback akan terjadi
Ubah perilaku ini dengan {@link appReadyTimeout}

**Mengembalikan:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------


## setUpdateUrl()

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Mengatur updateUrl untuk aplikasi, ini akan digunakan untuk memeriksa pembaruan

| Param         | Type                                            | Description                                        |
| ------------- | ----------------------------------------------- | -------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | berisi URL yang akan digunakan untuk memeriksa pembaruan |

**Sejak:** 540

--------------------


## setStatsUrl()

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Mengatur statsUrl untuk aplikasi, ini akan digunakan untuk mengirim statistik. Memberikan string kosong akan menonaktifkan pengumpulan statistik

| Param         | Type                                          | Description                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | berisi URL yang akan digunakan untuk mengirim statistik |

**Sejak:** 540

--------------------


## setChannelUrl()

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Mengatur channelUrl untuk aplikasi, ini akan digunakan untuk mengatur channel

| Param         | Type                                              | Description                                      |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | berisi URL yang akan digunakan untuk mengatur channel |

**Sejak:** 540

--------------------


## download()

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Mengunduh bundle baru dari URL yang disediakan, ini harus berupa file zip, dengan file di dalamnya atau dengan ID unik di dalamnya dengan semua file Anda

| Param         | Type                                                        | Description                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | {@link <a href="#downloadoptions">DownloadOptions</a>} untuk mengunduh file zip bundle baru |

**Mengembalikan:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## next()

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Mengatur bundle berikutnya yang akan digunakan ketika aplikasi dimuat ulang| Param         | Type                                          | Deskripsi                                                                                                    |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Berisi ID dari Bundle berikutnya yang akan diatur pada peluncuran aplikasi berikutnya {@link <a href="#bundleinfo">BundleInfoid</a>} |

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## set()

```typescript
set(options: BundleId) => Promise<void>
```

Mengatur bundle saat ini dan segera memuat ulang aplikasi

| Param         | Type                                          | Deskripsi                                                                                        |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Sebuah objek {@link <a href="#bundleid">BundleId</a>} yang berisi id bundle baru untuk diatur sebagai yang aktif |

--------------------


## delete()

```typescript
delete(options: BundleId) => Promise<void>
```

Menghapus bundle yang ditentukan dari penyimpanan aplikasi native. Gunakan dengan {@link list} untuk mendapatkan ID Bundle yang tersimpan

| Param         | Type                                          | Deskripsi                                                                                                                                    |
| ------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Sebuah objek {@link <a href="#bundleid">BundleId</a>} yang berisi ID bundle yang akan dihapus (catatan, ini adalah id bundle, BUKAN nama versi) |

--------------------


## list()

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Dapatkan semua bundle yang diunduh secara lokal di aplikasi Anda

| Param         | Type                                                | Deskripsi                                                             |
| ------------- | --------------------------------------------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | {@link <a href="#listoptions">ListOptions</a>} untuk mendaftar bundle |

**Returns:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------


## reset()

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Mengatur ulang aplikasi ke bundle `builtin` (yang dikirim ke Apple App Store / Google Play Store) atau bundle yang terakhir berhasil dimuat

| Param         | Type                                                  | Deskripsi                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Berisi {@link <a href="#resetoptions">ResetOptionstoLastSuccessful</a>}, `true` mengatur ulang ke bundle bawaan dan `false` akan mengatur ulang ke bundle yang terakhir berhasil dimuat |

--------------------


## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Dapatkan bundle saat ini, jika tidak ada yang diatur akan mengembalikan `builtin` currentNative adalah bundle asli yang diinstal di perangkat

**Returns:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------


## reload()

```typescript
reload() => Promise<void>
```

Muat ulang tampilan

--------------------


## setMultiDelay()

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Mengatur array {@link <a href="#delaycondition">DelayCondition</a>} yang berisi kondisi yang akan digunakan Plugin untuk menunda pembaruan
Setelah semua kondisi terpenuhi, proses pembaruan akan berjalan kembali seperti biasa, jadi pembaruan akan diinstal setelah aplikasi di-background atau dimatikan
Untuk jenis `date`, nilai harus berupa string tanggal iso8601
Untuk jenis `background`, nilai harus berupa angka dalam milidetik
Untuk jenis `nativeVersion`, nilai harus berupa nomor versi
Untuk jenis `kill`, nilai tidak digunakan
Fungsi ini memiliki perilaku yang tidak konsisten, opsi kill memicu pembaruan setelah pembunuhan pertama dan tidak setelah background berikutnya seperti opsi lainnya. Ini akan diperbaiki dalam rilis utama mendatang

| Param         | Type                                                                  | Deskripsi                                                                                                 |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Berisi array {@link <a href="#multidelayconditions">MultiDelayConditions</a>} kondisi yang akan diatur |

**Sejak:** 430

--------------------


## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Membatalkan {@link <a href="#delaycondition">DelayCondition</a>} untuk memproses pembaruan secara langsung

**Sejak:** 400

--------------------


## getLatest()

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Dapatkan bundle terbaru yang tersedia dari URL pembaruan

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Sejak:** 400

--------------------


## setChannel()

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Mengatur channel untuk perangkat ini. Channel harus mengizinkan penetapan sendiri agar ini berfungsi
Jangan gunakan metode ini untuk mengatur channel saat boot ketika `autoUpdate` diaktifkan di {@link PluginsConfig}
Metode ini untuk mengatur channel setelah aplikasi siap
Metode ini mengirim permintaan ke backend Capgo untuk menautkan ID perangkat ke channel. Capgo dapat menerima atau menolak tergantung pengaturan channel Anda

| Param         | Type                                                            | Deskripsi                                                                      |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Adalah channel {@link <a href="#setchanneloptions">SetChannelOptions</a>} yang akan diatur |

**Returns:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Sejak:** 470

--------------------


## unsetChannel()

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Menghapus channel untuk perangkat iniPerangkat tersebut akan kembali ke saluran default

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Sejak:** 470

--------------------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Dapatkan saluran untuk perangkat ini

**Returns:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Sejak:** 480

--------------------


## setCustomId()

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Tetapkan ID kustom untuk perangkat ini

| Param         | Type                                                              | Description                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | adalah {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId yang akan diatur |

**Sejak:** 490

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Dapatkan versi aplikasi asli atau versi bawaan jika diatur dalam konfigurasi

**Returns:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Sejak:** 520

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Dapatkan ID unik yang digunakan untuk mengidentifikasi perangkat (dikirim ke server pembaruan otomatis)

**Returns:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Dapatkan versi plugin Capacitor Updater asli (dikirim ke server pembaruan otomatis)

**Returns:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Dapatkan status konfigurasi pembaruan otomatis

**Returns:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------


## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Hapus semua listener untuk plugin ini

**Sejak:** 100

--------------------


## addListener('download', )

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan event unduhan bundle di Aplikasi Terpicu saat unduhan dimulai, selama mengunduh dan ketika selesai

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Sejak:** 2011

--------------------


## addListener('noNeedUpdate', )

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan event tidak perlu pembaruan, berguna ketika Anda ingin memaksa pemeriksaan setiap kali aplikasi diluncurkan

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Sejak:** 400

--------------------


## addListener('updateAvailable', )

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan event pembaruan tersedia, berguna ketika Anda ingin memaksa pemeriksaan setiap kali aplikasi diluncurkan

| Param              | Type                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Sejak:** 400

--------------------


## addListener('downloadComplete', )

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan event downloadComplete

| Param              | Type                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Sejak:** 400

--------------------


## addListener('majorAvailable', )

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan event pembaruan Major di Aplikasi, memberi tahu Anda ketika pembaruan major diblokir dengan pengaturan disableAutoUpdateBreaking

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Sejak:** 230

--------------------


## addListener('updateFailed', )

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan event kegagalan pembaruan di Aplikasi, memberi tahu Anda ketika pembaruan gagal dipasang saat aplikasi berikutnya dimulai

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Sejak:** 230

--------------------


## addListener('downloadFailed',```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Mendengarkan event kegagalan unduhan dalam App, memberitahu Anda ketika unduhan bundle gagal

| Param | Type | 
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'downloadFailed'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------


## addListener('appReloaded', )

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Mendengarkan event reload dalam App, memberitahu Anda ketika reload telah terjadi

| Param | Type |
| ------------------ | -------------------------- |
| **`eventName`** | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 430

--------------------


## addListener('appReady', )

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Mendengarkan event app ready dalam App, memberitahu Anda ketika app siap digunakan

| Param | Type |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'appReady'</code> |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 510

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Mendapatkan apakah pembaruan otomatis tersedia (tidak dinonaktifkan oleh serverUrl)

**Returns:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Mendapatkan bundle berikutnya yang akan digunakan saat aplikasi dimuat ulang
Mengembalikan null jika tidak ada bundle berikutnya yang diatur

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Since:** 680

--------------------


## Interfaces


### AppReadyResult

| Prop | Type |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Prop | Type |
| ---------------- | ----------------------------------------------------- |
| **`id`** | <code>string</code> |
| **`version`** | <code>string</code> |
| **`downloaded`** | <code>string</code> |
| **`checksum`** | <code>string</code> |
| **`status`** | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Prop | Type |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl 

| Prop | Type |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ChannelUrl

| Prop | Type |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### DownloadOptions

| Prop | Type | Deskripsi | Default | Since |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`** | <code>string</code> | URL file zip bundle (misalnya: distzip) yang akan diunduh (Ini bisa berupa URL apa saja Misalnya: Amazon S3, tag GitHub, tempat lain di mana Anda meng-host bundle Anda) | | |
| **`version`** | <code>string</code> | Kode/nama versi bundle/versi ini | | |
| **`sessionKey`** | <code>string</code> | Kunci sesi untuk pembaruan | <code>undefined</code> | 400 |
| **`checksum`** | <code>string</code> | Checksum untuk pembaruan | <code>undefined</code> | 400 |


### BundleId

| Prop | Type |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| Prop | Type |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Prop | Type | Deskripsi | Default | Since |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | Apakah akan mengembalikan daftar bundle mentah atau manifes Jika benar, daftar akan mencoba membaca database internal alih-alih file di disk | <code>false</code> | 6140 |


### ResetOptions

| Prop | Type |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Prop | Type |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code> |


### MultiDelayConditions 

| Prop | Type |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| Prop | Type | Deskripsi |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`** | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Menyiapkan kondisi penundaan dalam setMultiDelay |
| **`value`** | <code>string</code> | |


### LatestVersion

| Prop | Type | Deskripsi | Since |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Hasil dari metode getLatest | 4000 |
| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 61   |


### ManifestEntry

| Prop               | Type                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### GetLatestOptions

| Prop          | Type                | Deskripsi                                                                                      | Default                | Sejak |
| ------------- | ------------------- | ---------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | Channel untuk mendapatkan versi terbaru. Channel harus mengizinkan 'self_assign' agar ini berfungsi | <code>undefined</code> | 680 |


### ChannelRes

| Prop          | Type                | Deskripsi                      | Sejak |
| ------------- | ------------------- | ------------------------------ | ----- |
| **`status`**  | <code>string</code> | Status terkini dari set channel | 470 |
| **`error`**   | <code>string</code> |                                |       |
| **`message`** | <code>string</code> |                                |       |


### SetChannelOptions

| Prop                    | Type                 |
| ----------------------- | -------------------- |
| **`channel`**           | <code>string</code>  |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| Prop                    | Type                 |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes

| Prop           | Type                 | Deskripsi                      | Sejak |
| -------------- | -------------------- | ------------------------------ | ----- |
| **`channel`**  | <code>string</code>  | Status terkini dari get channel | 480 |
| **`error`**    | <code>string</code>  |                                |       |
| **`message`**  | <code>string</code>  |                                |       |
| **`status`**   | <code>string</code>  |                                |       |
| **`allowSet`** | <code>boolean</code> |                                |       |


### SetCustomIdOptions

| Prop           | Type                |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| Prop          | Type                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### DeviceId

| Prop           | Type                |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| Prop          | Type                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| Prop          | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### DownloadEvent

| Prop          | Type                                              | Deskripsi                                    | Sejak |
| ------------- | ------------------------------------------------- | -------------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | Status terkini dari unduhan, antara 0 dan 100 | 400 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                              |       |


### NoNeedEvent

| Prop         | Type                                              | Deskripsi                                    | Sejak |
| ------------ | ------------------------------------------------- | -------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Status terkini dari unduhan, antara 0 dan 100 | 400 |


### UpdateAvailableEvent

| Prop         | Type                                              | Deskripsi                                    | Sejak |
| ------------ | ------------------------------------------------- | -------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Status terkini dari unduhan, antara 0 dan 100 | 400 |


### DownloadCompleteEvent

| Prop         | Type                                              | Deskripsi                                | Sejak |
| ------------ | ------------------------------------------------- | ---------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Dikeluarkan ketika pembaruan baru tersedia | 400 |


### MajorAvailableEvent

| Prop          | Type                | Deskripsi                                           | Sejak |
| ------------- | ------------------- | --------------------------------------------------- | ----- |
| **`version`** | <code>string</code> | Dikeluarkan ketika bundle major baru tersedia | 400 |


### UpdateFailedEvent

| Prop         | Type                                              | Deskripsi                                       | Sejak |
| ------------ | ------------------------------------------------- | ----------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Dikeluarkan ketika pembaruan gagal diinstal | 400 |


### DownloadFailedEvent

| Prop          | Type                | Deskripsi                          | Sejak |
| ------------- | ------------------- | ---------------------------------- | ----- |
| **`version`** | <code>string</code> | Dikeluarkan ketika unduhan gagal | 400 |


### AppReadyEvent

| Prop         | Type                                              | Deskripsi                                     | Sejak |
| ------------ | ------------------------------------------------- | --------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Dikeluarkan ketika aplikasi siap digunakan | 520 |
| **`status`** | <code>string</code>                               |                                               |       |


### AutoUpdateAvailable

| Prop            | Type                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


## Type Aliases


### BundleStatus

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-api>