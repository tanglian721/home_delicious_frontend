<template>
  <div class="desktop-bar">
    <logo-title />
    <div class="button">
      <button :style="homeclass" @click="home"><span v-if="this.$store.getters.lan" >主页</span><span v-else >home</span></button>
      <button :style="user" @click="toUserpage"><span v-if="this.$store.getters.lan" >用户</span><span v-else >user</span></button>
      <button :style="collection" @click="toCollection"><span v-if="this.$store.getters.lan" >收藏</span><span v-else >favorate</span></button>
      <button :style="addnew" @click="addNew"><span v-if="this.$store.getters.lan" >分享食物</span><span v-else >Share Food</span></button>
      <button :style="search" @click="toSearchPage"><span v-if="this.$store.getters.lan" >搜索</span><span v-else >search</span></button>
      <button @click="logout" class="logout"><span v-if="this.$store.getters.lan" >注销</span><span v-else >logout</span></button>
    </div>
  </div>
</template>

<script>
import logoTitle from "./logoTitle.vue";
import cookies from "vue-cookies";
export default {
  components: { logoTitle },
  data() {
    return {
      homeclass: {},
      user: {},
      collection: {},
      addnew: {},
      search: {},
      unselect: {
        backgroundColor: "#F3F6F4",
        color: "#3D5144",
        filter: "None",
      },
      select: {
        backgroundColor: "#D8E2DC",
        color: "#fff",
        filter: "drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))",
      },
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    toCollection() {
      if (
        this.$store.getters.login == true &&
        this.$router.history.current.path.includes("/user")
      ) {
        console.log("1");
        this.$store.commit("userpageChoice", "collection");
      } else if (this.$store.getters.login == true) {
        this.$store.commit("userpageChoice", "collection");
        this.$router.push("/user/" + cookies.get("user").user_id);
      } else {
        this.$router.push("/login");
      }
      this.collection = this.select;
      this.user = this.unselect;
    },
    toSearchPage() {
      console.log(this.$router.history.current);
      if (this.$router.history.current.path == "/search") {
        this.$store.state.searchShow = false;
        this.$store.commit("userpageChoice", "production");
      } else {
        this.$router.push("/search");
      }
    },
    toUserpage() {
      if (
        this.$store.getters.login == true &&
        this.$router.history.current.path.includes("/user")
      ) {
        this.$store.commit("userpageChoice", "production");
      } else if (this.$store.getters.login == true) {
        this.$store.commit("userpageChoice", "production");
        this.$router.push("/user/" + cookies.get("user").user_id);
      } else {
        this.$router.push("/login");
      }
      this.user = this.select;
      this.collection = this.unselect;
    },
    addNew() {
      this.$router.push("/upload");
    },
    logout() {
      cookies.remove("user");
      cookies.remove("login");
      this.$router.push("/login");
    },
  },
  computed: {
    toggle() {
      return this.$store.state.userpageToggle;
    },
  },
  mounted() {
    if (this.$router.history.current.path == "/") {
      this.homeclass = this.select;
      console.log(this.homeclass);
    } else if (
      this.$router.history.current.path.includes("/user") &&
      this.toggle == "production"
    ) {
      this.user = this.select;
    } else if (
      this.$router.history.current.path.includes("/user") &&
      this.toggle == "collection"
    ) {
      this.collection = this.select;
    } else if (
      this.$router.history.current.path.includes("/search")
    ) {
      this.search = this.select;
    }else if (
      this.$router.history.current.path.includes("/upload")
    ) {
      this.addnew= this.select;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.desktop-bar {
  font-family: $fonts;
  color: $fontColordark;
  .button {
    width: 15vw;
    margin-left: 10vw;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    justify-content: center;
    margin-top: 5vh;
    row-gap: 2vh;
    button {
      text-transform: uppercase;
      padding: 0.2em 0.5em;
      border-radius: 1em;
      &:hover {
        background-color: $barBgc;
        color: #fff;
        filter: $shadow;
      }
    }
    .logout {
      position: relative;
      top: 20vh;
    }
  }
}
</style>