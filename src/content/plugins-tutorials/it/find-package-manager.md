---
locale: it
---

cantar @capgo/encontrar-gerenciador-de-pacotes

O pacote `@capgo/encontrar-gerenciador-de-pacotes` é uma ferramenta útil para determinar qual gerenciador de pacotes está sendo utilizado em um determinado caminho. Isso pode ser útil ao trabalhar em projetos que utilizam diferentes gerenciadores de pacotes.

Aqui está um tutorial passo a passo sobre como usar este pacote:

## Instalação

Primeiro, certifique-se de que você tem Nodejs e npm instalados em sua máquina. Em seguida, abra seu terminal e execute o seguinte comando para instalar o pacote `@capgo/encontrar-gerenciador-de-pacotes`:

[[BLOCO_DE_CÓDIGO]]

## Importar o pacote

Uma vez que o pacote esteja instalado, você pode importá-lo para seu código usando a seguinte linha:

[[BLOCO_DE_CÓDIGO]]

## Encontrar o tipo de gerenciador de pacotes

Para encontrar o tipo de gerenciador de pacotes em um determinado caminho, você pode usar a função `encontrarTipoGerenciadorDePacotes`. Aqui está um exemplo:

[[BLOCO_DE_CÓDIGO]]

A função `encontrarTipoGerenciadorDePacotes` retorna um valor de string indicando o tipo de gerenciador de pacotes que está sendo usado. Ela pode retornar um dos seguintes valores:

- `npm`: se npm estiver sendo usado
- `yarn`: se yarn estiver sendo usado
- `pnpm`: se pnpm estiver sendo usado
- `desconhecido`: se o tipo de gerenciador de pacotes não puder ser determinado

## Juntando tudo

Aqui está um exemplo completo de como usar o pacote `@capgo/encontrar-gerenciador-de-pacotes`:

[[BLOCO_DE_CÓDIGO]]

É isso! Agora você pode usar o pacote `@capgo/encontrar-gerenciador-de-pacotes` para determinar o tipo de gerenciador de pacotes em um determinado caminho.