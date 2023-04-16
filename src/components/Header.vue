<template>
  <div class="header">
    <img src="@/assets/images/logo.svg" alt="logo">
    <div class="profile-box fade-up" @click="menu = !menu" v-if="username">
      {{ username[0] }}
      <button class="default-text exit-btn" v-if="menu" @click="logOut()">Sair</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderVue',
  props: {
    username: {
      type: String,
      required: true,
      default: () => 'João',
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    logOut() {
      this.$router.push({ path: '/' });
    }
  },
}
</script>

<style scoped>
.header {
  width: 95%;
  margin: 0px auto;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-box {
  width: 52px;
  height: 52px;
  position: relative;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  background-color: #D9D9D9;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  transition: .3s;
}

.profile-box:hover {
  background-color: #d1d1d1;
}

.exit-btn {
  position: absolute;
  transform: translateY(50px);
  padding: 10px 15px;
  text-align: center;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  transition: 0.3s;
}

.exit-btn:hover {
  background-color: #d1d1d1;
  cursor: pointer;
}
</style>
