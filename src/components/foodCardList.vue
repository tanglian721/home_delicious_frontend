<template>
  <div class="food-card-list container py-5 mb-5">
    <food-card v-for="food in food_list" :key="food.food_id" :food="food"/>
  </div>
</template>

<script>
import foodCard from "./foodCard.vue";
import axios from "axios";
export default {
  components: { foodCard },
  data() {
    return {
      food_list: []
    };
  },
  props: {
      food: {
          type: Object,
      },
  },
  methods: {
    getFoodList() {
      // console.log(this.cooking_choice)
      axios
        .request({
          url: "https://homedelicious.ml/api/foods",
          method: "get",
          params:{
            cooking_way: this.cooking_way
          }
        })
        .then((response) => {
          console.log(response.data);
          this.food_list = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    cooking_way(newValue) {
      console.log(newValue)
      this.getFoodList()
    }
  },
  computed: {
    cooking_way() {
      return this.$store.state.homeListChoice 
    }
  },
  mounted () {
      this.getFoodList();
  },
};
</script>

<style lang="scss" scoped>
.food-card-list{
    display: grid;
    justify-items: center;
    row-gap: 5vh;
    padding-bottom: 15vh;
}
@media only screen and (min-width: 992px) {
  .food-card-list{
    margin-top: 3vh;
    row-gap: 5vh;
    grid-template-columns: 1fr 1fr;
    padding-bottom: 15vh;
}
}

</style>