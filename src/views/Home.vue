<template>
  <div class="page-set container-xl position-relative">
    <div v-if="pop_up" class="pop-up">
      <div class="language">
        <div class="text">
          <p>Please Chooese your language :</p>
          <p>请选择您的语言 :</p>
        </div>
        <div class="select">
          <button @click="setEnglish">English</button>
          <button @click="setChinese">中文</button>
        </div>
      </div>
    </div>
    <div class="row">
      <desktop-Bar class="position-fixed" v-if="this.$store.getters.desktop" />
      <logo-title
        class="px-2 pt-5 pb-3 box-border"
        v-if="this.$store.getters.mobile"
      />
      <div class="col-12 offset-lg-3 col-lg-9 container-fluid">
        <div class="row">
          <div class="searchBarDiv"></div>
          <div class="trendDiv"></div>
          <div class="categoryDiv"></div>
          <div class="foodCardDiv"></div>
          <search-bar class="position-sticky bg-bgc" />
          <trend-food-list />
          <category-bar @selection="selection" />
          <food-card-list @cooking_choice="cooking_selection" />
        </div>
      </div>
      <bottom-bar v-if="this.$store.getters.mobile" />
    </div>
  </div>
</template>

<script>
import FoodCardList from "../components/foodCardList.vue";
import SearchBar from "../components/searchBar.vue";
import TrendFoodList from "../components/trendFoodList.vue";
import CategoryBar from "../components/categoryBar.vue";
import BottomBar from "../components/bottomBar.vue";
import LogoTitle from "../components/logoTitle.vue";
import axios from "axios";
import cookies from "vue-cookies";
import DesktopBar from "../components/desktopBar.vue";
export default {
  name: "Home",
  components: {
    BottomBar,
    LogoTitle,
    SearchBar,
    TrendFoodList,
    CategoryBar,
    FoodCardList,
    DesktopBar,
  },
  data() {
    return {
      cooking_selection: "fry",
      mobile: screen.width,
      pop_up: false,
    };
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
          this.$store.commit("saveCollectionList", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selection(data) {
      this.cooking_selection = data;
    },
    setChinese() {
      cookies.set("language", "Chinese");
      this.pop_up = false;
      location.reload();
    },
    setEnglish() {
      cookies.set("language", "English");
      this.pop_up = false;
      location.reload();
    },
  },
  mounted() {

    if (cookies.get("user") != undefined) {
      this.getCollection();
    }

    if (cookies.get("language") == undefined) {
      this.pop_up = true;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.trend-food-list {
  box-sizing: border-box;
  width: 100%;
  height: 40vh;
  position: relative;
}
.category-bar {
  z-index: 20;
  width: 100%;
  height: 11vh;
  background-color: $bgc;
  position: sticky;
  top: 5rem;
}

.bottom-bar {
  z-index: 50;
  width: 100%;
  height: 8vh;
  background-color: #fff;
  position: fixed;
  bottom: 0;
}
.pop-up {
  z-index: 99;
  position: fixed;
  background-color: rgba(5, 5, 5, 0.63);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
  .language {
    width: 80%;
    height: auto;
    padding: 1em;
    background-color: #fff;
    filter: $shadow;
    border-radius: 10px;
    display: grid;
    justify-items: center;
    row-gap: 1em;
    .select {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      align-items: center;
      width: 100%;
      button {
        background-color: $fontColorlight;
        color: #fff;
        border-radius: 0.5rem;
        padding: 5px;
        text-transform: uppercase;
        font-family: $fonts;
        filter: $shadow;
        width: 80%;
        height: fit-content;
        font-size: 0.8em;
      }
    }
  }
}
@media only screen and (min-width: 992px) {
  .trend-food-list {
    height: 30vw;
  }
}
</style>
