<template>
  <div>
    <section>
      <v-parallax height="370" :src="require('../assets/parallax-top5.jpg')">
        <v-layout column align-center justify-center class="white--text">
          <img src="../assets/kotlin_language.png" alt="Я Учу Kotlin" height="150" />
          <h1 class="white--text mb-2 display-2 text-xs-center">Я Учу Kotlin!</h1>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout column wrap class="my-2" align-center>
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline">Учи Kotlin с удовольствием!</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">book</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Изучай курсы</div>
                  </v-card-title>
                  <v-card-text class="layout justify-center">
                    Изучай материалы курсов, смотри видео и выполняй задания. Выбирай то, что нравится лично тебе!
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">spellcheck</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Учи слова</div>
                  </v-card-title>
                  <v-card-text class="layout justify-center">
                    Учи новые слова и термины: каждый курс содержит набор самых интересных и важных слов, которые Вы можете добавить в свой личный список для изучения
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">devices</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Учись на любом устройстве</div>
                  </v-card-title>
                  <v-card-text class="layout justify-center">
                    Это web-приложение оптимизировано для работы на любом устройстве: учись со своего стационарного компьютера, планшета или мобильного телефона!
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section v-if="books.length">
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-2">
          <v-flex xs12 sm8>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Случайные курсы</div>
              </v-card-title>
              <v-card-text class="layout justify-center">
                  <v-carousel
                    height="250px"
                    style="width:380px"
                  >
                    <v-carousel-item style="cursor: pointer;" v-for="(book, i) in books" :key="i" :src="book.imageUrl" @click="goToBook(book.id)">
                      <div class="bookTitle">{{ book.title }}</div>
                    </v-carousel-item>
                  </v-carousel>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-1">
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">О проекте</div>
              </v-card-title>
              <v-card-text>
                Это web-приложение является дополнением к YouTube-каналам. С любыми вопросами или предложениями обращайтесь на почту
              </v-card-text>
              <v-list class="transperent">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>learnkotlintoday@gmail.com</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    books() {
      let books = this.$store.getters.getBooks
      if (!books) return []

      const shuffled = books.sort(() => 0.5 - Math.random())
      let result = []
      if (shuffled.length < 5) result = shuffled
      else result = shuffled.slice(0, 5)

      return result
    },
  },
  methods: {
    goToBook(id) {
      this.$router.push({ name: 'book', params: { id: id } })
    },
  },
}
</script>

<style scoped>
.bookTitle {
  position: absolute;
  color: white;
  font-size: 1.2em;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  text-align: center;
}
</style>
