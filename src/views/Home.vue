<template>
  <div class="home">
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
    <desktop-Bar v-if="this.$store.getters.desktop" />
    <logo-title v-if="this.$store.getters.mobile" />
    <search-bar />
    <trend-food-list />
    <category-bar @selection="selection" />
    <food-card-list @cooking_choice="cooking_selection" />
    <bottom-bar v-if="this.$store.getters.mobile" />
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
    z-index: 49;
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
    position: relative;
    // overflow: hidden;
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
      .select{
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
      }}
    }
  }
}
@media only screen and (min-width: 1280px) {
  .home {
    .desktop-bar {
      box-sizing: border-box;
      z-index: 50;
      position: fixed;
      height: 100vh;
      width: 25vw;
      background-color: $bgc;
    }
    .search-bar {
      z-index: 20;
      // width: 50vw;
      margin-left: 28vw;
      height: 6em;
      top: 0;
    }
    .trend-food-list {
      width: 50vw;
      height: 30vw;
      margin-left: 28vw;
    }
    .category-bar {
      width: 55vw;
      height: 6em;
      margin-left: 25vw;
      margin-top: 2vh;
      top: 10vh;
    }
    .food-card-list {
      width: 50vw;
      min-height: 20vh;
      margin-left: 27vw;
    }
      .pop-up {
    z-index: 99;
    // position: absolute;
    background-color: rgba(5, 5, 5, 0.63);
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    justify-items: center;
    align-items: center;
    .language {
      width: 20vw;
      height: auto;
      padding: 1em;
      background-color: #fff;
      filter: $shadow;
      border-radius: 10px;
        display: grid;
        justify-items: center;
        row-gap: 1em;
      .select{
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
      }}
    }
  }
  }
}
</style>
