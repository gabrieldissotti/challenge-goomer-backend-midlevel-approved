class WorkingHourRepositoryMock {
  findMany () {
    return [
      {
        id: 'af428bef-c927-42ad-8f27-8e9889eb34dc',
        restaurant_id: 'ee9260ca-8356-4ecf-8874-50606e6816fd',
        promotion_id: null,
        weekday: 'sunday',
        start_at: '13:00:00',
        finish_at: '18:00:00',
        created_at: '2021-07-01T06:45:45.445Z',
        updated_at: '2021-07-01T06:45:45.445Z'
      },
      {
        id: '900a157e-fa32-47f1-a84a-6c48b77057c6',
        restaurant_id: 'ee9260ca-8356-4ecf-8874-50606e6816fd',
        promotion_id: null,
        weekday: 'saturday',
        start_at: '19:00:00',
        finish_at: '23:58:00',
        created_at: '2021-07-01T06:45:45.445Z',
        updated_at: '2021-07-01T06:45:45.445Z'
      }
    ]
  }

  update () {
    return [
      {
        id: 'af428bef-c927-42ad-8f27-8e9889eb34dc',
        restaurant_id: 'ee9260ca-8356-4ecf-8874-50606e6816fd',
        promotion_id: null,
        weekday: 'sunday',
        start_at: '13:00:00',
        finish_at: '18:00:00',
        created_at: '2021-07-01T06:45:45.445Z',
        updated_at: '2021-07-01T06:45:45.445Z'
      },
      {
        id: '900a157e-fa32-47f1-a84a-6c48b77057c6',
        restaurant_id: 'ee9260ca-8356-4ecf-8874-50606e6816fd',
        promotion_id: null,
        weekday: 'saturday',
        start_at: '19:00:00',
        finish_at: '23:58:00',
        created_at: '2021-07-01T06:45:45.445Z',
        updated_at: '2021-07-01T06:45:45.445Z'
      }
    ]
  }

  createManyToRestaurant () {
    return [
      {
        id: 'af428bef-c927-42ad-8f27-8e9889eb34dc',
        weekday: 'sunday',
        startAt: '13:00:00',
        finishAt: '18:00:00',
        restaurantId: 'ee9260ca-8356-4ecf-8874-50606e6816fd',
        promotionId: null,
        createdAt: '2021-07-01T06:45:45.445Z',
        updatedAt: '2021-07-01T06:45:45.445Z'
      },
      {
        id: '900a157e-fa32-47f1-a84a-6c48b77057c6',
        weekday: 'saturday',
        startAt: '19:00:00',
        finishAt: '23:58:00',
        restaurantId: 'ee9260ca-8356-4ecf-8874-50606e6816fd',
        promotionId: null,
        createdAt: '2021-07-01T06:45:45.445Z',
        updatedAt: '2021-07-01T06:45:45.445Z'
      }
    ]
  }

  createManyToPromotion () {
    return [
      {
        id: 'af428bef-c927-42ad-8f27-8e9889eb34dc',
        weekday: 'sunday',
        startAt: '13:00:00',
        finishAt: '18:00:00',
        promotionId: 'ee9260ca-8356-4ecf-8874-50606e6816fd',
        restaurantId: null,
        createdAt: '2021-07-01T06:45:45.445Z',
        updatedAt: '2021-07-01T06:45:45.445Z'
      },
      {
        id: '900a157e-fa32-47f1-a84a-6c48b77057c6',
        weekday: 'saturday',
        startAt: '19:00:00',
        finishAt: '23:58:00',
        promotionId: 'ee9260ca-8356-4ecf-8874-50606e6816fd',
        restaurantId: null,
        createdAt: '2021-07-01T06:45:45.445Z',
        updatedAt: '2021-07-01T06:45:45.445Z'
      }
    ]
  }
}

export default new WorkingHourRepositoryMock()
