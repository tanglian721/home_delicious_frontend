<template>
  <div class="page-set container-xl position-relative">
    <div class="userPage desktop" v-if="this.$store.getters.desktop">
      <desktop-bar class="position-fixed" />
      <div class="col-12 offset-lg-3 col-lg-9 container-fluid">
        <div class="row">
          <search-bar class="position-sticky bg-bgc" />
          <div class="user-info w-75 bg-white container p-4 position-relative" v-if="toggle == 'production'">
            <div class="px-4 row">
            <p class="name col-12 fs-12rem text fw-bold">{{ user.username }}</p>
            <p>
              <span v-if="this.$store.getters.lan">所在地 </span
              ><span v-else>location </span>: {{ user.location }}
            </p>
            <p>
              <span v-if="this.$store.getters.lan">生日</span
              ><span v-else>birthday </span>: {{ user.birthday }}
            </p>
            <p>
              <span v-if="this.$store.getters.lan">加入时间 </span
              ><span v-else>Join date </span>: {{ user.join_date }}
            </p>
            <p>
              <span v-if="this.$store.getters.lan">简介 </span
              ><span v-else>bio </span>: {{ user.bio }}
            </p>
            </div>
            <img class="user-info-img position-absolute rounded-circle" :src="user.icon" alt="" />
            <div class="option" v-if="ifOwner">
              <img
                class="option-icon position-absolute "
                src="../assets/settings.png"
                alt=""
                @click="toSettingPage"
              />
            </div>
          </div>
          <div v-if="toggle == 'production'" class="user-production card-area  w-75 container p-4 position-relative">
            <h2>Production:</h2>
            <food-card-long
              class="mx-auto my-5"
              v-for="food in productions"
              :key="food.food_id"
              :food="food"
            />
          </div>
          <div v-if="toggle == 'collection'" class="user-collection container w-75 card-area px-5 m-5">
            <h2>Collection:</h2>
            <food-card-long
              class="mx-auto my-5"
              v-for="food in collectionFoods"
              :key="food.food_id"
              :food="food"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="userPage mobile" v-if="this.$store.getters.mobile">
      <div class="top">
        <div class="row">
          <search-bar class="col-10 p-0 m-0" />
          <div v-if="ShowBtn" @click="addNew" class="addNew col-2 me-3">
            <img src="../assets/add-file.png" alt="" />
          </div>
        </div>
      </div>
      <div class="user-info container p-4 position-relative">
        <div class="px-4 row">
          <p class="name col-12 fs-12rem text fw-bold">{{ user.username }}</p>
          <p>
            <span v-if="this.$store.getters.lan">所在地</span
            ><span v-else>location</span>: {{ user.location }}
          </p>
          <p>
            <span v-if="this.$store.getters.lan">生日</span
            ><span v-else>birthday</span>: {{ user.birthday }}
          </p>
          <p>
            <span v-if="this.$store.getters.lan">加入时间</span
            ><span v-else>Join date</span>: {{ user.join_date }}
          </p>
          <p>
            <span v-if="this.$store.getters.lan">简介</span
            ><span v-else>bio</span>: {{ user.bio }}
          </p>
          <img
            class="user-info-img position-absolute rounded-circle"
            :src="user.icon"
            alt=""
            v-if="this.$store.getters.mobile"
          />
          <div class="option position-absolute" v-if="ifOwner">
            <img
              class="option-icon w-100"
              src="../assets/settings.png"
              alt=""
              @click="toSettingPage"
            />
          </div>
        </div>
      </div>
      <div class="toggle-button">
        <div @click="shiftProduction" class="production">
          <p>production</p>
          <div v-if="toggle == 'production'" class="line"></div>
        </div>
        <div @click="shiftcollection" class="collection">
          <p>collection</p>
          <div v-if="toggle == 'collection'" class="line"></div>
        </div>
      </div>
      <div
        v-if="toggle == 'production'"
        class="px-4 user-production card-area pb-5 mb-5"
      >
        <food-card
          class="card mx-auto my-5"
          v-for="food in productions"
          :key="food.food_id"
          :food="food"
        />
      </div>
      <div
        v-if="toggle == 'collection'"
        class="px-4 user-collection card-area pb-5 mb-5"
      >
        <food-card
          class="card mx-auto my-5"
          v-for="food in collectionFoods"
          :key="food.food_id"
          :food="food"
        />
      </div>
      <bottom-bar />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import searchBar from "../components/searchBar.vue";
import BottomBar from "../components/bottomBar.vue";
import FoodCard from "../components/foodCard.vue";
import DesktopBar from "../components/desktopBar.vue";
import FoodCardLong from "../components/foodCardLong.vue";
export default {
  components: { searchBar, BottomBar, FoodCard, DesktopBar, FoodCardLong },
  data() {
    return {
      owener: cookies.get("user"),
      user: {},
      ifOwner: false,
      productions: [],
      ShowBtn: false,
    };
  },
  props: {
    food: {
      type: Object,
    },
  },
  methods: {
    addNew() {
      this.$router.push("/upload");
    },
    toSettingPage() {
      this.$router.push("/setting");
    },
    getUsers() {
      axios
        .request({
          url: "https://homedelicious.ml/api/users",
          method: "get",
          params: {
            user_id: this.$router.history.current.params.pathMatch,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
          if (this.owener.user_id == this.user.user_id) {
            this.ifOwner = true;
          }
          console.log(this.ifOwner);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProduction() {
      axios
        .request({
          url: "https://homedelicious.ml/api/foods",
          method: "get",
          params: {
            user_id: this.$router.history.current.params.pathMatch,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.productions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    shiftProduction() {
      this.$store.commit("userpageChoice", "production");
    },
    shiftcollection() {
      this.$store.commit("userpageChoice", "collection");
    },
    checkOwner() {
      if (this.$store.getters.login) {
        if (
          cookies.get("user").user_id ==
            this.$router.history.current.params.pathMatch &&
          this.$store.getters.mobile
        ) {
          this.ShowBtn = true;
        }
      }
    },
  },
  computed: {
    collectionFoods() {
      return this.$store.state.collectionList;
    },
    toggle() {
      return this.$store.state.userpageToggle;
    },
    SearchContent() {
      return this.$store.state.searchShow;
    },
    searchFoodList() {
      return this.$store.state.searchFoodList;
    },
  },
  mounted() {
    this.$store.state.searchShow = false;
    this.getUsers();
    this.getProduction();
    this.checkOwner();
    if (this.collectionFoods.length == 0) {
      axios
        .request({
          url: "https://homedelicious.ml/api/collection",
          method: "get",
          params: {
            user_id: this.$router.history.current.params.pathMatch,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.commit("saveCollectionList", response.data);
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
.userPage {
  .mobile {
    font-family: $fonts;
    width: 100vw;
    height: 100vh;
    background-color: $bgc;
    position: relative;
    display: grid;
    // grid-template-rows: 10% 24% 5% 53%;
    overflow: hidden;
    // .top {
    //   box-sizing: border-box;
    //   position: relative;
    //   display: grid;
    //   grid-template-columns: 4fr 1fr;
    //   justify-items: center;
    //   align-items: center;
    //   .search-bar {
    //     width: 100%;
    //   }
    .addNew {
      margin-top: 22px;
      justify-self: start;
      width: 12vw;
      height: 12vw;
      background-color: $barBgc;
      border-radius: 50%;
      display: grid;
      justify-items: center;
      align-items: center;
      filter: $shadow;
      img {
        width: 6vw;
      }
      // }
    }
    .user-info-img {
      right: 10vw;
      width: 30%;
    }
    .option {
      width: 40px;
      right: 5vw;
    }
    // .user-info {
    //   position: relative;
    //   color: $fontColordark;
    //   box-sizing: border-box;
    //   padding: 3em;
    //   display: grid;
    //   row-gap: 0.3em;
    //   font-size: 0.8rem;
    //   .name {
    //     font-size: 2rem;
    //     font-weight: bold;
    //   }
    //   > img {
    //     width: 25vw;
    //     height: 25vw;
    //     border-radius: 50%;
    //     filter: $shadow;
    //     object-fit: cover;
    //     position: absolute;
    //     right: 22vw;
    //     top: 2em;
    //   }
    //   .option {
    //     position: absolute;
    //     width: 4vw;
    //     height: 4vw;
    //     right: 10vw;
    //     top: 3em;
    //     .option-icon {
    //       width: 1.5em;
    //     }
    //     .button {
    //       position: absolute;
    //       right: -5vw;
    //       top: 3em;
    //       width: 20vw;
    //       display: grid;
    //       background-color: $fontColordark;
    //       color: #fff;
    //       filter: $shadow;
    //       button {
    //         padding: 5px;
    //         border-bottom: 1px solid #fff;
    //         &:hover {
    //           color: $fontColordark;
    //           background-color: #fff;
    //         }
    //       }
    //     }
    //   }
    // }
    .toggle-button {
      width: 60%;
      margin-left: 20%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      p {
        text-transform: uppercase;
        filter: $shadow;
        font-weight: 500;
      }
      .line {
        margin-top: 5px;
        border-radius: 2px;
        height: 5px;
        width: 80%;
        background-color: $redBgc;
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
    .card-area {
      overflow-y: scroll;
    }
    // .card-area {
    //   margin-top: 2vh;
    //   display: grid;
    //   row-gap: 5vh;
    //   overflow-y: scroll;
    //   align-content: start;
    //   .card {
    //     margin-left: 10%;
    //   }
    // }
  }
}
@media only screen and (min-width: 992px) {
  .user-info{
    border-radius: 20px;
  }
  .user-info-img{
    width: 8vw;
    right: 3vw;
    top: 2vw;
  }
  .option-icon{
    width: 1vw;
    left: 12vw;
    top: 2vw;
  }
}
//   html {
//     background-color: $bgc;
//   }
//   .userPage {
//     .desktop {
//       font-family: $fonts;
//       width: 100vw;
//       min-height: 100vh;
//       background-color: $bgc;
//       position: relative;
//       // display: grid;
//       // grid-template-rows: 1fr;
//       overflow: hidden;
//       padding-bottom: 5em;
//       .desktop-bar {
//         box-sizing: border-box;
//         z-index: 50;
//         position: fixed;
//         height: 100vh;
//         width: 25vw;
//         background-color: $bgc;
//       }
//       // .search-bar {
//       //   z-index: 20;
//       //   margin-left: 28vw;
//       //   height: 6em;
//       //   position: fixed;
//       //   background-color: $bgc;
//       // }
//       .user-info {
//         position: fixed;
//         top: 6em;
//         background-color: #fff;
//         width: 32vw;
//         margin-left: 32vw;
//         position: relative;
//         padding: 2em;
//         border-radius: 1em;
//         display: grid;
//         align-content: start;
//         row-gap: 0.3em;
//         font-size: 1rem;
//         .name {
//           font-size: 2rem;
//           font-weight: bold;
//         }
//         > img {
//           width: 5em;
//           height: 5em;
//           border-radius: 50%;
//           filter: $shadow;
//           object-fit: cover;
//           position: absolute;
//           right: 8vw;
//           top: 2em;
//         }
//         .option {
//           position: absolute;
//           width: 4vw;
//           height: 4vw;
//           right: 0vw;
//           top: 2.5em;
//           filter: $shadow;
//           .option-icon {
//             width: 1em;
//           }
//           .button {
//             position: absolute;
//             right: 0;
//             width: fit-content;
//             display: grid;
//             background-color: $fontColordark;
//             color: #fff;
//             filter: $shadow;
//             button {
//               padding: 5px;
//               border-bottom: 1px solid #fff;
//               &:hover {
//                 color: $fontColordark;
//                 background-color: #fff;
//               }
//             }
//           }
//         }
//       }
//       .card-area {
//         margin-top: 10em;
//         display: grid;
//         row-gap: 5vh;
//         min-width: 50vh;
//         // overflow-y: scroll;
//         margin-left: 30vw;
//         .card {
//           margin-left: 5%;
//         }
//         h2 {
//           color: $fontColordark;
//         }
//       }
//     }
//   }
// }
</style>