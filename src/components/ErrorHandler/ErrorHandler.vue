<template>
  <div class="error-handler">
    <div v-if="error.message" class="error">
      <span>{{ error.message }}</span>
    </div>
    <div v-if="success.message" class="success">
      <span>{{ success.message }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ErrorHandler',
    components: {},
    props: {
      error: {
        type: Error,
        required: false
      },
      success: {
        type: Object,
        required: true
      }
    },
    data: function() {
      return {
      }
    }
  }
</script>

<style scoped>
  .error {
    margin: 1em 0;
    padding: 3em 1em;
    border: 3px dashed red;
    background-color: Ivory;
  }
  .error span {
    font-weight: bold;
    color: maroon;
  }

  .success {
    margin: 1em 0;
    padding: 3em 1em;
    border: 3px dotted white;
    background-color: Green;
  }

  .success span {
    font-weight: bold;
    color: white;
  }
</style>
