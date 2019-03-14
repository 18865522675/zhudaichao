<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>菜单配置</span>
            </div>
            <div class="cardBody flex-r">
                <div class="roleConfig-right"  style="width: 100%">
                    <el-button type="primary" size="mini" @click="append({},true)"    v-if="btnStr.indexOf('新增')>-1">新增一级菜单</el-button>
                    <el-tree
                            class="menuTree"
                            style="padding: 20px;margin-top: 20px"
                            :data="data4"
                            node-key="permissionId"
                            default-expand-all
                            children="permissionVOS"
                            :expand-on-click-node="false"
                            :render-content="renderContent">
                    </el-tree>

                </div>
            </div>

            <el-dialog
                    title="新增菜单"
                    :visible.sync="dialogVisible"
                    width="30%"
                    @close="handleClose">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="菜单名称：" prop="name">
                        <el-input v-model.trim="ruleForm.name" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单路径：" prop="url">
                        <el-input v-model.trim="ruleForm.url" placeholder="请输入菜单路径"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type" v-if="isTwo">
                        <el-select style="width: 100%" v-model="ruleForm.type" placeholder="请选择类型">
                            <el-option v-for="(item,index) in typeList" :key="index"  :label="item.name"  :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="顺序号：" prop="sort">-->
                        <!--<el-input v-model.trim="ruleForm.sort" type="number" min="0" placeholder="请输入顺序号"></el-input>-->
                    <!--</el-form-item>-->
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addMenu('ruleForm')">确 定</el-button>
              </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
  let id = 1000;
  import { mapState } from 'vuex'
  export default {
    name: "roleConfig",
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        data4: [],
        ruleForm:{
          type:0
        },
        dialogVisible:false,
        rules:{
          name:[{
            required:true,
            message:'请输入菜单名称',
            trigger:'blur'
          }],
          url:[{
            required:true,
            message:'请输入菜单路径',
            trigger:'blur'
          },],
          type:[{
            required:true,
            message:'请选择类型',
            trigger:'blur'
          },],
          // sort  :[{
          //   required:true,
          //   message:'请输入顺序号',
          //   trigger:'blur'
          // }]
        },
        parentId:null,
        actionType:true,
        parentId:null,
        isTwo:false,

        typeList:[{
          name:'普通',
          id:0
        },{
          name:'系统资源',
          id:1
        },{
          name:'付费资源',
          id:2
        }]
      };
    },
    mounted() {
     this.getMenuTree()
    },
    components:{
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    watch:{
    },
    methods: {
      handleClose(){
        this.isTwo=false;
        this.$nextTick(()=>{
          this.ruleForm={};
          this.ruleForm.type=0
        })
      },
      addMenu(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url=this.actionType?'addMenu':'editMenu';
            let params=this.actionType?{
                ...this.ruleForm,
                parentId:this.parentId
              }:this.ruleForm
            this.$api.system[url](params).then(()=>{
                if(this.actionType){
                  this.$message.success("新增成功!");
                }else{
                  this.$message.success("编辑成功!");
                }
                this.dialogVisible=false;
                this.getMenuTree()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      renderContent(h, { node, data, store }) {
        if(data.level!=3){
          return (
            <span class="custom-tree-node">
            <span>{node.data.name}</span>
          <span>
          <el-button size="mini" type="text"on-click={ () => this.append(data,true,data.level)} >新增</el-button>
          <el-button size="mini" type="text"on-click={ () => this.showEdit(node,data,data.level)} >编辑</el-button>
          <el-button size="mini" type="text" on-click={ () => this.delMenuTree(node, data) }>删除</el-button>
          </span>
          </span>
        );
        }else{
          return (
            <span class="custom-tree-node">
            <span>{node.data.name}</span>
          <span>
          <el-button size="mini" type="text"on-click={ () => this.showEdit(node,data,data.level)} >编辑</el-button>
          <el-button size="mini" type="text" on-click={ () => this.delMenuTree(node, data) }>删除</el-button>
          </span>
          </span>
        );
        }
      },
      append(data,actionType,level) {
        if(level==2){
          this.isTwo=true;
        }
        // const newChild = { id: id++, label: 'testtest', children: [] };
        // if (!data.children) {
        //       this.$set(data, 'children', []);
        // }
        // console.log(data.id)
        // data.children.push(newChild);
        this.parentId=data.permissionId;
        this.actionType=actionType;
        console.log(data)
        if(!this.actionType){
            this.ruleForm={
              permissionId:data.permissionId,
              name:data.name,
              url:data.url
            }
        }
        this.dialogVisible=true
      },
      showEdit(node,data,level){
        if(level==3){
          this.isTwo=true;
        }
        if(node.parent){
          this.parentId=node.parent.data.permissionId;
        }
        this.actionType=false;
        this.ruleForm={
          parentId:this.parentId,
          id:data.permissionId,
          name:data.name,
          url:data.url,
          type:data.type!=null?data.type:null
        }
        this.dialogVisible=true
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      getMenuTree(){
        this.$api.system.getMenuTree().then((res)=>{
            this.data4=res.data;
            this.data4.map((item)=>{
              // if(item.permissionVOS){
              //   item.chil
              // }
              item.children=item.permissionVOS;
              if(item.permissionVOS){
                item.permissionVOS.map((cItem)=>{
                  cItem.children=cItem.permissionVOS;
                })
              }
            })
        })
      },
      delMenuTree(node){
        // console.log(node)
        this.$toolkit.showConfrim('确定要删除此树节点吗?','删除').then(()=>{
          this.$api.system.delMenuTree(node.data.permissionId).then(()=>{
            this.$message.success("删除成功!");
            this.getMenuTree()
          })
        })
      }
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .menuTree{
        .custom-tree-node{
            /*height: 100px!important;*/
        }
    }
</style>
