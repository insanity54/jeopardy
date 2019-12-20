import defaultGame from '@/assets/default.game.json'
import { uuidv4 } from '@/util/util';
import Vue from 'vue';
import axios from 'axios';
import router from '../../router'

export default {
  state: {
    game: {
      name: '',
      id: '',
      pointUnit: '', // dollars
      pointMultiplier: '', // 100 for single, 200 for double
      categories: '',
      answers: '',
      completedAnswerCounter: '',
      gameType: '', // single, double, or final.
      answer: '',
      wager: null
    },
    games: [
    ],
  },
  getters: {
    game: state => {
      return state.game;
    },
    singleGames: state => {
      return state.games.filter((g) => g.type === 'single');
    },
    doubleGames: state => {
      return state.games.filter((g) => g.type === 'double');
    },
    finalGames: state => {
      return state.games.filter((g) => g.type === 'final');
    },
    games: state => {
      return state.games;
    },
    pointMultiplier: state => {
      return state.game.pointMultiplier;
    },
    gameId: state => {
      return state.game.id;
    },
    answers: state => {
      return state.game.answers;
    },
    categories: state => {
      return state.game.categories;
    },
    completedAnswerCounter: state => {
      return state.game.completedAnswerCounter;
    },
    isDailyDouble: state => {
      return (state.game.answer.dailyDouble === true);
    }
  },
  mutations: {
    updateCategory(state, categoryData) {
      state.game.categories[categoryData.id] = categoryData;
    },
    createGame(state, gameObject) {
      function getMultiplier(type) {
        if (type === 'double') return 200;
        return 100;
      }
      const id = (gameObject.id) ? gameObject.id : uuidv4();
      state.games.push({
        ...JSON.parse(JSON.stringify(defaultGame)),
        ...gameObject,
        id: id,
        pointMultiplier: getMultiplier(gameObject.gameType)
      });
      return state.game = { ...state.game, id: id };
    },
    updateGame(state, gameObject) {
      let i = state.games.findIndex((g) => g.id === gameObject.id);
      state.games[i] = gameObject;
    },
    deleteGame(state, game) {
      let i = state.games.findIndex((g) => g.id === game.id);
      if (i === -1) throw new Error(`game id ${game.id} was not found in storage.`);
      state.games.splice(i, 1);
      Vue.delete(state.game);
    },
    makeUnavailable(state, answerId) {
      const category = parseInt(answerId[0]);
      const item = parseInt(answerId[1]);
      let answer = state.game.answers.find((a) => {
        return a.category === category && a.item === item;
      });
      return answer.available = false;
    },
    loadDefaultGame(state) {
      return state.game = defaultGame;
    },
    loadGame(state, gameId) {
      let game = state.games.find((g) => g.id === gameId);
      state.game = game;
    },
    downloadGame(state, game) {
      state.games.push(game);
    },
    setGameId(state, gameId) {
      return state.game = { ...state.game, id: gameId };
    },
    setActiveAnswer(state, answerId) {
      const category = parseInt(answerId[0]);
      const item = parseInt(answerId[1]);
      let answer = state.game.answers.find((a) => {
        return a.category === category && a.item === item;
      });
      return state.game = { ...state.game, answer: answer };
    },
    incrementCompletedAnswerCounter(state) {
      if (typeof state.game.completedAnswerCounter === 'undefined') {
        return state.game = { ...state.game, completedAnswerCounter: 1 };
      }
      else {
        return state.game = { ...state.game, completedAnswerCounter: state.game.completedAnswerCounter+1 };
      }
    },
    submitWager(state, wager) {
      return state.game = { ...state.game, wager: wager };
    },
    clearWager(state) {
      return state.game = { ...state.game, wager: null };
    },
    updateImage(state, data) {
      let { id, type, url } = data;
      state.game.answer.image = Object.assign({}, state.game.answer.image, {
        url: url,
        id: id,
        type: type
      });
    },
    deleteImage(state) {
      state.game.answer.image = Object.assign({});
    },
    patchImage(state, imageData) {
      let i = state.game.answer.image;
      return i = { ...i, ...imageData };
    },
    updateAnswerText(state, text) {
      return state.game.answer.answerText = text;
    },
    updateQuestionText(state, text) {
      return state.game.answer.questionText = text;
    },
    updateDailyDouble(state, isDailyDouble) {
      return state.game.answer.dailyDouble = isDailyDouble;
    },
    updateGameTitle(state, text) {
      return state.game.name = text;
    },
    restartGame(state) {
      state.game.completedAnswerCounter = 0;
      state.game.answers.forEach((a) => {
        a.revealed = false;
        a.available = true;
      });
      return state.game.categories.forEach((c) => {
        c.revealed = false;
      })
    },
    revealAnswer(state, answerId) {
      let answer = state.game.answers.find((a) => a.id === answerId);
      answer.revealed = true;
    },
    revealCategory(state) {
      let c = state.game.categories.find((c) => c.revealed === false)
      if (typeof c === 'undefined') return;
      c.revealed = true;
    },
  },
  actions: {
    revealAnswers ( context ) {
      let divide = 180;
      let minMultiplier = 0;
      let maxMultiplier = 16;
      context.state.game.answers.forEach((a) => {
        let multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1) + minMultiplier);
        let timeout = divide * multiplier;
        setTimeout(() => {
          context.commit('revealAnswer', a.id);
        }, timeout);
      });
    },
    downloadGame ({ commit }, gameId) {
      return axios.get(`/api/v1/game/${gameId}`).then((game) => {
        // load json into vuex
          let g = JSON.parse(game.data)
          commit('downloadGame', g);
          return g;
      })
    },
    openAnswer (context, params) {
      let { answerId, gameId } = params;
      let category = answerId[0];
      let item = answerId[1];
      router.push({
        path: `/game/${gameId}/answer`,
        query: {
          category: category,
          item: item
        }
      });
    },
    /**
     * the action that happens when no players knew the question.
     */
    doAnswerTimeout ({ commit, state }, params) {
      let { answerId, gameId } = params;
      let answer = state.game.answer;
      if (answer.available === true) commit('incrementCompletedAnswerCounter');
      commit('makeUnavailable', answerId);
      commit('unsetBuzzWinner');
      commit('lockBuzzer');
      commit('clearWager');
      router.push(`/game/${gameId}/`);
    },
    /**
     * the action that happens when a player does not answer the question fast enough
     */
    doPlayerTimeout ({ commit, state, getters }, params) {
      let { answerId, pointValue, gameId } = params;
      let answer = state.game.answer;
      if (answer.available === true) commit('incrementCompletedAnswerCounter');

      commit('makeUnavailable', answerId);
      if (answer.dailyDouble === true) {
        commit('subtractPoints', { playerId: getters.selectedPlayer.id, points: state.game.wager });
        commit('clearWager');
        router.push(`/game/${gameId}/`);
      } else {
        commit('subtractPoints', { playerId: getters.buzzWinner.id, points: pointValue });
        commit('unsetBuzzWinner');
        commit('unlockBuzzer');
      }
    },
    /**
     * doPlayerCorrect
     * the action that happens when a player gets an answer correct
     */
    doPlayerCorrect ({ commit, state, getters }, params) {
      let { answerId, gameId, pointValue } = params;
      let answer = state.game.answer;
      console.log(params)
      if (answer.available === true) commit('incrementCompletedAnswerCounter');
      commit('makeUnavailable', answerId);
      if (answer.dailyDouble === true) {
        commit('addPoints', {
          playerId: getters.selectedPlayer.id,
          points: state.game.wager
        });
      } else {
        commit('setSelectedPlayer', getters.buzzWinner);
        commit('addPoints', { playerId: getters.buzzWinner.id, points: pointValue });
      }
      commit('unsetBuzzWinner');
      commit('lockBuzzer');
      commit('clearWager');
      router.push(`/game/${gameId}/`);
    },
    /**
     * doPlayerIncorrect
     * the action that happens when a player gets an answer wrong
     */
    doPlayerIncorrect ({ commit, state, getters }, params) {
      let { gameId, pointValue } = params;
      let answer = state.game.answer;
      if (answer.available === true) commit('incrementCompletedAnswerCounter');
      if (answer.dailyDouble === true) {
        console.log(`subtracting ${pointValue} from ${getters.selectedPlayer.name}`)
        commit('subtractPoints', { playerId: getters.selectedPlayer.id, points: state.game.wager });
        commit('clearWager');
        router.push(`/game/${gameId}`);
      } else {
        console.log(`subtracting ${pointValue} from ${getters.buzzWinner.name}`)
        commit('subtractPoints', { playerId: getters.buzzWinner.id, points: pointValue });
        commit('unsetBuzzWinner');
        commit('unlockBuzzer');
      }
    },
    doSubmitWager ({ commit }, params) {
      let { wagerInput } = params;
      commit('submitWager', wagerInput);
    }
  }
}
