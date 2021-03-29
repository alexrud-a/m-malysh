<template>
  <b-container>
    <b-row>
      <b-col sm="12">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            Главная
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            Личный кабинет
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row v-if="USER.ID">
      <b-col sm="12" class="mb-4">
        <h2>
          Здравствуйте, {{ USER.data.display_name }}
        </h2>
      </b-col>
      <b-col sm="12" v-if="orders.length">
        <h4>
          История ваших заказов
        </h4>
        <b-table striped hover :items="orders" :fields="fields" class="mb-4"/>
      </b-col>
      <b-col sm="12" v-else>
        <h4>
          У Вас нет еще ни одного заказа
        </h4>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col md="6" sm="12">
        <Authorization/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";
import Authorization from "@/components/forms/Authorization";
import {WooCommerce} from "@/consts";
import dayjs from 'dayjs'
import {formattedPrice} from "@/utils";

export default {
  name: "Profile",
  data() {
    return {
      orders: [],
      fields: [
        {key: 'number', label: 'Номер заказа'},
        {key: 'date_created', label: 'Дата оформления'},
        {key: 'total', label: 'Сумма заказа'},
        {key: 'status', label: 'Статус'},
      ],
    }
  },
  metaInfo() {
    return {
      title: 'Мой малыш - Личный кабинет',
    }
  },
  components: {Authorization},
  computed: {
    ...mapGetters([
      'USER'
    ]),
  },
  filters: {
    formattedPrice,
  },
  methods: {
    getHistoryOrders() {
      this.$emit('loaded', false);
      WooCommerce.get("orders", {
        per_page: 100,
        customer: this.USER.ID,
      })
          .then((response) => {
            this.orders = response.data;
            this.orders.map(order => {
              order.date_created = dayjs(order.date_created).format("DD.MM.YYYY");
              order.total = order.total + ' ₽';
              switch (order.status) {
                case 'pending':
                  order.status = 'В ожидании';
                  break;
                case 'processing':
                  order.status = 'В обработке';
                  break;
                case 'on-hold':
                  order.status = 'На удержании';
                  break;
                case 'completed':
                  order.status = 'Выполнен';
                  break;
                case 'cancelled':
                  order.status = 'Отменен';
                  break;
                case 'refunded':
                  order.status = 'Возвращен';
                  break;
                case 'failed':
                  order.status = 'Не удавшийся';
                  break;
                case 'trash':
                  order.status = 'Удален';
                  break;
              }

              this.$emit('loaded', true)
              return order;
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    }
  },
  created() {
    if (this.USER.ID) {
      this.getHistoryOrders();
    }
  }
}
</script>

<style scoped>

</style>