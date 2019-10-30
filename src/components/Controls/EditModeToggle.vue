<template>
  <div @click="toggleEditMode" class="button edit-button">
    <i class="material-icons">edit</i>
  </div>
</template>

<script>
export default {
  name: 'EditModeToggle',
  components: {
  },
  props: {
  },
  computed: {
  },
  methods: {
    toggleEditMode: function () {
      if (this.$store.state.meta.edit === true) return this.$store.commit('leaveEditMode');
      return this.$store.commit('enterEditMode');
    }
  }
}
</script>

<style scoped>

</style>
