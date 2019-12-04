<template>
  <div class="game">
    <div v-if="game.id === ''" class="no-game-error">
      <p>So sorry, the game {{ gameId }} does not exist on this device.</p>
    </div>
    <h1 class="title" @click="openTitleEditor" v-if="isEditMode">{{ game.name }}</h1>
    <router-view />
    <Revealer v-if="isHostRole" />
  </div>
</template>

<script>
import Revealer from '@/components/Controls/Revealer';
export default {
  name: 'Game',
  data: function () {
    return {
    }
  },
  components: {
    Revealer
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
    if (this.game.id === '') {
      this.$store.dispatch('downloadGame', this.gameId)
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
