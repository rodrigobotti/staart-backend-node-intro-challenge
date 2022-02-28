/**
 * Separa a lista em chunks de tamanho `size`.
 *
 * @param {number} size size of the chunks
 * @param {T[]} xs list
 * @returns {T[][]} lista de chunks
 */
const split = (size, xs) => {
  const chunks = []
  const n = xs.length

  let i = 0
  while (i < n) {
    chunks.push(xs.slice(i, (i += size)))
  }

  return chunks
}

/**
 * Resolve após `time` milissegundos.
 *
 * @param {number} time tempo em milissegundos
 * @returns {Promise<void>}
 */
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

/**
 * Cria uma sequencia de números que vai de `from` até o `to` incrementando de `step`.
 *
 * @example
 *   const zeroTo10 = range({ from: 0, to: 10 })
 *   // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 *   const evens = range({ from: 2, to: 7, step: 2 })
 *   // [2, 4, 6]
 *
 * @param {Object} param
 * @param {number} param.from primeiro
 * @param {number} param.to ultimo
 * @param {number} [param.step=1] incremento
 * @returns {number[]}
 */
const range = ({ from = 0, to, step = 1 }) =>
  Array.from(
    { length: Math.ceil((to - from) / step) },
    (_, i) => from + i * step
  )

module.exports = {
  split,
  delay,
  range,
}
