<template>
  <div class="controls">
    <Spacer/>
    <EditModeToggle/>
    <Wager :wagers="wagers" :answer="answer" :gameType="gameType" :selectedPlayer="selectedPlayer"/>
    <Spacer/>
    <Unlocker :isBuzzableScreen="isBuzzableScreen"/>
    <div class="spacer"></div>
    <BuzzerSelector :isBuzzableScreen="isBuzzableScreen"/>
    <div class="spacer"></div>
    <ResultRegistrator :answer="answer"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EditModeToggle from './EditModeToggle';
import Spacer from './Spacer';
import BuzzerSelector from './BuzzerSelector';
import Wager from './Wager';
import ResultRegistrator from './ResultRegistrator';
import Unlocker from './Unlocker';
export default {
  name: 'Controls',
  components: {
    EditModeToggle,
    BuzzerSelector,
    ResultRegistrator,
    Unlocker,
    Wager,
    Spacer
  },
  computed: {
    ...mapState({
      answer: state => state.game.game.answer,
      gameType: state => state.game.game.type,
      wagers: state => state.game.game.wagers,
    }),
    ...mapGetters([
      'selectedPlayer'
    ]),
    isBuzzableScreen: function () {
      if (this.answer.dailyDouble === true) return false;
      return true;
    }
  },
  props: {
  },
  methods: {
  }
}
</script>

<style>
.controls {
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
