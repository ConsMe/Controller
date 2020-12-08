import Vue from 'vue';
import VTooltip from 'VTooltip';
import Toasted from 'vue-toasted';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VTooltip, { defaultTrigger: 'hover' });
Vue.use(Toasted, { keepOnHover: true });

Vue.mixin({
  methods: {
    clone(a) { return JSON.parse(JSON.stringify(a)); },
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
