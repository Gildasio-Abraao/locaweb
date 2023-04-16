<template>
  <p class="default-text error" v-if="error">
    {{ error.message }}
  </p>

  <div class="container">
    <div class="form-container fade-left">
      <h1 class="title">Dados pessoais</h1>
      <p class="help-text">Informe seus dados pessoais para acesso à sua conta</p>

      <form method="post" @submit.prevent="signUp()">
        <div class="input-group">
          <label for="nome">Nome completo</label>
          <input type="text" placeholder="Informe seu nome completo" name="username" v-model="username" :class="{ invalid: v$.username.$error }">
          <p class="help-text error" v-if="v$.username.$error">
            <span v-for="(error, index) in v$.username.$errors" :key="index">{{ error.$message }};</span>
          </p>
        </div>

        <div class="input-group">
          <label for="celular">Celular</label>
          <input type="text" placeholder="(99) 99999-0000" name="phone" v-model="phone" :class="{ invalid: v$.phone.$error }">
          <p class="help-text error" v-if="v$.phone.$error">
            <span v-for="(error, index) in v$.phone.$errors" :key="index">{{ error.$message }};</span>
          </p>
          <p class="help-text" v-if="!v$.phone.$error">Digite somente números</p>
        </div>

        <div class="input-group">
          <label for="email">E-mail</label>
          <input type="email" placeholder="Informe seu e-mail" name="email" v-model="email" :class="{ invalid: v$.email.$error }">
          <p class="help-text error" v-if="v$.email.$error">
            <span v-for="(error, index) in v$.email.$errors" :key="index">{{ error.$message }};</span>
          </p>
        </div>

        <div class="input-group">
          <label for="password">Senha</label>
          <input type="password" name="password" v-model="password" :class="{ invalid: v$.password.$error }">
          <p class="help-text error" v-if="v$.password.$error">
            <span v-for="(error, index) in v$.password.$errors" :key="index">{{ error.$message }};</span>
          </p>
          <p class="help-text" v-if="!v$.password.$error">No mínimo 8 caracteres</p>
        </div>

        <div class="input-group">
          <label for="confirm-password">Confirme sua senha</label>
          <input type="password" name="confirm-password" v-model="confirmPassword" :class="{ invalid: v$.confirmPassword.$error }">
          <p class="help-text error" v-if="v$.confirmPassword.$error">
            <span v-for="(error, index) in v$.confirmPassword.$errors" :key="index">{{ error.$message }};</span>
          </p>
        </div>

        <div class="divider">
          <h1 class="title">Dados do seu site</h1>
          <div class="input-group">
            <label for="nome-site">Nome do seu site</label>
            <input type="text" placeholder="Meu site" name="nome-site" v-model="site" :class="{ invalid: v$.site.$error }">
            <p class="help-text error" v-if="v$.site.$error">
              <span v-for="(error, index) in v$.site.$errors" :key="index">{{ error.$message }};</span>
            </p>
            <p class="help-text" v-if="!v$.site.$error">Exatamente igual o título do seu site</p>
          </div>
        </div>

        <div class="input-group flex">
          <input type="checkbox" name="terms" v-model="terms" required>
          <p class="default-text">
            Ao concluir com seu cadastro você concorda com nossos <a href="#">termos de uso</a> e <a href="#">politicas de
              privacidade</a>.
          </p>
        </div>

        <button type="submit" class="default-btn">CRIAR CONTA</button>
      </form>

    </div>

    <!--Selected plan card-->
    <Card :data="plan" :isSelectedPlan="true" class="fade-right" />
  </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { useVuelidate } from '@vuelidate/core';
import { email, maxLength, minLength, sameAs, numeric, required } from '@vuelidate/validators';
import Card from '../card/Card.vue';

export default {
  name: 'SignUpForm',
  setup: () => ({ v$: useVuelidate() }),
  components: {
    Card,
  },
  props: {
    plan: null,
  },
  data() {
    return {
      error: null,
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      site: '',
      selectedPlanId: null,
      terms: false,
    }
  },
  validations() {
    return {
      username: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(5),
      },
      phone: {
        required,
        numeric,
        minLength: minLength(11),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: {
        required,
        sameAs: sameAs(this.password),
      },
      site: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(5),
      },
      selectedPlanId: {
        required,
      },
      terms: {
        required,
      },
    }
  },
  validationConfig: {
    $autoDirty: true,
  },
  methods: {
    async signUp() {
      // if form is not valide break;
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) {
        return;
      }

      try {
        const request = await ApiService.store(this.form);

        if (request.status === 200) this.$router.push({ path: `/home/1` });
      } catch (err) {
        this.error = err;
      }
    },

    setSelectedPlanId() {
      this.selectedPlanId = this.$route.params.id;
    }
  },
  mounted() {
    this.setSelectedPlanId();
  },
}
</script>

<style scoped>
@import url('@/assets/styles/form.css');

.container {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.divider {
  border-top: 1px solid rgba(81, 93, 116, 0.3);
  border-bottom: 1px solid rgba(81, 93, 116, 0.3);
  padding: 15px 0px;
  margin: 20px 0px;
}

.input-group.flex {
  display: flex;
  align-items: flex-start;
}

.input-group.flex input {
  width: 30px;
  margin: 0px 10px 0px 0px;
}

.input-group input {
  padding: 19px 16px;
}

.help-text {
  font-size: 14px;
  color: #515D74;
}

.default-btn {
  height: 60px;
  margin-top: 45px;
}

@media(max-width: 1110px) {
  .container {
    flex-direction: column-reverse;
  }
}
</style>
