<template>
  <div class="edit-food">
    <desktop-bar v-if="this.$store.getters.desktop" />
    <div class="topbar" v-if="this.$store.getters.mobile">
      <img src="../assets/cancel.png" @click="back" alt="" />
      <!-- <p v-if="foodEdit" @click="uploadFood">publish food</p>
      <p v-else @click="uploadMethod">publish method</p>
      <div id="option"></div> -->
    </div>
    <food-info-update
      v-if="foodEdit"
      :editFood="food_data"
      @finishFoodUpload="startMethod"
    />
    <update-food-method v-else :editMethod="method_data" />
  </div>
</template>

<script>
import DesktopBar from "../components/desktopBar.vue";
import FoodInfoUpdate from "../components/foodInfoUpdate.vue";
import UpdateFoodMethod from "../components/updateFoodMethod.vue";
import axios from "axios";

export default {
  components: { FoodInfoUpdate, UpdateFoodMethod, DesktopBar },
  data() {
    return {
      food_data: null,
      method_data: null,
      finish: true,
    };
  },
  props: {
    editFood: {
      type: Object,
    },
    editMethod: {
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
          console.log(response.data);
          this.food_data = response.data;
          console.log(this.food_data);
          this.$store.commit("updataFood", response.data);
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
          console.log(response.data);
          this.method_data = response.data;
          this.$store.commit("updateMethod", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    startMethod() {
      this.$store.commit("updateIfeditFood", false);
      this.getMethods();
    },
    uploadMethod() {
      this.$store.commit("uploadMethodData");
    },
    uploadFood() {
      this.$store.commit("uploadFoodData");
    },
  },
  computed: {
    food_id() {
      return this.$store.state.edit_food_id;
    },
    foodEdit() {
      return this.$store.getters.editFood;
    },
    editStatue() {
      return this.$store.state.editStatue
    }
  },
  mounted() {
    // console.log(this.food_id);
    this.$store.commit("updateEditStatue",false)
    this.getFood();
    this.getMethods();
  },
  beforeRouteLeave(to, from, next) {
    console.log(this.editStatue)
    if (this.editStatue == false) {
      const answer = window.confirm(
        "You have not finish your uploading.  Do you make sure to leave this page?"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next()
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.edit-food {
  //   background-color: $bgc;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  .topbar {
    position: sticky;
    z-index: 50;
    top: 0;
    width: 100%;
    height: 3em;
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr 8fr 1fr;
    align-items: center;
    justify-items: center;
    img {
      height: 1em;
    }
    p {
      justify-self: end;
      background-color: $barBgc;
      padding: 0.2em 1em;
      color: #fff;
      border-radius: 1rem;
    }
  }
}
@media only screen and (min-width: 992px) {
  .edit-food {
    background-color: $bgc;
    margin-top: 0;
    .desktop-bar {
      box-sizing: border-box;
      z-index: 50;
      position: fixed;
      height: 100vh;
      width: 25vw;
      background-color: $bgc;
    }
    .topbar {
      // position: sticky;
      // top: 0;
      width: 55vw;
      height: 3em;
      margin-left: 25vw;
      // background-color: #fff;
      // display: grid;
      // grid-template-columns: 1fr 8fr 1fr;
      // align-items: center;
      // justify-items: center;
      // img {
      //   height: 1em;
      // }
      // p {
      //   justify-self: end;
      //   background-color: $barBgc;
      //   padding: 0.2em 1em;
      //   color: #fff;
      //   border-radius: 1rem;
      // }
    }
    .food-info-upload {
      width: 55vw;
      margin-left: 25vw;
    }
  }
}
</style>