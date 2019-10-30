<template>
  <div class="game">
    <AudioPlayer/>
    <h1 class="title" @click="openTitleEditor" v-if="isEditMode">{{ game.name }}</h1>
    <router-view />
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="scoreOrControls"></component>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
import GameBoard from './GameBoard';
import ScoreBoard from '@/components/Controls/ScoreBoard';
import Controls from '@/components/Controls/Controls';
export default {
  name: 'Game',
  data: function () {
    return {
    }
  },
  components: {
    AudioPlayer,
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
    isEditMode: function () {
      return this.$store.state.meta.edit;
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
    openTitleEditor: function() {
      if (this.isEditMode) {
        this.$router.push({
          path: `/game/${this.gameId}/title`
        });
      }
    }
  }
}
</script>

<style scoped>
.title {
  cursor: pointer;
}
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
</style>
