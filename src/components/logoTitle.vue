<template>
  <div class="logo-title">
    <div class="row">
      <div class="title col-8 mx-1 ps-5 pt-3 row col-lg-12 ps-lg-0 ">
        <div class="col-2 p-0 ms-4 me-0 ms-lg-0 col-lg-12">
          <img src="../assets/logo4-C2.png" alt="" class="logo col-8 p-0 offset-lg-5 col-lg-2" />
        </div>
        <div class="col-8 p-0 align-bottom fs-12rem col-lg-12 text-lg-center py-lg-2">Home Delicious</div>
        <div class="bottom p-0 col-12 ms-4 ms-lg-0 text-lg-center">
          <span class="left pe-3">Trending</span><span class="right">Food</span>
        </div>
      </div>
      <div class="avatar offset-1 col-2 p-0 px-0 offset-lg-5 col-lg-2 my-lg-5">
        <img
          class="w-100 rounded-circle box-shadow"
          v-if="this.$store.getters.login"
          :src="avatar"
          alt=""
          @click="toUserpage"
        />
        <img
          class="w-100 rounded-circle box-shadow"
          v-else
          @click="toLoginPage"
          src="../assets/avatar.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  data() {
    return {};
  },
  methods: {
    toUserpage() {
      this.$router.push("/user/" + cookies.get("user").user_id);
    },
    toLoginPage() {
      this.$router.push("/login");
    },
  },
  computed: {
    avatar() {
      return cookies.get("user").icon;
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
.logo {
  object-fit: contain;
}
.bottom {
  font-family: $fonts;
  font-size: 1.1rem;
  color: $fontColorlight;
  .left {
    color: black;
  }
}
// .logo-title {
//   display: grid;
//   grid-template-columns: 3fr 1fr;
//   align-items: center;
//   justify-items: center;
//   .title {
//     justify-self: start;
//     .top {
//       img {
//         height: 3vh;
//         position: relative;
//         top: 0.5vh;
//         margin-right: 2vw;
//       }
//       span {
//         font-family: $titlefonts;
//         font-size: 1.2rem;
//         color: $fontColorlight;
//       }
//     }
//   }
//   .avatar {
//     justify-self: end;
//     img {
//       height: 3em;
//       border-radius: 50%;
//     }
//   }
// }
// @media only screen and (min-width: 992px) {
//   .logo-title {
//     grid-template-columns: 1fr;
//     margin-left: 10vw;
//     margin-top: 10vh;
//     .title {
//       justify-self: center;
//       .top {
//         img {
//           height: 2.5vw;
//           margin-right: 1vw;
//         }
//         span {
//           font-size: 1.5rem;
//         }
//       }
//       .bottom {
//         text-align: center;
//         margin-top: 1vh;
//         font-size: 1.3rem;
//         .left {
//           margin-right: 1vw;
//         }
//       }
//     }
//     .avatar {
//       margin-top: 3vh;
//       justify-self: center;
//       img {
//         height: 5vw;
//         border-radius: 50%;
//       }
//     }
//   }
// }
</style>