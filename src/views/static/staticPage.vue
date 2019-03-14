<template>
    <div class="staticPage" >
        <div class="panel bigTitle" @click="dialogVisible=true">
            <span class="text-fff">今日数据  <i class="question"></i> </span>
        </div>
        <div class="box">
            <div class="subbox">
                <div class="wrap">
                    <div class="hexagon isQing">
                        <div>
                            今日注册人数
                        </div>
                        <div id="userRegistCount">
                            {{transNull(staticInfo.userRegistCount)}}
                        </div>
                    </div>
                    <div class="hexagon isGray">
                        <div>
                            今日申请订单数
                        </div>
                        <span id="applyOrderAllCount">
                            {{transNull(staticInfo.applyOrderAllCount)}}
                        </span>
                        <!--/
                        <span id="applyOrderAllMoney"></span>							-->
                    </div>
                    <!--<div class="hexagon isQing">
                        <div>
                            今日放款订单数/金额
                        </div>
                        <div>
                            <span  id="passOrderAllCount"></span>
                            /
                            <span id="passOrderAllMoney">

                            </span>
                        </div>

                    </div>-->
                    <div class="hexagon isRed">
                        <div>
                            今日实际放款本金
                        </div>
                        <span id="passOrderRealMoney">
                           {{transNull(staticInfo.passOrderRealMoney)}}
										</span>
                    </div>
                    <div class="hexagon isQing">
                        <div>
                            今日放款订单数/金额
                        </div>
                        <div>
                            <span  id="passOrderAllCount">
                                {{transNull(staticInfo.passOrderAllCount)}}
                            </span>
                            /
                            <span id="passOrderAllMoney">
                                {{transNull(staticInfo.passOrderAllMoney)}}
											</span>
                        </div>

                    </div>
                </div>
                <div class="wrap movexWrap">
                    <div class="hexagon isGray">
                        <div>
                            今日新增认证人数
                        </div>
                        <span id="userAddCount">
                            {{transNull(staticInfo.userAddCount)}}
										</span>
                    </div>
                    <div class="hexagon isRed">
                        <div>
                            新增申请订单数
                        </div>
                        <span id="applyOrderNewCount">
                            {{transNull(staticInfo.applyOrderNewCount)}}
										</span>
                    </div>
                    <div class="hexagon isGray">
                        <div>
                            复借申请订单数
                        </div>
                        <span id="applyOrderOldCount">
{{transNull(staticInfo.applyOrderOldCount)}}
										</span>
                    </div>
                    <div class="hexagon isGray">
                        <div>
                            新增放款订单/金额
                        </div>
                        <div>
											<span id="passOrderNewCount">
{{transNull(staticInfo.passOrderNewCount)}}
											</span>
                            /
                            <span id="passOrderNewAllMoney">
{{transNull(staticInfo.passOrderNewAllMoney)}}
											</span>
                        </div>
                    </div>

                    <div class="hexagon isRed">
                        <div>
                            复借放款订单/金额
                        </div>
                        <div>
											<span id="passOrderOldCount">
{{transNull(staticInfo.passOrderOldCount)}}
											</span>
                            /
                            <span id="passOrderOldMoney">
{{transNull(staticInfo.passOrderOldMoney)}}
											</span>
                        </div>
                    </div>

                    <!--<div class="hexagon isGray">
                        复借放款订单/金额
                    </div>-->
                </div>
            </div>
            <div class="subbox">
                <div class="wrap">
                    <!--<div class="hexagon isRed">
                        <div>
                            复借放款订单/金额
                        </div>
                        <div>
                            <span id="passOrderOldCount">

                            </span>
                            /
                            <span id="passOrderOldMoney">

                            </span>
                        </div>
                    </div>-->

                    <!--<div class="hexagon isGray" style="padding: 0;">
                        <div>
                            今日已还款订单数/金额
                        </div>
                        <div>
                            <span id="backOrderAllCount">

                            </span>
                            /
                            <span id="backOrderAllMoney">

                            </span>
                        </div>
                    </div>-->


                    <div class="hexagon isGray">
                        <div>
                            结清订单数/金额
                        </div>
                        <div>
											<span id="backOrderPayCount">
{{transNull(staticInfo.backOrderPayCount)}}
											</span>
                            /
                            <span id="backOrderPayMoney">
{{transNull(staticInfo.backOrderPayMoney)}}
											</span>
                        </div>
                    </div>

                    <div class="hexagon isQing">
                        <div>
                            今日应收订单数/金额
                        </div>
                        <div>
											<span id="todayYingShou">
{{transNull(staticInfo.todayYingShou)}}
											</span>
                            /
                            <span id="todayYingShouMoney">
{{transNull(staticInfo.todayYingShouMoney)}}
											</span>
                        </div>
                    </div>
                    <div class="hexagon isQing">
                        <div>
                            今日到期已还订单数/金额
                        </div>
                        <div>
											<span id="todayYiHuanCount">
{{transNull(staticInfo.todayYiHuanCount)}}
											</span>
                            /
                            <span id="todayYiHuanMoney">
{{transNull(staticInfo.todayYiHuanMoney)}}
											</span>
                        </div>
                    </div>
                    <!--<div class="hexagon isGray">
                        <div>
                            今日订单逾期率
                        </div>
                        <span id="todayOrderYuQiLv">

                        </span>
                    </div>-->
                </div>
                <div class="wrap movexWrap1">
                    <!--<div class="hexagon isGray">
                        <div>
                            结清订单数/金额
                        </div>
                        <div>
                            <span id="backOrderPayCount">

                            </span>
                            /
                            <span id="backOrderPayMoney">

                            </span>
                        </div>
                    </div>-->

                    <div class="hexagon isGray">
                        <div>
                            今日到期续期订单数/金额
                        </div>
                        <div>
											<span id="backOrderExtentionCount">
{{transNull(staticInfo.backOrderExtentionCount)}}
											</span>
                            /
                            <span id="backOrderExtentionMoney">
{{transNull(staticInfo.backOrderExtentionMoney)}}
											</span>
                        </div>
                    </div>

                    <!--<div class="hexagon">
                        <div>
                            续期订单数/金额
                        </div>
                        <div>
                            <span id="backOrderExtentionCount">

                            </span>

                            <span id="backOrderExtentionMoney">

                            </span>
                        </div>
                    </div>-->


                    <!--<div class="hexagon isRed">
                        <div>
                            今日新用户逾期率
                        </div>
                        <span id="todayNewYuQiLv">

                        </span>
                    </div>
                    <div class="hexagon isGray">
                        <div>
                            今日老用户逾期率
                        </div>
                        <span id="todayOldYuQiLv">

                        </span>
                    </div>-->
                </div>
            </div>
        </div>

        <div class="flex-r" style="margin-top: 40px;justify-content: space-between" >
            <div style="width: 48%">
                <div class="panel bigTitle"  data-toggle="modal" data-target="#weidaoqiModal" @click="dialogVisible1=true">
                    <span class="text-fff">未到期订单  <i class="question"></i></span>
                </div>
                <div>
                    <div class="wrap">
                        <div class="hexagon isGray">
                            <div>
                                订单笔数
                            </div>
                            <span id="unexpiredOrderCount">
{{transNull(staticInfo.unexpiredOrderCount)}}
										</span>
                        </div>
                        <div class="hexagon isRed">
                            <div>
                                应还总额
                            </div>
                            <span id="unexpiredYingHuanMoney">
{{transNull(staticInfo.unexpiredYingHuanMoney)}}
										</span>
                        </div>
                        <div class="hexagon isGray">
                            <div>
                                应还本金
                            </div>
                            <span id="unexpiredYingHuanBenJinMoney">
{{transNull(staticInfo.unexpiredYingHuanBenJinMoney)}}
										</span>

                        </div>
                        <div class="hexagon isQing">
                            <div>
                                应还服务费和利息
                            </div>
                            <span id="serverMoney">
{{transNull(staticInfo.serverMoney)}}
										</span>
                        </div>
                    </div>
                </div>
            </div>


            <div  style="width: 48%">
                <div class="panel bigTitle"  data-toggle="modal" data-target="#overdueModal" @click="dialogVisible2=true">
                    <span class="text-fff">逾期数据  <i class="question"></i></span>
                </div>
                <div>
                    <div class="wrap" style="display: flex;justify-content: center;">
                        <div class="hexagon isRed">
                            <div>
                                逾期1-3天总额
                            </div>
                            <span id="overduThreeDay">
{{transNull(staticInfo.overduThreeDay)}}
										</span>
                        </div>
                        <div class="hexagon isGray">
                            <div>
                                逾期4-7天总额
                            </div>
                            <span id="overduSevenDay">
{{transNull(staticInfo.overduSevenDay)}}
										</span>
                        </div>
                        <div class="hexagon isQing">
                            <div>
                                逾期8-15天总额
                            </div>
                            <span id="overduFifteenDay">
{{transNull(staticInfo.overduFifteenDay)}}
										</span>
                        </div>
                        <div class="hexagon isGray">
                            <div>
                                逾期16天以后总额
                            </div>
                            <span id="overduOtherDay">
{{transNull(staticInfo.overduOtherDay)}}
										</span>
                        </div>
                        <div class="hexagon isRed">
                            <div>
                                逾期未还本金
                            </div>
                            <span id="overduBasicMoney">
{{transNull(staticInfo.overduBasicMoney)}}
										</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel bigTitle" style="margin-top: 50px" data-toggle="modal" data-target="#cumulativeModal" @click="dialogVisible3=true">
            <span class="text-fff">累计数据  <i class="question"></i></span>
        </div>
        <div>
            <div class="wrap">
                <div class="hexagon isRed">
                    <div>
                        累计放款订单数/金额
                    </div>
                    <div>
											<span id="verbPayOrderCount">
{{transNull(staticInfo.verbPayOrderCount)}}
											</span>
                        /
                        <span id="verbPayAllMoney">
{{transNull(staticInfo.verbPayAllMoney)}}
											</span>
                    </div>
                </div>
                <div class="hexagon isGray">
                    <div>
                        累计放款本金
                    </div>
                    <span id="verbPayBenJinMoney">
{{transNull(staticInfo.verbPayBenJinMoney)}}
										</span>
                </div>
                <div class="hexagon isQing">
                    <div>
                        累计还款订单数/金额
                    </div>
                    <div>
											<span id="verbRepayOrderCount">
{{transNull(staticInfo.verbRepayOrderCount)}}
											</span>
                        /
                        <span id="verbRepayOrderMoney">
{{transNull(staticInfo.verbRepayOrderMoney)}}
											</span>
                    </div>

                </div>
                <div class="hexagon isGray">
                    <div>
                        累计续期订单数/金额
                    </div>
                    <div>
											<span id="verbXuQiOrderCount">
{{transNull(staticInfo.verbXuQiOrderCount)}}
											</span>
                        /
                        <span id="verbXuQiOrderMoney">
{{transNull(staticInfo.verbXuQiOrderCount/100)}}
											</span>
                    </div>
                </div>
                <div class="hexagon isQing">
                    <div>
                        累计总逾期率
                    </div>
                    <span id="verbYuQiLv">
{{(staticInfo.verbYuQiLv*100).toFixed(2)+'%'}}
										</span>
                </div>
            </div>
        </div>

        <el-dialog
                title="说明(今日数据)"
                :visible.sync="dialogVisible"
                width="30%">
            <div class="introContent">
                1.当日注册人数：注册时间为今天的所有人数合计;<br />
                2.当日新增认证人数：认证完成时间为今天的所有人数合计;<br />
                3.当日申请订单个数：申请借款时间为今天的所有订单数合计;<br />
                4.新增申请订单数：申请借款时间为今天，且用户身份证表示为“新用户”的订单数合计; <br />
                5.复借申请订单数：申请借款时间为今天，且用户身份证表示为“老用户”的订单数合计;<br />
                6.今日放款订单数/总金额：打款时间为今天的所有订单数合计及对应金额;<br />
                7.新增放款订单数/总金额：打款时间为今天，且用户身份标识为“新用户”订单数合计及对应金额;<br />
                8.复借放款订单数/总金额：打款时间为今天，且用户身份标识为“老用户”的订单数合计及对应金额;<br />
                9.结清订单数/金额：还款操作时间为今天，且为结清（还款完成）的订单数合计及对应实际还款金额;<br />
                10.今日到期续期订单数/金额：应还款时间为今天，并在今天操作续期的订单数合计及对应的应还款金额;	<br />
                11.今日应收订单数/金额：应还款时间为今日的所有订单数及应还款金额合计（今日操作续期、今日完成还款、今日剩余待还款之和）;<br />
                12.今日到期已还订单数/金额：应还款时间为今天并完成还款（包含到期还款和提前还款）的订单;<br />
                <!--13.今日订单逾期率：在今日，订单状态变更为“逾期”，且未还款的订单应还款金额/本在今天逾期（7天前）的所有订单的应还款金额合计;<br />-->
                <!--14.今日新用户逾期率：在今日，订单状态变更为“逾期中”，且未还款，且用户身份标识为“新用户”的订单应还款金额/本在今天逾期（7天前）的所有订单的应还款金额合计;<br />-->
                <!--15.今日老用户逾期率：在今日，订单状态变更为“逾期中”，且未还款，且用户身份标识为“老用户”的订单应还款金额/本在今天逾期（7天前）的所有订单的应还款金额合计;<br />-->
                13.今日实际放款本金；在今日完成放款的实际放款本金合计。
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关 闭</el-button>
          </span>
        </el-dialog>



        <el-dialog
                title="说明(未到期订单)"
                :visible.sync="dialogVisible1"
                width="30%">
            <div class="introContent">
                1.订单笔数：订单状态为“待还款”，且应还款时间不为今天（明天开始）的所有订单笔数合计; <br />

                2.应还总额：订单状态为“待还款”，且应还款时间不为今天（明天开始）的所有订单的应还款总额合计 ;<br />

                3.应还本金：订单状态为“待还款”，且应还款时间不为今天（明天开始）的所有订单的应还款本金合计（即为实际打款金额合计）; <br />

                4.应还服务费和利息：订单状态为“待还款”，且应还款时间不为今天（明天开始）的所有订单的服务费和利息的合计。
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">关 闭</el-button>
          </span>
        </el-dialog>



        <el-dialog
                title="说明(逾期数据)"
                :visible.sync="dialogVisible2"
                width="30%">
            <div class="introContent">
                1.逾期1-3天总额：逾期时间为1天、2天、3天的未还款单的应还款金额合计;<br />

                2.逾期4-7天总额：逾期时间为4天、5天、6天、7天的未还款订单的应还款金额合计;<br />

                3.逾期8-15天总额：逾期时间为8天、9天、10天、11天、12天、13天、14天的未还款订单的应还款金额合计;<br />

                4.逾期16天以后总额：逾期时间大于等于16天的未还款订单的应还款金额合计;<br />

                5.逾期未还本金：订单状态为“逾期中”的所有订单的实际打款金额合计。
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">关 闭</el-button>
          </span>
        </el-dialog>



        <el-dialog
                title="说明(累计数据)"
                :visible.sync="dialogVisible3"
                width="30%">
            <div class="introContent">
                1.累计放款订单数/总金额：截止到目前为止的所有已放款（待还款、还款成功、逾期）的订单的订单数及对应的放款金额（即应还款金额）合计;<br />
                2.累计放款本金：截止到目前为止的所有已放款的订单的实际打款金额（即为本金）合计;<br />
                3.累计还款订单数/总金额：截止到目前为止的所有已还款的订单数及实际还款金额合计;<br />
                4.累计续期订单数/总金额：截止到目前为止续期过的订单数合计及产生的续期费用金额合计;<br />
                5.累计总逾期率：截止到目前为止所有订单状态为“逾期中”的应还款金额合计/截止到目前为止所有放款（包含逾期的）的订单的放款金额合计。
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible3 = false">关 闭</el-button>
          </span>
        </el-dialog>



    </div>
</template>

<script>
  export default {
    name: 'staticPage',
    data () {
      return {
        staticInfo:{},
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false
      }
    },
    mounted () {
      this.getStaticList()
    },
    methods: {
      getStaticList(){
        this.$api.statics.getStaticList().then((res)=>{
          this.staticInfo=res.data;
        })
      },
      transNull(val){
        if(val==null){
          return 0
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
    .staticPage{
        background: #f6f8ff;
        /*.showGrayBg{*/
            /*background:rgba(255,255,255,1);*/
            /*position: fixed;*/
            /*height: 100%;*/
            /*width: 100%;*/
            /*left: 0;*/
            /*top: 0;*/
            /*z-index: 100;*/
        /*}*/

        .bigTitle{
            background: #18a5b6;
            text-align: center;
            line-height: 55px;
            display: flex;
            align-items: center;
        }

        .bigTitle span {
            display: block;
            position: relative;  /*定位横线（当横线的父元素）*/
            color: white!important;      /*居中文字的颜色*/
            text-align: center;
            cursor: pointer;
            width: 100%;
            justify-content: center;
            display: flex;
            align-items: center;
        }

        .bigTitle span:before, .bigTitle span:after {
            content: '';
            position: absolute;   /*定位背景横线的位置*/
            top: 50%;
            background-color: white;   /*背景横线颜色*/
            width: 42%;            /*单侧横线的长度*/
            height: 1px;
        }

        .bigTitle span:before {
            left: 2%;              /*调整背景横线的左右距离*/
        }

        .bigTitle span:after {
            right: 2%;
        }
        .bigTitle:not(:first-child){
            margin-top: 50px;
        }

        /*六边形css*/
        .hexagon {
            width:140px;
            height: 80px;
            margin-top: 45px;
            position: relative;
            text-align: center;
            float: left;
            margin-left: 5px;
            box-sizing: border-box;
            padding: 0px 5px;
            font-size: 13px;
            color:white!important;
            transition:all 0.5s;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            flex-wrap: wrap;
            align-content: center;
        }
        .hexagon>div{
            width: 100%;
            text-align: center;

        }
        .hexagon>span{
            width: 100%;
            display: block;
            text-align: center;
        }
        .isQing{
            background: #18a5b6;
        }
        .isQing:before{
            border-bottom: 35px solid #18a5b6;
        }
        .isQing:after{
            border-top: 35px solid #18a5b6;
        }
        .isGray:before{
            border-bottom: 35px solid #bfbfbf;
        }
        .isGray:after{
            border-top: 35px solid #bfbfbf;
        }
        .isRed:before{
            border-bottom: 35px solid #f06359;
        }
        .isRed:after{
            border-top: 35px solid #f06359;
        }
        .isGray{
            background: #bfbfbf;
        }
        .isRed{
            background: #f06359;
        }
        .hexagon:before {
            content: "";
            position: absolute;
            top: -35px;
            left: 0;
            width: 0;
            height: 0;
            border-left: 70px solid transparent;
            border-right: 70px solid transparent;
            /*border-bottom: 30px solid red;*/
        }
        .hexagon:after {
            content: "";
            position: absolute;
            bottom: -35px;
            left: 0;
            width: 0;
            height: 0;
            border-left: 70px solid transparent;
            border-right: 70px solid transparent;
            /*border-top: 30px solid red;*/
        }
        .box{
            display: flex;
        }
        .wrap{
            /*  	width: 50%;*/
            /*background: gainsboro;*/
            /*height: 100%;*/
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
        }
        .movexWrap{
            margin-top: 20px;
            transform: translate(0px,-25px)
        }
        .movexWrap1{
            margin-top: 20px;
            transform: translate(70px,-25px)
        }
        .subbox{
            width: 50%;
        }

        @media screen and (max-width: 1550px) {
            /*六边形css*/
            .hexagon {
                width: 100px;
                height: 70px;
                margin-top: 45px;
                position: relative;
                text-align: center;
                float: left;
                margin-left: 10px;
                box-sizing: border-box;
                padding: 0px 5px;
                font-size: 12px;
                color:white!important
            }
            .isQing:before{
                border-bottom: 25px solid #18a5b6;
            }
            .isQing:after{
                border-top: 25px solid #18a5b6;
            }
            .isGray:before{
                border-bottom: 25px solid #bfbfbf;
            }
            .isGray:after{
                border-top: 25px solid #bfbfbf;
            }
            .isRed:before{
                border-bottom: 25px solid #f06359;
            }
            .isRed:after{
                border-top: 25px solid #f06359;
            }
            .hexagon:before {
                content: "";
                position: absolute;
                top: -25px;
                left: 0;
                width: 0;
                height: 0;
                border-left: 50px solid transparent;
                border-right: 50px solid transparent;
                /*border-bottom: 30px solid red;*/
            }
            .hexagon:after {
                content: "";
                position: absolute;
                bottom: -25px;
                left: 0;
                width: 0;
                height: 0;
                border-left: 50px solid transparent;
                border-right: 50px solid transparent;
                /*border-top: 30px solid red;*/
            }
            .movexWrap{
                margin-top: 25px;
                transform: translate(0px,-35px)
            }
            .movexWrap1{
                margin-top: 25px;
                transform: translate(55px,-35px)
            }

        }

        @media screen and (max-width: 1300px) {
            /*六边形css*/
            .hexagon {
                margin-left: 5px;
            }
            .movexWrap{
                margin-top: 25px;
                transform: translate(0px,-42px)
            }
            .movexWrap1{
                margin-top: 25px;
                transform: translate(53px,-42px)
            }

        }

        .flexItem{
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
        }


        .question{
            display: inline-block;
            font-style: normal;
            color: white;
            font-weight: bold;
            margin-left: 2px;
            cursor: pointer;
            background: url("../../assets/img/wenhao.png");
            background-size: 100% 100%;
            width: 14px;
            height: 14px;
        }
        .modal-title{
            color:#18a5b6
        }
        .introContent{
            font-size: 13px;
            line-height: 28px;
        }
    }
</style>
