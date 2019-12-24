<template>
  <div class="final-jepurdee">
    <div class="category">
      <span v-if="finalCategory.revealed">{{ finalCategory.name }}</span>
    </div>
    <div class="answer">
      <span v-if="finalAnswer.revealed">{{ finalAnswer.answerText }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'FinalJepurdee',
  components: {
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'finalAnswer',
      'finalCategory'
    ]),
  },
  methods: {
  }
}
</script>

<style scoped>
  .final-jepurdee {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .category {
    height: 25%;
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
    font-size: 3rem;
  }
  .answer {
    height: 75%;
    width: 100%;
    color: white;
    font-family: Georgia;
    font-size: 3rem;
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
  @media (max-width: 600px) {
    .category {
      font-size: 12pt;
    }
  }
  @media (max-width: 600px) {
    .answer {
      font-size: 12pt;
    }
  }
</style>
