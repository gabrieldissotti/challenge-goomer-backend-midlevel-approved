import { Router } from 'express'

import getResponseFromCacheIfExists from '@middlewares/getResponseFromCacheIfExists'
import saveResponseInCache from '@middlewares/saveResponseInCache'

import SomeController from './controllers/SomeController'

const routes = Router()

routes.get('/', (_, res) => res.json({ status: 'API is OK' }))

routes.get('/some-route',
  getResponseFromCacheIfExists,
  SomeController.getImage,
  saveResponseInCache
)

export default routes
