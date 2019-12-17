<template>
  <div class="player-score" :style="{ 'backgroundColor': player.color }" :class="{ 'selected': isSelectedPlayer }">
    <p>{{ player.score }}</p>
    <i v-if="isBuzzWinner" class="buzz-win-indicator material-icons">offline_bolt</i>
    <p>{{ player.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'PlayerScore',
  props: {
    player: {
      type: Object,
      required: true
    },
  },
  computed: {
    isButtonLocked: function () {
      if (this.$store.state.game.buzzerLock === true) return true;
      return false;
    },
    isSelectedPlayer: function () {
      return this.player.chooser;
    },
    isBuzzWinner: function () {
      return this.player.buzzWinner;
    }
  },
  methods: {
    setSelectedPlayer: function (p) {
      return this.$store.commit('setSelectedPlayer', p);
    },
    /**
     * clickPlayer has the same effect as buzzing
     */
    clickPlayer: function (p) {
      if (this.isButtonLocked) return;
      else return this.setSelectedPlayer(p);
    },
  }
}
</script>

<style scoped>
.buzz-win-indicator {
  text-shadow: 0 0 0 white;
  color: black;
  animation: spin 1s linear infinite;
  perspective: 1000px;
}
.player-score {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 1em;
  margin: 0.25em 0;
  font-weight: bold;
  text-shadow: 0 0 5px black;
  width: 100%;
  box-sizing: border-box;
}
.player-score i {
  font-size: 10pt;
}
.selected {
  text-decoration: underline;
}
/* greetz https://codepen.io/kkhenriquez/pen/PGvmjm */


@keyframes spin {
  from {
    transform: rotateY(360deg);
  }
  to {
    transform: rotateY(0deg);
  }
}
</style>
