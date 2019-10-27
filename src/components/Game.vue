<template>
  <div class="game">
    <div v-if="edit" class="debug blink">EDIT MODE</div>
    <router-view />
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="scoreOrControls"></component>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameBoard from './GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import Controls from '@/components/Controls';
export default {
  name: 'Game',
  data: function () {
    return {
    }
  },
  components: {
    GameBoard,
    'score': ScoreBoard,
    'controls': Controls,
  },
  props: {

  },
  computed: {
    ...mapGetters([
      'game',
      'gameId'
    ]),
    edit: function () {
      return (this.$store.state.meta.edit === true);
    },
    isAnswerScreen: function () {
      return (
        typeof this.$route.query.category !== 'undefined' &&
        typeof this.$route.query.item !== 'undefined'
      );
    },
    scoreOrControls: function () {
      return (this.isAnswerScreen) ? 'controls' : 'score';
    },
    transitionStyle: function () {
      return 'fade';
    },
  },
  methods: {
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
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
