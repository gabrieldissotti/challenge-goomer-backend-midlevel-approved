import { Response, Request, NextFunction } from 'express'

import Logger from '@libraries/Logger'

import Redis from '@libraries/Redis'
import { getRedisKey } from '@utils/functions'

const getResponseFromCacheIfExists = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(req.id)

  if (typeof Redis.client === 'undefined') {
    return
  }

  const key = getRedisKey(req)

  Redis.client.get(key, (err: any, cachedData: any) => {
    if (err) return next()

    if (cachedData !== null) {
      logger.info('cached response founded, returning data from redis')

      const { data, cache }: any = JSON.parse(cachedData)

      res.header('cache_updated_at', cache.updated_at)
      res.header('cache_invalidation_at', cache.invalidation_at)

      return res.json(data)
    } else {
      logger.info('cached response not found, continuing to next middleware')
      return next()
    }
  })
}
export default getResponseFromCacheIfExists
