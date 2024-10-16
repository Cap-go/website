---
locale: id
---

Menggunakan Paket `@capgo/konsta`

Dalam tutorial ini, kami akan membimbing Anda tentang cara menggunakan paket `@capgo/konsta` untuk membuat komponen UI seluler yang sempurna dengan komponen desain iOS dan Material untuk React, Vue, dan Svelte. Paket `@capgo/konsta` dibangun dengan Tailwind CSS dan menawarkan berbagai macam komponen UI yang dapat dengan mudah diintegrasikan ke dalam proyek Anda.

Ikuti langkah-langkah di bawah ini untuk memulai:

## Langkah 1: Instal Dependensi

Untuk mulai menggunakan paket `@capgo/konsta`, Anda perlu menginstal semua dependensi yang diperlukan. Buka terminal Anda dan navigasikan ke direktori proyek Anda. Kemudian, jalankan perintah berikut:

```shell
$ npm install @capgo/konsta
```

Perintah ini akan menginstal paket `@capgo/konsta` dan dependensinya dalam proyek Anda.

## Langkah 2: Impor dan Gunakan Komponen

Setelah dependensi terinstal, Anda dapat mengimpor dan menggunakan komponen dari paket `@capgo/konsta` dalam proyek Anda. Tergantung pada kerangka kerja pilihan Anda (React, Vue, atau Svelte), ikuti langkah-langkah relevan di bawah ini:

### React

Untuk menggunakan komponen `@capgo/konsta` dalam proyek React, impor komponen yang diinginkan seperti yang ditunjukkan di bawah ini:

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your React component
const MyComponent = () => {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
};
```

### Vue

Untuk menggunakan komponen `@capgo/konsta` dalam proyek Vue, impor komponen yang diinginkan seperti yang ditunjukkan di bawah ini:

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Vue component
export default {
  components: {
    Button,
  },
  template: `
    <div>
      <Button>Click me</Button>
    </div>
  `,
};
```

### Svelte

Untuk menggunakan komponen `@capgo/konsta` dalam proyek Svelte, impor komponen yang diinginkan seperti yang ditunjukkan di bawah ini:

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Svelte component
let name = 'world';
```

```html
<script>
  import { Button } from '@capgo/konsta';

  // Use the Button component in your Svelte component
  let name = 'world';
</script>

<main>
  <Button>Hello {name}!</Button>
</main>
```

## Langkah 3: Kustomisasi dan Gaya Komponen

Paket `@capgo/konsta` menyediakan berbagai macam komponen UI yang dapat dengan mudah disesuaikan dan dihias agar sesuai dengan desain proyek Anda. Anda dapat memodifikasi properti komponen, menambahkan kelas CSS kustom, atau menerapkan gaya inline untuk mencapai tampilan dan nuansa yang diinginkan. Lihat dokumentasi yang tersedia di [https://konstauicom](https://konstauicom/) untuk informasi lebih lanjut tentang menyesuaikan dan menghias komponen.

## Langkah 4: Bangun dan Uji

Setelah mengintegrasikan komponen `@capgo/konsta` ke dalam proyek Anda, Anda dapat membangun dan menguji aplikasi Anda. Gunakan perintah build yang relevan untuk proyek Anda untuk mengompilasi kode dan menghasilkan versi produksi. Lihat file `packagejson` di proyek Anda untuk skrip build yang tersedia.

## Kesimpulan

Selamat! Anda telah berhasil mempelajari cara menggunakan paket `@capgo/konsta` untuk membuat komponen UI seluler yang sempurna dalam proyek React, Vue, atau Svelte Anda. Anda dapat menjelajahi dokumentasi dan bereksperimen dengan berbagai komponen dan opsi kustomisasi untuk meningkatkan antarmuka pengguna aplikasi Anda.

Untuk bantuan lebih lanjut atau melaporkan masalah, silakan merujuk ke dokumentasi resmi `@capgo/konsta` dan komunitas. Selamat coding!