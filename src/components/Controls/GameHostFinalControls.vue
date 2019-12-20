<template>
  <div class="game-host-final-controls">
    <Revealer />
    <Spacer />
    <FinalLifecycleControls />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Spacer from './Spacer';
import FinalLifecycleControls from './FinalLifecycleControls';
import Revealer from './Revealer';
export default {
  name: 'GameFinalControls',
  components: {
    FinalLifecycleControls,
    Revealer,
    Spacer
  },
  computed: {
    ...mapState({
      answer: state => state.game.game.answer,
      gameType: state => state.game.game.type,
      wagers: state => state.game.game.wagers,
    }),
    ...mapGetters([
      'selectedPlayer',
      'isDailyDouble'
    ])
  },
  props: {
  },
  methods: {
  }
}
</script>

<style>
.game-host-answer-controls {
  color: white;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 5000;
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
