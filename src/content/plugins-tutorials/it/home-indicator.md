---
locale: it
---

capgo/home-indicator

O pacote `@capgo/home-indicator` permite ocultar e mostrar o indicador do botão de início no seu aplicativo Capacitor.

## Instalação

Para instalar o pacote, execute o seguinte comando no seu terminal:

[[BLOCO_DE_CÓDIGO]]

## API

O pacote fornece os seguintes métodos:

### `hide()`

[[BLOCO_DE_CÓDIGO]]

Ocultar o indicador do início

**Desde:** 001

### `show()`

[[BLOCO_DE_CÓDIGO]]

Mostrar o indicador do início

**Desde:** 001

### `isHidden()`

[[BLOCO_DE_CÓDIGO]]

Obter o status do indicador do início

**Retorna:** Promise[[TAG_HTML]]

**Desde:** 001

## Variáveis CSS

Você pode usar `--safe-area-inset-bottom` para garantir que seu conteúdo não fique oculto pelo indicador do início. Esta variável é injetada pelo plugin para Android. É útil se você ativar o modo de tela cheia real no Android.

Uso de exemplo:

[[BLOCO_DE_CÓDIGO]]

## Créditos

Este plugin foi criado originalmente para [Kickcom](https://kickcom/) por [Capgo](https://capgoapp/).

Para mais informações e atualizações, confira [Capgo](https://capgoapp/).