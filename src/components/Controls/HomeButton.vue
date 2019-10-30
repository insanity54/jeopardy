<template>
  <div @click="goToHome" class="home-button button">
    <i class="material-icons">home</i>
  </div>
</template>

<script>
export default {
  name: 'HomeButton',
  components: {
  },
  computed: {
  },
  props: {
  },
  methods: {
    goToHome: function () {
      this.$store.commit('updateGame', this.$store.state.game.game);
      this.$router.push('/');
    }
  }
}
</script>

<style>
.home-button {
  background-color: pink
}
</style>
