---
slug: a-brand-new-organization-system
title: Sistem organisasi yang sepenuhnya baru
description: >-
  Sebuah latar belakang tentang bagaimana tim capgo menambahkan sistem
  organisasi
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Ilustrasi sistem organisasi Capgo
keywords: >-
  organization system, capgo, mobile app development, software engineering,
  backend development
tag: Story
published: true
locale: id
next_blog: ''
---
## Pengenalan

Hai, saya adalah [WcaleNieWolny](https://github.com/WcaleNieWolny/WcaleNieWolny) - insinyur perangkat lunak utama Capgo.

Selama 8 bulan terakhir, saya telah mengembangkan [sistem organisasi](/docs/webapp/organization-system/), dan mulai 14 April, saya dengan senang hati mengumumkan bahwa sistem tersebut telah selesai 🎉 🎊

Akhirnya, setelah 8 bulan, setiap bagian dari Capgo dapat diakses oleh anggota organisasi. Ini termasuk:
 - aplikasi
 - statistik
 - penagihan
 - dukungan CLI penuh
 - dan masih banyak lagi!

Tidak mudah untuk sampai di sini; telah ada 3 revisi besar dari sistem.

## Organisasi v1

Awal mula cukup sulit... Awalnya, saya mulai bekerja pada proyek ini 2 minggu setelah bergabung. 
Pada saat itu, saya memiliki sedikit atau tidak ada pengetahuan tentang kode sumber atau ide yang lebih besar tentang bagaimana mengimplementasikannya.

Hal ini mengarah pada penerapan solusi yang paling akal-akalan yang hanya mendukung akses ke aplikasi, saluran, dan versi.
Ini bahkan tidak memungkinkan pengguna yang diundang untuk mengakses statistik.

Dan kemudian saya menunggu Martin untuk meninjau ini. Saya menunggu dan menunggu, tetapi tidak ada yang benar-benar terjadi. 3 bulan kemudian, saya memutuskan untuk kembali ke masalah ini dan memperbaiki semua konflik penggabungan. Saya juga memutuskan untuk menguji, yang ternyata menjadi ide yang bagus.
Tanpa kejutan, solusi akal-akalan tersebut benar-benar gagal. Saat itu, saya memutuskan untuk memperbaiki semua bug dan menulis pengujian E2E yang komprehensif.
Saya harus bekerja dengan kode yang sangat rusak dan banyak keputusan buruk yang dibuat oleh diri saya di masa lalu, tetapi setelah 2 minggu yang sulit, saya akhirnya berhasil mendapatkan fungsinya.

Namun, itu tidak berarti bahwa itu sempurna. Pemilik organisasi masih memiliki akses yang jauh lebih banyak daripada bahkan pengguna yang diundang tertinggi. Pengalaman pengguna juga cukup kurang. Pengguna yang diundang bahkan tidak dapat melihat statistik aplikasi, mengelola penagihan, dan CLI dibatasi hanya untuk mengunggah.

Meskipun semua tantangan itu, Martin telah meninjau PR, dan seminggu kemudian, itu didorong ke produksi.

## Organisasi v2

Sistem organisasi berjalan cukup baik meskipun semua tantangan tersebut. Pengguna menggunakannya, dan itu benar-benar mendorong seluruh proyek maju. Namun, saya masih harus:
 - memperbaiki kekacauan yang dibuat dalam [keamanan tingkat baris](https://supabase.com/docs/guides/auth/row-level-security)
 - menambahkan dukungan untuk seluruh CLI
 - memastikan bahwa pengguna admin memiliki akses yang sama dengan pemilik

Setelah [banyak diskusi](https://github.com/Cap-go/capgo/issues/564) dengan Martin, kami memutuskan bahwa cara terbaik untuk maju adalah menulis ulang seluruh aturan keamanan dan memindahkan semua kepemilikan sumber daya ke organisasi dan bukan pengguna.
Ini akan memungkinkan integrasi yang lebih mudah dengan sistem organisasi yang baru, dan juga akan menghapus banyak kode warisan.

Menulis kode RLS yang baru sangat melelahkan, tetapi setelah satu setengah minggu, seluruh migrasi siap.

Namun kali ini, kami memutuskan untuk tidak menulis pengujian E2E, yang berarti kami harus mengujinya secara manual. Setelah 3 panggilan yang sangat ekstensif bersama-sama, Martin dan saya akhirnya memutuskan untuk mendorong ke produksi dan berharap itu berjalan dengan baik 🙏

Ternyata tidak... Ternyata saya membuat registrasi pengguna rusak, dan pengguna baru tidak dapat membuat akun 😅

Setelah panggilan panik yang cepat, saya segera mendorong beberapa perubahan ke produksi dan pergi tidur. Sayangnya, perubahan saya hanya menciptakan lebih banyak masalah 😰

Setelah saya bangun, saya menemukan bahwa pengguna memiliki banyak organisasi kosong. Ini tidak seharusnya terjadi karena hanya 1 organisasi yang harus diizinkan per pengguna. Diperlukan waktu untuk berpikir untuk menghapus semua organisasi duplikat yang kosong, tetapi terlepas dari itu, perubahan berjalan cukup lancar.

## Organisasi v3

Bahkan ini masih belum cukup. Masih ada komponen besar yang hilang - penagihan.

Sejauh ini hanya pemilik yang dapat mengelola penagihan. Ini telah menciptakan beberapa masalah menarik di mana seorang pengguna membeli rencana berpikir dia membelinya untuk organisasi. 
Kami dengan cepat memperbaiki masalah tersebut secara manual dan saat itulah kami memutuskan bahwa masalah ini tidak dapat diterima.

Migrasi berjalan cukup lancar. Ini membutuhkan waktu satu minggu kerja tetapi dibandingkan dengan V1 dan V2, itu sebenarnya tidak terlalu sulit 🚀

## Organisasi v4 - masa depan

Setelah semua kerja keras ini saya rasa sudah saatnya untuk fokus pada hal lain untuk sekarang 😎

Ini tidak mudah tetapi saya belajar banyak dan Capgo telah menerima fitur yang sangat baik dan penting.
Saya masih harus mendepresiasi fungsi warisan, meningkatkan pengalaman pengguna webapp, memantau bug, 
tetapi tidak seharusnya ada perubahan besar pada sistem ini.


<br>

Terima kasih telah membaca 🚀
