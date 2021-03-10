export default {
  state: {
    books: [
      {
        id: 'kdkdkkdkdk',
        title: 'Какая-то статья - 1',
        description: 'Какая то часть статьи - 1',
        image: 'kskdkdk',
        parts: 7,
        level: ['сложный', 'средний'],
        rating: 4,
        ratingsCount: 100,
        youtube_playlist_id: 'dkdkdkd',
      },
      {
        id: 'kdkdkkdkd546k',
        title: 'Какая-то статья - 2',
        description: 'Какая то часть статьи - 2',
        image: 'kskdkdk445',
        parts: 7,
        level: ['средний', 'легкий'],
        rating: 3.5,
        ratingsCount: 70,
        youtube_playlist_id: 'dkd9499kdkd',
      },
      {
        id: 'kdk4334dkkdkd546k',
        title: 'Какая-то статья - 3',
        description: 'Какая то часть статьи - 3',
        image: 'kskd000kdk445',
        parts: 7,
        level: ['средний'],
        rating: 5,
        ratingsCount: 126,
        youtube_playlist_id: '00kd9499kdkd',
      },
    ],
  },
  mutations: {
    SET_BOOKS(state, payload) {
      state.books = payload
    },
  },
  getters: {
    getBooks: (state) => state.books,
  },
}
