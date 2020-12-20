<template>
  <div class="prematerial-div">
    <div class="round"></div>
    <input class="material" type="text" name="" v-model="new_material" />
    <input class="amount" type="text" name="" v-model="new_amount" />
    <img v-if="edit" src="../assets/confirm.png" alt="" @click="Confirm" />
    <img src="../assets/delete.png" alt="" @click="Delete" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      new_material: "",
      new_amount: "",
    };
  },
  props: {
    prematerial: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    Confirm() {
      let new_ingredient = [this.new_material, this.new_amount];
      console.log(new_ingredient);
      this.$emit("updateIngredient", new_ingredient, this.index);
      this.edit = false;
    },
    Delete() {
      console.log(this.index);
      this.$emit("deleteIngredient", this.index);
    },
  },
  watch: {
    new_material(newValue) {
      // let data = [newValue, this.new_amount];
      let data = newValue+ "<###**%%###>" +this.new_amount;
      console.log(data);
      this.$emit("updateIngredient", data, this.index);
    },
    new_amount(newValue) {
      let data = this.new_material+ "<###**%%###>" +newValue;
      console.log(data);
      this.$emit("updateIngredient", data, this.index);
    },
    // prematerial(newValue){
    // console.log(newValue)

    // },
    // },
    // computed: {
    //   material() {
    //     return this.prematerial[0];
    //   },
    //   amount() {
    //     return this.prematerial[1];
    //   },
    // },
  },
    mounted() {
      // this.new_material = this.material;
      // this.new_amount = this.amount;
      console.log(this.prematerial)
      let step = this.prematerial.split("<###**%%###>");
      this.new_material = step[0];
      this.new_amount = step[1];
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.prematerial-div {
  display: grid;
  grid-template-columns: 1fr 7fr 7fr 1fr;
  column-gap: 1em;
  font-size: 1.2rem;
  font-family: $fonts;
  align-items: center;

  .round {
    width: 2vw;
    height: 2vw;
    border-radius: 50%;
    background-color: $redBgc;
  }
  .material,
  .amount {
    width: 100%;
  }
  input {
    background-color: #fff;
    line-height: 2rem;
  }
  img {
    height: 1.5rem;
    background-color: $fontColorlight;
    padding: 0.2em;
    border-radius: 0.2em;
    align-self: center;
  }
}
@media only screen and (min-width: 1280px) {
  .prematerial-div {
    display: grid;
    grid-template-columns: 1fr 7fr 7fr 1fr;
    column-gap: 2em;
    width: 90%;

    .round {
      width: 15px;
      height: 15px;
    }
    input {
      background-color: #fff;
      width: 15vw;
      border: 1px solid $fontColordark;
    }
    img {
      height: 1.5rem;
      background-color: $fontColorlight;
      padding: 0.2em;
      border-radius: 0.2em;
    }
  }
}
</style>