<template>
  <div class="game-host-board-or-final-controls">
    <GameHostFinalControls v-if="isFinalJepurdee" />
    <GameHostBoardControls v-if="isDoubleJepurdee || isSingleJepurdee" />
  </div>
</template>

<script>
import GameHostBoardControls from './GameHostBoardControls';
import GameHostFinalControls from './GameHostFinalControls';
export default {
  name: 'GameHostBoardOrFinalControls',
  components: {
    GameHostBoardControls,
    GameHostFinalControls,
  },
  computed: {
    gameType: function () {
      return this.$store.state.game.game.gameType
    },
    isFinalJepurdee: function () {
      return (this.gameType === 'final');
    },
    isDoubleJepurdee: function () {
      return (this.gameType === 'double');
    },
    isSingleJepurdee: function () {
      return (this.gameType === 'single');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
