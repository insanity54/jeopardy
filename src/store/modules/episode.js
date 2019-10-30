import { uuidv4 } from '@/util/util';

export default {
  state: {
    episodes: [
      // {
      //   name: 'Crimus',
      //   id: '8293492-9348929482-834284-892984',
      //   single: '1238472034-2-34234-234234-234-23434',
      //   double: '338472034-2-34234-234234-234-23434',
      //   final: '438472034-2-34234-234234-234-23434',
      // }
    ]
  },
  getters: {
    readEpisode(state, data) {
      let { id } = data;
      return state.episodes.find((e) => e.id === id);
    },
  },
  mutations: {
    createEpisode(state, data) {
      let { name, single, double, final } = data;
      state.episodes.push({
        name: name,
        id: uuidv4(),
        single: single || '',
        double: double || '',
        final: final || '',
      })
    },
    updateEpisodeName(state, data) {
      let { id, name } = data;
      let i = state.episodes.findIndex((e) => e.id === id);
      state.episodes[i].name = name;
    },
    updateEpisodeSingle(state, data) {
      let { id, single } = data;
      let i = state.episodes.findIndex((e) => e.id === id);
      state.episodes[i].single = single;
    },
    updateEpisodeDouble(state, data) {
      let { id, double } = data;
      let i = state.episodes.findIndex((e) => e.id === id);
      state.episodes[i].double = double;
    },
    updateEpisodeFinal(state, data) {
      let { id, final } = data;
      let i = state.episodes.findIndex((e) => e.id === id);
      state.episodes[i].final = final;
    },
    deleteEpisode(state, data) {
      let { id } = data;
      let i = state.episodes.findIndex((e) => e.id === id);
      return state.episodes.splice(i, 1);
    },
  }
}
