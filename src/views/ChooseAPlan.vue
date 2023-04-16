<template>
  <div class="home">
    <img src="@/assets//images/logo.svg" alt="logo" class="logo">
    <h1 class="title">Você está muito próximo de mudar a forma de <span>hospedar seu site</span></h1>
    <p class="default-text" v-if="!error">Escolha o seu plano</p>

    <!--Exibe algum erro para o cliente-->
    <p class="error default-text" v-if="error">{{ error.message }}</p>

    <!--Cards dos planos-->
    <Card :data="plans" :isSelectedPlan="false" />
  </div>
</template>

<script>
import Card from '@/components/card/Card.vue';
import MockService from '@/services/MockService';

export default {
  name: 'SignUp',
  components: {
    Card,
  },
  data() {
    return {
      plans: [],
      error: null,
    }
  },
  methods: {
    setPlans() {
      MockService.getPlans()
        .then(res => { this.plans = res.data; })
        .catch(err => this.error = err);
    }
  },
  mounted() {
    this.setPlans();
  },
}
</script>

<style scoped>
.title {
  margin-top: 45px;
  width: 95%;
  max-width: 700px;
  text-align: center;
}

.title span {
  color: #F30168;
  text-decoration: underline;
}

.default-text {
  margin-top: 20px;
}
</style>