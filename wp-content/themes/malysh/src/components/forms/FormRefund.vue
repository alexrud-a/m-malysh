<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="formRefund">
    <b-form class="form-refund" @submit.prevent="handleSubmit(onSubmit)">
      <h3 class="form-refund__title">
        Пожалуйста, заполните форму для возврата товара
      </h3>
      <b-form-row>
        <b-col md="4">
          <b-form-group>
            <validation-provider rules="required" v-slot="{ errors }">
              <b-input placeholder="Ваше имя"
                       v-model="formRefund.name"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <validation-provider rules="required" v-slot="{ errors }">
              <b-input placeholder="Ваша фамилия"
                       v-model="formRefund.lastName"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <validation-provider rules="required|email" v-slot="{ errors }">
              <b-input placeholder="Ваш e-mail"
                       v-model="formRefund.email"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="4">
          <b-form-group>
            <validation-provider rules="required" v-slot="{ errors }">
              <b-input placeholder="Телефон"
                       v-model="formRefund.tel"
                       v-mask="'+7(###) ### - ## - ##'"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <validation-provider rules="required" v-slot="{ errors }">
              <b-input placeholder="Номер заказа"
                       v-model="formRefund.orderId"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <validation-provider rules="required" v-slot="{ errors }">
              <b-form-datepicker
                  locale="ru"
                  placeholder="Дата заказа"
                  v-model="formRefund.date"
                  :max="new Date()"
                  date-format-options="{ 'day': 'numeric', 'month': 'numeric', 'year': 'numeric' }"
                  hide-header="true"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="6">
          <b-form-group>
            <validation-provider rules="required" v-slot="{ errors }">
              <b-input placeholder="Наименование товара"
                       v-model="formRefund.productName"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider rules="required" v-slot="{ errors }">
              <b-input placeholder="Модель/код товара"
                       v-model="formRefund.productId"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
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
    <b-modal id="response-refund" centered hide-footer hide-header>
      <ModalResponse :msg="msg"/>
    </b-modal>
  </ValidationObserver>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {ValidationProvider, ValidationObserver} from "vee-validate";
import ModalResponse from "@/components/forms/ModalResponse";

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
      },
      msg: '',
    }
  },
  components: {ModalResponse, ValidationProvider, ValidationObserver},
  methods: {
    onSubmit() {
      return axios('/wp-admin/admin-ajax.php', {
        method: 'POST',
        data: qs.stringify({
          action: 'formRefund',
          formRefund: this.formRefund
        })
      })
          .then(response => {
            let res = qs.parse(response.data);
            this.onReset();
            this.msg = res.msg;
            this.$bvModal.show('response-refund');
            return res;
          })
          .catch(error => {
            console.log(error);
            return error;
          })
    },
    onReset() {
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
      };
      this.$refs.formRefund.reset();
    }
  }
}
</script>

<style scoped>

</style>