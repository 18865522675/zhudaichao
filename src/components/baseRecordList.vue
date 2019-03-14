<template>
    <div>
        <div class="recordList" v-if="recordList.length">
            <div class="recordItem" v-for="(item,index) in recordList" :key="index">
                <div class="recordItem-header  flex-r">
                    <div>
                        负责人 :   {{item.userName}}
                    </div>
                    <div style="margin-left: 100px">
                        创建时间 :   {{$toolkit.formatTime(item.createTime)}}
                    </div>
                </div>
                <div  class="recordItem-body marT10 flex-r" style="align-items: center;justify-content: space-between" >
                    <span>备注 : </span>
                    <el-input type="textarea" class="recordInp" :value="item.context"   :disabled="true" :row="3"></el-input>
                </div>
            </div>
        </div>
        <div v-else class="noData">
            暂无记录
        </div>
    </div>
</template>

<script>
  export default {
    name: 'baseRecordList',
    data () {
      return {}
    },
    props:["recordList"],
    mounted () {
    },
    methods: {},
    created () {
    },
    destoryed () {
    }
  }
</script>

<style scoped lang="less">
    .recordList{
        max-height: 400px;
        overflow-y: auto;
        .recordItem{
            box-sizing: border-box;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid gray;
            &:not(:first-child){
                margin-top: 15px;
            }
            .recordInp{
                width: 92%;
            }
        }
    }

    .noData{
        color:gray;
        font-size: 15px;
        text-align: center;
        font-weight: bold;
        line-height: 80px;
    }
</style>
