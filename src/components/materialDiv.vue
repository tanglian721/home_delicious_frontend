<template>
  <div class="material-div">
    <!-- {{material}} -->
    <div class="round"></div>
    <div class="row-material">{{ ingredient }}</div>
    <div class="amount-div">{{ amount }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ingredient: "",
      amount: "",
    };
  },
  props: {
    material: {
      type: String,
    },
  },
  mounted() {
    this.ingredient = this.material.split("<###**%%###>")[0];
    this.amount = this.material.split("<###**%%###>")[1];
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.material-div {
  width: 90%;
  // margin-left: ;
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 12fr 8fr;
  font-size: 0.9rem;
  .round {
    width: 2vw;
    height: 2vw;
    border-radius: 50%;
    background-color: $redBgc;
  }
  .amount-div{
    margin-left: 2vw;
  }
}
@media only screen and (min-width: 992px) {
  .material-div {
    width: 100%;

    box-sizing: border-box;
    margin-left: 0;
    grid-template-columns: fr 12fr 8fr;
    font-size: 1rem;
    justify-items: start;
    .round {
      width: 1em;
      height: 1em;
      justify-self: center;
    }
  }
}
</style>