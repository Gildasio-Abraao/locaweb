<template>
  <div class="home">
    <img src="@/assets//images/logo.svg" alt="logo" class="logo">
    <LoginForm />
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
