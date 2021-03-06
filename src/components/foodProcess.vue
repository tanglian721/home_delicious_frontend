<template>
  <div class="food-process">
    <h2><span v-if="this.$store.getters.lan" >步骤：</span><span v-else >Methods:</span></h2>
    <div class="area">
      <process-div
        v-for="(step, index) in processList"
        :key="index"
        :step="step"
        :index="index + 1"
      ></process-div>
    </div>
  </div>
</template>

<script>
import processDiv from "./processDiv.vue";
export default {
  components: { processDiv },
  data() {
    return {
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
  computed: {
    processList() {
      if (this.$store.state.method.process == undefined) return [];
      let list = this.$store.state.method.process.split("<###**^^###>");
      list.pop();
      return list;
    },
  },

};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.food-process {
  margin-top: 5vh;
  width: 100%;
  font-family: $fonts;
  .area {
    margin-top: 5vh;
    display: grid;
    row-gap: 4vh;
    justify-items: center;
  }
}
@media only screen and (min-width: 992px) {
.food-process {
  box-sizing: border-box;
  padding: 2em 0;
  margin-top: 0;
  width: 100%;
  .area {
    margin-top: 5vh;
    row-gap: 4vh;
    justify-items: center;
  }
}}
</style>