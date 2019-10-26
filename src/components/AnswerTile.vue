<template>
  <div @click="openAnswer" :class="tileClass">
    <div v-if="answer.available">{{ points }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AnswerTile',
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false
    },
    answer: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'answers',
    ]),
    tileClass: function () {
      return `item cat${this.answer.category}-itm${this.answer.item}`;
    },
    points: function () {
      return `$${(this.answer.item+1)*200}`;
    },
    gameId: function () {
      return this.$route.params.gameId;
    },
    answerId: function () {
      return `${this.answer.category}${this.answer.item}`;
    }
  },
  methods: {
    openAnswer: function() {
      // this.$store.commit('setActiveAnswer', this.answerId);
      this.$router.push({
        path: `/game/${this.gameId}/answer`,
        query: {
          category: this.answer.category,
          item: this.answer.item
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
