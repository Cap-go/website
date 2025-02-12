---
locale: id
---

Tutorial Paket `@capgo/inappbrowser`

Paket `@capgo/inappbrowser` adalah plugin Capacitor yang memungkinkan Anda membuka URL di jendela browser dalam aplikasi. Berikut adalah panduan langkah demi langkah tentang cara menggunakan paket ini:

## Instalasi

Untuk menginstal paket, jalankan perintah berikut di direktori root proyek Anda:

[[BLOK_KODE]]

## Penggunaan

1. Impor kelas `InAppBrowser` dari paket `@capgo/inappbrowser`:

   [[BLOK_KODE]]

2. Gunakan metode `InAppBrowser.open` untuk membuka URL di jendela fullscreen baru:

   [[BLOK_KODE]]

   Ganti `"YOUR_URL"` dengan URL yang ingin Anda buka

3. Anda juga dapat menggunakan metode lain yang disediakan oleh kelas `InAppBrowser`:

   - `clearCookies`: Hapus semua cookie
   - `close`: Tutup jendela browser dalam aplikasi
   - `openWebView`: Buka URL di webview baru dengan toolbar
   - `setUrl`: Atur URL dari browser dalam aplikasi

   Lihat bagian API di bawah untuk informasi lebih lanjut tentang metode ini

## API

Paket `@capgo/inappbrowser` menyediakan metode API berikut:

- `open(options: OpenOptions)`: Buka URL di jendela fullscreen baru. Menerima objek `OpenOptions` sebagai parameter
- `clearCookies()`: Hapus semua cookie
- `close()`: Tutup jendela browser dalam aplikasi
- `openWebView(options: OpenWebViewOptions)`: Buka URL di webview baru dengan toolbar. Menerima objek `OpenWebViewOptions` sebagai parameter
- `setUrl(options: { url: string; })`: Atur URL dari browser dalam aplikasi. Menerima objek dengan properti `url` sebagai parameter
- `addListener('urlChangeEvent', listenerFunc: UrlChangeListener)`: Dengarkan peristiwa perubahan URL. Menerima fungsi `UrlChangeListener` sebagai parameter
- `addListener('closeEvent', listenerFunc: UrlChangeListener)`: Dengarkan peristiwa penutupan. Menerima fungsi `UrlChangeListener` sebagai parameter
- `addListener('confirmBtnClicked', listenerFunc: UrlChangeListener)`: Dengarkan peristiwa klik tombol konfirmasi. Menerima fungsi `UrlChangeListener` sebagai parameter
- `removeAllListeners()`: Hapus semua pendengar peristiwa

Untuk informasi lebih lanjut tentang parameter dan nilai kembali dari metode ini, lihat dokumentasi paket

Dan itu saja! Anda telah belajar cara menggunakan paket `@capgo/inappbrowser` untuk membuka URL di jendela browser dalam aplikasi di Capacitor. Selamat coding!