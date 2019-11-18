<template>
  <div class="buzzer button" :style="{backgroundColor: player.color}" :class="{selected: isBuzzWinner, locked: isButtonLocked}" @click.prevent="clickPlayer(player)">
    {{ player.name }}
  </div>
</template>

<script>
export default {
  name: 'BuzzerButton',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  computed: {
    isButtonLocked: function () {
      if (this.$store.state.game.game.buzzerLock) return true;
      return false;
    },
    isBuzzWinner: function () {
      return (this.player.buzzWinner);
    }
  },
  methods: {
    buzzPlayer: function (p) {
      return this.$store.commit('buzzPlayer', p);
    },
    clickPlayer: function (p) {
      if (this.$store.state.game.buzzerLock) return;
      return this.buzzPlayer(p);
    },
  }
}
</script>

<style scoped>
.selected {
  text-decoration: underline overline;
}
div.buzzer.locked {
  background-color: grey !important;
}
</style>
