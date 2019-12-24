<template>
  <div v-if="!isEditMode" class="category-revealer button" @click="doRevealCategory">
    <i class="material-icons">flip</i>Reveal Category
  </div>
</template>

<script>
export default {
  name: 'CategoryRevealer',
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
    doRevealCategory: function () {
      this.$socket.emit('revealCategory');
      this.$socket.emit('setFinalState', 'category');
      this.$store.commit('revealCategory');
    },
  }
}
</script>

<style scoped>
.category-revealer {
  background-color: green;
}
</style>
