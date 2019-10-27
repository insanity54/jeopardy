<template>
  <div class="notices">
    <span>{{ notice }} {{ completedCount }}/30</span>
    <div class="spacer"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Notices',
  components: {
  },
  computed: {
    ...mapGetters([
      'completedAnswerCounter'
    ]),
    notice: function () {
      if (this.completedAnswerCounter === 15) return 'Get to know the players!';
      else return '';
    },
    completedCount: function () {
      return `${this.completedAnswerCounter}`
    }
  },
  props: {
  },
  methods: {
  }
}
</script>

<style>
.notices {
  display: flex;
  flex-direction: row;
  color: white;
}
.spacer {
  width: 1em;
}
</style>
