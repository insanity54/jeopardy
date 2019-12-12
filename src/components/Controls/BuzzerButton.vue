<template>
  <div class="buzzer button" :style="{ backgroundColor: player.color }" :class="{ 'selected': isSelectedPlayer, 'buzzed': isBuzzWinner, 'locked': isBuzzerLocked }" @click.prevent="buzzPlayer">
    <p><i v-if="isBuzzWinner" class="glyph material-icons">bolt</i></p>
    <p>{{ player.name }}</p>
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
    isBuzzWinner: function () {
      return (this.player.buzzWinner === true);
    },
    isSelectedPlayer: function () {
      return (this.player.chooser === true);
    },
    isBuzzerLocked: function () {
      return (this.$store.state.buzzer.isLocked === true);
    }
  },
  methods: {
    buzzPlayer: function () {
      if (this.isBuzzerLocked) return;
      let p = this.player;
      this.$socket.emit('buzzPlayer', p);
      this.$store.commit('buzzPlayer', p);
    }
  }
}
</script>

<style scoped>
.glyph {
  font-size: 12pt;
}
.buzzer {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
.buzzed {
}
.buzzer.selected {
  text-decoration: underline;
}
div.buzzer.locked {
  background-color: grey !important;
}
</style>
