<template>
  <div v-if="!isEditMode && !isUnrevealedAnswers && !isUnrevealedCategories" class="final-lifecycle">
    <div @click="startFinalTimer" class="button start">
      <i class="material-icons">music_note</i>Start 30 second timer
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinalLifecycleControls',
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
    startFinalTimer: function () {
      this.$socket.emit('startFinalTimer');
    }
  }
}
</script>

<style>
.button.start {
  background-color: green;
}
.revealer {
  display: flex;
  flex-direction: row;
  z-index: 9999;
}
.revealer .button:nth-child(1) {
  background-color: purple;
}
.revealer .button:nth-child(2) {
  background-color: green;
}
</style>
