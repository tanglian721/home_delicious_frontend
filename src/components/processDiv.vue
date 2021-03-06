<template>
  <div class="process-div">
    <div class="number">
      <span v-if="this.$store.getters.lan">第 {{ index }} 步</span
      ><span v-else>STEP: {{ index }}</span>
    </div>
    <div class="step">
      <img
        class="image"
        :src="image"
        v-if="this.$store.getters.desktop && image != ''"
      />
      <div class="single-process">{{ process }}</div>
      <img class="image" :src="image" v-if="this.$store.getters.mobile" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      process: "",
      image: "",
    };
  },
  props: {
    step: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  mounted() {
    this.process = this.step.split("<###**%%###>")[0];
    this.image = this.step.split("<###**%%###>")[1];
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.process-div {
  display: grid;
  justify-items: center;
  row-gap: 2vh;
  .number {
    font-size: 1.2rem;
    font-weight: bolder;
  }
  .single-process {
    width: 100%;
  }
  img {
    width: 80%;
    margin-left: 10%;
    margin-top: 2vh;
  }
}
@media only screen and (min-width: 992px) {
  .process-div {
    display: grid;
    justify-items: center;
    row-gap: 2vh;
    .number {
      font-size: 1.2rem;
    }
    .step {
      width: 90%;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 10px;
      display: flex;
      max-height: 12em;
      position: relative;
      filter: $shadow;
      .single-process {
        align-items: center;
        width: 55vw;
        box-sizing: border-box;
        padding: 1em 2em;
        overflow: auto;
      }
      img {
        position: relative;
        margin-left: 0;
        margin-top: 0;
        height: 100%;
        width: 30%;
        object-fit: cover;
        border-radius: 10px 0 0 10px;
      }
    }
  }
}
</style>