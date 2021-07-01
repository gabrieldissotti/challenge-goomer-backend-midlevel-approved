import { getRedisKey } from '@utils/functions'

describe('Function getRedisKey', () => {
  it('should create a name with query params and path correctly', () => {
    const request: any = {
      path: '/restaurants',
      query: {
        item1: 1,
        item2: 2
      }
    }

    const expected = 'cache-restaurants1,2'

    expect(getRedisKey(request)).toBe(expected)
  })
})
