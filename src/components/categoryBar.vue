<template>
  <div class="category-bar">
    <div class="outside">
      <div class="category-div">
        <div
          class="icon"
          id="fry"
          :style="{ backgroundColor: bgcFry }"
          @click="selectWay('fry')"
        >
          <img src="../assets/frying-pan.png" alt="" />
        </div>
        <div
          class="icon"
          id="stew"
          :style="{ backgroundColor: bgcStew }"
          @click="selectWay('stew')"
        >
          <img src="../assets/pot.png" alt="" />
        </div>
        <div
          class="icon"
          id="bake"
          :style="{ backgroundColor: bgcBake }"
          @click="selectWay('bake')"
        >
          <img src="../assets/oven.png" alt="" />
        </div>
        <div
          class="icon"
          id="deep fry"
          :style="{ backgroundColor: bgcDeepFry }"
          @click="selectWay('deep fry')"
        >
          <img src="../assets/fryer.png" alt="" />
        </div>
        <div
          class="icon"
          id="salad"
          :style="{ backgroundColor: bgcSalad }"
          @click="selectWay('salad')"
        >
          <img src="../assets/salad.png" alt="" />
        </div>
        <div
          class="icon"
          id="steam"
          :style="{ backgroundColor: bgcSteam }"
          @click="selectWay('steam')"
        >
          <img src="../assets/steamer.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgcFry: "#FFCAD4",
      bgcStew: "#F3F6F4",
      bgcBake: "#F3F6F4",
      bgcDeepFry: "#F3F6F4",
      bgcSalad: "#F3F6F4",
      bgcSteam: "#F3F6F4",
    };
  },
  methods: {
    selectWay(data) {
      console.log(data);
      if (data == "fry") {
        this.bgcFry = "#FFCAD4";
        this.bgcStew = "#F3F6F4";
        this.bgcBake = "#F3F6F4";
        this.bgcDeepFry = "#F3F6F4";
        this.bgcSalad = "#F3F6F4";
        this.bgcSteam = "#F3F6F4";
        this.$store.commit("updateHomeListChoice", data);
      } else if (data == "stew") {
        this.bgcFry = "#F3F6F4";
        this.bgcStew = "#FFCAD4";
        this.bgcBake = "#F3F6F4";
        this.bgcDeepFry = "#F3F6F4";
        this.bgcSalad = "#F3F6F4";
        this.bgcSteam = "#F3F6F4";
        this.$store.commit("updateHomeListChoice", data);
      } else if (data == "bake") {
        this.bgcFry = "#F3F6F4";
        this.bgcStew = "#F3F6F4";
        this.bgcBake = "#FFCAD4";
        this.bgcDeepFry = "#F3F6F4";
        this.bgcSalad = "#F3F6F4";
        this.bgcSteam = "#F3F6F4";
        this.$store.commit("updateHomeListChoice", data);
      } else if (data == "deep fry") {
        this.bgcFry = "#F3F6F4";
        this.bgcStew = "#F3F6F4";
        this.bgcBake = "#F3F6F4";
        this.bgcDeepFry = "#FFCAD4";
        this.bgcSalad = "#F3F6F4";
        this.bgcSteam = "#F3F6F4";
        this.$store.commit("updateHomeListChoice", data);
      } else if (data == "salad") {
        this.bgcFry = "#F3F6F4";
        this.bgcStew = "#F3F6F4";
        this.bgcBake = "#F3F6F4";
        this.bgcDeepFry = "#F3F6F4";
        this.bgcSalad = "#FFCAD4";
        this.bgcSteam = "#F3F6F4";
        this.$store.commit("updateHomeListChoice", data);
      } else if (data == "steam") {
        this.bgcFry = "#F3F6F4";
        this.bgcStew = "#F3F6F4";
        this.bgcBake = "#F3F6F4";
        this.bgcDeepFry = "#F3F6F4";
        this.bgcSalad = "#F3F6F4";
        this.bgcSteam = "#FFCAD4";
        this.$store.commit("updateHomeListChoice", data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.category-bar {
  .outside {
    width: 90%;
    margin-left: 5%;
    height: 10vh;
    overflow: hidden;
    .category-div {
      height: 11vh;
      display: grid;
      padding-left: 2vw;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      overflow-x: scroll;
      .icon {
        height: 7vh;
        width: 7vh;
        margin-right: 8vw;
        background-color: $barBgc;
        border-radius: 50%;
        display: grid;
        justify-items: center;
        align-items: center;
        filter: $shadow;
        img {
          height: 60%;
        }
      }
      .fry {
        background-color: $redBgc;
      }
    }
  }
}
@media only screen and (min-width: 1280px) {
  .category-bar {
    .outside {
      width: 100%;
      margin-left: 0;
      height: 10vh;
      .category-div {
        height: 11vh;
        display: grid;
        padding: 0 2vw;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        overflow-x: hidden;

        .icon {
          height: 4em;
          width: 4em;
          margin-right: 0;
          background-color: $barBgc;
          border-radius: 50%;
          display: grid;
          justify-items: center;
          align-items: center;
          filter: $shadow;
          img {
            height: 60%;
          }
        }
        .fry {
          background-color: $redBgc;
        }
      }
    }
  }
}
</style>