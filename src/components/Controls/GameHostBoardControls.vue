<template>
  <div class="game-host-board-controls">
    <Revealer />
    <PlayerSelector />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PlayerSelector from './PlayerSelector';
import Revealer from './Revealer';
export default {
  name: 'GameHostBoardControls',
  components: {
    PlayerSelector,
    Revealer,
  },
  computed: {
    ...mapState({
      answer: state => state.game.game.answer,
      gameType: state => state.game.game.type,
      wagers: state => state.game.game.wagers,
    }),
    ...mapGetters([
      'selectedPlayer'
    ])
  },
  props: {
  },
  methods: {
  }
}
</script>

<style>
.game-host-board-controls {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  user-select: none;
}
</style>
