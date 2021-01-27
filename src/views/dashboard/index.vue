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
        >上传模型</el-button>
        <span style="margin-left:20%;">共有{{ pageQuery.total }} 项模型</span>
      </el-col>
      <el-col :span="10" style="text-align:right;">
        <el-input v-model="searchContent" placeholder="请输入搜索模型名称" style="width:40%;" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchModel" />
        </el-input>
      </el-col>
    </el-row>
    <el-row v-for="(item, index) in modelList" v-show="modelList.length > 0" :key="'model'+index">
      <el-col :span="20" :offset="2" style="border:1px solid #ccc;margin-top:1%;">
        <el-row :gutter="20" style="margin:1% 0;">
          <el-col :span="18">
            <div>
              <label style="color:#4D6DA6;display: inline-block;margin: 10px 5px;font-size: 20px;">{{ item.ModelName }}</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div style=" display: flex;align-items: center;justify-content: top;text-align: justify;">
              <el-button type="text" style="font-size: 16px;color:#878282;">&nbsp;&nbsp;<i class="el-icon-download" />&nbsp;&nbsp;{{ item.DownloadNum }}次</el-button>
              <el-button type="text" style="font-size: 16px;color:#878282;margin-left:10%;" @click="detailModel(item)">&nbsp;&nbsp;<svg-icon icon-class="eye-open" />&nbsp;&nbsp;{{ item.ViewNum }}次</el-button>
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
            <label>格式：</label><label>{{ item.ModelType }}</label>
          </el-col>
          <el-col :span="8">
            <label>应用场景：</label><label>{{ item.Scene }}</label>
          </el-col>
          <el-col :span="8">
            <label>更新时间：</label><label>{{ item.UpdateTime }}</label>
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

export default {
  name: 'Dashboard',
  data() {
    return {
      searchContent: '',
      modelList: [], // 模型列表
      pageQuery: {
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
    searchModel() {
    },
    getList() {
      this.modelList = [{
        'ModelID': '1111',
        'ModelName': '测试模型111',
        'ModelType': 'FMU',
        'Scene': '市场研究',
        'Introduction': 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
        'UpdateTime': '2021-01-26 10:45',
        'DownloadNum': 23,
        'ViewNum': 111
      }, {
        'ModelID': '1111',
        'ModelName': '测试模型111',
        'ModelType': 'FMU',
        'Scene': '市场研究',
        'Introduction': 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
        'UpdateTime': '2021-01-26 10:45',
        'DownloadNum': 23,
        'ViewNum': 111
      }, {
        'ModelID': '1111',
        'ModelName': '测试模型111',
        'ModelType': 'FMU',
        'Scene': '市场研究',
        'Introduction': 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
        'UpdateTime': '2021-01-26 10:45',
        'DownloadNum': 23,
        'ViewNum': 111
      }, {
        'ModelID': '1111',
        'ModelName': '测试模型111',
        'ModelType': 'FMU',
        'Scene': '市场研究',
        'Introduction': 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
        'UpdateTime': '2021-01-26 10:45',
        'DownloadNum': 23,
        'ViewNum': 111
      }, {
        'ModelID': '1111',
        'ModelName': '测试模型111',
        'ModelType': 'FMU',
        'Scene': '市场研究',
        'Introduction': 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
        'UpdateTime': '2021-01-26 10:45',
        'DownloadNum': 23,
        'ViewNum': 111
      }, {
        'ModelID': '1111',
        'ModelName': '测试模型111',
        'ModelType': 'FMU',
        'Scene': '市场研究',
        'Introduction': 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
        'UpdateTime': '2021-01-26 10:45',
        'DownloadNum': 23,
        'ViewNum': 111
      }, {
        'ModelID': '1111',
        'ModelName': '测试模型111',
        'ModelType': 'FMU',
        'Scene': '市场研究',
        'Introduction': 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
        'UpdateTime': '2021-01-26 10:45',
        'DownloadNum': 23,
        'ViewNum': 111
      }]
      this.pageQuery.total = 11
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
      this.$router.push({
        path: 'Detail',
        query: { type: 'detail' },
        params: { data: row }
      })
    },
    addModel() {
      this.$router.push({
        path: 'Manage'
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
.nullList {
  text-align: center;
  margin-top: 5%;
}

</style>
