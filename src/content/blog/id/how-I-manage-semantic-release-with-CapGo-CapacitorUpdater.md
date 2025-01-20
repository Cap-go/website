---
slug: id__how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: >-
  Bagaimana Rapido Cloud mengelola penerbitan semantik dengan CapGo
  CapacitorUpdater
description: >-
  Berikut cara saya mengonfigurasi Semantic Release untuk mengelola publikasi
  aplikasi saya menggunakan CapGo CapacitorUpdater
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
tag: Case Study
published: true
locale: id
next_blog: ''
---

# Bagaimana Rapido Cloud mengelola Semantic Release dengan CapGo CapacitorUpdater

## 1 Pendahuluan

Di Rapido Cloud (wwwrapidocloud), saya sedang mengembangkan aplikasi mobile untuk klien Salesforce agar dapat dengan mudah men-deploy aplikasi mobile bermerek mereka sendiri tanpa harus melalui proses yang sulit menggunakan Salesforce Mobile SDK atau Salesforce Mobile Publisher.

Saya telah mengembangkan aplikasi mobile ini di platform modern dan "standar" dengan komponen dan alat yang banyak digunakan termasuk Ionic 8, Angular 18, TypeScript, Capacitor dan sekarang CapGo CapacitorUpdater. Ini lebih mudah ditangani untuk klien yang tidak ingin mengelola spesifikasi platform Salesforce seperti Lightning Web Components; dan lebih mudah dan murah bagi saya untuk merekrut pengembang dan pemelihara aplikasi mobile Ionic + Angular.

Artikel ini menjelaskan desain, pilihan, dan implementasi saya yang membuat CapGo dan `semantic-release` menjadi pilihan yang sangat sukses untuk mengelola semua deployment secara otomatis melalui Github Actions. Semua ini dirancang, diuji, dan didokumentasikan selama periode uji coba gratis 14 hari CapGo CapacitorUpdater.

## 2 Mengapa menggunakan CapGo? Mengapa menggunakan semantic-release?

CapGo CapacitorUpdater menarik perhatian saya dengan janjinya untuk membuat deployment aplikasi mobile jauh lebih sederhana, lebih cepat, dan fleksibel daripada melalui proses pengiriman standar Apple AppStore/Google PlayStore.

Ini adalah aplikasi mobile pertama saya yang saya publikasikan ke toko aplikasi, karena sebelumnya saya berkonsentrasi pada aplikasi web, biasanya dikembangkan di Salesforce Experience Cloud.

Saya agak takut dengan kurva pembelajaran untuk membuatnya berhasil, tetapi saya berhasil memasukkan aplikasi saya ke Apple TestFlight dengan cukup mudah. Kemudian saya berada dalam posisi untuk menggunakan CapGo CapacitorUpdater untuk men-deploy pembaruan saya jauh lebih cepat.

Persyaratan dan kasus uji pertama saya adalah men-deploy untuk diri sendiri untuk menguji aplikasi saya sebagai aplikasi mobile yang sebenarnya di ponsel saya sendiri, alih-alih menguji di emulator mobile atau di simulator melalui browser mobile Nexus yang disarankan oleh Ionic. Itu karena aplikasi saya menggunakan fitur native seperti Geolokasi atau mengakses Galeri Foto dan Kamera. Karena tidak memiliki pengalaman sebelumnya dalam menguji aplikasi mobile Capacitor, saya tidak yakin apakah semuanya akan berfungsi dengan baik: tidak ada yang lebih baik daripada menguji aplikasi yang sebenarnya, dalam kondisi nyata!

Jadi CapGo CapacitorUpdater membantu saya memperbarui aplikasi saya di ponsel, secara langsung, 1 menit setelah menyimpan fitur atau perbaikan baru dalam kode sumber saya: sangat melegakan, sangat fleksibel, dan mudah diatur!

## 3 Model percabangan dan rilis saya, dan bagaimana semantic-release cocok

Jadi sekarang pengiriman saya ke server CapGo berfungsi dengan benar, saya perlu mengotomatisasi ini dan menyesuaikannya dengan pipeline CI/CD saya.

### Inilah cara saya mengatur model percabangan dan rilis saya

Untuk setiap aplikasi, baik mobile, web, atau Salesforce:
- **pengembangan** dilakukan pada cabang `feature/` dari `main`, dan mereka digabungkan ke `main` yang menjadi referensi untuk sebagian besar cabang pengembangan, di luar pemeliharaan dan fitur khusus untuk pengiriman kustom (lebih lanjut tentang ini di bawah)
- **deployment dipicu __dari cabang rilis__** yang mungkin: `production`, cabang pra-rilis (`alpha`, `beta`, `nightly`, dll.) dan juga cabang khusus pelanggan atau konteks tertentu untuk pengiriman kustom
- **deployment dipicu oleh pull request** yang digabungkan ke cabang deployment. Saya tidak menggunakan deployment yang dipicu tag karena semantic release mengelola tag dan semua sisanya untuk saya

Pada dasarnya, ini adalah Gitlab Flow:

![Gitlab Flow](/RBW_Gitlab_Flowwebp)

*Gitlab Flow - sumber https://faundev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Catatan tambahan tentang cara kerja semantic-release:

Dalam cabang deployment, ketika semantic-release dipicu, secara otomatis akan menghitung nomor versi baru pada cabang ini, tergantung pada nomor versi tag sebelumnya pada cabang dan perbaikan atau fitur yang disampaikan. Perbaikan akan membuat versi patch baru, sedangkan fitur akan membuat versi minor baru.Berikut adalah terjemahan teks tersebut ke dalam bahasa Indonesia:

Ini juga secara otomatis menyertakan pratinjau `alpha`, `beta`, dll dalam nomor versi.

Semantic release menghasilkan changelog dari commit Anda, mengelompokkan perbaikan dan fitur seperti yang didefinisikan dalam conventional commits (lihat https://www.conventionalcommits.org/en/about) dan dikonfigurasi dalam semantic release.

Ini juga akan memperbarui semua pull request yang telah digabungkan di git (GitHub, dalam kasus saya) dan masalah terkait dengan komentar yang menghubungkan mereka ke tag dan rilis. Terakhir, dalam rilis GitHub ini, akan dilampirkan aset seperti kode sumber, biner jika diperlukan, `CHANGELOG.md`, dll.

## 4. Cabang, rilis/pratinjau, saluran dalam semantic release dan di CapGo

Jadi yang saya inginkan semantic release lakukan untuk deployment CapGo adalah sebagai berikut:

### Saya ingin semantic release menghasilkan nomor versi

CapGo telah mengembangkan dan mendokumentasikan versi mereka sendiri dari alat "Conventional Commits" `standard-version`, dengan repo fork mereka `standard-version` (https://github.com/Cap-go/standard-version), serta repo `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version) dan `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version) mereka sendiri. Mereka telah mendokumentasikan di blog mereka skema versi yang digunakan oleh CapGo dalam deployment mereka (https://capgo.app/blog/how-version-work-in-capgo/). Bundle JavaScript mengikuti "standar" semver "Semantic Versioning" (https://semver.org) yang juga diikuti oleh `semantic-release` (jelas sekali!)

Jadi itu bagus, dan merupakan kelegaan bagi saya karena saya menggunakan `semantic-release` secara ekstensif.

### Saya juga ingin semantic release menghasilkan deployment aplikasi di berbagai saluran

Seperti disebutkan di atas, saya perlu men-deploy versi pratinjau dari cabang seperti `alpha`, `beta`, `nightly` dll, tetapi juga versi khusus pelanggan di cabang seperti `production-customer-jones`, `production-customer-doe`, dll.

CapGo menyediakan fitur "saluran" yang persis seperti yang juga didukung oleh semantic release, jadi saya sangat bersemangat untuk membuat mereka bekerja bersama. Ini juga sesuai dengan berbagai build cabang yang dikelola oleh XCode Cloud (lihat lebih lanjut tentang ini di bawah).

Nomor versi semver yang dihasilkan oleh semantic release pada pratinjau terlihat seperti `1.0.0-alpha.1`. Build berturut-turut pada cabang ini akan menambah nomor build menjadi `1.0.0-alpha.2`, dll. Meskipun tidak didokumentasikan secara eksplisit, nomor versi ini didukung oleh CapGo, yang merupakan berita bagus bagi saya: Saya akan menggunakan saluran semantic release dan pratinjau untuk menghasilkan versi aplikasi saya dengan saluran Capgo.

## 5. Bagaimana saya dapat menggunakan CapGo untuk merilis aplikasi saya?

Untuk mengotomatisasi deployment bundle aplikasi Anda ke CapGo, Anda perlu menggunakan perintah CLI CapGo `bundle upload`. Ketik `npx @capgo/cli@latest bundle upload --help` untuk mendapatkan berbagai opsi upload. Di antara opsi-opsi tersebut, kita akan menggunakan yang berikut:

- CHANNEL adalah saluran CapGo yang ingin kita deploy (mis. `alpha`)
- VERSION dihasilkan oleh semantic release (mis. `1.0.0-alpha.1`)
- CAPGO_APIKEY disediakan oleh CapGo untuk mengidentifikasi secara unik login pipeline CI/CD Anda
- CAPGO_APPID disediakan oleh CapGo untuk mengidentifikasi secara unik aplikasi Anda (mis. `com.mystartup.mysuperapp`)

## 6. Setup semantic release + CapGo CapacitorUpdate saya

Akhirnya, bagaimana semua ini cocok bersama?

![Versi bundle aplikasi yang dibangun dengan semantic release dan Github Actions](/RBW_CapGo_channels_and_versions.webp)

*Versi bundle aplikasi yang dibangun dengan semantic release dan Github Actions*

### Otomatisasi semantic release dengan Github Actions

Keindahan semantic release adalah bahwa otomatisasi deployment, dalam bentuk alur kerja Github Action, sangat sederhana. Ini akan terlihat sangat mirip pada platform CI/CD lainnya.

Ini hanya menginstal lingkungan NodeJS, kemudian memanggil semantic release.

Untuk setiap penggabungan pada cabang yang terdaftar di `branches`, semantic release akan memicu deployment.
Atur `CAPGO_APIKEY` di rahasia repositori Anda.
Perbarui `CAPGO_APPID` Anda di sini.

Perilaku semantic release diatur dalam file konfigurasi `releaser.json`-nya.Berikut adalah terjemahan teks ke dalam bahasa Indonesia:

Berikut adalah pengaturan saya, dijelaskan di bawah ini:
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```

- `branches`:
  - `branches` mengatur konfigurasi cabang (`name`), dipetakan ke saluran CapGo (`channel`) dan bagaimana nomor versi pra-rilis akan disebut (`prerelease`). Misalnya, jika `branch.prerelease = "development"`, nomor versi yang dihasilkan oleh semantic release akan menjadi `x.y.z-development.n`
  - Penerapan ke cabang `alpha` dan `alpha-nocapgo` akan menerapkan aplikasi ke saluran `alpha`, tetapi dengan nama pra-rilis yang berbeda dalam nomor versi
  - Penerapan ke cabang pengembang `dev-rupert` atau `dev-paul` akan menerapkan ke saluran `development` di CapGo, semuanya dengan kata kunci pra-rilis `development` yang sama dalam nomor versi
- `verifyConditions`: pada tahap pertama semantic release, ini memeriksa bahwa ia memiliki akses yang benar ke Github. Saya berharap dapat menambahkan pemeriksaan otentikasi untuk CLI CapGo di sini nanti
- `@semantic-release/commit-analyzer`: hal-hal standar semantic release - lihat dokumentasi mereka
- `@semantic-release/release-notes-generator`: menghasilkan file changelog sebagai `CHANGELOG.md`
- `@semantic-release/git`: melakukan commit file-file berikut yang telah diperbarui oleh build Ionic dari aplikasi dan oleh pekerjaan semantic release (`package.json`, `CHANGELOG.md` dan `ios/App/App.xcodeproj/project.pbxproj` - saya belum membangun untuk Android)
- `@semantic-release/github`: melampirkan file `CHANGELOG.md` ke rilis Github sebagai aset
- `@semantic-release/exec`: menggunakan 2 perintah ini untuk mempersiapkan build aplikasi (`prepareCmd`) dan kemudian secara efektif membangun dan menerapkan bundle aplikasi ke server CapGo (`publishCmd`)

Anda akan melihat bahwa tidak ada penjelasan tentang bagaimana kita ingin nomor versi dihitung dan ditingkatkan, bagaimana kita perlu menghasilkan changelog, tag atau rilis Github, dll: semuanya ditangani secara default oleh semantic release, dengan konfigurasi minimal

### Membangun binari baru dengan XCode Cloud

Mengintegrasikan semua ini dengan XCode Cloud untuk membangun versi baru dari binari aplikasi sangatlah sederhana (saya belum menerapkan di Google Play, tetapi build itu seharusnya serupa):
- Saya mengatur proses XCode Cloud untuk membangun ketika ada perubahan pada cabang yang ingin saya gunakan untuk ini (misalnya `production`)
- Pada cabang ini, saya mengatur XCode Cloud untuk membangun hanya ketika file `CHANGELOG.md` diperbarui. Ini diperbarui setelah setiap versi yang dihasilkan oleh semantic release
- Saya dapat memicu build pada cabang yang berbeda untuk mensimulasikan penerapan untuk saluran yang berbeda. Dalam setiap konfigurasi build XCode Cloud pada cabang yang berbeda, saya mengatur variabel lingkungan secara manual dengan nilai `branch.channel` yang diatur dalam `releaser.json` (ya, ini adalah duplikasi manual) dan kemudian, jika saya mau, saya bisa menerapkan aplikasi AppStore yang berbeda untuk setiap aplikasi pelanggan khusus yang diterapkan dari cabang rilis khusus, seperti yang disebutkan sebelumnya

![Membangun binari aplikasi di XCode Cloud dengan saluran CapGo](/RBW_XCode_Cloud_building.webp)

*Membangun binari aplikasi di XCode Cloud dengan saluran CapGo*

## 7 Kesimpulan

Sebagai kesimpulan, saya sangat senang telah dapat mengintegrasikan CapGo CapacitorUpdater ke dalam pipeline semantic release standar saya, dengan cepat dalam batas waktu periode uji coba 14 hari, dan hasilnya adalah sebagai berikut:
- Nomor versi bundle dihasilkan secara otomatis oleh semantic release dan kompatibel dengan server CapGo
- Semantic release secara otomatis menerapkan bundle aplikasi CapGo, juga memanfaatkan saluran CapGo
- Ini cocok dengan baik dengan build binari aplikasi XCode Cloud

### Langkah selanjutnya

Saat ini saya berada dalam fase pengembangan aplikasi ini. Saya akan segera membuatnya tersedia untuk penguji melalui TestFlight (untuk iOS). Mengingat kekuatan CapGo, saya pasti akan menerapkan versi gratis dari aplikasi ke AppStore untuk pengujian, yang akan diperbarui secara teratur dengan CapGo selama pengujianSaya kemudian akan menerapkan versi lain (berbayar) dari aplikasi di AppStore, di bawah catatan lain, dan juga memperbarui itu secara teratur dengan CapGo

Saya berharap dapat menambahkan verifikasi pra-build yang lebih baik untuk prasyarat CapGo `bundle upload` ke dalam konfigurasi semantic release saya

Sekarang saya memiliki pipeline semantic release yang bersih, sederhana, dan dapat direproduksi untuk aplikasi mobile masa depan yang dikembangkan dengan Ionic + Angular + Capacitor


## Penulis - Rupert Barrow

Saya memiliki pengalaman lebih dari 22 tahun dalam Salesforce, sebagai klien dan pengguna, sebagai mitra dan integrator, arsitek, pengembang, analis bisnis, dan konsultan. Saya ikut mendirikan dan mengelola Altius Services sebagai COO dan CTO selama 13 tahun, mitra SI Salesforce yang sukses di Prancis, sebelum memulai petualangan baru sebagai solopreneur Salesforce dengan penawaran produk **Rapido Cloud** saya

Anda dapat menemukan saya di LinkedIn di https://linkedincom/in/rbarrow 

Anda dapat melihat penawaran Salesforce kami di https://wwwrapido-companionapp dan https://wwwrapidocloud (dalam pengembangan)