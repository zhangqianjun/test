<template>
    <div>
        <!-- <div @click="gologin()">地图</div>
        <div @click="getmessage()">定时</div> -->
        <div style="margin-top: 5rem;" @click="getapp()">首页111</div>
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