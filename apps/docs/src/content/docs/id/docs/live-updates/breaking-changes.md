---
title: "Breaking Changes"
description: "Cara menangani breaking changes dengan versioned channels"
locale: id
sidebar:
  order: 6
---

Dokumentasi ini menjelaskan cara menangani breaking changes di aplikasi Anda menggunakan versioned channels. Pendekatan ini memungkinkan Anda maintain berbagai versi aplikasi sambil memastikan pengguna menerima update yang kompatibel.

## Contoh Skenario

Katakanlah Anda memiliki:
- Versi aplikasi 1.2.3 (versi lama) - menggunakan channel production
- Versi aplikasi 2.0.0 (versi baru dengan breaking changes) - menggunakan channel v2
- Live update 1.2.4 (kompatibel dengan 1.2.3)
- Live update 2.0.1 (kompatibel dengan 2.0.0)

## Strategi: Selalu Gunakan defaultChannel untuk Versi Major

**Pendekatan yang direkomendasikan:** Set `defaultChannel` untuk setiap versi major. Ini memastikan Anda selalu dapat push update ke grup pengguna spesifik tanpa mengandalkan penugasan channel dinamis.

```ts
// Rilis versi 1.x
defaultChannel: 'v1'

// Rilis versi 2.x
defaultChannel: 'v2'

// Rilis versi 3.x (masa depan)
defaultChannel: 'v3'
```

:::tip
**Manfaat dari pendekatan ini:**
- **Selalu punya kontrol** atas pengguna mana yang menerima update
- **Tidak perlu switching channel dinamis** di kode aplikasi Anda
- **Pemisahan yang jelas** antara berbagai versi aplikasi
- **Fleksibilitas** untuk push update ke grup versi spesifik mana pun
:::

## 1. Buat Channel untuk Versi Baru

```bash
# Buat channel untuk versi 2.x
npx @capgo/cli channel create v2
```

## 2. Update Capacitor Config untuk Versi 2.0.0

Update config Capacitor Anda sebelum build versi 2.0.0 untuk app store:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... opsi lainnya
      defaultChannel: 'v2' // Semua pengguna 2.0.0 akan menggunakan channel v2
    }
  }
};

export default config;
```

:::note
**Untuk versi 1.x:** Jika Anda tidak set `defaultChannel` awalnya, pengguna versi 1.x ada di channel `production`. Untuk versi major masa depan, selalu set channel spesifik seperti `v3`, `v4`, dll.
:::

## 3. Kelola Branch Kode Terpisah

Buat branch git terpisah untuk maintain kompatibilitas antara versi aplikasi:

```bash
# Buat dan maintain branch untuk update versi 1.x
git checkout -b v1-maintenance
git push origin v1-maintenance

# Branch main Anda lanjutkan dengan development versi 2.x
git checkout main
```

:::warning
**Kritis:** Jangan pernah push bundle JavaScript ke aplikasi lama yang mengharapkan kode native/API yang tidak mereka miliki. Selalu build update dari branch yang sesuai:
- **Branch v1-maintenance**: Untuk update ke aplikasi 1.x (channel production)
- **Branch main**: Untuk update ke aplikasi 2.x (channel v2)
:::

## 4. Upload Bundle ke Channel Masing-masing

```bash
# Untuk update 1.x: Build dari branch v1-maintenance
git checkout v1-maintenance
# Buat perubahan kompatibel 1.x Anda di sini
npx @capgo/cli bundle upload --channel production

# Untuk update 2.x: Build dari branch main
git checkout main
# Buat perubahan 2.x Anda di sini
npx @capgo/cli bundle upload --channel v2
```

## 5. Aktifkan Self-Assignment

```bash
# Izinkan aplikasi untuk self-assign ke channel v2
npx @capgo/cli channel set v2 --self-assign
```

## 6. Deploy ke App Store

Build dan deploy versi 2.0.0 ke app store. Semua pengguna yang download versi ini (baik pengguna baru atau pengguna existing yang upgrade) akan otomatis menggunakan channel v2 karena dikonfigurasi di bundle aplikasi.

:::note
**Tidak perlu perubahan kode!** Karena `defaultChannel: 'v2'` di-bundle dengan versi app store, semua pengguna yang download versi 2.0.0 akan otomatis menggunakan channel yang benar.
:::

## Scaling ke Versi Masa Depan

Saat Anda merilis versi 3.0.0 dengan lebih banyak breaking changes:

```bash
# Buat channel untuk versi 3.x
npx @capgo/cli channel create v3
```

```ts
// capacitor.config.ts untuk versi 3.0.0
const config: CapacitorConfig = {
  // ...
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3' // Pengguna versi 3.x
    }
  }
};
```

Sekarang Anda dapat push update ke versi mana pun:
- Channel `production` → Pengguna versi 1.x
- Channel `v2` → Pengguna versi 2.x
- Channel `v3` → Pengguna versi 3.x

## 7. Cleanup (Setelah Migrasi)

Setelah semua pengguna bermigrasi ke versi 2.x (hitung 3-4 bulan):

1. Hapus `defaultChannel` dari config Capacitor Anda
2. Hapus channel v2:

```bash
npx @capgo/cli channel delete v2
```

3. Hapus branch v1-maintenance:

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::tip
Pendekatan ini memastikan pengguna hanya menerima update yang kompatibel dengan versi aplikasi mereka
:::

:::warning
Selalu test update secara menyeluruh di setiap channel sebelum deployment
:::

:::note
Anda dapat dengan aman menghapus channel v2 di Capgo bahkan jika beberapa pengguna masih memiliki channel override. Mereka akan otomatis menerima update dari channel production.
:::

## Maintain Update Versi 1.x

Untuk mengirim update yang kompatibel dengan versi 1.x:

1. Switch ke branch v1-maintenance:
```bash
git checkout v1-maintenance
```

2. Buat perubahan dan commit:
```bash
# Buat perubahan kompatibel 1.x
git add .
git commit -m "Fix untuk v1.x"
git push origin v1-maintenance
```

3. Build dan upload ke channel production:
```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
Jaga branch v1-maintenance Anda tetap up to date dengan bug fix yang kompatibel dengan versi 1.x, tapi jangan pernah merge breaking changes dari main
:::
