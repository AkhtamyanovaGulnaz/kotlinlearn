<template>
  <v-card class="pa-2">
    <div>
      <div class="display-1">{{ part.bookTitle }}</div>
      <div class="headline">{{ part.partTitle }}</div>
      <v-divider class="black"></v-divider>
    </div>
    <div class="text-xs-center mt-2 mb-2 primary">
      <youtube :video-id="part.youtube_id" :player-width="playerWidth"></youtube>
    </div>
    <div class="mt-2">
      <v-tabs v-model="tabMode">
        <v-tab :key="'origin'" ripple>
          Текст с подсказками
        </v-tab>
        <v-tab :key="'sidebyside'" ripple>
          Параллельно
        </v-tab>
      </v-tabs>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    part: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tabMode: 'origin',
    }
  },
  computed: {
    playerWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '220px'
        case 'sm':
          return '400px'
        case 'md':
          return '500px'
        case 'lg':
          return '600px'
        case 'xl':
          return '800px'
        default:
          return '800px'
      }
    },
  },
}
</script>

<style scoped></style>
