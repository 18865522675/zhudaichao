<template>
    <div>
        <el-card  class="box-card affilateWrap taobaoInfoWrap">
            <div class="circleWrap">
                <div  class="xinyongWrap">
                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                贷款需求指数
                            </div>
                            <div id="tcp0336">
                                {{transStr(tianchuangInfo.tcp0336)}}
                            </div>
                        </div>
                        <div>
                            建议值 : 小于等于602或者未记录通过
                        </div>
                    </div>
                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                个人履约指数
                            </div>
                            <div id="indexPerf">
                                {{transStr(tianchuangInfo.indexPerf)}}
                            </div>
                        </div>
                        <div>
                            建议值 : 大于等于75或者未记录通过
                        </div>
                    </div>
                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                逾期贷款笔数
                            </div>
                            <div id="tcp0007">
                                {{transStr(tianchuangInfo.tcp0007)}}
                            </div>
                        </div>
                        <div>
                            建议值 : 小于等于15笔或者未记录通过
                        </div>
                    </div>

                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                逾期贷款机构数
                            </div>
                            <div id="tcp0090">
                                {{transStr(tianchuangInfo.tcp0090)}}
                            </div>
                        </div>
                        <div>
                            建议值 : 小于等于15家或者未记录通过
                        </div>
                    </div>

                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                最近6个月扣款失败次数
                            </div>
                            <div id="numFailSix">
                                {{transStr(tianchuangInfo.numFailSix)}}
                            </div>
                        </div>
                        <div>
                            建议值 : 小于等于31次或者未记录通过
                        </div>
                    </div>
                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                有还款机构数占比
                            </div>
                            <div id="tcp0343">
                                {{transStr(tianchuangInfo.tcp0343)}}
                            </div>
                        </div>
                        <div>
                            建议值 : 大于0.67或者未记录通过
                        </div>
                    </div>
                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                有还款贷款笔数占比
                            </div>
                            <div id="tcp0346">
                                {{transStr(tianchuangInfo.tcp0346)}}
                            </div>
                        </div>
                        <div>
                            建议值 : 大于0.67或者未记录通过
                        </div>
                    </div>
                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                黑名单
                            </div>
                            <div id="blackLevel">
                                {{transStr(tianchuangInfo.blackLevel)}}
                            </div>
                        </div>
                        <div>
                            建议值 : A类拒绝
                        </div>
                    </div>
                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                履约金额比例
                            </div>
                            <div id="tcp0329">
                                {{transStr(tianchuangInfo.tcp0329)}}
                            </div>
                        </div>
                        <div>
                            建议值 : 大于0.78或者未记录通过
                        </div>
                    </div>

                    <div class="xinyongItem flexItem">
                        <div class="flexItem xinyongItemWrap">
                            <div>
                                无逾期贷款笔数占比
                            </div>
                            <div id="tcp0348">
                                {{transStr(tianchuangInfo.tcp0348)}}
                            </div>
                        </div>
                        <div>
                            建议值 : 大于0.5或者未记录通过
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'singleTianChuang',
    data () {
      return {
        tianchuangInfo:{}
      }
    },
    mounted () {
      this.getTianChuangInfo()
    },
    methods: {
      getTianChuangInfo(){
        this.$api.detail.getTianChuangInfo({
          userId:this.$route.params.userId,
          orderId:this.$route.params.orderId!="null"?this.$route.params.orderId:null
        }).then((res)=>{
            this.tianchuangInfo=res.data;
        })
      },
      transStr(val){
        if(val===""||val==null){
          return "未记录"
        }
        return val
      }
    },
    created () {
    },
    destoryed () {
    }
  }
</script>

<style scoped lang="less">
    .xinyongWrap{
        padding: 0 10px;
        flex-wrap: wrap;
        justify-content: flex-start!important;
        .xinyongItem{
            line-height: 30px;
            line-height: 40px;
            border-bottom: 1px solid gray;
            font-size: 14px;
        }
    }
    .flexItem{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        flex-direction: row;
    }
    .xinyongItemWrap div{
        flex:1
    }
    .xinyongWrap .xinyongItem div{
        flex:1
    }
</style>
