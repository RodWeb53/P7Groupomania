import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    userId: null,
    isUserLoggedIn: false,
    isModerateur: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.userId = user
    },
    setModerateur (state, moderateur) {
      state.isModerateur = moderateur
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },

    
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setModerateur ({commit}, moderateur) {
      commit('setModerateur', moderateur)
    }

  }
})
