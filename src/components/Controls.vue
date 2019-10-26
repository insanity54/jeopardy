<template>
  <div class="controls">
    <Unlocker :isAnswerScreen="isAnswerScreen"/>
    <div class="spacer"></div>
    <BuzzerSelector :isAnswerScreen="isAnswerScreen"/>
    <div class="spacer"></div>
    <ResultRegistrator :answer="answer" :isAnswerScreen="isAnswerScreen"/>
  </div>
</template>

<script>
import BuzzerSelector from './BuzzerSelector';
import ResultRegistrator from './ResultRegistrator';
import Unlocker from './Unlocker';
export default {
  name: 'Controls',
  components: {
    BuzzerSelector,
    ResultRegistrator,
    Unlocker
  },
  computed: {
    isAnswerScreen: function () {
      return (typeof this.$route.query.category !== 'undefined');
    }
  },
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  methods: {
  }
}
</script>

<style>
.controls {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 5;
  height: 5vh;
  width: 100vw;
  top: 94vh;
  user-select: none;
}
.spacer {
  width: 2em;
}
.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 10px 5px 10px;
  margin: 0 3px 0 3px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
