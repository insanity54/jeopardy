<template>
  <div class="scoreboard">
    <PlayerScore v-for="player in players" :key="player.id" :player="player"></PlayerScore>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import PlayerScore from '@/components/Player/PlayerScore';
export default {
  name: 'PlayerSelector',
  components: {
    PlayerScore
  },
  props: {
  },
  computed: {
    ...mapState({
      players: state => state.players
    }),
    ...mapGetters([
      'selectedPlayer'
    ]),
    sortedPlayers: function () {
      return this.players.map((p) => {
        if (typeof p.score === 'undefined') {
          p.score === 0;
        }
        else if (!p.score) {
          p.score === 0;
        }
        return p;
      }).sort((a, b) => a.score - b.score);
    }
  },
  methods: {
    selectPlayer: function (p) {
      return this.$store.commit('selectPlayer', p);
    },
    setChooserPlayer: function (p) {
      return this.$store.commit('setChooserPlayer', p);
    }
  }
}
</script>

<style>
.scoreboard {
  color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
