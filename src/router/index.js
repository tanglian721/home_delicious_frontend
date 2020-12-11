import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Food from "../views/Food.vue";
import uploadFood from "../views/uploadFood.vue"

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
    component: uploadFood
}, ];

const router = new VueRouter({
    routes
});

export default router;