<template>
  <div class="player-button button" :style="{ backgroundColor: player.color }" :class="{ selected: isSelectedPlayer, locked: isButtonLocked }" @click.prevent="clickPlayer">
    <p>{{ player.score }}</p>
    <p>{{ player.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'PlayerButton',
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
    }
  },
  methods: {
    setSelectedPlayer: function (p) {
      this.$store.commit('setSelectedPlayer', p);
      this.$socket.emit('setSelectedPlayer', p);
    },
    clickPlayer: function () {
      if (this.isButtonLocked) return;
      else return this.setSelectedPlayer(this.player);
    },
  }
}
</script>

<style scoped>
  .player-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    margin: 5px;
    font-weight: bold;
    text-shadow: 0 0 5px black;
  }
  .selected {
    text-decoration: underline;
    text-shadow: 3px 3px black;
  }
  div.player.locked {
    background-color: grey;
  }
</style>
