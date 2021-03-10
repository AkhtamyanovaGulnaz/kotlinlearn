import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import generalModule from './general'
import booksModule from './books'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    generalModule,
    userModule,
    booksModule,
  },
})
