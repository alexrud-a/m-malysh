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
        <div class="filter">
          <h3>
            Подобрать товар
          </h3>
          <b-form @submit.prevent="filteredProducts" @reset.prevent="resetFilters">
            <!--Категории-->
            <b-form-group label="Категория">
              <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="filters.selected_categories"
                  name="categories"
                  stacked
                  @change="filteredProducts"
              >
                <b-form-checkbox
                    v-for="cat in filters.categories"
                    :key="cat.id"
                    :value="cat.id"
                >
                  {{ cat.name }}
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <!--Атрибуты подкатегории-->
            <b-form-group label="Подкатегория">
              <b-form-checkbox-group
                  id="checkbox-group-2"
                  v-model="filters.selected_subCategories"
                  name="subCategories"
                  stacked
                  @change="filteredProducts"
              >
                <b-form-checkbox
                    v-for="subCat in filters.subCategories"
                    :key="subCat.id"
                    :value="subCat.name"
                >
                  {{ subCat.name }}
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <!--Атрибуты размер-->
            <b-form-group label="Размер">
              <b-form-checkbox-group
                  id="checkbox-group-3"
                  v-model="filters.selected_sizes"
                  name="sizes"
                  stacked
                  @change="filteredProducts"
              >
                <b-form-checkbox
                    v-for="size in filters.sizes"
                    :key="size.id"
                    :value="size.name"
                >
                  {{ size.name }}
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <!--Атрибуты рост-->
            <b-form-group label="Рост">
              <b-form-checkbox-group
                  id="checkbox-group-3"
                  v-model="filters.selected_height"
                  name="height"
                  stacked
                  @change="filteredProducts"
              >
                <b-form-checkbox
                    v-for="item in filters.height"
                    :key="item.id"
                    :value="item.name"
                >
                  {{ item.name }}
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <!--Фильтр по цене-->
            <b-form-group>
              <div class="filter-range">
                <b-form-input type="range"
                              v-model="filters.selected_price.min"
                              :min="filters.price.min"
                              :max="filters.price.max"
                              @change="filteredProducts"
                />
                <b-form-input type="range"
                              v-model="filters.selected_price.max"
                              :min="filters.price.min"
                              :max="filters.price.max"
                              @change="filteredProducts"
                />
              </div>
              <span class="price-min">
                  {{ filters.selected_price.min }}
                </span>
              <span class="price-max">
                  {{ filters.selected_price.max }}
                </span>
            </b-form-group>

            <b-form-group>
              <b-btn type="submit"
                     class="btn btn-blue">
                Применить
              </b-btn>
            </b-form-group>
            <b-form-group v-if="isFilterActive">
              <b-btn type="reset"
                     class="btn btn-blue">
                Сбросить фильтр
              </b-btn>
            </b-form-group>
          </b-form>
        </div>
      </b-col>
      <b-col lg="9" md="8">
        <div class="catalog">
          <h1>
            {{ title }}
          </h1>
          <div v-if="content.length > 0" v-html="content"></div>
          <b-row v-if="products.length > 0" class="justify-content-between">
            <div>
              <b-link href="#"
                      class="sorted-link"
                      :class="{'sorted-link--active': sortType === 'date'}"
                      @click.prevent="filteredProducts('date')"
              >
                по новизне
              </b-link>
              <b-link href="#"
                      class="sorted-link"
                      :class="{'sorted-link--active': sortType === 'price'}"
                      @click.prevent="filteredProducts('price')"
              >
                по цене
              </b-link>
              <b-link href="#"
                      class="sorted-link"
                      :class="{'sorted-link--active': sortType === 'rated'}"
                      @click.prevent="filteredProducts('rated')"
              >
                по популярности
              </b-link>
            </div>
            <div>
              {{ products.length }} товаров |
              Стр. {{ page }} / {{ setPages }} |
              <b-link v-if="page > 1" href="#" @click.prevent="page = page - 1">Предыдущая</b-link>
              |
              <b-link v-if="page < setPages" href="#" @click.prevent="page = page + 1">Следующая</b-link>
            </div>
          </b-row>
          <b-container class="p-0" v-if="products.length > 0">
            <b-row>
              <b-col md="4"
                     sm="6"
                     v-for="product in filtered"
                     :key="product.id"
              >
                <div class="product">
                  <b-link :href="product.permalink">
                    <b-img v-if="product.images.length > 0"
                           :src="product.images[0].src"
                           :alt="product.images[0].alt"
                    />
                    <b-img v-else
                           src="/wp-content/plugins/woocommerce/assets/images/placeholder.png"
                    />
                    <b-badge v-if="product.on_sale" variant="danger">
                      Акция
                    </b-badge>
                  </b-link>
                  <div v-if="product.sku.length">
                    Код товара: {{ product.sku }}
                  </div>
                  <b-link :href="product.permalink">
                    {{ product.name }}
                  </b-link>
                  <div v-html="product.price_html"></div>
                </div>
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
import {mapActions, mapGetters} from 'vuex'
import {contains, containsAttributes} from "@/utils";

export default {
  name: "Shop",
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
      'GET_HEIGHT'
    ]),
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
    filteredProducts(sort) {
      this.isFilterActive = true;
      //выбираем все товары которые есть в выбранных категориях
      let filtersProducts = this.sourcedProducts.slice();
      if (this.filters.selected_categories.length) {
        filtersProducts = filtersProducts.filter(product => contains(product.categories, this.filters.selected_categories, 'id'))
      }
      //Атрибут подкатегория
      if (this.filters.selected_subCategories.length) {
        filtersProducts = filtersProducts.filter((product) => {
          if (product.attributes.length > 0) {
            let attrInd = product.attributes.findIndex((attribute) => attribute.id === 1)
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