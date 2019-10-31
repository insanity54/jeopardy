<template>
  <div class="revealer">
    <div @click="doRevealAnswers" class="button">
      <i class="material-icons">flip</i>Reveal Answers
    </div>
    <div @click="doRevealCategory" class="button">
      <i class="material-icons">flip</i>Reveal Category
    </div>
  </div>
</template>

<script>
export default {
  name: 'Revealer',
  components: {
  },
  data: function () {
    return {
    }
  },
  computed: {
  },
  props: {
  },
  methods: {
    doRevealAnswers: function () {
      this.$root.$emit('play-audio', 'generate');
      this.$store.dispatch('revealAnswers');
    },
    doRevealCategory: function () {
      this.$store.commit('revealCategory');
    },
  }
}
</script>

<style>
.revealer {
  display: flex;
  flex-direction: row;
}
.revealer .button:nth-child(1) {
  background-color: purple;
}
.revealer .button:nth-child(2) {
  background-color: green;
}
</style>
