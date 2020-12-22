<template>
  <div class="edit-user">
    <desktop-Bar v-if="this.$store.getters.desktop" />
    <logo-title v-if="this.$store.getters.mobile" />
    <div class="edit-area">
      <p>
        <span v-if="this.$store.getters.lan">用户名</span
        ><span v-else>username</span>
      </p>
      <input v-model="username" type="text" />
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
      <textarea
        name=""
        id=""
        cols="30"
        rows="5"
        v-model="bio"
        type="text"
      ></textarea>
      <p>
        <span v-if="this.$store.getters.lan">头像</span><span v-else>icon</span>
      </p>
      <img v-if="icon != ''" :src="this.icon" alt="" />
      <image-upload @newImage="newImage" />
      <div class="button">
        <button @click="updateUsers">
          <span v-if="this.$store.getters.lan">确认修改</span
          ><span v-else>update</span>
        </button>
      </div>
    </div>
    <bottom-bar v-if="this.$store.getters.mobile" />
  </div>
</template>

<script>
import BottomBar from "../components/bottomBar.vue";
import LogoTitle from "../components/logoTitle.vue";
import axios from "axios";
import cookies from "vue-cookies";
import DesktopBar from "../components/desktopBar.vue";
import ImageUpload from "../components/imageUpload.vue";
export default {
  name: "Home",
  components: {
    BottomBar,
    LogoTitle,
    DesktopBar,
    ImageUpload,
  },
  data() {
    return {
      user: cookies.get("user"),
      username: cookies.get("user").username,
      email: cookies.get("user").email,
      birthday: cookies.get("user").birthday,
      location: cookies.get("user").location,
      bio: cookies.get("user").bio,
      icon: cookies.get("user").icon,
    };
  },
  methods: {
    updateUsers() {
      let password = prompt("Please input your password");
      console.log(this.location);
      console.log(this.icon)
      axios
        .request({
          url: "https://homedelicious.ml/api/users",
          method: "patch",
          data: {
            token: cookies.get("token"),
            username: this.username,
            old_password: password,
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
          window.history.back();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newImage(data) {
      this.icon = data;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.edit-user {
  width: 100vw;
  min-height: 100vh;
  background-color: $bgc;
  position: relative;
  font-family: $fonts;
  color: $fontColordark;

  .logo-title {
    width: 70%;
    height: 10vh;
    margin-left: 15%;
  }
  .edit-area {
    margin-top: 2em;
    width: 100%;
    display: grid;
    justify-items: center;
    img {
      width: 6em;
      height: 6em;
      object-fit: cover;
      border-radius: 50%;
      filter: $shadow;
    }
    p {
      margin-top: 0.5em;
      width: 80%;
      text-align: center;
      text-transform: capitalize;
    }
    input,
    textarea {
      margin-top: 5px;
      width: 60%;
      text-align: center;
      border: 1px solid $fontColorlight;
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
    .image-upload {
      width: 60%;
      margin-left: 10%;
      margin-top: 1em;
    }
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
@media only screen and (min-width: 1280px) {
  .edit-user {
    .desktop-bar {
      box-sizing: border-box;
      z-index: 50;
      position: fixed;
      height: 100vh;
      width: 25vw;
      background-color: $bgc;
    }
  
    .edit-area {
      margin-top: 0;
      padding-top: 6em;
      margin-left: 28vw;
      width: 55%;
      display: grid;
      justify-items: center;
      img {
        width: 6em;
        height: 6em;
        object-fit: cover;
        border-radius: 50%;
        filter: $shadow;
      }
      p {
        margin-top: 0.5em;
        width: 40%;
        text-align: center;
        text-transform: capitalize;
      }
      input,
      textarea {
        margin-top: 5px;
        width: 40%;
        text-align: center;
        border: 1px solid $fontColorlight;
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
      .image-upload {
        width: 40%;
      }
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
}
</style>
