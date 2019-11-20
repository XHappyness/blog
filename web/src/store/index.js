import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    userName: false
}

const mutations = {
    upUserName(state, userName) {
        state.userName = userName;
    }
}

export default new Vuex.Store({
    state,
    mutations
})