<template>
  <div class="search-page page-set container-xl position-relative">
    <div class="row" v-if="this.$store.getters.desktop">
      <desktop-bar class="position-fixed" />
      <div class="col-12 offset-lg-3 col-lg-9 container-fluid">
        <div class="row">
          <search-bar class="position-sticky bg-bgc" />
          <div class="col-8 searchcontent">
            <food-card-long
              class="mx-auto my-5"
              v-for="food in searchFoodList"
              :key="food.food_id"
              :food="food"
            />
          </div>
          <div class="offset-1 col-3 tags p-0">
            <cate-locatiaon-part />
            <style-part />
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.$store.getters.mobile">
      <search-bar />
      <div v-if="SearchContent" class="bottom-area searchcontent">
        <food-card
          v-for="food in searchFoodList"
          :key="food.food_id"
          :food="food"
        />
      </div>
      <div v-else class="bottom-area tags mx-auto text-center">
        <cate-locatiaon-part class="mb-5" />
        <style-part />
      </div>
    </div>
    <bottom-bar v-if="this.$store.getters.mobile" class="bottom-bar " />
  </div>
</template>

<script>
import BottomBar from "../components/bottomBar.vue";
import CateLocatiaonPart from "../components/Cate&locatiaonPart.vue";
import DesktopBar from "../components/desktopBar.vue";
import FoodCardLong from "../components/foodCardLong.vue";
import FoodCard from "../components/foodCard.vue";
import searchBar from "../components/searchBar.vue";
import StylePart from "../components/stylePart.vue";
export default {
  components: {
    searchBar,
    CateLocatiaonPart,
    StylePart,
    FoodCardLong,
    FoodCard,
    BottomBar,
    DesktopBar,
  },
  props: {
    food: {
      type: Object,
    },
  },
  computed: {
    SearchContent() {
      return this.$store.state.searchShow;
    },
    searchFoodList() {
      return this.$store.state.searchFoodList;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.bottom-bar {
  z-index: 50;
  width: 100%;
  height: 8vh;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.search-page {
  // width: 100vw;
  // height: 100vh;
  // background-color: $bgc;
  // position: relative;
  // font-family: $fonts;
  // color: $fontColordark;
  // display: grid;
  // grid-template-rows: 7% 82%;
  // position: relative;
  // overflow: hidden;
  // .search-bar {
  //   height: 10vh;
  // }
  // .bottom-area {
  //   width: 80%;
  //   margin-left: 10%;
  //   margin-top: 5vh;
  //   height: 60vh;
  //   display: grid;
  //   grid-template-rows: 1fr 1fr;
  // }
  // .bottom-bar {
  //   z-index: 50;
  //   width: 100%;
  //   height: 8vh;
  //   background-color: #fff;
  //   position: fixed;
  //   bottom: 0;
  // }
  // .searchcontent {
  //   width: 100%;
  //   height: 80vh;
  //   overflow-y: scroll;
  //   .food-card {
  //     margin-bottom: 5vh;
  //   }
  // }
}
@media only screen and (min-width: 992px) {
  //   .search-page {
  //     width: 100vw;
  //     height: 100vh;
  //     background-color: $bgc;
  //     position: relative;
  //     font-family: $fonts;
  //     color: $fontColordark;
  //     display: grid;
  //     grid-template-rows: 1fr;
  //     position: relative;
  //     overflow: hidden;
  //     .desktop-bar {
  //       box-sizing: border-box;
  //       z-index: 50;
  //       position: fixed;
  //       height: 100vh;
  //       width: 25vw;
  //       background-color: $bgc;
  //     }
  //     .search-bar {
  //       height: 10vh;
  //       width:40vw;
  //       margin-left: 28vw;
  //     }
  //     .searchcontent {
  //       margin-left: 28vw;
  //       width: 45vw;
  //       height: 90vh;
  //       overflow-y: scroll;
  //       display: grid;
  //       justify-items: center;
  //       align-content: start;
  //       .food-card-long {
  //         margin-left: -5vw;
  //         margin-bottom: 5vh;
  //       }
  //     }
  //     .tags{
  //       position: absolute;
  //       top: 10vh;
  //       left: 70vw;
  //       width: 15vw;
  //       height: 90vh;
  //       background-color: $bgc;
  //       padding:2vh 0 0 2vw;
  //     }
  //   }
}
</style>