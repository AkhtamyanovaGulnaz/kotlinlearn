<template>
  <div>
    <v-container fluid>
      <span class="display-1">Слова</span>
      <v-data-iterator :items="words" :hide-actions="true" content-tag="v-layout" row wrap>
        <v-flex slot="item" slot-scope="props" xs12 sm12 md4 lg6>
          <v-card>
            <v-card-title>
              <div class="headline">
                <v-tooltip bottom>
                  <v-avatar slot="activator" v-if="props.item.type == 1" color="teal" size="45">
                    <span class="white--text">W</span>
                  </v-avatar>
                  <span>Слово</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <v-avatar slot="activator" v-if="props.item.type == 2" color="indigo" size="45">
                    <span class="white--text">RW</span>
                  </v-avatar>
                  <span>Выражение</span>
                </v-tooltip>
                {{ getFullOriginalWord(props.item) }}
              </div>
              <h4></h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div class="headline">{{ props.item.transText }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab dark small color="primary" @click="addWord(props.item)" :disabled="checking">
                <v-icon dark>add</v-icon>
              </v-btn>
              <v-snackbar v-model="snackbar" bottom light color="error"> <v-icon>warning</v-icon> {{ snackbarText }} </v-snackbar>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import { getFullOriginalWord } from '../helpers/words'

export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
    wordss: {},
  },
  computed: {
    words() {
      if (!this.wordss) return []

      let words = []

      for (let property in this.wordss) {
        let word = this.wordss[property]
        word.key = property
        words.push(word)
        // if (this.wordss.hasOwnProperty.call(property)) {
        //   console.log('here')
        //   console.log('w property - ', this.wordss[property])
        //   let word = this.wordss[property]
        //   word.key = property
        //   words.push(word)
        // }
      }

      // for (var property in this.data) {
      //   if (this.data.hasOwnProperty.call(this.data, property)) {
      //     let word = this.data[property]
      //     word.key = property
      //     words.push(word)
      //   }
      // }

      return words
    },
    processing() {
      return this.$store.getters.getProcessing
    },
  },
  data() {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4,
      },
      snackbar: false,
      snackbarText: null,
      checking: false,
    }
  },
  methods: {
    getFullOriginalWord: getFullOriginalWord,
    addWord(entity) {
      this.checking = true
      let userWords = this.$store.getters.userData.words
      let wordAdded = userWords[entity.key]
      if (wordAdded) {
        this.snackbar = true
        this.snackbarText = 'Вы уже добавили это слово для изучения'
      } else if (Object.keys(userWords).length > 100) {
        this.snackbar = true
        this.snackbarText = 'Вы уже добавили слишком много слов для изучения'
      } else {
        this.$store.dispatch('ADD_USER_WORD', entity)
      }
      this.checking = false
    },
  },
}
</script>

<style scoped></style>
