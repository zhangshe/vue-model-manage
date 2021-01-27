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
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" style="margin-top:3%;" class="demo-ruleForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="模型名称" prop="name">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="模型类别" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="FMU" />
                  <el-radio label="API" />
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10" style="text-align:right;">
              <el-form-item label="语言" style="text-align:right" prop="Language">
                <el-select v-model="ruleForm.Language" placeholder="请选择语言" style="width:100%;">
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
                <el-select v-model="ruleForm.Scene" multiple placeholder="请选择应用场景" style="width:100%;">
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
                <el-select v-model="ruleForm.OrgName" placeholder="上传部门" style="width:100%;">
                  <el-option label="前瞻技术研究室" value="1" />
                  <el-option label="数据技术应用室" value="2" />
                  <el-option label="软件研发室" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上传科室" style="text-align:right" prop="DeptName">
                <el-select v-model="ruleForm.DeptName" placeholder="上传科室" style="width:100%;">
                  <el-option label="工业互联网标识组" value="1" />
                  <el-option label="数据组" value="2" />
                  <el-option label="仿真技术组" value="3" />
                  <el-option label="创新技术组" value="4" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="模型文件" prop="DeptName">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false"
                >
                  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="输入数据样例" prop="desc">
                <el-input v-model="ruleForm.InputData" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="输出数据样例" prop="desc">
                <el-input v-model="ruleForm.OutputData" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align:center;">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Detail',
  data() {
    return {
      fileList: [],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入模型名称', trigger: 'blur' }
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择模型类别', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写数据样例', trigger: 'blur' }
        ]
      }
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
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
        this.closetab()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.closetab()
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 关闭页面
    closetab() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
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
