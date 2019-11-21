<template>
  <div class="host-buzzer-test">
    <h1>Buzzer Test</h1>
    <div class="button biggo" @click="unlockBuzzer">
      <i class="material-icons">lock_open</i><span>Unlock Buzzer (Enable)</span>
    </div>
    <div class="indicator-led">
      <span><i class="material-icons">{{ indicatorIcon }}</i></span>
    </div>
    <div class="button biggo" @click="lockBuzzer">
      <i class="material-icons">lock</i><span>Lock Buzzer (Clear)</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HostBuzzerTest',
  components: {
  },
  sockets: {
  },
  computed: {
    indicatorIcon: function () {
      return (this.isBuzzerLocked) ? 'arrow_downward' : 'arrow_upward';
    },
    indicatorText: function () {
      return (this.isBuzzerLocked) ? 'the buzzer is locked' : 'the buzzer is unlocked';
    },
    isBuzzerLocked: function () {
      return this.$store.state.buzzer.isLocked
    }
  },
  methods: {
    unlockBuzzer: function () {
      this.$store.commit('unlockBuzzer');
      this.$socket.emit('unlockBuzzer');
    },
    lockBuzzer: function () {
      this.$store.commit('lockBuzzer');
      this.$socket.emit('lockBuzzer');
    }
  }
}
</script>

<style scoped>
.host-buzzer-test {
  color: white;
}
.biggo {
  height: 150px;
  border: 3px solid grey;
  margin: 1em;
  background-color: goldenrod;
}
</style>
