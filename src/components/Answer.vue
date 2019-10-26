<template>
  <div class="answer">
    <DailyDouble :answer="answer"/>
    <span v-if="!isAnswerImage">{{ answer.answerText }}</span>
    <img v-if="isAnswerImage" :src="answer.image"/>
  </div>
</template>

<script>
import DailyDouble from './DailyDouble';
export default {
  name: 'Answer',
  components: {
    DailyDouble
  },
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  computed: {
    isAnswerImage: function () {
      return (typeof this.answer.image === 'string') ? true : false;
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .answer {
    height: 100vh;
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
  }
  .answer > span {
    margin: 0 1em 0 1em;
  }
  .answer img {
    width: 100%;
  }

</style>
