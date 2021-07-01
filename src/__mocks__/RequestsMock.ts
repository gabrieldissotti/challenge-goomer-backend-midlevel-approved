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
  }
}
