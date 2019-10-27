import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Vlf from 'vlf' // vue-localforage for saving multimedia locally
import game from './modules/game';
import games from './modules/games';
import players from './modules/players';
import meta from './modules/meta';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuex);
Vue.use(Vlf);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})


export default new Vuex.Store({
    modules: {
        game,
        games,
        players,
        meta
    },
    plugins: [
      vuexLocal.plugin
    ],
    strict: true
})
