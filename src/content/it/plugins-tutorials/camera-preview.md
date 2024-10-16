---
locale: it
---

capgo/camera-preview Paket Eğitimi

Bu eğiticide, `@capgo/camera-preview` paketini Capacitor projenizde nasıl kullanacağınızı adım adım göstereceğiz. Bu paket, JavaScript ve HTML kodunuzdan kamerayla etkileşimde bulunmanızı sağlar.

## Kurulum

`@capgo/camera-preview` paketini kurmak için terminalinizi açın ve aşağıdaki komutlardan birini çalıştırın:

```bash
yarn add @capgo/camera-preview
```

ya da

```bash
npm install @capgo/camera-preview
```

Kurulum tamamlandıktan sonra, Capacitor projenizi senkronize etmek için aşağıdaki komutu çalıştırın:

```bash
npx cap sync
```

### Ek Android Kurulum Adımları

Android kullanıyorsanız, projenizde bazı ek değişiklikler yapmanız gerekmektedir. `android/app/src/main/AndroidManifest.xml` dosyasını açın ve CAMERA iznini talep etmek için kapanış `</application>` etiketinin üzerindeki satıra aşağıdaki satırı ekleyin:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

Daha fazla yardımcı olmak için, [Capacitor belgelerine](https://capacitorjs.com/docs/android/configuration/#configuring-androidmanifest.xml/) başvurun.

### Ek iOS Kurulum Adımları

iOS kullanıyorsanız, `Info.plist` dosyanıza iki izin eklemeniz gerekmektedir. [Capacitor belgelerini](https://capacitorjs.com/docs/ios/configuration/#configuring-infoplist) takip edin ve `NSCameraUsageDescription` ve `NSMicrophoneUsageDescription` izinlerini ekleyin. `NSMicrophoneUsageDescription` izni, sesi kullanacaksanız yalnızca gereklidir. Ses gerekliyse, mikrofon izni talebini devre dışı bırakmak için `disableAudio` seçeneğini `true` olarak ayarlayabilirsiniz.

### Ek Web Kurulum Adımları

Ionic ile web platformunu kullanıyorsanız, `app.module.ts` dosyasındaki giriş scriptinize aşağıdaki satırı ekleyin:

```typescript
import '@capgo/camera-preview';
```

Bu, Capacitor'un eklentiden web platformunu kaydettirmesine izin verecektir.

## API

`@capgo/camera-preview` paketi aşağıdaki API yöntemlerini sağlar:

### start(options: CameraPreviewOptions)

Kamera önizleme örneğini başlatır.

### stop()

Kamera önizleme örneğini durdurur.

### capture(options: CameraPreviewPictureOptions)

Kameradan bir fotoğraf çeker.

### captureSample(options: CameraSampleOptions)

Bir örnek görüntü çeker.

### getSupportedFlashModes()

Desteklenen flaş modlarını getirir.

### getHorizontalFov()

Yatay görüş açısını getirir.

### setFlashMode(options: { flashMode: CameraPreviewFlashMode | string; })

Flaş modunu ayarlar.

### flip()

Kamerayı çevirir.

### setOpacity(options: CameraOpacityOptions)

Kamera opaklığını ayarlar.

### stopRecordVideo()

Bir video kaydını durdurur.

### startRecordVideo(options: CameraPreviewOptions)

Bir video kaydını başlatır.

Bu yöntemlerin parametreleri ve dönüş değerleri hakkında daha fazla bilgi için `@capgo/camera-preview` paketinin belgelerine başvurun.

## Sonuç

Bu eğiticide, `@capgo/camera-preview` paketini bir Capacitor projesinde nasıl kurup kullanacağımızı öğrendik. Mevcut API yöntemlerini ve kullanımını keşfettik. Şimdi bu paketi kullanarak uygulamanıza kamera işlevselliği entegre edebilirsiniz.