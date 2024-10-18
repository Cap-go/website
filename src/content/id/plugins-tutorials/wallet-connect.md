---
locale: id
---

Tindak lanjut @capgo/walletconnect Paket

Paket `@capgo/walletconnect` menyediakan fungsionalitas untuk mengintegrasikan WalletConnect ke dalam aplikasi Ionic Capacitor Anda. WalletConnect adalah protokol terbuka yang memungkinkan aplikasi terdesentralisasi (dApps) untuk terhubung dengan dompet seluler menggunakan kode QR terenkripsi.

Untuk memulai dengan menggunakan paket `@capgo/walletconnect` dalam aplikasi Anda, ikuti langkah-langkah di bawah ini:

## Langkah 1: Instal Paket

[[BLOK_KODE]]

## Langkah 2: Impor Paket

Di file TypeScript Anda di mana Anda ingin menggunakan fungsionalitas `WalletConnect`, impor paket tersebut:

[[BLOK_KODE]]

## Langkah 3: Buat Sesi WalletConnect

Untuk membuat sesi WalletConnect, gunakan metode `WalletConnectcreateSession()`. Ini akan membuka pemindai kode QR di mana pengguna dapat memindai kode QR yang disediakan oleh dApp.

[[BLOK_KODE]]

## Langkah 4: Dengarkan Acara Sesi

Untuk mendengarkan acara terkait sesi WalletConnect, gunakan metode `WalletConnectaddListener()`. Nama-nama acara yang dapat Anda dengarkan adalah:

- `sessionRequest`: Ditrigger saat permintaan sesi diterima dari dompet seluler.
- `sessionApproved`: Ditrigger saat permintaan sesi disetujui oleh pengguna.
- `sessionConnected`: Ditrigger saat sesi berhasil terhubung.
- `sessionDisconnected`: Ditrigger saat sesi terputus.

[[BLOK_KODE]]

## Langkah 5: Setujui Permintaan Sesi

Saat permintaan sesi diterima, Anda dapat menyetujuinya dengan memanggil metode `WalletConnectapproveSession()`.

[[BLOK_KODE]]

## Langkah 6: Dapatkan Sesi

Untuk mendapatkan objek sesi saat ini, gunakan metode `WalletConnectgetSession()`.

[[BLOK_KODE]]

## Langkah 7: Putuskan Sesi

Untuk memutuskan sesi saat ini, gunakan metode `WalletConnectdisconnectSession()`.

[[BLOK_KODE]]

Itu dia! Anda sekarang telah berhasil mengintegrasikan paket `@capgo/walletconnect` ke dalam aplikasi Ionic Capacitor Anda dan dapat menggunakan fungsionalitas WalletConnect.

Catatan: Langkah-langkah di atas memberikan gambaran dasar tentang penggunaan paket `@capgo/walletconnect`. Untuk fungsionalitas dan opsi yang lebih mendetail, acuan pada dokumentasi paket tersebut. Sayangnya, saya tidak memiliki informasi yang diperlukan untuk menghasilkan tutorial untuk menggunakan paket `@capgo/ngx-intl-tel-input-app`.