const {
  scrape,
  scrapeChallengeV2,
  scrapeChallengeV3,
} = require('../src/exercises/api-scraper')
const { products: expectedProducts } = require('../src/products-api/data')

describe('scrape test', () => {
  const scrapers = [scrape, scrapeChallengeV2, scrapeChallengeV3]

  it.each(scrapers)(
    'Resolves with list of product details',
    async (scraper) => {
      const products = await scraper()

      expect(products).toEqual(expect.arrayContaining(expectedProducts))
    }
  )
})
