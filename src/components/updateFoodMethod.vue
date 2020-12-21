<template>
  <div class="method-div">
    <div class="ingredient-area">
      <h2>
        <span v-if="this.$store.getters.lan">原料：</span
        ><span v-else>Ingredients:</span>
      </h2>
      <div class="ingredient-preview">
        <prematertial-div
          v-for="(material, index) in preview_ingredients"
          :key="material[2] + index"
          :prematerial="material"
          :index="index"
          @updateIngredient="updateIngredient"
          @deleteIngredient="deleteIngredient"
        />
      </div>
      <div class="ingredient-edit">
        <div class="data">
          <div class="round"></div>
          <input
            type="text"
            name=""
            id="name"
            placeholder="Butter"
            v-model="material"
          />
        </div>
        <div class="data">
          <div class="round" v-if="this.$store.getters.mobile"></div>
          <div v-if="this.$store.getters.desktop"></div>
          <input
            type="text"
            name=""
            id="amount"
            placeholder="150g"
            v-model="amount"
          />
        </div>
      </div>
      <div class="button">
        <button class="add" @click="addIngredient">
          <span v-if="this.$store.getters.lan">添加原料</span
          ><span v-else>Add ingredients</span>
        </button>
      </div>
    </div>
    <div class="method-area">
      <h2>
        <span v-if="this.$store.getters.lan">步骤：</span
        ><span v-else>Methods:</span>
      </h2>
      <div class="method-preview">
        <pre-method-div
          v-for="(method, index) in pre_methods"
          :key="method[2] + index"
          :preMethod="method"
          :index="index"
          @deleteStep="deleteStep"
          @updateMethod="updateMethod"
        />
      </div>
      <div class="method-edit">
        <h3>
          <span v-if="this.$store.getters.lan">第 {{ method_step }} 步</span
          ><span v-else>STEP: {{ method_step }}</span>
        </h3>
        <textarea
          name="Text1"
          cols="40"
          rows="5"
          id="method"
          placeholder="Tell us how you make the food...."
          v-model="method_text"
        ></textarea>
        <div v-if="method_image != ''" class="image-preview">
          <img :src="method_image" alt="" />
          <div class="delete" @click="deleteimage">
            <img src="../assets/cancel.png" alt="" />
          </div>
        </div>
        <p v-else class="img-title">
          <span v-if="this.$store.getters.lan">请上传您的图片</span
          ><span v-else>Please upload your food photo</span>
          <image-upload @newImage="newImage" />
        </p>
        <div class="button">
          <button class="add" @click="addMethod">
            <span v-if="this.$store.getters.lan">添加步骤</span
            ><span v-else>Add Methods</span>
          </button>
        </div>
      </div>
    </div>
    <div class="button">
      <button class="confirm" @click="uploadMethod">
        <span v-if="this.$store.getters.lan">确认修改</span
        ><span v-else>Update</span>
      </button>
      <button class="backbtn" @click="back">
        <span v-if="this.$store.getters.lan">退出</span
        ><span v-else>back</span>
      </button>
    </div>
  </div>
</template>

<script>
import ImageUpload from "./imageUpload.vue";
import PrematertialDiv from "./prematertialDiv.vue";
import PreMethodDiv from "./preMethodDiv.vue";
import axios from "axios";
import cookies from "vue-cookies";

export default {
  components: { PrematertialDiv, ImageUpload, PreMethodDiv },
  data() {
    return {
      ifpreview: false,
      material: "",
      amount: "",
      ingredient: "",
      preview_ingredients: [],
      method_image: "",
      method_text: "",
      pre_methods: [],
      methods: "",
    };
  },
  props: {
    prematerial: {
      type: Array,
    },
    preMethod: {
      type: Array,
    },
    index: {
      type: Number,
    },
    editMethod: {
      type: Object,
    },
  },
  methods: {
    addIngredient() {
      let ingredient = [
        this.material,
        this.amount,
        this.preview_ingredients.length,
      ];
      console.log(ingredient);
      this.preview_ingredients.push(ingredient);
      this.material = "";
      this.amount = "";
      console.log(this.preview_ingredients);
    },
    updateIngredient(data1, data2) {
      console.log(data1);
      console.log(data2);
      this.preview_ingredients.splice(data2, 1, data1);
      console.log(this.preview_ingredients);
    },
    back(){
      console.log("aa")
      window.history.back()
    },
    deleteimage() {
      let filename = this.method_image.replace(
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
          this.method_image = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateMethod(data1, data2) {
      console.log(data1);
      console.log(data2);
      this.pre_methods.splice(data2, 1, data1);
      console.log(this.pre_methods);
    },
    deleteIngredient(data) {
      this.preview_ingredients.splice(data, 1);
      console.log(this.preview_ingredients);
    },
    deleteStep(data) {
      this.pre_methods.splice(data, 1);
      console.log(this.pre_methods);
    },
    newImage(data) {
      this.method_image = data;
    },
    addMethod() {
      let method = [
        this.method_text,
        this.method_image,
        this.pre_methods.length,
      ];
      this.pre_methods.push(method);
      this.method_text = "";
      this.method_image = "";
      console.log(this.pre_methods);
    },
    uploadMethod() {
      console.log(this.editMethod);
      this.ingredient = "";
      for (let i = 0; i < this.preview_ingredients.length; i++) {
        this.ingredient =
          this.ingredient +
          this.preview_ingredients[i][0] +
          "<###**%%###>" +
          this.preview_ingredients[i][1] +
          "<###**^^###>";
      }
      if (this.material != "" || this.amount != "") {
        this.ingredient =
          this.ingredient +
          this.material +
          "<###**%%###>" +
          this.amount +
          "<###**^^###>";
      }
      this.methods = "";
      for (let i = 0; i < this.pre_methods.length; i++) {
        this.methods =
          this.methods +
          this.pre_methods[i][0] +
          "<###**%%###>" +
          this.pre_methods[i][1] +
          "<###**^^###>";
      }
      if (this.method_text != "" || this.method_image != "") {
        this.methods =
          this.methods +
          this.method_text +
          "<###**%%###>" +
          this.method_image +
          "<###**^^###>";
      }
      console.log(this.ingredient)
      console.log(this.methods)
      if (this.methods == "" && this.ingredient == "") {
        if (this.$store.getters.lan) {
          alert("你没有输入任何原料或步骤");
        } else {
          alert("You haven't enter any ingredient and methods..");
        }
      } else {
        axios
          .request({
            url: "https://homedelicious.ml/api/methods",
            method: "patch",
            data: {
              token: cookies.get("token"),
              food_id: this.$store.state.edit_food_id,
              ingredient: this.ingredient,
              process: this.methods,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$store.commit("updateEditStatue", true);
            console.log(this.$store.state.editStatue)
            this.$router.push("/food/" + this.$store.state.edit_food_id);
            this.$store.commit("updateIfeditFood", true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  watch: {
    ifupload(newValue) {
      console.log(newValue);
      if (newValue == true) {
        this.uploadMethod();
      }
    },
    editMethod(newValue) {
      console.log(newValue);
      let ingredient = newValue.ingredient.split("<###**^^###>");
      ingredient.pop();
      for (let i = 0; i < ingredient.length; i++) {
        ingredient[i] = ingredient[i].split("<###**%%###>");
        if (ingredient[i].length == 2) {
          ingredient[i].push(i);
          console.log(ingredient[i]);
        }
      }
      this.preview_ingredients = ingredient;
      console.log(this.preview_ingredients);
      let step = newValue.process.split("<###**^^###>");
      step.pop();
      for (let i = 0; i < step.length; i++) {
        step[i] = step[i].split("<###**%%###>");
        if (step[i].length == 2) {
          step[i].push(i);
          console.log(step[i]);
        }
      }
      this.pre_methods = step;
    },
  },

  computed: {
    method_step() {
      return this.pre_methods.length + 1;
    },
    ifupload() {
      return this.$store.state.ifuploadMethodData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
.method-div {
  box-sizing: border-box;
  padding: 8vw;
  width: 100%;
  min-height: 100vh;
  font-family: $fonts;
  background-color: $bgc;
  // border: 1px solid black;
  display: grid;
  justify-items: center;

  .round {
    width: 2vw;
    height: 2vw;
    border-radius: 50%;
    background-color: $redBgc;
  }
  h2 {
    margin: 2vh 0;
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
  .ingredient-area {
    .ingredient-edit {
      .data {
        margin-bottom: 2vh;
        display: grid;
        grid-template-columns: 1fr 8fr;
        align-items: center;
        input {
          background-color: #fff;
          font-size: 1.2rem;
          line-height: 2rem;
          margin-right: 5vw;
          width: 90%;
        }
      }
    }
    .ingredient-preview {
      display: grid;
      row-gap: 2vh;
      margin: 4vh 0;
    }
  }
  .method-area {
    .method-edit {
      margin-top: 2vh;
      display: grid;
      row-gap: 2vh;
      justify-items: center;
      textarea {
        width: 90%;
        background-color: #fff;
        font-size: 1.2rem;
        line-height: 2rem;
        margin-right: 5vw;
      }
      img {
        justify-self: start;
        width: 90%;
        height: 60vw;
        object-fit: cover;
      }
      .image-preview {
        position: relative;
        .delete {
          position: absolute;
          top: 0;
          right: 10%;
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
    }
  }
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
@media only screen and (min-width: 1280px) {
  .method-div {
    padding: 5vh 0;
    width: 55vw;
    margin-left: 28vw;
    display: grid;
    justify-items: center;
    align-content: center;
    background-color: #fff;
    .round {
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
    h2 {
      margin: 2vh 1em;
    }
    .ingredient-area {
      width: 100%;
      .ingredient-edit {
        width: 80%;
        margin-left: 10%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        .data {
          margin-bottom: 2vh;
          display: grid;
          grid-template-columns: 1fr 8fr;
          align-items: center;
          input {
            background-color: #fff;
            border: 1px solid $fontColordark;
            font-size: 1.2rem;
            line-height: 2rem;
            margin-right: 5vw;
          }
        }
      }
      .ingredient-preview {
        width: 80%;
        display: grid;
        row-gap: 2vh;
        margin: 4vh 10%;
      }
    }
    .method-area {
      width: 100%;
      .method-edit {
        margin-top: 2vh;
        display: grid;
        row-gap: 2vh;
        width: 80%;
        margin-left: 10%;
        justify-items: center;
        h3 {
          margin-left: 0;
        }
        textarea {
          width: 100%;
          background-color: #fff;
          font-size: 1.2rem;
          line-height: 2rem;
          margin-right: 0;
          border: 1px solid $fontColordark;
        }
        img {
          // justify-self: start;
          width: 30vw;
          height: 30vh;
          // margin-left: 7vw;
          object-fit: cover;
        }
        .image-preview {
          position: relative;
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
      }
      .method-preview {
        width: 80%;
        margin-left: 10%;
        display: grid;
        row-gap: 5vh;
      }
    }
    .confirm {
      background-color: $fontColordark;
      color: #fff;
      border-radius: 0.5rem;
      padding: 5px;
      text-transform: uppercase;
      font-family: $fonts;
      border: 1px solid $fontColordark;
      margin-right: 1em;
    }
  }
}
</style>