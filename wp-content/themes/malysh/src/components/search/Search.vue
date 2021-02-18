<template>
  <b-container>
    <b-row>
      <b-col sm="12">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            Главная
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            Результаты поиска
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
      <b-col sm="12">
        <h1>
          Результаты по запросу: «{{ this.$route.query.search }}»
        </h1>
      </b-col>
      <b-col sm="12"
             v-for="item in content"
             :key="item.id"
      >
        <b-card class="mb-2">
          <b-card-text>
            <router-link :to="item.url.replace('https://m-malysh.ru/', '')">
              {{item.title}}
            </router-link>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      content: [],
    }
  },
  methods: {
    searching() {
      return axios('https://m-malysh.ru/wp-json/wp/v2/search', {
        method: "GET",
        search: this.$route.query.search,
        type: 'post',
        subtype: 'product'
      })
          .then((response) => {
            console.log(response);
            this.content = response.data;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    }
  },
  watch: {
    $route(to, from) {
      if (from.path !== to.path) {
        this.searching();
      }
    }
  },
  created() {
    this.searching();
  }
}
</script>

<style scoped>

</style>