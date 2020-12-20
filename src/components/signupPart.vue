<template>
  <div class="signup-part">
    <div class="form">
      <h3>
        <span v-if="this.$store.getters.lan">用户注册</span
        ><span v-else>Sign Up</span>
      </h3>
      <p>
        <span v-if="this.$store.getters.lan">用户名</span
        ><span v-else>username</span>
      </p>
      <input v-model="username" type="text" />
      <p>
        <span v-if="this.$store.getters.lan">密码</span
        ><span v-else>password</span>
      </p>
      <input v-model="password" type="password" />
      <p>
        <span v-if="this.$store.getters.lan">电子邮箱</span
        ><span v-else>email</span>
      </p>
      <input v-model="email" type="text" />
      <p>
        <span v-if="this.$store.getters.lan">生日</span
        ><span v-else>birthday</span>
      </p>
      <input v-model="birthday" type="date" class="date" />
      <p>
        <span v-if="this.$store.getters.lan">所在地</span
        ><span v-else>location</span>
      </p>
      <input v-model="location" type="text" />
      <p>
        <span v-if="this.$store.getters.lan">简介</span><span v-else>bio</span>
      </p>
      <input v-model="bio" type="text" />
      <p>
        <span v-if="this.$store.getters.lan">头像</span><span v-else>icon</span>
      </p>
      <image-upload @newImage="newImage" />
      <img v-if="icon != ''" :src="this.icon" alt="" />
      <div class="button">
        <button @click="SignUp">
          <span v-if="this.$store.getters.lan">注册</span
          ><span v-else>SignUp</span>
        </button>
        <button @click="back">
          <span v-if="this.$store.getters.lan">返回</span
          ><span v-else>Back</span>
        </button>
      </div>
    </div>
    <div class="bg" @click="back"></div>
  </div>
</template>

<script>
import imageUpload from "./imageUpload.vue";
import axios from "axios";
import cookies from "vue-cookies";
export default {
  components: { imageUpload },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      birthday: "",
      location: "",
      bio: "",
      icon: "",
    };
  },
  methods: {
    back() {
      this.$emit("back");
    },
    newImage(data) {
      this.icon = data;
    },
    SignUp() {
      axios
        .request({
          url: "https://homedelicious.ml/api/users",
          method: "post",
          data: {
            username: this.username,
            password: this.password,
            email: this.email,
            birthday: this.birthday,
            location: this.location,
            bio: this.bio,
            icon: this.icon,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
          cookies.set("user", response.data);
          cookies.set("token", response.data.token);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.signup-part {
  font-family: $fonts;
  .form {
    box-sizing: border-box;
    padding: 4vw;
    border-radius: 10px;
    filter: $shadow;
    z-index: 20;
    width: 80%;
    background-color: #fff;
    display: grid;
    row-gap: 1vh;
    align-content: center;
    justify-items: center;
    h3 {
      margin: 5vw;
    }
    input {
      border: 1px solid $fontColordark;
    }
    .date {
      height: 1.5rem;
    }
    .image-upload {
      width: 80%;
    }
    img {
      width: 25vw;
      height: 25vw;
      object-fit: cover;
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
  .bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.267);
  }
}
@media only screen and (min-width: 1280px) {
  .signup-part {
    .form {
      width: 40%;
      height: 80%;
      .image-upload {
        width: 10vw;
      }
      h3 {
        margin: 2vw;
      }
      img {
        width: 10vw;
        height: 10vw;
        object-fit: cover;
      }
      .button {
        padding: 3vh;
        display: flex;
        justify-content: space-evenly;
        font-size: 0.8rem;
        width: 20vw;
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
    .bg {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.267);
    }
  }
}
</style>