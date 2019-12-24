<template>
  <div class="final-reveal">
    <PlayerTitle :playerId="player.id" />
    <div v-if="!player">
      <h1 class="title">Jepurdee</h1>
    </div>
    <div v-if="player" class="juice">
      <div class="question">
        {{ finalQuestion }}
      </div>
      <hr>
      <div class="wager">
        {{ finalWager }}
      </div>
    </div>
  </div>
</template>

<script>
import PlayerTitle from '@/components/Player/PlayerTitle';
import { mapGetters } from 'vuex';
export default {
  name: 'FinalJepurdee',
  components: {
    PlayerTitle
  },
  props: {
    playerId: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters([
      'finalPlayers'
    ]),
    isPlayerRevealStateQuestion: function() {
      return (this.player.revealState === 'question') ? true : false;
    },
    isPlayerRevealStateWager: function() {
      return (this.player.revealState === 'wager') ? true : false;
    },
    finalWager: function () {
      return this.player.finalWager;
    },
    finalQuestion: function () {
      return this.player.finalQuestion;
    },
    player: function () {
      if (!this.playerId) return false;
      return this.$store.state.players.find((p) => p.id === this.playerId);
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  @font-face {
    font-family: 'Good Dog Plain';
    src: url('~@/assets/GOODDP__.TTF');
  }
  @font-face {
    font-family: 'James Almacen';
    src: url('~@/assets/JamesAlmacen.ttf');
  }
  .title {
    font-family: 'Good Dog Plain';
  }
  .final-reveal {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    background-color: navy;
    font-size: 56pt;
  }
  .question {
    margin: 0.3em;
  }
  .question, .wager {
    font-family: 'James Almacen';
  }
</style>
