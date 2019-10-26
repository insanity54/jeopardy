export default {
  state: [
    {
      title: 'New Game',
      id: 'new',
      img: '/plus.png',
      builtin: true
    },
  ],
  getters: {
    games: state => {
      return state;
    }
  },
  mutations: {
    createGame(state, gameObject) {
      state.push(gameObject);
    }
  }
}
