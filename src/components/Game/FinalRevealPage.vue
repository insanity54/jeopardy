<template>
  <div class="final-reveal">
    <div v-if="!player">
      <h1 class="title">Jepurdee</h1>
    </div>
    <div v-if="player" class="juice">
      <div v-show="isPlayerRevealStateQuestion" class="question">
        {{ finalQuestion }}
      </div>
      <hr>
      <div v-show="isPlayerRevealStateWager" class="wager">
        {{ finalWager }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'FinalJepurdee',
  components: {
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
  .title {
    font-family: 'Good Dog Plain';
  }
  .final-reveal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: navy;
    font-size: 56pt;
  }
  .category {
    height: 10%;
    cursor: default;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: navy;
    margin-bottom: 5px;
    text-transform: uppercase;
    text-shadow: 2px 2px black;
    font-weight: bold;
    padding: 0.5em 5px 0.5em 5px;
  }
  .answer {
    height: 90%;
    width: 100%;
    color: white;
    font-family: Georgia;
    font-size: 3em;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: navy;
    text-shadow: 2px 2px black;
    user-select: none;
    overflow: hidden;
  }
</style>
