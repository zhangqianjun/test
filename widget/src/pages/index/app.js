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
    router.beforeEach((to,from, next) => {
        if (to.name == 'search') {
            to.meta.change = false
            if (from.name == 'entrance'){
                to.meta.change = true
            }
        }
        next()
      })
    new Vue({
        el: '#app',
        router,
        render: h => h(App)
    })
    new vconsole()
    var ajpush = api.require('ajpush');
    ajpush.init(function(ret, err){
        if(ret && ret.status){
            // alert('操作成功!');
        }else{
            alert('操作失败!');
        }
    });
    // api.addEventListener({name:'appintent'}, function(ret,err) {
    //     alert('通知被点击，收到数据：\n' + JSON.stringify(ret));//监听通知被点击后收到的数据
    //     if(ret && ret.appParam.ajpush){
    //     }
    //    })
    ajpush.setListener(
        function(ret) {
            alert(123456)
            var id = ret.id;
            var title = ret.title;
            var content = ret.content;
            var extra = ret.extra;
        }
    );
}