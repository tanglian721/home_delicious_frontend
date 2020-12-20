<template>
  <div class="login-page">
    <div class="logo">
      <img src="../assets/logo4-C2.png" alt="" class="logo" />
      <h2>Home Delicious</h2>
    </div>
    <login-part />
    <button>or <u @click="Signup"><span v-if="this.$store.getters.lan">注册</span><span v-else>Sign up</span></u></button>
    <signup-part v-if="ifSignUp" @back="unSignup" />
  </div>
</template>

<script>
import LoginPart from "../components/loginPart.vue";
import SignupPart from "../components/signupPart.vue";
export default {
  components: { LoginPart, SignupPart },
  data() {
    return {
      ifSignUp: false,
    };
  },
  methods: {
    Signup() {
      this.ifSignUp = true;
    },
    unSignup() {
      this.ifSignUp = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.login-page {
  width: 100vw;
  min-height: 100vh;
  background-color: $bgc;
  position: relative;
  justify-items: center;
  align-content: center;
  row-gap: 5vh;
  display: grid;
  .logo {
    display: grid;
    justify-items: center;
    align-content: center;
    img {
      width: 30vw;
      position: relative;
      top: 0.5vh;
      margin-bottom: 2vw;
    }
    h2 {
      font-family: $titlefonts;
      font-size: 3rem;
      color: $fontColorlight;
    }
  }
  .login-part {
    width: 80%;
  }
  .signup-part {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: grid;
    align-content: center;
    justify-items: center;
  }
}
@media only screen and (min-width: 1280px) {
  .login-page {
    .logo {
      img {
        width: 10vw;
      }
    }
    .login-part {
      width: 20vw;
    }
  }
}
</style>