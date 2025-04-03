---
locale: it
---

Cantar pacote @capgo/logsnag

O pacote `@capgo/logsnag` é uma ferramenta poderosa para receber notificações e rastrear eventos de projetos. Este tutorial irá guiá-lo através da instalação e uso do pacote.

## Instalação

Para instalar o pacote `@capgo/logsnag`, abra seu terminal e execute o seguinte comando:

[[BLOCO_DE_CÓDIGO]]

## Uso

### Importar Biblioteca

Para usar o pacote `@capgo/logsnag` em seu projeto, você precisa importá-lo. Adicione a seguinte declaração de importação no início do seu arquivo JavaScript:

[[BLOCO_DE_CÓDIGO]]

### Inicializar Cliente

Antes de começar a usar os recursos do `@capgo/logsnag`, você precisa inicializar um cliente. Use o seguinte código para inicializar um cliente:

[[BLOCO_DE_CÓDIGO]]
Substitua `YOUR_API_TOKEN` pelo seu token de API real e `YOUR_PROJECT_NAME` pelo nome do seu projeto.

### Publicar Evento

Para publicar um evento usando `@capgo/logsnag`, use o método `publish` do objeto `logsnag`. Aqui está um exemplo de um trecho de código que publica um evento:

[[BLOCO_DE_CÓDIGO]]
Personalize os valores das propriedades de acordo com o seu evento específico. Você pode especificar o canal, nome do evento, ícone, tags e se deseja notificar ou não.

### Publicar Insight

Além de eventos, você também pode publicar insights usando `@capgo/logsnag`. Insights fornecem informações valiosas e estatísticas sobre o seu projeto. Aqui está um exemplo de um trecho de código que publica um insight:

[[BLOCO_DE_CÓDIGO]]
Modifique os valores das propriedades para corresponder ao seu insight. Você pode especificar o título, valor e ícone.

É isso! Agora você aprendeu como instalar e usar o pacote `@capgo/logsnag` em seu projeto. Aproveite para rastrear os eventos do seu projeto e receber notificações com facilidade!