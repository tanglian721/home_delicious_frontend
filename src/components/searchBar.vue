<template>
  <div class="search-bar container-fluid position-relative">
    <input
      class="bar bg-barBgc w-80 rounded-pill ps-5"
      type="text"
      v-model="content"
      @keypress.enter="enter"
    />
    <img
      class="search-icon position-absolute start-0"
      @click="searchByTag"
      src="../assets/search-w.png"
      alt=""
    />
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
  z-index: 50;
  height: 6rem;
  top: -5px;
}
.bar {
  height: 2.5rem;
  margin-top: 2rem;
  margin-left: 10%;
  border:none;
}
.search-icon {
  height: 1.5rem;
  margin-top: 2.5rem;
  margin-left: 4rem;
}
@media only screen and (min-width: 992px) {
  .search-icon {
    height: 1.5rem;
    margin-top: 2.5rem;
    margin-left: 8rem;
  }
  .bar {
    height: 2.5rem;
    margin-top: 2rem;
    margin-left: 10%;
    padding-left: 6% !important;
  }
}
</style>