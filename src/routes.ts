import { Router } from 'express'

import RestaurantController from './controllers/RestaurantController'
import getResponseFromCacheIfExists from '@middlewares/getResponseFromCacheIfExists'

const routes = Router()

routes.get('/', (_, res) => res.json({ status: 'API is OK' }))

routes
  .route('/restaurants')
  .post(RestaurantController.store)
  .get(getResponseFromCacheIfExists, RestaurantController.index)

routes
  .route('/restaurants/:id')
  .get(RestaurantController.show)
  .patch(RestaurantController.update)
  .delete(RestaurantController.destroy)

export default routes
