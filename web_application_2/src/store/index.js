/* ------------------------------------------------------------------- *
 * Vuex-Store 定義
 * ------------------------------------------------------------------- */
import Vue from 'vue'
import Vuex from 'vuex'

import templateStore from '@/store/templateStore'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    'templateStore': templateStore
  }
})
