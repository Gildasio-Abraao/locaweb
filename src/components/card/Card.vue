<template>
  <div :class="{ 'cards-container': !isSelectedPlan, 'selected-plan-container': isSelectedPlan }">
    <div class="card" v-for="(plan, index) in data" :key="index">
      <div class="pin most-used" v-if="plan.mostUsed && !isSelectedPlan">
        <span>MAIS USADO</span>
      </div>

      <div class="pin selected-plan" v-if="isSelectedPlan">
        <span>PLANO ESCOLHIDO</span>
      </div>
      <!--Header-->
      <h1 class="card-title">{{ plan.title }}</h1>
      <p class="card-price" v-if="plan.price !== 'Grátis'">
        <span>R$</span>
        {{ plan.price }}
        <span>/mês</span>
      </p>
      <p class="card-price" v-if="plan.price === 'Grátis'">{{ plan.price }}</p>

      <!--Benefits-->
      <div class="card-rules">
        <p v-for="(benefit, key) in plan.benefits" :key="key">
          {{ benefit }}
        </p>
      </div>

      <!--Recommendation-->
      <div class="card-recommendation">
        <p>{{ plan.recommendation }}</p>
      </div>

      <div class="btn-case" v-if="!isSelectedPlan">
        <button class="default-btn" @click="signUp(plan.id)">ESCOLHER ESSE PLANO</button>
      </div>

      <!--Topics-->
      <div class="topic" v-for="(topic, topicIndex) in plan.topics" :key="topicIndex">
        <p class="topic-title">{{ topic.title }}</p>
        <p class="topic-item" v-for="(item, itemIndex) in topic.items" :key="itemIndex">
          ✓ {{ item }}
        </p>
      </div>
    </div>

    <!--Change plan-->
    <div class="change-plan" v-if="isSelectedPlan">
      <button class="default-btn" @click="changePlan()">Trocar plano</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanCard',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    isSelectedPlan: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  methods: {
    signUp(planId) {
      this.$router.push({ path: `/sign-up/${planId}` });
    },
    changePlan() {
      this.$router.push({ path: '/choose-a-plan' });
    },
  },
}
</script>

<style scoped>
@import url('@/assets/styles/card.css');
</style>
