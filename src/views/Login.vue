<template>
  <div class="home">
    <img src="@/assets//images/logo.svg" alt="logo" class="logo">
    <LoginForm />
    <div class="help-text">Ainda não tem conta? <a href="/choose-a-plan">Cadastre-se</a></div>
  </div>
</template>

<script>
import LoginForm from '@/components/form/LoginForm.vue';

export default {
  name: 'LoginLayout',
  components: {
    LoginForm,
  },
}
</script>

<style scoped>
.help-text a {
  color: #F30168;
}
</style>