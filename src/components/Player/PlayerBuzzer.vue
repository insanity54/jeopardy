<template>
  <div class="player-buzzer">
    <p>why you no?</p>
    <div class="player-buzzer-heading" :style="{ backgroundColor: player.color }">
      <h1>{{ player.name }}</h1>
    </div>
    <div class="player-buzzer-content" :style="{ border: indicatorBorder }">
      <div class="buzzer-button" @click="doBuzz">
        <i class="material-icons">bolt</i>
        <span>Buzz</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { Compact } from 'vue-color';

export default {
  name: 'PlayerBuzzer',
  components: {
  },
  data: function () {
    return {
      isEditMode: false
    }
  },
  props: {
  },
  methods: {
    doBuzz: function () {
      this.$socket.emit('buzz', { id: this.pid, time: Date.now() });
    }
  },
  computed: {
    isBuzzerLock: function () {
      return this.$store.state.game.game.buzzerLock;
    },
    indicatorColor: function () {
      return (this.isBuzzerLock) ? 'black' : 'yellow';
    },
    indicatorBorder: function () {
      return (this.isBuzzerLock) ? '20px solid white' : '20px solid lime';
    },
    playerColor: function () {
      return this.player.color
    },
    pid: function () {
      return this.$route.params.playerId;
    },
    player: function () {
      return this.$store.state.players.find((p) => p.id === this.pid);
    },
  },
}
</script>

<style scoped>
  .player-buzzer {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: black;
  }

  .player-buzzer-heading {
    padding: 2em;
    -moz-text-fill-color: #000;
    -webkit-text-fill-color: #000;
    -moz-text-stroke-color: grey;
    -webkit-text-stroke-color: grey;
    -moz-text-stroke-width: 1px;
    -webkit-text-stroke-width: 1px;
  }

  .player-buzzer-content {
    background-color: white;
    padding: 1em 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 60vh;
  }

  .buzzer-indicator {
    height: 100%;
    width: 20px;
    border: 3px solid black;
    margin: 0;
  }

  .buzzer-button {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
    width: 150px;
    border: 8px solid black;
    background-color: green;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    cursor: pointer;
  }

  .buzzer-button:active {
    transform: scale(0.95);
  }

  .buzzer-button i {
    color: goldenrod;
  }

</style>
