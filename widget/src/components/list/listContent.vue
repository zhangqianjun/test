<template>
<div>
    <div class="list-content">
        <div class="buttons-tab">
            <a href="#tab1" class="tab-link active button">我的待办</a>
            <a href="#tab2" class="tab-link button">今日已办</a>
            <a href="#tab3" class="tab-link button">历史记录</a>
        </div>
            <div class="tabs">
            <div id="tab1" class="tab active">
                 <!-- <div class="content-block"> -->
                <list-tab
                ref="honrayScroller"
                :finish="false"
                :dataCount="todoList.length"
                height="85%"
                @infinite="infinite">
                    <template slot="listItem">
                        <div v-for="(item, index) in todoList">
                        <list-item
                            :item="item"
                            @click.native="goFlowInfo(item)"
                            :lastChild="index == todoList.length - 1">
                        </list-item>
                        </div>
                    </template>
                </list-tab>
                 <!-- </div> -->
            </div>
            <div id="tab2" class="tab">
                <div class="content-block">
                </div>
            </div>
            <div id="tab3" class="tab">
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
                historyList: []
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
            goFlowInfo(item) {
                router.push({ name: 'todoDetails', params: {id: '1'}})
            },
            infinite() {

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