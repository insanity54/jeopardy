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

    <div class="test-answers">
      <h2>Test Answers</h2>
      <h3>Category: True or False</h3>
      <hr>
      <p>A: AT A TRACK MEET, IT HAPPENS WHEN A RUNNER JUMPS THE GUN</p>
      <p>Q: A FALSE START</p>
      <hr>
      <p>A: IT’S A CALL TO THE FIRE DEPARTMENT WHEN THERE TRULY IS NO FIRE</p>
      <p>Q: A FALSE ALARM</p>
      <hr>
      <p>A: IT’S A CALL TO THE FIRE DEPARTMENT WHEN THERE TRULY IS NO FIRE</p>
      <p>Q: A FALSE ALARM</p>
      <hr>
      <p>A: THE SENDER OF GIFTS IN “THE TWELVE DAYS OF CHRISTMAS”</p>
      <p>Q: MY TRUE LOVE</p>
      <hr>
      <p>A: IT’S A HIGH-PITCHED SINGING VOICE FOR MEN</p>
      <p>Q: FALSETTO</p>
      <hr>
      <p>A: RHYMING PHRASE THAT DESCRIBES A LOYAL PERSON, NOT ONE WHO’S HOLDING HIS BREATH</p>
      <p>Q: TRUE-BLUE</p>
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
