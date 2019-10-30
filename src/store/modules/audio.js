export default {
  state: {
    audioQueue: []
  },
  mutations: {
    queueAudio(state, audioFile) {
      state.audioQueue.push(audioFile);
    },
    shiftAudioQueue(state) {
      state.audioQueue.shift();
    }
  }
}
