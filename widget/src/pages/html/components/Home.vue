<template>
    <div style="margin-top:60px;">
        <!-- <div @click="gologin()">地图</div>
        <div @click="getmessage()">定时</div> -->
        <div @click="getapp()">首页</div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        created() {
        },
        methods: {
            getapp() {
                router.push({ name: 'entrance' })
            }
        }
    }
</script>