export default {
  '/restaurants': {
    POST: {
      name: 'Gabe Panquecaria',
      photoUrl: 'https://avatars.githubusercontent.com/u/33178519?v=4',
      address: {
        street: 'Rua Voluntários da Patria',
        number: '371',
        postalCode: '18060005',
        neighborhood: 'Vila Carvalho'
      },
      workingHours: [
        {
          weekday: 'sunday',
          startAt: '13:00',
          finishAt: '18:00'
        },
        {
          weekday: 'saturday',
          startAt: '19:00',
          finishAt: '23:58'
        }
      ]
    },
    GET: {
      page: 1,
      pagesize: 2
    }
  },
  '/restaurants/:id': {
    PATCH: {
      name: 'Gabe Panquecaria',
      address: {
        street: 'Rua Voluntários da Patria'
      },
      workingHours: [
        {
          weekday: 'sunday',
          startAt: '13:00',
          finishAt: '18:00'
        },
        {
          weekday: 'saturday',
          startAt: '19:00',
          finishAt: '23:58'
        }
      ]
    }
  },
  '/restaurants/:id/products': {
    POST: {
      name: 'Coxinha de frango com catupiry',
      photoUrl: 'https://avatars.githubusercontent.com/u/33178519?v=4',
      price: 10.50,
      categoryId: '4fa44e90-80d8-4b54-bdf1-62fb6d8944de',
      promotion: {
        description: '50% de desconto, sabadou e domingou',
        price: 5.25,
        workingHours: [
          {
            weekday: 'sunday',
            startAt: '12:00',
            finishAt: '15:00'
          },
          {
            weekday: 'saturday',
            startAt: '18:00',
            finishAt: '23:59'
          }
        ]
      }
    }
  }
}
