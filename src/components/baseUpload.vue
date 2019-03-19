    <template>
      <div class="upLoad">
        <div class="file">上传图片
          <input type="file" :accept="typeArr" @change="upload($event)">
        </div>
      </div>
    </template>
    <style lang="less" scoped>
      .file {
        position: relative;
        left: .26rem;
        top: .2rem;
        display: inline-block;
        background: #32d582;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: white;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
      }
    
      .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
      }
    </style>
    <script>
      export default{
        props: ['typeArr', 'size'],
        data(){
          return {
            client: '',
            fileSize: 5000000
          }
        },
        methods: {
          getRight(){
            if (this.size) {
              this.fileSize = this.size;
            }
            this.client = new OSS.Wrapper({
              region: "oss-cn-shanghai",
              secure: true,//https
              endpoint: 'http://oss-cn-shanghai.aliyuncs.com',
              accessKeyId: "LTAI1aqBIXNSxkkM",
              /*accessKeyId,accessKeySecret两者到阿里云控制台获得*/
              accessKeySecret: "Bg6YQOpE0mEUdLXl5yQKuoyfarTlqi",
              bucket: 'doudouqianqian' /*装图片的桶名*/
            });
          },
          /**上传图片**/
          upload(event){
            var self = this;
            var file = event.target.files[0];
    
            var type = file.name.split('.')[1];
            var storeAs = new Date().getTime() + '.' + type;
            var boolean = true;
            if (file.size > this.fileSize) {
              this.$message.warning('亲,图片不能超过!' + this.fileSize / 1000 + 'kb');
              return false;
            }
            if (this.typeArr && this.typeArr.indexOf(type) > 0) {
              boolean = false;
            }
            if (boolean) {
              this.$message.warning('上传图片格式不支持!请选择' + this.typeArr);
              return false;
            }
            this.getRight();
            console.log(file)
            
            this.client.multipartUpload(storeAs, file).then(function (result) {
              console.log(result)//至此就拿到了返回的路径
    
              self.data.url = result.res.requestUrls[0].split('?')[0];
    
            }).catch(function (err) {
    
              console.log(err);
            });
    
          },
        }
      }
</script>