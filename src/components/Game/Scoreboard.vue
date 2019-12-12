<template>
  <div class="scoreboard">
    <transition-group class="list" name="leet">
      <PlayerScore v-for="player in sortedPlayers" :key="player.id" :player="player"></PlayerScore>
    </transition-group>
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
      }).sort((a, b) => b.score - a.score);
    }
  },
  methods: {
    selectPlayer: function (p) {
      return this.$store.commit('selectPlayer', p);
    },
    setSelectedPlayer: function (p) {
      return this.$store.commit('setSelectedPlayer', p);
    }
  }
}
</script>

<style>
.list {
  width: 100%;
}
.leet-move {
  transition: transform 1s;
}
.scoreboard {
  color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 5000;
  width: 100%;
  margin: 5px;
  overflow: hidden;
}
</style>
