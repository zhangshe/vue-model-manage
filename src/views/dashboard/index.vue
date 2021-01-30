<template>
  <div>
    <div class="navbar">
      <div style="margin:10px;float:left;">
        <img style="height:80px;margin-left:5%;" src="@/assets/images/logo.png">
      </div>
      <h1 style="color:#fff;float:left;line-height: 55px;margin-left: 5%;">中汽数据模型管理系统</h1>
      <div class="verticalBar" />
      <h3 style="color:#CCC;float:left;line-height: 55px;">技术目录</h3>
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
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
    <el-row style="margin-top:2%;">
      <el-col :span="10" :offset="2" style="text-align:left;font-size:20px;">
        <el-button
          ref="btnAddModel"
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-circle-plus"
          @click="addModel"
        >上传模型
        </el-button>
        <span style="margin-left:20%;">共有{{ pageQuery.total }} 项模型</span>
        <span style="margin: 7% ;cursor: pointer" @click="showLog">查看记录</span>
      </el-col>

      <el-col :span="10" style="text-align:right;">
        <el-input v-model="pageQuery.modelName" placeholder="请输入搜索模型名称" style="width:40%;" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchModel" />
        </el-input>
      </el-col>
    </el-row>
    <el-row
      v-for="(item, index) in modelList"
      v-show="modelList.length > 0"
      :key="'model'+index"
      style="cursor:pointer"
    >
      <el-col :span="20" :offset="2" style="border:1px solid #ccc;margin-top:1%;">
        <el-row :gutter="20" style="margin:1% 0;">
          <el-col :span="18">
            <div style="" @click="detailModel(item)">
              <label style="color:#4D6DA6;display: inline-block;margin: 10px 5px;font-size: 20px;cursor:pointer;">{{
                item.ModelName
              }}</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div style=" display: flex;align-items: center;justify-content: top;text-align: justify;">
              <el-button type="text" style="font-size: 16px;color:#878282;">&nbsp;&nbsp;<i class="el-icon-download" />&nbsp;&nbsp;{{
                item.DownloadNum
              }}次
              </el-button>
              <el-button type="text" style="font-size: 16px;color:#878282;margin-left:10%;">&nbsp;&nbsp;<svg-icon
                icon-class="eye-open"
              />&nbsp;&nbsp;{{ item.ViewNum }}次
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin:1.5% 0;font-size:20px;padding-left:1.5%">
          <el-col :span="24" style="color:#848080">
            <label>描述：</label><label>{{ item.Introduction }}</label>
          </el-col>
        </el-row>
        <el-row style="margin:1.5% 0;font-size:20px;padding-left:1.5%">
          <el-col :span="8">
            <label>格式：</label><label>{{ item.ModelType | parseType }}</label>
          </el-col>
          <el-col :span="8">
            <label>应用场景：</label><label>{{ item.Scene }}</label>
          </el-col>
          <el-col :span="8">
            <label>更新时间：</label><label>{{ item.UpdateTime | parseTime }}</label>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div v-show="modelList.length == 0" class="nullList">暂无数据</div>
    <el-pagination
      background
      :total="pageQuery.total"
      layout="prev, pager, next"
      :current-page="pageQuery.pageIndex"
      :page-size="pageQuery.pageSize"
      style="padding-top: 3%;text-align: center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import {
  getModelInfo,
  addViewNum
} from '@/api/fmu'

export default {
  name: 'Dashboard',
  filters: {
    parseTime(value) {
      var dateee = new Date(value).toJSON()
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    },
    parseType(value) {
      if (value === 0) { return '.FMU' } else return '.API'
    }
  },
  data() {
    return {
      searchContent: '',
      modelList: [], // 模型列表
      pageQuery: {
        modelName: '',
        pageIndex: 1,
        pageSize: 10,
        total: 0
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
    this.getList()
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    dateFormat: function(row) {
      var t = new Date(row.createTime)// row 表示一行数据, createTime 表示要格式化的字段名称
      if (!t) {
        return ''
      }
      const year = t.getFullYear()
      const month = this.dateIfAddZero(t.getMonth() + 1)
      const day = this.dateIfAddZero(t.getDate())
      const hours = this.dateIfAddZero(t.getHours())
      const minutes = this.dateIfAddZero(t.getMinutes())
      const seconds = this.dateIfAddZero(t.getSeconds())
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },
    dateIfAddZero: function(time) {
      return time < 10 ? '0' + time : time
    },
    searchModel() {
      this.pageQuery.pageIndex = 1
      this.getList()
    },
    getList() {
      const loadingInstance = Loading.service({ fullscreen: false })
      getModelInfo(this.pageQuery).then(response => {
        if (response.RespCode === 1) {
          this.modelList = response.Data.Data
          this.pageQuery.total = response.Data.TotalCount
          loadingInstance.close()
        } else {
          loadingInstance.close()
          this.$notify({
            position: 'bottom-right',
            title: '失败',
            message: response.RespMsg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleSizeChange(val) {
      this.pageQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageQuery.pageIndex = val
      this.getList()
    },
    detailModel(row) {
      addViewNum({ moduleId: row.ModelID }).then(response => {
        this.message = response.RespMsg
        this.title = '失败'
        this.type = 'error'
        if (response.RespCode === 1) {
          // console.log('index.vue', row)
          this.$router.push({
            path: 'Detail',
            query: { moduleId: row.ModelID }
          })
        }
      })
    },
    addModel() {
      this.$router.push({
        name: 'Manage',
        params: { type: 'create' }
      })
    },
    showLog() {
      this.$router.push({
        name: 'UseLog'

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.navbar {
  height: 100px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
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
          color: #FFF;
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

.nullList {
  text-align: center;
  margin-top: 5%;
}

</style>
