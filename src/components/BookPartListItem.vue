<template>
  <div>
    <v-card color="accent" class="white--text">
      <v-card-title primary-title class="headline">{{ part.title }} </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div v-if="finishedDate" class="mr-2">
          <v-icon dark>check</v-icon>
          Изучено {{ finishedDate | formattedDate }}
        </div>
        <v-btn flat class="primary" v-if="isUserBookLoaded()" :to="{ name: 'bookPart', params: { bookId: bookId, partId: part.id } }">Открыть</v-btn>
        <!-- <v-btn flat class="primary" :to="{ name: 'bookPart', params: { bookId: bookId, partId: part.id } }">Открыть</v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    part: {
      type: Object,
      required: true,
    },
    bookId: {
      required: true,
    },
  },
  computed: {
    ...mapGetters(['isUserAuthenticated', 'userData', 'getProcessing']),
    finishedDate() {
      if (!this.isUserAuthenticated) return false

      let book = this.userData.books[this.bookId]
      if (book && book.parts[this.part.id]) return book.parts[this.part.id].finishedDate
    },
  },
  methods: {
    isUserBookLoaded() {
      return this.isUserAuthenticated && !this.getProcessing && !!this.userData.books[this.bookId]
    },
  },
}
</script>

<style scoped></style>
