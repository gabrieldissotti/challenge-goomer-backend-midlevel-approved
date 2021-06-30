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

  findOne () {
    return {
      id: '4b6a29a8-68e3-4979-9101-b7e1c18e39bc',
      restaurant_id: '3b6a5006-f12d-4afc-beab-7b23b428616d',
      street: 'Rua Voluntários da Patria',
      number: '371',
      postal_code: '18060005',
      neighborhood: 'Vila Carvalho',
      created_at: '2021-06-30T20:16:22.989Z',
      updated_at: '2021-06-30T20:16:22.989Z'
    }
  }

  update () {
    return [
      {
        id: '4b6a29a8-68e3-4979-9101-b7e1c18e39bc',
        restaurant_id: '3b6a5006-f12d-4afc-beab-7b23b428616d',
        street: 'Rua Voluntários da Patria',
        number: '371',
        postal_code: '18060005',
        neighborhood: 'Vila Carvalho',
        created_at: '2021-06-30T20:16:22.989Z',
        updated_at: '2021-06-30T20:16:22.989Z'
      }
    ]
  }
}

export default new RestaurantRepositoryMock()
