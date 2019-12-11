import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Vlf from 'vlf' // vue-localforage for saving multimedia locally
import game from './modules/game';
import players from './modules/players';
import meta from './modules/meta';
import episode from './modules/episode';
import buzzer from './modules/buzzer';
import audio from './modules/audio';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuex);
Vue.use(Vlf);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})


export default new Vuex.Store({
    modules: {
        game,
        players,
        meta,
        episode,
        audio,
        buzzer
    },
    plugins: [
      vuexLocal.plugin
    ],
    strict: true
})
