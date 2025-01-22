---
locale: id
---

Sing @capgo/capacitor-callkit-voip Paket

Paket `@capgo/capacitor-callkit-voip` menyediakan fungsionalitas PushKit untuk Ionic Capacitor. Paket ini dirancang untuk digunakan dengan aplikasi BetterCall, tetapi juga dapat digunakan dalam proyek lain.

## Instalasi

Untuk menginstal paket, Anda dapat menjalankan perintah berikut:

```bash
npm install @capgo/capacitor-callkit-voip
ionic cap sync
```

Pastikan Anda telah menginstal Xcode di komputer Anda sebelum melanjutkan dengan instalasi.

## Mengonfigurasi Proyek iOS

Untuk mengonfigurasi proyek iOS Anda agar menggunakan paket ini, ikuti langkah-langkah berikut:

1 Buka proyek Xcode Anda dan pergi ke panel Kapabilitas
2 Aktifkan kapabilitas "Voice over IP" dengan mencentang kotak pilihan
3 Daftarkan sertifikat Anda di situs web Apple Developer. Anda dapat menemukan petunjuk rinci di tautan yang disediakan
4 Unduh sertifikat dan buka untuk mengimpornya ke dalam aplikasi Keychain Access
5 Ekspor sertifikat seperti yang ditunjukkan dalam gambar yang disediakan
6 Arahkan ke folder tempat Anda mengekspor file dan eksekusi perintah berikut di terminal:

```bash
openssl pkcs12 -in YOUR_CERTIFICATES.p12 -out app.pem -nodes -clcerts
```

Ini akan menghasilkan file sertifikat `apppem` yang dapat digunakan untuk mengirim notifikasi VOIP.

## Penggunaan

Setelah paket terinstal dan proyek iOS dikonfigurasi, Anda dapat mulai menggunakannya dalam kode Anda.

Pertama, impor modul `CallKitVoip`:

```typescript
import { CallKitVoip } from "@capgo/capacitor-callkit-voip";
```

Selanjutnya, Anda perlu memanggil metode `register()` untuk memulai pendaftaran notifikasi VOIP:

```typescript
async function registerVoipNotification() {
  // Register token
  CallKitVoip.addListener("registration", ({ token }) => {
    console.log(`VOIP token has been received ${token}`);
  });

  // Handle incoming call
  CallKitVoip.addListener("callAnswered", ({ username, connectionId }) => {
    console.log(`Call has been received from ${username} (connectionId: ${connectionId})`);
  });

  // Init plugin, start registration of VOIP notifications
  await CallKitVoip.register();
  console.log("Push notification has been registered");
}
```

Untuk mengirim notifikasi VOIP, Anda dapat menggunakan skrip `sendVoipsh` yang disediakan:

```shell
#!/bin/bash

function main {
    connectionId=${1:?"connectionId should be specified"}
    token=${2:?"Enter device token that you received on register listener"}
    username=${3:-Anonymus"}

    curl -v \
    -d "{\"aps\":{\"alert\":\"Incoming call\", \"content-available\":\"1\"}, \"Username\": \"${username}\", \"ConnectionId\": \"${connectionId}\"}" \
    -H "apns-topic: .voip" \
    -H "apns-push-type: voip" \
    -H "apns-priority: 10" \
    --http2 \
    --cert app.pem \
    "https://api.development.push.apple.com/3/device/${token}"
}

main $@
```

## Kesimpulan

Paket `@capgo/capacitor-callkit-voip` memungkinkan Anda menambahkan fungsionalitas PushKit ke proyek Ionic Capacitor Anda. Dengan mengikuti instruksi instalasi dan penggunaan, Anda akan dapat mengirim dan menerima notifikasi VOIP dalam aplikasi Anda.