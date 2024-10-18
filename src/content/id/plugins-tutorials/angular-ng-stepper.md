---
locale: id
---

Sing @capgo/angular-ng-stepper Paket

Paket `@capgo/angular-ng-stepper` adalah sebuah pustaka untuk proyek Angular yang menyediakan komponen stepper. Komponen ini memungkinkan Anda untuk membuat formulir multi-langkah atau antarmuka pengguna seperti wizard.

## Instalasi

Untuk menggunakan paket `@capgo/angular-ng-stepper` dalam proyek Angular Anda, ikuti langkah-langkah berikut:

1. Instal paket menggunakan npm atau yarn:

   ```bash
   npm install @capgo/angular-ng-stepper
   ```

   atau

   ```bash
   yarn add @capgo/angular-ng-stepper
   ```

2. Impor `NgStepperModule` di modul Angular Anda:

   ```typescript
   import { NgStepperModule } from '@capgo/angular-ng-stepper';
   
   @NgModule({
     imports: [
       NgStepperModule
     ]
   })
   export class AppModule { }
   ```

## Penggunaan

Setelah Anda menginstal dan mengimpor `NgStepperModule`, Anda dapat menggunakan komponen stepper di template Angular Anda.

```html
<ng-stepper>
  <ng-step label="Step 1">
    Step 1 Content
  </ng-step>
  <ng-step label="Step 2">
    Step 2 Content
  </ng-step>
  <ng-step label="Step 3">
    Step 3 Content
  </ng-step>
</ng-stepper>
```

Komponen `ng-stepper` bertindak sebagai wadah untuk langkah-langkah, sementara komponen `ng-step` mewakili langkah individu. Anda dapat menyesuaikan label setiap langkah dengan memberikan atribut `label`.

## API

Paket `@capgo/angular-ng-stepper` menyediakan beberapa metode dan opsi API untuk berinteraksi dengan komponen stepper secara programatik.

### Komponen Stepper

#### Properti

- `currentStep: number`: Indeks langkah yang saat ini aktif.
- `nextButtonText: string`: Teks yang ditampilkan pada tombol selanjutnya.
- `previousButtonText: string`: Teks yang ditampilkan pada tombol sebelumnya.

#### Metode

- `goToStep(index: number)`: Beralih secara programatik ke langkah tertentu dengan memberikan indeksnya sebagai parameter.
- `next()`: Pindah ke langkah berikutnya.
- `previous()`: Pindah ke langkah sebelumnya.
- `reset()`: Mengatur ulang stepper ke keadaan awal.

### Komponen Step

#### Properti

- `label: string`: Label dari langkah.

## Kesimpulan

Paket `@capgo/angular-ng-stepper` menyediakan komponen stepper yang sederhana dan mudah digunakan untuk membuat formulir multi-langkah atau wizard dalam proyek Angular. Dengan mengikuti petunjuk instalasi dan penggunaan yang diberikan dalam tutorial ini, Anda dapat dengan cepat mengintegrasikan paket tersebut ke dalam aplikasi Angular Anda sendiri.