const { delayedReturn } = require('../src/exercises/delayed-return')
const { delay } = require('../src/utils')
const faker = require('faker')

const inspectPromise = (promise) => {
  if (promise.isFulfilled) return promise

  let isPending = true
  let isRejected = false
  let isFulfilled = false

  const result = promise
    .then((v) => {
      isFulfilled = true
      isPending = false
      return v
    })
    .catch((e) => {
      isRejected = true
      isPending = false
      return Promise.resject(e)
    })

  result.isFulfilled = () => isFulfilled
  result.isPending = () => isPending
  result.isRejected = () => isRejected

  return result
}

describe('delayedReturn test', () => {
  describe('When decorated action resolves', () => {
    it(`resolves with same value after delay`, async () => {
      const expectedReturn = faker.datatype.string()
      const actionInput = faker.datatype.string()
      const waitTime = faker.datatype.number({ min: 1, max: 5 })
      const action = jest.fn().mockResolvedValue(expectedReturn)

      const delayedAction = delayedReturn(waitTime, action)
      const returnPromise = inspectPromise(delayedAction(actionInput))

      expect(action).toHaveBeenCalledWith(actionInput)
      expect(returnPromise.isPending()).toBe(true)
      expect(returnPromise.isFulfilled()).toBe(false)

      await delay(Math.ceil(waitTime / 2))
      expect(returnPromise.isPending()).toBe(true)
      expect(returnPromise.isFulfilled()).toBe(false)

      await delay(Math.ceil(waitTime / 2))
      expect(returnPromise.isPending()).toBe(false)
      expect(returnPromise.isFulfilled()).toBe(true)
      const result = await returnPromise
      expect(result).toEqual(expectedReturn)
    })
  })
  describe('When action rejects', () => {
    it('decorated function rejects immediately with same error', async () => {
      const actionInput = faker.datatype.string()
      const errorMessage = faker.lorem.sentence()
      const waitTime = faker.datatype.number({ min: 5, max: 10 })
      const action = jest.fn().mockRejectedValue(Error(errorMessage))

      const delayedAction = delayedReturn(waitTime, action)
      const returnPromise = delayedAction(actionInput)

      await expect(returnPromise).rejects.toHaveProperty(
        'message',
        errorMessage
      )
    })
  })
})
