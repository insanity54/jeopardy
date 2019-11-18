<template>
  <div class="player button" :style="{backgroundColor: player.color}" :class="{selected: isSelectedPlayer, locked: isButtonLocked}" @click.prevent="clickPlayer(player)">
    {{ player.name }} {{ player.score }}
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
.selected {
  text-decoration: underline overline;
}
div.player.locked {
  background-color: grey;
}
</style>
