<template>
  <b-container>
    <b-row>
      <b-col sm="12">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            Главная
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            Избранное
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
      <b-col sm="12">
        <h1>
          Товары, добавленные в избранное
        </h1>
      </b-col>
      <template v-if="wishlist_data.length">
        <b-col sm="6"
               md="4"
               lg="3"
               v-for="item in wishlist_data"
               :key="item.id"
        >
          <ProductCard :product="item" @changeWishList="changeWishList(item)"/>
        </b-col>
      </template>
      <template v-else>
        <b-col sm="12">
          <h2>
            Вы пока не добавили в избранное ни одного товара
          </h2>
        </b-col>
      </template>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ProductCard from "@/components/shop/ProductCard";

export default {
  name: "Wishlist",
  data() {
    return {
      wishlist_data: []
    }
  },
  components: {ProductCard},
  methods: {
    ...mapActions([
      'CHANGE_WISHLIST',
    ]),
    changeWishList(item) {
      this.CHANGE_WISHLIST(item);
    }
  },
  computed: {
    ...mapGetters([
      'WISHLIST'
    ]),
  },
  mounted() {
    this.wishlist_data = this.WISHLIST;
  }
}
</script>

<style scoped>

</style>