import HttpException from '@libraries/HttpException'

describe('HttpException Test', () => {
  it('should throw an exception with received message and status', async () => {
    const expected = { status: 400, message: 'Custom error message' }

    await expect(
      async () => {
        throw new HttpException(expected.status, expected.message)
      }
    ).rejects.toMatchObject(expected)
  })

  it('should throw an exception with default message and status em its not received', async () => {
    const expected = { status: 500, message: 'Internal Server Error' }

    await expect(
      async () => {
        throw new HttpException()
      }
    ).rejects.toMatchObject(expected)
  })
})
