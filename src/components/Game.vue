<template>
  <div class="game">
    <ScoreBoard/>
    <h1>{{ game.name }}</h1>
    <div v-if="edit" class="debug blink">EDIT MODE</div>
    <GameBoard :edit="edit"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
export default {
  name: 'Game',
  components: {
    ScoreBoard,
    GameBoard
  },
  props: {

  },
  computed: {
    ...mapGetters([
      'game',
      'gameId'
    ]),
    edit: function () {
      return (this.$route.query.edit === "1");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game {
  color: white;
  user-select: none;
}
.debug {
  color: red;
}
.blink {
  animation: blinker 1.7s cubic-bezier(.5, 0, 1, 1) infinite alternate;
}
@keyframes blinker { to { opacity: 0; } }
</style>
