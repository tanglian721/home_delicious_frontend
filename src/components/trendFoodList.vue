<template>
  <div class="trend-food-list">
    <hooper
      class="frame"
      :itemsToShow="1.5"
      :centerMode="true"
      :autoPlay="false"
    >
      <slide
        class="slide"
        v-for="(slide, indx) in slides"
        :key="slide.id"
        :index="indx"
      >
        <div class="picture" @click="toFoodPage(slide.food_id)">
          <img :src="slide.image" alt="" />
        </div>
        <div class="text-card bg-white px-3 py-1 w-75 h-35 mx-auto row py-lg-2">
          <grade-display class="col-5 p-0 col-lg-4" :grade="slide.grade" />
          <collection-display class="offset-6 col-1 p-0 p-lg-1" :food="slide" />
          <p class="col-12 p-0 m-0 fs-08rem text-fontColor">Top 5 Review</p>
          <p class="name col-12 p-0 m-0" @click="toFoodPage(slide.food_id)">
            {{ slide.food_name }}
          </p>
          <p class="user col-5 p-0 m-0 fs-08rem text-fontColor col-lg-3">
            by {{ slide.username }}
          </p>
          <div class="user col-2 p-0 col-lg-1">
            <img
              class="user-img rounded-circle w-75 p-0"
              :src="slide.icon"
              alt=""
            />
          </div>
        </div>
        <!-- </div> -->
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import axios from "axios";
import "hooper/dist/hooper.css";
import GradeDisplay from "./gradeDisplay.vue";
import CollectionDisplay from "./collectionDisplay.vue";
export default {
  components: {
    Hooper,
    Slide,
    GradeDisplay,
    CollectionDisplay,
    HooperNavigation,
  },
  data() {
    return {
      slides: [],
      image: "",
    };
  },
  props: {
    grade: {
      type: String,
    },
    food: {
      type: Object,
    },
  },
  methods: {
    getFoodList() {
      axios
        .request({
          url: "https://homedelicious.ml/api/foods",
          method: "get",
          params: {
            rate: "1",
          },
        })
        .then((response) => {
          this.slides = response.data;
          for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].image = this.slides[i].image.split(
              "<###^^&&###>"
            )[0];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toFoodPage(data) {
      console.log("aa");
      this.$router.push("/food/" + data);
    },
  },
  mounted() {
    this.getFoodList();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.hooper-slide.is-current {
  transform: scale(1.1);
}
.trend-food-list {
  box-sizing: border-box;

  .frame {
    width: 100%;
    height: 100%;
    position: relative;
    .slide {
      position: relative;
      height: 90%;
      margin-left: 0;
      margin-top: 2em;
      filter: $shadow;
      .picture {
        position: relative;
        height: 80%;
        width: 86%;
        margin-left: 7%;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
      }
      .text-card {
        transform: translateY(-70%);
        border-radius: 20px;
      }
      .user-img{
        margin-top: -5px;
      }
    }
  }
}
@media only screen and (min-width: 992px) {
  .trend-food-list {
    .frame {
      margin-top: 0;
      width: 100%;
      margin-top: -5px;
      .slide {
        margin-top: 3.5em;
        filter: $shadow;
        width: 100%;
        .text-card{
          width: 50% !important;
        transform: translateY(-60%);
          
        }
        // .card {
        //   height: 7em;
        //   width: 86%;
        //   position: absolute;
        //   bottom: 20%;
        //   left: 7%;
        //   border-radius: 10px;
        //   filter: none;
        //   font-size: 0.8rem;

        //   grid-template-rows: 1fr 2fr;
        //   .icon {
        //     position: absolute;
        //     top: 1em;
        //     right: 0;
        //     width: 15vw;
        //     justify-content: space-around;
        //     .grade-Display {
        //       width: 6em;
        //       height: 1.6em;
        //     }
        //     .collection-display {
        //       width: 1.5em;
        //       height: 1.5em;
        //     }
        //   }
        //   .text {
        //     position: absolute;
        //     left: 3vw;
        //     top: 1.5em;
        //     .name {
        //       font-size: 1rem;
        //     }

        //     .user {
        //       img {
        //         top: 0.2em;
        //         height: 1.3em;
        //       }
        //     }
        //   }
        // }
      }
    }
  }
}
</style>