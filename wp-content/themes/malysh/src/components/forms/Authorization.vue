<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }" ref="formAuth" v-if="!isRegistration">
      <b-form @submit.prevent="handleSubmit(authorization)">
        <b-form-group>
          <validation-provider rules="required" v-slot="{ errors }">
            <b-input type="text" placeholder="Логин" v-model="user.log"/>
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider rules="required" v-slot="{ errors }">
            <b-input type="password" placeholder="Пароль" v-model="user.pwd"/>
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <b-btn type="submit" class="btn-blue">
            Войти
          </b-btn>
        </b-form-group>
        <b-form-group>
        <span class="error">
          {{ error }}
        </span>
        </b-form-group>
        <b-form-group>
          <b-link @click.prevent="isRegistration = !isRegistration">
            Регистрация
          </b-link>
        </b-form-group>
      </b-form>
    </ValidationObserver>
    <ValidationObserver v-else v-slot="{ handleSubmit }" ref="formRegister">
      <b-form @submit.prevent="handleSubmit(registration)">
        <b-form-group>
          <validation-provider rules="required" v-slot="{ errors }">
            <b-input type="text" placeholder="Имя" v-model="register.name"/>
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider rules="required" v-slot="{ errors }">
            <b-input type="text" placeholder="Фамилия" v-model="register.lastName"/>
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider rules="required|email" v-slot="{ errors }">
            <b-input type="email" placeholder="Email" v-model="register.email"/>
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider rules="required" v-slot="{ errors }">
            <b-input type="tel" placeholder="+7 (___) ___ - __ - __" v-model="register.tel"
                     v-mask="'+7 (###) ### - ## - ##'"/>
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
              id="accept"
              v-model="register.opt"
          >
            Хочу стать оптовым покупателем
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
              id="accept"
              v-model="register.accept"
          >
            Согласие на обработку персональных данных
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-btn type="submit" class="btn-blue">
            Зарегистрироваться
          </b-btn>
        </b-form-group>
        <b-form-group>
        <span class="text-success">
          {{ msg }}
        </span>
        </b-form-group>
        <b-form-group>
          <b-link @click.prevent="isRegistration = !isRegistration">
            Авторизация
          </b-link>
        </b-form-group>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {ValidationProvider, ValidationObserver} from "vee-validate";
import axios from "axios";
import qs from "qs";

export default {
  name: "Authorization",
  data() {
    return {
      isRegistration: false,
      user: {
        log: '',
        pwd: '',
      },
      error: '',
      register: {
        name: '',
        lastName: '',
        opt: false,
        email: '',
        tel: '',
        accept: true
      },
      msg: ''
    }
  },
  components: {ValidationProvider, ValidationObserver},
  computed: {},
  methods: {
    ...mapActions([
      'GET_USER',
    ]),
    authorization() {
      this.GET_USER({
        'log': this.user.log,
        'pwd': this.user.pwd,
        'rememberme': true,
      })
          .then(response => {
            if (response.data.error) {
              this.error = response.data.error
            } else {
              this.error = '';
              this.$bvModal.hide('authorization');
              this.onReset();
              this.$refs.formAuth.reset();
            }
          });
    },
    registration() {
      return axios('/wp-admin/admin-ajax.php', {
        method: 'POST',
        data: qs.stringify({
          action: 'registration',
          register: this.register
        }),
      })
          .then(response => {
            let res = qs.parse(response.data);
            this.onReset();
            this.$refs.formRegister.reset();
            this.msg = res.msg;
            return res;
          })
          .catch(error => {
            return error;
          })
    },
    onReset() {
      this.user = {
        log: '',
        pwd: '',
      };
      this.register = {
        name: '',
        lastName: '',
        opt: false,
        email: '',
        tel: '',
        accept: true
      };
    }
  }
}
</script>

<style scoped>

</style>