<template>
  <div class="answer-screen">
    <Controls :answer="answer"/>
    <Answer :answer="answer"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Controls from './Controls';
import Answer from './Answer';
export default {
  name: 'AnswerScreen',
  components: {
    Controls,
    Answer
  },
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'answers'
    ]),
    category: function () {
      return parseInt(this.$route.query.category);
    },
    item: function () {
      return parseInt(this.$route.query.item);
    },
    answer: function () {
      return this.answers.find((a) => {
        return (a.category === this.category && a.item === this.item);
      });
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .answerScreen {
  }
</style>
