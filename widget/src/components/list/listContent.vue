<template>
<div>
    <div class="list-content">
        <list-tab
        ref="honrayScroller"
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
    import listTab from './listTab'
    import listItem from './listItem'
    export default {
        props: ['showList', 'ifRecord'],
        data() {
            return {
                myTodo: true,
                todayDo: false,
                historyRecord: false,
                needList: [],
                doneList: [],
                historyList: [],

                // showList: []
            }
        },
        created() {
            // this.getproList()
        },
        methods: {
            goFlowInfo(item, index) {
                if (this.ifRecord == 1) {
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
            }
        },
        components: {
            listTab,
            listItem
        }
    }
</script>