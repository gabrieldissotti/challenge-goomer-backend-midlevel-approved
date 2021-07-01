class ProductRepositoryMock {
  create () {
    return {
      id: '8656885d-7938-497f-9596-6be8179fcbdb',
      name: 'Coxinha de frango com catupiry',
      photoUrl: 'https://avatars.githubusercontent.com/u/33178519?v=4',
      price: 10.5,
      categoryId: '4fa44e90-80d8-4b54-bdf1-62fb6d8944de',
      restaurantId: 'e3a49cd9-64bb-428c-ac93-9e0b2f6b5da8',
      createdAt: '2021-07-01T23:07:16.505Z',
      updatedAt: '2021-07-01T23:07:16.505Z'
    }
  }

  findOne () {
    return {
      id: '8656885d-7938-497f-9596-6be8179fcbdb',
      name: 'Coxinha de frango com catupiry',
      photoUrl: 'https://avatars.githubusercontent.com/u/33178519?v=4',
      price: 10.5,
      categoryId: '4fa44e90-80d8-4b54-bdf1-62fb6d8944de',
      restaurantId: 'e3a49cd9-64bb-428c-ac93-9e0b2f6b5da8',
      createdAt: '2021-07-01T23:07:16.505Z',
      updatedAt: '2021-07-01T23:07:16.505Z'
    }
  }

  update () {
    return [
      {
        id: '8656885d-7938-497f-9596-6be8179fcbdb',
        name: 'Coxinha de frango com catupiry',
        photoUrl: 'https://avatars.githubusercontent.com/u/33178519?v=4',
        price: 10.5,
        categoryId: '4fa44e90-80d8-4b54-bdf1-62fb6d8944de',
        restaurantId: 'e3a49cd9-64bb-428c-ac93-9e0b2f6b5da8',
        createdAt: '2021-07-01T23:07:16.505Z',
        updatedAt: '2021-07-01T23:07:16.505Z'
      }
    ]
  }

  findAllProducts () {
    return {
      pagination: {
        page: 1,
        totalPages: 3,
        pagesize: 2,
        totalItems: 6
      },
      items: [
        {
          id: '8656885d-7938-497f-9596-6be8179fcbdb',
          category_id: '4fa44e90-80d8-4b54-bdf1-62fb6d8944de',
          restaurant_id: 'e3a49cd9-64bb-428c-ac93-9e0b2f6b5da8',
          name: 'Coxinha de frango com catupiry',
          photo_url: 'https://avatars.githubusercontent.com/u/33178519?v=4',
          price: '6.00',
          created_at: '2021-07-01T23:07:16.505Z',
          updated_at: '2021-07-01T23:07:16.505Z',
          category_name: 'Doces',
          promotion_description: '50% de desconto, sabadou e domingou',
          promotion_price: '5.25',
          promotion_start_at: '13:00:00',
          promotion_finish_at: '18:00:00'
        },
        {
          id: '8656885d-7938-497f-9596-6be8179fcbdb',
          category_id: '4fa44e90-80d8-4b54-bdf1-62fb6d8944de',
          restaurant_id: 'e3a49cd9-64bb-428c-ac93-9e0b2f6b5da8',
          name: 'Coxinha de frango com catupiry',
          photo_url: 'https://avatars.githubusercontent.com/u/33178519?v=4',
          price: '6.00',
          created_at: '2021-07-01T23:07:16.505Z',
          updated_at: '2021-07-01T23:07:16.505Z',
          category_name: 'Doces',
          promotion_description: '50% de desconto, sabadou e domingou',
          promotion_price: '5.25',
          promotion_start_at: '19:00:00',
          promotion_finish_at: '23:58:00'
        }
      ]
    }
  }
}

export default new ProductRepositoryMock()
