<template>
  <b-container>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(order)">
        <b-form-group>
          <validation-provider rules="required" v-slot="{ errors }">
            <b-input type="text" placeholder="Имя" v-model="form.name"/>
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider rules="required" v-slot="{ errors }">
            <b-input type="tel" placeholder="Телефон"
                     v-model="form.tel"
                     v-mask="'+7(###) ### - ## - ##'"
            />
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <b-btn class="btn-blue" type="submit">
            Купить
          </b-btn>
        </b-form-group>
      </b-form>
    </ValidationObserver>
  </b-container>
</template>

<script>
import {ValidationProvider, ValidationObserver} from "vee-validate";
import axios from "axios";
import qs from "qs";

export default {
  name: "Order1Click",
  data() {
    return {
      form: {
        name: '',
        tel: ''
      }
    }
  },
  props: {
    product: {
      default() {
        return {}
      }
    },
    currentVariation: {
      default() {
        return {};
      }
    }
  },
  components: {ValidationProvider, ValidationObserver},
  methods: {
    order() {
      return axios('/wp-admin/admin-ajax.php', {
        method: 'POST',
        data: qs.stringify({
          action: 'order1click',
          form: this.form,
          product: this.product,
          currentVariation: this.currentVariation
        })
      })
          .then(response => {
            let res = qs.parse(response.data);
            console.log(res);
            this.onReset();
            return res;
          })
          .catch(error => {
            console.log(error);
            return error;
          })
    },
    onReset() {
      this.form = {
        name: '',
        tel: ''
      }
    }
  }
}
</script>

<style scoped>

</style>