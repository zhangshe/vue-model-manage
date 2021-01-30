<template>
  <div>
    <div class="navbar">
      <div style="margin:10px;float:left;">
        <img style="height:80px;margin-left:5%;" src="@/assets/images/logo.png">
      </div>
      <h1 style="color:#fff;float:left;line-height: 55px;margin-left: 5%;">中汽数据模型管理系统</h1>
      <div class="verticalBar"/>
      <h3 style="color:#CCC;float:left;line-height: 55px;">技术目录</h3>
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <h3 style="color:#FFF;cursor: pointer;">{{ name }}</h3>
            <i class="el-icon-caret-bottom"/>
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
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="ID"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ModelGUID"
        label="模型GUID"
        >
      </el-table-column>
      <el-table-column
        prop="InvokeIP"
        label="调用者IP"
        width="180">
      </el-table-column>
      <el-table-column
        prop="InvokeTime"
        label="调用时间"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.InvokeTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="Invoker"
        label="调用者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="OrgID"
        label="机构"
        width="180">
      </el-table-column>
      <el-table-column
        prop="DeptID"
        label="科室"
        width="180">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { GetInvokeLog } from '@/api/fmu'

export default {
  name: 'UserLog',
  filters:{
    parseTime(value){
      var dateee = new Date(value).toJSON()
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    GetInvokeLog({
      pageindex: 1,
      pagesize: 500
    }).then(response => {
      if (response.RespCode === 1) {
        this.tableData = response.Data.Data
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
