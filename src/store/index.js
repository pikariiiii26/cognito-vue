import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    getters: {
        loading: (state) => state.loading,
        signedIn: (state) => state.signedIn,
        sns: (state) => state.sns,
        user: (state) => state.user
    },
    state: {
        loading: false,
        signedIn: false,
        sns: null,
        user: null
    },
    mutations: {
        loading(state, loading) {
            state.loading = loading
        },
        signedIn(state, signedIn) {
            state.signedIn = signedIn
        },
        sns(state, sns) {
            state.sns = sns
        },
        user(state, user) {
            state.user = user
        }
    },
    actions: {
        loading({ commit }, loading) {
            console.log('action loading...')
            commit('loading', loading)
        },
        signedIn({ commit }, signedIn) {
            commit('signedIn', signedIn)
        },
        setSns({ commit }, signedIn) {
            commit('sns', signedIn)
        },
        setUser({ commit }, user) {
            commit('user', user)
        }
    },
    plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;
