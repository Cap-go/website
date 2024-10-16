---
locale: id
---

Tutorial capgo/capacitor-data-storage-sqlite

Tutorial ini akan memandu Anda melalui proses menggunakan paket `@capgo/capacitor-data-storage-sqlite` untuk mengimplementasikan penyimpanan permanen key-value untuk data string sederhana di aplikasi Ionic Capacitor Anda.

## Prasyarat

Sebelum kita mulai, pastikan Anda telah menginstal yang berikut ini:

- Nodejs
- npm
- Proyek Ionic Capacitor

## Instalasi

1 Buka terminal atau command prompt Anda dan arahkan ke direktori proyek Anda.

2 Jalankan perintah berikut untuk menginstal paket:

```bash
npm install --save @capgo/capacitor-data-storage-sqlite
```

3 Setelah instalasi, sinkronkan proyek Capacitor Anda:

```bash
npx cap sync
```

4 Untuk platform Web, instal localforage:

```bash
npm install --save localforage
```

5 Untuk platform Electron, ikuti langkah tambahan ini:

```bash
npm install --save @capacitor-community/electron
npx cap add @capacitor-community/electron
cd electron
npm install --save sqlite3
npm install --save-dev @types/sqlite3
npm run build
cd ..
npx cap sync @capacitor-community/electron
```

## Penggunaan

Sekarang kita telah menginstal paket, mari kita lihat bagaimana cara menggunakannya di aplikasi Anda.

### Mengimpor Plugin

Pertama, impor plugin di file TypeScript Anda:

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';
```

### Membuka Penyimpanan

Untuk mulai menggunakan penyimpanan, Anda perlu membuka penyimpanan:

```typescript
async function openStore() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  await store.openStore({ database: "my_db", table: "my_table" });
  return store;
}
```

### Mengatur Nilai

Untuk mengatur nilai di penyimpanan:

```typescript
async function setValue(store, key: string, value: string) {
  await store.set(key, value);
}
```

### Mengambil Nilai

Untuk mengambil nilai dari penyimpanan:

```typescript
async function getValue(store, key: string) {
  const result = await store.get(key);
  return result.value;
}
```

### Memeriksa Apakah Kunci Ada

Untuk memeriksa apakah kunci ada di penyimpanan:

```typescript
async function isKeyExists(store, key: string) {
  const result = await store.iskey(key);
  return result.result;
}
```

### Menghapus Kunci

Untuk menghapus kunci dari penyimpanan:

```typescript
async function removeKey(store, key: string) {
  await store.remove(key);
}
```

### Menghapus Penyimpanan

Untuk menghapus semua data dari penyimpanan:

```typescript
async function clearStore(store) {
  await store.clear();
}
```

### Menutup Penyimpanan

Saat Anda selesai menggunakan penyimpanan, adalah praktik baik untuk menutupnya:

```typescript
async function closeStore(store) {
  await store.closeStore();
}
```

## Contoh Penggunaan

Berikut adalah contoh lengkap tentang cara menggunakan plugin:

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

async function dataStorageExample() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  
  try {
    // Open the store
    await store.openStore({ database: "my_db", table: "my_table" });

    // Set a value
    await store.set("myKey", "Hello, Capacitor!");

    // Get the value
    const result = await store.get("myKey");
    console.log("Value:", result.value);

    // Check if key exists
    const keyExists = await store.iskey("myKey");
    console.log("Key exists:", keyExists.result);

    // Remove the key
    await store.remove("myKey");

    // Clear the store
    await store.clear();

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the store
    await store.closeStore();
  }
}

dataStorageExample();
```

## Kesimpulan

Anda kini telah belajar bagaimana menggunakan paket `@capgo/capacitor-data-storage-sqlite` untuk mengimplementasikan sistem penyimpanan key-value di aplikasi Ionic Capacitor Anda. Plugin ini menyediakan cara sederhana untuk menyimpan dan mengambil data string di berbagai platform, termasuk iOS, Android, Electron, dan Web.

Ingat untuk menangani kesalahan dengan tepat dan menutup penyimpanan saat Anda selesai menggunakannya. Untuk penggunaan yang lebih lanjut, termasuk bekerja dengan basis data terenkripsi, beberapa tabel, dan impor/ekspor JSON, rujuk ke dokumentasi API lengkap plugin ini.

Untuk informasi lebih rinci tentang API dan opsi yang tersedia, rujuk ke README atau dokumentasi paket.