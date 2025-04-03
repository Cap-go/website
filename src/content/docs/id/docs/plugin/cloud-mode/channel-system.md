---
title: Sistem Channel
description: Cara menggunakan capacitor-updater dan sistem channel
sidebar:
  order: 6
locale: id
---

Capgo dan capacitor-updater hadir dengan sistem channel yang canggih

## Apa yang dapat Anda lakukan dengan channel:

* Menghubungkan perangkat ke channel untuk pengembangan, uji beta
* Menggunakan satu channel per cabang pengembangan dan membiarkan tim Anda mengatur sendiri dari ponsel untuk pengujian

## Menugaskan perangkat ke channel:

* Jadikan channel sebagai default, setiap kali perangkat baru meminta pembaruan ke Capgo, channel ini akan merespons
* Kirim **deviceId** (dengan metode [**getDeviceId**](/docs/plugin/api#getdeviceid)) ke backend Anda dan tugaskan dengan API publik Capgo
* Buat channel dapat ditugaskan sendiri (dengan metode [**setChannel**](/docs/plugin/api#setchannel)), dan biarkan perangkat berlangganan ke channel (dengan atau tanpa interaksi pengguna) dengan metode `setChannel` dari plugin
* Gunakan opsi `defaultChannel` dalam [config](/docs/plugin/settings#defaultchannel) untuk mengatur channel default untuk semua perangkat dengan konfigurasi plugin ini

:::note
Anda juga dapat menugaskan perangkat langsung ke bundle
:::

## Opsi Channel

<figure><img src="/channel_setting_1webp" alt=""><figcaption></figcaption></figure>

Detail setiap opsi:

| Opsi                                    | Deskripsi                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Disable auto downgrade under native** | Tidak mengirim pembaruan jika versi native aplikasi lebih besar dari versi channel                    |
| **Disable auto upgrade above major**    | Tidak mengirim pembaruan jika versi native aplikasi lebih rendah dari Major (**1**23) dari versi channel |
| **Disable auto upgrade above minor**    | Tidak mengirim pembaruan jika versi native aplikasi lebih rendah dari minor (1**2**3) dari versi channel |
| **Allow the device to self-assign**     | Mengizinkan perangkat menggunakan metode `setChannel` ke channel ini                                   |
| **IOS**                                 | Mengizinkan perangkat IOS untuk mengunduh pembaruan dari channel ini                                   |
| **Android**                             | Mengizinkan perangkat Android untuk mengunduh pembaruan dari channel ini                               |
| **Allow Emulator**                      | Mengizinkan emulator untuk menerima pembaruan dari channel ini                                         |
| **Allow development build**             | Mengizinkan build pengembangan untuk menerima pembaruan dari channel ini                               |

:::note
Capgo melakukan beberapa penyaringan otomatis untuk Anda. Jika Anda memiliki CI/CD yang dikonfigurasi untuk mengirim versi Anda ke Google Play, Google Play akan menjalankan aplikasi Anda setiap kali ke 20+ perangkat nyata. Selama 4 jam pertama bundle baru, kami akan memblokir IP pusat data Google untuk mencegah mereka dihitung dalam statistik Anda
:::

:::note
Capgo **tidak** menghitung emulator dan build pengembangan dalam penggunaan Anda, tetapi perlu diingat bahwa Anda tidak dapat memiliki lebih dari 3% dari keduanya, atau akun Anda akan dikunci sampai Anda memperbaikinya
:::