<template>
  <div class="logo-title">
    <div class="title">
      <div class="top">
        <img src="../assets/logo4-C2.png" alt="" class="logo" />
        <span>Home Delicious</span>
      </div>
      <div  class="bottom">
        <span class="left">Trending</span><span class="right">Food</span>
      </div>
    </div>
    <div  class="avatar">
      <img
        v-if="this.$store.getters.login"
        :src="avatar"
        alt=""
        @click="toUserpage"
      />
      <img v-else @click="toLoginPage" src="../assets/avatar.png" alt="" />
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  data() {
    return {
      // icon: false,
      avatar: cookies.get("user").icon,
    };
  },
  methods: {
    toUserpage() {
      this.$router.push("/user/" + cookies.get("user").user_id);
    },
    toLoginPage() {
      this.$router.push("/login");
    },
  },
  mounted() {
    if (this.$router.history.current.path == "/") {
      this.icon = true;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.logo-title {
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  justify-items: center;
  .title {
    justify-self: start;
    .top {
      img {
        height: 3vh;
        position: relative;
        top: 0.5vh;
        margin-right: 2vw;
      }
      span {
        font-family: $titlefonts;
        font-size: 1.2rem;
        color: $fontColorlight;
      }
    }
    .bottom {
      font-family: $fonts;
      font-size: 1.1rem;
      color: $fontColorlight;
      .left {
        color: black;
        margin-right: 2vw;
      }
    }
  }
  .avatar {
    justify-self: end;
    img {
      height: 3em;
      border-radius: 50%;
    }
  }
}
@media only screen and (min-width: 1280px) {
  .logo-title {
    grid-template-columns: 1fr;
    margin-left: 10vw;
    margin-top: 10vh;
    .title {
      justify-self: center;
      .top {
        img {
          height: 2.5vw;
          margin-right: 1vw;
        }
        span {
          font-size: 1.5rem;
        }
      }
      .bottom {
        text-align: center;
        margin-top: 1vh;
        font-size: 1.3rem;
        .left {
          margin-right: 1vw;
        }
      }
    }
    .avatar {
      margin-top: 3vh;
      justify-self: center;
      img {
        height: 5vw;
        border-radius: 50%;
      }
    }
  }
}
</style>