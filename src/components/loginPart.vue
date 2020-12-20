<template>
  <div class="login-part">
    <p><span v-if="this.$store.getters.lan" >用户名</span><span v-else >username</span></p>
    <input type="text" v-model="username" />
    <p><span v-if="this.$store.getters.lan" >密码</span><span v-else >password</span></p>
    <input type="password" v-model="password" />
    <div class="button">
      <button @click="login"><span v-if="this.$store.getters.lan" >登陆</span><span v-else >Login</span></button>
      <button @click="back" ><span v-if="this.$store.getters.lan" >返回</span><span v-else >Back</span></button>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
export default {
  data() {
    return {
      username: "",
      password: "",
      user:null,
    };
  },
  methods: {
      back() {
          window.history.back()
      },
      login() {
          axios
        .request({
          url: "https://homedelicious.ml/api/login",
          method: "post",
          data: {
            username: this.username,
            password:this.password
          },
        })
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
          cookies.set("user",response.data)
          cookies.set("token",response.data.token)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error);
        });
      }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.login-part {
  font-family: $fonts;
  display: grid;
  justify-items: center;
  align-content: center;
  row-gap: 1vh;
  p{
      font-size: 1rem;
  }
  input{
      border:1px solid $fontColordark;
      background-color: #fff;
  }
  .button {
    padding: 3vh;
    display: flex;
    justify-content: space-evenly;
    font-size: 0.8rem;
    width: 80%;
    button {
      background-color: $fontColordark;
      color: #fff;
      border-radius: 0.5rem;
      padding: 5px;
      text-transform: uppercase;
      font-family: $fonts;
      border: 1px solid $fontColordark;
    }
  }

}
</style>