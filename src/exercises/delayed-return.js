const { delay } = require('../utils')

/**
 * Decorator que recebe uma função assíncrona como argumento e retorna uma nova função assíncrona:
 * a função retornada deve executar a função original
 * mas deve resolver o resultado somente após o tempo de espera `time` em milisegundos.
 *
 * @example
 *   const asyncValue = (value) =>
 *     Promise.resolve(value)
 *
 *   const delayedAsyncValue = delayedReturn(500, asyncValue)
 *
 *   delayedAsyncValue('nodejs')
 *     .then(value => console.log(`Valor ${value} após 500ms`))
 *
 *
 * @param {number} time tempo de espera em milissegundos
 * @param {(input: T) => Promise<G>} action função assíncrona
 * @returns {(input: T) => Promise<G>}
 */
const delayedReturn = (time, action) => async (input) => {
  const returnValue = await action(input)
  await delay(time)
  return returnValue
}

module.exports = {
  delayedReturn,
}
