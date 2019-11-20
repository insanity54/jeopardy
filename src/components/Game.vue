<template>
  <div class="game">
    <h1 class="title" @click="openTitleEditor" v-if="isEditMode">{{ game.name }}</h1>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Game',
  data: function () {
    return {
    }
  },
  components: {
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
