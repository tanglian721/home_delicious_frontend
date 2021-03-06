<template>
  <div class="image-upload">
    <img v-if="loading" src="../assets/LoadingPreview.gif" alt="" />
    <input
      v-else
      type="file"
      accept="image/*"
      @change="onchange"
      id="file-input"
    />
  </div>
</template>

<script>
// import ImageUploader from "vue-image-upload-resize";
import cookies from "vue-cookies"
import axios from "axios";
export default {
  components: {
    // ImageUploader,
  },
  data() {
    return {
      user: cookies.get('user'),
      name: "",
      url: "",
      loading: false,
    };
  },
  methods: {
    onchange(e) {
      this.loading = true;
      const file = e.target.files[0];
      this.name = this.user.user_id + "_food_" + file.name;
      let formData = new FormData();
      formData.set("file", file, this.name);
      axios
        .post("https://homedelicious.ml/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.url = "https://homedelicious.ml/img/uploadImgs/" + this.name;
          this.$emit("newImage", this.url);
          this.loading = false;
        });
    },
  },
  mounted () {
    if (this.$router.history.current.path == "/login" ||  cookies.get('user') == undefined) {
      this.user = "user_icon"
  }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
// @import "https://unpkg.com/vuetify/dist/vuetify.min.css";

.image-upload {
    font-family: $fonts;
    font-size: 0.8rem;
  width: 100%;
  display: grid;
  justify-items: center;
  #file-input {
    width: 100%;
    border: None;
  }
  img {
    width: 100px;
  }
}
@media only screen and (min-width: 992px) {
  img{
    margin-left: -50%;
  }
}
</style>