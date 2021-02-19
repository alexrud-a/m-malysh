<template>
  <b-container class="product">
    <b-row>
      <b-col lg="7" md="12">
        <div class="product__slider" v-if="product.images.length">
          <VueAgile ref="main"
                    :options="options1"
                    :as-nav-for="asNavFor1"
                    class="product__slider-main"
                    @before-change="showCurrentSlide($event)"
          >
            <div v-for="(slide, index) in product.images"
                 :key="index"
                 class="product__slider-main-item"
                 :class="`slide--${index}`">
              <img :src="slide.src" :alt="slide.alt"/>
            </div>
          </VueAgile>
          <VueAgile ref="thumbnails"
                    :options="options2"
                    :as-nav-for="asNavFor2"
                    class="product__slider-thumb"
          >
            <div v-for="(slideThumb, index) in product.images"
                 :key="index"
                 class="product__slider-thumb-item"
                 :class="`product__slider-thumb-item--${index}`"
                 @click="$refs.main.goTo(index)"
            >
              <img :src="slideThumb.src" :alt="slideThumb.alt"/>
            </div>
            <template slot="prevButton">
              <button type="button" class="agile__nav-button agile__nav-button--prev">
                <svg width="25" height="25">
                  <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#right-arrow"></use>
                </svg>
              </button>
            </template>
            <template slot="nextButton">
              <button type="button" class="agile__nav-button agile__nav-button--next">
                <svg width="25" height="25">
                  <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#right-arrow"></use>
                </svg>
              </button>
            </template>
          </VueAgile>
        </div>
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
      <b-col sm="12" class="mb-5">
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
import {VueAgile} from 'vue-agile';

export default {
  name: "Product",
  components: {ProductCard, VueAgile},
  data() {
    return {
      product: {},
      featured: [],

      activeSlide: 0,

      asNavFor1: [],
      asNavFor2: [],

      options1: {
        dots: false,
        fade: true,
        navButtons: false
      },

      options2: {
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5
            }
          },

          {
            breakpoint: 1000,
            settings: {
              navButtons: true
            }
          }
        ]

      },
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
    showCurrentSlide (event) {
      this.activeSlide = event.nextSlide;
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
    ]),
  },
  watch: {
    $route(to, from) {
      if (from.path !== to.path) {
        this.GET_PRODUCTS()
            .then((response) => {
              if (response.data) {
                this.product = response.data.filter(item => item.slug === this.$route.params.slug)[0];
                this.featured = response.data.filter(item => item.featured).slice(0, 3);
              }
            });
      }
    }
  },
  mounted() {
    this.asNavFor1.push(this.$refs.thumbnails)
    this.asNavFor2.push(this.$refs.main)
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