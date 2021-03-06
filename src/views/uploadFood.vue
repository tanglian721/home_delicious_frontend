<template>
  <div class="upload-page page-set container-xl px-0 position-relative">
    <desktop-bar class="position-fixed" v-if="this.$store.getters.desktop" />
    <div class="row">
      <div class="topbar bg-white py-1 px-4 position-sticky w-100" v-if="this.$store.getters.mobile">
        <img class="back" src="../assets/cancel.png" alt="" @click="back" />
        <!-- <p v-if="foodEdit" @click="uploadFood">publish food</p>
      <p v-else @click="uploadMethod">publish method</p> -->
        <!-- <div id="option"></div> -->
      </div>
      <food-info-upload class="offset-lg-3 col-lg-9 container-fluid"  v-if="foodEdit" @finishFoodUpload="startMethod" />
      <upload-food-method class="offset-lg-3 col-lg-9 container-fluid"  v-else />
    </div>
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
  computed: {
    editStatue() {
      return this.$store.state.editStatue;
    },
  },

  mounted() {
    this.$store.commit("updateEditStatue", false);
  },

  beforeRouteLeave(to, from, next) {
    console.log(this.editStatue);
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
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.back{
  height: 1rem;
}
.upload-page {
    background-color: #fff;
  width: 100vw;
  // .topbar {
  //   position: sticky;
  //   z-index: 50;
  //   top: 0;
  //   width: 100%;
  //   height: 3em;
  //   background-color: #fff;
  //   display: grid;
  //   grid-template-columns: 1fr 8fr 1fr;
  //   align-items: center;
  //   justify-items: center;
  //   img {
  //     height: 1em;
  //   }
  //   p {
  //     justify-self: end;
  //     background-color: $barBgc;
  //     padding: 0.2em 1em;
  //     color: #fff;
  //     border-radius: 1rem;
  //   }
  // }
}
@media only screen and (min-width: 992px) {
  .upload-page {
    background-color: $bgc;
    // margin-top: 0;
    // .desktop-bar {
    //   box-sizing: border-box;
    //   z-index: 50;
    //   position: fixed;
    //   height: 100vh;
    //   width: 25vw;
    //   background-color: $bgc;
    // }
    // .topbar {
    //   // position: sticky;
    //   // top: 0;
    //   width: 55vw;
    //   height: 3em;
    //   margin-left: 25vw;
    //   // background-color: #fff;
    //   // display: grid;
    //   // grid-template-columns: 1fr 8fr 1fr;
    //   // align-items: center;
    //   // justify-items: center;
    //   // img {
    //   //   height: 1em;
    //   // }
    //   // p {
    //   //   justify-self: end;
    //   //   background-color: $barBgc;
    //   //   padding: 0.2em 1em;
    //   //   color: #fff;
    //   //   border-radius: 1rem;
    //   // }
    // }
    // .food-info-upload {
    //   width: 55vw;
    //   margin-left: 25vw;
    // }
  }
}
</style>