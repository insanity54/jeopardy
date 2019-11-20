<template>
  <div class="player-button" :style="{backgroundColor: player.color}" :class="{selected: isSelectedPlayer, locked: isButtonLocked}" @click.prevent="clickPlayer(player)">
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
    setChooserPlayer: function (p) {
      return this.$store.commit('setChooserPlayer', p);
    },
    clickPlayer: function (p) {
      if (this.isButtonLocked) return;
      else return this.setChooserPlayer(p);
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
  margin: 0 5px;
  font-weight: bold;
  text-shadow: 0 0 5px black;
}
.selected {
  outline: 5px solid white;
}
div.player.locked {
  background-color: grey;
}
</style>
