import App from './app.vue';
import Vue from 'vue';
import vTap from 'v-tap';
import routes from '../../routes';
import VueRouter from 'vue-router';
import vconsole from 'vconsole';
import VueScroller from 'vue-scroller'
import moment from 'moment'
import Cookies from 'js-cookie'
import $g from 'assets/js/global.js'
import _ from 'lodash'
import 'assets/js/http.js'
import 'assets/js/iconfont.js'
import 'assets/css/common.css'


Vue.use(vTap) //添加vue tap事件
Vue.use(VueRouter)
Vue.use(VueScroller)

const router = new VueRouter({
  routes
})
let API_HOST = 'http://ldsapi.wkuai.cc/'
window.HOST = API_HOST
window.imgUrl = API_HOST
window.router = router
window.Cookies = Cookies
window.moment = moment
window.$g = $g
window._ = _
window.apiready = function() {
    new Vue({
        el: '#app',
        router,
        render: h => h(App)
    })
    new vconsole()   
    var ajpush = api.require('ajpush');
    ajpush.setListener(
        function(ret) {
            alert(23)
            console.log(ret)
            var id = ret.id;
            var title = ret.title;
            var content = ret.content;
            var extra = ret.extra;
        }
    );
}