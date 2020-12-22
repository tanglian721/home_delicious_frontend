<template>
  <div class="preMethod-div">
    <h3 class="number">
      <span v-if="this.$store.getters.lan">第 {{ index + 1 }} 步</span
      ><span v-else>STEP: {{ index + 1 }}</span>
    </h3>
    <div class="option">
      <img
        class="option-icon"
        src="../assets/option.png"
        alt=""
        @click="Option"
      />
      <div v-if="option" class="button">
        <button @click="deleteStep">
          <span v-if="this.$store.getters.lan">删除步骤</span
          ><span v-else>Delete Step</span>
        </button>
        <button @click="deleteImage">
          <span v-if="this.$store.getters.lan">删除图片</span
          ><span v-else>Delete image</span>
        </button>
      </div>
    </div>
    <textarea
      name="Text1"
      cols="40"
      rows="5"
      id="method"
      placeholder="Tell us how you make the food...."
      v-model="new_method_text"
    ></textarea>
    <img v-if="new_method_image != ''" :src="new_method_image" alt="" />
    <p v-else class="img-title">
      <span v-if="this.$store.getters.lan" >请上传您的图片</span><span v-else >Please upload your food photo</span>
      <image-upload-method @newImage="newImage" />
    </p>
  </div>
</template>

<script>
import axios from "axios"
import ImageUploadMethod from './imageUploadMethod.vue';

export default {
  components: { ImageUploadMethod },
  data() {
    return {
      new_method_text: "",
      new_method_image: "",
      option: false,
    };
  },
  props: {
    preMethod: {
      type: Array,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    Option() {
      this.option = !this.option;
    },
    deleteStep() {
      this.$emit("deleteStep", this.index);
      this.option = false;
    },
    deleteImage() {
      let filename = this.new_method_image.replace(
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
          this.new_method_image = "";
          this.option = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newImage(data) {
      this.new_method_image = data;
    },
    // updata(){
    //     console.log(this.new_method_text)
    //     console.log(this.new_method_image)
    // }
  },
  watch: {
    new_method_text(newValue) {
      console.log(newValue);
      let data = [newValue, this.new_method_image, this.index];
      console.log(data);
      this.$emit("updateMethod", data, this.index);
    },
    new_method_image(newValue) {
      console.log(data);
      let data = [this.new_method_text, newValue, this.index];
      this.$emit("updateMethod", data, this.index);
    },
  },
  computed: {
    method_text() {
      return this.preMethod[0];
    },
    image() {
      return this.preMethod[1];
    },
  },
  mounted() {
    this.new_method_text = this.method_text;
    this.new_method_image = this.image;
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.preMethod-div {
  display: grid;
  row-gap: 2vh;
  position: relative;
  margin-top: 2vh;
  h3 {
    width: 90%;
    text-align: center;
  }
  .option {
    position: absolute;
    right: 8vw;
    .option-icon {
      height: 1rem;
      width: auto;
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
  textarea {
    width: 100%;
    background-color: #fff;
    font-size: 1.2rem;
    line-height: 2rem;
    margin-right: 5vw;
  }
  img {
    justify-self: start;
    width: 80%;
    margin-left: 10%;
    height: 60vw;
    object-fit: cover;
  }
}
@media only screen and (min-width: 1280px) {
  .preMethod-div {
    width: 100%;
    display: grid;
    justify-items: center;
    row-gap: 2vh;
    position: relative;
    h3 {
      width: 100%;
      text-align: center;
      margin-left: 0;
    }
    .option {
      position: absolute;
      right: 0;
      .option-icon {
        height: 1rem;
        width: auto;
      }
      .button {
        position: absolute;
        right: 1vw;
        width: 8vw;
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
    textarea {
      padding: 1em;
      height: fit-content;
      width: 100%;
      background-color: #fff;
      font-size: 1.2rem;
      line-height: 2rem;
      margin-right: 0;
      border: 1px solid $barBgc;
    }
    img {
      width: 30vw;
      height: 30vh;
      object-fit: cover;
      margin-left: 7vw;
    }
  }
}
</style>