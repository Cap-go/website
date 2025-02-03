---
title: Sistem saluran
description: Cara menggunakan sistem saluran dengan capacitor-updater
sidebar:
  order: 6
locale: id
---

Capgo dan capacitor-updater hadir dengan sistem saluran yang kuat

## Apa yang bisa Anda lakukan dengan saluran:

* Menghubungkan perangkat ke saluran untuk pengembangan, uji beta
* Gunakan satu saluran per cabang pengembangan dan biarkan tim Anda mengatur sendiri dari ponsel untuk pengujian

## Menetapkan perangkat ke saluran:

* Jadikan saluran default, setiap kali perangkat baru meminta pembaruan ke Capgo saluran ini akan merespons
* Kirim **deviceId** (dengan metode [**getDeviceId**](/docs/plugin/api#getdeviceid)) ke backend Anda dan tetapkan dengan API publik Capgo
* Jadikan saluran dapat diatur sendiri (dengan metode [**setChannel**](/docs/plugin/api#setchannel)), dan biarkan perangkat berlangganan ke saluran (dengan atau tanpa interaksi pengguna) dengan metode `setChannel` dari plugin
* Gunakan opsi `defaultChannel` di [config](/docs/plugin/settings#defaultchannel) untuk mengatur saluran default untuk semua perangkat dengan konfigurasi plugin ini

:::note
Anda juga dapat menetapkan perangkat langsung ke bundel
:::

## Opsi Saluran

<figure><img src="/channel_setting_1webp" alt=""><figcaption></figcaption></figure>

Detail setiap opsi:

| Opsi                                    | Deskripsi                                                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Nonaktifkan penurunan otomatis di bawah native** | Tidak mengirim pembaruan jika versi native aplikasi lebih besar dari versi saluran                |
| **Nonaktifkan peningkatan otomatis di atas major** | Tidak mengirim pembaruan jika versi native aplikasi lebih rendah dari Major (**1**23) dari versi saluran |
| **Nonaktifkan peningkatan otomatis di atas minor** | Tidak mengirim pembaruan jika versi native aplikasi lebih rendah dari minor (1**2**3) dari versi saluran |
| **Izinkan perangkat untuk mengatur sendiri** | Biarkan perangkat menggunakan metode `setChannel` ke saluran ini                                   |
| **IOS**                                 | Izinkan perangkat IOS untuk mengunduh pembaruan dari saluran ini                                      |
| **Android**                             | Izinkan perangkat Android untuk mengunduh pembaruan dari saluran ini                                  |
| **Izinkan Emulator**                    | Izinkan emulator untuk menerima pembaruan dari saluran ini                                           |
| **Izinkan build pengembangan**          | Izinkan build pengembangan untuk menerima pembaruan dari saluran ini                                 |

:::note
Capgo melakukan beberapa penyaringan otomatis untuk Anda Jika Anda memiliki CI/CD yang dikonfigurasi untuk mengirim versi Anda ke Google Play, Google Play akan menjalankan aplikasi Anda setiap kali ke 20+ perangkat nyata Selama 4 jam pertama bundel baru, kami akan memblokir IP pusat data Google untuk mencegah mereka dihitung dalam statistik Anda
:::

:::note
Capgo **tidak** menghitung emulator dan build pengembangan dalam penggunaan Anda, tetapi perlu diingat bahwa Anda tidak dapat memiliki lebih dari 3% dari mereka, atau akun Anda akan dikunci sampai Anda memperbaikinya
:::