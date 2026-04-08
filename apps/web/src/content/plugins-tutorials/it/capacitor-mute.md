---
locale: it
---

cantare @capgo/capacitor-mute Pacote

O pacote `@capgo/capacitor-mute` é um plugin do Capacitor que permite detectar se o interruptor de mudo está ativado ou desativado em um dispositivo. Ele fornece uma API simples para verificar o status de mudo do dispositivo.

## Instalação

Você pode instalar o pacote `@capgo/capacitor-mute` usando npm:

[[BLOCO_DE_CÓDIGO]]

## Uso

Para usar o pacote `@capgo/capacitor-mute`, você precisa importá-lo e chamar o método `isMuted()`.

[[BLOCO_DE_CÓDIGO]]

O método `isMuted()` retorna uma promessa que se resolve em um valor booleano indicando se o dispositivo está mudo ou não. Se a promessa for rejeitada, uma mensagem de erro é exibida.

## Exemplo

Aqui está um exemplo de como você pode usar o pacote `@capgo/capacitor-mute` para verificar o status de mudo do dispositivo e exibir uma mensagem com base no resultado.

[[BLOCO_DE_CÓDIGO]]

Neste exemplo, se o dispositivo estiver mudo, uma mensagem "O dispositivo está atualmente mudo" é exibida. Se o dispositivo não estiver mudo, uma mensagem "O dispositivo não está mudo" é exibida.

## Problemas Possíveis

Observe que em dispositivos iOS com Xcode 14, a biblioteca `@capgo/capacitor-mute` pode não estar configurada conforme esperado pela Apple. Esse problema está sendo tratado atualmente pelos desenvolvedores da biblioteca. Para resolver esse problema, você pode seguir as instruções fornecidas na seção [problema conhecido](https://githubcom/CocoaPods/CocoaPods/issues/8891/) da documentação do pacote.

## Conclusão

O pacote `@capgo/capacitor-mute` é um plugin útil do Capacitor que permite detectar o status de mudo de um dispositivo. Ao seguir os passos de instalação e uso descritos neste tutorial, você pode integrar facilmente este pacote em seu projeto Capacitor e utilizar sua API para verificar o status de mudo.