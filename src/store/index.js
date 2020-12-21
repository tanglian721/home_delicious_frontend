import Vue from "vue";
import Vuex from "vuex";
import cookies from "vue-cookies"
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        food: {},
        method: {},
        // ingredient: {},
        ifuploadMethodData: false,
        ifuploadFoodData: false,
        edit_food_id: "",
        collectionList: [],
        homeListChoice: "fry",
        food_grade: 0,
        userpageToggle: "production",
        searchFoodList: [],
        searchShow: false,
        language: cookies.get("Chinese"),
        ifeditFood: true,
        editStatue: null,
    },
    mutations: {
        updateMethod(state, data) {
            state.method = data
        },
        updateEditStatue(state, data) {
            state.editStatue = data
        },
        uploadMethodData(state) {
            state.ifuploadMethodData = true
        },
        uploadFoodData(state) {
            state.ifuploadFoodData = true
        },
        saveEditFoodId(state, data) {
            state.edit_food_id = data
        },
        saveCollectionList(state, data) {
            state.collectionList = data
        },
        saveSearchFoodList(state, data) {
            state.searchFoodList = data
        },
        updateHomeListChoice(state, data) {
            state.homeListChoice = data
        },
        uploadGrade(state, data) {
            state.food_grade = data
        },
        userpageChoice(state, data) {
            state.userpageToggle = data
        },
        updataFood(state, data) {
            state.food = data
        },
        updateIfeditFood(state, data) {
            state.ifeditFood = data
        }
    },
    actions: {},
    modules: {},
    getters: {
        collectionIdList(state) {
            let list = []
            for (let i = 0; i < state.collectionList.length; i++) {
                list.push(state.collectionList[i].food_id)
            }
            return list
        },
        login() {
            if (cookies.get("user") != null) {
                return true
            } else {
                return false
            }
        },
        foodImage(state) {
            let list = state.food.image.split("<###^^&&###>")
            list.pop()
            return list
        },
        desktop() {
            if (screen.width >= 1280) {
                return true
            } else {
                false
            }
        },
        mobile() {
            if (screen.width < 1280) {
                return true
            } else {
                false
            }
        },
        lan() {
            if (cookies.get("language") == "Chinese") {
                return true
            } else {
                return false
            }
        },
        editFood(state) {
            return state.ifeditFood
        }
    }
})