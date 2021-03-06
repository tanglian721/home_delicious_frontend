<template>
  <div class="rate-grade">
    <div class="1star" @click="postGrade(1)">
      <img v-if="grade >= 1" src="../assets/star-c.png" alt="" />
      <img v-else src="../assets/star-w.png" alt="" />
    </div>
    <div class="2star" @click="postGrade(2)">
      <img v-if="grade >= 2" src="../assets/star-c.png" alt="" />
      <img v-else src="../assets/star-w.png" alt="" />
    </div>
    <div class="3star" @click="postGrade(3)">
      <img v-if="grade >= 3" src="../assets/star-c.png" alt="" />
      <img v-else src="../assets/star-w.png" alt="" />
    </div>
    <div class="4star" @click="postGrade(4)">
      <img v-if="grade >= 4" src="../assets/star-c.png" alt="" />
      <img v-else src="../assets/star-w.png" alt="" />
    </div>
    <div class="5star" @click="postGrade(5)">
      <img v-if="grade >= 5" src="../assets/star-c.png" alt="" />
      <img v-else src="../assets/star-w.png" alt="" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  props: {
    food: {
      type: Object,
    },
  },
  methods: {
    getGrade() {
      axios
        .request({
          url: "https://homedelicious.ml/api/grade",
          method: "get",
          params: {
            food_id: this.$router.history.current.params.pathMatch,
            user_id: cookies.get("user").user_id,
          },
        })
        .then((response) => {
          this.$store.commit("uploadGrade", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    postGrade(data) {
      console.log(data);
      if (this.grade == 0) {
        axios
          .request({
            url: "https://homedelicious.ml/api/grade",
            method: "post",
            data: {
              food_id: this.food.food_id,
              token: cookies.get("token"),
              grade: data,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$emit("updateGrade", response.data);
            this.$store.commit("uploadGrade", data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(this.grade)
        console.log(cookies.get("token"))
        axios
          .request({
            url: "https://homedelicious.ml/api/grade",
            method: "patch",
            data: {
              food_id: this.food.food_id,
              token: cookies.get("token"),
              grade: data,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$emit("updateGrade", response.data);
            this.$store.commit("uploadGrade", data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  computed: {
    grade() {
      return this.$store.state.food_grade;
    },
  },
  mounted() {
    this.getGrade();
  },
};
</script>

<style lang="scss" scoped>
.rate-grade {
  width: 60%;
  margin-left: 20%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  img {
    width: 2em;
  }
}
@media only screen and (min-width: 992px) {
.rate-grade {
  width: 20%;
  margin-left: 40%;
  img {
    width: 1.5em;
  }
}}
</style>