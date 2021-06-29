import { NextFunction, Request, Response } from 'express'

import SomeService from '@services/SomeService'
import { getRedisKey } from '@utils/functions'

import Redis from '@libraries/Redis'

class SomeController {
  public async getImage (request: Request, res: Response, next: NextFunction) {
    try {
      const someService = new SomeService()

      const response = await someService.execute()

      const key = getRedisKey(request)
      Redis.saveInRedis(
        key,
        response
      )

      return res.json(response)
    } catch (error) {
      next(error)
    }
  }
}

export default new SomeController()
