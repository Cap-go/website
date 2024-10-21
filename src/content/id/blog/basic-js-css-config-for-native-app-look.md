---
slug: basic-js-css-config-for-native-app-look
title: Konfigurasi JS dan CSS dasar untuk tampilan aplikasi asli
description: >-
  Temukan cara mengonfigurasi aplikasi web Anda dengan pengaturan JavaScript dan
  CSS dasar agar terlihat dan berperilaku seperti aplikasi asli, termasuk
  menonaktifkan efek hover.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-05T00:00:00.000Z
updated_at: 2023-06-05T00:00:00.000Z
head_image: /native_app_look.webp
head_image_alt: Ilustrasi tampilan aplikasi asli
tag: Web Development
published: true
locale: id
next_blog: ''
---

# Konfigurasi JS dan CSS Dasar untuk Tampilan Aplikasi Native

Saat membangun aplikasi web, penting untuk membuatnya terlihat dan terasa seperti aplikasi native untuk memberikan pengalaman pengguna yang mulus. Dalam artikel ini, kita akan membahas konfigurasi JavaScript dan CSS dasar yang diperlukan untuk mencapai tampilan aplikasi native, termasuk menonaktifkan efek hover.

## Menonaktifkan Efek Hover

Pada perangkat sentuh, efek hover bisa menjadi masalah karena mereka tidak memiliki keadaan hover yang sebenarnya seperti perangkat desktop. Untuk menonaktifkan efek hover pada perangkat sentuh, Anda dapat menggunakan kode CSS berikut:

```css
@media (hover: none) {
  .element:hover {
    /* Reset the hover styles */
    background-color: initial;
    color: initial;
    /* Add any other style resets needed */
  }
}
```

Ganti `element` dengan selektor yang sesuai untuk elemen-elemen yang ingin Anda nonaktifkan efek hovernya.

## Menonaktifkan Pratinjau Tautan

Untuk menonaktifkan pratinjau tautan pada perangkat sentuh, Anda dapat menggunakan kode JavaScript berikut:

```javascript
document.addEventListener('touchstart', function(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
  }
});
```

## Menonaktifkan Seleksi

Untuk menonaktifkan seleksi teks, tambahkan kode CSS berikut ke stylesheet Anda:

```css
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

## Menonaktifkan Zoom

Untuk menonaktifkan zoom, tambahkan meta tag berikut ke bagian head file HTML Anda:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## Menambahkan Zone CSS Aman

Untuk memastikan konten Anda ditampilkan dalam area aman perangkat, tambahkan kode CSS berikut ke stylesheet Anda:

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

## Tips Tambahan

- Gunakan teknik desain responsif untuk memastikan aplikasi Anda terlihat bagus di semua perangkat
- Optimalkan kinerja aplikasi Anda dengan meminimalkan penggunaan pustaka dan kerangka kerja JavaScript yang berat
- Uji aplikasi Anda di berbagai perangkat dan browser untuk memastikan kompatibilitas dan pengalaman pengguna yang konsisten

Dengan mengikuti konfigurasi JavaScript dan CSS dasar ini, Anda dapat membuat aplikasi web yang terlihat dan terasa seperti aplikasi native, memberikan pengalaman pengguna yang mulus dan menyenangkan.