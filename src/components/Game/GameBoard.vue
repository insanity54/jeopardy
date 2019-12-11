<template>
  <transition name="delay">
    <div class="game-board">
        <CategoryTile v-for="(category, idx) in categories" :key="idx" :index="idx" :category="category"></CategoryTile>
        <AnswerTile v-for="answer in answers" :key="answer.id" :answer="answer"></AnswerTile>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import AnswerTile from './AnswerTile';
import CategoryTile from './CategoryTile';
export default {
  name: 'GameBoard',
  components: {
    CategoryTile,
    AnswerTile,
  },
  props: {
  },
  sockets: {
  },
  computed: {
    ...mapGetters([
      'answers',
      'categories'
    ]),
    isJumbotron: function () {
      return (this.$store.state.meta.role === 'jumbotron');
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.delay-leave-active {
  animation-delay: 1.1s;
  position: absolute;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.game-board {
  font-family: sans-serif, Helvetica;
  /* min-height: 80vh; */
  width: 100%;
  height: 100%;
  color: white;
  display: grid;
  grid-template-columns: [category-0] 16fr [category-1] 16fr [category-2] 16fr [category-3] 16fr [category-4] 16fr [category-5] 16fr;
  grid-template-rows: [answer-0] auto [answer-1] auto [answer-2] auto [answer-3] auto [answer-4] auto [answer-5] auto;
  grid-column-gap: 10px;
  grid-row-gap: 5px;
  user-select: none;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: orange;
  background-color: navy;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 2em;
  user-select: none;
}

.cat0-itm0 {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.cat0-itm1 {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}
.cat0-itm2 {
  grid-column: 1 / 2;
  grid-row: 4 / 5;
}
.cat0-itm3 {
  grid-column: 1 / 2;
  grid-row: 5 / 6;
}
.cat0-itm4 {
  grid-column: 1 / 2;
  grid-row: 6 / 7;
}
.cat0-itm5 {
  grid-column: 1 / 2;
  grid-row: 7 / 8;
}

.cat1-itm0 {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
.cat1-itm1 {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
.cat1-itm2 {
  grid-column: 2 / 3;
  grid-row: 4 / 5;
}
.cat1-itm3 {
  grid-column: 2 / 3;
  grid-row: 5 / 6;
}
.cat1-itm4 {
  grid-column: 2 / 3;
  grid-row: 6 / 7;
}
.cat1-itm5 {
  grid-column: 2 / 3;
  grid-row: 7 / 8;
}

.cat2-itm0 {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}
.cat2-itm1 {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
}
.cat2-itm2 {
  grid-column: 3 / 4;
  grid-row: 4 / 5;
}
.cat2-itm3 {
  grid-column: 3 / 4;
  grid-row: 5 / 6;
}
.cat2-itm4 {
  grid-column: 3 / 4;
  grid-row: 6 / 7;
}
.cat2-itm5 {
  grid-column: 3 / 4;
  grid-row: 7 / 8;
}

.cat3-itm0 {
  grid-column: 4 / 5;
  grid-row: 2 / 3;
}
.cat3-itm1 {
  grid-column: 4 / 5;
  grid-row: 3 / 4;
}
.cat3-itm2 {
  grid-column: 4 / 5;
  grid-row: 4 / 5;
}
.cat3-itm3 {
  grid-column: 4 / 5;
  grid-row: 5 / 6;
}
.cat3-itm4 {
  grid-column: 4 / 5;
  grid-row: 6 / 7;
}
.cat3-itm5 {
  grid-column: 4 / 5;
  grid-row: 7 / 8;
}


.cat4-itm0 {
  grid-column: 5 / 6;
  grid-row: 2 / 3;
}
.cat4-itm1 {
  grid-column: 5 / 6;
  grid-row: 3 / 4;
}
.cat4-itm2 {
  grid-column: 5 / 6;
  grid-row: 4 / 5;
}
.cat4-itm3 {
  grid-column: 5 / 6;
  grid-row: 5 / 6;
}
.cat4-itm4 {
  grid-column: 5 / 6;
  grid-row: 6 / 7;
}
.cat4-itm5 {
  grid-column: 5 / 6;
  grid-row: 7 / 8;
}


.cat5-itm0 {
  grid-column: 6 / 7;
  grid-row: 2 / 3;
}
.cat5-itm1 {
  grid-column: 6 / 7;
  grid-row: 3 / 4;
}
.cat5-itm2 {
  grid-column: 6 / 7;
  grid-row: 4 / 5;
}
.cat5-itm3 {
  grid-column: 6 / 7;
  grid-row: 5 / 6;
}
.cat5-itm4 {
  grid-column: 6 / 7;
  grid-row: 6 / 7;
}
.cat5-itm5 {
  grid-column: 6 / 7;
  grid-row: 7 / 8;
}
</style>
