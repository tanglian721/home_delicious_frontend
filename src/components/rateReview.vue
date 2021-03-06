<template>
  <div class="rate-review">
    <div class="spliter"></div>
    <h2>Rate the food</h2>
    <img :src="icon" alt="">
    <rate-grade :food="food" @updateGrade="updateGrade"/>
  </div>
</template>

<script>
import rateGrade from "./rateGrade.vue";
import cookies from "vue-cookies"
export default {
  components: { rateGrade },
  data() {
    return {
      icon: cookies.get('user').icon
    }
  },
  props: {
    food: {
      type: Object,
    },
  },
  methods: {
      updateGrade(data) {
          console.log(data)
          this.$emit("updateGrade", data)
      }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.rate-review {
  text-align: center;
  margin-top: 5vh;
  .spliter {
    height: 1px;
    background-color: $barBgc;
    width: 100vw;
    margin-left: -8vw;
  }
  h2 {
    margin: 4vh;
  }
  img{
      width: 30vw;
      height: 30vw;
      border-radius: 50%;
  }
}
@media only screen and (min-width: 992px) {
.rate-review {
  text-align: center;
  margin-top: 5vh;
  .spliter {
    height: 1px;
    background-color: $barBgc;
    width: 55vw;
    margin-left: 0;
  }
  h2 {
    margin: 4vh;
  }
  img{
      width: 5em;
      height: 5em;
      border-radius: 50%;
      margin-bottom: 2em;
  }
}
}
</style>