<template>
<div class="search-list">
    <div class="topUI" style="background:#fff;padding-top:25px;"></div>
    <header class="bar bar-nav">
        <span class="icon icon-left pull-left" @click="goback()" style="width:auto; height: auto;"></span>
        <h1 class="title">搜索</h1>
    </header>
    <div class="content" style="padding-top: 25px;">
        <div class="search-border">
            <div class="search-width">
            <input type="search" id='search' placeholder='输入关键字...' v-model='searchData'/>
            <span class="icon icon-search" @click="getSearchList()"></span>
            </div>
        </div>
        <list-tab
            :types="search"
            :dataCount="showList.length">
                <template slot="listItem">
                    <div v-for="(item, index) in showList" :key="index">
                    <list-item
                        :item="item"
                        @click.native="goFlowInfo(item, index)"
                        :lastChild="index == showList.length - 1">
                    </list-item>
                    </div>
                </template>
            </list-tab>
    </div>
</div>
</template>

<script>
import listTab from '../list/listTab'
import listItem from '../list/listItem'
export default {
    data() {
        return {
            searchData: '',
            showList: [],
            search: 'search'
        }
    },
    methods: {
        goback() {
            router.go(-1)
        },
        getSearchList() {
            let param = {
                title: this.searchData
            }
            let callback = (res) => {
                this.showList = res.data
            }
            $http.getSearch(api, param, callback)
        },
        goFlowInfo(item, index) {
            if (item.eventType == 1) {
                router.push({ name: 'todoDetails', params: {id: item.id} ,query: {id: item.id}})
            } else if (item.eventType == 2) {
                router.push({ name: 'checkEvent', params: {id: item.id}, query: {id: item.id, type: 1}})
            } else if (item.eventType == 3) {
                router.push({ name: 'checkEvent', params: {id: item.id} ,query: {id: item.id, type: 2}})
            } else {
                router.push({ name: 'lookEvent', params: {id: item.id} ,query: {id: item.id}})
            } 
        },
    },
    created() {
        api.setStatusBarStyle({
            style: 'dark'
        });
    },
    mounted() {
        document.getElementById('search').onKeydown = function(e){
        　　　　if(e.keyCode == 13){
        alert(1)
        　　　　}
        　　}
    },
    components: {
        listTab,
        listItem
    }
}
</script>

<style>
.search-list .search-width .icon{
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
    background:#fff;
}
.search-width {
    width: 95%;
    height: 1.6rem;
    margin: 10px 2.5%;
    position: relative
}
.search-width input {
    box-sizing: border-box;
    padding: 2px 20px 2px 10px;
    width:100%;
    height: 2rem;
    background: #F7F7F7;
    border: 0;
    border-radius: 1rem;
}
.search-width span{
    padding-left:20px;
    position:absolute;
    top: 10px;
    right: 3%;
    z-index: 99;
}
</style>
