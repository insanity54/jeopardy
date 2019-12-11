<template>
  <div class="game-host-board-controls">
    <PlayerSelector />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PlayerSelector from './PlayerSelector';
export default {
  name: 'GameHostBoardControls',
  components: {
    PlayerSelector
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  height: 5vh;
  width: 100vw;
  top: 94vh;
  user-select: none;
}
.button {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 10px 5px 10px;
  margin: 0 3px 0 3px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
