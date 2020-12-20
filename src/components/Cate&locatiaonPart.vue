<template>
  <div class="cate-location">
    <h2><span v-if="this.$store.getters.lan" >按地域或类别搜索：</span><span v-else >Search by category or location:</span></h2>
    <div class="tags">
      <div class="tag" v-for="tag in tagList" :key="tag[0]">
        <u @click="searchByTag(tag[0])">{{ tag[0] }}</u>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tagList: [],
    };
  },
  methods: {
    getTags() {
      axios
        .request({
          url: "https://homedelicious.ml/api/tags",
          method: "get",
          params: {
            searchTag: "cateLocation",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.tagList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchByTag(data) {
      axios
        .request({
          url: "https://homedelicious.ml/api/search",
          method: "get",
          params: {
            searchTag: "cateLocation",
            content: data,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.commit("saveSearchFoodList", response.data);
          this.$store.state.searchShow = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getTags();
  },
};
</script>

<style lang="scss" scoped>
.cate-location {
  h2 {
    font-size: 1.2rem;
  }
  .tags {
    margin-top: 2vh;
    overflow: hidden;
    .tag {
      display: inline-block;
      margin: 5px 1em;
    }
  }
}
@media only screen and (min-width: 1280px) {
  h2 {
    margin-top: 2vh;
  }
  .tags {
    height: 31vh;
    .tag {
      display: inline-block;
    }
  }
}
</style>