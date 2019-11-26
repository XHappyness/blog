import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    userName: false,
    showLogin: false
}

const mutations = {
    upUserName(state, userName) {
        state.userName = userName;
        localStorage.setItem("userName", userName)
    },
    upShowLogin(state, showLogin) {
        state.showLogin = showLogin;
    }
}

const getters = {
    userName(state) {
        return state.userName || localStorage.getItem("userName")
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters
})