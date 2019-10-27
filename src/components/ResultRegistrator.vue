<template>
  <div class="result-registrator">
    <div class="button correct" :class="{locked: isCorrectButtonLocked}" @click.prevent="doPlayerCorrect"><i class="material-icons">check_circle_outline</i></div>
    <div class="button incorrect" :class="{locked: isIncorrectButtonLocked}" @click.prevent="doPlayerIncorrect"><i class="material-icons">close</i></div>
    <div class="button back" @click.prevent="doTimeout"><i class="material-icons">arrow_back_ios</i></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'ResultRegistrator',
  props: {
  },
  computed: {
    ...mapState({
      answer: state => state.game.game.answer,
      game: state => state.game.game,
    }),
    ...mapGetters([
      'isBuzzerLocked',
      'pointMultiplier',
      'gameId',
      'buzzWinner',
      'selectedPlayer',
    ]),
    isCorrectButtonLocked: function () {
      if (this.answer.dailyDouble === true && this.game.wager ) return false;
      return (this.isBuzzerLocked || (typeof this.buzzWinner === 'undefined'));
    },
    isIncorrectButtonLocked: function () {
      return this.isCorrectButtonLocked;
    },
    pointValue: function () {
      let pointMultiplier = this.game.pointMultiplier;
      return ((this.answer.item+1)*pointMultiplier);
    },
    category: function () {
      return parseInt(this.$route.query.category);
    },
    item: function () {
      return parseInt(this.$route.query.item);
    }
  },
  methods: {
    doPlayerCorrect: function () {
      if (this.isCorrectButtonLocked) return;
      this.$store.commit('incrementCompletedAnswerCounter');
      this.$store.commit('makeUnavailable', `${this.category}${this.item}`);
      if (this.answer.dailyDouble === true) {
        this.$store.commit('addPoints', { playerId: this.selectedPlayer.id, points: this.game.wager });
      } else {
        this.$store.commit('setChooserPlayer', this.buzzWinner);
        this.$store.commit('addPoints', { playerId: this.buzzWinner.id, points: this.pointValue });
      }
      this.$store.commit('unsetBuzzWinner');
      this.$store.commit('lockBuzzers');
      this.$store.commit('clearWager');
      this.$router.push(`/game/${this.gameId}/`);
    },
    doPlayerIncorrect: function () {
      if (this.isIncorrectButtonLocked) return;
      this.$store.commit('incrementCompletedAnswerCounter');
      if (this.answer.dailyDouble === true) {
        this.$store.commit('subtractPoints', { playerId: this.selectedPlayer.id, points: this.game.wager });
        this.$store.commit('clearWager');
        this.$router.push(`/game/${this.gameId}`);
      } else {
        this.$store.commit('subtractPoints', { playerId: this.buzzWinner.id, points: this.pointValue });
        this.$store.commit('unsetBuzzWinner');
      }
    },
    doTimeout: function () {
      this.$store.commit('incrementCompletedAnswerCounter');
      this.$store.commit('makeUnavailable', `${this.answer.category}${this.answer.item}`);
      this.$store.commit('unsetBuzzWinner');
      this.$store.commit('lockBuzzers');
      this.$store.commit('clearWager');
      this.$router.push(`/game/${this.gameId}/`);
    }
  }
}
</script>

<style>
.result-registrator {
  display: flex;
  flex-direction: row;
}
.correct {
  background-color: green;
}
.incorrect {
  background-color: red;
}
.back {
  background-color: maroon;
}
.locked {
  background-color: grey;
}
</style>
