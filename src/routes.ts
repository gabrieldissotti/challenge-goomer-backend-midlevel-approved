import { Router } from 'express'

import getResponseFromCacheIfExists from '@middlewares/getResponseFromCacheIfExists'

import SomeController from './controllers/SomeController'

const routes = Router()

routes.get('/', (_, res) => res.json({ status: 'API is OK' }))

routes.use(getResponseFromCacheIfExists)

routes.get('/some-route', SomeController.getImage)

export default routes
