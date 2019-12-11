export default {
  state: {
    queue: [
    ],
  },
  mutations: {
    queueAudio(state, audioId) {
      state.queue.push(audioId);
    },
    shiftQueue(state) {
      state.queue.shift();
    }
  },
  actions: {
    fetchQueue({ commit, state }) {
      return new Promise((resolve, reject) => {
        let audioId = state.queue[0];
        commit('shiftQueue');
        if (typeof audioId === 'undefined') reject(audioId);
        resolve(audioId);
      });
    }
  }
}
