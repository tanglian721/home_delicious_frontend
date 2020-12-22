<template>
  <div class="setting-page">
    <desktop-Bar v-if="this.$store.getters.desktop" />
    <search-bar />
    <div class="setting-option">
      <h2>
        <span v-if="this.$store.getters.lan">设置：</span
        ><span v-else>Setting：</span>
      </h2>
      <button @click="editUser">
        <span v-if="this.$store.getters.lan">修改用户信息</span
        ><span v-else>Modify Account</span>
      </button>
      <button @click="editPassword">
        <span v-if="this.$store.getters.lan">修改密码</span
        ><span v-else>Modify Password</span>
      </button>
      <button @click="DeleteUser">
        <span v-if="this.$store.getters.lan">删除用户</span
        ><span v-else>Delete Account</span>
      </button>
      <button @click="pop_up = !pop_up">
        <span v-if="this.$store.getters.lan">更改语言</span
        ><span v-else>Language Setting</span>
      </button>
      <button @click="logout">
        <span v-if="this.$store.getters.lan">退出登陆</span
        ><span v-else>logout</span>
      </button>
    </div>
    <div v-if="pop_up" class="pop-up">
      <div class="language">
        <button @click="setEnglish">English</button>
        <button @click="setChinese">中文</button>
      </div>
    </div>
    <div v-if="password_pop_up" class="pop-up">
      <div v-if="first" class="password_1st password">
        <p>
          <span v-if="this.$store.getters.lan">请输入您的新密码：</span
          ><span v-else>Please enter you new password:</span>
        </p>
        <input type="password" v-model="newpassword" />
        <button @click="comfirm">
          <span v-if="this.$store.getters.lan">确认</span
          ><span v-else>confirm</span>
        </button>
      </div>
      <div v-else class="password_2st password">
        <p>
          <span v-if="this.$store.getters.lan">请再次输入您的心密码：</span
          ><span v-else>Please re-enter you new password:</span>
        </p>
        <input type="password" v-model="confirmpassword" />
        <button @click="changePassword">
          <span v-if="this.$store.getters.lan">确认</span
          ><span v-else>confirm</span>
        </button>
      </div>
    </div>
    <bottom-bar v-if="this.$store.getters.mobile" />
  </div>
</template>

<script>
import BottomBar from "../components/bottomBar.vue";
import searchBar from "../components/searchBar.vue";
import DesktopBar from "../components/desktopBar.vue";

import cookies from "vue-cookies";
import axios from "axios";

export default {
  components: { searchBar, DesktopBar, BottomBar },
  data() {
    return {
      pop_up: false,
      password_pop_up: false,
      newpassword: null,
      confirmpassword: null,
      oldpassword: null,
      first: true,
    };
  },
  methods: {
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
    editUser() {
      this.$router.push("/editUser");
    },
    logout() {
      cookies.remove("user");
      cookies.remove("login");
      this.$router.push("/login");
    },
    DeleteUser() {
      let password = prompt("Please input your password");
      if (password != undefined) {
        if (confirm("Do you make sure to delete this user?")) {
          axios
            .request({
              url: "https://homedelicious.ml/api/users",
              method: "delete",
              data: {
                token: cookies.get("token"),
                password: password,
              },
            })
            .then((response) => {
              console.log(response.data);
              this.$router.push("/login");
              cookies.remove("user");
              cookies.remove("token");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    editPassword() {
      this.oldpassword = prompt("Please input your password");
      if (this.oldpassword != undefined) {
        this.password_pop_up = true;
      }
    },
    comfirm() {
      this.first = false;
    },
    changePassword() {
      if (this.newpassword == this.confirmpassword) {
        console.log(this.oldpassword)
        console.log(this.newpassword)

        axios
          .request({
            url: "https://homedelicious.ml/api/users",
            method: "patch",
            data: {
              token: cookies.get("token"),
              old_password: this.oldpassword,
              password: this.newpassword,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$router.push("/login");
            cookies.remove("user");
            cookies.remove("token");
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        if (this.$store.getters.lan){
          alert("您两次输入的密码不符！")
        }else{
        alert("The passwords you entered do not match")}
        this.first = true;
      }
    },
  },
  mounted() {
    console.log(cookies.get("chinese"));
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
button {
  background-color: $fontColorlight;
  color: #fff;
  border-radius: 0.5rem;
  padding: 5px;
  text-transform: uppercase;
  font-family: $fonts;
  filter: $shadow;

  //   border: 1px solid $fontColordark;
}
.setting-page {
  width: 100vw;
  min-height: 100vh;
  background-color: $bgc;
  position: relative;
  font-family: $fonts;
  position: relative;
  .search-bar {
    z-index: 49;
    width: 100%;
    height: 8vh;
    background-color: $bgc;
    position: sticky;
    top: 0;
  }
  .setting-option {
    margin-top: 3vh;
    width: 80%;
    margin-left: 10%;
    display: grid;
    justify-items: start;
    row-gap: 1em;
  }
  .pop-up {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    display: grid;
    justify-items: center;
    align-items: center;
    .password {
      width: 60vw;
      height: 10em;
      padding: 1em;
      background-color: #fff;
      filter: $shadow;
      border-radius: 10px;
      display: grid;
      justify-items: center;
      row-gap: 1em;
      input {
        border: 1px solid $fontColorlight;
      }
      button {
        width: fit-content;
        font-size: 0.8rem;
      }
    }
    .language {
      width: 60vw;
      height: 5em;
      padding: 1em;
      background-color: #fff;
      filter: $shadow;
      border-radius: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      align-items: center;
      button {
        width: 80%;
        height: fit-content;
        font-size: 0.8em;
      }
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
  .setting-page {
    .desktop-bar {
      box-sizing: border-box;
      z-index: 50;
      position: fixed;
      height: 100vh;
      width: 25vw;
      background-color: $bgc;
    }
    .search-bar {
      height: 10vh;
      width: 40vw;
      margin-left: 28vw;
    }
    .setting-option {
      margin-top: 3vh;
      width: 50%;
      margin-left: 30vw;
      display: grid;
      justify-items: start;
      row-gap: 1em;
    }
    .pop-up {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: grid;
      justify-items: center;
      align-items: center;
      .password {
        width: 20vw;
      }
      .language {
        width: 20vw;
        height: 5em;
        padding: 1em;
        background-color: #fff;
        filter: $shadow;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        align-items: center;
        button {
          width: 80%;
          height: fit-content;
          font-size: 0.8em;
        }
      }
    }
  }
}
</style>