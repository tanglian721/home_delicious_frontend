<template>
  <div class="collection-display">
    <div class="heart w-100 mx-auto" v-if="this.$store.getters.login">
      <img
        v-if="collection"
        src="../assets/heart-r.png"
        alt=""
        class="collection w-100"
        @click="deleteCollection"
      />
      <img
        v-else
        src="../assets/heart-b.png"
        alt=""
        class="uncollection w-100"
        @click="addCollection"
      />
    </div>
    <div v-else class="heart w-100 mx-auto">
      <img
        src="../assets/heart-b.png"
        alt=""
        class="collection w-100"
        @click="toLoginPage"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    return {};
  },
  props: {
    food: {
      type: Object,
    },
  },
  methods: {
    addCollection() {
      axios
        .request({
          url: "https://homedelicious.ml/api/collection",
          method: "post",
          data: {
            token: cookies.get("token"),
            food_id: this.food.food_id,
          },
        })
        .then((response) => {
          console.log(response);
          this.$store.state.collectionList.unshift(this.food);
          console.log(this.$store.state.collectionList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCollection() {
      axios
        .request({
          url: "https://homedelicious.ml/api/collection",
          method: "delete",
          data: {
            token: cookies.get("token"),
            food_id: this.food.food_id,
          },
        })
        .then((response) => {
          console.log(response);
          for (let i = 0; i < this.$store.state.collectionList.length; i++) {
            if (
              this.$store.state.collectionList[i].food_id == this.food.food_id
            ) {
              this.$store.state.collectionList.splice(i, 1);
            }
          }
          console.log(this.$store.state.collectionList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toLoginPage() {
      this.$router.push('/login')
    }
  },
  computed: {
    collection() {
      return this.$store.getters.collectionIdList.includes(this.food.food_id);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.heart{
  margin-top: -20%;
}

</style>