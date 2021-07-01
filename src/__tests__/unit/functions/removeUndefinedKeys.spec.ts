import { removeUndefinedKeys } from '@utils/functions'

describe('Function removeUndefinedKeys', () => {
  it('should remove undefined keys from object correctly', () => {
    const initialObject = {
      test: undefined,
      test2: 'isOk'
    }

    expect(removeUndefinedKeys(initialObject)).toMatchObject({
      test2: 'isOk'
    })
  })
})
