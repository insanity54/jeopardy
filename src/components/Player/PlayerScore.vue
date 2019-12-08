<template>
  <div class="player-score" :style="{ backgroundColor: player.color }">
    <p>{{ player.score }} {{ player.name }}</p>
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
.player-score {
  display: flex;
  box-sizing: border-box;
  margin: 0.2em 1em;
  padding: 1em;
  font-weight: bold;
  text-shadow: 0 0 5px black;
}
</style>
