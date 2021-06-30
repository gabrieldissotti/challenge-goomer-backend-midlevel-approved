import { Router } from 'express'

import RestaurantController from './controllers/RestaurantController'

const routes = Router()

routes.get('/', (_, res) => res.json({ status: 'API is OK' }))

routes
  .route('/restaurants')
  .post(RestaurantController.store)
  .get(RestaurantController.index)

export default routes
