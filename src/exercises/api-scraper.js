const api = require('../products-api')

/**
 * Retorna uma `Promise` com a lista detalhada de todos os produtos cadastrados da `products-api`.
 * Os produtos podem estar em qualquer ordem.
 *
 * @returns {Promise<{{id:string,name:string,price:number,description:string}}[]>} lista de produtos cadastrados
 */
const scrape = async () => {
  // TODO:
}

/**
 * Retorna uma `Promise` com a lista detalhada de todos os produtos cadastrados da `products-api`.
 * Os produtos podem estar em qualquer ordem.
 * Implementar otimizando velocidade de processamento, se aderindo as restrições de concorrência:
 * - api.listProducts: somente 2 chamadas simultâneas
 * - api.getProduct: somente 5 chamada simultâneas
 *
 * @returns {Promise<{{id:string,name:string,price:number,description:string}}[]>} lista de produtos cadastrados
 */
const scrapeChallengeV2 = async () => {
  // TODO:
}

/**
 * Retorna uma `Promise` com a lista detalhada de todos os produtos cadastrados da `products-api`.
 * Os produtos podem estar em qualquer ordem.
 * Implementar otimizando velocidade de processamento, se aderindo as restrições de concorrência:
 * - api.listProducts: somente 3 chamadas simultâneas
 * - api.getProduct: somente 1 chamada a cada 100ms
 *
 * @returns {Promise<{{id:string,name:string,price:number,description:string}}[]>} lista de produtos cadastrados
 */
const scrapeChallengeV3 = async () => {
  // TODO:
}

module.exports = {
  scrape,
  scrapeChallengeV2,
  scrapeChallengeV3,
}
