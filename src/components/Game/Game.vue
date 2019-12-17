<template>
  <div class="game">
    <AudioPlayer v-if="isJumbotronRole"/>
    <div v-if="!isGameInVuex" class="no-game-error">
      <p>So sorry, the game {{ gameId }} does not exist on this device.</p>
    </div>
    <h1 class="title" @click="openTitleEditor" v-if="isEditMode">{{ game.name }}</h1>
    <div class="layout">
      <router-view class="view default" :class="{ 'host': isHostRole, 'jumbotron': !isHostRole }" name="default" />
      <router-view v-if="isJumbotronRole" :class="{ 'host': isHostRole, 'jumbotron': !isHostRole }" class="view sidebar" name="sidebar" />
      <router-view v-if="isHostRole" class="view host controls" name="controls" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
export default {
  name: 'Game',
  components: {
    AudioPlayer,
  },
  data: function () {
    return {
    }
  },
  sockets: {
    revealAnswers: function () {
      this.$root.$emit('play-audio', 'generate');
      this.$store.dispatch('revealAnswers');
    },
    revealCategory: function () {
      this.$store.commit('revealCategory');
    },
    restartGame: function () {
      this.$store.commit('restartGame', this.$store.state.game.id);
      this.$store.commit('resetScores');
    },
    openAnswer: function (evt) {
      let { answerId, gameId } = evt;
      this.$store.commit('setActiveAnswer', answerId);
      this.$store.dispatch('openAnswer', { gameId, answerId });
    },
    doAnswerTimeout: function (evt) {
      this.$root.$emit('play-audio', 'timeout');
      this.$store.dispatch('doAnswerTimeout', evt);
    },
    doPlayerTimeout: function (evt) {
      this.$root.$emit('play-audio', 'timeout');
      this.$store.dispatch('doPlayerTimeout', evt);
    },
    doPlayerCorrect: function (evt) {
      this.$store.dispatch('doPlayerCorrect', evt);
    },
    doPlayerIncorrect: function (evt) {
      this.$store.dispatch('doPlayerIncorrect', evt);
    },
    setSelectedPlayer: function (evt) {
      this.$store.commit('setSelectedPlayer', evt);
    },
    submitWager: function (evt) {
      this.$store.commit('submitWager', evt);
    },
    buzzPlayer: function (evt) {
      this.$store.commit('buzzPlayer', evt);
    },
    buzzWinner: function (evt) {
      this.$store.commit('buzzPlayer', evt);
    }
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'isHostRole',
      'isJumbotronRole'
    ]),
    isGameInVuex: function () {
      return (this.game.id !== '');
    },
    game: function () {
      return this.$store.state.game.game;
    },
    gameId: function () {
      return this.$route.params.gameId;
    },
    isEditMode: function () {
      return this.$store.state.meta.edit;
    },
    isAnswerScreen: function () {
      return (
        typeof this.$route.query.category !== 'undefined' &&
        typeof this.$route.query.item !== 'undefined'
      );
    },
    transitionStyle: function () {
      return 'fade';
    }
  },
  methods: {
    openTitleEditor: function() {
      if (this.isEditMode) {
        this.$router.push({
          path: `/game/${this.gameId}/title`
        });
      }
    }
  },
  created: function () {
    if (!this.isGameInVuex) {
      console.log(`downloading game ${this.gameId}`);
      this.$store.dispatch('downloadGame', this.gameId).then((g) => {
        this.$store.commit('loadGame', g.id);
      });
    }
  }
}
</script>

<style scoped>
  .layout {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100vw;
    height: 100vh;
  }
  .default {
  }
  .default.host {
    width: 100vw;
    height: 60vh;
  }
  .default.jumbotron {
    width: 79vw;
    height: 100vh;
  }
  .sidebar {
    width: 19vw;
  }
  .controls.host {
    width: 100vw;
  }
  @media screen and (min-width: 601px) {
    .controls.host {
      height: 30vh;
    }
    .default.host {
      height: 70vh;
    }
  }
  @media screen and (max-width: 600px) {
    .controls.host {
      height: 60vh;
    }
    .default.host {
      height: 40vh;
    }
  }
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
