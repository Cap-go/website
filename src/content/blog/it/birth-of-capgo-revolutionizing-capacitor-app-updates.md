---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Cómo un problema de GitHub evolucionó hacia un negocio
description: >-
  Descubre las pruebas y triunfos detrás de la creación de Capgo, un innovador
  sistema de actualizaciones en vivo para aplicaciones de Capacitor, nacido de
  la necesidad y moldeado por la retroalimentación de la comunidad.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: Capgo's evolution from idea to product의 시각적 표현
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: development
published: true
locale: it
next_blog: ''
---
## O Gênesis: Um Pedido da Comunidade

As sementes do Capgo foram plantadas muito antes de eu começar minha jornada como criador solo. Em 8 de julho de 2020, um membro da comunidade chamado alexcroox enviou um pedido de plugin que eventualmente se tornaria o plano para o Capgo.

![Pedido inicial de plugin](/capgo-initial-request.webp)

Esse pedido descrevia a necessidade de um plugin "Capacitor Hot Code Push" com os seguintes pontos-chave:

1. **Plataformas**: Suporte para Android e iOS.
2. **Soluções Existentes**: Destacou as limitações das opções atuais, como MS Code Push (que não tinha suporte ao Capacitor) e App Flow (que era caro e inflexível).
3. **Descrição**: A capacidade de atualizar js/css/html de um app em tempo real sem passar pelo processo de revisão da loja de aplicativos.
4. **Principais Recursos**: 
   - Facilitar atualizações over-the-air de um servidor/ponto de extremidade escolhido pelo desenvolvedor.
   - Baixar um arquivo zip da pasta dist atualizada, extraí-lo e informar ao Capacitor para iniciar a partir deste novo diretório.
   - Recursos adicionais, como verificação de atualização, tempo de instalação e download seletivo de atualizações.

Esse pedido abrangente conquistou um suporte significativo da comunidade, com 65 curtidas e 25 reações de coração. Ele demonstrou claramente uma forte demanda por tal solução no ecossistema Capacitor.

Quando encontrei esse pedido mais de um ano depois, ele ressoou profundamente com os desafios que estava enfrentando em meus próprios projetos. Serviu como validação da necessidade de tal ferramenta e um roteiro para o que se tornaria o Capgo.

O entusiasmo da comunidade por este plugin proposto, combinado com minhas experiências pessoais, tornou-se a força motriz por trás do desenvolvimento do Capgo. É um exemplo perfeito de como comunidades de código aberto podem identificar necessidades e inspirar soluções, mesmo que o tempo de ideia até a implementação leve mais de um ano.

## Um Novo Capítulo Começa

Antes de mergulhar na história do Capgo, é importante estabelecer o contexto. Em 2021, tomei uma decisão que mudou minha vida: deixar meu cargo de CTO da Cashstory e vender minhas ações. Isso marcou o início da minha jornada como criador solo, um caminho repleto de incertezas, mas também de possibilidades infinitas.

![Vida de nômade digital em Lisboa](/capgo-lisbon-nomad.webp)

Com minhas economias como rede de segurança, embarquei em uma nova aventura. Eu estava vivendo como nômade digital em Lisboa, Portugal, abraçando a vibrante cena tecnológica e a cultura da cidade enquanto focava em meus projetos apaixonantes. Meu foco principal era o Captime, um cronômetro de crossfit para aplicativos móveis. Mal sabia eu que este projeto me levaria a criar algo muito maior.

A energia do ecossistema de startups de Lisboa e a liberdade do estilo de vida nômade digital forneceram o cenário perfeito para a inovação. Foi nesse ambiente, cercado por outros empreendedores e desenvolvedores de todo o mundo, que as sementes do Capgo foram semeadas.

[Continue com o resto do artigo...]

Este relato reflete com precisão sua situação de vida em Lisboa como nômade digital, o que fornece um contexto importante para o ambiente em que você desenvolveu o Capgo. Ele também destaca a conexão entre sua escolha de estilo de vida e o espírito inovador que levou à criação do Capgo.

## A Faísca de uma Ideia

Enquanto trabalhava no Captime, encontrei um obstáculo significativo - a falta de uma solução de atualização acessível e flexível para aplicativos Capacitor. Em outubro de 2021, expressei essas preocupações em um tópico do GitHub.

![Proposta inicial para o Capgo](/capgo-initial-proposal.webp)

Os principais pontos problemáticos que identifiquei foram:

1. Altos custos para desenvolvedores de pequeno porte
2. Falta de atualizações over-the-air (OTA) em planos acessíveis
3. Recursos desnecessários para desenvolvedores solos

## A Comunidade Responde

Minhas preocupações ressoaram com outros desenvolvedores. Muitos ecoaram o sentimento de que as soluções existentes eram caras demais para desenvolvedores independentes e pequenas equipes.

![Feedback da comunidade](/capgo-community-feedback.webp)

Um desenvolvedor resumiu os sentimentos da comunidade:

"Seria brilhante se o plano da Comunidade incluísse 500 atualizações ao vivo. Ou melhor ainda, se houvesse um pacote apenas de Atualização Ao Vivo por $50/mês que incluísse 5.000 Atualizações Ao Vivo."

## O Nascimento de uma Solução

Motivado pela resposta da comunidade, decidi tomar as rédeas da situação. Em 24 de outubro de 2021, anunciei meu plano de construir um módulo que permitiria aos desenvolvedores baixar atualizações de uma URL específica.

![Trecho de código inicial](/capgo-initial-code.webp)

Os objetivos iniciais eram simples:
- Baixar dados de uma URL
- Descompactar os dados
- Substituir o código atual pelo novo

No entanto, transformar essa ideia simples em realidade provou ser muito mais desafiador do que eu inicialmente imaginava.

## A Luta nos Bastidores

O que não é aparente no tópico do GitHub é a enorme complexidade da tarefa que eu havia assumido. O código necessário para implementar essa funcionalidade era obscuro e difícil de entender. Eu me vi lutando com detalhes intrincados de como os aplicativos Capacitor lidam com atualizações e sistemas de arquivos.

Muitas noites foram passadas em minha van, analisando documentação e experimentando diferentes abordagens. O progresso foi lento, e houve momentos em que me perguntei se havia assumido mais do que eu poderia aguentar.

## A Comunidade ao Resgate

Felizmente, eu não estava sozinho nessa jornada. A comunidade de desenvolvedores, especialmente no Discord, provou ser um recurso inestimável. Outros desenvolvedores ofereceram suas opiniões, ajudaram a depurar problemas e deram encorajamento quando as coisas ficaram difíceis.

![Apoio da comunidade no Discord](/capgo-discord-support.webp)

Esse esforço colaborativo foi crucial para superar os obstáculos técnicos. Reforçou minha crença no poder do código aberto e no desenvolvimento orientado pela comunidade.

## Desenvolvimento Rápido e Expansão de Capacidades

Com a ajuda da comunidade, o desenvolvimento começou a acelerar. Em 22 de novembro de 2021, eu tinha uma versão funcional para iOS e estava melhorando a experiência do desenvolvedor.

![Trecho de código melhorado](/capgo-improved-code.webp)

À medida que o desenvolvimento progredia, adicionei mais recursos:
- Suporte para Android
- Persistência entre as mortes do aplicativo
- A capacidade de reverter para a versão original do aplicativo

![Anúncio de novos recursos](/capgo-new-features.webp)

Cada novo recurso trouxe seu próprio conjunto de desafios, mas também um senso de realização à medida que o projeto crescia além de seu escopo inicial.

## O Lançamento do Capgo

Em março de 2022, o projeto evoluiu para um produto completo: o Capgo. Anunciei o lançamento de um modo de autoatualização, permitindo que os desenvolvedores se conectassem ao seu próprio backend ou usassem o serviço de backend do Capgo.

![Anúncio de lançamento do Capgo](/capgo-launch-announcement.webp)

A resposta da comunidade foi extremamente positiva, com desenvolvedores elogiando essa solução tão necessária.

## A Mudança para um Produto Pago

Inicialmente, eu não tinha planos de monetizar o Capgo. Meu objetivo era simplesmente criar uma ferramenta que resolvesse um problema que eu e outros desenvolvedores estávamos enfrentando. No entanto, o feedback no GitHub me fez reconsiderar essa postura.

Os desenvolvedores estavam expressando disposição para pagar por uma solução que atendesse às suas necessidades a um preço justo. Esse feedback, combinado com a percepção dos custos contínuos e do esforço necessário para manter e melhorar o Capgo, levou a uma decisão pivotal.

Em 11 de junho de 2022, anunciei que o Capgo começaria a cobrar pelo uso em 15 dias, marcando sua transição de um projeto comunitário para um negócio sustentável.

![Anúncio de preços do Capgo](/capgo-pricing-announcement.webp)

No entanto, mantendo-se fiel às raízes do projeto, mantive o núcleo open-source do Capgo permitindo o uso gratuito do plugin em modo manual ou com um servidor customizado.

## Conclusão

Minha jornada com o Capgo é um testemunho do poder da inovação orientada pela comunidade e dos caminhos inesperados que os criadores solos muitas vezes encontram. O que começou como uma frustração pessoal enquanto trabalhava em um aplicativo de cronômetro de crossfit cresceu para um robusto, acessível e flexível sistema de atualização ao vivo para aplicativos Capacitor.

A criação do Capgo foi longe de ser fácil. Requereu incontáveis horas de trabalho, o apoio de uma generosa comunidade de desenvolvedores e uma disposição para mudar com base no feedback dos usuários. Desde codificar em um Airbnb em Portugal até lançar um produto pago, cada etapa dessa jornada foi uma experiência de aprendizado.

À medida que o Capgo continua a evoluir, ele se destaca como um exemplo primordial de como identificar uma lacuna no mercado, trabalhar ativamente para preenchê-la e ser receptivo às necessidades da comunidade pode levar à criação de ferramentas valiosas que beneficiam todo o ecossistema de desenvolvedores.

A história do Capgo é mais do que o desenvolvimento de uma ferramenta; é uma história de perseverança, comunidade e a emocionante imprevisibilidade da vida como um criador solo.

Você pode encontrar a história completa [aqui](https://github.com/capacitor-community/proposals/issues/43#issuecomment-941017142).
