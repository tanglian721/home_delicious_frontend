<template>
  <div class="food-card">
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
        <p @click="toFoodPage" >{{ food.food_category }}</p>
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
.food-card {
  width: 80vw;
  height: 15vh;
  position: relative;
  filter: $shadow;
  .image {
    z-index: 20;
    position: absolute;
    left: 5vw;
    bottom: 1vh;
    img {
      width: 30vw;
      height: 13vh;
      object-fit: cover;
      border-radius: 10px;
    }
    .logo {
      z-index: 25;
      width: 4vw;
      height: 4vw;
      position: absolute;
      bottom: -0.5vh;
      left: 12vw;
    }
    &::after {
      content: "";
      border: 4vw solid rgba(252, 0, 0, 0);
      width: 0;
      height: 0;
      // background-color: #fff;
      border-bottom: 4vw solid rgb(255, 255, 255);
      position: absolute;
      bottom: 0.5vh;
      left: 10vw;
    }
  }
  .card {
    width: 80vw;
    height: 12vh;
    position: absolute;
    bottom: 0;
    border-radius: 10px;
    background-color: $textBgc;
    padding: 1vh 0;
    padding-left: 40vw;
    box-sizing: border-box;
    display: grid;
    align-items: baseline;
    .icon {
      width: 90%;
      display: flex;
      justify-content: space-between;
      .grade-Display {
        width: 20vw;
        height: 6vw;
      }
      .collection-display {
        width: 4vw;
        height: 4vw;
      }
    }
    .text {
      font-size: 0.6rem;
      font-family: $fonts;
      color: $fontColorlight;
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
        font-size: 0.8rem;
      }
    }
  }
}
@media only screen and (min-width: 1280px) {
  .food-card {
  width: 20vw;
  height: 10vw;
  .image {
    left: 1vw;
    bottom: 1vw;
    img {
      width: 8vw;
      height: 6vw;
    }
    .logo {
      width: 1vw;
      height: 1vw;
      bottom: 0;
      left: 3.5vw;
    }
    &::after {
      border: 1.5vw solid rgba(252, 0, 0, 0);
      border-bottom: 1.5vw solid rgb(255, 255, 255);
      bottom: 0;
      left: 2.5vw;
    }
  }
  .card {
    width: 20vw;
    height: 8vw;
    padding: 0.5vw 0;
    padding-left: 10vw;
    .icon {
      width: 90%;
      .grade-Display {
        width: 3em;
        height: 1em;
      }
      .collection-display {
        width: 1vw;
        height: 1vw;
      }
    }
    .text {
      font-size: 0.6rem;
      font-family: $fonts;
      color: $fontColorlight;
      margin-top: -1em;
      img {
        height: 2vh;
        position: relative;
        top: 0.5vh;
        border-radius: 50%;
      }
      .users {
        z-index: 50;
      }
      .name {
        color: black;
        font-size: 0.8rem;
      }
    }
  }
}
}
</style>