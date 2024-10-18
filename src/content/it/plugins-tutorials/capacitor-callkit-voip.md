---
locale: it
---

Cantar @capgo/capacitor-callkit-voip Pacote

O pacote `@capgo/capacitor-callkit-voip` fornece funcionalidade PushKit para o Ionic Capacitor. Ele é projetado para ser usado com o aplicativo BetterCall, mas também pode ser utilizado em outros projetos.

## Instalação

Para instalar o pacote, você pode executar o seguinte comando:

[[BLOCO_DE_CÓDIGO]]

Por favor, certifique-se de ter o Xcode instalado em seu computador antes de prosseguir com a instalação.

## Configurando o Projeto iOS

Para configurar seu projeto iOS para usar o pacote, siga estas etapas:

1 Abra seu projeto Xcode e vá para o painel Capabilities.
2 Ative a capacidade "Voice over IP" selecionando a caixa de seleção.
3 Registre seu certificado no site da Apple Developer. Você pode encontrar instruções detalhadas no link fornecido.
4 Baixe o certificado e abra-o para importá-lo no aplicativo Acesso a Chaves.
5 Exporte os certificados como mostrado na imagem fornecida.
6 Navegue até a pasta onde você exportou o arquivo e execute o seguinte comando no terminal:

[[BLOCO_DE_CÓDIGO]]

Isso gerará um arquivo de certificado `apppem` que pode ser usado para enviar notificações VOIP.

## Uso

Uma vez que o pacote esteja instalado e o projeto iOS esteja configurado, você pode começar a usá-lo em seu código.

Primeiro, importe o módulo `CallKitVoip`:

[[BLOCO_DE_CÓDIGO]]

Em seguida, você precisa chamar o método `register()` para iniciar o registro de notificações VOIP:

[[BLOCO_DE_CÓDIGO]]

Para enviar uma notificação VOIP, você pode usar o script `sendVoipsh` fornecido:

[[BLOCO_DE_CÓDIGO]]

## Conclusão

O pacote `@capgo/capacitor-callkit-voip` permite que você adicione funcionalidade PushKit ao seu projeto Ionic Capacitor. Ao seguir as instruções de instalação e uso, você será capaz de enviar e receber notificações VOIP em seu aplicativo.