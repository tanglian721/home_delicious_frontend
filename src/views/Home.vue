<template>
  <div class="home">
    <logo-title />
    <search-bar />
    <trend-food-list />
    <category-bar />
    <food-card-list />
    <bottom-bar />
  </div>
</template>

<script>
import BottomBar from '../components/bottomBar.vue';
import CategoryBar from '../components/categoryBar.vue';
import FoodCardList from '../components/foodCardList.vue';
import LogoTitle from '../components/logoTitle.vue';
import SearchBar from '../components/searchBar.vue';
import TrendFoodList from '../components/trendFoodList.vue';
export default {
  name: "Home",
  components: {
    BottomBar,
    LogoTitle,
    SearchBar,
    TrendFoodList,
    CategoryBar,
    FoodCardList,
  }
};

</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.home{
  width: 100vw;
  height: 100vh;
  background-color:$bgc;
  position: relative;
  .logo-title{
    width: 70%;
    height: 10vh;
    margin-left: 15%;
  }
  .search-bar{
    width: 100%;
    height: 8vh;
    background-color: rgb(104, 71, 255);
    position: sticky;
    top: 0;
  }
  .trend-food-list{
    width: 100%;
    height: 40vh;
    background-color: rgb(138, 58, 58);
  }
  .category-bar{
    width: 100%;
    height: 10vh;
    background-color: #fff;
    position: sticky;
    top: 8vh;
  }
  .food-card-list{
    width: 100%;
    height: 200vh;
    background-color: rgb(107, 138, 58);
  }
  .bottom-bar{
    z-index: 50;
    width: 100%;
    height: 10vh;
    background-color: #fff;
    position: fixed;
    bottom:0
  }
}
</style>
