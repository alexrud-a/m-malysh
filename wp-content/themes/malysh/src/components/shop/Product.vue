<template>
  <b-container class="product mb-5">
    <b-row v-if="product && Object.keys(product).length !== 0">
      <b-col sm="12">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            Главная
          </b-breadcrumb-item>
          <b-breadcrumb-item v-for="cat in sortedBreadcrumbsCat"
                             :key="cat.id"
                             :href="'/category/'+cat.slug"
          >
            {{ cat.name }}
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            {{ product.name }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
      <b-col xl="7" lg="6" md="12">
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
        <div v-if="!product.images.length">
          <img src="/wp-content/plugins/woocommerce/assets/images/placeholder.png" class="img-fluid"/>
        </div>
      </b-col>
      <b-col xl="5" lg="6" md="12">
        <h1 class="mt-5">
          {{ product.name }}
        </h1>
        <div class="product__variations">
<!--          <span class="product__price"-->
<!--                v-if="currentVariation && currentVariation.price">{{ currentVariation.price | formattedPrice }} ₽</span>-->
<!--          <span class="product__price" v-else v-html="product.price_html"></span>-->
          <template v-if="product">
            <span class="product__price" v-html="price()"></span>
          </template>
          <span class="sup"> | </span>
          <span :class="product.stock_quantity === 'instock' ? 'color-l-gray' : ''">В наличии</span>
          <span class="sup"> | </span>
          <span :class="product.stock_quantity !== 'instock' ? 'color-l-gray' : ''">На заказ</span>
        </div>
        <b-form class="filter" v-if="product.attributes">
          <b-form-group v-for="attribute in product.attributes"
                        :key="attribute.id"
                        :label="attribute.name"
                        :class="{'d-none' : attribute.id === 5}"
          >
            <b-form-radio-group
                v-if="attribute.id !== 5"
                :id="'checkbox-group-'+attribute.id"
                :class="'checkbox-'+attribute.id"
                v-model="variationsOption[attribute.id]"
                stacked
            >
              <TableSize v-if="attribute.id === 2"/>
              <b-form-radio
                  v-for="(option, i) in attribute.options"
                  :key="i"
                  :value="option"
                  :style="'background-color:' + option"
                  @change="changeVariation"
              >
                {{ option }}
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-form>
        <b-btn class="btn-blue mr-4"
               @click="addCart"
        >
          <svg width="25" height="25" fill="#fff" class="mr-2">
            <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#shopping-bag"/>
          </svg>
          В корзину
        </b-btn>
        <b-btn class="btn-blue"
               @click="changeWishlist(product)"
        >
          <svg width="25" height="25" fill="#fff" class="mr-2">
            <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#like"/>
          </svg>
          В избранное
        </b-btn>
        <br/>
        <b-link v-b-modal.order-modal class="product__link-order">
          Заказать в один клик
        </b-link>
        <hr/>
        <b-modal id="order-modal" centered hide-footer title="Купить в 1 клик">
          <Order1Click :product="product" :currentVariation="currentVariation"/>
        </b-modal>
        <div class="tabs-collapse mb-4">
          <b-link v-b-toggle.short_description class="tabs-collapse__link">
            <span class="border-bottom-0">
              Описание
            </span>
            <svg width="10" height="10">
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#right-arrow"/>
            </svg>
          </b-link>
          <b-collapse id="short_description" class="pt-4">
            <div v-html="product.short_description" class="color-gray"></div>
          </b-collapse>
        </div>

        <div class="tabs-collapse mb-4">
          <b-link v-b-toggle.description class="tabs-collapse__link">
            <span class="border-bottom-0">
              О товаре
            </span>
            <svg width="10" height="10">
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#right-arrow"/>
            </svg>
          </b-link>
          <b-collapse id="description" class="pt-4">
            <div v-html="product.description" class="color-gray"></div>
          </b-collapse>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="featured.length">
      <b-col sm="12" class="mt-5 mb-5">
        <h2 class="text-center">
          Рекомендуем
        </h2>
      </b-col>
      <b-col lg="3" md="6"
             v-for="feature in featured"
             :key="feature.id">
        <ProductCard :product="feature" @changeWishlist="changeWishlist(feature)"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {WooCommerce} from "@/consts";
import {mapActions, mapGetters} from "vuex";
import ProductCard from "@/components/shop/ProductCard";
import {VueAgile} from 'vue-agile';
import Order1Click from "@/components/forms/Order1Click";
import TableSize from "@/components/modals/TableSize";
import {formattedPrice} from "@/utils";

export default {
  name: "Product",
  components: {TableSize, Order1Click, ProductCard, VueAgile},
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
      variationsOption: {
        2: '',
        3: '',
        4: '',
      },
      variations: [],
      currentVariation: {},
    }
  },
  metaInfo() {
    return {
      title: 'Мой малыш - Товары',
    }
  },
  filters: {
    formattedPrice
  },
  methods: {
    ...mapActions([
      'ADD_CART',
      'CHANGE_WISHLIST',
      'GET_PRODUCTS'
    ]),
    addCart() {
      if (this.product.type === 'variable' && this.product.attributes.length) {
        this.product.variation_id = this.currentVariation.id;
        this.product.current = this.currentVariation;
      }
      this.ADD_CART(this.product);
    },
    changeWishlist(product) {
      this.CHANGE_WISHLIST(product);
    },
    showCurrentSlide(event) {
      this.activeSlide = event.nextSlide;
    },
    changeVariation() {
      this.currentVariation = this.variations.slice().filter(item => {
        return item.attributes.findIndex(attr => attr['option'] === this.variationsOption[2]) !== -1
      }).filter(item => {
        return item.attributes.findIndex(attr => attr['option'] === this.variationsOption[3]) !== -1
      }).filter(item => {
        return item.attributes.findIndex(attr => attr['option'] === this.variationsOption[4]) !== -1
      })[0];
    },
    getVariations() {
      WooCommerce.get('products/' + this.product.id + '/variations')
          .then((response) => {
            this.variations = response.data;
            this.changeVariation();
            return response;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
    },
    price() {
      let price;
      if (this.USER.ID && this.USER.roles.findIndex(role => role === 'opt_customer') !== -1) {
        if (this.product.type === 'variable') {
          if (this.currentVariation.meta_data && this.currentVariation.meta_data.findIndex(item => item.key === 'wholesale_customer_wholesale_price') !== -1) {
            price = formattedPrice(
                this.currentVariation.meta_data
                    .filter(item => item.key === 'wholesale_customer_wholesale_price')[0].value
            ) + ' ₽';
          } else {
            price = this.currentVariation.price_html;
          }
        } else {
          if (this.product.meta_data && this.product.meta_data.findIndex(item => item.key === 'wholesale_customer_wholesale_price') !== -1) {
            price = formattedPrice(
                this.product.meta_data
                    .filter(item => item.key === 'wholesale_customer_wholesale_price')[0].value
            ) + ' ₽';
          } else {
            price = this.product.price_html;
          }
        }

      } else {
        if (this.product.type === 'variable' && this.currentVariation) {
          price = formattedPrice(this.currentVariation.price) + ' ₽';
        } else {
          price = this.product.price_html;
        }
      }

      return price
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'USER'
    ]),
    sortedBreadcrumbsCat() {
      return this.product.categories.slice().sort((a, b) => a.id - b.id);
    }
  },
  watch: {
    $route(to, from) {
      if (from.path !== to.path) {
        this.GET_PRODUCTS()
            .then((response) => {
              if (response.data) {
                this.product = response.data.filter(item => item.slug === this.$route.params.slug)[0];
                this.featured = response.data.filter(item => item.featured).slice(0, 4);
              }
            });
      }
    }
  },
  mounted() {
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
  },
  created() {
    this.GET_PRODUCTS()
        .then((response) => {
          if (response.data) {
            this.product = response.data.filter(item => item.slug === this.$route.params.slug)[0];
            this.featured = response.data.filter(item => this.product.related_ids.findIndex(el => item.id === el) !== -1).slice(0, 3);
            if (this.product.type === 'variable' && this.product.attributes) {
              this.variationsOption[2] = this.product.attributes[1].options[0];
              this.variationsOption[3] = this.product.attributes[2].options[0];
              this.variationsOption[4] = this.product.attributes[3].options[0];
              this.getVariations();
            }
          }
        });
  },
}
</script>

<style scoped>

</style>