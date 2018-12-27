import App from './app.vue';
import Vue from 'vue';
import vTap from 'v-tap';
import routes from './routes';
import VueRouter from 'vue-router';
import vconsole from 'vconsole';
import VueScroller from 'vue-scroller'
import 'assets/css/common.css'


Vue.use(vTap); //添加vue tap事件
Vue.use(VueRouter)
Vue.use(VueScroller)

const router = new VueRouter({
  routes
})
let API_HOST = ''
window.HOST = API_HOST
window.imgUrl = API_HOST
window.router = router
window.apiready = function() {
    new Vue({
        el: '#app',
        router,
        render: h => h(App)
    })
    new vconsole()   
}