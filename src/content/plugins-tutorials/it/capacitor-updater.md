---
locale: it
---

capgo/capacitor-updater Paket Öğretici

Bu öğretici, Ionic Capacitor uygulamanızda otomatik güncellemeleri etkinleştirmek için `@capgo/capacitor-updater` paketinin kullanım sürecinde size rehberlik edecektir.

## Önkoşullar

Başlamadan önce aşağıdakilerin yüklü olduğundan emin olun:

- Nodejs
- npm

## Kurulum

`@capgo/capacitor-updater` paketini kurmak için terminalinizi veya komut istemcilerini açın ve aşağıdaki komutu çalıştırın:

[[KOD_BLOK]]

Bu, paketi projenize indirecek ve kuracaktır.

### Eklentiyi Kur

Uygulamanıza eklenmesi gereken kod:

`npm i @capgo/capacitor-updater && npx cap sync`
Eklentiyi Capacitor uygulamanıza kurmak için.

Sonra, JS paketinin sağlıklı olduğunu bildirmek için uygulamanıza bu kodu ekleyin; eğer bunu yapmazsanız, yerel eklenti önceki sürüme geri dönecektir:

[[KOD_BLOK]]

Bu, yerel eklentiye kurulumun başarılı olduğunu bildirecektir.

Sonra uygulamanızı güncellemek için `npm run build && npx cap copy` komutunu çalıştırın.

### Capgo CLOUD'a Giriş Yap

Öncelikle, CLI ile giriş yapmak için hesabınızdaki `all` [apikey](https://console.capgo.app/dashboard/apikeys/) kullanın:

`npx @capgo/cli@latest login YOU_KEY`

### İlk uygulamanızı ekleyin

Öncelikle CLI ile Capgo Cloud'da bir uygulama oluşturarak başlayalım.

`npx @capgo/cli@latest app add`

Bu komut, uygulamayı oluşturmak için Capacitor konfigürasyon dosyasında tanımlanan tüm değişkenleri kullanacaktır.

### İlk sürümünüzü yükleyin

Kodunuzu derleyip Capgo'ya göndermek için komutu çalıştırın:
`npx @capgo/cli@latest bundle upload`

Varsayılan olarak, sürüm adı `packagejson` dosyanızdaki ad olacaktır.

Yapının mevcut olup olmadığını [Capgo](https://console.capgo.app/) kontrol edin.

Bunu, [mobil kumanda uygulamamla](https://capgo.app/app_mobile/) test edebilirsiniz.

### Kanalı varsayılan yap

Uygulamanızı Capgo'ya gönderdikten sonra, uygulamaların Capgo'dan güncellemeleri alabilmesi için kanalınızı `varsayılan` yapmanız gerekmektedir.

`npx @capgo/cli@latest channel set production -s default`

## Bir Cihazda Canlı Güncelleme Al

Uygulamanızın Deploy'dan canlı bir güncelleme alabilmesi için uygulamayı bir cihazda veya emülatörde çalıştırmanız gerekmektedir. Bunu yapmanın en kolay yolu, yerel uygulamanızı bilgisayarınıza bağlı bir emülatörde veya cihazda başlatmak için aşağıdaki komutu kullanmaktır.

    npx cap run [ios | android]

Uygulamayı açın, arka plana gönderin ve tekrar açın; güncelleme yapıldığını loglarda görmelisiniz.

Tebrikler! 🎉 İlk Canlı Güncellemenizi başarıyla dağıttınız. Bu, Canlı Güncellemelerle yapabileceklerinizin sadece başlangıcı. Daha fazla bilgi edinmek için [Canlı Güncellemeler belgelerini](/docs/plugin/cloud-mode/getting-started/) görüntüleyin.

> Yerel olarak güncellemeleri almaya devam etmemek için bu komutu çalıştırın.
`npx @capgo/cli@latest channel set`

## Sonuç

Tebrikler! `@capgo/capacitor-updater` paketini kullanarak Ionic Capacitor uygulamanızda otomatik güncellemeleri etkinleştirmeyi başarıyla öğrendiniz. İster otomatik güncelleme, ister manuel kurulum seçin, uygulamanızı güncel tutmak için artık araçlara sahipsiniz.
