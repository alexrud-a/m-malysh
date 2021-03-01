<template>
  <b-form @submit.prevent="onSubmit" class="form contact-form">
    <h3>
      Связаться с нами
    </h3>
    <b-form-group>
      <b-input placeholder="Ваше имя*"
               v-model="form.name"
      />
    </b-form-group>
    <b-form-group>
      <b-input placeholder="Телефон*"
               v-model="form.tel"
      />
    </b-form-group>
    <b-form-group>
      <b-input placeholder="Email*"
               v-model="form.email"
      />
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
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Form",
  data() {
    return {
      form: {
        name: '',
        tel: '',
        email: '',
        accept: true,
      }
    }
  },
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
        tel: '',
        email: ''
      }
    }
  }
}
</script>

<style>

</style>