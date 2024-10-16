---
locale: it
---

capgo/inappbrowser Paket Öğretici

`@capgo/inappbrowser` paketi, bir URL'yi uygulama içi tarayıcı penceresinde açmanızı sağlayan bir Capacitor eklentisidir. Bu paketin nasıl kullanılacağına dair adım adım bir rehber:

## Kurulum

Paketi kurmak için, projenizin kök dizininde şu komutu çalıştırın:

[[KOD_BLOKU]]

## Kullanım

1 `@capgo/inappbrowser` paketinden `InAppBrowser` sınıfını içe aktarın:

   [[KOD_BLOKU]]

2 `InAppBrowseropen` metodunu kullanarak bir URL'yi yeni bir tam ekran penceresinde açın:

   [[KOD_BLOKU]]

   `"YOUR_URL"` yerine açmak istediğiniz URL'yi yerleştirin.

3 `InAppBrowser` sınıfının sağladığı diğer metodları da kullanabilirsiniz:

   - `clearCookies`: Tüm çerezleri temizle
   - `close`: Uygulama içi tarayıcı penceresini kapat
   - `openWebView`: Araç çubukları ile yeni bir webview'de bir URL aç
   - `setUrl`: Uygulama içi tarayıcının URL'sini ayarla

   Bu metodlar hakkında daha fazla bilgi için aşağıdaki API bölümüne bakın.

## API

`@capgo/inappbrowser` paketi aşağıdaki API metodlarını sağlar:

- `open(options: OpenOptions)`: Yeni bir tam ekran penceresinde bir URL açar. Parametre olarak bir `OpenOptions` nesnesi alır.
- `clearCookies()`: Tüm çerezleri temizle.
- `close()`: Uygulama içi tarayıcı penceresini kapat.
- `openWebView(options: OpenWebViewOptions)`: Araç çubukları ile yeni bir webview'de bir URL açar. Parametre olarak bir `OpenWebViewOptions` nesnesi alır.
- `setUrl(options: { url: string; })`: Uygulama içi tarayıcının URL'sini ayarlar. Parametre olarak `url` özelliğine sahip bir nesne alır.
- `addListener('urlChangeEvent', listenerFunc: UrlChangeListener)`: URL değişim olaylarını dinler. Parametre olarak bir `UrlChangeListener` fonksiyonu alır.
- `addListener('closeEvent', listenerFunc: UrlChangeListener)`: kapatma olaylarını dinler. Parametre olarak bir `UrlChangeListener` fonksiyonu alır.
- `addListener('confirmBtnClicked', listenerFunc: UrlChangeListener)`: onay butonuna tıklama olaylarını dinler. Parametre olarak bir `UrlChangeListener` fonksiyonu alır.
- `removeAllListeners()`: Tüm olay dinleyicilerini kaldır.

Bu metodların parametreleri ve dönen değerleri hakkında daha fazla bilgi için paket belgelerine bakın.

Ve hepsi bu kadar! `@capgo/inappbrowser` paketini kullanarak Capacitor'da uygulama içi tarayıcı penceresinde URL'leri nasıl açacağınızı öğrendiniz. İyi kodlamalar!