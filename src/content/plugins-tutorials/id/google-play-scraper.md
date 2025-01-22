---
locale: id
---

sing @capgo/google-play-scraper Paket

## Instalasi

Untuk menggunakan paket `@capgo/google-play-scraper`, Anda perlu menginstalnya melalui npm:

[[BLOK_KODE]]

## Contoh Penggunaan

Berikut adalah contoh bagaimana Anda dapat menggunakan paket `@capgo/google-play-scraper` untuk mengambil data dari Google Play Store:

[[BLOK_KODE]]

Dalam contoh di atas, kita pertama-tama mengimpor kelas `GooglePlayScraper` dari paket `@capgo/google-play-scraper`.

Kemudian, kita dapat menggunakan metode `getAppDetails()` untuk mengambil rincian dari aplikasi tertentu. Kita memberikan ID aplikasi sebagai parameter dan itu mengembalikan objek dengan berbagai detail seperti nama aplikasi, nama pengembang, peringkat, dll.

Demikian pula, kita dapat menggunakan metode `getAppReviews()` untuk mengambil ulasan aplikasi. Kita memberikan ID aplikasi dan opsi tambahan seperti pengurutan dan jumlah ulasan yang ingin diambil. Ini mengembalikan array ulasan dengan detail seperti teks ulasan, peringkat, nama pengulas, dll.

## Kesimpulan

Paket `@capgo/google-play-scraper` menyediakan cara yang nyaman untuk mengambil data dari Google Play Store. Anda dapat menggunakannya untuk mengambil rincian aplikasi, ulasan, dan lainnya. Dengan paket ini, Anda dapat dengan mudah mengumpulkan informasi dari Play Store untuk aplikasi Anda atau aplikasi lain yang menarik.