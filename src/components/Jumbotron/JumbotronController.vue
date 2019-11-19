<template>
  <div class="jumbotron-controller">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'JumbotronController',
  components: {
  },
  sockets: {
    routeToScreen: function (data) {
      let { screenName } = data;
      if (screenName === 'players') this.$router.push('/jumbotron/players');
      else if (screenName === 'buzzerTest') this.$router.push('/jumbotron/buzzerTest');
    },
    unlockBuzzer: function () {
      this.$store.commit('unlockBuzzer');
    },
    lockBuzzer: function () {
      this.$store.commit('lockBuzzer');
    }
  }
}
</script>

<style scoped>
</style>
