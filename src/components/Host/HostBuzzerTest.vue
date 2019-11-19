<template>
  <div class="host-buzzer-test">
    <h1>Buzzer Test</h1>
    <div class="button biggo" @click="unlockBuzzer">
      <i class="material-icons">lock_open</i><span>Unlock Buzzer</span>
    </div>
    <div class="button biggo" @click="lockBuzzer">
      <i class="material-icons">lock</i><span>Lock Buzzer</span>
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
  background-color: goldenrod;
}
</style>
