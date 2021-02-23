<template>
  <b-container>
    <b-row>
      <b-col sm="12">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            Главная
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            Корзина
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
      <template v-if="cart_data.length">
        <b-col lg="8" md="12">
          <h1>
            Корзина товаров
          </h1>
        </b-col>
        <b-col lh="4" md="12">
          <h2>
            Выбранные товары
          </h2>
          <div class="cart-products d-table">
            <div class="cart-products__row cart-products__row--thead d-table-row">
              <div class="cart-products__td d-table-cell">
                Модель
              </div>
              <div class="cart-products__td d-table-cell">
                Описание
              </div>
              <div class="cart-products__td d-table-cell">
                Размер
              </div>
              <div class="cart-products__td d-table-cell">
                Цвет
              </div>
              <div class="cart-products__td d-table-cell">
                Цена
              </div>
              <div class="cart-products__td d-table-cell">
                Количество
              </div>
              <div class="cart-products__td d-table-cell">
                Итого
              </div>
            </div>
            <div class="cart-products__row cart-products__row--tbody d-table-row"
                 v-for="(product, index) in cart_data"
                 :key="product.id"
            >
              <div class="cart-products__td d-table-cell">
                <img :src="product.images[0].src" :alt="product.images[0].alt"/>
              </div>
              <div class="cart-products__td d-table-cell">
                <div>
                  {{ product.name }}
                </div>
                <div>
                  Код товара: {{ product.current.sku }}
                </div>
              </div>
              <div class="cart-products__td d-table-cell">
                {{ product.current.attributes[1].option }}
              </div>
              <div class="cart-products__td d-table-cell">
                <div class="cart-products__color"
                     :style="'background-color: '+product.current.attributes[3].option"></div>
              </div>
              <div class="cart-products__td d-table-cell">
                <span class="cart-item__qty-btn" @click="increment(index)">+</span>
                <div>
                  {{ product.quantity }}
                </div>
                <span class="cart-item__qty-btn" @click="decrement(index)">-</span>
              </div>
              <div class="cart-products__td d-table-cell">
                {{ product.current.price * product.quantity | formattedPrice }}
              </div>
            </div>
            <div class="cart-products__row cart-products__row--tfoot d-table-row">
              <div class="cart-products__td d-table-cell">
                <b-btn @click="clearCart">
                  Очистить корзину
                </b-btn>
              </div>
              <div class="cart-products__td d-table-cell">
                {{ cartTotal | formattedPrice }} ₽
              </div>
            </div>
          </div>
        </b-col>
      </template>
      <template v-else>
        <b-col sm="12">
          <h1>
            Корзина товаров
          </h1>
          <p>
            Ваша корзина пуста
          </p>
        </b-col>
      </template>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {formattedPrice} from "@/utils";

export default {
  name: "Cart",
  data() {
    return {
      cart_data: []
    }
  },
  filters: {
    formattedPrice,
  },
  computed: {
    ...mapGetters([
      'CART'
    ]),
    cartTotal() {
      let result = [];
      let price;

      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          if (item.price) {
            price = item.price
          } else {
            price = item.price
          }
          result.push(price * item.quantity)
        }

        result = result.reduce(function (sum, el) {
          return sum + el;
        });

        return result
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions([
      'CLEAR_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM',
    ]),
    clearCart() {
      this.CLEAR_CART();
      this.cart_data = this.CART;
    },
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index);
    }
  },
  mounted() {
    this.cart_data = this.CART;
  }
}
</script>

<style scoped>

</style>