<template>
  <div class="game-board-or-final">
    <FinalJepurdee v-if="isFinalJepurdee" />
    <GameBoard v-if="isDoubleJepurdee || isSingleJepurdee" />
  </div>
</template>

<script>
import GameBoard from './GameBoard';
import FinalJepurdee from './FinalJepurdee';
export default {
  name: 'GameBoardOrFinal',
  components: {
    GameBoard,
    FinalJepurdee,
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
