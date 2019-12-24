<template>
  <div v-if="!isEditMode" class="revealer">
    <div v-if="isFinalJepurdee">
      <CategoryRevealer />
      <AnswerRevealer v-if="isAllCategoriesRevealed" />
    </div>
    <div v-else>
      <AnswerRevealer />
      <CategoryRevealer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AnswerRevealer from './AnswerRevealer';
import CategoryRevealer from './CategoryRevealer';
export default {
  name: 'Revealer',
  components: {
    AnswerRevealer,
    CategoryRevealer
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'isFinalJepurdee',
      'finalAnswer',
      'finalCategory',
      'answers',
      'categories',
      'isAllCategoriesRevealed',
      'isAllAnswersRevealed'
    ]),
    isEditMode: function () {
      return this.$store.state.meta.edit;
    }
  },
  props: {
  },
  methods: {
  }
}
</script>

<style scoped>
.revealer {
  display: flex;
  flex-direction: row;
  z-index: 9999;
}
</style>
