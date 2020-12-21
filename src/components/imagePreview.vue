<template>
  <div class="image-preview">
    <img :src="image_url" alt="" />
    <div class="delete" @click="deleteimage">
      <img src="../assets/cancel.png" alt="" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    image_url: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    deleteimage() {
      let filename = this.image_url.replace(
        "https://homedelicious.ml/img/uploadImgs/",
        ""
      );
      console.log(filename);
      axios
        .request({
          url: "https://homedelicious.ml/api/upload",
          method: "delete",
          data: {
            image: filename,
          },
        })
        .then((response) => {
          console.log(response);
          // this.$emit("delete", this.index);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$emit("delete", this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-preview {
  position: relative;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #fff;
    width: 2em;
    height: 2em;
    img {
      position: absolute;
      top: 0.5em;
      left: 0.5em;
      width: 1em;
      height: 1em;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>