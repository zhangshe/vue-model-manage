<template>
  <div>
    <div class="navbar">
      <div style="margin:10px;float:left;">
        <img style="height:80px;margin-left:5%;" src="@/assets/images/logo.png">
      </div>
      <h1 style="color:#fff;float:left;line-height: 55px;margin-left: 5%;">中汽数据模型管理系统</h1>
      <div class="verticalBar" />
      <h3 style="color:#CCC;float:left;line-height: 55px;">创建模型</h3>
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <h3 style="color:#FFF;cursor: pointer;">{{ name }}</h3>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">注销</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-form ref="modelManageForm" :model="modelForm" :rules="rules" label-width="120px" style="margin-top:3%;" class="demo-ruleForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="模型名称" prop="ModelName">
                <el-input v-model="modelForm.ModelName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="模型描述" prop="Introduction" type="textarea">
                <el-input v-model="modelForm.Introduction" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="模型类别" prop="ModelType">
                <el-radio-group v-model="modelForm.ModelType">
                  <el-radio :label="0">FMU</el-radio>
                  <el-radio :label="1">API</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col v-if="modelForm.ModelType==1" :span="10" style="text-align:right;">
              <el-form-item label="语言" style="text-align:right" prop="Language">
                <el-select v-model="modelForm.Language" placeholder="请选择语言" style="width:100%;">
                  <el-option label="Java" value="Java" />
                  <el-option label="Python" value="Python" />
                  <el-option label="Matlab" value="Matlab" />
                  <el-option label="C++" value="C++" />
                  <el-option label="C#" value="C#" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="应用场景" prop="Scene">
                <el-select v-model="modelForm.Scene" multiple placeholder="请选择应用场景" style="width:100%;">
                  <el-option label="市场研究" value="Java" />
                  <el-option label="绿色生态" value="Python" />
                  <el-option label="低碳节能" value="Matlab" />
                  <el-option label="智能网联" value="C++" />
                  <el-option label="智能座舱" value="C#" />
                  <el-option label="工业互联网" value="C#" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="上传部门" style="text-align:right" prop="OrgName">
                <el-select v-model="modelForm.OrgName" placeholder="上传部门" style="width:100%;">
                  <el-option label="前瞻技术研究室" value="前瞻技术研究室" />
                  <el-option label="数据技术应用室" value="数据技术应用室" />
                  <el-option label="软件研发室" value="软件研发室" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上传科室" style="text-align:right" prop="DeptName">
                <el-select v-model="modelForm.DeptName" placeholder="上传科室" style="width:100%;">
                  <el-option label="工业互联网标识组" value="工业互联网标识组" />
                  <el-option label="数据组" value="数据组" />
                  <el-option label="仿真技术组" value="仿真技术组" />
                  <el-option label="创新技术组" value="创新技术组" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="模型文件" prop="DeptName">
                <!-- :action="urlUpload"
                  :data="{modelData: JSON.stringify(modelForm) }" -->
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  action=""
                  :on-success="handleSuccess"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-error="handleError"
                  :file-list="fileList"
                  :auto-upload="false"
                >
                  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上传密钥" prop="upload_key">
                <el-input v-model="modelForm.UploadKey" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="输入数据样例" prop="InputData">
                <el-input v-model="modelForm.InputData" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="输出数据样例" prop="OutputData">
                <el-input v-model="modelForm.OutputData" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align:center;">
            <el-button v-if="this.$route.params.type=='create'" type="primary" @click="submitForm()">上传模型</el-button>
            <el-button v-else type="primary" @click="submitForm()">编辑模型</el-button>
            <el-button @click="resetForm('ruleForm')">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import {
  uploadModule
} from '@/api/fmu'
export default {
  name: 'Detail',
  data() {
    return {
      fileList: [],
      modelForm: {
        ModelID: '',
        ModelName: '',
        ModelType: 0,
        Language: '',
        Scene: '',
        Introduction: '',
        OrgID: '',
        OrgName: '',
        DeptID: '',
        DeptName: '',
        Uploader: '',
        InputData: '',
        OutputData: '',
        UpdateTime: '',
        DownloadNum: 0,
        ViewNum: 0,
        UploadKey: ''
      },
      rules: {
        ModelName: [
          { required: true, message: '请输入模型名称', trigger: 'blur' }
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ModelType: [
          { required: true, message: '请选择模型类别', trigger: 'change' }
        ]
      },
      // urlUpload: 'http://localhost:9528/dev-api/' + 'FMUModel/Post'
      urlUpload: process.env.VUE_APP_SERVICE_URL + 'FMUModel/Post'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  created() {
    // this.saveCreateTime = this.$route.params.date
    // if (this.$route.query.type === 'edit' || this.$route.query.type === 'check') {
    //   this.getDetialInfo()
    // }
    var rpc_address = 'http://127.0.0.1:9091/thrift'
    // eslint-disable-next-line no-undef
    var transport = new Thrift.TXHRTransport(rpc_address)
    // eslint-disable-next-line no-undef
    var protocol = new Thrift.TJSONProtocol(transport)
    // eslint-disable-next-line no-undef
    var client = new FmuServiceClient(protocol)

    var model_description = client.get_model_description('{0878329c-0786-4c87-912b-397eff2268a4}')
    console.log(model_description)
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    submitForm(param) {
      this.$refs['modelManageForm'].validate((valid) => {
        if (valid) {
          // alert(this.modelForm.Scene.length)
          // alert(this.modelForm.Scene[0])
          // alert(this.modelForm.Scene)
        //   uploadModule()
          if (this.modelForm.Scene.length === 1) {
            this.modelForm.Scene = this.modelForm.Scene[0]
          } else {
            this.modelForm.Scene = this.modelForm.Scene.join(',')
          }
          //   // console.log(this.modelForm)
          //   this.$refs.upload.submit()
          //   // alert('submit!')
          // } else {
          //   console.log('error submit!!')
          //   return false
          // }
          //    var fileObj = param.file;
          //         var form = new FormData();
          //   uploadModule(this.pageQuery).then(response => {
          //   if (response.RespCode === 1) {
          //     this.modelList = response.Data.Data
          //     this.pageQuery.total = response.Data.TotalCount
          //     loadingInstance.close()
          //   } else {
          //     loadingInstance.close()
          //     this.$notify({
          //       position: 'bottom-right',
          //       title: '失败',
          //       message: response.RespMsg,
          //       type: 'error',
          //       duration: 2000
          //     })
          //   }
          // })
          var fileValue = document.querySelector('.el-upload .el-upload__input')
          var fd = new window.FormData()
          // 配置post请求的参数。参数名file,后面跟要传的文件）
          fd.append('modelData', JSON.stringify(this.modelForm))
          fd.append('file', fileValue.files[0])
          // var xhr = new XMLHttpRequest()
          // xhr.open('POST', this.urlUpload, true)
          // // url就是要发送的post请求的地址
          // xhr.send(fd)
          // xhr.onload = () => {
          //   console.log(xhr)
          //   // if (xhr.status === 200) {
          //   //   this.imgurl = JSON.parse(xhr.responseText).url
          //   //   console.log(this.imgurl)
          //   // }
          // }
          uploadModule(fd).then(response => {
            if (response.RespCode === 1) {
              this.$notify({
                position: 'bottom-right',
                title: '提示',
                message: response.RespMsg,
                type: 'sucess',
                duration: 2000
              })
            } else {
              this.$notify({
                position: 'bottom-right',
                title: '失败',
                message: response.RespMsg,
                type: 'error',
                duration: 2000
              })
            }
          })
        }
        this.closetab()
      })
    },
    resetForm() {
      this.$refs['modelManageForm'].resetFields()
      this.closetab()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess(res, file) {
      this.$notify({
        position: 'bottom-right',
        title: '提示',
        message: '操作成功',
        type: 'success',
        duration: 2000
      })
    },
    handleError(err, file, fileList) {
      this.$notify({
        position: 'bottom-right',
        title: '提示',
        message: err + '上传失败!',
        type: 'error',
        duration: 2000
      })
    },
    // 关闭页面
    closetab() {
      // this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
      // this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background-color: #2F5597;
  .right-menu {
    float: right;
    height: 100%;
    line-height: 100px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        line-height: 60px;
        // margin-top: 5px;
        // position: relative;

        // .user-avatar {
        //   cursor: pointer;
        //   width: 40px;
        //   height: 40px;
        //   border-radius: 10px;
        // }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 40px;
          font-size: 12px;
          color:#FFF;
        }
      }
    }
  }
    .verticalBar {
        float: left;
        width: 2px;
        height: 29px;
        background: #fff;
       // display: inline-block;
        margin-top: 31px;
        vertical-align: top;
        margin-right: 29px;
        margin-left: 30px;
    }
}

</style>
