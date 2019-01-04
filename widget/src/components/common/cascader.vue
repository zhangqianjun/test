<template>
    <div class="cascader-container">
        <div class="list-block">
            <ul>
            <li v-for="(item, index) in list" :key="index" @click="getthis(item)" class="item-content" :class="item.children ? 'item-link' : ''">
                <div class="item-media"><i class="icon icon-f7"></i></div>
                <div class="item-inner">
                <div class="item-title">{{item.name}}</div>
                </div>
                <!-- <span class="icon icon-right"></span> -->
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props:['list'],
    data() {
        return {
            pickerData: []
        }
    },
    created() {
    },
    methods: {
        getthis(item) {
            if(item.children) {
                this.$emit('changelist', item.children)
            } else {
                this.$emit('changeok', item)
            }
        }
    }
}
</script>

<style>
.cascader-container{
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    z-index:100;
    background:#fafafa;
}
</style>
