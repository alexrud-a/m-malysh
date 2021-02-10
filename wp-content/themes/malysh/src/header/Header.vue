<template>
  <header id="header">
    <b-container>
      <b-row>
        <b-col md="4">
          <p>
            Есть вопросы? - Позвони
          </p>
          <a href="#">
            +7 (961) 109-00-39
          </a>
        </b-col>
        <b-col md="4">
          <img :src="logoUrl"/>
        </b-col>
        <b-col md="4"></b-col>
      </b-row>
    </b-container>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: "Header",
  data() {
    return {
      logoUrl: ''
    }
  },
  methods: {
    getContent() {
      return axios('http://m-malysh.ru/wp-json/wp/v2/', {
        method: "GET"
      })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
  },
  created() {
    console.log(window.logo);
    this.logoUrl = window.logo;
  }
}
</script>

<style scoped>

</style>