<template>
  <div>
    <div class="navbar">
      <!-- <div style="margin:10px;float:left;">
        <div style="height:80px;width:100%;margin-left:5%;background-color:#FFF">
          <img style="height:80px;" src="@/assets/images/logo.png">
        </div>
      </div> -->
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
                <el-select v-model="modelForm.SceneValue" multiple placeholder="请选择应用场景" style="width:100%;">
                  <el-option label="市场研究" value="市场研究" />
                  <el-option label="绿色生态" value="绿色生态" />
                  <el-option label="低碳节能" value="低碳节能" />
                  <el-option label="智能网联" value="智能网联" />
                  <el-option label="智能座舱" value="智能座舱" />
                  <el-option label="工业互联网" value="工业互联网" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="上传部门" style="text-align:right" prop="OrgName">
                <el-select v-model="modelForm.OrgName" filterable clearable placeholder="上传部门" style="width:100%;" @change="selectChange">
                  <!-- <el-option label="前瞻技术研究室" value="前瞻技术研究室" />
                  <el-option label="数据技术应用室" value="数据技术应用室" />
                  <el-option label="软件研发室" value="软件研发室" /> -->
                  <el-option
                    v-for="(item,index) in OrgList[0].children"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上传科室" style="text-align:right" prop="DeptName">
                <el-select v-model="modelForm.DeptName" filterable clearable placeholder="上传科室" style="width:100%;">
                  <!-- <el-option label="工业互联网标识组" value="工业互联网标识组" />
                  <el-option label="数据组" value="数据组" />
                  <el-option label="仿真技术组" value="仿真技术组" />
                  <el-option label="创新技术组" value="创新技术组" /> -->
                  <el-option
                    v-for="(dept,index) in DeptList"
                    :key="index"
                    :label="dept.name"
                    :value="dept.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="modelForm.ModelType===0">
            <el-col :span="12">
              <el-form-item label="模型文件">
                <!-- :action="urlUpload"
                  :data="{modelData: JSON.stringify(modelForm) }"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  -->
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  action=""
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :file-list="fileList"
                  :auto-upload="false"
                  accept=".fmu"
                >
                  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col v-if="false" :span="12">
              <el-form-item label="上传密钥" prop="UploadKey">
                <el-input v-model="modelForm.UploadKey" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="modelForm.ModelType===1">
            <el-col :span="12">
              <el-form-item label="API模型文件">
                <el-upload
                  ref="uploadAPI"
                  class="upload-demo"
                  :action="apiUpload"
                  :on-success="handleSuccessAPI"
                  :on-error="handleErrorAPI"
                  :on-remove="handleRemoveAPI"
                  :file-list="fileListAPI"
                  accept=".zip"
                >
                  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col v-if="false" :span="12">
              <el-form-item label="上传密钥" prop="UploadKey">
                <el-input v-model="modelForm.UploadKey" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="modelForm.ModelType==1">
            <el-col :span="24">
              <el-form-item label="输入数据样例" prop="InputData">
                <el-input v-model="modelForm.InputData" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="modelForm.ModelType==1">
            <el-col :span="24">
              <el-form-item label="输出数据样例" prop="OutputData">
                <el-input v-model="modelForm.OutputData" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align:center;">
            <el-button v-if="modelForm.ModelType===0" type="primary" @click="submitFmu()">上传模型</el-button>
            <el-button v-if="modelForm.ModelType===1" type="primary" @click="submitAPI()">上传模型</el-button>
            <el-button @click="resetForm('ruleForm')">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import {
  uploadModule,
  delApiFile,
  addAPIModule
} from '@/api/fmu'
export default {
  name: 'Detail',
  data() {
    return {
      modelData: {},
      fileList: [],
      fileListAPI: [],
      OrgList: [
        {
          id: '23CB934D-02F7-4177-BD38-C8624FA86F7E',
          name: '中汽数据有限公司',
          code: '100',
          level: 1,
          children: [
            {
              id: 'C765DEDC-3FD7-4B71-9D8F-D2CA8F22DEEB',
              name: '综合管理部（党群工作部、纪检室）',
              code: '100001',
              level: 2,
              children: [
                {
                  id: '87E24FE3-7A20-4511-899A-4DACB6EA926F',
                  name: '市场发展室',
                  code: '100001001',
                  level: 3,
                  children: null
                },
                {
                  id: 'E5B192A1-DFAF-4059-B02F-871F821EB848',
                  name: '财务室',
                  code: '100001002',
                  level: 3,
                  children: null
                },
                {
                  id: '0F57B657-FB9E-468F-BD78-2D2921D04111',
                  name: '办公室',
                  code: '100001003',
                  level: 3,
                  children: null
                },
                {
                  id: '992A65FC-E6BE-4159-92D2-F20D8D1A762D',
                  name: '发展运营室',
                  code: '100001004',
                  level: 3,
                  children: null
                }
              ]
            },
            {
              id: '710018C0-59E2-4EDF-8315-C2164737BEEC',
              name: '数据业务部',
              code: '100002',
              level: 2,
              children: [
                {
                  id: '8A9EB7A9-E63A-4792-BE5F-0BD3E8196A37',
                  name: '市场数据室',
                  code: '100002001',
                  level: 3,
                  children: null
                },
                {
                  id: '9D9EB9A8-A449-4C41-8DBB-83EA1CB67390',
                  name: '后市场数据室',
                  code: '100002002',
                  level: 3,
                  children: null
                },
                {
                  id: '1B57BD3D-94D0-4F8C-B4B0-9CB3029FD7A1',
                  name: '产品数据室',
                  code: '100002003',
                  level: 3,
                  children: null
                }
              ]
            },
            {
              id: 'F5159C06-0F83-4C11-B4BC-A06A0F00C3BF',
              name: '生态业务部',
              code: '100003',
              level: 2,
              children: [

                {
                  id: 'FFE86A05-DC36-4964-91C0-C45A36B2F6A5',
                  name: '绿色低碳研究室',
                  code: '100003001',
                  level: 3,
                  children: null
                },
                {
                  id: '9DDAB284-DFD6-49FB-90AD-E13619B60071',
                  name: '汽车材料研究室',
                  code: '100003002',
                  level: 3,
                  children: null
                },
                {
                  id: '39EA3C61-80BB-4A5E-ABFA-2AED5C371396',
                  name: '回收利用研究室',
                  code: '100003003',
                  level: 3,
                  children: null
                }
              ]
            },
            {
              id: '36EB6B6B-7C48-409D-AD13-6A0A3F26433B',
              name: '软件业务部',
              code: '100004',
              level: 2,
              children: [
                {
                  id: '9CED4BA7-D0C2-4F90-AD04-57620688A2D4',
                  name: '研发信息系统室',
                  code: '100004001',
                  level: 3,
                  children: null
                },
                {
                  id: '3E1ABE30-B572-4D5E-AA37-DEDC0EB68589',
                  name: '制造信息系统室',
                  code: '100004002',
                  level: 3,
                  children: null
                }
              ]
            },
            {
              id: '016BA428-E10E-46C2-9455-71FAE8D95722',
              name: '智能网联部',
              code: '100005',
              level: 2,
              children: [
                {
                  id: '8B455BFD-4556-4923-93D6-EE8BEDDB3097',
                  name: '智能网联数据室',
                  code: '100005001',
                  level: 3,
                  children: null
                },
                {
                  id: 'E848A0AF-A668-454C-BD05-A807D243BAA7',
                  name: '智能网联应用室',
                  code: '100005002',
                  level: 3,
                  children: null
                },
                {
                  id: 'A8D37AA4-0AE8-47E7-AAD4-D51275FC8FF8',
                  name: '网联技术研究室',
                  code: '100005003',
                  level: 3,
                  children: null
                }
              ]
            },
            {
              id: '8C25C3EE-D722-41AC-BACD-CC424D807748',
              name: '低碳业务部',
              code: '100006',
              level: 2,
              children: [
                {
                  id: 'C872DFC4-1D81-46C2-A2DA-87268029BDB7',
                  name: '节能战略研究室',
                  code: '100006001',
                  level: 3,
                  children: null
                },
                {
                  id: '474E7DD7-E8BA-4836-84E9-28BA10924698',
                  name: '清洁能源研究室',
                  code: '100006002',
                  level: 3,
                  children: null
                }
              ]
            },
            {
              id: 'E584A6B7-DC64-4DD2-A8BF-3CAE4EDEB7F1',
              name: '基础研究部',
              code: '100007',
              level: 2,
              children: [
                {
                  id: '7ADFDAA1-F75C-4E6F-AFDB-E406ED37BC00',
                  name: '软件研发室',
                  code: '100007001',
                  level: 3,
                  children: null
                },
                {
                  id: 'F3E7FAA7-BE95-42E0-9EBF-D2FC4B493E9A',
                  name: '数据技术应用室',
                  code: '100007002',
                  level: 3,
                  children: null
                },
                {
                  id: '087483AE-DF14-4B33-8C98-2ED36BDD8F9F',
                  name: '前瞻技术研究室',
                  code: '100007003',
                  level: 3,
                  children: null
                }
              ]
            },
            {
              id: '4F4EAD8C-A730-4D9F-ABC6-C44F70894050',
              name: '新能源业务部',
              code: '100008',
              level: 2,
              children: [
                {
                  id: '87E2A548-E5A3-41E7-83F2-060AFF931758',
                  name: '氢能源研究室',
                  code: '100008001',
                  level: 3,
                  children: null
                },
                {
                  id: '38818D66-8990-4DAD-9E00-05EC3F6B2FAA',
                  name: '新能源数据室',
                  code: '100008002',
                  level: 3,
                  children: null
                }
              ]
            },
            {
              id: '108F1B23-6D5D-4B5F-A3A4-536360A78C99',
              name: '中汽研智能网联技术（天津）有限公司',
              code: '100009',
              level: 2,
              children: [
                {
                  id: '3B570BD2-C43C-4EDC-8DD2-4C2E257B0BF9',
                  name: '技术发展室',
                  code: '100009001',
                  level: 3,
                  children: null
                },
                {
                  id: 'E0AE34EA-F897-4143-8776-9F7966F5A9E5',
                  name: '业务发展室',
                  code: '100009002',
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        }
      ],
      DeptList: [],
      modelForm: {
        ModelID: '',
        ModelName: '',
        ModelType: 0,
        Language: '',
        Scene: '',
        SceneValue: [],
        Introduction: '',
        ModelFileUrl: '',
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
        UploadKey: process.env.VUE_APP_UploadKey,
        FileName: '',
        ApiDescribe: null
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
      urlUpload: process.env.VUE_APP_SERVICE_URL + 'FMUModel/Post',
      apiUpload: process.env.VUE_APP_SERVICE_URL + 'FMUModel/UploadApiFile'
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
    // var rpc_address = 'http://127.0.0.1:9091/thrift'
    // // eslint-disable-next-line no-undef
    // var transport = new Thrift.TXHRTransport(rpc_address)
    // // eslint-disable-next-line no-undef
    // var protocol = new Thrift.TJSONProtocol(transport)
    // // eslint-disable-next-line no-undef
    // var client = new FmuServiceClient(protocol)

    // var model_description = client.get_model_description('{0878329c-0786-4c87-912b-397eff2268a4}')
    // console.log(model_description)
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    selectChange(val) {
      this.OrgList[0].children.forEach(element => {
        if (element.name === val) {
          this.modelForm.DeptName = ''
          this.DeptList = element.children
        }
      })
      // console.log(this.OrgList.filter(p => p.name === val))
      // console.log(item)
      // this.DeptList = this.OrgList.find((item) => {

      //   // 筛选出匹配数据
      //   return item.name === val
      // })
      // console.log(this.DeptList)
    },
    // Fmu模型保存
    submitFmu() {
      this.$refs['modelManageForm'].validate((valid) => {
        if (valid) {
          const loadingInstance = Loading.service({ fullscreen: false })
          if (this.modelForm.SceneValue.length === 1) {
            this.modelForm.Scene = this.modelForm.SceneValue[0]
          } else if (this.modelForm.SceneValue.length > 1) {
            this.modelForm.Scene = this.modelForm.SceneValue.join(',')
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
                type: 'success',
                duration: 2000
              })
              loadingInstance.close()
              this.closetab()
            } else {
              this.$notify({
                position: 'bottom-right',
                title: '失败',
                message: response.RespMsg,
                type: 'error',
                duration: 5000
              })
              loadingInstance.close()
              // this.modelForm.Scene = this.modelForm.Scene.split(',')
              // this.closetab()
            }
          })
        }
      })
    },
    resetForm() {
      this.$refs['modelManageForm'].resetFields()
      this.closetab()
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePreview(file) {
    //   console.log(file)
    // },
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
      // this.$router.go(-1)
      this.$router.push({ name: 'Dashboard' })
    },
    handleSuccessAPI(res, file) {
      this.modelForm.FileName = file.name
      if (file.response.RespCode !== 1) {
        this.$notify({
          position: 'bottom-right',
          title: '提示',
          message: file.response.RespMsg,
          type: 'error',
          duration: 5000
        })
        this.fileListAPI = []
      } else {
        this.modelForm.ModelFileUrl = file.response.Data.url
        this.modelForm.InputData = JSON.stringify(JSON.parse(file.response.Data.content).InPut)
        this.modelForm.OutputData = JSON.stringify(JSON.parse(file.response.Data.content).OutPut)
        this.modelForm.ApiDescribe = JSON.stringify(JSON.parse(file.response.Data.content))
      }
    },
    handleErrorAPI(err, file, fileList) {
      this.$notify({
        position: 'bottom-right',
        title: '提示',
        message: err + '上传失败!',
        type: 'error',
        duration: 2000
      })
    },
    handleRemoveAPI(file, fileList) {
      console.log('del', file)
      delApiFile({ filePath: file.response.Data.url }).then(response => {
      })
    },
    // API模型保存
    submitAPI() {
      this.$refs['modelManageForm'].validate((valid) => {
        if (valid) {
          const loadingInstance = Loading.service({ fullscreen: false })
          if (this.modelForm.SceneValue.length === 1) {
            this.modelForm.Scene = this.modelForm.SceneValue[0]
          } else if (this.modelForm.SceneValue.length > 1) {
            this.modelForm.Scene = this.modelForm.SceneValue.join(',')
          }
          addAPIModule(this.modelForm).then(response => {
            if (response.RespCode === 1) {
              this.$notify({
                position: 'bottom-right',
                title: '提示',
                message: response.RespMsg,
                type: 'success',
                duration: 2000
              })
              loadingInstance.close()
              this.closetab()
            } else {
              this.$notify({
                position: 'bottom-right',
                title: '失败',
                message: response.RespMsg,
                type: 'error',
                duration: 5000
              })
              loadingInstance.close()
              // this.modelForm.Scene = this.modelForm.Scene.split(',')
              // this.closetab()
            }
          })
        }
      })
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
