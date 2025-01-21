---
locale: id
---

capgo/indikator-rumah

Paket `@capgo/indikator-rumah` memungkinkan Anda untuk menyembunyikan dan menampilkan indikator tombol rumah di aplikasi Capacitor Anda.

## Instalasi

Untuk menginstal paket, jalankan perintah berikut di terminal Anda:

```bash
npm install @capgo/home-indicator
npx cap sync
```

## API

Paket ini menyediakan metode berikut:

### `hide()`

```typescript
hide() => Promise
```

Sembunyikan indikator rumah

**Sejak:** 001

### `show()`

```typescript
show() => Promise
```

Tampilkan indikator rumah

**Sejak:** 001

### `isHidden()`

```typescript
isHidden() => Promise<{ hidden: boolean; }>
```

Dapatkan status indikator rumah

**Mengembalikan:** Promise<{ hidden: boolean; }>

**Sejak:** 001

## Variabel CSS

Anda dapat menggunakan `--safe-area-inset-bottom` untuk memastikan konten Anda tidak tersembunyi oleh indikator rumah. Variabel ini disuntikkan oleh plugin untuk Android. Ini berguna jika Anda mengatur mode layar penuh nyata di Android.

Contoh penggunaan:

```java
getWindow().setDecorFitsSystemWindows(false);
```

## Kredit

Plugin ini awalnya dibuat untuk [Kickcom](https://kickcom/) oleh [Capgo](https://capgoapp/).

Untuk informasi lebih lanjut dan pembaruan, lihat [Capgo](https://capgoapp/).