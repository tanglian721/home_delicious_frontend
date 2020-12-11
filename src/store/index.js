import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        method: {}
    },
    mutations: {
        updateMethod(state, data) {
            state.method = data
        }
    },
    actions: {},
    modules: {},
});