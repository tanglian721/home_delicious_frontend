<template>
  <div class="food-card-long">
    <div class="image" @click="toFoodPage" >
      <img :src="food.image.split('<###^^&&###>')[0]" alt="" />
      <img class="logo" src="../assets/logo.png" alt="">
    </div>
    <div class="card">
      <div class="icon">
        <grade-display :grade="food.grade"/>
        <collection-display :food="food"/>
      </div>
      <div class="text">
        <p @click="toFoodPage" ><span>{{ food.location }}</span><span>{{ food.food_category }}</span></p>
        <p class="name">{{ food.food_name }}</p>
        <p @click="toUserpage" class="users" >
          by <span>{{ food.username }}</span> <img :src="food.icon" alt="" />
        </p>
      </div>
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
.food-card-long {
  width: 30vw;
  height: 8em;
  position: relative;
  filter: $shadow;
  .image {
    z-index: 20;
    position: absolute;
    // left: 5vw;
    top: 0;
    img {
      width: 10em;
      height: 8em;
      object-fit: cover;
      border-radius: 10px;
    }
    .logo {
      z-index: 25;
      width: 1.2em;
      height: 1.2em;
      position: absolute;
      bottom: 0.4em;
      left: 4.6em;
    }
    &::after {
      content: "";
      border: 2em solid rgba(252, 0, 0, 0);
      width: 0;
      height: 0;
      // background-color: #fff;
      border-bottom: 2em solid rgb(255, 255, 255);
      position: absolute;
      bottom: 0.25em;
      left: 3.2em;
    }
  }
  .card {
    width: 30vw;
    height: 8em;
    position: absolute;
    bottom: 0;
    border-radius: 10px;
    background-color: $textBgc;
    padding: 1vh 0;
    padding-left: 12em;
    box-sizing: border-box;
    display: grid;
    align-items: baseline;
    .icon {
      width: 90%;
      display: flex;
      justify-content: space-between;
      .grade-Display {
        width: 5em;
        height: 1.5em;
      }
      .collection-display {
        width: 1em;
        height: 1em;
      }
    }
    .text {
      font-size: 1rem;
      font-family: $fonts;
      color: $fontColorlight;
      display: grid;
      row-gap: 2px;
      p{
        span{
          margin-right: 1em;
        }
      }
      img {
        height: 2vh;
        position: relative;
        top: 0.5vh;
      }
      .users {
        z-index: 50;
      }
      .name {
        color: black;
        font-size: 1.2rem;
      }
    }
  }
}
// @media only screen and (min-width: 1280px) {
//   .food-card {
//   width: 20vw;
//   height: 8vw;
//   .image {
//     left: 1.5vw;
//     bottom: 1vw;
//     img {
//       width: 8vw;
//       height: 6vw;
//     }
//     .logo {
//       width: 1vw;
//       height: 1vw;
//       bottom: 0;
//       left: 3.5vw;
//     }
//     &::after {
//       border: 1.5vw solid rgba(252, 0, 0, 0);
//       border-bottom: 1.5vw solid rgb(255, 255, 255);
//       bottom: 0;
//       left: 2.5vw;
//     }
//   }
//   .card {
//     width: 20vw;
//     height: 6vw;
//     padding: 0.5vw 0;
//     padding-left: 10vw;
//     .icon {
//       width: 90%;
//       .grade-Display {
//         width: 5em;
//         height: 1.5em;
//       }
//       .collection-display {
//         width: 1vw;
//         height: 1vw;
//       }
//     }
//     .text {
//       font-size: 0.6rem;
//       font-family: $fonts;
//       color: $fontColorlight;
//       img {
//         height: 2vh;
//         position: relative;
//         top: 0.5vh;
//       }
//       .users {
//         z-index: 50;
//       }
//       .name {
//         color: black;
//         font-size: 0.8rem;
//       }
//     }
//   }
// }
// }
</style>