<template>
  <b-container class="cart">
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
        <b-col xl="8" lg="6" md="12">
          <h1 class="mb-4">
            Корзина товаров
          </h1>
        </b-col>
        <b-col lg="8" md="12">
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
                <img :src="product.images[0].src" :alt="product.images[0].alt" width="120"/>
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
                {{ product.current.price | formattedPrice }} ₽
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
            </div>
          </div>
          <h2>
            Доставка и оплата
          </h2>
          <b-form @submit.prevent="order" class="form-refund">
            <b-form-group>
              <label class="label">
                Выберите страну
              </label>
              <multiselect v-model="select_country" :options="countries"
                           :id="select_country.code"
                           :value="select_country.code"
                           placeholder="Выберите страну" label="name"
                           track-by="name" showLabels="false"
                           allowEmpty="false" showNoResults="Результатов нет"
                           selectLabel="" selectedLabel="" deselectLabel=""
              />
            </b-form-group>
            <b-form-group label="Способ доставки"
                          label-class="label"
            >
              <b-form-radio-group
                  v-model="select_shipping"
                  stacked
              >
                <b-form-radio
                    v-for="shipping in custom_shippings"
                    :key="shipping.id"
                    :value="shipping"
                >
                  {{ shipping.title }}
                </b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group label="Способ оплаты"
                          label-class="label"
            >
              <b-form-radio-group
                  v-model="select_payment"
                  stacked
              >
                <b-form-radio
                    v-for="payment in payments"
                    :key="payment.id"
                    :value="payment.id"
                >
                  {{ payment.title }}
                </b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group>
              <label class="label mb-0">
                Итого
              </label>
            </b-form-group>
            <b-form-group class="custom-radio cart__total">
              <b-form-row class="justify-content-between">
                <span>
                  Сумма заказа
                </span>
                <span>
                  {{ cartTotal | formattedPrice }} ₽
                </span>
              </b-form-row>
              <!--            <b-form-row class="justify-content-between">-->
              <!--              <span>Доставка</span> <span>{{ shipping_total }} ₽</span>-->
              <!--            </b-form-row>-->
              <b-form-row class="justify-content-between">
                <span>
                  Общая стоимость
                </span>
                <span>
                  {{ cartTotal | formattedPrice }} ₽
                </span>
              </b-form-row>
            </b-form-group>
            <b-form-group>
              <label class="label mt-4">
                Оформление заказа
              </label>
              <b-form-row>
                <b-col md="4">
                  <b-form-group>
                    <b-input type="text" placeholder="Ваше имя" v-model="user.name"/>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <b-input type="text" placeholder="Ваша фамилия" v-model="user.last_name"/>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <b-input type="text" placeholder="Ваш email" v-model="user.email"/>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col md="4">
                  <b-form-group>
                    <b-input type="text" placeholder="Город" v-model="user.city"/>
                  </b-form-group>
                </b-col>
                <b-col md="8">
                  <b-form-group>
                    <b-input type="text" placeholder="Улица" v-model="user.street"/>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col md="4">
                  <b-form-group>
                    <b-input type="text" placeholder="Номер дома" v-model="user.house"/>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <b-input type="text" placeholder="Номер квартиры" v-model="user.flat"/>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <b-input type="text" placeholder="Телефон" v-model="user.tel"/>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-group>
                <b-btn type="submit" class="btn btn-blue">
                  Оформить заказ
                </b-btn>
              </b-form-group>
            </b-form-group>
          </b-form>
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
import {WooCommerce} from "@/consts";
import {formattedPrice} from "@/utils";
import Multiselect from 'vue-multiselect';

export default {
  name: "Cart",
  data() {
    return {
      cart_data: [],
      countries: [],
      select_country: {},
      shippings: [],
      custom_shippings: [],
      select_shipping: {},
      payments: [],
      select_payment: {},
      select_shipping_method: ['delivery', 'pickup'],
      user: {
        name: '',
        last_name: '',
        email: '',
        tel: '',
        city: '',
        street: '',
        house: '',
        flat: '',
      }
    }
  },
  components: {Multiselect},
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
          if (item.current.price) {
            price = item.current.price
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
    },
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
    },
    order() {
      //проверить тип оплаты если наличкой отправляем заказ, если картой отправляем на оплату, после получения статуса оплаты отправляем заказ
      const data = {
        payment_method: this.select_payment.id,
        payment_method_title: this.select_payment.title,
        set_paid: false,
        billing: {
          first_name: this.user.name,
          last_name: this.user.last_name,
          address_1: this.user.street + ', ' + this.user.house + ', ' + this.user.flat,
          city: this.user.city,
          state: "",
          postcode: "",
          country: this.select_country.code,
          email: this.user.email,
          phone: this.user.tel
        },
        shipping: {
          first_name: this.user.name,
          last_name: this.user.last_name,
          address_1: this.user.street + ', ' + this.user.house + ', ' + this.user.flat,
          address_2: "",
          city: this.user.city,
          state: "",
          postcode: "",
          country: this.select_country.code,
        },
        line_items: this.cart_data.map(product => {
          let cartItem = {
            product_id: product.id,
            variation_id: product.variation_id,
            quantity: product.quantity
          }
          return cartItem;
        }),
        shipping_lines: [
          {
            method_id: this.select_shipping.id,
            method_title: this.select_shipping.title,
            total: '0'
          }
        ]
      };

      WooCommerce.post("orders", data)
          .then((response) => {
            console.log(response.data);
            this.clearCart();
            //перенаправить клиента на страницу оформленного заказа
            //this.$router.push()
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    },
    getCountries() {
      WooCommerce.get("data/countries")
          .then((response) => {
            this.countries = response.data;
            this.select_country = this.countries.find(country => country.code === 'RU');
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    },
    getShipping() {
      WooCommerce.get("shipping_methods")
          .then((response) => {
            this.shippings = response.data.filter(shipping => shipping.id === 'cdek_shipping' || shipping.id === 'rpaefw_post_calc');
            this.custom_shippings = this.shippings.map(shipping => {
              shipping.id === 'cdek_shipping' ? shipping.title = 'Доставка курьерской службой CДЭК' : '';
              shipping.id === 'rpaefw_post_calc' ? shipping.title = 'Почта России' : '';
              return shipping;
            });
            this.custom_shippings = this.custom_shippings.sort((prev, next) => next.title - prev.title);
            this.select_shipping = this.custom_shippings[0];
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    },
    getPayments() {
      WooCommerce.get("payment_gateways")
          .then((response) => {
            this.payments = response.data.filter(payment => payment.enabled === true);
            this.select_payment = this.payments[0].id;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    },
  },
  mounted() {
    this.cart_data = this.CART;
  },
  created() {
    this.getCountries();
    this.getShipping();
    this.getPayments();
  }
}
</script>

<style lang="scss">
.cart {
  &-products {
    width: 100%;
    text-align: center;
    margin: 40px 0;

    &__row {

      &--thead {
        font-size: 16px;
        font-weight: $font-weight-bold;

        .cart-products__td {
          border-bottom: 1px solid $l-gray;
        }
      }

      &--tbody {
        .cart-products__td {
          border-bottom: 1px solid $l-gray;
        }
      }
    }

    &__td {
      padding: 10px;
      vertical-align: middle;
    }

    &__color {
      width: 100%;
      height: 20px;
    }

    .btn,
    .btn:hover,
    .btn:focus,
    .btn:active {
      background: none !important;
      color: $gray !important;
      border: none !important;
      box-shadow: none !important;
    }

    .cart-item {
      &__qty-btn {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    }
  }

  .custom-radio {
    border: 1px solid $blue;
    padding: 15px;
    margin-bottom: -1px;

    .custom-control-label {
      padding-left: 40px;
      font-size: 18px;
      font-weight: $font-weight-bold;
      line-height: 40px;
      width: 100%;

      &::before {
        border-radius: 50% !important;
        border: 1px solid $blue;
        width: 30px;
        height: 30px;
      }

      &::after {
        border-radius: 50% !important;
        border: 10px solid $blue;
        width: 30px;
        height: 30px;
        background-image: none !important;
      }
    }
  }

  &__total {
    padding: 20px 30px !important;
    font-weight: $font-weight-bold;
    font-size: 18px;
  }

  .label {
    text-transform: uppercase;
    font-weight: $font-weight-light;
    letter-spacing: 1px;
    font-size: 16px;
  }

  h2 {
    font-size: 18px;
  }

  .multiselect {
    &__tags {
      border-radius: 0;
      border-color: $blue;
    }
  }
}
</style>