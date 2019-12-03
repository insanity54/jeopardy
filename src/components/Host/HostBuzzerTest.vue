<template>
  <div class="host-buzzer-test">
    <h1>Buzzer Test</h1>
    <div class="selection">
      <div class="indicator-led" :class="{ 'enable-led-on': !isBuzzerLocked }">
      </div>
      <div class="button biggo enable" @click="unlockBuzzer">
        <span>Enable</span>
      </div>
    </div>

    <div class="selection">
      <div class="indicator-led" :class="{ 'clear-led-on': isBuzzerLocked }">
      </div>
      <div class="button biggo clear" @click="lockBuzzer">
        <span>Clear</span>
      </div>
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
.selection {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.indicator-led {
  border: 3px solid grey;
  border-radius: 50%;
  width: 1em;
  height: 1em;
}
.enable-led-on {
  background-color: lime;
}
.clear-led-on {
  background-color: red;
}
.biggo {
  height: 150px;
  width: 100%;
  border: 3px solid grey;
  margin: 1em;
  background-color: goldenrod;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.enable {
  background-color: blue;
}
.clear {
  background-color: #1a1a1a;
  border: 3px solid grey;
}
.clear span {
  text-transform: uppercase;
  font-weight: bold;
}
.enable span {
  text-transform: uppercase;
  font-weight: bold;
}
</style>
