<template>
  <div class="container">
    <!--Top items-->
    <h1 class="title fade-left">
      Olá
      <span class="fade-left" v-if="username">
        {{ username }},
      </span>
    </h1>
    <p class="default-text">
      Seja bem vindo a sua conta de hospedagem.
    </p>

    <!--YouTube Video-->
    <div class="video-iframe">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/fpa2W3YNg0Q"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </div>

    <!--Bottom item-->
    <div class="default-text">
      Caso tenha alguma dúvida, visite nossa <a href="#">central de ajuda.</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoFrame',
  props: {
    username: {
      type: String,
      required: true,
      default: () => 'João',
    },
  },
}
</script>

<style scoped>
.container {
  min-width: 60%;
  max-width: 980px;
  width: 95%;
  margin: 60px auto 50px;
}

.title {
  margin-bottom: 15px;
  text-transform: capitalize;
}

.video-iframe {
  width: 100%;
  height: 648px;
  max-height: 80vw;
  margin: 35px 0px;
}
</style>
