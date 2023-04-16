<template>
  <div class="case">
    <Header :username="username" />
    <p class="default-text error" v-if="error">
      {{ error.message }}
    </p>
    <VideoFrame :username="username" />
  </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import Header from '@/components/Header.vue';
import VideoFrame from '@/components/VideoFrame.vue';

export default {
  name: 'HomeView',
  components: {
    Header,
    VideoFrame,
  },
  data() {
    return {
      username: '',
      error: null,
    }
  },
  methods: {
    async setUsername() {
      try {
        const userId = this.$route.params.id;
        const request = await ApiService.login(userId);

        this.username = request.data.name.firstname;
      } catch(err) {
        this.error = err;
      }
    }
  },
  mounted() {
    this.setUsername();
    window.scrollTo(0, 0);
  },
}
</script>

<style scoped>
.case {
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 30px 0px 60px;
}
</style>