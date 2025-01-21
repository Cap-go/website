---
locale: id
---

Menggunakan @capgo/cli untuk Mengunggah dan Mengunduh File ke Capgo Cloud

[@capgo/cli](https://wwwnpmjscom/package/@capgo/cli/) adalah alat antarmuka baris perintah (CLI) yang memungkinkan Anda untuk mengunggah dan mengunduh file ke dan dari Capgo Cloud Dalam tutorial ini, kami akan menjelaskan langkah-langkah untuk menggunakan @capgo/cli untuk mengelola file di Capgo Cloud

### Langkah 1: Pendaftaran

Sebelum menggunakan @capgo/cli, Anda perlu mendaftar akun di [capgoapp](https://capgoapp/) dan mendapatkan kunci API Anda

### Langkah 2: Instalasi

Untuk menginstal @capgo/cli, buka terminal Anda dan jalankan perintah berikut:

[[BLOK_KODE]]

### Langkah 3: Masuk ke Capgo Cloud

Untuk masuk ke Capgo Cloud menggunakan @capgo/cli, jalankan perintah berikut:

[[BLOK_KODE]]

Gantilah `[apikey]` dengan kunci API Anda yang didapat selama pendaftaran Sebagai opsi, Anda dapat menggunakan flag `--local` untuk menyimpan kunci API di folder lokal

### Langkah 4: Menambahkan aplikasi baru ke Capgo Cloud

Untuk menambahkan aplikasi baru ke Capgo Cloud, gunakan perintah berikut:

[[BLOK_KODE]]

Gantilah `[appId]` dengan ID aplikasi Anda dalam format `comtestapp` Anda juga dapat menggunakan flag `--icon`, `--name`, dan `--apikey` untuk menyesuaikan ikon, nama, dan kunci API untuk aplikasi tersebut

### Langkah 5: Mengunggah versi ke Capgo Cloud

Untuk mengunggah versi aplikasi Anda ke Capgo Cloud, jalankan perintah berikut:

[[BLOK_KODE]]

Gantilah `[appId]` dengan ID aplikasi Anda Anda dapat menggunakan flag `--apikey`, `--path`, `--channel`, `--external`, `--key`, `--key-data`, `--no-key`, `--bundle`, dan `--iv-session-key` untuk menyesuaikan opsi unggahan

### Langkah 6: Mengelola saluran

Anda dapat membuat dan menghapus saluran di Capgo Cloud menggunakan @capgo/cli 

Untuk menambahkan saluran baru, gunakan perintah:

[[BLOK_KODE]]

Gantilah `[channelId]` dengan nama saluran baru dan `[appId]` dengan ID aplikasi Anda

Untuk menghapus saluran, gunakan perintah:

[[BLOK_KODE]]

Gantilah `[channelId]` dengan nama saluran yang akan dihapus dan `[appId]` dengan ID aplikasi Anda

### Langkah 7: Enkripsi End-to-End

@capgo/cli mendukung enkripsi end-to-end untuk kode Anda Anda dapat menghasilkan pasangan kunci RSA menggunakan perintah berikut:

[[BLOK_KODE]]

Anda dapat menyimpan kunci privat di konfigurasi aplikasi Anda dengan menjalankan:

[[BLOK_KODE]]

Untuk mengenkripsi file zip dengan kunci Anda, gunakan perintah:

[[BLOK_KODE]]

Untuk mendekripsi file zip dengan kunci Anda, gunakan perintah:

[[BLOK_KODE]]

Gantilah `[path/to/zip]` dan `[ivSessionKey]` dengan nilai yang sesuai

### Kesimpulan

Dalam tutorial ini, kami telah belajar bagaimana menggunakan @capgo/cli untuk mengunggah dan mengunduh file ke dan dari Capgo Cloud @capgo/cli menyediakan antarmuka baris perintah yang nyaman untuk mengelola versi aplikasi dan saluran Anda Untuk informasi lebih lanjut, silakan merujuk ke [dokumentasi](https://capgoapp/docs/) resmi