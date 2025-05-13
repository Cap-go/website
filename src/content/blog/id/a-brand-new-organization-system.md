---
slug: a-brand-new-organization-system
title: Un nouveau système d'organisation
description: Kisah di balik bagaimana tim capgo menambahkan sistem organisasi
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
## Penganalan

Hai, saya [WcaleNieWolny](https://github.com/WcaleNieWolny) - insinyur perangkat lunak utama Capgo.

Selama 8 bulan terakhir, saya telah mengembangkan [sistem organisasi](/docs/webapp/organization-system/), dan per 14 April, saya dengan senang hati mengumumkan bahwa sistem telah selesai 🎉 🎊

Akhirnya, setelah 8 bulan, setiap bagian dari Capgo dapat diakses oleh anggota organisasi. Ini termasuk:
 - aplikasi
 - statistik
 - penagihan
 - dukungan CLI penuh
 - dan masih banyak lagi!

Tidak mudah untuk sampai di sini; ada 3 revisi besar dari sistem.

## Organisasi v1

Awalnya sangat sulit... Awalnya, saya mulai mengerjakan ini 2 minggu setelah bergabung dengan proyek.
Saat itu, saya memiliki sedikit atau tidak ada pengetahuan tentang basis kode atau ide yang lebih besar tentang cara mengimplementasikan ini.

Hal ini menyebabkan implementasi solusi yang sangat rumit yang hanya mendukung akses ke aplikasi, channel, dan versi.
Bahkan tidak memungkinkan pengguna yang diundang untuk mengakses statistik.

Dan kemudian saya menunggu Martin untuk meninjau ini. Saya menunggu dan menunggu, tapi tidak ada yang terjadi. 3 bulan kemudian, saya memutuskan untuk kembali ke ini dan memperbaiki semua konflik penggabungan. Saya juga memutuskan untuk menguji, yang ternyata adalah ide yang bagus.
Tidak mengejutkan, solusi rumit tersebut benar-benar gagal. Pada saat itu, saya memutuskan untuk memperbaiki semua bug dan menulis tes E2E yang ekstensif.
Saya harus bekerja dengan kode yang sangat rusak dan banyak keputusan buruk yang dibuat oleh saya di masa lalu, tapi setelah 2 minggu yang berat, akhirnya saya berhasil membuatnya berfungsi.

Namun, itu tidak berarti bahwa itu sempurna. Pemilik organisasi masih memiliki akses yang jauh lebih banyak daripada pengguna yang diundang tertinggi sekalipun. Pengalaman pengguna juga cukup kurang. Pengguna yang diundang bahkan tidak bisa melihat statistik aplikasi, mengelola penagihan, dan CLI terbatas hanya untuk mengunggah.

Terlepas dari semua tantangan tersebut, Martin telah meninjau PR, dan seminggu kemudian, itu dimasukkan ke dalam produksi.

## Organisasi v2

Sistem organisasi bekerja cukup baik terlepas dari semua tantangan. Pengguna menggunakannya, dan benar-benar mendorong seluruh proyek ke depan. Namun, saya masih harus:
 - memperbaiki kekacauan yang dibuat dalam [keamanan tingkat baris](https://supabase.com/docs/guides/auth/row-level-security)
 - menambahkan dukungan untuk seluruh CLI
 - memastikan bahwa pengguna admin memiliki akses yang sama seperti pemilik

Setelah [banyak diskusi](https://github.com/Cap-go/capgo/issues/564) dengan Martin, kami memutuskan bahwa cara terbaik untuk maju adalah menulis ulang seluruh aturan keamanan dan memindahkan semua kepemilikan sumber daya ke organisasi dan bukan pengguna.
Ini akan memungkinkan integrasi yang lebih mudah dengan sistem organisasi baru, dan juga akan menghapus banyak kode lama.

Menulis kode RLS baru sangat membosankan, tapi setelah seminggu setengah, seluruh migrasi siap.

Namun kali ini, kami memutuskan untuk tidak menulis tes E2E, yang berarti kami harus mengujinya secara manual. Setelah 3 panggilan yang sangat ekstensif bersama-sama, Martin dan saya akhirnya memutuskan untuk mendorong ke produksi dan berharap semua akan berjalan dengan baik 🙏

Ternyata tidak... Ternyata saya merusak pendaftaran pengguna, dan pengguna baru tidak bisa membuat akun 😅

Setelah panggilan panik yang cepat, saya segera mendorong beberapa perubahan ke produksi dan pergi tidur. Sayangnya, perubahan saya hanya menciptakan lebih banyak masalah 😰

Setelah saya bangun, saya menemukan bahwa pengguna memiliki banyak organisasi kosong. Ini tidak seharusnya terjadi karena hanya 1 organisasi yang diizinkan per pengguna. Butuh waktu untuk brainstorming untuk menghapus semua organisasi kosong yang duplikat, tapi selain itu, perubahan berjalan cukup lancar.

## Organisasi v3

Bahkan ini tidak cukup. Masih ada komponen besar yang hilang - penagihan.

Sejauh ini hanya pemilik yang bisa mengelola penagihan. Ini telah menciptakan beberapa masalah menarik di mana pengguna membeli paket berpikir dia membelinya untuk organisasi.
Kami dengan cepat memperbaiki masalah secara manual dan pada saat ini kami memutuskan bahwa masalah ini tidak dapat diterima

Migrasi berjalan cukup lancar. Butuh seminggu kerja tapi dibandingkan dengan V1 dan V2 benar-benar tidak terlalu sulit 🚀

## Organisasi v4 - masa depan

Setelah semua kerja keras ini saya pikir sudah waktunya untuk fokus pada hal lain untuk saat ini 😎

Tidak mudah tapi saya belajar banyak dan capgo telah menerima fitur yang sangat bagus dan penting
Saya masih harus menghentikan fungsi lama, meningkatkan pengalaman pengguna webapp, memantau bug,
tapi seharusnya tidak ada perubahan besar pada sistem ini.

<br>

Terima kasih telah membaca 🚀
