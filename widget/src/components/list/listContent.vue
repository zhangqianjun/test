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
            <div class="tabs">
            <div v-if="myTodo" class="tab active">
                 <!-- <div class="content-block"> -->
                <list-tab
                ref="honrayScroller"
                :finish="false"
                :dataCount="todoList.length"
                height="85%"
                @infinite="infinite">
                    <template slot="listItem">
                        <div v-for="(item, index) in todoList" :key="index">
                        <list-item
                            :item="item"
                            @click.native="goFlowInfo(item, index)"
                            :lastChild="index == todoList.length - 1">
                        </list-item>
                        </div>
                    </template>
                </list-tab>
                 <!-- </div> -->
            </div>
            <div v-if="todayDo" class="tab">
                <div class="content-block">
                </div>
            </div>
            <div v-if="historyRecord" id="tab3" class="tab">
                <div class="content-block">
                </div>
            </div>
            <!-- </div> -->
        </div>
    </div>
    </div>
</template>

<script>
    import listTab from './listTab'
    import listItem from './listItem'
    export default {
        data() {
            return {
                todoList: [
                    {name: '1'},
                    {name: '1'},
                    {name: '1'},
                    {name: '1'}
                ],
                hasDoList: [],
                historyList: [],
                myTodo: true,
                todayDo: false,
                historyRecord: false
            }
        },
        created() {
        },
        methods: {
            refresh() {
                this.todoList = [
                    {name: '1'},
                    {name: '1'},
                    {name: '1'},
                    {name: '1'}
                ]
            },
            goFlowInfo(item, index) {
                if (index == 1) {
                    router.push({ name: 'lookEvent', params: {id: '1'}})
                } else if (index == 2) {
                    router.push({ name: 'checkEvent', params: {id: '1'}})
                } else {
                    router.push({ name: 'todoDetails', params: {id: '1'}})
                }
                
            },
            infinite() {
            },
            getTodoList() {
                this.myTodo = true
                this.todayDo = false
                this.historyRecord = false
            },
            getTodayList() {
                this.myTodo = false
                this.todayDo = true
                this.historyRecord = false
            },
            getHistoryList() {
                this.myTodo = false
                this.todayDo = false
                this.historyRecord = true
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