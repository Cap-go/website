---
slug: limitation-du-taux-api-pour-la-conformité-app-store
title: Pembatasan Rate API untuk Kepatuhan App Store
description: >-
  Pelajari tentang pembatasan tingkat API dan pentingnya hal tersebut untuk
  kepatuhan App Store, keamanan, dan performa sistem.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T03:23:39.305Z
updated_at: 2025-04-02T03:23:51.231Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ecaaaa7747adc4bca8d9b6-1743564231231.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  API rate limiting, app store compliance, security, performance, overload
  protection, request management
tag: 'Development, Mobile, Security'
published: true
locale: id
next_blog: ''
---
Pembatasan laju API memastikan aplikasi Anda memenuhi pedoman Apple dan Google sambil melindungi sistem dari kelebihan beban dan penyalahgunaan. Ini membatasi seberapa sering pengguna dapat membuat permintaan, meningkatkan keamanan, menghemat biaya, dan memastikan kinerja yang lancar. Berikut yang perlu Anda ketahui:

-   **Mengapa Ini Penting**: Mencegah serangan brute force, mengelola beban server, dan menghindari penolakan app store.
-   **Metode**:
    -   Fixed Window: Sederhana tapi dapat menyebabkan lonjakan lalu lintas.
    -   Sliding Window: Memperlancar lalu lintas tapi menggunakan lebih banyak memori.
    -   Token Bucket: Menangani lonjakan tapi rumit untuk diatur.
-   **Kepatuhan**: Gunakan exponential backoff untuk percobaan ulang dan respon dengan kode status 429 ketika batas terlampaui.
-   **Perangkat**: Platform seperti [Capgo](https://capgo.app/) menyederhanakan implementasi dengan analitik, pelacakan kesalahan, dan pemantauan real-time.

**Tips Cepat**: Uji batas Anda dalam kondisi normal, lonjakan, dan pemulihan untuk memastikan stabilitas dan kepatuhan.

## Memahami Batas Laju API: Tujuan, Jenis, dan Hal Penting ...

<iframe src="https://www.youtube.com/embed/LVl2Lftj8A8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Pedoman API App Store

Batas laju API berperan penting dalam memenuhi persyaratan app store. Apple dan Google memiliki aturan spesifik untuk memastikan perlindungan data pengguna dan menjaga stabilitas sistem. Berikut rincian kebijakan mereka.

### Batas Laju API Apple

Apple menerapkan batasan pada area seperti autentikasi, permintaan data, dan endpoint publik. Melanggar batasan ini dapat mengakibatkan konsekuensi seperti penolakan aplikasi selama proses review, penghapusan sementara dari App Store, atau diperlukan perbaikan mendesak. Untuk mengelola batas yang terlampaui, pengembang disarankan menggunakan metode seperti **exponential backoff**, yang melibatkan peningkatan bertahap jeda antar percobaan.

### Batas Laju API Google

[Google Play Store](https://play.google/developer-content-policy/) menetapkan batasan untuk akses data publik, autentikasi, dan permintaan data pengguna. Meski lonjakan aktivitas kecil diperbolehkan, sistem memantau penggunaan secara ketat. Peringatan diberikan saat mendekati ambang batas, dan pembatasan diterapkan secara bertahap daripada melalui penangguhan langsung.

## Langkah Implementasi Pembatasan Laju

### Metode Pembatasan Laju

Saat mengimplementasikan pembatasan laju API, pilih pendekatan yang sesuai dengan kebutuhan aplikasi Anda. Berikut tiga metode yang umum digunakan:

**Pembatasan Laju Fixed Window**: Metode ini menetapkan batas (misalnya, 100 permintaan) yang direset pada interval tetap. Meski sederhana, ini dapat menyebabkan lonjakan lalu lintas di akhir setiap periode.

**Pembatasan Laju Sliding Window**: Pendekatan ini menggunakan kerangka waktu bergulir untuk memperlancar lalu lintas. Misalnya, jika batasnya 100 permintaan per menit dan pengguna membuat 50 permintaan pada 14:00:30, mereka masih bisa membuat 50 permintaan lagi hingga 14:01:30.

**Algoritma Token Bucket**: Metode ini memungkinkan fleksibilitas dengan mengisi ulang token pada tingkat tertentu. Setiap panggilan API menggunakan satu token, dan permintaan ditolak ketika token habis sampai diisi ulang.

| Metode | Kelebihan | Kekurangan | Paling Cocok Untuk |
| --- | --- | --- | --- |
| Fixed Window | Mudah diimplementasikan, penggunaan memori rendah | Dapat menyebabkan lonjakan lalu lintas | Endpoint API dasar |
| Sliding Window | Aliran lalu lintas lancar, presisi lebih baik | Membutuhkan lebih banyak memori | API autentikasi pengguna |
| Token Bucket | Menangani lonjakan, dapat disesuaikan | Lebih kompleks untuk diimplementasikan | API publik lalu lintas tinggi |

Berikut contoh praktis menggunakan metode sliding window.

### Contoh Implementasi

Berikut potongan kode yang mendemonstrasikan cara mengimplementasikan pembatasan laju sliding window:

```javascript
const rateLimit = async (userId, limit, window) => {
  const now = Date.now();
  const key = `ratelimit:${userId}`;

  const multi = redis.multi();
  multi.zremrangebyscore(key, 0, now - window); // Remove expired requests
  multi.zadd(key, now, now);                   // Add the current request
  multi.zcard(key);                            // Count requests in the window

  const [,, count] = await multi.exec();

  return count <= limit; // Return true if within limit
};
```

### Pengujian Batas Laju

Setelah diimplementasikan, uji secara menyeluruh pengaturan pembatasan laju Anda untuk memastikan berfungsi sesuai harapan. Fokus pada area-area ini:

-   **Pengujian Batas Dasar**: Kirim permintaan pada tingkat normal untuk mengonfirmasi fungsi standar.
-   **Pengujian Lonjakan**: Simulasikan beberapa permintaan yang dikirim secara bersamaan untuk memverifikasi bahwa batas ditegakkan.
-   **Pengujian Pemulihan**: Periksa bagaimana sistem berperilaku setelah batas direset.

```javascript
async function testRateLimits() {
  // Test normal usage
  for (let i = 0; i < 5; i++) {
    await makeRequest();
    await delay(1000); // Wait 1 second between requests
  }

  // Test burst protection
  const requests = Array(10).fill().map(() => makeRequest());
  await Promise.all(requests);

  // Verify recovery after limit reset
  await delay(60000); // Wait for 1 minute
  const response = await makeRequest();
  assert(response.status === 200); // Ensure the request is accepted
}
```

### Pemantauan Kinerja

Setelah penerapan, pantau metrik utama untuk memastikan sistem pembatasan laju Anda berkinerja baik dalam berbagai kondisi:

-   Total permintaan yang ditangani dalam setiap jendela waktu
-   Jumlah permintaan yang ditolak
-   Waktu respons selama lalu lintas tinggi
-   Tingkat kesalahan dan penyebabnya

Data ini akan membantu Anda menyesuaikan sistem untuk kinerja optimal.

## Standar Pembatasan Laju

### Pengaturan Batas Laju

Untuk mencapai keseimbangan yang tepat antara pengalaman pengguna dan perlindungan server, evaluasi pola lalu lintas API Anda dan kebutuhan endpoint. Alih-alih mengandalkan ambang batas tetap, sesuaikan batas laju dengan kebutuhan spesifik API Anda. Sesuaikan batas ini seiring waktu berdasarkan data penggunaan aktual untuk memastikan tetap efektif dan praktis.

### Desain Respons Kesalahan

Ketika client melampaui batas laju, berikan respons dengan **kode status 429**. Sertakan header yang menentukan batas total, permintaan tersisa, waktu reset, dan interval percobaan ulang. Umpan balik terperinci ini membantu pengembang menyesuaikan aplikasi mereka agar selaras dengan batas API Anda.

### Proses Penyesuaian Batas

Meninjau ulang batas laju secara teratur sangat penting untuk mempertahankan kinerja dan memenuhi persyaratan kepatuhan. Pantau faktor seperti lalu lintas puncak, tingkat kesalahan, dan beban server untuk mengidentifikasi penyesuaian yang diperlukan. Masukkan umpan balik pengguna untuk memastikan batas Anda mendukung efisiensi operasional dan pedoman app store.

## Perangkat Pembatasan Laju [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ecaaaa7747adc4bca8d9b6/454adbba4c00491adce88db59812b177.jpg)

Capgo menawarkan perangkat terintegrasi yang dirancang untuk menerapkan batas laju API sambil memastikan kinerja tinggi dan kepatuhan terhadap persyaratan app store.

### Fitur Kepatuhan Capgo

Capgo menyediakan berbagai perangkat untuk membantu mempertahankan batas laju API dan memenuhi pedoman app store. Sistem pembaruan-nya mencapai tingkat keberhasilan 82% dengan waktu respons API rata-rata 434 ms [\[1\]](https://capgo.app/). Berikut yang disertakan:

-   **Analitik Real-Time**: Pantau distribusi pembaruan dan penggunaan API.
-   **Pelacakan Kesalahan**: Cepat identifikasi dan perbaiki masalah batas laju.
-   **[Sistem Channel](https://capgo.app/docs/plugin/cloud-mode/channel-system/)**: Kelola peluncuran pembaruan secara efektif.
-   **Enkripsi**: Lindungi komunikasi API.

Perangkat ini bekerja bersama praktik pembatasan laju standar, menawarkan data real-time dan resolusi kesalahan proaktif. Sistem Capgo telah diuji di 750 aplikasi produksi, mengirimkan 23,5 juta pembaruan sambil mempertahankan kepatuhan dan kinerja yang kuat [\[1\]](https://capgo.app/).

### Pembatasan Laju dengan Capgo

Perangkat pembatasan laju Capgo terintegrasi dengan mulus ke dalam alur kerja [Capacitor](https://capacitorjs.com/) Anda. Mereka membantu mencapai tingkat pembaruan pengguna 95% dalam 24 jam sambil menjaga kinerja API tetap stabil [\[1\]](https://capgo.app/).

Berikut rincian pendekatan Capgo:

| Fitur | Implementasi | Manfaat |
| --- | --- | --- |
| **CDN Global** | Kecepatan unduh 114 ms untuk bundle 5 MB | Mengurangi beban server |
| **Distribusi Channel** | Peluncuran bertahap dan pengujian beta | Mengontrol aliran lalu lintas API |
| **Dashboard Analitik** | Pemantauan real-time | Mengukur kinerja batas laju |
| **Manajemen Kesalahan** | Deteksi masalah otomatis | Menghindari pelanggaran batas laju |

> "Kami menerapkan pengembangan agile dan @Capgo sangat penting dalam pengiriman berkelanjutan kepada pengguna kami!"

Untuk memulai, jalankan: `npx @capgo/cli init`. Perintah ini mengatur batas laju yang diperlukan, memastikan aplikasi Anda mematuhi persyaratan toko Apple dan Google.

## Ringkasan

### Poin Utama

Pembatasan laju API memainkan peran penting dalam memenuhi persyaratan app store dan memastikan sistem Anda berjalan lancar. Berikut ringkasan singkat:

| Aspek | Persyaratan | Dampak |
| --- | --- | --- |
| **Keamanan** | Enkripsi end-to-end | Mengamankan komunikasi API dan data pengguna |
| **Pemantauan** | Analitik | Melacak penggunaan API dan membantu menghindari pelanggaran |

Gunakan daftar periksa di bawah ini untuk menyelaraskan strategi pembatasan laju Anda dengan pedoman app store.

### Daftar Periksa Implementasi

Untuk mengimplementasikan strategi pembatasan laju yang solid, ikuti langkah-langkah ini:

-   **Tetapkan Batas Laju**
    
    -   Tentukan batas laju global berdasarkan aturan app store.
    -   Gunakan exponential backoff untuk mekanisme percobaan ulang.
    -   Konfigurasi respons kesalahan yang tepat, seperti kode status 429.
-   **Pantau dan Sesuaikan**
    
    -   Analisis penggunaan API dengan analitik terperinci.
    -   Atur peringatan otomatis untuk menangkap potensi pelanggaran lebih awal.
    -   Perbarui batas sesuai kebutuhan berdasarkan kinerja dunia nyata.
-   **Uji dan Validasi**
    
    -   Lakukan pengujian beban untuk memastikan stabilitas.
    -   Verifikasi respons kesalahan memenuhi persyaratan kepatuhan.
    -   Jaga dokumentasi menyeluruh tentang upaya kepatuhan Anda.
