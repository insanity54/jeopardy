<template>
  <div @click="emitAnswerThenOpen" :class="[ tileClass, { noclick: !isPlayerSelected } ]">
    <div class="points" :class="{ invisible: isTileInvisible, unrevealed: isTimeUnrevealed }">{{ points }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AnswerTile',
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false
    },
    answer: {
      type: Object,
      required: true
    },
  },
  computed: {
    ...mapGetters([
      'answers',
      'selectedPlayer'
    ]),
    isTileInvisible: function () {
      return !this.answer.available
    },
    isTimeUnrevealed: function () {
      return !this.answer.revealed && !this.isEditMode;
    },
    isEditMode: function () {
      return this.$store.state.meta.edit;
    },
    tileClass: function () {
      return `item cat${this.answer.category}-itm${this.answer.item}`;
    },
    multiplier: function () {
      return this.$store.state.game.game.pointMultiplier;
    },
    points: function () {
      return `$${(this.answer.item+1)*this.multiplier}`;
    },
    gameId: function () {
      return this.$route.params.gameId;
    },
    answerId: function () {
      return this.answer.id;
    },
    isPlayerSelected: function () {
      return (typeof this.selectedPlayer !== 'undefined')
    }
  },
  methods: {
    emitAnswerThenOpen: function () {
      if (this.isPlayerSelected) {
        this.$store.commit('setActiveAnswer', this.answerId);
        this.$socket.emit('openAnswer', { gameId: this.gameId, answerId: this.answerId });
        this.$store.dispatch('openAnswer', { gameId: this.gameId, answerId: this.answerId });
      }
    }
  }
}
</script>

<style scoped>
.points {
  font-size: 4vmin;
}
.unrevealed {
  color: navy;
}
.invisible {
  visibility: hidden;
}
.noclick {
  cursor: not-allowed;
}
</style>
