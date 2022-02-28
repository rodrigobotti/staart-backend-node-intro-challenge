const faker = require('faker')
const {
  concurrentMap,
  concurrentMapChallenge,
} = require('../src/exercises/concurrent-map')
const { range, delay } = require('../src/utils')

describe('concurrentMap test', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  const items = range({ from: 0, to: 9 })
  const concurrencyCases = [
    1,
    faker.datatype.number({ min: 2, max: items.length - 1 }),
    items.length,
    faker.datatype.number({ min: items.length }),
  ]
  const testConcurrentMapSucceeds = (implementation) => async (concurrency) => {
    const mapperDelay = faker.datatype.number({ min: 1, max: 5 })
    const expectedReturn = range({ from: 1, to: 10 })
    const mapper = jest.fn().mockImplementation(async (item) => {
      await delay(mapperDelay)
      return item + 1
    })

    const resultPromise = implementation(concurrency, mapper, items)

    for (const callCount of range({
      from: concurrency,
      to: items.length,
      step: concurrency,
    })) {
      await Promise.resolve()
      expect(mapper).toHaveBeenCalledTimes(callCount)
      await delay(mapperDelay)
    }

    const result = await resultPromise

    expect(result).toEqual(expectedReturn)
    expect(mapper).toHaveBeenCalledTimes(items.length)
  }
  const testConcurrentMapRejects = (target) => async () => {
    const concurrency = faker.datatype.number({ min: 1 })
    const itemToFail = faker.random.arrayElement(items)
    const errorMessage = faker.lorem.sentence()
    const mapper = jest
      .fn()
      .mockImplementation((item) =>
        item === itemToFail
          ? Promise.reject(Error(errorMessage))
          : Promise.resolve(item)
      )

    const resultPromise = target(concurrency, mapper, items)

    await expect(resultPromise).rejects.toHaveProperty('message', errorMessage)
  }
  const hasChallengeVersion = () =>
    concurrentMapChallenge && concurrentMapChallenge instanceof Function

  describe('When mapper resolves for every item', () => {
    it.each(concurrencyCases)(
      'resolves with list of mapped items',
      testConcurrentMapSucceeds(concurrentMap)
    )

    if (hasChallengeVersion()) {
      it.each(concurrencyCases)(
        'challenge version resolves with list of mapped items',
        testConcurrentMapSucceeds(concurrentMapChallenge)
      )
    }
  })

  describe('When mapper rejects at least once', () => {
    it('rejects with same error', testConcurrentMapRejects(concurrentMap))

    if (hasChallengeVersion()) {
      it(
        'challenge version rejects with same error',
        testConcurrentMapRejects(concurrentMapChallenge)
      )
    }
  })
})
