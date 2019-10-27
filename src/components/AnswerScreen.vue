<template>
  <div class="answer-screen">
    <transition appear :name="transitionVariant">
      <component v-bind:is="answerOrDailyDouble"></component>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Answer from './Answer';
import DailyDouble from './DailyDouble';
export default {
  name: 'AnswerScreen',
  components: {
    'answer': Answer,
    'dailyDouble': DailyDouble
  },
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      answer: state => state.game.game.answer,
      wager: state => state.game.game.wager,
    }),
    ...mapGetters([
      'answers'
    ]),
    isDailyDouble: function () {
      return (this.answer.dailyDouble === true) ? true : false;
    },
    transitionVariant: function () {
      if (this.isDailyDouble && this.isWagerPlaced)
        return 'flip';
      if (this.isDailyDouble && !this.isWagerPlaced)
        return 'roll';
      if (!this.isDailyDouble)
        return 'zoom';
      return 'zoom';
    },
    isWagerPlaced: function () {
      if (typeof this.wager === 'undefined') return false;
      if (this.wager === null) return false;
      return true;
    },
    answerOrDailyDouble () {
      if (
        this.answer.dailyDouble === true &&
        this.isWagerPlaced === false
      ) {
        return 'dailyDouble';
      } else {
        return 'answer';
      }
    },
    category: function () {
      return parseInt(this.$route.query.category);
    },
    item: function () {
      return parseInt(this.$route.query.item);
    },
  },
  methods: {
  }
}
</script>

<style>
  .zoom-enter-active {
    transition: all 1s ease; /* 1s */
  }
  .zoom-leave-active {
    transition: all 0.5s ease; /* 0.5s */
  }
  .zoom-enter, .zoom-leave-to {
    transform: scale(0.1);
  }

  .roll-enter-active {
    transition: all 1s ease;
  }
  .roll-leave-active {
    transition: all 1s ease;
  }
  .roll-enter, .roll-leave-to {
    transform: rotateX(360deg) scale(0.1);
  }

  .flip-enter-active, .flip-leave-active {
    transition: all 1s ease;
    backface-visibility: hidden;
  }
  .flip-enter {
    transform: rotateY(180deg);
  }
  .flip-leave-to {
    transform: rotateY(-180deg);
  }
  .answer-screen {
    top: 0;
    perspective: 1200px;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
  }
</style>
