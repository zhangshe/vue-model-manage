<template>
  <div class="main-container-new">
    <div class="calalogList_content">
      <div class="select_params_div">

        <div class="search_num">
          <div>
            <el-button
              ref="btnAddModel"
              type="primary"
              icon="el-icon-circle-plus"
              size="small"
              @click="addModel"
            >上传模型
            </el-button>
          </div>
          <span>共有<span class="num">{{ listLength }}</span>项数据</span>
          <div>
            <el-input v-model="form.dataName" size="small" class="keySearch" />
            <el-button type="primary" icon="el-icon-search" size="small" class="keySearchBtn" @click="getList" />
          </div>

        </div>
        <div class="condition">
          <div class="condition_item">
            <div class="title">部门筛选：</div>
            <div class="condition_item_list">
              <span :class="{active: departmentAllSelect}" @click="selectAllOrg()">全部</span>
              <span v-for="item in topicList" :key="item.name" :class="classObject(item.name)" @click="selectTopic(item)">{{ item.name }}</span>
            </div>
          </div>
          <div class="condition_item">
            <div class="title">科室筛选：</div>
            <div class="condition_item_list">
              <span :class="{active: keshiAllSelect}" @click="selectAllKeshi()">全部</span>
              <span v-for="item in keshiList" :key="item.name" :class="classObject1(item.name)" @click="selectKeshi(item)">{{ item.name }}</span>
            </div>
          </div>
          <div class="condition_item">
            <div class="title">场景筛选：</div>
            <div class="condition_item_list">
              <span :class="{active: sceneAllSelect}" @click="selectAllScene()">全部</span>
              <span v-for="item in sceneList" :key="item.dicItemName" :class="classObject2(item.dicItemName)" @click="selectScene(item)">{{ item.dicItemName }}</span>
            </div>
          </div>
        </div>
        <div class="condition_selected">
          <div class="condition_item">
            <div class="title">已选条件：</div>
            <div class="condition_item_list">
              <span v-for="(item, index) in selectCondition" :key="index">{{ item }}
                <img src="@/assets/dataCatalog/叉叉@2x.png" alt="" @click="calcelCondition(item)">
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="calalogList">

        <div v-for="(item, index) in dataList" :key="index" class="calalogList_item" @click="detailModel(item)">
          <div class="item_top">
            <div class="article_title">
              <div class="title">{{ item.ModelName }}
              </div>
              <div style="width: 50px">
                <img src="@/assets/dataCatalog/眼睛@2x.png" alt="">
                <span>{{ item.ViewNum }}次</span>
              </div>
            </div>
            <div class="article_content">
              {{ item.Introduction }}
            </div>
          </div>
          <div class="item_bottom">
            <div style="width: 150px">
              <span>科室名称：</span>
              <span>{{ item.OrgName }}</span>
            </div>
            <div style="width: 200px">
              <span>应用场景：</span>
              <span>{{ item.Scene }}</span>
            </div>
            <div>
              <span>最新更新时间：</span>
              <span>{{ item.UpdateTime| parseTime }}</span>
            </div>
          </div>
        </div>

        <pagination v-show="total>0" :total="total" :page.sync="form.page" :limit.sync="form.pageSize" @pagination="getList()" />
      </div>

    </div>
  </div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
import {
  getModelInfo,
  addViewNum, getModelInfoByCondition
} from '@/api/fmu'
export default {
  name: '',
  components: {
    Pagination
  },
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
  props: {},
  data() {
    return {
      topicList: [{ 'name': '数据业务部' }, { 'name': '低碳业务部' }, { 'name': '生态业务部' }, { 'name': '新能源业务部' }, { 'name': '软件业务部' }, { 'name': '基础研究部' }, { 'name': '智能网联部' }, { 'name': '中汽智联' }],
      sceneList: [{ 'dicItemName': '绿色生态' }, { 'dicItemName': '智能网联' }, { 'dicItemName': '智能座舱' }, { 'dicItemName': '市场研究' }, { 'dicItemName': '工业软件' }, { 'dicItemName': '低碳节能' }],
      keshiList: [{ 'name': '绿色低碳研究室' }, { 'name': '节能战略研究室' }],
      form: {
        page: 1,
        pageSize: 10,
        departmentList: [],
        constructionMainList: [],
        dataSceneList: [],
        dataSceneOperator: 'like',
        dataName: '',
        dataNameOperator: 'like',
        constructionMainOperator: 'like',
        state: 1
      },
      dataList: [],
      listLength: 0,
      selectCondition: [],

      allkeshiList: [],
      departmentAllSelect: false,
      keshiAllSelect: false,
      sceneAllSelect: false,
      total: 0
    }
  },
  computed: {
    condition() {
      return this.$store.state.condition
    },
    flag() {
      return this.$store.state.flag
    }
  },
  watch: {},
  created() {

  },
  mounted() {
    // this.getTopic();
    // this.getScene();
    if (this.$route.query.name) {
      this.form.departmentList.push(this.$route.query.name)
      this.selectCondition.push(this.$route.query.name)
      // this.keshiList = JSON.parse(this.$route.query.children || '[]');
    }
    if (this.$route.query.name1) {
      this.form.dataSceneList.push(this.$route.query.name1)
      this.selectCondition.push(this.$route.query.name1)
      // this.keshiList = this.allkeshiList;
    }
    // this.form.dataSceneList.push(this.$route.query.name);
    // this.keshiList = JSON.parse(this.$route.query.children || '[]');
    this.getList()
  },
  methods: {
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
    getList() {
      const param = JSON.parse(JSON.stringify(this.form))
      param.departmentList = param.departmentList.join(',')
      param.dataSceneList = param.dataSceneList.join(',')
      param.constructionMainList = param.constructionMainList.join(',')
      if (!param.departmentList || param.departmentList.length === 0) {
        delete param.departmentList
      }
      if (!param.dataSceneList || param.dataSceneList.length === 0) {
        delete param.dataSceneList
        delete param.dataSceneOperator
      }
      if (!param.constructionMainList || param.constructionMainList.length === 0) {
        delete param.constructionMainList
        delete param.constructionMainOperator
      }
      if (!param.dataName) {
        delete param.dataName
        delete param.dataNameOperator
      }

      // getList(param).then((res) => {
      //     this.dataList = res.data.list;
      //     this.listLength = res.data.count;
      //     this.total = res.data.count;
      // })
      getModelInfo(param).then((res) => {
        this.dataList = res.Data.Data
        this.listLength = res.Data.TotalCount
        this.total = res.Data.TotalCount
      })
      // 根据条件获取模型列表
      getModelInfoByCondition(param).then((res) => {

      })
    },
    goDetail(id) {
      // this.$store.commit("SET_CONDITION", Object.assign(this.form, {keshiList: this.keshiList, condition: this.selectCondition}));
      // this.$router.push({path: "/catalogDetail", query: {id: id}})
    },
    // getTopic() {
    //     let that = this;
    //     getOrgTree().then((res) => {
    //         if (res.data[0] && res.data[0].children && res.data[0].children.length > 0) {
    //             that.topicList = res.data[0].children;
    //             for (let i = 0; i < res.data[0].children.length; i++) {
    //                 for (let j = 0; j < res.data[0].children[i].children.length; j++) {
    //                     that.allkeshiList.push(res.data[0].children[i].children[j]);
    //                 }
    //             }
    //             // that.allkeshiList = that.keshiList
    //         }
    //     })
    // },
    // getScene() {
    //     getDicType({dicId: 6}).then((res) => {
    //         this.sceneList = res.data;
    //     })
    // },
    classObject(id) {
      const that = this
      return {
        active: that.form.departmentList.indexOf(id) !== -1
      }
    },
    classObject1(id) {
      const that = this
      return {
        active: that.form.constructionMainList.indexOf(id + '') !== -1
      }
    },
    classObject2(id) {
      const that = this
      return {
        active: that.form.dataSceneList.indexOf(id) !== -1
      }
    },
    selectTopic(obj) {
      const that = this
      for (let i = 0; i < that.topicList.length; i++) {
        for (let j = 0; j < that.selectCondition.length; j++) {
          if (that.topicList[i].name === that.selectCondition[j]) {
            that.selectCondition.splice(j, 1)
          }
        }
      }
      that.departmentAllSelect = false
      that.selectCondition = that.selectCondition.filter((item) => {
        return item !== '全部部门'
      })
      const index = that.form.departmentList.indexOf(obj.name)
      if (index !== -1) {
        that.form.departmentList = []
        that.selectCondition = that.selectCondition.filter((item) => {
          return item !== obj.name
        })
        if (obj.children && obj.children.length > 0) {
          for (let i = 0; i < obj.children.length; i++) {
            if (that.selectCondition.indexOf(obj.children[i].name) !== -1) {
              that.selectCondition.splice(that.selectCondition.indexOf(obj.children[i].name), 1)
            }
            that.form.constructionMainList.splice(that.form.constructionMainList.indexOf(obj.children[i].name), 1)
          }
        }
        that.keshiList = that.allkeshiList
      } else {
        that.form.departmentList = [obj.name]
        that.selectCondition.push(obj.name)
        that.keshiList = obj.children ? obj.children : []

        for (let i = 0; i < that.form.constructionMainList.length; i++) {
          for (let j = 0; j < that.selectCondition.length; j++) {
            if (that.form.constructionMainList[i] === that.selectCondition[j]) {
              that.selectCondition.splice(j, 1)
            }
          }
        }
        that.form.constructionMainList = []
      }

      this.getList()
    },
    selectKeshi(obj) {
      const that = this
      that.keshiAllSelect = false
      that.selectCondition = that.selectCondition.filter((item) => {
        return item !== '全部科室'
      })
      const index = that.form.constructionMainList.indexOf(obj.name)
      if (index !== -1) {
        that.form.constructionMainList.splice(index, 1)
        that.selectCondition = that.selectCondition.filter((item) => {
          return item !== obj.name
        })
      } else {
        that.form.constructionMainList.push(obj.name)
        that.selectCondition.push(obj.name)
      }
      this.getList()
    },
    selectScene(obj) {
      const that = this
      that.sceneAllSelect = false
      that.selectCondition = that.selectCondition.filter((item) => {
        return item !== '全部场景'
      })
      const index = that.form.dataSceneList.indexOf(obj.dicItemName)
      if (index !== -1) {
        that.form.dataSceneList.splice(index, 1)
        that.selectCondition = that.selectCondition.filter((item) => {
          return item !== obj.dicItemName
        })
      } else {
        that.form.dataSceneList.push(obj.dicItemName)
        that.selectCondition.push(obj.dicItemName)
      }
      this.getList()
    },
    calcelCondition(key) {
      this.selectCondition = this.selectCondition.filter((item) => {
        return item !== key
      })
      this.form.departmentList = this.form.departmentList.filter((item) => {
        return item !== key
      })
      this.form.constructionMainList = this.form.constructionMainList.filter((item) => {
        return item !== key
      })
      this.form.dataSceneList = this.form.dataSceneList.filter((item) => {
        return item !== key
      })

      this.topicList.forEach((item, index) => {
        if (item.name === key) {
          this.keshiList = this.allkeshiList
          // if (item.children && item.children.length > 0) {
          //     for (let i = 0; i < item.children.length; i++) {
          //         if (this.selectCondition.indexOf(item.children[i].name) !== -1) {
          //             this.selectCondition.splice(this.selectCondition.indexOf(item.children[i].name), 1);
          //         }
          //         this.form.constructionMainList.splice(this.form.constructionMainList.indexOf(item.children[i].name), 1);
          //         this.keshiList = this.keshiList.filter((item1) => {
          //             return item1.name !== item.children[i].name;
          //         })
          //     }
          // }
        }
      })
      this.getList()
    },
    selectAllOrg(flag) {
      const that = this
      that.departmentAllSelect = !that.departmentAllSelect
      if (that.departmentAllSelect) {
        that.selectCondition.push('全部部门')
        that.form.departmentList = []
        this.keshiList = this.allkeshiList
        for (let i = 0; i < that.topicList.length; i++) {
          for (let j = 0; j < that.selectCondition.length; j++) {
            if (that.topicList[i].name === that.selectCondition[j]) {
              that.selectCondition.splice(j, 1)
            }
          }
        }
      } else {
        that.selectCondition = that.selectCondition.filter((item) => {
          return item !== '全部部门'
        })
      }
      flag || that.getList()
    },
    selectAllKeshi(flag) {
      const that = this
      that.keshiAllSelect = !that.keshiAllSelect
      if (that.keshiAllSelect) {
        that.selectCondition.push('全部科室')
        for (let i = 0; i < that.form.constructionMainList.length; i++) {
          for (let j = 0; j < that.selectCondition.length; j++) {
            if (that.form.constructionMainList[i] === that.selectCondition[j]) {
              that.selectCondition.splice(j, 1)
            }
          }
        }
        that.form.constructionMainList = []
      } else {
        that.selectCondition = that.selectCondition.filter((item) => {
          return item !== '全部科室'
        })
      }
      flag || that.getList()
    },
    selectAllScene(flag) {
      const that = this
      that.sceneAllSelect = !that.sceneAllSelect
      if (that.sceneAllSelect) {
        that.selectCondition.push('全部场景')
        for (let i = 0; i < that.form.dataSceneList.length; i++) {
          for (let j = 0; j < that.selectCondition.length; j++) {
            if (that.form.dataSceneList[i] === that.selectCondition[j]) {
              that.selectCondition.splice(j, 1)
            }
          }
        }
        that.form.dataSceneList = []
      } else {
        that.selectCondition = that.selectCondition.filter((item) => {
          return item !== '全部场景'
        })
      }
      flag || that.getList()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.querySelector('html').style.cssText = `background: #F1F3F5;`
      if (from.name === 'CatalogDetail' && vm.flag) {
        if (vm.condition.condition.indexOf('全部部门') !== -1) {
          vm.selectAllOrg(true)
        }
        if (vm.condition.condition.indexOf('全部科室') !== -1) {
          vm.selectAllKeshi(true)
        }
        if (vm.condition.condition.indexOf('全部场景') !== -1) {
          vm.selectAllScene(true)
        }
        // vm.formSearchModel = vm.condition;
        vm.form.dataName = vm.condition.dataName
        vm.form.departmentList = vm.condition.departmentList
        if (vm.condition.condition.length > 0) {
          vm.selectCondition = vm.condition.condition
        }
        vm.keshiList = vm.condition.keshiList || []
        vm.form.dataSceneList = vm.condition.dataSceneList
        vm.form.constructionMainList = vm.condition.constructionMainList

        // vm.$store.commit("SET_FLAG", false);
        // vm.getList();
      } else {
        // vm.$store.commit("SET_CONDITION", {});
      }
    })
  }
}
</script>

<style scoped lang="less">

    .main-container-new {
        width: 100%;
        font-size: 14px;
        color: #333;
        background-color: #F1F3F5;
        .calalogList_content {
            width: 1200px;
            margin: 15px auto;

            .select_params_div {
                background-color: #FFF;

                .search_num {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 600;
                    height: 60px;
                    line-height: 60px;
                    padding: 0 25px;
                    border-bottom: 1px solid #EEEEEE;

                    .num {
                        color: #2362ED;
                        margin: 0 10px;
                    }

                    .keySearch {
                        width: auto;

                        /deep/ .el-input__inner {
                            border-bottom-right-radius: 0;
                            border-top-right-radius: 0;
                        }
                    }

                    .keySearchBtn {
                        border-bottom-left-radius: 0;
                        border-top-left-radius: 0;
                        background-color: #1677FF;
                    }
                }

                .condition {
                    padding: 20px 25px;
                    border-bottom: 1px solid #EEEEEE;

                    .condition_item {
                        .title {
                            font-weight: 600;
                            min-width: 70px;
                        }

                        display: flex;

                        &:not(:last-child) {
                            margin-bottom: 20px;
                        }

                        align-items: baseline;

                        .condition_item_list {
                            flex: 1 1 auto;
                            /*margin-bottom: 10px;*/
                            /*min-height: 35px;*/

                            span {
                                margin: 0 10px;
                                display: inline-block;
                                cursor: pointer;
                                padding: 3px 15px;
                                margin-bottom: 10px;

                                &.active {
                                    background-color: #2362ED;
                                    color: #FFF;

                                    border-radius: 13px;
                                }
                            }
                        }
                    }
                }

                .condition_selected {
                    padding: 20px 25px;

                    .condition_item {
                        .title {
                            font-weight: 600;
                            min-height: 25px;
                        }

                        display: flex;

                        &:not(:last-child) {
                            margin-bottom: 20px;
                        }

                        align-items: baseline;

                        .condition_item_list {
                            flex: 1 1 auto;

                            span {
                                margin: 0 10px;
                                display: inline-block;
                                background: rgba(35, 98, 237, 0.1);
                                color: #2362ED;
                                padding: 3px 10px;
                                border-radius: 6px;
                                border: 1px solid rgba(35, 98, 237, .28);
                                font-weight: 600;
                                margin-bottom: 10px;

                                img {
                                    width: 16px;
                                    vertical-align: text-bottom;
                                    margin-left: 5px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }

            .calalogList {
                margin-top: 10px;

                .calalogList_item {
                    background-color: #FFF;
                    padding: 20px 0 10px 0;
                    margin-bottom: 10px;
                    cursor: pointer;

                    .item_top {
                        border-bottom: 1px solid #EEEEEE;
                        padding: 0 30px 20px 40px;

                        .article_title {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 15px;

                            .stopState{
                                padding: 3px 10px;
                                border-radius: 3px;
                                color: #FFF;
                                margin-left: 20px;
                            }

                            .title {
                                font-size: 16px;
                                font-weight: 600;
                            }

                            img {
                                width: 16px;
                                vertical-align: text-bottom;
                                margin-right: 5px;
                            }

                            span {
                                font-size: 12px;
                                color: #666666;
                            }
                        }

                        .article_content {
                            color: #666666;
                            font-size: 12px;
                        }
                    }

                    .item_bottom {
                        display: flex;
                        padding: 10px 30px 0 40px;
                        color: #666666;
                        font-weight: 600;
                        font-size: 12px;

                        div {
                            &:not(:last-child) {
                                margin-right: 130px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
