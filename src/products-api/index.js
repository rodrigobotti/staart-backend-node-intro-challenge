const { categories, productsByCategory, productsById } = require('./data')

const getProductsInCategory = (categoryId) =>
  Promise.resolve(
    productsByCategory[categoryId] ??
      Promise.reject(Error(`Category ${categoryId} not found`))
  )

/**
 * @returns {Promise<{id:string, name:string}[]>} todas as categorias de produtos
 */
const listCategories = () => Promise.resolve(categories)

/**
 * Listagem paginada de produtos de uma categoria.
 * Se não existe categoria com `categoryId` cadastrada, rejeita com erro.
 *
 * @param {string} categoryId id de categoria
 * @param {number} [cursor=0] cursor de paginação
 * @returns {Promise<{result:{id:string,name:string}[], nextCursor:number|null}>} página de produtos
 */
const listProducts = async (categoryId, cursor = 0) => {
  const pageSize = 2
  const all = await getProductsInCategory(categoryId)
  const limit = cursor + pageSize
  const result = all.slice(cursor, cursor + pageSize)
  const nextCursor = result.length < pageSize ? null : limit

  return {
    result,
    nextCursor,
  }
}

/**
 * Detalhe de produto por id.
 * Se não existe produto cadastrado com `id`, rejeita com erro.
 *
 * @param {string} id id de produto
 * @returns {Promise<{id:string,name:string,price:number,description:string}>} detalhe de produto
 */
const getProduct = (id) =>
  Promise.resolve(
    productsById[id] ?? Promise.reject(Error(`Product ${id} not found`))
  )

module.exports = {
  listCategories,
  listProducts,
  getProduct,
}
