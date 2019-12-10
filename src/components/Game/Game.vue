<template>
  <div class="game">
    <AudioPlayer />
    <div v-if="game.id === ''" class="no-game-error">
      <p>So sorry, the game {{ gameId }} does not exist on this device.</p>
    </div>
    <h1 class="title" @click="openTitleEditor" v-if="isEditMode">{{ game.name }}</h1>
    <div class="layout">
      <router-view class="view default" :class="{ 'host': isHostRole, 'jumbotron': !isHostRole }" name="default" />
      <router-view v-if="isJumbotronRole" class="view sidebar" name="sidebar" />
      <router-view class="view controls" name="controls" />
    </div>
    <Revealer v-if="isHostRole" />
  </div>
</template>

<script>
import Revealer from '@/components/Controls/Revealer';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
export default {
  name: 'Game',
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
      console.log(`openAnswer socket emission with gameId:${gameId}, answer:${answerId}`)
      this.$store.commit('setActiveAnswer', answerId);
      this.$store.dispatch('openAnswer', gameId, answerId);
    }
  },
  components: {
    Revealer,
    AudioPlayer,
  },
  props: {

  },
  computed: {
    game: function () {
      return this.$store.state.game.game;
    },
    isHostRole: function () {
      return (this.$store.state.meta.role === 'host');
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
    },
    isJumbotronRole: function () {
      return (this.$store.state.meta.role === 'jumbotron');
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
  },
  created: function () {
    console.log(`game id is ${this.game.id}`);
    if (this.game.id === '') {
      console.log('downloading game');
      this.$store.dispatch('downloadGame', this.gameId).then((g) => {
        this.$store.commit('loadGame', g.id);
      });
    }
  }
}
</script>

<style scoped>
.default.host {
  width: 100vw;
}
.default.jumbotron {
  width: 79vw;
}
.layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.sidebar {
  width: 19vw;
}
.default {
}
.controls {
  width: 100vw;
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
