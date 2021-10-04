import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    getters: {
        loading: (state) => state.loading,
        signedIn: (state) => state.signedIn,
    },
    state: {
        loading: false,
        signedIn: false
    },
    mutations: {
        loading(state, loading) {
            state.loading = loading
        },
        signedIn(state, signedIn) {
            state.signedIn = signedIn
        }
    },
    actions: {
        loading({ commit }, loading) {
            console.log('action loading...')
            commit('loading', loading)
        },
        signedIn({ commit }, signedIn) {
            commit('signedIn', signedIn)
        }
    },
    plugins: [createPersistedState({ storage: window.localStorage })],
});

export default store;