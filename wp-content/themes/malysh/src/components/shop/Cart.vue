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
            </div>
          </div>
        </b-col>
        <b-col lg="4">
          <b-card>
            <b-form>
              <b-form-row>
                <b-input type="text"
                         placeholder="Введите промокод"
                         v-model="promo"
                />
                <b-btn type="submit" class="btn btn-blue">
                  Применить
                </b-btn>
              </b-form-row>
            </b-form>
            <b-card-text>
              <b-row class="justify-content-between">
                <span>
                  Количество товаров
                </span>
                <span>
                  {{ CART.reduce((s, i) => s = s + i.quantity, 0) }}
                </span>
              </b-row>
              <b-row class="justify-content-between">
                <span>
                  ИТОГО
                </span>
                <span>
                  {{ cartTotal | formattedPrice }} ₽
                </span>
              </b-row>
              <b-btn>
                Оформить заказ
              </b-btn>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col sm="12">
          <h2>
            Доставка и оплата
          </h2>
          <b-form @submit.prevent="order">
            <b-form-group>
              <label>
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
            >
              <b-form-radio-group
                  v-model="select_shipping"
                  stacked
              >
                <b-form-radio
                    v-for="shipping in shippings"
                    :key="shipping.id"
                    :value="shipping.id"
                >
                  {{ shipping.title }}
                </b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group label="Способ оплаты"
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
              <label>
                Итого
              </label>
            </b-form-group>
            <b-form-group>
              Сумма заказа {{ cartTotal | formattedPrice }} ₽
            </b-form-group>
<!--            <b-form-group>-->
<!--              Доставка {{ shipping_total }} ₽-->
<!--            </b-form-group>-->
            <b-form-group>
              Общая стоимость {{ cartTotal | formattedPrice }} ₽
            </b-form-group>
            <b-form-group>
              <label>
                Оформление заказа
              </label>
              <b-form-row>
                <b-input type="text" placeholder="Ваше имя" v-model="user.name"/>
                <b-input type="text" placeholder="Ваша фамилия" v-model="user.last_name"/>
                <b-input type="text" placeholder="Ваш email" v-model="user.email"/>
              </b-form-row>
              <b-form-row>
                <b-input type="text" placeholder="Город" v-model="user.city"/>
                <b-input type="text" placeholder="Улица" v-model="user.street"/>
              </b-form-row>
              <b-form-row>
                <b-input type="text" placeholder="Номер дома" v-model="user.house"/>
                <b-input type="text" placeholder="Номер квартиры" v-model="user.flat"/>
                <b-input type="text" placeholder="Телефон" v-model="user.tel"/>
              </b-form-row>
            </b-form-group>
            <b-form-group>
              <b-btn type="submit" class="btn btn-blue">
                Оформить заказ
              </b-btn>
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
      select_shipping: {},
      payments: [],
      select_payment: {},
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
          if (item.price) {
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
            method_id: this.select_shipping,
            method_title: '',
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
            this.shippings = response.data.filter(shipping => shipping.id === 'local_pickup' || shipping.id === 'rpaefw_post_calc');
            this.select_shipping = this.shippings[0].id;
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
    }
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

<style scoped>

</style>