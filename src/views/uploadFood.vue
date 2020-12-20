<template>
  <div class="upload-page">
    <desktop-bar v-if="this.$store.getters.desktop" />
    <div class="topbar" v-if="this.$store.getters.mobile">
      <img src="../assets/cancel.png" alt="" @click="back" />
      <!-- <p v-if="foodEdit" @click="uploadFood">publish food</p>
      <p v-else @click="uploadMethod">publish method</p> -->
      <!-- <div id="option"></div> -->
    </div>
    <food-info-upload v-if="foodEdit" @finishFoodUpload="startMethod" />
    <upload-food-method v-else />
  </div>
</template>

<script>
import DesktopBar from "../components/desktopBar.vue";
import FoodInfoUpload from "../components/foodInfoUpload.vue";
import UploadFoodMethod from "../components/uploadFoodMethod.vue";

export default {
  components: { FoodInfoUpload, UploadFoodMethod, DesktopBar },
  data() {
    return {
      foodEdit: true,
      food_id: null,
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    startMethod(data) {
      this.foodEdit = false;
      this.$store.commit("saveEditFoodId", data);
    },
    uploadMethod() {
      this.$store.commit("uploadMethodData");
    },
    uploadFood() {
      this.$store.commit("uploadFoodData");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.upload-page {
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
@media only screen and (min-width: 1280px) {
  .upload-page {
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