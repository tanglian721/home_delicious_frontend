import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Food from "../views/Food.vue";
import uploadFood from "../views/uploadFood.vue";
import LoginPage from "../views/LoginPage.vue";
import UserPage from "../views/userPage.vue"
import SearchPage from "../views/searchPage.vue"
import EditFood from "../views/editFood.vue"
import EditUser from "../views/editUser.vue"
import SettingPage from "../views/settingPage.vue"

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home
}, {
    path: "/food/*",
    name: "food",
    component: Food
}, {
    path: "/upload",
    name: "upload",
    component: uploadFood,

}, {
    path: "/login",
    name: "login",
    component: LoginPage
}, {
    path: "/user/*",
    name: "user",
    component: UserPage
}, {
    path: "/search",
    name: "search",
    component: SearchPage
}, {
    path: "/edit",
    name: "editFood",
    component: EditFood
}, {
    path: "/editUser",
    name: "editUser",
    component: EditUser
}, {
    path: "/setting",
    name: "setting",
    component: SettingPage
}, ];

const router = new VueRouter({
    routes
});


export default router;