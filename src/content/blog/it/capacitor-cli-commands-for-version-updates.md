---
slug: capacitor-cli-commands-for-version-updates
title: Comandos de la CLI de Capacitor para Actualizaciones de Versión
description: Capacitor CLIを使用してアプリを更新するための基本的なコマンドとベストプラクティスを学び、最適なパフォーマンスと互換性を確保しましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-11T21:28:20.329Z
updated_at: 2025-05-11T21:29:40.056Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/682028f45e3fe4823b5e5a52-1746998980056.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, CLI, app updates, mobile development, iOS, Android, migration,
  Capgo, plugins
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI simplifica [atualizar seu aplicativo](https://capgo.app/plugins/capacitor-updater/) para iOS e Android. Aqui está o que você precisa saber:

1.   **Por que atualizar?** Mantenha-se seguro, melhore o desempenho e garanta compatibilidade com as versões mais recentes dos sistemas operacionais móveis.
2.   **Comandos-chave:** Use `npm install @capacitor/cli@latest` para atualizar o Capacitor CLI, `npx cap migrate` para aplicar alterações e `npx cap sync` para [finalizar atualizações](https://capgo.app/docs/plugin/cloud-mode/hybrid-update).
3.   **Passos específicos da plataforma:** Atualize o iOS com [CocoaPods](https://cocoapods.org/) (`pod install`) e as configurações do [Xcode](https://developer.apple.com/xcode/). Para Android, ajuste as configurações do [Gradle](https://gradle.org/) e verifique as versões do Java.
4.   **Use [Capgo](https://capgo.app/) para Atualizações Ao Vivo:** Implante alterações instantaneamente sem atrasos na loja de aplicativos, com recursos como reversão e análises em tempo real.

Atualizar garante que seu aplicativo continue eficiente e amigável ao usuário. Siga os passos acima para um processo tranquilo.

## Como Migrar Seu Aplicativo Ionic para [Capacitor](https://capacitorjs.com/) 3

![Capacitor](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/d5H729a-rBM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Antes de Atualizar

Dedicar um tempo para se preparar antes de atualizar pode evitar dores de cabeça mais tarde. Um pouco de preparação ajuda a evitar armadilhas comuns e garante que tudo funcione sem problemas. Aqui está o que você precisa focar para minimizar riscos durante o [processo de atualização](https://capgo.app/docs/plugin/cloud-mode/manual-update/).

### Verifique os Requisitos do Sistema

Primeiro, verifique se sua configuração de desenvolvimento atende aos requisitos para o Capacitor. As versões 6 e 7 têm necessidades de software específicas [\[1\]](https://capgo.app).

Aqui está o que você deve verificar:

1.   **Node.js**: Verifique se a versão do Node.js é compatível.
2.   **Ferramentas Específicas da Plataforma**:
    -   Para o desenvolvimento iOS, certifique-se de ter a versão mais recente do Xcode instalada.
    -   Para Android, confirme se o [Android Studio](https://developer.android.com/studio) está atualizado.

### Leia as Notas de Atualização

As notas de atualização são seu guia para entender como as mudanças podem afetar seu projeto. Reserve um tempo para revisar o seguinte:

1.   **Documentação Oficial**: Verifique o changelog do Capacitor e os guias de migração.
2.   **Mudanças Quebradoras**: Preste muita atenção a qualquer seção rotulada como "Mudanças Quebradoras". Estas costumam destacar atualizações cruciais que podem interromper seu fluxo de trabalho.
3.   **Compatibilidade de Plugins**: Verifique se todos os plugins do Capacitor em seu projeto são suportados pela nova versão.

## Comandos de Atualização da CLI

Esses comandos ajudam a atualizar seu aplicativo, garantindo que tudo continue funcionando sem problemas.

### Atualizar Capacitor CLI

Para ter acesso aos recursos mais recentes, atualize seu Capacitor CLI. Abra seu terminal e execute:

```bash
npm install -g @capacitor/cli@latest
```

Após a instalação, confirme a atualização verificando a versão do seu CLI:

```bash
npx cap --version
```

### Executar Comandos de Migração

No diretório do seu projeto, execute os seguintes comandos para atualizar os pacotes principais e específicos da plataforma do Capacitor:

```bash
# Update core Capacitor packages
npm install @capacitor/core@latest
npm install @capacitor/cli@latest

# Update platform-specific packages
npm install @capacitor/ios@latest
npm install @capacitor/android@latest

# Run the migration command
npx cap migrate
```

O comando `npx cap migrate` irá:

1.   Atualizar as configurações do seu aplicativo
2.   Sincronizar dependências
3.   Aplicar as alterações necessárias do projeto
4.   Validar plugins quanto à compatibilidade

Se algumas atualizações não forem tratadas automaticamente, você pode precisar completá-las manualmente.

### Concluir Passos Manuais

Para sincronizar seu projeto com as plataformas atualizadas, execute:

```bash
npx cap sync
```

Para automação adicional, você pode integrar a ferramenta CLI do Capgo executando:

```bash
npx @capgo/cli init
```

Por fim, verifique a atualização construindo seu aplicativo para cada plataforma:

```bash
# For iOS
npx cap open ios

# For Android
npx cap open android
```

Se você enfrentar problemas durante a atualização, a CLI fornecerá mensagens de erro detalhadas para ajudar na solução de problemas. Certifique-se de revisar a saída de compilação em busca de avisos ou erros que possam precisar da sua atenção.

## Atualizações de Plataforma

Com as atualizações principais concluídas, o próximo passo é ajustar as configurações da plataforma para projetos iOS e Android.

### Passos de Atualização do iOS

Para começar com seu projeto iOS, abra-o no Xcode e siga estes passos:

1.   **Atualizar Dependências do CocoaPods**  
    Comece atualizando suas dependências usando o CocoaPods. Navegue até o diretório do seu projeto iOS e execute o seguinte comando:
    
    ```bash
    cd ios/App
    pod install
    ```
    
2.   **Configurar Configurações do Xcode**  
    Certifique-se de que estas configurações do Xcode estão atualizadas para garantir seu funcionamento suave e conformidade:
    
    | **Configuração** | **Ação Necessária** | **Propósito** |
    | --- | --- | --- |
    | Alvo de Implantação | Defina uma versão mínima do iOS | Garantir compatibilidade |
    | Configurações de Compilação | Atualizar identidade de assinatura | Atender aos requisitos da App Store |
    | Catálogo de Ativos | Verifique ícones e ativos de splash | Manter consistência visual |
    
3.   **Limpar Compilação**  
    Limpe os arquivos em cache e faça uma compilação limpa para evitar problemas remanescentes:
    
    ```bash
    # Clean the build folder
    xcodebuild clean
    # Build the project
    xcodebuild build
    ```
    

Uma vez que as atualizações do iOS estejam completas, você pode direcionar sua atenção para o projeto Android.

### Passos de Atualização do Android

Para Android, abra o projeto no Android Studio e siga estes passos:

1.   **Atualizar Configuração do Gradle**  
    Abra seu arquivo `build.gradle` e confirme se essas configurações estão corretamente configuradas:
    
    ```kotlin
    android {
        compileSdkVersion 33
        defaultConfig {
            minSdkVersion 22
            targetSdkVersion 33
        }
    }
    ```
    
2.   **Sincronizar Arquivos do Projeto**  
    Sincronize o projeto com os arquivos Gradle para garantir que todas as dependências estejam atualizadas. Este passo pode também envolver a atualização das ferramentas SDK e resolução de quaisquer conflitos.
    
3.   **Verificar Versão do Java**  
    Verifique se você está usando a versão correta do Java, pois isso é crucial para a compatibilidade com Gradle e recursos do Android:
    
    ```bash
    # Check the current Java version
    ./gradlew --version
    ```
    

Certifique-se de prestar atenção especial à sua configuração do Gradle. Algumas atualizações podem exigir uma versão mais recente do Gradle para suportar efetivamente os recursos mais recentes do Android.

## Atualizações Ao Vivo com [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/0270fe931d56d422c8e52846495749c7.jpg)

Uma vez que sua plataforma esteja configurada, você pode usar o Capgo para implantar alterações instantaneamente sem esperar por aprovações da loja de aplicativos. Este passo melhora suas atualizações de plataforma, permitindo capacidades de implantação em tempo real.

### Configurando o Capgo

Começar com o Capgo é simples. Você pode inicializá-lo com um comando simples:

```bash
npx @capgo/cli init
```

Este recurso simplifica o processo de atualização, mantendo seu aplicativo atualizado sem os atrasos dos ciclos tradicionais de revisão. O Capgo é compatível com o Capacitor 6 e 7, tornando-o uma escolha flexível para sua configuração existente.

| **Recurso** | **Descrição** | **Benefício** |
| --- | --- | --- |
| Criptografia de Ponta a Ponta | Segurança embutida para atualizações | Garante que apenas usuários autorizados possam acessar atualizações |
| [Sistema de Canal](https://capgo.app/docs/plugin/cloud-mode/channel-system/) | Distribuição avançada de atualizações | Direcionar segmentos específicos de usuários |
| Análises em Tempo Real | Monitorar o desempenho da atualização | Acompanhar taxas de sucesso e engajamento do usuário |

### Recursos de Segurança da Atualização

O Capgo prioriza atualizações seguras e confiáveis, alcançando uma taxa de adoção de 95% dentro de 24 horas e uma taxa de sucesso global de 82% [\[1\]](https://capgo.app). Inclui vários recursos de segurança importantes:

1.   **Capacidade de Reversão**: Reverter rapidamente para uma versão anterior se ocorrerem problemas.
2.   **Rastreamento de Erros**: Identificar e resolver problemas antes que afetem os usuários.
3.   **Distribuição baseada em Canal**: [Teste atualizações com grupos beta](https://capgo.app/blog/how-to-send-specific-version-to-users/) antes de lançá-las amplamente.

### Integração CI/CD

Uma vez que as medidas de segurança estejam em vigor, você pode integrar o Capgo em seu pipeline CI/CD para implantações suaves e eficientes. O Capgo já configurou CI/CD para mais de 50 aplicativos, oferecendo soluções econômicas em comparação com outras opções [\[1\]](https://capgo.app).

Aqui está um exemplo de comando de implantação:

```bash
npx @capgo/cli deploy --channel production
```

O Capgo suporta uma variedade de plataformas CI/CD, incluindo:

1.   [GitHub Actions](https://docs.github.com/actions)
2.   [GitLab CI](https://docs.gitlab.com/ee/ci/)
3.   [Jenkins](https://www.jenkins.io/)
4.   Configurações de pipeline personalizadas

> "Nós configuramos seu pipeline CI/CD diretamente na sua plataforma preferida, seja GitHub Actions, GitLab CI, ou outros. Nós não hospedamos CI/CD ou cobramos para mantê-lo." - Capgo [\[1\]](https://capgo.app)

Para equipes que buscam assistência especializada, o Capgo oferece um serviço profissional de configuração CI/CD por $2.600. Esta configuração única inclui configuração de pipeline personalizada e aconselhamento especializado sobre as melhores práticas de implantação de aplicativos móveis [\[1\]](https://capgo.app).

## Corrigir Problemas Comuns

[As atualizações do Capacitor](https://capgo.app/plugins/capacitor-updater/) podem, às vezes, levar a problemas que interrompem a estabilidade do seu aplicativo. Aqui está como você pode abordar esses problemas comuns de forma eficaz.

### Corrigir Conflitos de Pacotes

Comece verificando se há incompatibilidades de versão nos seus pacotes do Capacitor. Use o seguinte comando:

```bash
npm ls @capacitor/core
```

Revise a saída e certifique-se de que as versões de **@capacitor/core**, **@capacitor/ios** e **@capacitor/android** sejam consistentes em seu arquivo `package.json`. Se você identificar conflitos, atualize ou remova pacotes problemáticos para estabilizar seu ambiente.

Após resolver isso, verifique novamente se todos os plugins instalados são compatíveis com a versão atualizada do Capacitor.

### Verifique o Suporte do Plugin

Antes de atualizar, certifique-se de que seus plugins estão prontos para trabalhar com a versão mais recente do Capacitor. Use estes comandos para gerenciar e verificar a compatibilidade do plugin:

| **Ação** | **Comando** | **Propósito** |
| --- | --- | --- |
| Listar Plugins | `npx cap ls` | Exibe todos os plugins instalados |
| Verificar Versões | `npm outdated` | Identifica plugins desatualizados |
| Atualizar Plugins | `npm update` | Atualiza plugins para versões compatíveis |

Se você estiver usando ferramentas de atualização ao vivo como **Capgo**, confirme que seus plugins suportam atualizações dinâmicas. Isso ajuda a evitar conflitos em tempo de execução e garante um desempenho mais suave.

### Resolver Erros de Compilação

Os erros de compilação podem variar dependendo da plataforma, mas aqui estão correções específicas da plataforma:

**Para iOS:**

Pulisci le tue cartelle di build utilizzando questo comando:

```bash
xcodebuild clean -workspace ios/App/App.xcworkspace -scheme App
```

**Per Android:**

Svuota la cache di Gradle eseguendo:

```bash
cd android && ./gradlew clean
```

Se gli errori persistono dopo la pulizia, potresti dover riaggiungere le piattaforme interessate. Ecco come:

```bash
npx cap rm ios
npx cap rm android
npx cap add ios
npx cap add android
```

Infine, se stai utilizzando Capgo per aggiornamenti live, controlla che le tue configurazioni di build soddisfino i requisiti della piattaforma per evitare ulteriori problemi.

## Riepilogo

Questa sezione evidenzia i passaggi e gli strumenti essenziali per [gestire aggiornamenti](https://capgo.app/docs/plugin/cloud-mode/manual-update/) in Capacitor, sottolineando come un uso efficace dei [comandi CLI di Capacitor](https://capgo.app/docs/cli/commands/) garantisca flussi di lavoro fluidi nello sviluppo delle app. Gli strumenti e le strategie discusse mirano a semplificare gli aggiornamenti riducendo al contempo i potenziali rischi.

In precedenza, abbiamo notato che Capgo supporta **1.7K app di produzione**, raggiungendo un impressionante **82% di successo negli aggiornamenti** [\[1\]](https://capgo.app). La sua funzione di aggiornamento istantaneo consente a **95% degli utenti di aggiornare entro 24 ore** [\[1\]](https://capgo.app), dimostrando la sua efficienza.

Ecco un'istantanea delle metriche di performance di Capgo:

| Metrica | Performance |
| --- | --- |
| Tempo di risposta API globale | 434ms |
| Velocità di download di un bundle da 5MB | 114ms |
| Tasso di successo degli aggiornamenti | 82% |

> "Praticiamo lo sviluppo agile e @Capgo è fondamentale per fornire continuamente ai nostri utenti!" - Rodrigo Mantica [\[1\]](https://capgo.app)

Gli strumenti di aggiornamento moderni offrono diversi vantaggi notevoli:

-   **Crittografia end-to-end** per una consegna sicura degli aggiornamenti
-   **Aggiornamenti parziali**, che risparmiano banda scaricando solo i componenti modificati
-   **Ripristino con un clic** per un rapido recupero in caso di problemi
-   **Analisi in tempo reale** per monitorare le performance degli aggiornamenti e il coinvolgimento degli utenti

Queste caratteristiche costituiscono un framework robusto per gestire in modo efficace [gli aggiornamenti delle versioni](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/).

Che tu stia lavorando su un'app piccola o scalando un'implementazione più grande, combinare Capacitor CLI con strumenti di aggiornamento avanzati garantisce un controllo delle versioni affidabile ed efficiente nel panorama dello sviluppo in rapido movimento di oggi.

## Domande frequenti

::: faq
### Quali sfide potrei incontrare quando aggiorno la mia app con Capacitor CLI e come posso affrontarle?

Quando aggiorni la tua app con il Capacitor CLI, potresti incorrere in alcuni ostacoli lungo il cammino. Le sfide comuni includono **conflitti di dipendenze**, **cambiamenti di rottura nei plugin** o **problemi di configurazione specifici della piattaforma**. Questi problemi sorgono spesso a causa delle differenze tra le versioni di Capacitor o aggiornamenti a plugin di terze parti.

Ecco come puoi affrontare queste sfide:

-   **Controlla le note di rilascio** per la nuova versione a cui stai passando. Presta attenzione ai cambiamenti di rottura o a eventuali aggiustamenti che dovrai fare.
-   **Testa gli aggiornamenti in un ambiente di staging** prima di implementarli in produzione. Questo ti aiuterà a catturare e risolvere problemi prima che impattino gli utenti.
-   Aggiorna regolarmente le tue dipendenze e i tuoi plugin per ridurre il rischio di problemi di compatibilità.

Per un'esperienza di aggiornamento ancora più fluida, potresti voler provare strumenti come _Capgo_. Questo strumento ti consente di inviare correzioni e nuove funzionalità direttamente ai tuoi utenti senza necessità di approvazioni dello store. È un ottimo modo per mantenere la tua app aggiornata con minimi tempi di inattività.
:::

::: faq
### Come semplifica Capgo gli aggiornamenti delle app e quali sono le sue caratteristiche distintive?

Capgo semplifica il modo in cui gli sviluppatori forniscono [aggiornamenti delle app](https://capgo.app/plugins/capacitor-updater/) consentendo loro di inviare modifiche, correzioni e nuove funzionalità direttamente agli utenti, bypassando la necessità di approvazioni dello store. Con questo, i tuoi utenti possono godere degli aggiornamenti più recenti in pochi minuti, creando un'esperienza più fluida e efficiente.

Ecco cosa rende Capgo distintivo:

-   **Crittografia end-to-end** garantisce che i tuoi aggiornamenti rimangano sicuri.
-   **Integrazione CI/CD** aiuta a mantenere flussi di lavoro ottimizzati.
-   **Aggiornamenti specifici per utente** consentono rilasci precisi e mirati.
-   **Gestione organizzativa flessibile** supporta team di qualsiasi dimensione.

Capgo è completamente open-source e conforme agli standard di Apple e Android, offrendo una soluzione affidabile per [aggiornamenti delle app in tempo reale](https://capgo.app/blog/live-updates-for-flutter-app/).
:::

::: faq
### Come posso verificare se i miei plugin sono compatibili con l'ultima versione di Capacitor prima di aggiornare?

Prima di fare il salto all'ultima versione di Capacitor, è fondamentale controllare che i tuoi plugin siano pronti a gestire l'aggiornamento. Inizia esaminando la documentazione o il repository del plugin per vedere se ci sono requisiti o aggiornamenti specifici per la versione. La maggior parte dei plugin indica chiaramente quali versioni di Capacitor supportano, quindi questo passaggio può risparmiarti mal di testa inutili.

Puoi anche testare la tua app in un ambiente controllato con la versione aggiornata di Capacitor. Questo ti consente di individuare e risolvere eventuali problemi di compatibilità prima che l'aggiornamento venga pubblicato in produzione. Strumenti come **Capgo** possono essere estremamente utili qui, permettendoti di inviare aggiornamenti direttamente senza necessità di approvazioni dello store. Questo significa che puoi affrontare rapidamente i problemi legati ai plugin rimanendo all'interno delle linee guida della piattaforma.
:::
