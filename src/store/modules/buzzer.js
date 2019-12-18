import axios from 'axios';

export default {
  state: {
    buzzLog: [],
    lockLog: [],
    unlockLog: [],
    isLocked: true,
    lagCompensation: 3000
  },
  mutations: {
    buzz(state, data) {
      let { buzzEpoch, id, unlockEpoch } = data;
      let reactionTime = (buzzEpoch - unlockEpoch);
      state.buzzLog.push({ buzzEpoch, id, unlockEpoch, reactionTime });
    },
    unlockBuzzer(state) {
      state.unlockLog.push(Date.now());
      state.buzzLog = [];
      state.isLocked = false;
    },
    lockBuzzer(state) {
      state.lockLog.push(Date.now());
      state.isLocked = true;
    },
    setLagCompensation(state, delay) {
      state.lagCompensation = delay;
    }
  },
  actions: {
    setLagCompensation ({ commit }, payload) {
      let { delay } = payload;
      return axios.post('/api/v1/lag-compensation', {
          delay: delay
        }).then((res) => {
          console.log('api call is done');
          console.log(res);
          commit('setLagCompensation', delay);
        })
        .catch((err) => {
          console.log(err);
        });
      },
      getLagCompensation ({ commit }) {
        return axios.get('/api/v1/lag-compensation')
        .then((res) => {
          let { delay } = res.data;
          commit('setLagCompensation', delay);
        })
        .catch((err) => {
          console.log(err);
        })
      }
  }
}
