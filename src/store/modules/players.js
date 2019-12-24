import Vue from 'vue';
import { arrayUnique } from '../../util/util';
import router from '../../router'

export default {
  state: [
  ],
  getters: {
    buzzWinner: state => {
      return state.find((p) => p.buzzWinner === true);
    },
    tiesto: state => {
      return `YOLO ${state[0].name}`
    },
    selectedPlayer: state => {
      return state.find((p) => p.chooser === true);
    },
    finalPlayers: state => {
      return state.filter((p) => p.score > 0);
    }
  },
  mutations: {
    incrRevealState(state, playerId) {
      let p = state.find((p) => p.id === playerId);
      if (p.finalRevealState === 'none') p.finalRevealState = 'answer';
      else if (p.finalRevealState === 'answer') p.finalRevealState = 'wager';
    },
    setFinalWager(state, payload) {
      let { playerId, finalWager } = payload;
      let p = state.find((p) => p.id === playerId);
      p.finalWager = finalWager;
    },
    setFinalQuestion(state, payload) {
      let { playerId, finalQuestion } = payload;
      let p = state.find((p) => p.id === playerId);
      p.finalQuestion = finalQuestion;
    },
    syncPlayerData(state, players) {
      state.splice(0); // reset array size before modifying
      let s = arrayUnique([...state, ...players]);
      s.forEach((p, i) => {
        Vue.set(state, i, p)
      });
    },
    SOCKET_updatePlayerColor(state, data) {
      let { color, playerId } = data;
      let pl = state.find((p) => p.id === playerId)
      return pl.color = color;
    },
    updatePlayerColor(state, data) {
      let { color, playerId } = data;
      let pl = state.find((p) => p.id === playerId)
      return pl.color = color;
    },
    /**
     * buzzPlayer
     * Administratively select the player who has buzzed
     */
    buzzPlayer(state, player) {
      state.forEach((p) => {
        if (p.id === player.id) p.buzzWinner = true;
        else p.buzzWinner = false;
      });
    },
    setSelectedPlayer(state, player) {
      state.forEach((p) => {
        if (p.id === player.id) {
          p.chooser = true;
        }
        else p.chooser = false;
      });
    },
    addPoints(state, payload) {
      let { playerId, points } = payload;
      let pl = state.find((p) => p.id === playerId);
      pl.score += points;
    },
    subtractPoints(state, payload) {
      let { playerId, points } = payload;
      let pl = state.find((p) => p.id === playerId);
      pl.score -= points;
    },
    unsetBuzzWinner(state) {
      state.forEach((p) => {
        p.buzzWinner = false;
      })
    },
    SOCKET_updatePlayerName(state, data) {
      this.commit('updatePlayerName', data);
    },
    updatePlayerName(state, data) {
      let { name, id } = data;
      let pl = state.find((p) => p.id === id)
      return pl.name = name;
    },
    updatePlayerScore(state, data) {
      let { id, score } = data;
      let pl = state.find((p) => p.id === id)
      return pl.score = score;
    },
    createPlayer(state, data) {
      state.push({
        name: data.name,
        id: data.id,
        score: 0,
        buzzed: false,
        buzzWinner: false,
        chooser: false,
        color: data.color,
        finalRevealState: 'none',
        finalWager: 0,
        finalQuestion: 0,
      });
    },
    SOCKET_deletePlayer(state, data) {
      this.commit('deletePlayer', data);
    },
    deletePlayer(state, data) {
      let { id } = data;
      let i = state.findIndex((p) => p.id === id);
      state.splice(i, 1);
    },
    deleteAllPlayers(state) {
      state.splice(0);
    },
    resetScores(state) {
      state.forEach((p) => {
        p.score = 0;
      })
    }
  },
  actions: {
    revealPlayerFinal ({ commit, state }, payload) {
      let { gameId, playerId } = payload;
      let p = state.find((p) => p.id === playerId);
      console.log(p.finalRevealState);
      if (p.finalRevealState === 'none') {
        router.push(`/game/${gameId}/reveal/${playerId}`);
      }
      commit('incrRevealState', playerId);
    },
  }
}
