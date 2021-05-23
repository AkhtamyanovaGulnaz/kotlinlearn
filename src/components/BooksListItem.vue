<template>
  <v-card color="info" class="white--text">
    <v-container fluid>
      <v-layout row class="hidden-sm-and-down">
        <v-flex xs6 md5>
          <v-img :src="book.imageUrl" height="230px" width="290"> </v-img>
          <div class="text-xs-center">
            <v-btn flat color="white" :href="getYoutubePlaylistLink(book.youtube_playlist_id)" target="_blank"> 
              <v-icon left>visibility</v-icon> 
                YouTube
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs8 md9>
          <v-card-title>
            <div>
              <div class="headline">{{ book.title }}</div>
              <div>{{ book.description }}</div>
              <v-divider class="white"></v-divider>
              <div>Уровень: {{ getBookLevel(book.level) }}; Количество частей: {{ book.parts.length }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <!-- <v-rating v-model="book.rating" color="yellow" readonly dense half-increments></v-rating>
            <div class="ml-1">
              <span>{{ book.rating }}</span>
              <span>({{ book.ratingsCount }})</span>
            </div> -->
            <v-spacer></v-spacer>
            <v-btn class="primary" flat :to="{ name: 'book', params: { id: book.id } }">Открыть</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
      <div class="hidden-md-and-up">
        <v-layout row>
          <v-flex xs6 md5>
            <v-img :src="book.imageUrl" height="120px" width="220"> </v-img>
          </v-flex>
          <v-flex xs8 md9>
            <v-card-title>
              <div>
                <h4>{{ book.title }}</h4>
                <div class="text-xs-center">
                  <v-btn flat color="white" :href="getYoutubePlaylistLink(book.youtube_playlist_id)" target="_blank"> 
                    <v-icon left>visibility</v-icon> 
                      YouTube 
                  </v-btn>
                </div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <div>{{ book.description }}</div>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <div>Уровень: {{ getBookLevel(book.level) }}; Количество частей: {{ book.parts.length }}</div>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <!-- <v-rating v-model="book.rating" color="yellow" readonly dense half-increments></v-rating>
              <div class="ml-1">
                <span>{{ book.rating }}</span>
                <span>({{ book.ratingsCount }})</span>
              </div> -->
              <v-spacer></v-spacer>
              <v-btn class="primary" flat :to="{ name: 'book', params: { id: book.id } }">Открыть</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import * as bookHelper from '../helpers/book'
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getBookLevel: bookHelper.getBookLevel,
    getYoutubePlaylistLink: (yId) => `https://www.youtube.com/playlist?list=${yId}`
  },
}
</script>

<style scoped></style>
