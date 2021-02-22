<template>
  <b-container>
    <b-form @submit.prevent="order">
      <b-form-group>
        <b-input type="text" placeholder="Имя" v-model="form.name"/>
      </b-form-group>
      <b-form-group>
        <b-input type="tel" placeholder="Телефон" v-model="form.tel"/>
      </b-form-group>
      <b-form-group>
        <b-btn class="btn-blue">
          Купить
        </b-btn>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "Order1Click",
  props: {
    form: {
      default() {
        return {}
      }
    }
  },
  methods: {
    order() {
      this.$emit('order', this.form);
    }
  }
}
</script>

<style scoped>

</style>