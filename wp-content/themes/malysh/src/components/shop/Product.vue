<template>
  <b-container class="product">
    <b-row>
      <b-col lg="7" md="12">

      </b-col>
      <b-col lg="5" md="12">
        <h1 class="mt-5">
          {{ product.name }}
        </h1>
        <div class="product__variations">
          <div class="product-card__price" v-html="product.price_html"></div>
          <span> | </span>
          <div>В наличии</div>
          <span> | </span>
          <div>На заказ</div>
        </div>
        <div class="product__colors">
          Цвет
        </div>
        <div class="product__sizes">
          Размеры
        </div>
        <b-btn class="btn-blue">
          В корзину
        </b-btn>
        <b-btn class="btn-blue">
          В избранное
        </b-btn>
        <b-link>
          Заказать в один клик
        </b-link>
        <h4>
          О товаре
        </h4>
        <div v-html="product.short_description"></div>
        <h4>
          Описание
        </h4>
        <div v-html="product.description"></div>
        <p>
          Поделиться
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <h2 class="text-center">
          Рекомендуем
        </h2>
      </b-col>
      <b-col md="3" sm="6"
             v-for="feature in featured"
             :key="feature.id">
        <ProductCard :product="feature"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProductCard from "@/components/shop/ProductCard";

export default {
  name: "Product",
  components: {ProductCard},
  data() {
    return {
      product: {},
      featured: []
    }
  },
  methods: {
    ...mapActions([
      'ADD_CART',
      'GET_PRODUCTS',
    ]),
    addCart() {
      this.ADD_CART(this.product);
    },

  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
    ]),

  },
  created() {
    this.GET_PRODUCTS()
        .then((response) => {
          if (response.data) {
            this.product = response.data.filter(item => item.slug === this.$route.params.slug)[0];
            this.featured = response.data.filter(item => item.featured).slice(0, 3);
          }
        });
  },
}
</script>

<style scoped>

</style>