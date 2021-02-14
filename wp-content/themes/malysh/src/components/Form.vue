<template>
  <b-form @submit="onSubmit" class="form contact-form">
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
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      this.onReset();
    },
    onReset(event) {
      event.preventDefault();
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