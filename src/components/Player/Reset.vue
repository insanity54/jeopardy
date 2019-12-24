<template>
  <div class="reset">
    <h1>Resetter</h1>
    <i class="material-icons">refresh</i>
  </div>
</template>

<script>
export default {
  name: 'Reset',
  components: {
  },
  data: function () {
    return {
    }
  },
  props: {
  },
  methods: {
    resetAllData: function () {
      this.$store.commit('deleteAllPlayers');
      this.$store.commit('resetAllMeta');
    },
  },
  computed: {
  },
  created: function () {
    console.log('resetting in 3 seconds...')
    window.setTimeout(() => {
      console.log('reset!');
      this.resetAllData();
      this.$router.replace('/player/join');
    }, 3000);
  }
}
</script>

<style scoped>
  .reset {
    color: white;
    background-color: red;
    height: 100vh;
    width: 100vw;
    border: 3px solid red;
  }

  .reset i {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotateZ(-360deg);
    }
    to {
      transform: rotateZ(0deg);
    }
  }
</style>
