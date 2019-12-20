<template>
  <div class="final-jepurdee">
    <div class="category">
      US History
    </div>
    <div class="answer">
      Dating back to the revolution, it's the oldest continuously occupied military post in the united states
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinalJepurdee',
  components: {
  },
  props: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
  .final-jepurdee {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .category {
    height: 10%;
    cursor: default;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: navy;
    margin-bottom: 5px;
    text-transform: uppercase;
    text-shadow: 2px 2px black;
    font-weight: bold;
    padding: 0.5em 5px 0.5em 5px;
  }
  .answer {
    height: 90%;
    width: 100%;
    color: white;
    font-family: Georgia;
    font-size: 3em;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: navy;
    text-shadow: 2px 2px black;
    user-select: none;
    overflow: hidden;
  }
</style>
