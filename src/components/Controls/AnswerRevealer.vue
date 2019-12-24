<template>
  <div v-if="!isEditMode" class="answer-revealer button" @click="doRevealAnswers">
    <i class="material-icons">flip</i>Reveal Answers
  </div>
</template>

<script>
export default {
  name: 'AnswerRevealer',
  components: {
  },
  data: function () {
    return {
    }
  },
  computed: {
    isEditMode: function () {
      return this.$store.state.meta.edit;
    }
  },
  props: {
  },
  methods: {
    doRevealAnswers: function () {
      this.$socket.emit('revealAnswers');
      this.$socket.emit('setFinalState', 'answer');
      this.$store.dispatch('revealAnswers');
    }
  }
}
</script>

<style scoped>
.answer-revealer {
  background-color: purple;
}
</style>
