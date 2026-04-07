---
locale: id
---

sing @capgo/capacitor-navigation-bar

## Instalasi

Untuk menggunakan paket `@capgo/capacitor-navigation-bar`, Anda perlu menginstalnya terlebih dahulu dengan menjalankan perintah berikut:

```bash
npm install @capgo/capacitor-navigation-bar
npx cap sync
```

## Mengatur Warna Bilah Navigasi

Anda dapat mengatur warna bilah navigasi untuk Android Lollipop dan yang lebih tinggi menggunakan fungsi `setNavigationBarColor`. Berikut adalah contoh cara menggunakannya:

```typescript
import { setNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

setNavigationBarColor({ color: '#FF0000' });
```

Parameter `color` adalah string yang mewakili warna bilah navigasi.

## Mendapatkan Warna Bilah Navigasi

Anda juga dapat mendapatkan warna bilah navigasi saat ini menggunakan fungsi `getNavigationBarColor`. Berikut adalah contoh cara menggunakannya:

```typescript
import { getNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

const color = getNavigationBarColor();
console.log(color);
```

Variabel `color` akan berisi warna bilah navigasi saat ini.

Dan itu saja! Sekarang Anda tahu cara menggunakan paket `@capgo/capacitor-navigation-bar` untuk mengatur dan mendapatkan warna bilah navigasi di aplikasi Android Anda.