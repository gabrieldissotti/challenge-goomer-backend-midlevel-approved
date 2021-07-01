import HttpException from '@exceptions/HttpException'

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

  it('should throw an exception with message as string when receives a object', async () => {
    const expected = {
      status: 500,
      message: JSON.stringify({ error: 'Internal Server Error' })
    }

    await expect(
      async () => {
        throw new HttpException(500, { error: 'Internal Server Error' })
      }
    ).rejects.toMatchObject(expected)
  })
})
