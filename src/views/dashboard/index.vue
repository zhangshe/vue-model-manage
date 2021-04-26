<template>
  <div class="main-container-new" style="width: 100%">
    <div class="catalog_header_img" style="position: relative;;width: 100%">
      <div style=";width: 100%;padding-left: 150px;" class="titleBg" :style="{height: scrollerHeight}">
        <div style="display: flex">
          <img src="@/assets/dataCatalog/编组 33@2x.png" alt="" style="width: 30px;height: 30px;margin-top: 3px">
          <div style="color:white;font-size: 27px;font-weight: 600;font-family: PingFangSC-Medium, PingFang SC;margin-left: 10px">
            汽车模型资源服务
          </div>
        </div>
        <div style="color:#bee3ff;font-size: 18px;font-weight: 600;font-family: PingFangSC-Medium, PingFang SC;margin-top: 10px">
          共汇聚
          <div style="display: inline;font-size: 32px;color:#FBEA1B;font-weight: 600">{{ count }}</div>
          项行业模型资源
        </div>
        <div style="color:#bee3ff;font-size: 18px;font-weight: 600;font-family: PingFangSC-Medium, PingFang SC;margin-top: 10px">
          提供模型的基本信息，促进模型复用及知识沉淀
        </div>
        <div style="width: 148px;height: 1px;background: #fff;" class="line" />
      </div>
    </div>
    <div class="catalog">
      <div class="topical">
        <div class="catalog_title">
          <img src="@/assets/dataCatalog/编组 4备份 2@2x.png" alt="" width="45px">
          <span>部门</span>
          <img src="@/assets/dataCatalog/编组 4备份@2x.png" alt="" width="45px">
        </div>
        <div class="catalog_list">
          <div
            v-for="(item, index) in topicList"
            :key="index"
            style="width: 290px"
            class="catalog_list_item"
            @click="gotoList(item)"
          >
            <img :src="require('@/assets/dataCatalog/zhuti' + (index + 1) + '.png')" alt="">
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="scene">
        <div class="catalog_title">
          <img src="@/assets/dataCatalog/编组 4备份 2@2x.png" alt="" width="45px">
          <span>开发语言</span>
          <img src="@/assets/dataCatalog/编组 4备份@2x.png" alt="" width="45px">
        </div>
        <div class="catalog_list">
          <div
            v-for="(item, index) in languageList"
            :key="index"
            style="width: 390px"
            class="catalog_list_item"
            @click="gotoList1(item)"
          >
            <img :src="require('@/assets/dataCatalog/scene' + (index+1) + '.png')" alt="">
            <div>{{ item.name }}

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getModelInfo } from '@/api/fmu'

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      // loginForm: {
      //   username: 'admin',
      //   password: '111111'
      // },
      loginForm: {
        DepartmentName: '软件开发部',
        Account: '008054',
        UnitName: '基础研究室',
        UserName: 'admin'
      },
      scrollerHeight: window.innerWidth / 6.66 + 'px',
      count: '1000',
      topicList: [{ 'name': '数据业务部', 'children': [{ 'name': '产品数据室' }, { 'name': '后市场数据室' }, { 'name': '市场数据室' }] },
        { 'name': '低碳业务部', 'children': [{ 'name': '绿色低碳研究室' }, { 'name': '节能战略研究室' }] },
        { 'name': '生态业务部', 'children': [{ 'name': '汽车材料研究室' }, { 'name': '回收利用研究室' }] },
        { 'name': '新能源业务部', 'children': [{ 'name': '清洁能源研究室' }, { 'name': '新能源数据室' }, { 'name': '氢能源研究室' }] },
        { 'name': '软件业务部', 'children': [{ 'name': '研发信息室' }, { 'name': '制造信息系统室' }] },
        { 'name': '基础研究部', 'children': [{ 'name': '前瞻技术研究室' }, { 'name': '软件研发室' }, { 'name': '数据技术应用室' }] },
        { 'name': '智能网联部', 'children': [{ 'name': '智能网联数据室' }, { 'name': '网联技术研究室' }, { 'name': '智能网联应用室' }] },
        { 'name': '中汽智联', 'children': [{ 'name': '业务发展室' }, { 'name': '技术发展室' }] }],
      sceneList: [{ 'dicItemName': '绿色生态' }, { 'dicItemName': '智能网联' }, { 'dicItemName': '智能座舱' }, { 'dicItemName': '市场研究' }, { 'dicItemName': '工业软件' }, { 'dicItemName': '低碳节能' }],
      languageList: [{ 'name': 'Java' }, { 'name': 'Python' }, { 'name': 'Matlab' }, { 'name': 'C++' }, { 'name': 'C#' }, { 'name': '其他' }]
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.getTotal()
  },
  mounted() {
    this.loginForm.DepartmentName = this.$route.params.DepartmentName === undefined ? '软件开发部' : this.$route.params.DepartmentName
    this.loginForm.Account = this.$route.params.Account === undefined ? '008054' : this.$route.params.Account
    this.loginForm.UnitName = this.$route.params.UnitName === undefined ? '基础研究室' : this.$route.params.UnitName
    this.loginForm.UserName = this.$route.params.UserName === undefined ? 'admin' : this.$route.params.UserName
    // this.getTopic();
    // this.getScene();
    this.$store.dispatch('user/LoginNew', this.loginForm).then(() => {
      this.$router.push({ path: this.redirect || '/' })
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
    const param = null
    getModelInfo(param).then((res) => {
      this.count = res.Data.TotalCount
    })
  },
  methods: {
    gotoList(obj) {
      this.$router.push({
        path: '/modelList',
        query: { topic: obj.id, name: obj.name, children: JSON.stringify(obj.children) }
      })
    },
    gotoList1(obj) {
      this.$router.push({ path: '/modelList', query: { name1: obj.name }})
    }
    // getTopic() {
    //     getOrgTree().then((res) => {
    //         if (res.data[0] && res.data[0].children && res.data[0].children.length > 0) {
    //             this.topicList = res.data[0].children;
    //         }
    //     })
    // },
    // getTotal() {
    //     getTotal({}).then((res) => {
    //         if (res.ok) {
    //             this.count = res.data
    //         }
    //     })
    // },
    // getScene() {
    //     getDicType({dicId: 6}).then((res) => {
    //         for (var i = 0; i < res.data.length; i += 3) {
    //             this.sceneList.push(res.data.slice(i, i + 3));
    //         }
    //     })
    // },

  }
}
</script>

<style scoped lang="less">
    .line{
        margin-top: 15px
    }
    .titleBg {
        background: url('../../assets/dataCatalog/编组 31@2x.png');
        background-size: 100%;
        padding-top: 35px
    }
    @media screen and (min-width: 1367px) {
        .line{
            margin-top: 25px
        }
        .titleBg {
            background: url('../../assets/dataCatalog/编组 31@2x.png');
            background-size: 100%;
            padding-top: 50px
        }
    }

    .main-container-new {
        background-color: #F1F3F5;

        .catalog_header_img {
            font-size: 0;
        }

        .catalog {
            width: 1200px;
            margin: 0 auto;

            .topical, .scene {
                margin-top: 30px;
            }

            .catalog_title {
                text-align: center;
                margin-bottom: 18px;

                span {
                    font-size: 18px;
                    color: #2C3578;
                    margin: 0 24px;
                    font-weight: 600;
                }
            }

            .catalog_list {
                display: flex;
                flex-wrap: wrap;

                img {
                    width: 100px;
                    margin: 20px 30px 20px 40px;
                }

                .catalog_list_item {
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                    /*flex: 1 1 auto;*/
                    display: flex;
                    align-items: center;
                    /*justify-content: center;*/
                    background-color: #FFF;
                    cursor: pointer;
                    margin-bottom: 10px;
                    box-shadow: 0px 2px 10px 0px rgba(207, 207, 207, 0.23);

                    &:not(:last-child) {
                        margin-right: 10px;
                    }
                }
            }
        }
    }

    .scene {
        .catalog_list_item {
            width: 33.3%;
        }
    }
</style>
