<template>
  <div class="grade-Display">
    <img src="../assets/5-STAR-w.png" alt="" />
    <div class="grade" :style="{ width: grade * 19 + '%' }"></div>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  props: {
    grade: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.grade-Display {
  position: relative;
  img {
    position: relative;
    z-index: 50;
    width: 100%;
  }
  .grade {
    position: absolute;
    height: 70%;
    z-index: 49;
    top: 0;
    margin-top: 5%;
    margin-left: 2.5%;
    background-color: gold;
  }
  .bg {
    position: absolute;
    z-index: 48;
    top: 0;
    height: 80%;
    margin-top: 5%;
    margin-left: 2.5%;
    width: 95%;
    background-color: $barBgc;
  }
}
</style>