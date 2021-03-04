<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
    <b-form @submit.prevent="handleSubmit(onSubmit)" class="form contact-form">
      <h3>
        Связаться с нами
      </h3>
      <b-form-group>
        <validation-provider rules="required" v-slot="{ errors }">
          <b-input placeholder="Ваше имя*"
                   v-model="form.name"
          />
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>
      </b-form-group>
      <b-form-group>
        <validation-provider rules="required" v-slot="{ errors }">
          <b-input placeholder="+7 (___) ___ - __ - __*"
                   v-model="form.tel"
                   v-mask="'+7(###) ### - ## - ##'"
          />
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>
      </b-form-group>
      <b-form-group>
        <validation-provider rules="required|email" v-slot="{ errors }">
          <b-input placeholder="Email*"
                   v-model="form.email"
          />
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
            id="accept"
            v-model="form.accept"
        >
          Согласие на обработку персональных данных
        </b-form-checkbox>
      </b-form-group>
      <b-btn type="submit" class="btn btn-blue">
        Оставить заявку
      </b-btn>
    </b-form>
    <b-modal id="response" centered hide-footer hide-header>
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
  name: "Form",
  data() {
    return {
      form: {
        name: '',
        tel: '',
        email: '',
        accept: true,
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
          action: 'form',
          form: this.form
        })
      })
          .then(response => {
            let res = qs.parse(response.data);
            this.onReset();
            this.msg = res.msg;
            this.$bvModal.show('response');
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
        tel: '',
        email: ''
      }
      this.$refs.form.reset();
    }
  }
}
</script>

<style>

</style>