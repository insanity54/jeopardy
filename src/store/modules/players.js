export default {
  state: [
    {
      name: 'Yolyamanitzin',
      id: 0,
      score: 0,
      buzzed: false,
      buzzWinner: false,
      chooser: false,
    },
    {
      name: 'Kai',
      id: 1,
      score: 0,
      buzzed: false,
      buzzWinner: false,
      chooser: false,
    },
    {
      name: 'Sacha',
      id: 2,
      score: 0,
      buzzed: false,
      buzzWinner: false,
      chooser: false,
    },
    {
      name: 'Taylor',
      id: 3,
      score: 0,
      buzzed: false,
      buzzWinner: false,
      chooser: false,
    }
  ],
  getters: {
    buzzWinner: state => {
      return state.find((p) => p.buzzWinner === true);
    },
    tiesto: state => {
      return `YOLO ${state[0].name}`
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
    }
  }
}
