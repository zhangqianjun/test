<template>
<div class="set-list">
    <div class="topUI" style="background:#fff;padding-top:20px;"></div>
    <header class="bar bar-nav">
        <span class="icon icon-left pull-left" @click="goback()"></span>
        <h1 class="title">设置</h1>
    </header>
    <div class="content">
    <div class="list-block">
        <ul>
        <li class="item-content item-link">
            <input id="uploaderInput"
            value="123"
            type="file"
            accept="image/*"
            style="opacity: 0;position:absolute;top:0;left:0;width:100%;height:100%;z-index:66;"
            @change="uploadFile($event)" />
            <div class="item-inner">
            <div class="item-title">修改头像</div>
            <img :src="`${HOST}${userImg}`"/>
            </div>
        </li>
        <li class="item-content item-link" @click="goPassChangeToast()">
            <div class="item-inner">
            <div class="item-title">修改密码</div>
            </div>
        </li>
        </ul>
        <div class="outlogin" @click="outLogin()">
            退出登录
        </div>
    </div>
    </div>
    <div class="block-toast" v-if="changePass"></div>
    <div class="set-toast" v-if="changePass">
        <div class="inputPassword">
            <span>旧密码</span>
            <input type="password" v-model = "oldPassword"/>
        </div>
        <div class="inputPassword">
            <span>新密码</span>
            <input type="password" v-model = "newPassword"/>
        </div>
        <div class="button">
            <span @click="passwordChange()">确定</span>
            <span @click="passwordNo()">取消</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            changePass: false,
            newPassword: '',
            oldPassword: '',
            userInfo: {},
            userImg:'',
            HOST: window.HOST
        }
    },
    created() {
        api.setStatusBarStyle({
            style: 'dark'
        });
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            let callback = (res) => {
                this.userInfo = res.data
                this.userImg = this.userInfo.photo
            }
            $http.getUserInfo(api, callback)
        },
        uploadFile(e) {
            var file = e.target.files[0];
            if (!file) {
                return
            }
            $g.upload(file, (file, res) => {
                console.log(JSON.stringify(res))
                if (res.code == 400) {
                return
                }
                let param = {
                    photo: res.data
                }
                let callback = (res) => {
                    api.toast({
                        msg: '已成功修改',
                        duration: 2000,
                        location: 'middle'
                    })
                    this.userImg = param.photo
                    this.getUserInfo()
                }
                $http.getUserPhoto(api, param, callback)
            })
        },
        goback() {
            router.go(-1)
        },
        passwordChange() {
            let param = {
                new_pwd: this.newPassword,
                old_pwd: this.oldPassword
            }
            let callback = (res) => {
                this.changePass = false
            }
            $http.changePassword(api, param, callback)
        },
        passwordNo() {
            this.changePass = false 
        },
        goPassChangeToast() {
            this.changePass = true
        },
        outLogin() {
            let callback = (res) => {
                Cookies.remove('token')
                clearInterval(window.timer); 
                router.push({ name: 'login' })
                api.toast({
                    msg: '已退出登陆',
                    duration: 2000,
                    location: 'middle'
                })
            }
            $http.logout(api, callback)
        }
    }
}
</script>

<style>
.set-list {
    width:100%;
    height: 100%;
}
.set-list .icon{
    width:auto;
    height:auto;
}
.set-list .bar-nav{
    background: #fff;
    top: auto;
}
.list-block li{
    padding:0;
}
.set-list .content{
    background: #fafafa;
    margin-top:20px;
}
.set-list .list-block{
    margin: 0;
}
.set-list .item-inner img {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
}
.block-toast {
    width:100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: fixed;
    top:0;
    left:0;
    z-index: 20;
}
.set-toast {
    width:80%;
    height: 200px;
    background: #fff;
    position:absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 30;
    border-radius: 5px;
    padding-top: 20px;
}
.set-toast .button {
    display: flex;
    position:absolute;
    bottom: 0;
    border: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    font-size: 1rem;
}
.set-toast .button span {
    display: block;
    flex:1;
    background: #0894ec;
    color: #fff;
    height: 50px;
    line-height: 50px;
}
.inputPassword {
    font-size: 0.8rem;
    padding: 10px 20px;
}
.inputPassword input{
    margin-left: 3%;
    width: 60%;
    height: 1.5rem;
    border: 1px solid #E6E6E6;
}
.outlogin {
    width:80%;
    height: 50px;
    text-align:center;
    line-height: 50px;
    background:#64ABFB;
    color:#fff;
    border-radius: 25px;
    margin: 50px 10%;
}
</style>
