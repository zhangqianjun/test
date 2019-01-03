<template>
<div class="search-list">
    <div class="topUI" style="background:#fff;padding-top:25px;"></div>
    <header class="bar bar-nav">
        <span class="icon icon-left pull-left" @click="goback()" style="width:auto; height: auto;"></span>
        <h1 class="title">搜索</h1>
    </header>
    <div class="bar bar-header-secondary">
    <div class="searchbar">
        <a class="searchbar-cancel">取消</a>
        <div class="search-input">
        <label class="icon icon-search" for="search"></label>
        <input type="search" id='search' placeholder='输入关键字...'/>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        goback() {
            router.go(-1)
        }
    },
    created() {
        api.setStatusBarStyle({
            style: 'dark'
        });
    }
}
</script>

<style>
.search-list .icon{
    width:auto;
    height:auto;
}
.search-list .bar-nav{
    top: auto;
}
.search-list .bar {
    background: #fff;
}
.search-list .content{
    background:#FAFAFA;
}
.search-list .bar-header-secondary{
    margin-top: 22px;
    height: 2.9rem;
}
.bar .searchbar{
    background:#fff;
}
.search-list .searchbar .search-input{
    background: #F7F7F7;
    border-radius:20px;
    height: 2rem;
}
.search-list .searchbar .search-input input {
    background: #F7F7F7;
    border-radius:20px;
    height: 2rem;
}
.search-list .searchbar{
    height:2.9rem;
}
.search-list .searchbar .searchbar-cancel {
    height: 2rem;
    line-height: 2rem;
}
</style>
