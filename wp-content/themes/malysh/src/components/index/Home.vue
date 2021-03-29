<template>
  <b-container>
    <b-row>
      <b-col sm="12">
        <template v-if="slider.length > 0">
          <VueAgile class="main-slider">
            <img v-for="(slide, ind) in slider"
                 :key="ind"
                 :src="slide.url"
                 :alt="slide.alt"
            >
            <template slot="prevButton">
              <svg width="25" height="25">
                <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#right-arrow"/>
              </svg>
            </template>
            <template slot="nextButton">
              <svg width="25" height="25">
                <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#right-arrow"/>
              </svg>
            </template>
          </VueAgile>
        </template>
      </b-col>
    </b-row>
    <b-row v-if="categories.length > 0">
      <b-col lg="7" md="6">
        <div class="cat cat--big">
          <router-link :to="{ name: 'Category', params: {slug: categories[0].slug}}">
            <img :src="categories[0].image.src"
                 :alt="categories[0].image.alt"
                 class="img-fluid cat__img"
            >
          </router-link>
          <p class="cat__name">
            {{ categories[0].name }}
          </p>
          <router-link :to="{ name: 'Category', params: {slug: categories[0].slug}}"
                  class="btn btn-blue"
          >
            В каталог
          </router-link>
        </div>
      </b-col>
      <b-col lg="5" md="6">
        <div class="cat cat--min">
          <router-link :to="{ name: 'Category', params: {slug: categories[1].slug}}">
            <img :src="categories[1].image.src"
                 :alt="categories[1].image.alt"
                 class="img-fluid cat__img"
            >
          </router-link>
          <p class="cat__name">
            {{ categories[1].name }}
          </p>
          <router-link :to="{ name: 'Category', params: {slug: categories[1].slug}}"
                  class="btn btn-blue"
          >
            Смотреть
          </router-link>
        </div>
        <div class="cat cat--min">
          <router-link :to="{ name: 'Category', params: {slug: categories[2].slug}}">
            <img :src="categories[2].image.src"
                 :alt="categories[2].image.alt"
                 class="img-fluid cat__img"
            >
          </router-link>
          <p class="cat__name">
            {{ categories[2].name }}
          </p>
          <router-link :to="{ name: 'Category', params: {slug: categories[2].slug}}"
                  class="btn btn-blue"
          >
            Смотреть
          </router-link>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="content.length > 0" class="justify-content-center mt-5 mb-5">
      <b-col class="content-text">
        <div v-html="content"></div>
      </b-col>
    </b-row>
    <b-row v-if="advantages.length > 0"
           class="advantages justify-content-center"
    >
      <div class="advantages__item"
           v-for="(advantage, ind) in advantages"
           :key="ind"
      >
        <svg width="80" height="80">
          <use :xlink:href="'/wp-content/themes/malysh/img/sprite.svg#'+advantage.icon"/>
        </svg>
        <p class="advantages__text">
          {{ advantage.text }}
        </p>
      </div>
      <b-col sm="12" class="text-center mt-5">
        <router-link :to="{name: 'Shop'}"
                class="btn btn-blue"
        >
          В каталог
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import {VueAgile} from 'vue-agile';

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
  url: 'https://m-malysh.ru/',
  consumerKey: 'ck_882f64624ce39da4e32ba6797db5c14368f82a02', // Your consumer key
  consumerSecret: 'cs_abf9fc9ebef7255c861e493beb3363bcb31a2407', // Your consumer secret
  version: 'wc/v3' // WooCommerce WP REST API version
});

export default {
  name: "Home",
  data() {
    return {
      slider: [],
      content: [],
      advantages: [],
      categories: [],
      meta: [],
      metaTitle: '',
    }
  },
  metaInfo() {
    return {
      title: this.metaTitle,
      meta: this.meta,
    }
  },
  components: {
    VueAgile,
  },
  methods: {
    getCategory() {
      WooCommerce.get('products/categories', {
        per_page: 3,
        include: [66, 55, 47],
        exclude: 16,
        hide_empty: true,
        parent: 0,
        orderby: 'include'
      })
          .then((response) => {
            this.categories = response.data;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
    getContent() {
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/35', {
        method: "GET"
      })
          .then((response) => {
            this.slider = response.data.acf.slider;
            this.content = response.data.content.rendered;
            this.advantages = response.data.acf.advantages;
            this.meta = response.data.yoast_meta;
            this.metaTitle = response.data.yoast_title;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
  },
  created() {
    this.$emit('loaded', false);
    axios.all([this.getCategory(), this.getContent()])
        .then(() => {
          this.$emit('loaded', true)
        });
  }
}
</script>

<style>

</style>