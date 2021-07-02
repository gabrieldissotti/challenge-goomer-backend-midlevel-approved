import { Router } from 'express'

import ProductsController from './controllers/ProductsController'
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

routes
  .route('/restaurants/:id/products')
  .post(ProductsController.store)
  .get(getResponseFromCacheIfExists, ProductsController.index)

routes
  .route('/restaurants/:restaurantId/products/:productId')
  .patch(ProductsController.update)
  .delete(ProductsController.destroy)

export default routes
