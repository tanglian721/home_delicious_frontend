<template>
  <div class="food-description">
    <div class="icon">
      <grade-display :grade="food.grade" />
      <collection-display :food="food" />
      <div class="option" v-if="this.owner">
        <img
          class="option-icon"
          src="../assets/option.png"
          alt=""
          @click="option = !option"
        />
        <div v-if="option" class="button">
          <button @click="editFood"><span v-if="this.$store.getters.lan" >修改</span><span v-else >EDIT FOOD</span></button>
          <button @click="deleteFood"><span v-if="this.$store.getters.lan" >删除</span><span v-else >DELETE FOOD</span></button>
        </div>
      </div>
    </div>
    <p class="name">{{ food.food_name }}</p>
    <div class="category">
      <span>{{ food.food_location }}</span>
      <span>{{ food.food_category }}</span>
      <span>{{ food.tag }}</span>
    </div>
    <div class="by">
      <span>by </span>
      <span>{{ food.username }}</span>
      <img :src="food.icon" alt="" />
    </div>
    <p class="description">{{ food.food_description }}</p>
    <div class="cook-info">
      <div class="way">
        <img
          v-if="food.cooking_way == 'fry'"
          src="../assets/frying-pan.png"
          alt=""
        />
        <img
          v-else-if="food.cooking_way == 'stew'"
          src="../assets/pot.png"
          alt=""
        />
        <img
          v-else-if="food.cooking_way == 'steam'"
          src="../assets/steamer.png"
          alt=""
        />
        <img
          v-else-if="food.cooking_way == 'bake'"
          src="../assets/oven.png"
          alt=""
        />
        <img
          v-else-if="food.cooking_way == 'deep fry'"
          src="../assets/fryer.png"
          alt=""
        />
        <img
          v-else-if="food.cooking_way == 'salad'"
          src="../assets/salad.png"
          alt=""
        />
      </div>
      <div class="time">
        <p>{{ food.cooking_time }}<span v-if="this.$store.getters.lan" >分钟</span><span v-else >MIN</span></p>
      </div>
      <div class="level">
        <p>{{ food.difficulty }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionDisplay from "./collectionDisplay.vue";
import gradeDisplay from "./gradeDisplay.vue";
import cookies from "vue-cookies"
import axios from "axios"
export default {
  components: { gradeDisplay, CollectionDisplay },
  data() {
    return {
      way: "fry",
      option:false,
      owner:false
    };
  },
  methods: {
    editFood() {
      this.$store.commit("saveEditFoodId",this.food.food_id)
      this.$router.push("/edit")
    },
    deleteFood() {
      this.option = false
      if (confirm("Do you make sure to delete the foods?")){
         axios
        .request({
          url: "https://homedelicious.ml/api/foods",
          method: "delete",
          data: {
            token: cookies.get("token"),
            food_id: this.food.food_id,
          },
        })
        .then((response) => {
          console.log(response);
          window.history.back()
        })
        .catch((error) => {
          console.log(error);
        });
  
      }
    }

     
  },
  props: {
    food: {
      type: Object,
    },
    grade: {
      type: String,
    },
  },
  watch: {
    food(newValue) {
          if ( cookies.get("user").user_id==newValue.user_id) {
      this.owner = true
      console.log(newValue)
    }
    }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.food-description {
  display: grid;
  row-gap: 2vw;
  box-sizing: border-box;

  font-family: $fonts;
  position: relative;
  .icon {
    display: flex;
    justify-content: space-between;
    width: 80%;
    .grade-Display {
      width: 20vw;
      height: 6vw;
    }
    .collection-display {
      width: 4vw;
      height: 4vw;
    }
    .option {
      position: absolute;
      width: 4vw;
      height: 4vw;
      right: 0;
      top: 1vw;
      .option-icon {
        height: 100%;
      }
      .button {
        position: absolute;
        right: 5vw;
        width: 20vw;
        display: grid;
        background-color: $fontColordark;
        color: #fff;
        filter: $shadow;
        button {
          padding: 5px;
          border-bottom: 1px solid #fff;
          &:hover {
            color: $fontColordark;
            background-color: #fff;
          }
        }
      }
    }
  }
  .name {
    font-size: 2rem;
    font-weight: bolder;
  }
  .collection {
    position: absolute;
    right: 5vw;
    top: 7vw;
    img {
      width: 5vw;
    }
  }
  .category {
    color: $fontColorlight;
    span {
      margin-right: 5vw;
    }
  }
  .by {
    font-size: 1.2rem;
    img {
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
      position: relative;
      top: 2vw;
    }
  }
  .description {
    margin-top: 0;
    max-height: 15vh;
    overflow-y: auto;
    color: $fontColordark;
  }
  .cook-info {
    margin-top: 2vh;
    height: 25vw;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    > div {
      width: 70%;
      height: 70%;
      background-color: $redBgc;
      display: grid;
      justify-items: center;
      align-items: center;
      border-radius: 10px;
    }
    .way {
      img {
        width: 12vw;
      }
    }
    .time,
    .level {
      font-weight: bold;
      text-transform: uppercase;
    }
  }
}
@media only screen and (min-width: 1280px) {
  .food-description {
    // display: grid;
    row-gap: 2vh;
    padding: 2em;
    font-family: $fonts;
    position: relative;
    margin-left: 30vw;
    width: 25vw;
    height: 60vh;
    background-color: #fff;
    align-content: start;
    .icon {
      .grade-Display {
        width: 5em;
        height: 1.5em;
      }
      .collection-display {
        width: 1em;
        height: 1em;
      }
      .option {
        width: 1em;
        height: 1em;
        top: 2.2em;
        right: 1em;

        .button {
          right: 0;
          width: 8vw;
        }
      }
    }
    .name {
      font-size: 2rem;
    }
    // .collection {
    //   position: absolute;
    //   right: 5vw;
    //   top: 7vw;
    //   img {
    //     width: 5vw;
    //   }
    // }
    .category {
      span {
        margin-right: 2em;
      }
    }
    .by {
      font-size: 1rem;
      img {
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        position: relative;
        top: 0.3em;
        margin-left: 1em;
      }
    }
    .description {
      margin-top: 3vh;
      font-size: 1.1rem;
    }
    .cook-info {
      position: absolute;
      bottom: 1em;
      margin-top: 0;
      height: 6em;
      > div {
        width: 5em;
        height: 5em;
        background-color: $redBgc;
        display: grid;
        justify-items: center;
        align-items: center;
        border-radius: 10px;
      }
      .way {
        img {
          width: 50%;
        }
      }
      .time,
      .level {
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }
}
</style>