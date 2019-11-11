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
    buzzPlayer(state, player) {
      state.forEach((p) => {
        if (p.id === player.id) p.buzzWinner = true;
        else p.buzzWinner = false;
      });
    },
    setChooserPlayer(state, player) {
      state.forEach((p) => {
        if (p.id === player.id) {
          p.chooser = true;
        }
        else p.chooser = false;
      })
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
    updatePlayerColor(state, data) {
      let { color, playerId } = data;
      let pl = state.find((p) => p.id === playerId)
      return pl.color = color;
    },
    updatePlayerName(state, data) {
      let { name, id } = data;
      let pl = state.find((p) => p.id === id)
      return pl.name = name;
    },
    createPlayer(state, data) {
      state.push({
        name: data.name,
        id: state.length,
        score: 0,
        buzzed: false,
        buzzWinner: false,
        chooser: false,
        color: '#fff',
      });
    },
    deletePlayer(state, data) {
      let { id } = data;
      let i = state.findIndex((p) => p.id === id);
      state.splice(i, 1);
    }
  }
}
