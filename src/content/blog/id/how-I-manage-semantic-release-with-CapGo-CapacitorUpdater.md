---
slug: bagaimana-cloud-maneja-semantic-rerlease-dengan-CapGo-CapacitorUpdater
title: >-
  Bagaimana Rapido Cloud mengelola semantic release dengan Capgo
  CapacitorUpdater
description: >-
  Begini cara saya mengatur semantic release untuk mengelola versi aplikasi yang
  menggunakan CapGo CapacitorUpdater
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
head_image: /rapido_cloud_study_case.webp
head_image_alt: Studi Kasus Singkat Cloud
keywords: >-
  semantic release, semantic-release, CapGo, CapacitorUpdater, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Case Study
published: true
locale: id
next_blog: ''
original_slug: como-rapido-cloud-maneja-semantic-rerlease-con-CapGo-CapacitorUpdater
---
## 1. Pengenalan

Di Rapido Cloud (www.rapido.cloud), saya sedang mengembangkan aplikasi mobile untuk klien Salesforce agar dapat dengan mudah menerapkan aplikasi mobile bermerek mereka sendiri tanpa harus melalui proses rumit menggunakan Salesforce Mobile SDK atau Salesforce Mobile Publisher.

Saya telah mengembangkan aplikasi mobile ini pada platform modern dan "standar" dengan komponen dan tools yang umum termasuk Ionic 8, Angular 18, TypeScript, Capacitor dan sekarang CapGo CapacitorUpdater. Ini lebih mudah ditangani untuk klien yang tidak ingin mengatur hal-hal spesifik platform Salesforce seperti Lightning Web Components; dan lebih mudah serta lebih murah bagi saya untuk merekrut pengembang dan pemelihara aplikasi mobile Ionic + Angular.

Artikel ini menjelaskan desain, pilihan dan implementasi saya yang membuat CapGo dan `semantic-release` menjadi solusi mudah yang sangat sukses untuk mengelola semua deployment secara otomatis melalui Github Actions. Semua ini dirancang, diuji dan didokumentasikan selama masa uji coba gratis 14 hari dari CapGo CapacitorUpdater.

## 2. Mengapa menggunakan CapGo? Mengapa menggunakan semantic-release?

CapGo CapacitorUpdater menarik perhatian saya dengan janjinya untuk membuat deployment aplikasi mobile jauh lebih sederhana, lebih cepat dan fleksibel dibandingkan melalui proses pengiriman standar Apple AppStore/Google PlayStore.
Ini adalah aplikasi mobile pertama yang saya publikasikan ke toko aplikasi, setelah sebelumnya berkonsentrasi pada aplikasi web yang biasanya dikembangkan di Salesforce Experience Cloud.

Saya cukup khawatir dengan kurva pembelajaran untuk membuat ini berhasil tapi saya berhasil memasukkan aplikasi saya ke Apple TestFlight dengan cukup mudah. Saya kemudian berada dalam posisi untuk menggunakan CapGo CapacitorUpdater untuk menerapkan pembaruan saya dengan lebih cepat.

Persyaratan dan kasus uji pertama saya adalah menerapkan untuk diri sendiri untuk menguji aplikasi saya sebagai aplikasi mobile asli di ponsel saya sendiri, alih-alih menguji di emulator mobile atau simulator melalui browser mobile Nexus yang disarankan oleh Ionic. Hal ini karena aplikasi saya menggunakan fitur native seperti Geolokasi atau mengakses Galeri Foto dan Kamera. Karena belum memiliki pengalaman menguji aplikasi mobile Capacitor sebelumnya, saya tidak yakin apakah semuanya akan berjalan dengan baik: tidak ada yang lebih baik selain menguji aplikasi yang sebenarnya, dalam kondisi nyata!

Jadi CapGo CapacitorUpdater membantu saya memperbarui aplikasi di ponsel saya, secara langsung, 1 menit setelah menyimpan fitur atau perbaikan baru dalam kode sumber saya: sangat melegakan, sangat fleksibel, dan mudah di-setup!

## 3. Model percabangan dan rilis saya, dan bagaimana semantic-release cocok di dalamnya

Sekarang setelah pengiriman ke server CapGo berjalan dengan benar, saya perlu mengotomatiskannya dan menyesuaikannya ke dalam pipeline CI/CD saya.

### Beginilah cara saya mengatur model percabangan dan rilis

Untuk setiap aplikasi, baik mobile, web atau Salesforce:
- **pengembangan** dilakukan pada cabang `feature/...` yang bercabang dari `main`, dan digabungkan ke `main` yang menjadi referensi untuk sebagian besar cabang pengembangan, di luar pemeliharaan dan fitur spesifik untuk pengiriman kustom (lebih lanjut tentang ini di bawah)
- **deployment dipicu __dari cabang rilis__** yang mungkin: `production`, cabang prarilis (`alpha`, `beta`, `nightly`, dll.) dan juga cabang spesifik pelanggan atau konteks spesifik untuk pengiriman kustom
- **deployment dipicu oleh pull request** yang digabungkan ke cabang deployment. Saya tidak menggunakan deployment yang dipicu tag karena semantic release mengelola tag dan semua sisanya untuk saya.

Pada dasarnya, ini adalah Gitlab Flow:

![Gitlab Flow](/RBW_Gitlab_Flow.webp)

*Gitlab Flow - sumber https://faun.dev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Catatan tambahan tentang cara kerja semantic-release:

Dalam cabang deployment, ketika semantic-release dipicu, ia akan secara otomatis menghitung nomor versi baru pada cabang ini, tergantung pada nomor versi tag sebelumnya pada cabang dan perbaikan atau fitur yang dikirimkan. Perbaikan akan membuat versi patch baru, sedangkan fitur akan membuat versi minor baru. Ini juga secara otomatis menyertakan prarilis `alpha`, `beta`, dll. dalam nomor versi.

Semantic release menghasilkan changelog dari commit Anda, mengelompokkan perbaikan dan fitur seperti yang didefinisikan dalam conventional commits (lihat https://www.conventionalcommits.org/en/about) dan dikonfigurasi dalam semantic release.

Ini juga akan memperbarui semua pull request git (Github, dalam kasus saya) yang digabungkan dan masalah terkait dengan komentar yang menghubungkannya ke tag dan rilis. Akhirnya, dalam rilis Github ini, ia akan melampirkan aset seperti kode sumber, binari jika diperlukan, `CHANGELOG.md`, dll.

## 4. Cabang, rilis/prarilis, channel dalam semantic release dan di CapGo

Jadi yang saya inginkan semantic release lakukan untuk deployment CapGo adalah sebagai berikut.

### Saya ingin semantic release menghasilkan nomor versi

CapGo telah mengembangkan dan mendokumentasikan versi mereka sendiri dari tool "Conventional Commits" `standard-version`, dengan repo fork mereka `standard-version` (https://github.com/Cap-go/standard-version), dan repo `capacitor-standard-version` mereka sendiri (https://github.com/Cap-go/capacitor-standard-version) serta `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version). Mereka telah mendokumentasikan di blog mereka skema versi yang digunakan oleh CapGo dalam deployment mereka (https://capgo.app/blog/how-version-work-in-capgo/). Bundle JavaScript mengikuti semver "Semantic Versioning" "standar" (https://semver.org) yang juga diikuti oleh `semantic-release` (tentunya!)

Jadi itu bagus, dan melegakan bagi saya karena saya menggunakan `semantic-release` secara ekstensif.

### Saya juga ingin semantic release menghasilkan deployment aplikasi di channel yang berbeda

Seperti disebutkan di atas, saya perlu men-deploy versi prarilis dari cabang seperti `alpha`, `beta`, `nightly` dll., tetapi juga versi spesifik pelanggan pada cabang seperti `production-customer-jones`, `production-customer-doe`, dll.

CapGo menyediakan fitur "channels" yang sama persis dengan yang didukung semantic release, jadi saya senang membuat keduanya bekerja bersama. Ini juga sesuai dengan build cabang berbeda yang dikelola oleh XCode Cloud (lihat lebih lanjut tentang ini di bawah).

Nomor versi semver yang dihasilkan oleh semantic release pada prarilis terlihat seperti `1.0.0-alpha.1`. Build berturut-turut pada cabang ini akan menambah nomor build menjadi `1.0.0-alpha.2`, dll. Meskipun tidak didokumentasikan secara eksplisit, nomor versi ini didukung oleh CapGo, yang merupakan berita bagus bagi saya: saya akan menggunakan channel semantic release dan prarilis untuk menghasilkan versi aplikasi saya dengan channel Capgo.

## 5. Bagaimana cara menggunakan CapGo untuk merilis aplikasi saya?

Untuk mengotomatisasi deployment bundle aplikasi ke CapGo, Anda perlu menggunakan perintah CLI CapGo `bundle upload`. Ketik `npx @capgo/cli@latest bundle upload --help` untuk mendapatkan banyak opsi upload. Di antaranya, kita akan menggunakan yang berikut:
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```
- CHANNEL adalah channel CapGo yang ingin kita deploy (mis. `alpha`)
- VERSION dihasilkan oleh semantic release (mis. `1.0.0-alpha.1`)
- CAPGO_APIKEY disediakan oleh CapGo untuk mengidentifikasi login pipeline CI/CD Anda secara unik
- CAPGO_APPID disediakan oleh CapGo untuk mengidentifikasi aplikasi Anda secara unik (mis. `com.mystartup.mysuperapp`)

## 6. Setup semantic release + CapGo CapacitorUpdate saya

Akhirnya, bagaimana semua ini cocok bersama?

![Versi bundle aplikasi yang dibangun dengan semantic release dan Github Actions](/RBW_CapGo_channels_and_versions.webp)

*Versi bundle aplikasi yang dibangun dengan semantic release dan Github Actions*

### Otomatisasi semantic release dengan Github Actions

Keindahan semantic release adalah bahwa otomatisasi deployment, dalam bentuk alur kerja Github Action, sangat sederhana. Ini akan terlihat sangat mirip di platform CI/CD lainnya.
```yaml
# ./github/workflows/release.yml

name: Release

on:
  workflow_dispatch:
  push:
    branches: [alpha, alpha-nocapgo, dev-rupert]    # <--- adapt this

env:
  CAPGO_APPID: com.mystartup.mysuperapp             # <--- adapt this
  CAPGO_APIKEY: ${{ secrets.CAPGO_APIKEY }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm install
      - run: npx semantic-release
        env:
          DEBUG: true
          GITHUB_TOKEN: ${{ github.token }}
```

Ini hanya menginstal lingkungan NodeJS, kemudian memanggil semantic release.

Untuk setiap penggabungan pada cabang yang terdaftar di `branches`, semantic release akan memicu deployment.
Atur `CAPGO_APIKEY` di secrets repositori Anda.
Perbarui `CAPGO_APPID` Anda di sini.

Perilaku semantic release diatur dalam file konfigurasi `.releaserc.json`.
Berikut pengaturan saya, dijelaskan di bawah:
```json
// .releaserc.json

{
  "branches": [
    {
      "name": "release",
      "channel": "production"
    },
    {
      "name": "alpha",
      "channel": "alpha",
      "prerelease": "alpha"
    },
    {
      "name": "alpha-nocapgo",
      "channel": "alpha",
      "prerelease": "alpha-nocapgo"
    },
    {
      "name": "dev-rupert",
      "channel": "development",
      "prerelease": "development"
    },
    {
      "name": "dev-paul",
      "channel": "development",
      "prerelease": "development"
    }
  ],
  "ci": true,
  "debug": true,
  "dryRun": false,
  "repositoryUrl": "https://github.com/RupertBarrow/mysuperapp",

  "verifyConditions": ["@semantic-release/github"],

  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "breaking", "release": "major" },
          { "type": "feat", "release": "minor" },
          { "type": "fix", "release": "patch" },
          { "type": "ci", "release": "patch" },
          { "type": "doc", "release": "patch" },
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "scope": "core-*", "release": "minor" },
          { "type": "refactor", "release": "patch" },

          { "scope": "no-release", "release": false }
        ]
      }
    ],

    "@semantic-release/release-notes-generator",

    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],

    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md", "ios/App/App.xcodeproj/project.pbxproj"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],

    ["@semantic-release/github", { "assets": ["CHANGELOG.md"] }],

    [
      "@semantic-release/exec",
      {
        "prepareCmd": "npm run build",
        "publishCmd": "npm add -D @capgo/cli && npx @capgo/cli bundle upload --channel ${branch.channel} --apikey $CAPGO_APIKEY --bundle ${nextRelease.version} --bundle-url $CAPGO_APPID"
      }
    ]
  ]
}
```

- `branches`:
  - `branches` mengatur konfigurasi cabang (`name`), dipetakan ke channel CapGo (`channel`) dan bagaimana nomor versi prarilis akan dinamai (`prerelease`). Misalnya, jika `branch.prerelease = "development"`, nomor versi yang dihasilkan oleh semantic release akan menjadi `x.y.z-development.n`
  - deployment ke cabang `alpha` dan `alpha-nocapgo` keduanya akan men-deploy aplikasi di channel `alpha`, tetapi dengan nama prarilis berbeda dalam nomor versi
  - deployment ke cabang pengembang `dev-rupert` atau `dev-paul` keduanya akan deploy ke channel `development` di CapGo, semuanya dengan kata kunci prarilis `development` yang sama dalam nomor versi
- `verifyConditions`: di tahap pertama semantic release, ia memeriksa bahwa ia memiliki akses yang benar ke Github. Saya berharap dapat menambahkan pemeriksaan otentikasi untuk CLI CapGo di sini nanti
- `@semantic-release/commit-analyzer`: hal-hal standar semantic release - lihat dokumentasi mereka (https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator`: menghasilkan file changelog sebagai `CHANGELOG.md`
- `@semantic-release/git`: commit file-file berikut yang telah diperbarui oleh build Ionic dari aplikasi dan oleh pekerjaan semantic release (`package.json`, `CHANGELOG.md` dan `ios/App/App.xcodeproj/project.pbxproj` - saya belum membangun untuk Android)
- `@semantic-release/github`: melampirkan file `CHANGELOG.md` ke rilis Github sebagai aset
- `@semantic-release/exec`: gunakan 2 perintah ini untuk mempersiapkan build aplikasi (`prepareCmd`) dan kemudian secara efektif membangun deploy bundle aplikasi ke server CapGo (`publishCmd`)

Anda akan menyadari bahwa tidak ada penjelasan rumit tentang bagaimana kita ingin nomor versi dihitung dan ditingkatkan, bagaimana kita perlu menghasilkan changelog, tag atau rilis Github, dll.: semuanya ditangani secara default oleh semantic release, dengan konfigurasi minimal.

### Membangun binary baru dengan XCode Cloud

Mengintegrasikan semua ini dengan XCode Cloud untuk membangun versi baru dari aplikasi biner sangatlah sederhana (saya belum men-deploy ke Google Play, tapi proses build-nya seharusnya serupa):
- Saya mengatur proses XCode Cloud untuk melakukan build ketika ada perubahan pada branch yang ingin saya gunakan (misalnya `production`)
- pada branch ini, saya mengatur XCode Cloud untuk melakukan build hanya ketika file `CHANGELOG.md` diperbarui. File ini diperbarui setelah setiap versi yang dihasilkan oleh semantic release
- Saya dapat memicu build pada branch yang berbeda untuk mensimulasikan deployment untuk channel yang berbeda. Dalam setiap konfigurasi build XCode Cloud pada branch yang berbeda, saya mengatur variabel environment secara manual dengan nilai `branch.channel` yang diatur dalam `releaserc.json` (ya, ini adalah duplikasi manual) dan kemudian, jika saya mau, saya bisa men-deploy aplikasi AppStore yang berbeda untuk setiap aplikasi pelanggan khusus yang di-deploy dari branch rilis khusus, seperti yang disebutkan sebelumnya.

![Building app binaries on XCode Cloud with CapGo channels](/RBW_XCode_Cloud_building.webp)

*Membangun aplikasi biner di XCode Cloud dengan channel CapGo*

## 7. Kesimpulan

Sebagai kesimpulan, saya sangat senang dapat mengintegrasikan CapGo CapacitorUpdater ke dalam pipeline semantic release standar saya, dengan cepat dalam masa percobaan 14 hari, dan hasilnya adalah sebagai berikut:
- nomor versi bundle dihasilkan secara otomatis oleh semantic release dan kompatibel dengan server CapGo
- semantic release secara otomatis men-deploy bundle aplikasi CapGo, juga memanfaatkan channel CapGo
- ini sangat cocok dengan build aplikasi biner XCode Cloud

### Langkah selanjutnya

Saat ini saya dalam fase pengembangan aplikasi ini. Saya akan segera membuatnya tersedia untuk tester melalui TestFlight (untuk iOS). Mengingat kekuatan CapGo, saya pasti akan men-deploy versi gratis dari aplikasi ke AppStore untuk pengujian, yang akan diperbarui secara teratur dengan CapGo selama pengujian. Saya kemudian akan men-deploy versi lain (berbayar) dari aplikasi di AppStore, di bawah catatan lain, dan juga memperbarui itu secara teratur dengan CapGo.

Saya berharap dapat menambahkan verifikasi prasyarat CapGo `bundle upload` yang lebih baik sebelum build ke dalam konfigurasi semantic release saya.

Sekarang saya memiliki pipeline semantic release yang bersih, sederhana dan dapat direproduksi untuk aplikasi mobile masa depan yang dikembangkan dengan Ionic + Angular + Capacitor.

## Penulis - Rupert Barrow

Saya memiliki pengalaman lebih dari 22 tahun dengan Salesforce, sebagai klien dan pengguna, sebagai partner dan integrator, arsitek, developer, analis bisnis dan konsultan. Saya ikut mendirikan dan mengelola Altius Services sebagai COO dan CTO selama 13 tahun, sebuah partner SI Salesforce yang sukses di Prancis, sebelum memulai petualangan baru sebagai solopreneur Salesforce dengan produk **Rapido Cloud** yang saya tawarkan.

Anda dapat menemukan saya di LinkedIn di https://linkedin.com/in/rbarrow.

Anda dapat melihat penawaran Salesforce kami di https://www.rapido-companion.app dan https://www.rapido.cloud (dalam pengembangan).
