---
slug: automatic-capacitor-ios-build-codemagic
title: Costruzione automatica di Capacitor per IOS con Codemagic
description: >-
  Cómo configurar un pipeline de CI/CD para tu aplicación IOS Ionic usando
  Codemagic y Codemagic en 5 minutos (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Codemagic testflight illustrazione
keywords: 'Codemagic, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-android-build-codemagic
---
## Mar livre para iOS usando Codemagic

## Pré-requisitos

Antes de continuar com o tutorial…

-   Assinatura do programa de desenvolvedor iOS.
-   Desejo de ler 😆…

## Importante sobre o preço

![Preço Codemagic Action](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

O serviço é ‘_gratuito_’ até 500 minutos de macOS M1 por mês, dependendo da máquina escolhida.  
Vamos usar uma **_máquina macOS M1_**, você pode ver no screenshot seu preço e limites (preços na data da criação do tutorial, eles podem sofrer alterações no futuro)

🔴 **_Uma vez avisados sobre requisitos e preços, se você quiser, continuamos…_**

> **_📣_ No post, assumimos que temos o aplicativo criado no iTunes Connect, temos os certificados do ecossistema Apple, tudo será configurado pelo Codemagic!**

## Vamos mergulhar 🤿 

**Passos a seguir no post**

1.  _Usando a API do App Store Connect com Codemagic_  
2.  _Requisitos_  
3.  _Criando uma Chave da API do App Store Connect_  
4.  _Usando uma Chave da API do App Store Connect_  
5.  _Copiar arquivos Fastlane_  
6.  _Configurar Codemagic_  

## 1\. Usando a API do App Store Connect com Codemagic

> A partir de fevereiro de 2021, a autenticação de dois fatores ou verificação em duas etapas é obrigatória para todos os usuários fazerem login no App Store Connect. Esta camada extra de segurança para seu ID Apple ajuda a garantir que você é a única pessoa que pode acessar sua conta.  
> De [Suporte da Apple](https://developer.apple.com/support/authentication/)

> Para começar com match, você precisa revogar seus certificados existentes. Mas não se preocupe, você terá um novo diretamente.

### Requisitos

Para poder utilizar a API do App Store Connect, o Codemagic precisa de **três** coisas.

1.  ID do emissor.  
2.  ID da chave.  
3.  Arquivo da chave ou conteúdo da chave.  

### Criando uma Chave da API do App Store Connect

Para gerar chaves, você deve ter permissão de Admin no App Store Connect. Se você não tiver essa permissão, pode direcionar a pessoa relevante para este artigo e seguir as próximas instruções.

1 — Faça login no [App Store Connect](https://appstoreconnect.apple.com/).

2 — Selecione [Usuários e Acesso](https://appstoreconnect.apple.com/access/users/).

![Acesso do usuário do App Store Connect](/select_user_access.webp)

3 — Selecione a aba Chaves da API.

![Chaves da API do App Store Connect](/user_access_keys.webp)

4 — Clique em Gerar Chave da API ou no botão Adicionar (+).

![Criar chaves da API do App Store Connect](/user_access.webp)

5 —  Digite o nome da chave e selecione um nível de acesso. Recomendamos escolher os direitos de acesso `App Manager`, leia mais sobre permissões de funções do Programa de Desenvolvedor da Apple [aqui](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![Criar nome da chave da API do App Store Connect](/gen_key.webp)

6 — Clique em Gerar.

> **O acesso de uma chave API não pode ser limitado a aplicativos específicos.**

O nome da nova chave, ID da chave, um link para download e outras informações aparecem na página.

![Baixar chaves do App Store Connect](/download_key.webp)

Pegue todas as três informações necessárias aqui:  
<1> ID do Emissor.  
<2> ID da Chave.  
<3> Clique “Baixar Chave da API” para baixar sua chave privada da API. O link de download aparece apenas se a chave privada ainda não tiver sido baixada. A Apple não mantém uma cópia da chave privada. Portanto, você pode baixá-la apenas uma vez.

> _🔴_ Armazene sua chave privada em um lugar seguro. Você nunca deve compartilhar suas chaves, armazenar chaves em um repositório de código ou incluir chaves em código do lado do cliente.

### Adicionando a chave da API do App Store Connect ao Codemagic

1.  Abra as configurações da sua equipe Codemagic,  
![Selecionar integrações da equipe](/select_team.webp)  
![Abrir equipe](/open_team.webp)  
Selecione identidades de assinatura de código  
![Selecionar identidades de assinatura de código](/select_code_signing_identities.webp)  
E faça o upload do certificado  
![Fazer upload do certificado](/upload_certificate.webp)

2.  Clique no botão **Adicionar chave**.  
3.  Digite o `nome da chave da API do App Store Connect`. Este é um nome legível para humanos que será usado para se referir à chave mais tarde nas configurações do aplicativo.  
4.  Digite os valores de `ID do Emissor` e `ID da Chave`.  
5.  Clique em **Escolher um arquivo .p8** ou arraste o arquivo para fazer o upload da chave da API do App Store Connect baixada anteriormente.  
6.  Clique em **Salvar**.

_Now we can manage Codemagic with the App Store Connect API key, great!_  

## 2\. Criar certificados e perfis de provisionamento

#### Certificados

Abra o XCode e vá para **Configurações** > **Contas** > **ID Apple** > **Equipes** e selecione sua equipe.

![Identidades de assinatura de código](/code_signing_identities.webp)

Clique em **Gerenciar certificados** > **+** e selecione **Distribuição Apple**.

![Distribuição Apple](/apple_distribution.webp)

Então você pode criar um novo certificado.

Depois você precisa ir para o chaveiro para baixar o certificado como um arquivo `.p12`.

Para fazer isso, você precisa ir para o chaveiro, mudar para o chaveiro **login** e, em seguida, a aba **Meus Certificados**.

![Meus Certificados](/my_certificates.webp)

Então você pode selecionar o certificado que deseja baixar. (Procure pela data do certificado)

E, em seguida, clique com o botão direito no certificado e selecione **Exportar**.

Escolha o formato de arquivo **Personal Information Exchange (.p12)**.

Isso fará o download do certificado como um arquivo `.p12`.

#### Perfis de provisionamento

Abra [Apple Developer](https://developer.apple.com/account/resources/profiles/list) e selecione a equipe correta.

Então crie um novo perfil, clicando em **+** 

![Criar um novo perfil](/create_new_profile.webp)

E selecione **App Store Connect**. 

![Selecionar App Store Connect](/select_app_store_connect.webp)

Então você precisa selecionar o aplicativo correto, tenha cuidado, você não pode usar wildcards, caso contrário, a assinatura falhará.

![Selecionar o aplicativo correto](/select_app.webp)

Selecione o certificado correto que você criou anteriormente (procure pela data de expiração, deve ser o mesmo dia e mês de hoje) e clique em **Continuar**.

![Selecionar o certificado correto](/select_certificate.webp)

Finalmente, digite o nome do perfil e clique em **Gerar**. 

> O nome será usado para identificar o perfil no Codemagic.

![Gerar o perfil](/generate_profile.webp)

Você pode baixar o perfil como um arquivo `.mobileprovision`.

![Baixar o perfil](/download_profile.webp)

### Adicionando o certificado de assinatura de código

O Codemagic permite que você faça upload de certificados de assinatura de código como arquivos PKCS#12 que contêm tanto o certificado quanto a chave privada que é necessária para usá-lo. Ao fazer o upload, o Codemagic pedirá que você forneça a senha do certificado (se o certificado estiver protegido por senha) junto com um **Nome de Referência** exclusivo, que pode ser usado na configuração do `codemagic.yaml` para buscar o arquivo específico.

-   Fazer upload do certificado  
-   Gerar um novo certificado  
-   Recuperar do Portal do Desenvolvedor  

1.  Abra as configurações da sua equipe Codemagic, vá para **configurações do codemagic.yaml** > **Identidades de assinatura de código**.  
2.  Abra a aba **certificados iOS**.  
3.  Faça o upload do arquivo do certificado clicando em **Escolher um arquivo .p12 ou .pem** ou arrastando-o para o quadro indicado.  
4.  Digite a **senha do certificado** e escolha um **Nome de Referência**.  
5.  Clique em **Adicionar certificado**  

### Adicionando o perfil de provisionamento

O Codemagic permite que você faça upload de um perfil de provisionamento a ser usado para o aplicativo ou recupere um perfil do Portal do Desenvolvedor da Apple.

O tipo do perfil, equipe, id do pacote e data de expiração são exibidos para cada perfil adicionado às identidades de assinatura de código. Além disso, o Codemagic informará se um certificado de assinatura de código correspondente está disponível nas identidades de assinatura de código (um sinal verde no campo **Certificado**) ou não.

## 3\. Configurar Codemagic

**Configurar segredos do Codemagic**

Já se perguntou de onde vêm os valores do `ENV`? Bem, não é mais um segredo – vem do segredo do seu projeto. 🤦

## **4\. Configurar arquivo de fluxo de trabalho do Codemagic**

Crie um arquivo chamado `codemagic.yml` na raiz do seu projeto e adicione o seguinte.

```yaml
workflows:
  ionic-capacitor-ios-workflow:
    name: Capacitor iOS Workflow
    max_build_duration: 120
    instance_type: mac_mini_m1
    integrations:
      app_store_connect: CodeMagic
    environment:
      ios_signing:
        distribution_type: app_store
        bundle_identifier: YOUR_BUNDLE_IDENTIFIER
      vars:
        XCODE_WORKSPACE: ios/App/App.xcworkspace
        XCODE_SCHEME: App
        APP_STORE_APP_ID: YOUR_APP_STORE_APP_ID
      node: v20.14.0
      xcode: 15.4
      cocoapods: default
    triggering:
      events:
        - tag
      tag_patterns:
        - pattern: '*'
          include: true
    scripts:
      - name: Install dependencies
        script: |
          npm install
      - name: Cocoapods installation
        script: |
          cd ios/App && pod install
      - name: Update dependencies and copy web assets to native project
        script: |
          npm run build
          npx cap sync ios
      - name: Set up code signing settings on Xcode project
        script: |
          xcode-project use-profiles
      - name: Increment build number
        script: |
          cd $CM_BUILD_DIR/ios/App
          LATEST_BUILD_NUMBER=$(app-store-connect get-latest-app-store-build-number "$APP_ID")
          agvtool new-version -all $(($LATEST_BUILD_NUMBER + 1))
      - name: Build ipa for distribution
        script: |
          xcode-project build-ipa \
            --workspace "$XCODE_WORKSPACE" \
            --scheme "$XCODE_SCHEME"
    artifacts:
      - build/ios/ipa/*.ipa
      - /tmp/xcodebuild_logs/*.log
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.app
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM
    publishing:
      email:
        recipients:
          - YOUR_EMAIL
        notify:
          success: true # To not receive a notification when a build succeeds
          failure: false # To not receive a notification when a build fails
      app_store_connect:
        auth: integration
        # Configuration related to TestFlight (optional)
        # Note: This action is performed during post-processing.
        submit_to_testflight: true
        # Configuration related to App Store (optional)
        # Note: This action is performed during post-processing.
        submit_to_app_store: false

```

Este fluxo de trabalho deve ser acionado manualmente ou após cada _tag_ do GitHub, se você precisar automatizar a tag, por favor, consulte [Construção e lançamento automático com ações do GitHub](/blog/automatic-build-and-release-with-github-actions/) primeiro.

Então este fluxo de trabalho irá puxar suas dependências do NodeJS, instalá-las e construir seu aplicativo JavaScript.

> Cada vez que você enviar uma nova tag, um lançamento será construído no TestFlight.

Seu aplicativo não precisa usar Ionic, apenas a base do Capacitor é obrigatória, ele pode ter um antigo módulo Cordova, mas o plugin do Capacitor JS deve ser preferido.

## 5\. Acionar fluxo de trabalho

**Acionar o fluxo de trabalho**

Envie os novos commits para o branch `main` ou `developement` para acionar o fluxo de trabalho.

![Iniciado com commit](/build_result.webp)

Depois de alguns minutos, a construção deve estar disponível no seu painel do App Store Connect.

![Painel do Testflight](/testflight_app.webp)

## Iniciar manualmente

Você pode iniciar o fluxo de trabalho manualmente. 

Primeiro, selecione o aplicativo que você deseja construir, depois clique em **Iniciar nova construção**.

![Selecionar aplicativo](/select_app_codemagic.webp)

Então selecione o branch que você deseja construir.

![Selecionar branch](/select_branch.webp)

E clique em **Iniciar nova construção**.

Depois vá para a lista de construções

![Lista de construção](/build_list.webp)

E clique na construção para ver o resultado.

![Resultado da construção](/build_result.webp)

## Pode implantar do computador local

Sim, você pode, e é muito fácil.

Você pode usar o Xcode para construir e assinar seu aplicativo, como sempre.

### Obrigado

Este blog é baseado nos seguintes artigos:  
- [Entrega contínua para IOS usando Codemagic e ações do GitHub](https://litoarias.medium.com/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)  
- [Documentação do Codemagic](https://docs.Codemagic.tools/app-store-connect-api/)  
- [Esta mensagem do GitHub de @mrogunlana](https://github.com/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)
