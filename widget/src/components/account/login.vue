<template>
    <div style="position:relative;">
        <div class="login">
            <div class="login-title">
                <img/>
                <h1>猎德综合指挥系统</h1>
            </div>
            <div class="login-input">
                <span class="fz-18 login-icon" :class="{'icon-b' : accoutFocus }">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-denglu"></use>
                    </svg>
                </span>
                <input type="text" v-model.trim="form.account" auto-complete="off" placeholder="账号" @focus="onFocus1" @blur="onBlur1(1)" @keyup.enter="handleSubmit2" />        
            </div>
            <div class="login-input">
                <span class="fz-18 login-icon" :class="{'icon-b' : passwordFocus }">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mima"></use>
                    </svg>
                </span>
                <input type="password" v-model.trim="form.password" auto-complete="off" placeholder="密码" @focus="onFocus2" @blur="onBlur1(2)" @keyup.enter="handleSubmit2" />
            </div>
            <div class="login-button" @click="login()">登录</div>
        </div>
    </div>
</template>
<script>
import base64 from 'base-64'
import utf8 from 'utf8'
export default {
    data() {
        return{
            form: {
                account: '',
                password: ''
            },
            accoutFocus: false,
            passwordFocus: false
        }
    },
    methods: {
        onFocus1() {
            this.accoutFocus = true
        },
        onFocus2() {
            this.passwordFocus = true
        },
        onBlur1(type) {
            if (type == 1) {
                this.accoutFocus = false
            }
            if (type == 2) {
                this.passwordFocus = false
            }

        },
        handleSubmit2() {
            
        },
        login() {
            console.log(this.form)
            let param = {
                username: this.form.account,
                password: base64.encode(utf8.encode(this.form.password))
            }
            let loginCallback = (res) => {
                // if (res.code == 200) {
                    Cookies.set('token', res.token, { expires: 7, path: '' })
                    router.push({ name: 'entrance' })
                // }
            }
            $http.login(api, param, loginCallback)
        }
    }
}
</script>
<style>
.login{
    text-align:center;
    position:absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
.login .login-input{
    width: 14rem;
    margin: 0 auto;
    height:2rem;
    position:relative;
    margin-bottom:1rem;
}
.login-input input {
    width: 14rem;
    padding: 0 0 0 35px;
    border: 1px solid #E6E6E6;
    border-radius: 1rem;
    height:2rem;
    color: #B3B3B3;
}
.login-input span{
    font-size: 20px;
    padding:5px 5px 5px 10px;
    position: absolute;
    left:0;
    color: #B3B3B3;
}
.login-button{
    width: 14rem;
    margin: 0 auto;
    height:2rem;
    margin-top:1.5rem;
    background:#64ABFB;
    color:#fff;
    border-radius: 1rem;
    line-height:2rem;
}
.login-title h1{
    font-size:1.1rem;
    margin-bottom:2rem;
}
.icon-b{
    color: #64ABFB !important;
}

</style>