<template>
  <div class="category-editor">
    Category Name: <input type="text" name="name">
  </div>
</template>

<script>
export default {
  name: 'CategoryEditor',
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
</style>
