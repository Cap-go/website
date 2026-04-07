---
title: Enkripsi
description: Cara mengenkripsi data Anda dengan enkripsi baru
sidebar:
  order: 5
locale: id
---

Dokumentasi ini akan menjelaskan cara mengenkripsi data Anda dengan sistem enkripsi baru dan menghapus yang lama

Pelajari lebih lanjut tentang sistem enkripsi baru di [blog post](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing)

---

Pertama, buat pasangan kunci baru dengan perintah berikut:

```bash
npx @capgo/cli key create
```

Perintah ini akan membuat pasangan kunci baru di aplikasi Anda; sangat penting untuk menyimpan kunci pribadi di tempat yang aman. Jangan pernah menyimpan kunci pribadi ke kontrol sumber atau membagikannya dengan pihak yang tidak terpercaya

Perintah ini juga akan menghapus kunci lama dari konfigurasi Capacitor Anda, tetapi tidak akan menghapus file kunci lama. CLI menyimpannya agar Anda dapat terus mengirim pembaruan langsung untuk aplikasi yang belum menerima pembaruan app store dan masih menggunakan plugin lama. Ini memfasilitasi proses migrasi

Ketika Anda ditanya oleh migrasi, "Apakah Anda ingin mengatur enkripsi dengan channel baru untuk mendukung aplikasi lama dan memfasilitasi migrasi?", silakan setuju. Ini akan menambahkan opsi "defaultChannel" baru ke konfigurasi Capacitor Anda. Ini akan membuat aplikasi Anda menggunakan channel "encryption_v2". Ini akan memastikan bahwa enkripsi baru hanya digunakan oleh aplikasi yang mendukungnya. Aplikasi yang belum menerima pembaruan app store akan terus menggunakan channel default sebelumnya

---

Sekarang, Anda perlu membangun bundle JS Anda dan mengunggahnya ke channel baru. Silakan jalankan perintah berikut:

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

---

Kemudian, jalankan perintah ini untuk mengizinkan aplikasi melakukan self-assign ke channel "encryption_v2"

:::caution
Ini diperlukan agar opsi "defaultChannel" baru dapat berfungsi
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

---

Anda sekarang dapat menjalankan aplikasi; aplikasi akan menggunakan sistem enkripsi baru

Untuk mengunggah bundle JS baru ke channel lama, Anda hanya perlu menjalankan perintah berikut:

```bash
npx @capgo/cli bundle upload --channel production
```

---

Anda tidak perlu khawatir tentang konfigurasi Capacitor, karena tidak pernah diunggah ke Capgo

Ketika semua pengguna telah memperbarui aplikasi mereka (bisa memakan waktu hingga 3/4 bulan), Anda dapat menghapus "defaultChannel" dari konfigurasi Capacitor Anda

Dan kemudian, Anda dapat menghapus channel lama dengan perintah berikut:

```bash
npx @capgo/cli channel delete encryption_v2
```

---

Setelah menghapus channel "encryption_v2", semua aplikasi yang menggunakannya sebagai default akan mulai menggunakan channel "production"