<template>
    <div style="background:#fff;">
        <!-- <div class="list-item">
            <p class="item-title">{{item.title}}</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>{{item.address}}</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>{{times}}</span></p>
        </div> -->
        <div class="list-item">
            <p class="item-title">item.title</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>item.address</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>times</span></p>
        </div>
         <div class="list-item">
            <p class="item-title">item.title</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>item.address</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>times</span></p>
        </div>
         <div class="list-item">
            <p class="item-title">item.title</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>item.address</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>times</span></p>
        </div>
         <div class="list-item">
            <p class="item-title">item.title</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>item.address</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>times</span></p>
        </div>
         <div class="list-item">
            <p class="item-title">item.title</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>item.address</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>times</span></p>
        </div>
         <div class="list-item">
            <p class="item-title">item.title</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>item.address</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>times</span></p>
        </div>
         <div class="list-item">
            <p class="item-title">item.title</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>item.address</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>times</span></p>
        </div>
         <div class="list-item">
            <p class="item-title">item.title</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>item.address</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>times</span></p>
        </div>
         <div class="list-item">
            <p class="item-title">item.title</p>
            <p class="item-address">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dizhi"></use>
                </svg>
                <span>item.address</span></p>
            <p class="item-date">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-calendar"></use>
                </svg>
                <span>times</span></p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: {}
            },
            lastChild: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                times: ''
            }
        },
        created() {
            if (this.item.time) {
                this.times = moment.unix(this.item.time).format('YYYY-MM-DD HH:mm')
            }
        },
        methods: {
        }
    }
</script>
<style>
.list-item{
    /* height:60px; */
    padding:0.5rem 0;
    margin: 0 15px;
    border-bottom:1px solid #eee;
}
.list-item .item-title{
    font-size:16px;
    display:block;
    padding-bottom:5px;
}
.list-item .item-address, .list-item .item-date{
    font-size:14px;
    color:#999;
    display:block;
    display:flex;
    align-items: center;
    /* justify-content: center; */
}
.list-item .item-address{
   font-size:14px;
    color:#333;
}
.list-item .icon{
    font-size:16px !important;
    margin-right:5px;
}
.item-date .icon{
    font-size:12px !important;
}
</style>