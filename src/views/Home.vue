<template>
  <div class="home">
    <logo-title />
    <search-bar />
    <trend-food-list />
    <category-bar @selection="selection"/>
    <food-card-list @cooking_choice="cooking_selection"/>
    <bottom-bar />
  </div>
</template>

<script>
import BottomBar from "../components/bottomBar.vue";
import FoodCardList from "../components/foodCardList.vue";
import LogoTitle from "../components/logoTitle.vue";
import SearchBar from "../components/searchBar.vue";
import TrendFoodList from "../components/trendFoodList.vue";
import CategoryBar from "../components/categoryBar.vue";
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "Home",
  components: {
    BottomBar,
    LogoTitle,
    SearchBar,
    TrendFoodList,
    CategoryBar,
    FoodCardList,
  },
  data() {
    return {
      cooking_selection: "fry"
    }
  },
  props: {
    cooking_choice: {
      type: String,
    },
  },
  methods: {
    getCollection() {
      axios
        .request({
          url: "https://homedelicious.ml/api/collection",
          method: "get",
          params: {
            user_id: cookies.get("user").user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.commit("saveCollectionList", response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selection(data) {
      this.cooking_selection = data
    }
  },
  mounted () {
    if(cookies.get("user") != undefined){
    this.getCollection();}
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.home {
  width: 100vw;
  min-height: 100vh;
  background-color: $bgc;
  position: relative;
  .logo-title {
    width: 70%;
    height: 10vh;
    margin-left: 15%;
  }
  .search-bar {
    z-index: 20;
    width: 100%;
    height: 8vh;
    background-color: $bgc;
    position: sticky;
    top: 0;
  }
  .trend-food-list {
    box-sizing: border-box;
    width: 100%;
    height: 40vh;
    overflow: hidden;
  }
  .category-bar {
    z-index: 20;
    width: 100%;
    height: 10vh;
    background-color: $bgc;
    position: sticky;
    top: 8vh;
  }
  .food-card-list {
    width: 100%;
    min-height: 24vh;
    // background-color: rgb(107, 138, 58);
  }
  .bottom-bar {
    z-index: 50;
    width: 100%;
    height: 8vh;
    background-color: #fff;
    position: fixed;
    bottom: 0;
  }
}
</style>
