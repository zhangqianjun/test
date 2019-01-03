<template>
    <div style="width:100%; height: 100%;">
        <!-- <div style="margin-top: 5rem;" @click="getapp()">首页111</div> -->
        <!-- <transition name="fade" mode="in-out"> -->
            <transition name="bounce">
            <router-view></router-view>
            </transition>
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
            if (Cookies.get('token')) {
                setTimeout(function() {
                    router.push({ name: 'entrance'})
                }, 500)
                
            } else {
                setTimeout(function() {
                    router.push({ name: 'login'})
                }, 500)
                // router.push({ name: 'login'})
            }
        },
        methods: {
            getapp() {
                router.push({ name: 'entrance' })
            }
        }
    }
</script>
<style>
.bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-out .2s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0);
    }
  }
</style>