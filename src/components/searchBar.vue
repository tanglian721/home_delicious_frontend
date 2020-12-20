<template>
  <div class="search-bar">
    <input class="bar" type="text" v-model="content" @keypress.enter="enter" />
    <img @click="searchByTag" src="../assets/search-w.png" alt="" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    enter() {
      this.searchByTag();
    },
    searchByTag() {
      if (this.$router.history.current.path == "/search") {
        axios
          .request({
            url: "https://homedelicious.ml/api/search",
            method: "get",
            params: {
              content: this.content,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$store.commit("saveSearchFoodList", response.data);
            this.$store.state.searchShow = true;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .request({
            url: "https://homedelicious.ml/api/search",
            method: "get",
            params: {
              content: this.content,
              user_id: this.$router.history.current.params.pathMatch,
              searchTag: "InUserFoods",
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$store.commit("saveSearchFoodList", response.data);
            this.$router.push("/search");
            this.$store.state.searchShow = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.search-bar {
  display: grid;
  justify-items: center;
  align-items: center;
  position: relative;
    color: fontsColordark;
  .bar {
    box-sizing: border-box;
    background-color: $barBgc;
    height: 10vw;
    width: 70%;
    border-radius: 2vh;
    border: none;
    filter: $shadow;
    padding-left: 15vw;
    font-size: 1.1rem;
  }
  img {
    position: absolute;
    height: 1em;
    left: 18%;
  }
}
@media only screen and (min-width: 1280px) {
  .search-bar {
    display: grid;
    justify-items: start;
    .bar {
      height: 2em;
      width: 40vw;
      border-radius: 2vh;
      padding-left: 4vw;
    }
    img {
      position: absolute;
      height: 1em;
      left: 2vw;
    }
  }
}
</style>