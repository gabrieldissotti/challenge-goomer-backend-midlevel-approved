class RestaurantRepositoryMock {
  create () {
    return {
      id: '57cb89fa-23eb-434a-866f-421029241219',
      name: 'Gabe Panquecaria',
      photoUrl: 'https://avatars.githubusercontent.com/u/33178519?v=4'
    }
  }

  findAll () {
    return {
      pagination: {
        page: 1,
        totalPages: 2,
        pagesize: 3,
        totalItems: 4
      },
      items: [
        {
          id: '0c5a9a45-80c1-4f7d-ae79-94459cc7251a',
          name: 'Gabe Panquecaria',
          photo_url: 'https://avatars.githubusercontent.com/u/33178519?v=4',
          created_at: '2021-06-30T18:01:45.028Z',
          updated_at: '2021-06-30T18:01:45.028Z'
        },
        {
          id: 'e9b4c757-e416-448a-a4cf-ce38fba0733e',
          name: 'Gabe Panquecaria',
          photo_url: 'https://avatars.githubusercontent.com/u/33178519?v=4',
          created_at: '2021-06-30T18:01:55.730Z',
          updated_at: '2021-06-30T18:01:55.730Z'
        },
        {
          id: '7bdd1cba-96e7-4ddd-a51e-5293383eb6db',
          name: 'Gabe Panquecaria',
          photo_url: 'https://avatars.githubusercontent.com/u/33178519?v=4',
          created_at: '2021-06-30T18:03:11.749Z',
          updated_at: '2021-06-30T18:03:11.749Z'
        }
      ]
    }
  }
}

export default new RestaurantRepositoryMock()
