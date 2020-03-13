import Vue from 'vue'
import App from './app.vue'
import router from './router/router.js'
import "./common/sass/style.scss";
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
  