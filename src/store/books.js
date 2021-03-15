import Vue from 'vue'

export default {
  state: {
    books: [],
    // books: [
    //   {
    //     id: 'kdkdkkdkdk',
    //     title: 'Какая-то статья - 1',
    //     description: 'Какая то часть статьи - 1',
    //     image: 'kskdkdk',
    //     level: ['сложный', 'средний'],
    //     rating: 4,
    //     ratingsCount: 100,
    //     youtube_playlist_id: 'dkdkdkd',
    //     parts: [
    //       {
    //         id: 'sskskks',
    //         title: 'Глава 1',
    //         youtube_id: 'ddldlldld',
    //       },
    //       {
    //         id: 'sskskks2',
    //         title: 'Глава 2',
    //         youtube_id: 'ddldlldld2',
    //       },
    //       {
    //         id: 'sskskks3',
    //         title: 'Глава 3',
    //         youtube_id: 'ddldlldld3',
    //       },
    //       {
    //         id: 'sskskks4',
    //         title: 'Глава 4',
    //         youtube_id: 'ddldlldld4',
    //       },
    //     ],
    //   },
    //   {
    //     id: 'kdkdkkdkd546k',
    //     title: 'Какая-то статья - 2',
    //     description: 'Какая то часть статьи - 2',
    //     image: 'kskdkdk445',
    //     level: ['средний', 'легкий'],
    //     rating: 3.5,
    //     ratingsCount: 70,
    //     youtube_playlist_id: 'dkd9499kdkd',
    //     parts: [
    //       {
    //         id: 'sskskks',
    //         title: 'Глава 1',
    //         youtube_id: 'ddldlldld',
    //       },
    //       {
    //         id: 'sskskks2',
    //         title: 'Глава 2',
    //         youtube_id: 'ddldlldld2',
    //       },
    //       {
    //         id: 'sskskks3',
    //         title: 'Глава 3',
    //         youtube_id: 'ddldlldld3',
    //       },
    //       {
    //         id: 'sskskks4',
    //         title: 'Глава 4',
    //         youtube_id: 'ddldlldld4',
    //       },
    //     ],
    //   },
    //   {
    //     id: 'kdk4334dkkdkd546k',
    //     title: 'Какая-то статья - 3',
    //     description: 'Какая то часть статьи - 3',
    //     image: 'kskd000kdk445',
    //     level: ['средний'],
    //     rating: 5,
    //     ratingsCount: 126,
    //     youtube_playlist_id: '00kd9499kdkd',
    //     parts: [
    //       {
    //         id: 'sskskks',
    //         title: 'Глава 1',
    //         youtube_id: 'ddldlldld',
    //       },
    //       {
    //         id: 'sskskks2',
    //         title: 'Глава 2',
    //         youtube_id: 'ddldlldld2',
    //       },
    //       {
    //         id: 'sskskks3',
    //         title: 'Глава 3',
    //         youtube_id: 'ddldlldld3',
    //       },
    //       {
    //         id: 'sskskks4',
    //         title: 'Глава 4',
    //         youtube_id: 'ddldlldld4',
    //       },
    //     ],
    //   },
    // ],

    bookParts: [
      {
        bookId: 'kdk4334dkkdkd546k',
        bookPartId: 'sskskks',
        bookTitle: 'Какая-то статья - 3',
        partTitle: 'Глава 1',
        youtube_id: 'hNw4g7r_WSw',
        content: [
          {
            sentences: [
              {
                origText: 'i love you',
                transText: 'я люблю тебя',
              },
              {
                origText: 'i love my family',
                transText: 'я люблю мою семью',
              },
              {
                origText: 'i love world',
                transText: 'я люблю мир',
              },
            ],
          },
          {
            sentences: [
              {
                origText: 'i love you 2',
                transText: 'я люблю тебя 2',
              },
              {
                origText: 'i love my family 2',
                transText: 'я люблю мою семью 2',
              },
              {
                origText: 'i love world 2',
                transText: 'я люблю мир 2',
              },
              {
                origText: 'i love world 3',
                transText: 'я люблю мир 3',
              },
            ],
          },
        ],
        words: [
          {
            origWord: 'Hello',
            transWord: 'Привет',
          },
          {
            origWord: 'Hello1',
            transWord: 'Привет1',
          },
          {
            origWord: 'Hello2',
            transWord: 'Привет2',
          },
          {
            origWord: 'Hello3',
            transWord: 'Привет3',
          },
          {
            origWord: 'Hello4',
            transWord: 'Привет4',
          },
          {
            origWord: 'Hello5',
            transWord: 'Привет5',
          },
          {
            origWord: 'Hello6',
            transWord: 'Привет6',
          },
          {
            origWord: 'Hello7',
            transWord: 'Привет7',
          },
        ],
      },
    ],
  },
  mutations: {
    SET_BOOKS(state, payload) {
      state.books = payload
    },
  },
  actions: {
    LOAD_BOOKS({ commit }) {
      Vue.$db
        .collection('books')
        .get()
        .then((querySnapshot) => {
          let books = []
          querySnapshot.forEach((s) => {
            const data = s.data()
            let book = {
              id: s.id,
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl,
              level: data.level.slice(),
              youtube_playlist_id: data.youtube_playlist_id,
              parts: [],
            }
            books.push(book)
          })

          commit('SET_BOOKS', books)
        })
        .catch((error) => console.log(error))
    },
  },
  getters: {
    getBooks: (state) => state.books,
    getParts: (state) => state.bookParts,
  },
}
