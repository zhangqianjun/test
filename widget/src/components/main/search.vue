<template>
<div class="search-list">
    <header class="bar bar-nav">
        <span class="icon icon-left pull-left" @click="goback()"></span>
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
    }
}
</script>

<style>
.search-list .icon{
    width:auto;
    height:auto;
}
</style>
