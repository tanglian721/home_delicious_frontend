import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        method: {},
        ifuploadMethodData: false,
        ifuploadFoodData: false,
        edit_food_id: "10",
    },
    mutations: {
        updateMethod(state, data) {
            state.method = data
        },
        uploadMethodData(state) {
            state.ifuploadMethodData = true
        },
        uploadFoodData(state) {
            state.ifuploadFoodData = true
        },
        saveEditFoodId(state, data) {
            state.edit_food_id = data
        }
    },
    actions: {},
    modules: {},
});