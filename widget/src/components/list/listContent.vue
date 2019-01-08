<template>
<div>
    <div class="list-content">
        <div class="buttons-tab">
            <a 
            class="tab-link button" 
            :class="myTodo ? 'active' : ''"
            @click="getTodoList()">我的待办</a>
            <a 
            class="tab-link button" 
            :class="todayDo ? 'active' : ''"
            @click="getTodayList()">今日已办</a>
            <a 
            class="tab-link button" 
            :class="historyRecord ? 'active' : ''"
            @click="getHistoryList()">历史记录</a>
        </div>
        <list-tab
        ref="honrayScroller"
        :finish="false"
        :dataCount="showList.length"
        @infinite="infinite">
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
    import listTab from './listTab'
    import listItem from './listItem'
    export default {
        data() {
            return {
                myTodo: true,
                todayDo: false,
                historyRecord: false,
                needList: [],
                doneList: [],
                historyList: [],
                showList: []
            }
        },
        created() {
            this.getproList()
        },
        methods: {
            getproList() {
                let callback = (res) => {
                    this.needList = res.data.needList
                    this.doneList = res.data.doneList
                    this.historyList = res.data.historyList
                    this.showList = this.needList 
                }
                $http.getProjectList(api, callback)
            },
            goFlowInfo(item, index) {
                if (this.myTodo) {
                    if (item.eventType == 1) {
                        router.push({ name: 'todoDetails', params: {id: item.id} ,query: {id: item.id}})
                    } else if (item.eventType == 2) {
                        router.push({ name: 'checkEvent', params: {id: item.id}, query: {id: item.id, type: 1}})
                    } else if (item.eventType == 3) {
                        router.push({ name: 'checkEvent', params: {id: item.id} ,query: {id: item.id, type: 2}})
                    }
                } else {
                    router.push({ name: 'lookEvent', params: {id: item.id} ,query: {id: item.id}})
                }  
            },
            infinite() {
            },
            getTodoList() {
                this.myTodo = true
                this.todayDo = false
                this.historyRecord = false
                this.showList = this.needList
            },
            getTodayList() {
                this.myTodo = false
                this.todayDo = true
                this.historyRecord = false
                this.showList = this.doneList
            },
            getHistoryList() {
                this.myTodo = false
                this.todayDo = false
                this.historyRecord = true
                this.showList = this.historyList
            }
        },
        components: {
            listTab,
            listItem
        }
    }
</script>
<style>
.list-content .buttons-tab{
    /* background:rgb(102, 204, 204) */
}
.list-content .buttons-tab .button{
    /* color:rgb(228, 228, 228) */
}
.list-content .buttons-tab .button.active{
    /* color:#fff; */
    font-weight: bold;
    border-color:#64ABFB;
    padding: 0;
    margin: 0 1rem;
}
.buttons-tab:after{
    height: 0 !important;
}
</style>