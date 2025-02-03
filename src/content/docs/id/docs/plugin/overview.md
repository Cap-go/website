---
title: Gambaran Umum
description: Penjelasan tentang dua pendekatan berbeda
sidebar:
  order: 1
locale: id
---

### Mode Cloud (Direkomendasikan)
Mode Cloud adalah pilihan yang kami rekomendasikan untuk pengelolaan pembaruan tanpa masalah. Backend Capgo menangani semua logika pembaruan, membuat keputusan tentang pembaruan di sisi server untuk keamanan dan kontrol yang lebih baik. Mode ini mengutamakan kemudahan penggunaan: setelah diatur, berjalan dengan lancar secara mandiri, menawarkan fitur lanjutan seperti statistik, dan kanal. Mode ini juga dapat diatur dalam mode manual sehingga memberikan Anda kontrol lebih besar, memungkinkan Anda memutuskan kapan akan memperbarui menggunakan kode JavaScript Anda. Backend tetap mengelola apa yang diperbarui. Mode ini berbagi banyak manfaat dengan Mode Auto, terutama dalam keamanan dan fitur lanjutan, tetapi menambahkan fleksibilitas waktu pembaruan sesuai keinginan Anda.

### Mode Self Hosted

Mode Self-Hosted Auto adalah untuk mereka yang ingin menangani semua logika pembaruan di server mereka sendiri. Mode ini menawarkan otonomi penuh tetapi memerlukan server terpisah dan lebih banyak pekerjaan untuk mengelola pembaruan dan persyaratan server.

Mode Self-Hosted Manual menggabungkan kontrol dan otonomi. Anda memutuskan kapan akan memperbarui melalui JavaScript, tetapi server Anda menangani apa yang diperbarui. Ini agak kompleks karena Anda menyertakan kode pembaruan dalam pembaruan.

:::note
Jika Anda memilih untuk self host, Anda akan kehilangan semua fitur hebat yang ditawarkan oleh capgo cloud seperti: auto reverts, peringatan email, kanal, statistik, enkripsi dan lainnya.
:::

:::danger
Jika Anda mengirim pembaruan yang buruk kepada pengguna Anda, Anda dapat dan akan merusak aplikasi mereka.
:::