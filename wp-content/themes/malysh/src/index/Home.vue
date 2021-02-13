<template>
  <div id="app" class="home">
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
      <b-row>
        <b-col lg="7" md="6">
          <div class="cat cat--big">
            <b-link :href="'/product-category/'+categories[0].slug">
              <img :src="categories[0].image.src"
                   :alt="categories[0].image.alt"
                   class="img-fluid cat__img"
              >
            </b-link>
            <p class="cat__name">
              {{categories[0].name}}
            </p>
            <b-link :href="'/product-category/'+categories[0].slug"
                    class="btn btn-blue"
            >
              В каталог
            </b-link>
          </div>
        </b-col>
        <b-col lg="5" md="6">
          <div class="cat cat--min">
            <b-link :href="'/product-category/'+categories[1].slug">
              <img :src="categories[1].image.src"
                   :alt="categories[1].image.alt"
                   class="img-fluid cat__img"
              >
            </b-link>
            <p class="cat__name">
              {{categories[1].name}}
            </p>
            <b-link :href="'/product-category/'+categories[1].slug"
                    class="btn btn-blue"
            >
              Смотреть
            </b-link>
          </div>
          <div class="cat cat--min">
            <b-link :href="'/product-category/'+categories[2].slug">
              <img :src="categories[2].image.src"
                   :alt="categories[2].image.alt"
                   class="img-fluid cat__img"
              >
            </b-link>
            <p class="cat__name">
              {{categories[2].name}}
            </p>
            <b-link :href="'/product-category/'+categories[2].slug"
                    class="btn btn-blue"
            >
              Смотреть
            </b-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import { VueAgile } from 'vue-agile';

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
      categories: [],
    }
  },
  components: {
    VueAgile,
  },
  methods: {
    getContent() {
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/35', {
        method: "GET"
      })
          .then((response) => {
            this.slider = response.data.acf.slider;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
    getCategory() {
      WooCommerce.get('products/categories', {
        per_page: 3,
        exclude: 16,
        orderby: 'count'
      })
          .then((response) => {
            console.log(response);
            this.categories = response.data;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    }
  },
  created() {
    this.getContent();
    this.getCategory();
  }
}
</script>

<style lang="scss">
.main-slider {
  margin: 20px auto;
}

.agile {
  &__nav-button {
    border: none;
    background-color: transparent;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &--prev {
      left: 0;

      svg {
        transform: rotate(180deg);
      }
    }

    &--next {
      right: 0;
    }
  }

  &__dots {
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    justify-content: center;
  }

  &__dot {
    margin: 0 3px;

    button {
      width: 10px;
      height: 10px;
      background: transparent;
      border: 1px solid #303030;
      border-radius: 50%;
      transition: all .3s ease-in-out;
      padding: 0;
    }

    &--current {
      button {
        background-color: #303030;
      }
    }
  }
}

.cat {
  text-align: center;
  margin-bottom: 20px;

  &__img {
    width: 100%;
  }

  &__name {
    font-size: 24px;
    font-weight: bold;
  }

  &--big {
    .cat__name {
      margin: 40px auto;
    }
  }

  &--min {
    position: relative;

    .cat__name {
      position: absolute;
      top: 40%;
      left: 15%;
    }
    .btn {
      position: absolute;
      top: 60%;
      left: 15%;
    }
  }
}
</style>