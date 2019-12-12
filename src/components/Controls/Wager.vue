<template>
  <div v-if="isDailyDouble && !isWagerPlaced" class="wager">
    <label for="wager-input">{{ selectedPlayer.name }} wager (max {{ wagerMaximum }}):</label>
    <input id="wager-input" v-model="wagerInput" type="number" :min="wagerMinimum" :max="wagerMaximum" @keydown.enter="dispatchWager">
    <div class="button" @click.prevent="dispatchWager"><i class="material-icons">send</i></div>
    <span class="wager-response" :class="{ good: isGoodWager }">{{ wagerResponse }}</span>
  </div>
</template>

<script>
export default {
  name: 'Wager',
  data: function () {
    return {
      wagerInput: 100,
      wagerResponse: ''
    }
  },
  props: {
    answer: {
      type: Object,
      required: true
    },
    gameType: {
      type: String,
      required: true
    },
    selectedPlayer: {
      type: Object,
      required: true
    }
  },
  computed: {
    isGoodWager: function () {
      if (this.wagerResponse === 'OK') return true;
      return false;
    },
    isDailyDouble: function () {
      return (this.answer.dailyDouble === true) ? true : false;
    },
    category: function () {
      return this.$route.query.category;
    },
    item: function () {
      return this.$route.query.item;
    },
    isWagerPlaced: function () {
      if (typeof this.$store.state.game.game.wager === 'undefined') return false;
      if (this.$store.state.game.game.wager === null) return false;
      return true;
    },
    wagerMinimum: function () {
      if (
        this.gameType === 'single' ||
        this.gameType === 'double'
      ) return 5;
      return 0;
    },
    answerId: function () {
      return `${this.$route.query.category}${this.$route.query.item}`;
    },
    wagerMaximum: function () {
      if (this.gameType === 'single') {
        if (this.selectedPlayer.score > 500) return this.selectedPlayer.score;
        else return 500;
      }
      else if (this.gameType === 'double') {
        if (this.selectedPlayer.score > 1000) return this.selectedPlayer.score;
        else return 1000;
      }
      else if (this.gameType === 'final') {
        return this.selectedPlayer.score;
      }
      return 5;
    }
  },
  methods: {
    dispatchWager: function () {
      if (this.wagerInput < this.wagerMinimum)
        return this.wagerResponse = `Wager too low. Must be > ${this.wagerMinimum-1}`;
      if (this.wagerInput > this.wagerMaximum)
        return this.wagerResponse = `Wager too high. Must be < ${this.wagerMaximum+1}`;
      this.wagerResponse = 'OK';
      let payload = parseInt(this.wagerInput);
      this.$socket.emit('submitWager', payload);
      this.$store.commit('submitWager', payload);
    },
  }
}
</script>

<style>
.wager {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
#wager-input {
  width: 5em;
}
.wager-response {
  color: red;
  font-weight: bold;
}
.wager .button {
  background-color: green;
}
.good {
  color: lime;
}
</style>
