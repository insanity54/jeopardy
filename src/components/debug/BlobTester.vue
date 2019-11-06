<template>
  <div class="blob-tester">
    <span>BlobTester</span>
    <input ref="inputbox" @click="highlightAll" v-model="uri" type="text" value="Paste your blob here"/>
    <img :src="uri" alt="test image"/>
  </div>
</template>

<script>
export default {
  name: 'BlobTester',
  components: {
  },
  data: function () {
    return {
      uri: ''
    }
  },
  methods: {
    highlightAll: function () {
      this.$refs.inputbox.select();
    }
  }
}
</script>

<style scoped>
.blob-tester {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  margin: 1em;
  border: 3px solid red;
  height: 100%;
  width: 100%;
  background-color: white;
  color: black;
}
.blob-tester img {
  margin: 1em 0 0 0;
  height: 300px;
  border: 1px solid black;
}
.blob-tester input {
  width: 500px;
}
</style>
