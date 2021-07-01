class PromotionRepositoryMock {
  create () {
    return {
      id: '36eb4ee9-6647-4277-ab80-72017b9c492d',
      description: '50% de desconto, sabadou e domingou',
      price: 5.25,
      createdAt: '2021-07-01T23:07:16.526Z',
      updatedAt: '2021-07-01T23:07:16.526Z'
    }
  }

  findOne () {
    return {
      id: '36eb4ee9-6647-4277-ab80-72017b9c492d',
      description: '50% de desconto, sabadou e domingou',
      price: 5.25,
      createdAt: '2021-07-01T23:07:16.526Z',
      updatedAt: '2021-07-01T23:07:16.526Z'
    }
  }

  update () {
    return [
      {
        id: '36eb4ee9-6647-4277-ab80-72017b9c492d',
        description: '50% de desconto, sabadou e domingou',
        price: 5.25,
        createdAt: '2021-07-01T23:07:16.526Z',
        updatedAt: '2021-07-01T23:07:16.526Z'
      }
    ]
  }
}

export default new PromotionRepositoryMock()
