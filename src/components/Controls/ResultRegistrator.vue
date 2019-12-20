<template>
  <div class="result-registrator">
    <div class="affected-player" @click.prevent="startAnswerTimer">{{ affectedPlayer }}</div>
    <div class="button correct" :class="{locked: isCorrectButtonLocked}" @click.prevent="dispatchPlayerCorrect"><i class="material-icons">check_circle_outline</i></div>
    <div class="button incorrect" :class="{locked: isIncorrectButtonLocked}" @click.prevent="dispatchPlayerIncorrect"><i class="material-icons">close</i></div>
    <div class="button timeout" :class="{locked: isIncorrectButtonLocked}" @click.prevent="dispatchPlayerTimeout"><i class="material-icons">alarm</i>{{ secondsSinceBuzzPlayerSelection }}</div>
    <div class="button back" @click.prevent="dispatchTimeout"><i class="material-icons">arrow_back_ios</i></div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  name: 'ResultRegistrator',
  props: {
  },
  data: function () {
    return {
      answerTimer: null,
      tac: null,
      timeSinceUnlock: 0,
    }
  },
  computed: {
    ...mapState({
      answer: state => state.game.game.answer,
      game: state => state.game.game,
      buzzerLock: state => state.buzzer.isLocked
    }),
    ...mapGetters([
      'pointMultiplier',
      'gameId',
      'buzzWinner',
      'selectedPlayer',
    ]),
    secondsSinceBuzzPlayerSelection: function () {
      return Math.round(this.timeSinceUnlock / 1000);
    },
    affectedPlayer: function () {
      if (this.answer.dailyDouble) return this.selectedPlayer.name;
      else if (typeof this.buzzWinner === 'undefined') return '';
      else return this.buzzWinner.name;
    },
    isCorrectButtonLocked: function () {
      if (this.answer.dailyDouble === true && this.game.wager ) return false;
      return (typeof this.buzzWinner === 'undefined');
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
    },
    answerId: function () {
      return `${this.category}${this.item}`;
    }
  },
  methods: {
    ...mapActions([
      'doAnswerTimeout',
      'doPlayerCorrect',
      'doPlayerIncorrect',
      'doPlayerTimeout',
    ]),
    dispatchTimeout: function () {
      let payload = { answerId: this.answerId, gameId: this.gameId };
      this.$socket.emit('doAnswerTimeout', payload);
      this.$socket.emit('lockBuzzer');
      this.doAnswerTimeout(payload);
    },
    dispatchPlayerTimeout: function () {
      let payload = { answerId: this.answerId, gameId: this.gameId, pointValue: this.pointValue };
      this.$socket.emit('doPlayerTimeout', payload);
      this.$socket.emit('unlockBuzzer');
      clearInterval(this.answerTimer);
      this.doPlayerTimeout(payload);
    },
    dispatchPlayerCorrect: function () {
      if (this.isCorrectButtonLocked) return;
      let payload = {
        answerId: this.answer.id,
        gameId: this.gameId,
        pointValue: this.pointValue
      };
      this.$socket.emit('doPlayerCorrect', payload);
      this.doPlayerCorrect(payload);
    },
    dispatchPlayerIncorrect: function () {
      if (this.isIncorrectButtonLocked) return;
      let payload = { gameId: this.gameId, pointValue: this.pointValue };
      this.$socket.emit('doPlayerIncorrect', payload);
      this.$socket.emit('unlockBuzzer');
      this.doPlayerIncorrect(payload);
    },
    updateTimer: function () {
      if (this.isCorrectButtonLocked) {
        this.timeSinceUnlock = 0;
        return;
      }
      this.timeSinceUnlock = (10000 - (Date.now() - this.tac));
    },
    startAnswerTimer: function () {
      this.tac = Date.now();
      this.answerTimer = window.setInterval(this.updateTimer, 250);
    }
  },
  destroyed: function () {
    clearInterval(this.answerTimer);
  }
}
</script>

<style>
.affected-player {
  display: flex;
  align-items: center;
  border: 3px dotted yellow;
  border-radius: 5px;
  padding: 1em;
}
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
.timeout {
  background-color: purple;
}
.locked {
  background-color: grey;
}
</style>
