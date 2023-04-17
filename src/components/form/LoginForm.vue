<template>
  <p class="default-text error" v-if="error">
    {{ error.message }}
  </p>

  <div class="form-container">
    <h1 class="title">Entre na sua conta</h1>
    <p class="help-text">Para acessar sua conta informe seu e-mail e senha</p>
    <form @submit.prevent="login()">
      <div class="input-group">
        <label for="email">E-mail</label>
        <input
          type="email"
          placeholder="Seu e-mail"
          name="email"
          v-model="email"
          :class="{ invalid: v$.email.$error }"
          id="email"
        >
        <p class="help-text error" v-if="v$.email.$error">
          <span v-for="(error, index) in v$.email.$errors" :key="index">Insira um e-mail válido</span>
        </p>
        
      </div>
      <div class="input-group">
        <label for="password">Senha</label>
        <input
          type="password"
          placeholder="Sua senha"
          name="password"
          v-model="password"
          :class="{ invalid: v$.password.$error }"
          id="password"
        >
        <p class="help-text error" v-if="v$.password.$error">
          <span v-for="(error, index) in v$.password.$errors" :key="index">Insira uma senha válida</span>
        </p>
        <div class="reset-pass">
          <a href="#">Esqueci minha senha</a>
        </div>
      </div>
      <button type="submit" class="default-btn">Fazer Login</button>
    </form>
  </div>

  <div class="help-text">Ainda não tem conta? <a href="/choose-a-plan">Cadastre-se</a></div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { useVuelidate } from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';

export default {
  name: 'LoginForm',
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      error: null,
      email: '',
      password: '',
    }
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(5),
      },
    }
  },
  validationConfig: {
    $autoDirty: true,
  },
  methods: {
    async login() {
      // if form is not valide break;
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) {
        return;
      }

      try {
        const random = (Math.random() * 10).toFixed();
        const request = await ApiService.login(random);
        const id = request.data.id;
        
        this.$router.push({ path: `/home/${id}` });
      } catch(err) {
        this.error = err;
      }
    },
  },
}
</script>

<style scoped>
@import url('@/assets/styles/form.css');

.default-btn {
  width: 100%;
  margin-top: 25px;
}

.reset-pass a:hover {
  text-decoration: underline;
}

.help-text.error {
  font-size: 14px;
}

.help-text a {
  color: #F30168;
}
</style>
