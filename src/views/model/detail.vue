<template>
  <div>
    <div class="navbar">
      <div style="margin:10px;float:left;">
        <img style="height:80px;margin-left:5%;" src="@/assets/images/logo.png">
      </div>
      <h1 style="color:#fff;float:left;line-height: 55px;margin-left: 5%;">中汽数据模型管理系统</h1>
      <div class="verticalBar" />
      <h3 style="color:#CCC;float:left;line-height: 55px;">模型详情</h3>
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
    <div>
      <el-row>
        <el-col :span="20" :offset="2" style="margin-top:1%;margin-bottom:2%;">
          <label style="font-size:26px;color:#3A5E9D;margin-top:1%;">{{ modelForm.ModelName }}</label>
          <el-row style="margin-top:1%;">
            <el-col :span="8">
              <img style="float:left;" src="@/assets/images/clock.png">
              <div
                style="
                display: flex;
                align-items: center;
                text-align: justify;
                width: 80%;
                float: left;
                height: 64px;
                font-size:20px;"
              >
                <span style="margin-left:5px;">最新更新时间：</span>
                <span> {{ modelForm.UpdateTime }} </span>
              </div>
            </el-col>
            <el-col :span="8">
              <img style="float:left;" src="@/assets/images/visit.png">
              <div
                style="
                display: flex;
                align-items: center;
                text-align: justify;
                width: 80%;
                float: left;
                height: 64px;
                font-size:20px;"
              >
                <span style="margin-left:5px;">访问量：</span>
                <span> {{ modelForm.ViewNum }} 次 </span>
              </div>
            </el-col>
            <el-col :span="8">
              <img style="float:left;" src="@/assets/images/download.png">
              <div
                style="
                display: flex;
                align-items: center;
                text-align: justify;
                width: 80%;
                float: left;
                height: 64px;
                font-size:20px;"
              >
                <span style="margin-left:5px;">调用量：</span>
                <span> {{ modelForm.DownloadNum }} 次 </span>
              </div>
            </el-col>
          </el-row>
          <hr>
          <el-row>
            <div style="margin:1% 0px;"><label style="font-size:24px;">基本信息</label></div>
            <div style="margin:1% 0px;"><label style="font-size:24px;">模型简介：{{ modelForm.Introduction }}</label></div>
            <div style="margin:1% 0px;"><label style="font-size:24px;">模型类型：{{ modelForm.ModelType }}</label></div>
            <div style="margin:1% 0px;"><label style="font-size:24px;">应用场景：{{ modelForm.Scene }}</label></div>
          </el-row>
          <hr>
          <el-row>
            <div style="margin:1% 0px;"><label style="font-size:24px;">模型详细信息</label></div>
            <div style="margin:1% 0px;"><label style="font-size:24px;">输入数据样例：{{ modelForm.InputData }}</label></div>
            <div style="margin:1% 0px;"><label style="font-size:24px;">输出数据样例：{{ modelForm.OutputData }}</label></div>
          </el-row>
          <el-row>
            <el-button style="width:200px;" type="warning" @click="InvokeClick()">模型调用</el-button>
          </el-row>
          <el-col :span="24" style="text-align:center;">
            <el-button @click="resetForm()">返回</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  addInvokeNum
} from '@/api/fmu'
export default {
  name: 'Detail',
  data() {
    return {
      modelForm: {
        DeptID: null,
        DeptName: null,
        DownloadNum: 0,
        GUID: null,
        InputData: null,
        Introduction: '',
        Language: null,
        ModelFileUrl: null,
        ModelID: '',
        ModelName: '',
        ModelType: 1,
        OrgID: null,
        OrgName: null,
        OutputData: null,
        Scene: '',
        StartScript: null,
        UpdateTime: null,
        Uploader: null,
        ViewNum: 0
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
    this.modelForm = this.$route.params.data
    this.modelForm.ViewNum = parseInt(this.modelForm.ViewNum) + 1
    // console.log(this.modelForm)
    // if (this.$route.query.type === 'edit' || this.$route.query.type === 'check') {
    //   this.getDetialInfo()
    // }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    resetForm() {
      this.closetab()
    },
    // 关闭页面
    closetab() {
      // this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    },
    InvokeClick() {
      addInvokeNum({ moduleId: this.modelForm.ModelID }).then(response => {
        this.message = response.RespMsg
        this.title = '失败'
        this.type = 'error'
        if (response.RespCode === 1) {
          this.modelForm.DownloadNum = parseInt(this.modelForm.DownloadNum) + 1
          this.modelForm.ViewNum = parseInt(this.modelForm.ViewNum) + 1
          // this.$forceUpdate()
          alert('调用成功！')
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
