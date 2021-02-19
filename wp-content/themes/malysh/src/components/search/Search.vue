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
      <b-col sm="6"
             md="4"
             lg="3"
             v-for="item in content"
             :key="item.id"
      >
        <ProductCard :product="item"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {WooCommerce} from '../../consts';
import ProductCard from "@/components/shop/ProductCard";

export default {
  name: "Search",
  components: {ProductCard},
  data() {
    return {
      content: [],
    }
  },
  methods: {
    searching() {
      WooCommerce.get('products', {
        search: this.$route.query.search,
      })
          .then((response) => {
            this.content = response.data;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
    },
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