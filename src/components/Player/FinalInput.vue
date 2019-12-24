<template>
  <div class="inputter">
    {{ finalState }}
    <div v-if="isEliminated" class="consolation">
      <p>{{ player.name }} has been eliminated!</p>
      <p>Final score: <span class="score">{{ this.player.score }}</span></p>
    </div>
    <div v-if="isFinalStateIntro">
      <h2>Final Jepurdee!</h2>
    </div>
    <div v-if="!isEliminated" ref="form" class="form">
      <div v-if="isFinalStateAnswer && !isQuestionSent" class="question group">
        <label for="question">Enter your question</label>
        <div class="input-row">
          <input id="question" type="text" v-model="finalQuestion" @keydown.enter="sendQuestion"/>
          <div class="button send" :class="{ 'disabled': !isValidWager }" @click="sendQuestion"><i class="material-icons">send</i>Commit Question</div>
        </div>
      </div>
      <div v-if="isFinalStateCategory && !isWagerSent" class="wager group">
        <label for="wager">Enter your wager between {{ wagerMinimum }} and {{ wagerMaximum }}</label>
        <div class="input-row">
          <input ref="wager" id="wager" type="number" :enabled="!isFinalStateReveal" v-model.number="finalWager" @keydown.enter="sendWager" @focus="$event.target.select()"/>
          <div class="button send" :class="{ 'disabled': !isValidWager }" @click="sendWager"><i class="material-icons">send</i>Commit Wager</div>
        </div>
        <div class="errors">
          <div v-if="isValidWager" class="success">✔️ Your wager is valid.</div>
          <div v-if="isWagerTooLow" class="error">Wager must be {{ wagerMinimum }} or higher!</div>
          <div v-if="isWagerTooHigh" class="error">Wager must be {{ wagerMaximum }} or lower!</div>
          <div v-if="isWagerNaN" class="error">Wager must be a number!</div>
        </div>
      </div>
      <div v-if="isFinalStateReveal" class="reveal group">
        <h3>Question</h3>
        <p>{{ finalQuestion }}
        <hr>
        <h3>Wager</h3>
        <p>{{ finalWager }}</p>
      </div>
      <div v-if="isWagerSent && isFinalStateCategory">
        <p>Wager locked in. Please wait for the host to start the next step.</p>
      </div>
      <div v-if="isQuestionSent && isFinalStateAnswer">
        <p>Question locked in. Good luck!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'FinalInput',
  components: {
  },
  data: function () {
    return {
      isWagerSent: false,
      isQuestionSent: false,
    }
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'isFinalStateIntro',
      'isFinalStateCategory',
      'isFinalStateAnswer',
      'isFinalStateReveal',
    ]),
    finalState: function () {
      return this.$store.state.meta.finalState;
    },
    finalWager: {
      get: function () {
        return this.player.finalWager;
      },
      set: function (finalWager) {
        this.$store.commit('setFinalWager', {
          finalWager: finalWager,
          playerId: this.player.id
        });
      }
    },
    finalQuestion: {
      get: function () {
        return this.player.finalQuestion;
      },
      set: function (finalQuestion) {
        this.$store.commit('setFinalQuestion', {
          finalQuestion: finalQuestion,
          playerId: this.player.id
        });
      }
    },
    isEliminated: function () {
      if (this.score > 0) return false;
      else return true;
    },
    score: function () {
      return this.player.score;
    },
    pid: function () {
      return this.$route.params.playerId;
    },
    player: function () {
      return this.$store.state.players.find((p) => p.id === this.pid);
    },
    wagerMinimum: function () {
      return 0;
    },
    wagerMaximum: function () {
      return this.player.score;
    },
    isWagerTooLow: function () {
      if (this.finalWager < this.wagerMinimum) return true;
      else return false;
    },
    isWagerTooHigh: function () {
      if (this.finalWager > this.wagerMaximum) return true;
      else return false;
    },
    isWagerNaN: function () {
      if (typeof this.finalWager !== 'number') return true;
      else return false;
    },
    isValidWager: function () {
      if (
        this.isWagerTooLow ||
        this.isWagerTooHigh ||
        this.isWagerNaN
      ) return false;
      else return true;
    }
  },
  methods: {
    focusWager: function () {
      this.$refs.wager.focus();
      return;
    },
    sendWager: function () {
      if (this.isValidWager) {
        this.$refs.wager.blur();
        this.$socket.emit('setFinalWager', { playerId: this.pid, finalWager: this.finalWager });
        this.isWagerSent = true;
      }
      return;
    },
    sendQuestion: function () {
      this.$socket.emit('setFinalQuestion', { playerId: this.pid, finalQuestion: this.finalQuestion });
      this.isQuestionSent = true;
      return;
    },
  },
}
</script>

<style scoped>
  .disabled {
    background-color: grey;
  }
  .button.send {
    background-color: green;
  }
  .input-row {
    display: flex;
    flex-direction: row;
    margin: 1em;
  }
  .score {
    border: 3px dashed yellow;
    font-weight: bold;
    background-color: black;
    padding: 0 1em;
    margin: 0.5em;
  }
  .error {
    color: red;
  }
  .success {
    color: lime;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }
  .group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .group input {
    width: 50%;
  }
  .inputter {
    color: white;
    background-color: navy;
  }
</style>
