<template>
  <div class="home">
    <img src="@/assets//images/logo.svg" alt="logo" class="logo">
    <h1 class="title">Você está muito próximo de mudar a forma de <span>hospedar seu site</span></h1>
    <p class="default-text error" v-if="error">{{ error.message }}</p>
    <SignUpForm :plan="plans" />
  </div>
</template>

<script>
import SignUpForm from '@/components/form/SignUpForm.vue';
import MockService from '@/services/MockService';

export default {
  name: 'LoginLayout',
  data() {
    return {
      plans: [],
      error: null,
    }
  },
  components: {
    SignUpForm
  },
  methods: {
    setPlans() {
      const planId = this.$route.params.id

      MockService.getPlans()
        .then(res => {
          const data = res.data;
          const selectedPlan = data.filter(item => item.id == planId);
          
          this.plans = selectedPlan;
        })
        .catch(err => this.error = err);
    },
  },
  mounted() {
    this.setPlans();
    window.scrollTo(0, 0);
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
</style>