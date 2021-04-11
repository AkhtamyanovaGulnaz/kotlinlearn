import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebaseConfig from './config/firebase'
import firebase from 'firebase'
import 'firebase/firestore'
import VueYouTubeEmbed from 'vue-youtube-embed'
import FormattedDate from './filters/formattedDate'
import { setupBus } from './infrastructure/eventBus'

Vue.use(Vuetify)
Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

Vue.filter('formattedDate', FormattedDate)

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
db.settings({
  timestampsInSnapshots: true,
})

Vue.$db = db

setupBus()

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    this.$store.dispatch('LOAD_BOOKS')
  },
}).$mount('#app')
