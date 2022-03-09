const api = require('../products-api')
const { concurrentMap } = require('./concurrent-map')
const { delayedReturn } = require('./delayed-return')

/**
 * Retorna uma `Promise` com a lista detalhada de todos os produtos cadastrados da `products-api`.
 * Os produtos podem estar em qualquer ordem.
 *
 * @returns {Promise<{{id:string,name:string,price:number,description:string}}[]>} lista de produtos cadastrados
 */
const scrape = async () => {
  async function* listProductIds(categoryId) {
    let cursor = 0

    while (cursor !== null) {
      const { result, nextCursor } = await api.listProducts(categoryId, cursor)
      cursor = nextCursor
      for (const { id } of result) {
        yield id
      }
    }
  }

  const products = []

  const categories = await api.listCategories()

  for (const { id: categoryId } of categories) {
    for await (const productId of listProductIds(categoryId)) {
      const product = await api.getProduct(productId)
      products.push(product)
    }
  }
  return products
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
  const listProductsSummaries = async (category) => {
    let cursor = 0
    let summaries = []
    const categoryId = category.id

    while (cursor !== null) {
      const { result, nextCursor } = await api.listProducts(categoryId, cursor)
      summaries = summaries.concat(result)
      cursor = nextCursor
    }

    return summaries
  }

  const getProductDetail = ({ id }) => api.getProduct(id)

  // return api
  //   .listCategories()
  //   .then((categories) => concurrentMap(2, listProductsSummaries, categories))
  //   .then((summaries) => summaries.flat())
  //   .then((summaries) => concurrentMap(5, getProductDetail, summaries))

  const categories = await api.listCategories()
  const summaries = await concurrentMap(2, listProductsSummaries, categories)
  return concurrentMap(5, getProductDetail, summaries.flat())
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
const scrapeChallengeV3 = () => {
  const listAllProductSummaries = ({ categoryId, cursor }, products) =>
    cursor === null
      ? Promise.resolve(products)
      : api
          .listProducts(categoryId, cursor)
          .then(({ result, nextCursor }) =>
            listAllProductSummaries(
              { categoryId, cursor: nextCursor },
              products.concat(result)
            )
          )

  const listProductsSummaries = (category) =>
    listAllProductSummaries({ categoryId: category.id, cursor: 0 }, [])

  const getProductDetail = ({ id }) => api.getProduct(id)
  const delayedGetProductDetail = delayedReturn(100, getProductDetail)

  return api
    .listCategories()
    .then((categories) => concurrentMap(3, listProductsSummaries, categories))
    .then((summaries) => summaries.flat())
    .then((summaries) => concurrentMap(1, delayedGetProductDetail, summaries))

  // const categories = await api.listCategories()
  // const summaries = await concurrentMap(3, listProductsSummaries, categories)
  // return concurrentMap(1, delayedGetProductDetail, summaries.flat())
}

module.exports = {
  scrape,
  scrapeChallengeV2,
  scrapeChallengeV3,
}
