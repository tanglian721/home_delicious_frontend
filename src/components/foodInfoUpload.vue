<template>
  <div class="food-info-upload">
    <div v-if="ifpreview" class="preview-div">
      <div class="pre-img">
        <img :src="pre_img" alt="" id="pre-bg" />
        <div class="frame">
          <div class="pre-img-option">
            <div v-for="image in this.pre_img_list" :key="image">
              <img :src="image" alt="" @click="changePre(image)" />
            </div>
          </div>
        </div>
      </div>
      <food-description :food="this.food_preview" />
    </div>
    <div v-else class="edit-div">
      <div class="img">
        <img
          v-if="images.length == 0"
          class="bg"
          src="../assets/food.png"
          alt=""
        />
        <image-preview
          v-for="(image, index) in this.pre_img_list"
          :key="image"
          :image_url="image"
          :index="index"
          @delete="deleteImage"
        />
        <p class="img-title">
          <span v-if="this.$store.getters.lan">请上传您的图片</span
          ><span v-else>Please upload your food photo</span>
          <image-upload-food @newImage="newImage" />
        </p>
      </div>
      <div class="title-description">
        <input
          type="text"
          name=""
          id="name"
          placeholder="Food name"
          v-model="food_name"
        />
        <textarea
          name="Text1"
          cols="40"
          rows="5"
          id="description"
          placeholder="Tell us about your food..."
          v-model="food_description"
        ></textarea>
      </div>
      <div class="other-info">
        <div class="cooking_way info">
          <span>
            <span v-if="this.$store.getters.lan">烹饪方式：</span>
            <span v-else>Cooking method： </span>
          </span>
          <span>
            <span class="required">
              <span v-if="this.$store.getters.lan">必填</span>
              <span v-else>Required</span>
            </span>
            <select id="cook" name="cook" @change="Cook">
              <option class="option" value="fry">
                <span v-if="this.$store.getters.lan">炒</span
                ><span v-else>fry</span>
              </option>
              <option class="option" value="deep fry">
                <span v-if="this.$store.getters.lan">炸</span
                ><span v-else>deep fry</span>
              </option>
              <option class="option" value="stew">
                <span v-if="this.$store.getters.lan">烧</span
                ><span v-else>stew</span>
              </option>
              <option class="option" value="steam">
                <span v-if="this.$store.getters.lan">蒸</span
                ><span v-else>steam</span>
              </option>
              <option class="option" value="bake">
                <span v-if="this.$store.getters.lan">烤</span
                ><span v-else>bake</span>
              </option>
              <option class="option" value="salad">
                <span v-if="this.$store.getters.lan">拌</span
                ><span v-else>salad</span>
              </option>
            </select>
          </span>
        </div>
        <div class="info">
          <span
            ><span v-if="this.$store.getters.lan">难度：</span
            ><span v-else>difficulty：</span>
          </span>
          <span
            ><span class="required"
              ><span v-if="this.$store.getters.lan">必填</span
              ><span v-else>Required</span></span
            >
            <select id="difficult" name="difficult" @change="Difficulty">
              <option class="option" value="easy">
                <span v-if="this.$store.getters.lan">简单</span
                ><span v-else>easy</span>
              </option>
              <option class="option" value="medium">
                <span v-if="this.$store.getters.lan">中等</span
                ><span v-else>medium</span>
              </option>
              <option class="option" value="difficult">
                <span v-if="this.$store.getters.lan">困难</span
                ><span v-else>difficult</span>
              </option>
              <option class="option" value="super">
                <span v-if="this.$store.getters.lan">大师</span
                ><span v-else>super</span>
              </option>
            </select>
          </span>
        </div>
        <div class="info">
          <span
            ><span v-if="this.$store.getters.lan">烹饪时间：</span
            ><span v-else>Cook Time:</span></span
          >
          <span
            ><span class="required"
              ><span v-if="this.$store.getters.lan">必填</span
              ><span v-else>Required</span></span
            >
            <input type="text" v-model="time" placeholder="30" /><span
              v-if="this.$store.getters.lan"
              >分钟</span
            ><span v-else>Min</span>
          </span>
        </div>
        <div class="info">
          <span
            ><span v-if="this.$store.getters.lan">地域：</span
            ><span v-else>Location:</span></span
          >
          <input type="text" v-model="location" placeholder="China" />
        </div>
        <div class="info">
          <span
            ><span v-if="this.$store.getters.lan">类别：</span
            ><span v-else>Category:</span></span
          >
          <input type="text" v-model="category" placeholder="pasta" />
        </div>
        <div class="info">
          <span
            ><span v-if="this.$store.getters.lan">标签：</span
            ><span v-else>Tag:</span></span
          >
          <input type="text" v-model="tag" placeholder="for kids" />
        </div>
        <div class="info">
          <span
            ><span v-if="this.$store.getters.lan">语言：</span
            ><span v-else>Language：</span>
          </span>
          <select id="language" name="Language" @change="Language">
            <option class="option" value="English">English</option>
            <option class="option" value="Chinese">中文</option>
          </select>
        </div>
      </div>
    </div>
    <div class="button">
      <button v-if="ifpreview" @click="backEdit">
        <span v-if="this.$store.getters.lan">继续编辑</span
        ><span v-else>Continue Edit</span>
      </button>
      <button v-if="ifpreview" @click="CheckUpload">
        <span v-if="this.$store.getters.lan">确认分享</span
        ><span v-else>upload</span>
      </button>
      <button v-else @click="preview">
        <span v-if="this.$store.getters.lan">预览</span
        ><span v-else>preview</span>
      </button>
    </div>
  </div>
</template>

<script>
import FoodDescription from "./foodDescription.vue";
import ImagePreview from "./imagePreview.vue";
import axios from "axios";
import cookies from "vue-cookies";
import ImageUploadFood from './imageUploadFood.vue';

export default {
  components: { ImagePreview, FoodDescription, ImageUploadFood },
  data() {
    return {
      ifpreview: false,
      images: "",
      food_preview: {},
      pre_img: "",
      food_name: "",
      food_description: "",
      time: "",
      location: "",
      category: "",
      tag: "",
      cook_way: "",
      difficulty: "",
      lang: "English",
      pre_img_list: [],
    };
  },
  props: {
    image_url: {
      type: String,
    },
    food: {
      type: Object,
    },
    index: {
      type: Number,
    },
    editFood: {
      type: Object,
    },
  },
  methods: {
    newImage(data) {
      this.images = this.images + data + "<###^^&&###>";
      this.pre_img_list = this.images.split("<###^^&&###>");
      this.pre_img_list.pop();
    },
    Cook() {
      this.cook_way = document.getElementById("cook").value;
    },
    Difficulty() {
      this.difficulty = document.getElementById("difficult").value;
    },
    deleteImage(data) {
      this.pre_img_list.splice(data, 1);
    },
    Language() {
      this.lang = document.getElementById("language").value;
      console.log(this.lang);
    },
    preview() {
      this.food_preview = {
        username: "user", //need to change
        food_name: this.food_name,
        food_description: this.food_description,
        cooking_time: this.time,
        food_location: this.location,
        food_category: this.category,
        tag: this.tag,
        cooking_way: this.cook_way,
        difficulty: this.difficulty,
        images: this.images,
        icon:
          "https://previews.123rf.com/images/amosyagina/amosyagina1805/amosyagina180500025/102630266-cute-avatar-icon-with-red-girl.jpg",
        collection: false,
      };
      console.log(this.food_preview);

      this.pre_img = this.pre_img_list[0];
      this.ifpreview = true;
    },
    backEdit() {
      this.ifpreview = false;
    },
    changePre(data) {
      this.pre_img = data;
    },
    CheckUpload() {
      if (this.food_preview.cooking_time == "") {
        if (this.$store.getters.lan) {
          alert("烹饪时间不能为空");
        } else {
          alert("Cook time is required");
        }
        this.ifpreview = false;
      } else {
        this.uploadFood();
      }
    },
    uploadFood() {
      axios
        .request({
          url: "https://homedelicious.ml/api/foods",
          method: "post",
          data: {
            token: cookies.get("token"),
            food_name: this.food_preview.food_name,
            food_description: this.food_preview.food_description,
            food_location: this.food_preview.food_location,
            food_category: this.food_preview.food_category,
            cooking_way: this.food_preview.cooking_way,
            difficulty: this.food_preview.difficulty,
            cooking_time: this.food_preview.cooking_time,
            tag: this.food_preview.tag,
            images: this.food_preview.images,
            lang: this.lang,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.food_data = response.data;
          this.$emit("finishFoodUpload", response.data.food_id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    ifupload(newValue) {
      console.log(newValue);
      console.log(this.food_preview);
      axios
        .request({
          url: "https://homedelicious.ml/api/foods",
          method: "post",
          data: {
            token: "JiP6w1TdsDf7MVN2ltsTN0yGpSr2fWG4K6h6AP9rIgelT0Kavb",
            food_name: this.food_preview.food_name,
            food_description: this.food_preview.food_description,
            food_location: this.food_preview.food_location,
            food_category: this.food_preview.food_category,
            cooking_way: this.food_preview.cooking_way,
            difficulty: this.food_preview.difficulty,
            cooking_time: this.food_preview.cooking_time,
            tag: this.food_preview.tag,
            images: this.food_preview.images,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.food_data = response.data;

          this.$emit("finishFoodUpload", response.data.food_id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editFood(newValue) {
      console.log(newValue);
      this.images = newValue.image;
      this.pre_img_list = this.image_list;
      this.food_name = newValue.food_name;
      this.food_description = newValue.food_description;
      this.cook_way = newValue.cooking_way;
      this.difficulty = newValue.difficulty;
      this.time = newValue.cooking_time;
      this.location = newValue.food_location;
      this.category = newValue.food_category;
      this.tag = newValue.tag;
    },
  },
  computed: {
    ifupload() {
      return this.$store.state.ifuploadFoodData;
    },
    image_list() {
      return this.$store.getters.foodImage;
    },
  },
  mounted() {
    if (this.ifpreview == false) {
      this.cook_way = document.getElementById("cook").value;
      this.difficulty = document.getElementById("difficult").value;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.food-info-upload {
  .edit-div {
    display: grid;
    row-gap: 2vh;
    .img {
      display: grid;
      justify-items: center;
      background-color: $bgc;
      box-sizing: border-box;
      font-family: $fonts;
      font-size: 0.8rem;
      .image-preview {
        width: 100vw;
        img {
          width: 100%;
        }
      }
      .bg {
        width: 40%;
      }
      .img-title {
        padding: 2em 0;
        align-self: end;
        width: 50%;
      }
    }
    .title-description {
      display: grid;
      row-gap: 2vh;
      #name {
        background-color: $bgc;
        font-family: $fonts;
        font-size: 1.2rem;
        padding: 10px 1em;
      }
      #description {
        min-height: 8em;
        width: 100%;
        font-family: $fonts;
        font-size: 1.2rem;
        padding: 10px 1em;
        background-color: $bgc;
      }
    }
    .other-info {
      display: grid;
      row-gap: 2vh;
      .required{
        font-size: 0.8rem;
        color: #ff7c94;
        margin-right: 1em;
      }
      .info {
        background-color: $bgc;
        font-family: $fonts;
        font-size: 1.2rem;
        padding: 10px 1em;
        display: flex;
        justify-content: space-between;
      }
      input {
        background-color: #fff;
        width: 20vw;
        text-align: center;
      }
      select {
        border: 1px solid $fontColordark;
        border-radius: 5px;
        background-color: #fff;
        .option {
          text-align: center;
        }
      }
    }
  }
  .button {
    padding: 3vh;
    display: flex;
    justify-content: space-evenly;
    button {
      background-color: $fontColordark;
      color: #fff;
      border-radius: 0.5rem;
      padding: 5px;
      text-transform: uppercase;
      font-family: $fonts;
      border: 1px solid $fontColordark;
    }
  }
  .preview-div {
    width: 100%;
    font-family: $fonts;
    .pre-img {
      width: 100%;
      overflow: hidden;
      #pre-bg {
        width: 100%;
        height: 80vw;
        object-fit: cover;
      }
      .frame {
        position: relative;
        top: -0.5vh;
        display: grid;
        justify-items: center;
        padding: 1vw;
        background-color: rgba(15, 15, 15, 0.514);
        .pre-img-option {
          height: 20vw;
          display: flex;
          width: 100%;
          overflow-x: scroll;
          > div {
            display: inline-block;
            height: 20vw;
            margin-right: 1vw;
            > img {
              height: 100%;
              width: 20vw;
              object-fit: cover;
            }
          }
        }
      }
    }
    .food-description {
      padding: 8vw;
    }
  }
}
@media only screen and (min-width: 1280px) {
  .food-info-upload {
    // border: 1px solid black;
    width: 55vw;
    .edit-div {
      width: 80%;
      margin-left: 10%;
      display: grid;
      row-gap: 2vh;
      position: relative;
      .img {
        width: 100%;
        display: grid;
        justify-items: center;
        background-color: $bgc;
        box-sizing: border-box;
        font-family: $fonts;
        font-size: 0.8rem;
        .image-preview {
          width: 45vw;
          img {
            width: 100%;
          }
        }
        .bg {
          width: 40%;
        }
        .img-title {
          text-align: center;
          font-size: 1rem;
          .image-upload {
            margin-left: 25%;
          }
        }
      }
      .title-description {
        display: grid;
        row-gap: 2vh;
        #name {
          background-color: #fff;

          font-family: $fonts;
          font-size: 1.2rem;
          padding: 10px 1em;
        }
        #description {
          min-height: 8em;
          width: 100%;
          font-family: $fonts;
          font-size: 1.2rem;
          padding: 10px 1em;
          background-color: #fff;
        }
      }
      .other-info {
        .info {
          background-color: #fff;
        }
        input {
          background-color: $bgc;
          width: 10em;
        }
        select {
          background-color: $bgc;
        }
      }
    }
    .button {
      padding: 3vh;
      display: flex;
      justify-content: space-evenly;
      button {
        background-color: $fontColordark;
        color: #fff;
        border-radius: 0.5rem;
        padding: 5px;
        text-transform: uppercase;
        font-family: $fonts;
        border: 1px solid $fontColordark;
      }
    }
    .preview-div {
      width: 30vw;
      position: relative;
      .pre-img {
        width: 100%;
        height: 60vh;
        overflow: hidden;
        position: absolute;
        #pre-bg {
          width: 100%;
          height: 50vh;
          object-fit: cover;
        }
        .frame {
          position: relative;
          top: -0.5vh;
          display: grid;
          justify-items: center;
          padding: 0;
          background-color: rgba(15, 15, 15, 0.918);
          .pre-img-option {
            height: 12vh;
            display: flex;
            width: 100%;
            justify-content: center;
            overflow-x: scroll;
            > div {
              display: inline-block;
              height: 10vh;
              margin-right: 1vw;
              > img {
                height: 100%;
                width: 10vh;
                object-fit: cover;
              }
            }
          }
        }
      }
      .food-description {
        padding: 2em;
      }
    }
  }
}
</style>