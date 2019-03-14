<template>
	<el-tooltip class="item" effect="dark" :content="content" placement="top">
	      <div class="tipTitleClass">{{tipName}}</div>
	</el-tooltip>
</template>

<script>
export default {
	name: 'tipbtn',
	data () {
   	  return {
	  }
	},
	props: {
      content: {  // 必须提供字段
        required: false,
        default:""
      },
      tipName: {  // 必须提供字段
        required: false,
        default:"风险提示"
      },
    },
	computed:{
    },
    created () {
    },
    destoryed () {
    },
    mounted () {
    },
    methods: {}
}
</script>

<style scoped="scoped" lang="less">
.tipTitleClass{
	box-sizing: border-box;
	background: dodgerblue;
	color:white;
	font-size: 12px;
	padding: 3px 5px;
	border-radius: 3px;
	margin-left: 10px;
}
</style>