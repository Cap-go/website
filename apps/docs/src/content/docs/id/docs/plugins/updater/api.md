---
title: Fungsi dan pengaturan
description: Semua metode dan pengaturan plugin yang tersedia
sidebar:
  order: 2
locale: id
---
# Konfigurasi Plugin Pembaru

Lihat Github [Readme](https://github.com/Cap-go/capacitor-updater) untuk informasi lebih lanjut.

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater dapat dikonfigurasi dengan opsi berikut:| Prop | Ketik | Deskripsi | Bawaan | Sejak |
| ---------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | ------- |
| **`appReadyTimeout`** | <code>nomor</code> | Konfigurasikan jumlah milidetik yang harus ditunggu oleh plugin asli sebelum mempertimbangkan pembaruan 'gagal'. Tersedia di Android, iOS, dan Elektron.                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>10000 // (10 detik)</code> |         |
| **`responseTimeout`** | <code>nomor</code> | Konfigurasikan jumlah milidetik yang harus ditunggu oleh plugin asli sebelum mempertimbangkan batas waktu API. Tersedia di Android, iOS, dan Elektron.                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>20000 // (20 detik)</code> |         |
| **`autoDeleteFailed`** | <code>boolean</code> | Konfigurasikan apakah plugin harus menggunakan penghapusan bundel yang gagal secara otomatis. Tersedia di Android, iOS, dan Eelektron.                                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>benar</code> |         |
| **`autoDeletePrevious`** | <code>boolean</code> | Konfigurasikan apakah plugin harus menggunakan penghapusan otomatis bundel sebelumnya setelah pembaruan berhasil. Tersedia di Android, iOS, dan Elektron.                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>benar</code> |         |
| **`autoUpdate`** | <code>boolean</code> | Konfigurasikan apakah plugin harus menggunakan Pembaruan Otomatis melalui server pembaruan. Tersedia di Android, iOS, dan Elektron.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>benar</code> |         |
| **`resetWhenUpdate`** | <code>boolean</code> | Hapus paket yang diunduh sebelumnya secara otomatis saat paket aplikasi asli yang lebih baru diinstal ke perangkat. Tersedia di Android, iOS, dan Elektron.                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>benar</code> |         |
| **`updateUrl`** | <code>string</code> | Konfigurasikan URL/titik akhir yang menjadi tujuan pengiriman pemeriksaan pembaruan. Tersedia di Android, iOS, dan Elektron.| <code>https://plugin.capgo.app/updates</code> |         |
| **`channelUrl`** | <code>string</code> | Konfigurasikan URL/titik akhir untuk operasi saluran. Tersedia di Android, iOS, dan Elektron.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`** | <code>string</code> | Konfigurasikan URL/titik akhir yang menjadi tujuan pengiriman statistik pembaruan. Tersedia di Android, iOS, dan Elektron. Setel ke "" untuk menonaktifkan pelaporan statistik.                                                                                                                                                                                                                                                                                                                                                                                                                                       | <code>https://plugin.capgo.app/stats</code> |         |
| **`publicKey`** | <code>string</code> | Konfigurasikan kunci publik untuk enkripsi pembaruan langsung ujung ke ujung Versi 2. Tersedia di Android, iOS, dan Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                                             | <code>tidak terdefinisi</code> | 6.2.0 |
| **`version`** | <code>string</code> | Konfigurasikan versi aplikasi saat ini. Ini akan digunakan untuk permintaan pembaruan pertama. Jika tidak disetel, plugin akan mendapatkan versi dari kode asli. Tersedia di Android, iOS, dan Elektron.| <code>tidak terdefinisi</code> | 4.17.48 |
| **`directUpdate`** | <code>boolean \| 'selalu' \| 'di Instal' \| 'saat Peluncuran'</code> | Konfigurasikan kapan plugin harus mengarahkan pembaruan instalasi. Hanya untuk mode pembaruan otomatis. Berfungsi dengan baik untuk aplikasi kurang dari 10MB dan dengan unggahan dilakukan menggunakan tanda --delta. Zip atau aplikasi yang lebih besar dari 10 MB akan relatif lambat bagi pengguna untuk memperbaruinya. - false: Jangan pernah melakukan pembaruan langsung (gunakan perilaku default: unduh di awal, atur saat di latar belakang) - atInstall: Pembaruan langsung hanya ketika aplikasi diinstal, diperbarui dari toko, jika tidak bertindak sebagai directUpdate = false - onLaunch: Pembaruan langsung hanya pada aplikasi yang diinstal, diperbarui dari toko atau setelah aplikasi dimatikan, jika tidak bertindak sebagai directUpdate = false - selalu: Pembaruan langsung dalam semua kasus sebelumnya (aplikasi diinstal, diperbarui dari toko, setelah aplikasi dimatikan atau aplikasi dilanjutkan), tidak pernah bertindak sebagai directUpdate = false - true: (tidak digunakan lagi) Sama seperti "selalu" untuk kompatibilitas mundur Tersedia di Android, iOS, dan Electron. | <code>false</code> | 5.1.0 |
| **`autoSplashscreen`** | <code>boolean</code> | Secara otomatis menangani penyembunyian splashscreen saat menggunakan directUpdate. Saat diaktifkan, plugin akan secara otomatis menyembunyikan splashscreen setelah pembaruan diterapkan atau ketika tidak diperlukan pembaruan. Hal ini menghilangkan kebutuhan untuk mendengarkan peristiwa appReady secara manual dan memanggil SplashScreen.hide(). Hanya berfungsi jika directUpdate disetel ke "atInstall", "always", atau true. Memerlukan plugin @capacitor/splash-screen untuk diinstal dan dikonfigurasi dengan launchAutoHide: false. Memerlukan autoUpdate dan directUpdate untuk diaktifkan. Tersedia di Android dan iOS.                      | <code>false</code> | 7.6.0 |
| **`periodCheckDelay`** | <code>nomor</code> | Konfigurasikan periode penundaan untuk pemeriksaan pembaruan periode. unitnya dalam hitungan detik. Tersedia di Android, iOS, dan Elektron. Tidak boleh kurang dari 600 detik (10 menit).                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>600 // (10 menit)</code> |         |
| **`localS3`** | <code>boolean</code> | Konfigurasikan CLI untuk menggunakan server lokal untuk pengujian atau server pembaruan yang dihosting sendiri.| <code>tidak terdefinisi</code> | 4.17.48 |
| **`localHost`** | <code>string</code> | Konfigurasikan CLI untuk menggunakan server lokal untuk pengujian atau server pembaruan yang dihosting sendiri.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>tidak terdefinisi</code> | 4.17.48 |
| **`localWebHost`** | <code>string</code> | Konfigurasikan CLI untuk menggunakan server lokal untuk pengujian atau server pembaruan yang dihosting sendiri.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>tidak terdefinisi</code> | 4.17.48 |
| **`localSupa`** | <code>string</code> | Konfigurasikan CLI untuk menggunakan server lokal untuk pengujian atau server pembaruan yang dihosting sendiri.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>tidak terdefinisi</code> | 4.17.48 |
| **`localSupaAnon`** | <code>string</code> | Konfigurasikan CLI untuk menggunakan server lokal untuk pengujian.| <code>tidak terdefinisi</code> | 4.17.48 |
| **`localApi`** | <code>string</code> | Konfigurasikan CLI untuk menggunakan api lokal untuk pengujian.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>tidak terdefinisi</code> | 6.3.3 |
| **`localApiFiles`** | <code>string</code> | Konfigurasikan CLI untuk menggunakan api file lokal untuk pengujian.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>tidak terdefinisi</code> | 6.3.3 |
| **`allowModifyUrl`** | <code>boolean</code> | Izinkan plugin untuk mengubah updateUrl, statsUrl, dan channelUrl secara dinamis dari sisi JavaScript.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code> | 5.4.0 |
| **`defaultChannel`** | <code>string</code> | Tetapkan saluran default untuk aplikasi di konfigurasi. Peka huruf besar-kecil. Pengaturan ini akan mengesampingkan saluran default yang diatur di cloud, namun tetap menghormati penggantian yang dilakukan di cloud.                                                                                                                                                                                                                                                                                                                                                                                      | <code>tidak terdefinisi</code> | 5.5.0 |
| **`appId`** | <code>string</code> | Konfigurasikan id aplikasi untuk aplikasi di konfigurasi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>tidak terdefinisi</code> | 6.0.0 |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | Konfigurasikan plugin untuk mempertahankan jalur URL setelah memuat ulang. PERINGATAN: Saat memuat ulang dipicu, 'window.history' akan dihapus.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code> | 6.8.0 |
| **`disableJSLogging`** | <code>boolean</code> | Nonaktifkan pencatatan JavaScript pada plugin. jika benar, plugin tidak akan masuk ke konsol JavaScript. hanya log asli yang akan dilakukan | <code>false</code> | 7.3.0 |
| **`shakeMenu`** | <code>boolean</code> | Aktifkan gerakan goyang untuk menampilkan menu pembaruan untuk tujuan debugging/pengujian | <code>false</code> | 7.5.0 |## Contoh

Dalam `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 second),
      "responseTimeout": 10 // (10 second),
      "autoDeleteFailed": false,
      "autoDeletePrevious": false,
      "autoUpdate": false,
      "resetWhenUpdate": false,
      "updateUrl": https://example.com/api/auto_update,
      "channelUrl": https://example.com/api/channel,
      "statsUrl": https://example.com/api/stats,
      "publicKey": undefined,
      "version": undefined,
      "directUpdate": undefined,
      "autoSplashscreen": undefined,
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
      "keepUrlPathAfterReload": undefined,
      "disableJSLogging": undefined,
      "shakeMenu": undefined
    }
  }
}
```

Dalam `capacitor.config.ts`:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1 second),
      responseTimeout: 10 // (10 second),
      autoDeleteFailed: false,
      autoDeletePrevious: false,
      autoUpdate: false,
      resetWhenUpdate: false,
      updateUrl: https://example.com/api/auto_update,
      channelUrl: https://example.com/api/channel,
      statsUrl: https://example.com/api/stats,
      publicKey: undefined,
      version: undefined,
      directUpdate: undefined,
      autoSplashscreen: undefined,
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
      disableJSLogging: undefined,
      shakeMenu: undefined,
    },
  },
};

export default config;
```

</docgen-config>

<docgen-index>

* [`notifyAppReady()`](#notifyapready)
* [`setUpdateUrl(...)`](#setupdateurl)
* [`setStatsUrl(...)`](#setstatsurl)
* [`setChannelUrl(...)`](#setchannelurl)
* [`download(...)`](#unduh)
* [`next(...)`](#berikutnya)
* [`set(...)`](#set)
* [`delete(...)`](#hapus)
* [`list(...)`](#daftar)
* [`reset(...)`](#setel ulang)
* [`current()`](#saat ini)
* [`reload()`](#muat ulang)
* [`setMultiDelay(...)`](#setmultidelay)
* [`cancelDelay()`](#batalkan penundaan)
* [`getLatest(...)`](#dapatkanterbaru)
* [`setChannel(...)`](#setsaluran)
* [`unsetChannel(...)`](#saluran tidak disetel)
* [`getChannel()`](#getchannel)
* [`listChannels()`](#daftarsaluran)
* [`setCustomId(...)`](#setcustomid)
* [`getBuiltinVersion()`](#getbuiltinversion)
* [`getDeviceId()`](#getdeviceid)
* [`getPluginVersion()`](#getpluginversion)
* [`isAutoUpdateEnabled()`](#isautoupdateenabled)
* [`removeAllListeners()`](#hapus semua pendengar)
* [`addListener('download', ...)`](#addlistenerdownload-)
* [`addListener('noNeedUpdate', ...)`](#addlistenernoneedupdate-)
* [`addListener('updateAvailable', ...)`](#addlistenerupdateavailable-)
* [`addListener('downloadComplete', ...)`](#addlistenerdownloadcomplete-)
* [`addListener('majorAvailable', ...)`](#addlistenermajoravailable-)
* [`addListener('updateFailed', ...)`](#addlistenerupdatefailed-)
* [`addListener('downloadFailed', ...)`](#addlistenerdownloadfailed-)
* [`addListener('appReloaded', ...)`](#addlistenerappreloaded-)
* [`addListener('appReady', ...)`](#addlistenerappready-)
* [`isAutoUpdateAvailable()`](#isautoupdateavailable)
* [`getNextBundle()`](#dapatkanbundel berikutnya)
* [`setShakeMenu(...)`](#setshakemenu)
* [`isShakeMenuEnabled()`](#isshakemenuenabled)
* [Antarmuka](#antarmuka)
* [Ketik Alias](#tipe-alias)

</docgen-index>

# Metode

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## beri tahuAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Beri tahu Capacitor Pembaru bahwa paket saat ini berfungsi (pengembalian akan terjadi jika metode ini tidak dipanggil pada setiap peluncuran aplikasi)
Secara default, metode ini harus dipanggil dalam 10 detik pertama setelah peluncuran aplikasi, jika tidak, rollback akan terjadi.
Ubah perilaku ini dengan {@link appReadyTimeout}

**Pengembalian:** <code>Janji<<a href="#appreadyresult">AppReadyResult</a>></code>

--------------------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Atur updateUrl untuk aplikasi, ini akan digunakan untuk memeriksa pembaruan.

| Param | Ketik | Deskripsi |
| ------------- | ----------------------------------------------- | ---------------------------------- |
| **`options`** | <code><a href="#updateurl">PerbaruiUrl</a></code> | berisi URL yang digunakan untuk memeriksa pembaruan. |

**Sejak:** 5.4.0

--------------------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Atur statsUrl untuk aplikasi, ini akan digunakan untuk mengirim statistik. Melewati string kosong akan menonaktifkan pengumpulan statistik.| Param | Ketik | Deskripsi |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | berisi URL yang digunakan untuk mengirim statistik. |

**Sejak:** 5.4.0

--------------------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Atur channelUrl untuk aplikasi, ini akan digunakan untuk mengatur saluran.

| Param | Ketik | Deskripsi |
| ------------- | ---------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">SaluranUrl</a></code> | berisi URL yang akan digunakan untuk menyetel saluran. |

**Sejak:** 5.4.0

--------------------


## unduh(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Unduh bundel baru dari URL yang disediakan, itu harus berupa file zip, dengan file di dalamnya atau dengan id unik di dalamnya dengan semua file Anda

| Param | Ketik | Deskripsi |
| ------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">UnduhOpsi</a></code> | {@link <a href="#downloadoptions">DownloadOptions</a>} untuk mendownload zip paket baru. |

**Pengembalian:** <code>Janji<<a href="#bundleinfo">BundleInfo</a>></code>

--------------------


## selanjutnya(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Atur paket berikutnya untuk digunakan saat aplikasi dimuat ulang.

| Param | Ketik | Deskripsi |
| ------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Berisi ID Bundel berikutnya yang akan ditetapkan pada peluncuran aplikasi berikutnya. {@link <a href="#bundleinfo">BundleInfo.id</a>} |

**Pengembalian:** <code>Janji<<a href="#bundleinfo">BundleInfo</a>></code>

--------------------


## mengatur(...)

```typescript
set(options: BundleId) => Promise<void>
```

Atur paket saat ini dan segera muat ulang aplikasi.| Param | Ketik | Deskripsi |
| ------------- | --------------------------------------------- | ---------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Objek {@link <a href="#bundleid">BundleId</a>} yang berisi id paket baru untuk ditetapkan sebagai yang terbaru. |

--------------------


## hapus(...)

```typescript
delete(options: BundleId) => Promise<void>
```

Menghapus paket tertentu dari penyimpanan aplikasi asli. Gunakan dengan {@link list} untuk mendapatkan ID Paket yang disimpan.

| Param | Ketik | Deskripsi |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Objek {@link <a href="#bundleid">BundleId</a>} berisi ID paket yang akan dihapus (perhatikan, ini adalah id paket, BUKAN nama versi) |

--------------------


## daftar(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Dapatkan semua bundel yang diunduh secara lokal di aplikasi Anda

| Param | Ketik | Deskripsi |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">Opsi Daftar</a></code> | {@link <a href="#listoptions">ListOptions</a>} untuk mencantumkan paket |

**Pengembalian:** <code>Janji<<a href="#bundlelistresult">BundleListResult</a>></code>

--------------------


## setel ulang(...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Setel ulang aplikasi ke paket `builtin` (yang dikirim ke Apple App Store / Google Play Store ) atau paket terakhir yang berhasil dimuat.

| Param | Ketik | Deskripsi |
| ------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Berisi {@link <a href="#resetoptions">ResetOptions.toLastSuccessful</a>}, `true` disetel ulang ke paket bawaan dan `false` akan disetel ulang ke paket terakhir yang berhasil dimuat. |

--------------------


## saat ini()

```typescript
current() => Promise<CurrentBundleResult>
```Dapatkan bundel saat ini, jika tidak ada yang disetel, ia akan mengembalikan `builtin`. currentNative adalah bundel asli yang diinstal pada perangkat

**Pengembalian:** <code>Janji<<a href="#currentbundleresult">CurrentBundleResult</a>></code>

--------------------


## muat ulang()

```typescript
reload() => Promise<void>
```

Muat ulang tampilan

--------------------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Menyetel array {@link <a href="#delaycondition">DelayCondition</a>} yang berisi ketentuan yang akan digunakan Plugin untuk menunda pembaruan.
Setelah semua kondisi terpenuhi, proses update akan berjalan kembali seperti biasa, sehingga update akan diinstal setelah aplikasi di-background atau dimatikan.
Untuk jenis `date`, nilainya harus berupa string tanggal iso8601.
Untuk jenis `background`, nilainya harus berupa angka dalam milidetik.
Untuk jenis `nativeVersion`, nilainya harus berupa nomor versi.
Untuk jenis `kill`, nilainya tidak digunakan.
Fungsi ini memiliki perilaku yang tidak konsisten, opsi kill memicu pembaruan setelah kill pertama dan bukan setelah latar belakang berikutnya seperti opsi lainnya. Ini akan diperbaiki dalam rilis besar mendatang.

| Param | Ketik | Deskripsi |
| ------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">Kondisi MultiDelay</a></code> | Berisi rangkaian kondisi {@link <a href="#multidelayconditions">MultiDelayConditions</a>} yang akan disetel |

**Sejak:** 4.3.0

--------------------


## batalkan Penundaan()

```typescript
cancelDelay() => Promise<void>
```

Membatalkan {@link <a href="#delaycondition">DelayCondition</a>} untuk segera memproses pembaruan.

**Sejak:** 4.0.0

--------------------


## dapatkanTerbaru(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Dapatkan bundel terbaru yang tersedia dari URL pembaruan

| Param | Ketik |
| ------------- | ---------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">DapatkanOpsi Terbaru</a></code> |

**Pengembalian:** <code>Janji<<a href="#latestversion">Versi Terbaru</a>></code>

**Sejak:** 4.0.0

--------------------


## setSaluran(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Menyetel saluran untuk perangkat ini. Saluran harus mengaktifkan `allow_device_self_set` agar dapat berfungsi.**Catatan penting:**
- Jangan gunakan metode ini untuk mengatur saluran saat boot. Gunakan `defaultChannel` di konfigurasi Capacitor Anda.
- Metode ini dimaksudkan untuk digunakan setelah aplikasi siap dan pengguna berinteraksi (misalnya, ikut serta dalam program beta).
- **Saluran publik tidak dapat ditetapkan sendiri.** Jika saluran ditandai sebagai `public`, memanggil `setChannel()` akan menghasilkan kesalahan. Untuk menggunakan saluran publik, hubungi `unsetChannel()` - perangkat akan otomatis kembali ke saluran publik yang cocok.
- Gunakan `listChannels()` untuk mengetahui saluran mana yang tersedia dan apakah saluran tersebut mengizinkan penetapan mandiri.

| Param | Ketik | Deskripsi |
| ------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">Set ChannelOptions</a></code> | Apakah saluran {@link <a href="#setchanneloptions">SetChannelOptions</a>} disetel |

**Pengembalian:** <code>Janji<<a href="#channelres">ChannelRes</a>></code>

**Sejak:** 4.7.0

--------------------


## tidak disetelSaluran(...)

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Batalkan setelan penggantian saluran untuk perangkat ini. Setelah memanggil metode ini, perangkat akan otomatis menerima pembaruan dari **saluran publik** yang sesuai dengan kondisinya (platform, jenis perangkat, jenis build).

Ini berguna ketika:
- Anda ingin memindahkan perangkat kembali ke jalur pembaruan default
- Anda ingin menggunakan saluran publik (karena saluran publik tidak dapat ditetapkan sendiri melalui `setChannel()`)

| Param | Ketik |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">Batalkan Opsi Saluran</a></code> |

**Sejak:** 4.7.0

--------------------


## dapatkanSaluran()

```typescript
getChannel() => Promise<GetChannelRes>
```

Dapatkan saluran untuk perangkat ini

**Pengembalian:** <code>Janji<<a href="#getchannelres">GetChannelRes</a>></code>

**Sejak:** 4.8.0

--------------------


## daftarSaluran()

```typescript
listChannels() => Promise<ListChannelsResult>
```

Daftar semua saluran yang tersedia untuk perangkat ini. Mengembalikan saluran yang kompatibel dengan lingkungan perangkat saat ini (platform, emulator/perangkat nyata, build dev/prod) dan bersifat publik atau mengizinkan penetapan mandiri.

Setiap saluran dalam hasilnya meliputi:
- `public`: Jika `true`, ini adalah **saluran default**. Anda tidak dapat menetapkannya sendiri menggunakan `setChannel()`. Sebaliknya, jika Anda menghapus penetapan saluran menggunakan `unsetChannel()`, perangkat akan otomatis menerima pembaruan dari saluran publik ini.
- `allow_self_set`: Jika `true`, ini adalah **saluran yang dapat ditetapkan sendiri**. Anda dapat secara eksplisit menetapkan perangkat ke saluran ini menggunakan `setChannel()`.

**Pengembalian:** <code>Janji<<a href="#listchannelsresult">ListChannelsResult</a>></code>

**Sejak:** 7.5.0

--------------------


## setCustomId(...)

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```Tetapkan ID khusus untuk perangkat ini

| Param | Ketik | Deskripsi |
| ------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | apakah {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId akan disetel |

**Sejak:** 4.9.0

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Dapatkan versi aplikasi asli atau versi bawaan jika disetel di konfigurasi

**Pengembalian:** <code>Janji<<a href="#builtinversion">BuiltinVersion</a>></code>

**Sejak:** 5.2.0

--------------------


## dapatkanIdPerangkat()

```typescript
getDeviceId() => Promise<DeviceId>
```

Dapatkan ID unik yang digunakan untuk mengidentifikasi perangkat (dikirim ke server pembaruan otomatis)

**Pengembalian:** <code>Janji<<a href="#deviceid">DeviceId</a>></code>

--------------------


## dapatkanVersi Plugin()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Dapatkan versi plugin Updater Capacitor asli (dikirim ke server pembaruan otomatis)

**Pengembalian:** <code>Janji<<a href="#pluginversion">Versi Plugin</a>></code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Dapatkan status konfigurasi pembaruan otomatis.

**Pengembalian:** <code>Janji<<a href="#autoupdateenabled">AutoUpdateEnabled</a>></code>

--------------------


## hapusSemua Pendengar()

```typescript
removeAllListeners() => Promise<void>
```

Hapus semua pendengar untuk plugin ini.

**Sejak:** 1.0.0

--------------------


## addListener('unduh', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan acara pengunduhan bundel di Aplikasi. Diaktifkan setelah pengunduhan dimulai, selama pengunduhan, dan setelah selesai.
Ini akan mengembalikan Anda semua persentase unduhan selama pengunduhan

| Param | Ketik |
| ---- | ------------------------------------------------------------- |
| **`eventName`** | <code>'unduh'</code> |
| **`listenerFunc`** | <code>(negara bagian: <a href="#downloadevent">DownloadEvent</a>) => void</code> |

**Pengembalian:** <code>Janji<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Sejak:** 2.0.11

--------------------


## addListener('tidak Perlu Pembaruan', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan tanpa perlu memperbarui acara, berguna saat Anda ingin memeriksa paksa setiap kali aplikasi diluncurkan

| Param | Ketik |
| ---- | ----------------------------------------------------------------------- |
| **`eventName`** | <code>'tidak Perlu Pembaruan'</code> |
| **`listenerFunc`** | <code>(negara bagian: <a href="#noneedevent">NoNeedEvent</a>) => void</code> |**Pengembalian:** <code>Janji<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Sejak:** 4.0.0

--------------------


## addListener('updateTersedia', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan acara pembaruan yang tersedia, berguna ketika Anda ingin memaksa pemeriksaan setiap kali aplikasi diluncurkan

| Param | Ketik |
| ---- | ------------------------------------------------------------------------------------------ |
| **`eventName`** | <code>'pembaruanTersedia'</code> |
| **`listenerFunc`** | <code>(negara bagian: <a href="#updateavailableevent">UpdateAvailableEvent</a>) => void</code> |

**Pengembalian:** <code>Janji<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Sejak:** 4.0.0

--------------------


## addListener('unduhSelesai', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan untuk mengunduh acara Lengkap.

| Param | Ketik |
| ---- | ------------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'unduhSelesai'</code> |
| **`listenerFunc`** | <code>(negara bagian: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) => void</code> |

**Pengembalian:** <code>Janji<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Sejak:** 4.0.0

--------------------


## addListener('MajorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan acara pembaruan besar di Aplikasi, beri tahu Anda ketika pembaruan besar diblokir dengan mengatur nonaktifkanAutoUpdateBreaking

| Param | Ketik |
| ---- | ---------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'majorAvailable'</code> |
| **`listenerFunc`** | <code>(negara bagian: <a href="#majoravailableevent">MajorAvailableEvent</a>) => void</code> |

**Pengembalian:** <code>Janji<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Sejak:** 2.3.0

--------------------


## addListener('updateGagal', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan peristiwa kegagalan pembaruan di Aplikasi, beri tahu Anda ketika pembaruan gagal dipasang pada permulaan aplikasi berikutnya

| Param | Ketik |
| ---- | ----------------------------------------------------------------------------------- |
| **`eventName`** | <code>'pembaruanGagal'</code> |
| **`listenerFunc`** | <code>(negara bagian: <a href="#updatefailedevent">UpdateFailedEvent</a>) => void</code> |**Pengembalian:** <code>Janji<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Sejak:** 2.3.0

--------------------


## addListener('unduhGagal', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan peristiwa kegagalan pengunduhan di Aplikasi, beri tahu Anda ketika pengunduhan bundel gagal

| Param | Ketik |
| ---- | ---------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'unduhGagal'</code> |
| **`listenerFunc`** | <code>(negara bagian: <a href="#downloadfailedevent">DownloadFailedEvent</a>) => void</code> |

**Pengembalian:** <code>Janji<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Sejak:** 4.0.0

--------------------


## addListener('aplikasiDimuat Ulang', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Dengarkan acara muat ulang di Aplikasi, beri tahu Anda saat memuat ulang telah terjadi

| Param | Ketik |
| ---- | -------------------------- |
| **`eventName`** | <code>'aplikasi Dimuat Ulang'</code> |
| **`listenerFunc`** | <code>() => batal</code> |

**Pengembalian:** <code>Janji<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Sejak:** 4.3.0

--------------------


## addListener('aplikasiSiap', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Dengarkan acara aplikasi siap di Aplikasi, beri tahu Anda saat aplikasi siap digunakan

| Param | Ketik |
| ---- | ------------------------------------------------------------- |
| **`eventName`** | <code>'aplikasiSiap'</code> |
| **`listenerFunc`** | <code>(negara bagian: <a href="#appreadyevent">AppReadyEvent</a>) => void</code> |

**Pengembalian:** <code>Janji<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Sejak:** 5.1.0

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Dapatkan jika pembaruan otomatis tersedia (tidak dinonaktifkan oleh serverUrl).

**Pengembalian:** <code>Janji<<a href="#autoupdateavailable">Pembaruan OtomatisTersedia</a>></code>

--------------------


## dapatkanBundleBerikutnya()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Dapatkan bundel berikutnya yang akan digunakan saat aplikasi dimuat ulang.
Mengembalikan null jika tidak ada bundel berikutnya yang disetel.

**Pengembalian:** <code>Janji<<a href="#bundleinfo">BundleInfo</a> | batal></code>

**Sejak:** 6.8.0

--------------------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Mengaktifkan atau menonaktifkan menu goyang untuk tujuan debugging/pengujian| Param | Ketik | Deskripsi |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> | Berisi boolean yang diaktifkan untuk mengaktifkan atau menonaktifkan menu goyang |

**Sejak:** 7.5.0

--------------------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Dapatkan status menu goyang saat ini

**Pengembalian:** <code>Janji<<a href="#shakemenuenabled">ShakeMenuEnabled</a>></code>

**Sejak:** 7.5.0

--------------------


## Antarmuka


### Hasil AppReady

| Prop | Ketik |
| ------------ | ---------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">Info Paket</a></code> |


### Info Paket

| Prop | Ketik |
| ---------------- | -------------------------------------- |
| **`id`** | <code>string</code> |
| **`version`** | <code>string</code> |
| **`downloaded`** | <code>string</code> |
| **`checksum`** | <code>string</code> |
| **`status`** | <code><a href="#bundlestatus">Status Paket</a></code> |


### PerbaruiUrl

| Prop | Ketik |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatistikUrl

| Prop | Ketik |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### SaluranUrl

| Prop | Ketik |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### Opsi Unduhan

URL dan versi ini digunakan untuk mengunduh bundel dari server, Jika Anda menggunakan backend semua informasi akan diberikan melalui metode getLatest.
Jika Anda tidak menggunakan backend, Anda perlu memberikan URL dan versi paket. Checksum dan sessionKey diperlukan jika Anda mengenkripsi bundel dengan perintah CLI mengenkripsi, Anda akan menerimanya sebagai hasil dari perintah tersebut.| Prop | Ketik | Deskripsi | Bawaan | Sejak |
| ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`** | <code>string</code> | URL file zip bundel (misalnya: dist.zip) yang akan diunduh. (Ini bisa berupa URL apa pun. Misalnya: Amazon S3, tag GitHub, tempat lain tempat Anda menghosting paket Anda.) |                        |       |
| **`version`** | <code>string</code> | Kode versi/nama bundel/versi ini |                        |       |
| **`sessionKey`** | <code>string</code> | Kunci sesi untuk pembaruan, ketika bundel dienkripsi dengan kunci sesi | <code>tidak terdefinisi</code> | 4.0.0 |
| **`checksum`** | <code>string</code> | Checksum untuk pembaruan, harus dalam sha256 dan dienkripsi dengan kunci pribadi jika bundel dienkripsi | <code>tidak terdefinisi</code> | 4.0.0 |
| **`manifest`** | <code>ManifestEntry[]</code> | Manifes untuk unduhan multi-file Delta (manifest) | <code>tidak terdefinisi</code> | 6.1.0 |


### Entri Manifes

| Prop | Ketik |
| ---- | --------------------------- |
| **`file_name`** | <code>string \| null</code> |
| **`file_hash`** | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### BundelId

| Prop | Ketik |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### Hasil Daftar Bundel

| Prop | Ketik |
| ------------- | ------------------------- |
| **`bundles`** | <code>Info Paket[]</code> |


### Opsi Daftar| Prop | Ketik | Deskripsi | Bawaan | Sejak |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---- | ------ |
| **`raw`** | <code>boolean</code> | Apakah akan mengembalikan daftar paket mentah atau manifes. Jika benar, daftar tersebut akan mencoba membaca database internal, bukan file di disk. | <code>false</code> | 6.14.0 |


### Opsi Reset

| Prop | Ketik |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### Hasil Bundel Saat Ini

| Prop | Ketik |
| ------------ | ---------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">Info Paket</a></code> |
| **`native`** | <code>string</code> |


### Kondisi MultiDelay

| Prop | Ketik |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>Kondisi Penundaan[]</code> |


### Kondisi Penundaan

| Prop | Ketik | Deskripsi |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`** | <code><a href="#delayuntilnext">Tunda Hingga Berikutnya</a></code> | Atur kondisi penundaan di setMultiDelay |
| **`value`** | <code>string</code> |                                          |


### Versi Terbaru| Prop | Ketik | Deskripsi | Sejak |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Hasil dari metode getLatest | 4.0.0 |
| **`checksum`** | <code>string</code> |                            | 6 |
| **`major`** | <code>boolean</code> |                            |       |
| **`message`** | <code>string</code> |                            |       |
| **`sessionKey`** | <code>string</code> |                            |       |
| **`error`** | <code>string</code> |                            |       |
| **`old`** | <code>string</code> |                            |       |
| **`url`** | <code>string</code> |                            |       |
| **`manifest`** | <code>ManifestEntri[]</code> |                            | 6.1 |


### Dapatkan Opsi Terbaru

| Prop | Ketik | Deskripsi | Bawaan | Sejak |
| ------------- | ------------------- | --------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | Saluran untuk mendapatkan versi terbaru Saluran harus mengizinkan 'self_assign' agar ini berfungsi | <code>tidak terdefinisi</code> | 6.8.0 |


### Res Saluran

| Prop | Ketik | Deskripsi | Sejak |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`** | <code>string</code> | Status saluran yang disetel saat ini | 4.7.0 |
| **`error`** | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### Setel Opsi Saluran

| Prop | Ketik |
| ----------------------- | -------------------- |
| **`channel`** | <code>string</code> |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### Batalkan Penyetelan Opsi Saluran

| Prop | Ketik |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### Dapatkan ChannelRes| Prop | Ketik | Deskripsi | Sejak |
| -------------- | -------------------- | ----------------------------- | ----- |
| **`channel`** | <code>string</code> | Status saluran dapatkan saat ini | 4.8.0 |
| **`error`** | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |
| **`status`** | <code>string</code> |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


### DaftarSaluranHasil

| Prop | Ketik | Deskripsi | Sejak |
| -------------- | -------------------------- | -------------------------- | ----- |
| **`channels`** | <code>Info Saluran[]</code> | Daftar saluran yang tersedia | 7.5.0 |


### Info Saluran

| Prop | Ketik | Deskripsi | Sejak |
| -------------------- | -------------------- | ----------------------------------------------- | ----- |
| **`id`** | <code>string</code> | ID saluran | 7.5.0 |
| **`name`** | <code>string</code> | Nama saluran | 7.5.0 |
| **`public`** | <code>boolean</code> | Jika benar, ini adalah saluran default/fallback. Perangkat tidak dapat menetapkan sendiri ke saluran publik. Sebaliknya, ketika perangkat menghapus penggantian salurannya (menggunakan `unsetChannel()`), perangkat akan secara otomatis menerima pembaruan dari saluran publik yang cocok. | 7.5.0 |
| **`allow_self_set`** | <code>boolean</code> | Jika benar, perangkat dapat secara eksplisit menetapkan sendiri saluran ini menggunakan `setChannel()`. Ini biasanya digunakan untuk pengujian beta, pengujian A/B, atau jalur pembaruan keikutsertaan. | 7.5.0 |


### SetelOpsiIdKustom

| Prop | Ketik |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### Versi Bawaan

| Prop | Ketik |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### ID Perangkat

| Prop | Ketik |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### Versi Plugin

| Prop | Ketik |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### Pembaruan Otomatis Diaktifkan

| Prop | Ketik |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| Prop | Ketik |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() => Janji<void></code> |


### Unduh Acara| Prop | Ketik | Deskripsi | Sejak |
| ------------ | ---------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">Info Paket</a></code> | Dipancarkan saat aplikasi siap digunakan. | 5.2.0 |
| **`status`** | <code>string</code> |                                       |       |


### Pembaruan Otomatis Tersedia

| Prop | Ketik |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


### SetelShakeMenuOptions

| Prop | Ketik |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### ShakeMenu Diaktifkan

| Prop | Ketik |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


## Ketik Alias


### Status Paket

tertunda: Paket tertunda untuk dijadikan **SET** sebagai paket berikutnya.
mengunduh: Bundel sedang diunduh.
sukses: Bundel telah diunduh dan siap **SET** sebagai bundel berikutnya.
kesalahan: Bundel gagal diunduh.

<code>'sukses' | 'kesalahan' | 'menunggu keputusan' | 'mengunduh'</code>


### Tunda Hingga Berikutnya

<code>'latar belakang' | 'membunuh' | 'Versi asli' | 'tanggal'</code>

</docgen-api>
