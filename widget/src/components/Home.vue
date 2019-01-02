<template>
    <div>
        <div style="margin-top: 5rem;" @click="getapp()">首页111</div>
        <!-- <transition name="fade" mode="in-out"> -->
            <router-view></router-view>
        <!-- </transition> -->
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