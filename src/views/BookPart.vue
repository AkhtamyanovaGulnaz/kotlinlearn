<template>
  <v-container grid-list-md v-if="part">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 v-if="finishedDate">
        <v-card>
          <v-responsive>
            <v-img src="https://firebasestorage.googleapis.com/v0/b/learnkotlin-9c03c.appspot.com/o/checkmark--v1.png?alt=media&token=94bca7fe-47df-4a78-8e3a-cf3f692e2e8e" max-width="100px"> </v-img>
          </v-responsive>
          <v-card-title primary-title>
            <div class="headline">Я изучил {{ finishedDate | formattedDate }}!</div>
          </v-card-title>
          <v-card-actions>
            <span>Моя оценка</span>
            <v-rating v-model="savedRating" color="success" half-increments readonly large></v-rating>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-content :part="part"></book-part-content>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-words :wordss="part.words"></book-part-words>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 class="text-xs-center">
        <v-dialog v-model="finishDialog" persistent max-width="600px">
          <v-btn v-if="!finishedDate" slot="activator" color="success" dark @click="finishDialog == true"> <v-icon>check</v-icon> Я изучил! </v-btn>
          <v-card>
            <v-responsive>
              <v-img src="https://firebasestorage.googleapis.com/v0/b/learnkotlin-9c03c.appspot.com/o/checkmark--v1.png?alt=media&token=94bca7fe-47df-4a78-8e3a-cf3f692e2e8e" max-width="100px">
              </v-img>
            </v-responsive>
            <v-card-title primary-title>
              <div class="headline">Я изучил!</div>
            </v-card-title>
            <v-card-text>
              <span>Моя оценка</span>
              <v-rating v-model="rating" color="success" half-increments large></v-rating>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark flat @click.native="finishDialog = false"> <v-icon>close</v-icon> Закрыть </v-btn>
              <v-btn color="success" dark flat @click.native="finishWork"> <v-icon>check</v-icon> Я закончил работу! </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import BookPartContent from '../components/BookPartContent'
import BookPartWords from '../components/BookPartWords'
export default {
  props: {
    bookId: {
      type: String,
      required: true,
    },
    partId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      part: null,
      finishDialog: false,
      rating: null,
    }
  },
  computed: {
    finishedDate() {
      return this.$store.getters.userData?.books[this.bookId].parts[this.partId]?.finishedDate || false
    },
    savedRating() {
      return this.$store.getters.userData.books[this.bookId].parts[this.partId].rating
    },
  },
  created() {
    Vue.$db
      .collection('bookParts')
      .where('bookId', '==', this.bookId)
      .where('bookPartId', '==', this.partId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((s) => {
          this.part = s.data()
        })
      })
      .then(() => {
        this.$store.dispatch('UPDATE_USER_BOOK_PART_STATS', { bookId: this.bookId, partId: this.partId })
      })
      .catch((error) => console.log(error))
  },
  methods: {
    finishWork() {
      this.$store.dispatch('FINISH_USER_BOOK_PART', { bookId: this.bookId, partId: this.partId, rating: this.rating })
      this.finishDialog = false
    },
  },
  components: {
    BookPartContent,
    BookPartWords,
  },
}
</script>

<style scoped></style>
