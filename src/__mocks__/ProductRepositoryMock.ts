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
}

export default new ProductRepositoryMock()
