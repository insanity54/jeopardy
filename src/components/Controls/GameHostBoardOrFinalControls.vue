<template>
  <div class="game-host-board-or-final-controls">
    <GameHostFinalControls v-if="isFinalJepurdee" />
    <GameHostBoardControls v-if="isDoubleJepurdee || isSingleJepurdee" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameHostBoardControls from './GameHostBoardControls';
import GameHostFinalControls from './GameHostFinalControls';
export default {
  name: 'GameHostBoardOrFinalControls',
  components: {
    GameHostBoardControls,
    GameHostFinalControls,
  },
  computed: {
    ...mapGetters([
      'isFinalJepurdee',
      'isDoubleJepurdee',
      'isSingleJepurdee'
    ]),
  },
}
</script>

<style scoped>
</style>
