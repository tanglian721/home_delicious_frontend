<template>
  <div class="ingredient">
    <h2><span v-if="this.$store.getters.lan" >原料：</span><span v-else >Ingredients:</span></h2>
    <div class="area">
      <material-div
        v-for="(material, index ) in ingredientList"
        :key="index"
        :material="material"
      />
    </div>
  </div>
</template>

<script>
import materialDiv from "./materialDiv.vue";
export default {
  components: { materialDiv },
  data() {
    return {};
  },
  props: {
    material: {
      type: String,
    },
  },
  computed: {
    ingredientList() {
      if (this.$store.state.method.ingredient == undefined) return [];
      let list = this.$store.state.method.ingredient.split("<###**^^###>");
      list.pop();
      return list;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.ingredient {
  margin-top: 5vh;
  width: 100%;
  font-family: $fonts;
  .area {
    width: 100%;
    box-sizing: border-box;
    margin-top: 5vh;
    display: grid;
    row-gap: 2vh;
  }
}
@media only screen and (min-width: 992px) {
  .ingredient {
    margin: 2em 0;
    width: 100%;
    box-sizing: border-box;
    .area {
      margin-top: 2em;
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 2vh;
    }
  }
}
</style>