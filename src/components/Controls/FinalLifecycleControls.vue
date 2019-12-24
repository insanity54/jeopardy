<template>
  <div class="final-lifecycle">
    <div v-if="!started" class="button final" @click="routePlayersToFinal">
      <i class="material-icons">directions</i>Route Players To Final Screen
    </div>
    <Revealer />
    <div v-if="true" class="button start" @click="startFinalTimer">
      <i class="material-icons">music_note</i>Play 30 second countown music
    </div>
    <div v-if="!timeup" class="button reveal" @click="timeUp">
      <i class="material-icons">timer</i>Time up!
    </div>
    <div v-if="timeup" class="final-player-list">
      <div class="button player" v-for="player in finalPlayers" :key="player.id" :style="{ backgroundColor: player.color }" @click="revealPlayerFinal(player.id)">
        <i class="material-icons">flip_to_front</i>{{ player.name }}
      </div>
    </div>
    <div v-if="isFinalStateCategory" class="wager-view">

    </div>
  </div>
</template>

<script>
import Revealer from '@/components/Controls/Revealer';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'FinalLifecycleControls',
  components: {
    Revealer,
  },
  data: function () {
    return {
      started: false,
      timeup: false
    }
  },
  computed: {
    ...mapGetters([
      'finalPlayers',
      'isFinalJepurdee',
      'isAllCategoriesRevealed',
      'isAllAnswersRevealed',
      'isFinalStateIntro',
      'isFinalStateCategory',
      'isFinalStateAnswer',
      'isFinalStateReveal',
    ]),
    ...mapState({
      game: state => state.game.game,
    }),
    isEditMode: function () {
      return this.$store.state.meta.edit;
    },
  },
  props: {
  },
  methods: {
    startFinalTimer: function () {
      this.started = true;
      this.$socket.emit('startFinalTimer');
    },
    routePlayersToFinal: function () {
      this.$socket.emit('syncPlayerData', this.$store.state.players);
      this.$socket.emit('routeToScreen', { screenName: 'final', id: this.game.id });
      this.$socket.emit('unlockFinal');
      this.$store.commit('unlockFinal');
    },
    timeUp: function () {
      this.timeup = true;
      this.$socket.emit('syncPlayerData', this.$store.state.players);
      this.$socket.emit('routeToScreen', { screenName: 'reveal', id: this.game.id });
      this.$socket.emit('advanceFinalState');
    },
    revealPlayerFinal: function (playerId) {
      let payload = { playerId: playerId, gameId: this.game.id };
      this.$socket.emit('revealPlayerFinal', payload);
    }
  }
}
</script>

<style scoped>
.final-player-list {
  display: flex;
  flex-wrap: wrap;
}
.button.player {
  color: white;
}
.button.reveal {
  background-color: red;
}
.button.final {
  background-color: orange;
}
.button.start {
  background-color: green;
}
.revealer {
  display: flex;
  flex-direction: row;
  z-index: 9999;
}
.revealer .button:nth-child(1) {
  background-color: purple;
}
.revealer .button:nth-child(2) {
  background-color: green;
}
.final-lifecycle {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
