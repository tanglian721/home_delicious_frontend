<template>
  <div class="food-page">
    <desktop-bar v-if="this.$store.getters.desktop" />
    <div class="img-area" v-if="food_data.image != undefined">
      <transition
        enter-active-class="animate__animated animate__slideInLeft"
        leave-active-class="animate__animated animate__slideOutRight"
      >
        <img class="BgImage" :src="Bgimage" alt="" />
      </transition>
      <div class="frame">
        <div class="image">
          <div v-for="image in this.image_list" :key="image">
            <img :src="image" alt="" @click="changePre(image)" />
          </div>
        </div>
      </div>
    </div>
    <div class="btn-back" @click="back" v-if="this.$store.getters.mobile">
      <img src="../assets/back.png" alt="" class="back" />
    </div>
    <div class="text-area">
      <food-description :food="food_data" />
      <div class="no-method" v-if="No_method">
        <div class="user" v-if="this.owner">
          <P
            ><span v-if="this.$store.getters.lan"
              >您还没有分享制作方法, <br />
              您想要现在分享吗？</span
            ><span v-else
              >You haven't shared your recipe yet， Do you want to share now
              ?</span
            ></P
          >
          <button @click="AddMethod">
            <span v-if="this.$store.getters.lan">分享</span
            ><span v-else>Share</span>
          </button>
        </div>
        <div class="other" v-else>
          <P
            ><span v-if="this.$store.getters.lan"
              >作者还没有分享他的制作方法</span
            ><span v-else>Author hasn't shared your recipe yet</span></P
          >
        </div>
      </div>
      <div v-else>
        <food-ingredient :methods="method" />
        <food-process :methods="method" />
      </div>
      <rate-review
        v-if="this.$store.getters.login"
        :food="food_data"
        @updateGrade="updateGrade"
      />
    </div>
    <bottom-bar v-if="this.$store.getters.mobile" />
  </div>
</template>

<script>
import foodDescription from "../components/foodDescription.vue";
import FoodIngredient from "../components/foodIngredient.vue";
import FoodProcess from "../components/foodProcess.vue";
import axios from "axios";
import cookies from "vue-cookies";
import BottomBar from "../components/bottomBar.vue";
import RateReview from "../components/rateReview.vue";
import DesktopBar from "../components/desktopBar.vue";

export default {
  components: {
    foodDescription,
    FoodIngredient,
    FoodProcess,
    BottomBar,
    RateReview,
    DesktopBar,
  },
  data() {
    return {
      food_id: this.$router.history.current.params.pathMatch,
      food_data: {},
      method: {},
      Bgimage: "",
      No_method: false,
      owner: false,
    };
  },
  props: {
    food: {
      type: Object,
    },
    methods: {
      type: Object,
    },
  },
  methods: {
    back() {
      window.history.back();
    },
    getFood() {
      axios
        .request({
          url: "https://homedelicious.ml/api/foods",
          method: "get",
          params: {
            food_id: this.food_id,
          },
        })
        .then((response) => {
          this.food_data = response.data;
          this.$store.commit("updataFood", response.data);
          this.Bgimage = this.image_list[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMethods() {
      axios
        .request({
          url: "https://homedelicious.ml/api/methods",
          method: "get",
          params: {
            food_id: this.food_id,
          },
        })
        .then((response) => {
          this.$store.commit("updateMethod", response.data);
          console.log(response.data);
          if (response.data.ingredient == "" && response.data.process == "") {
            this.No_method = true;
            console.log(this.No_method);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateGrade(data) {
      this.$set(this.food_data, "grade", data);
      console.log(this.food_data);
    },
    changePre(image) {
      this.Bgimage = image;
    },
    AddMethod() {
      this.$store.commit("saveEditFoodId", this.food_data.food_id);
      this.$store.commit("updateIfeditFood", false);
      this.$router.push("/edit");
    },
  },
  watch: {
    food_data(newValue) {
      if (cookies.get("user").user_id == newValue.user_id) {
        this.owner = true;
      }
    },
  },
  computed: {
    image_list() {
      return this.$store.getters.foodImage;
    },
  },
  mounted() {
    this.$store.commit("updateMethod", "");
    this.getMethods();
    this.getFood();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.food-page {
  width: 100vw;
  min-height: 100vh;
  background-color: $bgc;
  position: relative;
  background-color: $bgc;
  .img-area {
    position: relative;
    width: 100vw;
    height: 150vw;
    overflow: hidden;
    position: fixed;
    .BgImage {
      z-index: 1;
      width: 100vw;
      height: 110vw;
      object-fit: cover;
      top: 0;
    }
    .frame {
      position: absolute;
      top: 100vw;
      width: 100%;
      display: grid;
      justify-items: center;
      padding: 1vw 0 5vw 0;
      background-color: rgb(15, 15, 15);
      .image {
        height: 20vw;
        display: flex;
        width: 100%;
        overflow-x: scroll;
        justify-content: center;
        > div {
          display: inline-block;
          height: 20vw;
          margin-right: 1vw;
          > img {
            height: 100%;
            width: 20vw;
            object-fit: cover;
          }
        }
      }
    }
  }
  .btn-back {
    z-index: 50;
    background-color: $bgc;
    position: fixed;
    top: 5vw;
    left: 5vw;
    width: 15vw;
    border-radius: 5px;
    img {
      width: 80%;
      margin-left: 10%;
    }
    filter: $shadow;
  }
  .bottom-bar {
    z-index: 50;
    width: 100%;
    height: 8vh;
    background-color: #fff;
    position: fixed;
    bottom: 0;
  }
  .text-area {
    box-sizing: border-box;
    padding: 8vw 8vw 20vw 8vw;
    z-index: 10;
    min-height: 50vh;
    width: 100vw;
    background-color: #fff;
    position: relative;
    top: 120vw;
    border-radius: 30px 30px 0 0;
    filter: $shadow;
    .no-method {
      width: 80%;
      margin-left: 10%;
      margin-top: 5em;
      font-family: $fonts;
      > div {
        display: grid;
        justify-items: center;
        row-gap: 2em;
        width: 100%;
        p {
          text-align: center;
          line-height: 2em;
        }
        button {
          background-color: $fontColorlight;
          color: #fff;
          border-radius: 0.5rem;
          padding: 5px;
          text-transform: uppercase;
          font-family: $fonts;
          filter: $shadow;
          // border: 1px solid $fontColordark;
        }
      }
    }
  }
}
@media only screen and (min-width: 992px) {
  .food-page {
    // width: 100vw;
    // min-height: 100vh;
    // background-color: $bgc;
    // position: relative;
    .desktop-bar {
      box-sizing: border-box;
      z-index: 50;
      position: fixed;
      height: 100vh;
      width: 25vw;
      background-color: $bgc;
    }
    .img-area {
      width: 30vw;
      left: 30vw;
      height: 60vh;
      width: 30vw;
      position: relative;
      z-index: 15;
      overflow: hidden;
      .BgImage {
        z-index: 15;
        width: 100%;
        height: 50vh;
        top: 0;
      }
      .frame {
        top: 48vh;
        height: 14vh;
        padding: 0;
        // overflow: hidden;
        .image {
          height: 14vh;
          overflow-y: hidden;
          > div {
            height: 13vh;
            margin-right: 5px;
            > img {
              height: 100%;
              width: 13vh;
            }
          }
        }
      }
    }

    .text-area {
      padding: 0;
      z-index: 1;
      min-height: 100vh;
      background-color: $bgc;
      top: -60vh;
      border-radius: 0;
      width: 55vw;
      margin-left: 30vw;
      filter: none;
      .no-method {
        P {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>