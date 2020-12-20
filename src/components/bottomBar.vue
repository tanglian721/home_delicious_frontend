<template>
  <div class="bottom-bar">
    <div class="icon">
      <img src="../assets/home.png" alt="" @click="home" />
      <img src="../assets/heart.png" alt="" @click="toCollection" />
      <img src="../assets/search.png" alt="" @click="toSearchPage" />
    </div>
  </div>
</template>
<script>
import cookies from "vue-cookies";
export default {
  methods: {
    home() {
      this.$router.push("/");
    },
    toCollection() {
      if (this.$store.getters.login == true) {
        this.$router.push("/user/" + cookies.get("user").user_id);
        this.$store.commit("userpageChoice", "collection");
      } else {
        this.$router.push("/login");
      }
    },
    toSearchPage() {
      console.log(this.$router.history.current);
      if (this.$router.history.current.path == "/search") {
        this.$store.state.searchShow = false;
      } else {
        this.$router.push("/search");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.bottom-bar {
  .icon {
    width: 70%;
    margin-left: 15%;
    display: flex;
    justify-content: space-between;
    img {
      margin-top: 2.5vh;
      height: 3vh;
    }
  }
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.267));
  border: 1px solid $bgc;
  border-radius: 10px 10px 0 0;
}
</style>