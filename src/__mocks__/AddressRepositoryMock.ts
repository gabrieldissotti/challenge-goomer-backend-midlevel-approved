class RestaurantRepositoryMock {
  create () {
    return {
      id: '048023af-8229-473e-9023-df6839878565',
      street: 'Rua Voluntários da Patria',
      number: '371',
      postalCode: '18060005',
      neighborhood: 'Vila Carvalho',
      restaurantId: '57cb89fa-23eb-434a-866f-421029241219'
    }
  }
}

export default new RestaurantRepositoryMock()
