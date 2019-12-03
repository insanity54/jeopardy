<template>
  <div v-if="!isEditMode" class="revealer">
    <div v-if="isUnrevealedAnswers" @click="doRevealAnswers" class="button">
      <i class="material-icons">flip</i>Reveal Answers
    </div>
    <div v-if="isUnrevealedCategories" @click="doRevealCategory" class="button">
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
    isEditMode: function () {
      return this.$store.state.meta.edit;
    },
    isUnrevealedAnswers: function () {
      return (this.$store.state.game.game.answers.find(a => a.revealed === false)) ? true : false;
    },
    isUnrevealedCategories: function() {
      return (this.$store.state.game.game.categories.find(c => c.revealed === false)) ? true : false;
    }
  },
  props: {
  },
  methods: {
    doRevealAnswers: function () {
      this.$root.$emit('play-audio', 'generate');
      this.$store.dispatch('revealAnswers');
    },
    doRevealCategory: function () {
      this.$socket.emit('revealCategory');
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
