<template>
    <div>
        <img :src="imgSrc" style="width: 100%" alt="">
    </div>
</template>

<script>
  export default {
    name: 'borrowNew',
    data () {
      return {
        imgSrc:""
      }
    },
    mounted () {

    },
    computed:{
      "partnerTag":function () {
        return this.$route.params.partnerTag
      }
    },
    methods: {
      getSrc(partnerTag){
        switch (partnerTag) {
          case '0e7d2babcf8747d4aa33e840dbae942b':return 'qianyou-jiekuan.png';break;
        }
      }
    },
    created (){
       const oosServer="https://axplus.oss-cn-hangzhou.aliyuncs.com/dist/img/";
       this.imgSrc=oosServer+this.getSrc(this.partnerTag);
    },
    destoryed () {
    }
  }
</script>

<style scoped>

</style>
