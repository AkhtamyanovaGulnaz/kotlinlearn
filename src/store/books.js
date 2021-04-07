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
    //     ],
    //   },
    // ],

    // bookParts: [
    //   {
    //     bookId: 'kdk4334dkkdkd546k',
    //     bookPartId: 'sskskks',
    //     bookTitle: 'Какая-то статья - 1',
    //     partTitle: 'Глава 1',
    //     youtube_id: 'hNw4g7r_WSw',
    //     content: [
    //       {
    //         sentences: [
    //           {
    //             origText: 'i love you',
    //             transText: 'я люблю тебя',
    //           },
    //         ],
    //       },
    //       {
    //         sentences: [
    //           {
    //             origText: 'i love you 2',
    //             transText: 'я люблю тебя 2',
    //           },
    //         ],
    //       },
    //     ],
    //     words: [
    //       {
    //         origWord: 'Hello',
    //         transWord: 'Привет',
    //       },
    //       {
    //         origWord: 'Hello1',
    //         transWord: 'Привет1',
    //       },
    //       {
    //         origWord: 'Hello2',
    //         transWord: 'Привет2',
    //       },
    //     ],
    //   },
    // ],
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
              imageUrl: data.imageURL,
              level: data.level.slice(),
              youtube_playlist_id: data.youtube_playlist_id,
            }

            let parts = []
            if (data.parts) {
              data.parts.forEach((p) => {
                let part = {
                  id: p.id,
                  title: p.title,
                  youtube_id: p.youtube_id,
                }

                parts.push(part)
              })
            }
            book.parts = parts

            books.push(book)
          })

          commit('SET_BOOKS', books)
        })
        .catch((error) => console.log(error))
    },
  },
  getters: {
    getBooks: (state) => state.books,
  },
}
