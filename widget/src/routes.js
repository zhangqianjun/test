const Home = (resolve) => {
  require(['./components/Home.vue'], resolve)
}
// Account 账户
const login = (resolve) => {
  require(['./components/account/login.vue'], resolve)
}
// 首页
const entrance = (resolve) => {
  require(['./components/main/main.vue'], resolve)
}
//事件上报
const affairReport = (resolve) => {
  require(['./components/affairReport/affairDetail.vue'], resolve)
}
// 搜索
const search = (resolve) => {
  require(['./components/main/search.vue'], resolve)
}
// 设置
const set = (resolve) => {
  require(['./components/main/set.vue'], resolve)
}
// 事件细节
const todoDetails = (resolve) => {
  require(['./components/list/todoDetail.vue'], resolve)
}

const routes = [
  // 登陆模块 normalLogin-本地开发测试登陆
  {
    path: '/',
    component: Home,
    children:[
      { path: '/login', component: login, name: 'login', meta: { keepAlive: false }},
      { path: '/entrance', component: entrance, name: 'entrance', meta: { keepAlive: false }},
      { path: '/affairReport', component: affairReport, name: 'affairReport', meta: { keepAlive: false }},
      { path: '/search', component: search, name: 'search', meta: { keepAlive: false }},
      { path: '/set', component: set, name: 'set', meta: { keepAlive: false }},
      { path: '/todoDetails/:id', component: todoDetails, name: 'todoDetails', meta: { keepAlive: false }}
    ]
  }
]
export default routes
