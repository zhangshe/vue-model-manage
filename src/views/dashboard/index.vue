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
          项行业数据资源
        </div>
        <div style="color:#bee3ff;font-size: 18px;font-weight: 600;font-family: PingFangSC-Medium, PingFang SC;margin-top: 10px">
          提供数据基本信息与数据样例的查询与展示，促进数据可视可用
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
          <span>应用场景</span>
          <img src="@/assets/dataCatalog/编组 4备份@2x.png" alt="" width="45px">
        </div>
        <div class="catalog_list">
          <div
            v-for="(item, index) in sceneList"
            :key="index"
            style="width: 390px"
            class="catalog_list_item"
            @click="gotoList1(item)"
          >
            <img :src="require('@/assets/dataCatalog/scene' + (index+1) + '.png')" alt="">
            <div>{{ item.dicItemName }}

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
      scrollerHeight: window.innerWidth / 6.66 + 'px',
      count: '1000',
      topicList: [{ 'name': '数据业务部' }, { 'name': '低碳业务部' }, { 'name': '生态业务部' }, { 'name': '新能源业务部' }, { 'name': '软件业务部' }, { 'name': '基础研究部' }, { 'name': '智能网联部' }, { 'name': '中汽智联' }],
      sceneList: [{ 'dicItemName': '绿色生态' }, { 'dicItemName': '智能网联' }, { 'dicItemName': '智能座舱' }, { 'dicItemName': '市场研究' }, { 'dicItemName': '工业软件' }, { 'dicItemName': '低碳节能' }]
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.getTotal()
  },
  mounted() {
    // this.getTopic();
    // this.getScene();
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
      this.$router.push({ path: '/modelList', query: { name1: obj.dicItemName }})
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
