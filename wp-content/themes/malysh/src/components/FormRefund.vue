<template>
  <b-form class="form-refund" @submit="onSubmit">
    <h3 class="form-refund__title">
      Пожалуйста, заполните форму для возврата товара
    </h3>
    <b-form-row>
      <b-col md="4">
        <b-form-group>
          <b-input placeholder="Ваше имя"
                   v-model="formRefund.name"
          />
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group>
          <b-input placeholder="Ваша фамилия"
                   v-model="formRefund.lastName"
          />
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group>
          <b-input placeholder="Ваш e-mail"
                   v-model="formRefund.email"
          />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="4">
        <b-form-group>
          <b-input placeholder="Телефон"
                   v-model="formRefund.tel"
          />
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group>
          <b-input placeholder="Номер заказа"
                   v-model="formRefund.orderId"
          />
        </b-form-group>
      </b-col>
      <b-col md="4">
          <b-form-group>
            <b-form-datepicker
                locale="ru"
                placeholder="Дата заказа"
                v-model="formRefund.date"
                :max="new Date()"
                date-format-options="{ 'day': 'numeric', 'month': 'numeric', 'year': 'numeric' }"
                hide-header="true"
            />
          </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="6">
        <b-form-group>
          <b-input placeholder="Наименование товара"
                   v-model="formRefund.productName"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <b-input placeholder="Модель/код товара"
                   v-model="formRefund.productId"
          />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-group>
      <b-textarea placeholder="Опишите причину возврата"
                  v-model="formRefund.comment"
      />
    </b-form-group>
    <b-btn type="submit" class="btn btn-blue mb-2">
      Вернуть заказ
    </b-btn>
    <p>
      Нажимая на кнопку «Вернуть заказ», вы соглашаетеь с Гарантиями
    </p>
  </b-form>
</template>

<script>
export default {
  name: "FormRefund",
  data() {
    return {
      formRefund: {
        name: '',
        lastName: '',
        email: '',
        tel: '',
        orderId: '',
        date: null,
        productName: '',
        productId: '',
        comment: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.formRefund));
      this.onReset();
    },
    onReset(event) {
      event.preventDefault();
      this.formRefund = {
        name: '',
        lastName: '',
        email: '',
        tel: '',
        orderId: '',
        date: null,
        productName: '',
        productId: '',
        comment: ''
      }
    }
  }
}
</script>

<style scoped>

</style>