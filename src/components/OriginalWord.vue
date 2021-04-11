<template>
  <div>
    <v-tooltip bottom>
      <v-avatar slot="activator" v-if="word.type == 1" color="teal" :size="size">
        <span class="white--text">W</span>
      </v-avatar>
      <span>Слово</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-avatar slot="activator" v-if="word.type == 2" color="indigo" :size="size">
        <span class="white--text">RW</span>
      </v-avatar>
      <span>Выражение</span>
    </v-tooltip>
    {{ getFullOriginalWord(word) }} <v-icon v-if="canPronounceWord" @click="pronounce(word)">music_note</v-icon>
  </div>
</template>

<script>
import { getFullOriginalWord } from '../helpers/words'

export default {
  props: {
    word: Object,
    size: Number,
    canPronounceWord: {
      type: Boolean,
      default: false,
    },
    showAudio: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // canPronounceWord: false,
      voice: null,
    }
  },
  methods: {
    getFullOriginalWord: getFullOriginalWord,
    pronounce(word) {
      let msg = new SpeechSynthesisUtterance()
      msg.voice = this.voice
      msg.rate = 1
      msg.pitch = 1
      msg.volume = 1
      msg.text = getFullOriginalWord(word)

      speechSynthesis.speak(msg)
    },
  },
  created() {
    if (this.showAudio)
      if ('speechSynthesis' in window) {
        console.log('voices', speechSynthesis.getVoices())
        // let americanVoices = speechSynthesis.getVoices().filter((v) => v.name.indexOf('Google US English') >= 1)
        this.voice = speechSynthesis.getVoices()[49]
        // console.log(americanVoices)
        // if (americanVoices.length) {
        //   this.canPronounceWord = true
        //   this.voice = americanVoices[0]
        // }
      }
  },
}
</script>

<style scoped></style>>
