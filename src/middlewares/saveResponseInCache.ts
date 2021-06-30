import { Response, Request, NextFunction } from 'express'

import Redis from '@libraries/Redis'
import { getRedisKey } from '@utils/functions'

const getResponseFromCacheIfExists = async (req: Request, res: Response, next: NextFunction) => {
  const key = getRedisKey(req)

  if (Redis.isReadyToUse) {
    Redis.saveInRedis(
      key,
      res
    )
  }

  return next()
}
export default getResponseFromCacheIfExists
