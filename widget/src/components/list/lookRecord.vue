<template>
    <div class="lookRecord">
        <div class="topUI" style="background:#fff;padding-top:25px;"></div>
        <header class="bar bar-nav">
            <span class="icon icon-left pull-left" @click="goback()" style="width:auto; height: auto;"></span>
            <h1 class="title">处理记录</h1>
        </header>
        <div class="content" style="padding-top: 25px;">
            <ul>
                <li>
                    <img src=""/>
                    <div class="record-right">
                        <p class="record-top"><span>liuxing</span><span class="time">12:30</span></p>
                        <p class="record-bottom">已经处理完毕，群众满意，后期事项由李可…已经处理完毕，群众满意，后期事项由李可…已经处理完毕，群众满意，后期事项由李可…</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        created() {
            api.setStatusBarStyle({
                style: 'dark'
            });
        },
        mounted() {
        },
        methods: {
            getlist() {
                // let id = this.$route.query.id
                // let callback =(res) => {
                //     console.log(res)
                // }
                // let param = {
                //     eventId: id
                // }
                // $http.getRecordList = (api, param, callback)
            },
            goback() {
                router.go(-1)
            }
        },
        components: {
        }
    }
</script>
<style>
.lookRecord .bar{
    background: #fff;
}
.lookRecord .content{
    background:#FAFAFA;
}
.lookRecord ul{
    background: #fff;
}
.lookRecord ul li img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    margin-right: 10px;
}
.lookRecord ul li {
    display: flex;
    margin: 5px 0 0;
    padding-bottom: 0;
}
.record-right{
    flex: 1;
    border-bottom: 1px solid #E6E6E6;
}
.record-top{
    display: flex;
    justify-content: space-between;
    color:#333;
    font-size: 0.8rem;
    padding-right:10px;
}
.record-top .time{
    color: #999999;
    font-size: 0.7rem;
}
.record-bottom{
    color: #999;
    font-size: 0.7rem;
    padding: 5px 10px 5px 0;
}
.lookRecord .bar-nav{
    top: auto;
}

</style>