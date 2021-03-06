<template>
  <div class="food-card bg-white row card-frame p-0 my-3">
    <div class="image col-6 p-0" @click="toFoodPage" >
      <img class="card-img" :src="food.image.split('<###^^&&###>')[0]" alt="" />
      <img class="card-logo position-relative" src="../assets/logo-card.png" alt="">
    </div>
            
    <div class="text-card h-100 col-6 py-3 row">
        <grade-display class="col-5 p-0" :grade="food.grade"/>
        <collection-display class="offset-5 col-1 p-0" :food="food"/>
        <p class="col-12 p-0 m-0 fs-08rem" @click="toFoodPage" >{{ food.food_category }}</p>
        <p class="name col-12 p-0 m-0">{{ food.food_name }}</p>
        <p @click="toUserpage" class="users col-12 p-0 m-0 fs-08rem" >by {{ food.username }} <img @click="toUserpage" class="users-img rounded-circle"  :src="food.icon" alt="" /></p> 
        
    </div>
  </div>
</template>

<script>
import CollectionDisplay from "./collectionDisplay.vue";
import gradeDisplay from "./gradeDisplay.vue";
export default {
  components: { gradeDisplay, CollectionDisplay },
  props: {
    food: {
      type: Object,
    },
    grade: {
      type: String,
    },
  },
  methods: {
    toFoodPage() {
      this.$router.push("/food/" + this.food.food_id);
    },
    toUserpage() {
      this.$router.push("/user/" + this.food.user_id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.food-card {
  height: 7.5rem;
  // &::after {
  //   content: "";
  //   border: 2rem solid rgba(252, 0, 0, 0);
  //   width: 0;
  //   height: 0;
  //   // background-color: #fff;
  //   border-bottom: 2rem solid rgb(255, 255, 255);
  //   position: absolute;
  //   bottom: 0.5vh;
  //   left: 3rem;
  // }
}
.img {
  z-index: 20;
  height: 7.5rem;
  position: relative;
}
.card-img {
  width: 90%;
  margin-left: 5%;
  border-radius: 10px;
  height: 7.5rem;
  object-fit: cover;
  transform: translateY(-.5rem);
}
.card-logo {
  z-index: 25;
  width: 20%;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  transform: translate(200%,-2rem);
}
.name {
  height: 2rem;
  overflow: hidden;
  line-height: 1rem;
}
.users-img{
  height: 1rem;
  object-fit: cover;
  margin-top: -2px;
}
@media only screen and (min-width: 992px) {
  .food-card{
    width: 75%;
  }
//   .food-card::after {
//     left: 3.5rem;
  
// }
  // .card-img {
  //   width: 9rem;
  // }
  //   .card-logo {
  //     z-index: 25;
  //     width: 1rem;
  //     transform: translate(-5rem,2rem);
  //   }
}
</style>