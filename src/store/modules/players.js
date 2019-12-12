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
    }
  },
  mutations: {
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
    SOCKET_createPlayer(state, data) {
      this.commit('createPlayer', data);
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
    resetScores(state) {
      state.forEach((p) => {
        p.score = 0;
      })
    }
  }
}
