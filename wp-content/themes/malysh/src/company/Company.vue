<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col sm="12">
          <div v-if="content.length > 0" v-html="content">
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Company",
  data() {
    return {
      content: [],
    }
  },
  methods: {
    getContent() {
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/73', {
        method: "GET"
      })
          .then((response) => {
            this.content = response.data.content.rendered;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
  },
  created() {
    this.getContent();
  }
}
</script>

<style scoped>

</style>