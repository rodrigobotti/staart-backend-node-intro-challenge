/**
 * Transforma uma lista aplicando a função de transformação mapper a cada elemento, assim como o método map.
 * A função mapper é assíncrona (retorna Promise).
 * Deve-se retornar uma única Promise que "contém" a lista completa de elementos.
 * Deve-se limitar a quantidade de mappers que são executados concorrentemente em `concurrency`.
 *
 * @example
 *   const getStoreAddress = (store) => {
 *     // faz uma requisição a um sistema antigo
 *     // retorna o endereço de uma loja
 *   }
 *
 *   // sistema antigo quando recebe mais que 3 requisições simultâneas
 *   // fica fora do ar por "não aguentar" e precisa ser reiniciado
 *   const LEGACY_SYSTEM_CONCURRENCY_LIMIT = 3
 *
 *   // precisa retornar o endereço de uma lista de usuários
 *   const getStoresAddresses = (stores) => {
 *     // dado os limites físicos do sistema antigo, não fazemos mais requisições do que ele aguenta
 *     return concurrentMap(
 *      LEGACY_SYSTEM_CONCURRENCY_LIMIT,
 *      getStoreAddress,
 *      stores
 *     )
 *   }
 *
 * @param {number} concurrency limite de concorrência
 * @param {(item: T) => Promise<G>} mapper função assíncrona de transformação
 * @param {T[]} items lista de itens a serem transformados
 * @returns {Promise<G[]>} lista de itens transformados
 */
const concurrentMap = async (concurrency, mapper, items) => {
  // TODO:
}

/**
 * Versão desafio do `concurrentMap`:
 * funciona como o `concurrentMap` mas é implementada sem usar `async/await`.
 *
 * @param {number} concurrency limite de concorrência
 * @param {(item: T) => Promise<G>} mapper função assíncrona de transformação
 * @param {T[]} items lista de itens a serem transformados
 * @returns {Promise<G[]>} lista de itens transformados
 */
const concurrentMapChallenge = (concurrency, mapper, items) => {
  // TODO:
}

module.exports = {
  concurrentMap,
  // TODO: se implementar o `concurrentMapChallenge`, adicioná-lo ao module.exports para testá-lo
}
