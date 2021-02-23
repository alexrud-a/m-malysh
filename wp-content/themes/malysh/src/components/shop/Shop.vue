<template>
  <b-container>
    <b-row>
      <b-col sm="12">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            Главная
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            {{ title }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
      <b-col lg="3" md="4">
        <ProductFilter :filters="filters"
                       :isFilterActive="isFilterActive"
                       @filtered="filteredProducts"
                       @reset="resetFilters"
        />
      </b-col>
      <b-col lg="9" md="8">
        <div class="catalog">
          <h1>
            {{ title }}
          </h1>
          <div v-if="content.length" v-html="content"></div>
          <b-container v-if="products.length" class="mt-4 mb-5">
            <b-row class="justify-content-between">
              <div>
                <b-link href="#"
                        class="sorted-link"
                        :class="{'sorted-link--active': sortType === 'date'}"
                        @click.prevent="filteredProducts(null, 'date')"
                >
                  по новизне
                </b-link>
                <b-link href="#"
                        class="sorted-link"
                        :class="{'sorted-link--active': sortType === 'price'}"
                        @click.prevent="filteredProducts(null, 'price')"
                >
                  по цене
                </b-link>
                <b-link href="#"
                        class="sorted-link"
                        :class="{'sorted-link--active': sortType === 'rated'}"
                        @click.prevent="filteredProducts(null, 'rated')"
                >
                  по популярности
                </b-link>
              </div>
              <div>
                <span>{{ products.length }} товаров | </span>
                <span>Стр. {{ page }} / {{ setPages }}</span>
                <span v-if="page > 1"> | </span>
                <b-link class="pagination-link"
                        v-if="page > 1"
                        href="#"
                        @click.prevent="page = page - 1"
                >
                  Предыдущая
                </b-link>
                <span v-if="page < setPages"> | </span>
                <b-link class="pagination-link"
                        v-if="page < setPages"
                        href="#"
                        @click.prevent="page = page + 1"
                >
                  Следующая
                </b-link>
              </div>
            </b-row>
          </b-container>
          <b-container class="p-0 mb-5" v-if="products.length > 0">
            <b-row>
              <b-col md="4"
                     sm="6"
                     v-for="product in filtered"
                     :key="product.id"
              >
                <ProductCard :product="product" @changeWishList="changeWishList(product)"/>
              </b-col>
            </b-row>
          </b-container>
          <p v-else>
            Товаров не найдено
          </p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import {mapActions, mapGetters} from 'vuex';
import {containsAttributes} from "@/utils";
import ProductFilter from "@/components/shop/ProductFilter";
import ProductCard from "@/components/shop/ProductCard";

export default {
  name: "Shop",
  components: {ProductFilter, ProductCard},
  data() {
    return {
      title: '',
      content: [],
      products: [],
      sourcedProducts: [],
      page: 1,
      pages: [],
      per_page: 9,
      isFilterActive: false,
      filters: {
        categories: [],
        selected_categories: [],

        subCategories: [],
        selected_subCategories: [],

        sizes: [],
        selected_sizes: [],

        height: [],
        selected_height: [],

        price: {
          min: null,
          max: null,
        },

        selected_price: {
          min: null,
          max: null,
        }
      },
      sortType: 'date',
    }
  },
  metaInfo() {
    return {
      title: this.title,
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CATEGORIES',
      'SUBCATEGORIES',
      'SIZES',
      'HEIGHT',
      'CART',
    ]),
    setPages() {
      let self = this;
      self.pages = Math.ceil(self.products.length / self.per_page);
      return self.pages
    },
    filtered() {
      let from = (this.page - 1) * this.per_page;
      let to = from + this.per_page;
      if (this.products.length) {
        return this.products.slice(from, to);
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS',
      'GET_CATEGORIES',
      'GET_SUBCATEGORIES',
      'GET_SIZES',
      'GET_HEIGHT',
      'CHANGE_WISHLIST'
    ]),
    changeWishList(product) {
      this.CHANGE_WISHLIST(product);
    },
    getContent() {
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/28', {
        method: "GET"
      })
          .then((response) => {
            this.title = response.data.title.rendered;
            this.content = response.data.content.rendered;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
    filteredProducts(filters, sort) {
      if (filters !== null) {
        this.filters = filters;
      }
      this.isFilterActive = true;
      //выбираем все товары которые есть в выбранных категориях
      let filtersProducts = this.sourcedProducts.slice();
      if (this.filters.selected_categories.length) {
        filtersProducts = filtersProducts.filter(product => {
          let arrCat = product.categories.map(cat => cat.id);
          return arrCat.filter(obj => this.filters.selected_categories.indexOf(obj) >= 0).length > 0
        })
      }
      //Атрибут подкатегория
      if (this.filters.selected_subCategories.length) {
        filtersProducts = filtersProducts.filter((product) => {
          if (product.attributes.length > 0) {
            let attrInd = product.attributes.findIndex((attribute) => attribute.id === 5)
            if (attrInd !== -1) {
              let res = containsAttributes(product.attributes[attrInd].options, this.filters.selected_subCategories);
              if (res) {
                return product;
              }
            }
          }
        });
      }
      //Атрибут размер
      if (this.filters.selected_sizes.length) {
        filtersProducts = filtersProducts.filter((product) => {
          if (product.attributes.length > 0) {
            let attrInd = product.attributes.findIndex((attribute) => attribute.id === 2)
            if (attrInd !== -1) {
              let res = containsAttributes(product.attributes[attrInd].options, this.filters.selected_subCategories);
              if (res) {
                return product;
              }
            }
          }
        });
      }
      //Атрибут рост
      if (this.filters.selected_height.length) {
        filtersProducts = filtersProducts.filter((product) => {
          if (product.attributes.length > 0) {
            let attrInd = product.attributes.findIndex((attribute) => attribute.id === 3)
            if (attrInd !== -1) {
              let res = containsAttributes(product.attributes[attrInd].options, this.filters.selected_subCategories);
              if (res) {
                return product;
              }
            }
          }
        });
      }
      //Цена
      if (this.filters.selected_price.min > this.filters.selected_price.max) {
        let temp = this.filters.selected_price.max;
        this.filters.selected_price.max = this.filters.selected_price.min;
        this.filters.selected_price.min = temp;
      }
      filtersProducts = filtersProducts.filter(product => product.price <= this.filters.selected_price.max && product.price >= this.filters.selected_price.min);

      //сортировка
      if (sort) {
        this.sortType = sort;
        switch (this.sortType) {
          case 'date':
            filtersProducts.sort((prev, next) => new Date(next.date_modified) - new Date(prev.date_modified))
            break;

          case 'price':
            filtersProducts.sort((prev, next) => prev.price - next.price)
            break;

          case 'rated':
            filtersProducts.sort((prev, next) => prev.rating_count - next.rating_count)
            break;

          default:
            filtersProducts.sort((prev, next) => new Date(next.date_modified) - new Date(prev.date_modified))
            break;
        }
      }

      this.products = filtersProducts;
      this.page = 1;
    },
    resetFilters() {
      this.isFilterActive = false;
      this.filters.selected_categories = [];
      this.filters.selected_subCategories = [];
      this.filters.selected_sizes = [];
      this.filters.selected_height = [];
      this.filters.selected_price.min = this.filters.price.min;
      this.filters.selected_price.max = this.filters.price.max;
      this.sortType = 'date';
      this.page = 1;
      this.products = this.sourcedProducts.slice();
    }
  },
  created() {
    this.getContent();
    this.GET_PRODUCTS()
        .then((response) => {
          if (response.data) {
            this.sourcedProducts = response.data.sort((prev, next) => new Date(next.date_modified) - new Date(prev.date_modified));
            this.products = this.sourcedProducts.slice();
            this.filters.price.min = Math.min(...this.products.slice().map(product => product.price));
            this.filters.price.max = Math.max(...this.products.slice().map(product => product.price));
            this.filters.selected_price.min = Math.min(...this.products.slice().map(product => product.price));
            this.filters.selected_price.max = Math.max(...this.products.slice().map(product => product.price));
          }
        });
    this.GET_CATEGORIES()
        .then((response) => {
          if (response.data) {
            this.filters.categories = response.data.slice().filter(cat => cat.parent === 0);
          }
        });
    this.GET_SUBCATEGORIES()
        .then((response) => {
          if (response.data) {
            this.filters.subCategories = response.data;
          }
        });
    this.GET_SIZES()
        .then((response) => {
          if (response.data) {
            this.filters.sizes = response.data;
          }
        });
    this.GET_HEIGHT()
        .then((response) => {
          if (response.data) {
            this.filters.height = response.data;
          }
        });
  }
}
</script>

<style scoped>

</style>