import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import VueSocketIO from 'vue-socket.io';
let socketUrl = (process.env.NODE_ENV === 'production') ? `${location.hostname}` : `${location.hostname}:5050`;

Vue.config.productionTip = false
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(new VueSocketIO({
  debug: false,
  connection: socketUrl,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
