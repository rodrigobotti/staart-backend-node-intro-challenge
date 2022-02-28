# Staart: Jornada Backend - Curso Intro Node.JS - Desafio

Exercícios desafio do curso de introdução a Node.JS da jornada de backend.

## Desafios

### Desafio 1

Implementar a função `concurrentMap` no módulo [src/exercises/concurrent-map](./src/exercises/concurrent-map.js).

Dicas:
  - quando se utiliza método `map` "original" de `Array` com um mapper assíncrono você fica com uma lista de `Promise`s cada uma "contendo" um elemento transformado ao invés de uma única `Promise` "contendo" a lista de todos os items transformados
  - quando se utiliza método `map` "original" de `Array` com um mapper assíncrono não há limite de concorrência: todas as ações assíncronas são "lançadas" ao event loop "ao mesmo tempo"
  - apesar disso, método map ainda pode te ajudar
  - já existe alguma função que transforma uma lista de `Promise`s em uma `Promise` de lista ?
  - uma das funções do módulo [src/utils](./src/utils.js) pode ajudar

Desafio extra: implementar a função `concurrentMapChallenge` no módulo [src/exercises/concurrent-map](./src/exercises/concurrent-map.js) sem usar `async/await`.

### Desafio 2

Implementar a função decorator `delayedReturn` no módulo [src/exercises/delayed-return](./src/exercises/delayed-return.js).

Dicas:
  - a função `delayedReturn` recebe uma função assíncrona como parâmetro
  - a função `delayedReturn` deve retornar uma função assíncrona
  - uma das funções do módulo [src/utils](./src/utils.js) pode ajudar


### Desafio 3

Projeto: construir um scraper de API de produtos de e-commerce.

Objetivo: implementar uma função que retorna `Promise` "contendo" a lista de todos os produtos detalhados.

#### API de produtos de e-commerce

A API é um conjunto de funções que simula requisições de catálogo de produtos de um e-commerce de bebidas fictício.

Ela funciona da seguinte forma:
- os produtos são divididos em categorias e.g. "Cervejas", "Vinhos", etc
- é possível listar todas as categorias cadastradas
- uma categoria é definida pelos atributos: 
  - `id`: identificador único no sistema 
  - `name`: texto com seu nome
- é possível listar quais produtos pertencem a uma categoria a partir de seu `id`
- essa listagem é paginada e retorna somente os resumos dos produtos
- um produto é definido pelos atributos:
  - `id`: identificador único no sistema. Esse atributo existe no resumo.
  - `name`: texto com seu nome. Esse atributo existe no resumo.
  - `price`: preço de venda
  - `description`: texto com descrição
- é possível obter um produto detalhado a partir de seu `id`

Todas essas funcionalidades já estão abstraídas pelas funções do módulo [src/products-api](./src/products-api/index.js):
- `listCategories`: retorna `Promise` contendo a lista de todas as categorias
- `listProducts`: listagem paginada de produtos que pertencem a uma categoria. Retorna `Promise` "contendo" uma página de resumo de produtos
  - se recebe um `id` de categoria não cadastrado, rejeita com erro
  - o tamanho da página é fixo
  - a paginação é feita através de cursor: 
    - no retorno temos o atributo `nextCursor` que diz qual é a próxima página
    - se `nextCursor === null` atingimos a última página e não há mais produtos
  - atributo `result` da página retornada contém a lista de resumo de produtos da página
- `getProduct`: retorna `Promise` "contendo" o produto detalhado
  - se recebe um `id` de produto não cadastrado, rejeita com erro


#### Implementação

No final deve-se produzir uma lista com todos os produtos detalhados.

O único jeito de se conseguir o detalhe de um produto é através da função `getProduct` que necessariamente deve receber um `id` de produto válido.

Para conseguir resolver esse desafio você deve pensar: como eu faço para obter `id`s dos produtos para finalmente conseguir obter seus detalhes?

Esse desafio é dividido em três partes:

1- Implementar a função `scrape` do módulo [src/exercises/api-scraper](./src/exercises/api-scraper.js).

2- Implementar a função `scrapeChallengeV2` do módulo [src/exercises/api-scraper](./src/exercises/api-scraper.js). Tem requisitos não funcionais de limite de concorrência e performance. 

3- Implementar a função `scrapeChallengeV2` do módulo [src/exercises/api-scraper](./src/exercises/api-scraper.js). Tem requisitos não funcionais de limite de concorrência e performance.

## Instruções gerais

Antes de tudo, primeiro deve-se preparar o repositório localmente.

Após fazer forkear e clonar o repositório, execute os seguintes comandos.

```sh
# utilizar a versão de node especificada (v16)
nvm use
# instalar algumas dependências externas que vão ajudar a testar
npm ci
```

### O que pode usar ?

Para a resolução dos desafios pode-se utilizar qualquer função dos seguintes módulos somente:
- [src/utils](./src/utils.js)
- [src/products-api](./src/products-api/index.js)
- as funções que você produzir como resposta dos desafios

### Como eu sei que implementei corretamente ?

Há uma suite de testes automatizados que checkam a implementação dos desafios.

Para executar os testes basta executar os seguintes comandos

```sh
# executa os testes de todos os desafios
npm test # ou npm t ou npm run test

# executa os testes do desatio 1
npm run test:ch1

# executa os testes do desatio 2
npm run test:ch2

# executa os testes do desatio 3
npm run test:ch3
```
