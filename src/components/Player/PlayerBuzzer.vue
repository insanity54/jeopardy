<template>
  <div class="player-buzzer">
    <div class="player-buzzer-heading" :style="{ backgroundColor: player.color }">
      <h1>{{ player.name }}</h1>
    </div>
    <div class="player-buzzer-content" :style="{ backgroundColor: indicatorColor }">
      <div v-if="isPenalized" class="buzzer-penalty">
        <div class="buzzer-penalty-progress-bar"></div>
        <div class="buzzer-penalty-text"><p>Early Buzz Penalty</p></div>
      </div>
      <div v-if="!isPenalized" class="buzzer-button" @click="doBuzz">
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
      isPenalized: false,
      penaltyEndEpoch: 0,
      penaltyTimer: null
    }
  },
  props: {
  },
  methods: {
    doPenalty: function () {
      this.isPenalized = true;
      clearTimeout(this.penaltyTimer);
      this.penaltyTimer = window.setTimeout(this.doClearPenalty.bind(this), 500);
    },
    doClearPenalty: function () {
      this.isPenalized = false;
    },
    doBuzz: function () {
      if (this.isBuzzerLock) {
        this.doPenalty();
      } else {
        let buzzEvent = {
          buzzEpoch: Date.now(),
          unlockEpoch: this.lastUnlockEpoch,
          id: this.pid
        };
        this.$socket.emit('buzz', buzzEvent);
        this.$store.commit('buzz', buzzEvent);
      }
    }
  },
  computed: {
    unlockLog: function () {
      return this.$store.state.buzzer.unlockLog;
    },
    lastUnlockEpoch: function () {
      return this.unlockLog[this.$store.state.buzzer.unlockLog.length-1]
    },
    isBuzzerLock: function () {
      return this.$store.state.buzzer.isLocked;
    },
    indicatorColor: function () {
      return (this.isBuzzerLock) ? 'black' : '#33ff33';
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
    background-color: black;
    padding: 1em 0;
    display: flex;
    flex-direction: column;
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

  .buzzer-penalty {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .buzzer-penalty-text p {
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    animation: blinker 0.5s linear infinite;
    font-size: 24pt;
  }
  .buzzer-penalty-progress-bar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 158px;
    background-color: red;
    animation: shrinker 0.5s linear 1;
    margin: 10px 0;
  }

  @keyframes blinker {
    50% {
      text-shadow: 0 0 10px red;
    }
  }

  @keyframes shrinker {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }

  .buzzer-button {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
    width: 150px;
    border: 8px solid #404040;
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
