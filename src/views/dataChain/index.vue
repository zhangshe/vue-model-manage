<template>
    <div style="width: calc(100% - 40px);margin: 20px;position: relative;"
         class="qltbody">
        <div class="calalogList_content">
            <div class="select_params_div">
                <div class="condition">
                    <div class="condition_item"
                         style="border-bottom: 1px solid #EEEEEE;padding-top: 13px;padding-bottom: 13px;margin-bottom: 13px">
                        <div class="title">部门：</div>
                        <div class="condition_item_list">
                            <span v-for="item in topicList" v-bind:class="classObject(item.name)"
                                  @click="selectTopic(item)">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="condition_item">
                        <div class="title" style="color: white">科室：</div>
                        <div class="condition_item_list1">
                            <span v-for="item in keshiList" v-bind:class="classObject1(item.name)"
                                  @click="selectKeshi(item)">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="condition_item" style="line-height: 48px">
                        <div class="title" style="color: white">场景：</div>
                        <div class="condition_item_list" style="background: #F4F6FC;">
                            <span v-for="item in sceneList" v-bind:class="classObject2(item.dataName)"
                                  @click="selectScene(item)">{{item.dataName}}</span>
                        </div>
                    </div>
                </div>
                <div class="condition_selected" v-if="false">
                    <div class="condition_item">
                        <div class="title">已选：</div>
                        <div class="condition_item_list">
                            <span v-for="(item, index) in selectCondition">{{item}}
                                <img src="@/assets/dataCatalog/叉叉@2x.png" alt="" @click="calcelCondition(item)">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="eharts-content" style="width: 1200px;height: 600px;margin: 0 auto;background: #fff"-->
             <!--v-if="selectCondition.length == 1 || selectCondition.length == 2">-->
            <!--<v-chart :options="options6" :autoresize="true"></v-chart>-->

        <!--</div>-->
        <div class='ueditorHtml' v-html="demo1" style="width: 1200px;margin: 0 auto;background: #fff"
             v-if="selectCondition.length == 1 || selectCondition.length == 2"></div>

        <div class='ueditorHtml' v-html="demo" style="width: 1200px;margin: 0 auto;background: #fff"
             v-if="selectCondition.length == 0 "></div>
        <div style="width: 1200px;background-color: #fff;margin: 0 auto;padding-top: 25px"
             v-if="selectCondition.length == 3">
            <div class="linkTitle">
                <img src="../../assets/img/img-qlt-title-left.png"
                     style="height: 18px;margin-right: 15px;margin-top: 5px">
                {{data.dataName}}
                <img src="../../assets/img/img-qlt-title-right.png"
                     style="height: 18px;margin-left: 15px;margin-top: 5px"></div>
            <div class="linkDesc">
                <div style="display: inline;font-weight: bold">数据典型特征：</div>
                {{data.dataFeatures}}
            </div>
            <div class="linkDesc">
                <div style="display: inline;font-weight: bold">应用关键技术：</div>
                {{data.dataTechnology}}
            </div>
            <div class="linkDesc">
                <div style="display: inline;font-weight: bold">2020年总投入：</div>
                {{ (applicationInvestment && (applicationInvestment != 'NaN')) ? intToFloat(applicationInvestment) :
                '-'}}万元
            </div>
            <div class="linkDesc">
                <div style="display: inline;font-weight: bold">2020年总产值：</div>
                {{ (applicationOutput && (applicationOutput != 'NaN')) ? intToFloat(applicationOutput) : '-'}}万元
            </div>
            <div style="padding-bottom:20px;margin-top: 20px;display: flex;flex-flow: row nowrap;justify-content: space-between;padding-left: 38px;padding-right: 34px;min-height: 1040px;text-align: center">
                <div style="width: 360px;">
                    <div class="bgGreen" id="item_sjcj_start" style="position: relative;" v-if="sjcjDataIndex.length>0">
                        <div style=";padding-left: 10px;padding-right: 10px;height: 36px;line-height: 36px;text-align: right;padding-top: 5px;font-weight: bolder;cursor: pointer"
                             :class="{'colorGreen': this.sjcjData.length>3, 'colorGreenLight': this.sjcjData.length<=3 }"
                             @click="newAddFunc">更多
                        </div>
                        <!--<i class="el-icon-arrow-up upList" style="" @click="newAddFunc"></i>-->
                        <div style="margin-top: -36px;">
                            <div class="greenInner" v-for="(item, index) in sjcjDataIndex">
                                <div class="greenItem">
                                    <div class="greenItemTitle">合作方类型：</div>
                                    {{item.type}}
                                </div>
                                <div class="greenItem">
                                    <div class="greenItemTitle">合作方名称：</div>
                                    {{item.name}}
                                </div>
                                <div class="greenItem">
                                    <div class="greenItemTitle">合作年度：</div>
                                    {{item.year}}年
                                </div>
                                <div class="greenItem">
                                    <div class="greenItemTitle">服务内容：</div>
                                    {{item.content}}
                                </div>
                                <div class="greenItem">
                                    <div class="greenItemTitle">应用技术：</div>
                                    {{item.technology}}
                                </div>
                                <div class="greenItem">
                                    <div class="greenItemTitle">采集投入：</div>
                                    {{ (item.cost && (item.cost != 'NaN')) ? intToFloat(item.cost) : '-'}}万元
                                </div>
                            </div>
                        </div>
                        <!--<i class="el-icon-arrow-down upList" style="" @click="pageDown(1)"></i>-->
                    </div>
                    <div class="bgYellow" style="margin-top: 100px" id="item_sjgx_start">
                        <div class="yellowInner">
                            <div class="yellowItem">
                                <div class="yellowItemTitle">开始建设时间：</div>
                                {{(data.dateCreatetime != null && data.dateCreatetime != '' && data.dateCreatetime != '-') ?
                                data.dateCreatetime.substring(0,10) :''}}
                            </div>
                            <div class="yellowItem">
                                <div class="yellowItemTitle">最新更新时间：</div>
                                {{data.updateTime}}
                            </div>
                            <div class="yellowItem">
                                <div class="yellowItemTitle">更新频率：</div>
                                {{data.updateRate}}
                            </div>
                            <div class="yellowItem">
                                <div class="yellowItemTitle">应用技术：</div>
                                {{data.warehousingTechnology}}
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 336px;border: 1px solid #E6E8E7;background: #FEFEFE;">
                    <div style="position: relative">
                        <div class="processTitle" style="margin-top: 20px;">数据需求</div>
                        <div class="process">
                            <div class="processItemTitle">
                                <div class="greenItemTitle">支撑业务：</div>
                                {{data.dataBusiness}}
                            </div>
                        </div>
                    </div>
                    <img src="../../assets/img/jiantou.png" style="margin-top: 20px;margin-bottom: 10px;">
                    <div style="position: relative">
                        <div class="processTitle" style="margin-top: 5px;">数据采集</div>
                        <div class="process" id="item_sjcj_end">
                            <div class="processItemTitle">
                                <div class="greenItemTitle">数据来源：</div>
                                {{data.collectionSourse}}
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">外部合作方：</div>
                                {{typeOUTSize}}家
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">内部合作方：</div>
                                {{typeINSize}}个
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">应用技术：</div>
                                {{technologySize}}种
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">采集总投入：</div>
                                {{(sjcjInMoney && sjcjInMoney != 'NaN') ? intToFloat(sjcjInMoney) : '-'}}万元
                            </div>
                        </div>
                    </div>
                    <img src="../../assets/img/jiantou.png" style="margin-top: 20px;margin-bottom: 10px;">
                    <div style="position: relative">
                        <div class="processTitle" style="margin-top: 5px;">数据入库</div>
                        <div class="process" id="item_rkzt_end">
                            <div class="processItemTitle">
                                <div class="greenItemTitle">入库状态：</div>
                                {{data.warehousingStatus}}
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">应用技术：</div>
                                {{sjrkWarehousingTechnology}}种
                            </div>
                        </div>
                    </div>
                    <img src="../../assets/img/jiantou.png" style="margin-top: 20px;margin-bottom: 10px;">
                    <div style="position: relative">
                        <div class="processTitle" style="margin-top: 5px;">数据更新</div>
                        <div class="process" id="item_sjgx_end">
                            <div class="processItemTitle">
                                <div class="greenItemTitle">数据更新频率：</div>
                                {{data.updateRate}}
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">最新更新时间：</div>
                                {{data.updateTime}}
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">应用技术：</div>
                                {{sjgxTechnologySize}}种
                            </div>
                        </div>
                    </div>
                    <img src="../../assets/img/jiantou.png" style="margin-top: 20px;margin-bottom: 10px;">
                    <div style="position: relative">
                        <div class="processTitle" style="margin-top: 5px;">数据应用</div>
                        <div class="process" id="item_sjyy_end">
                            <div class="processItemTitle">
                                <div class="greenItemTitle">数据服务模式：</div>
                                {{allCount}}
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">应用技术：</div>
                                {{technologySize1}}种
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">内部使用科室：</div>
                                {{typeINSize1}}个
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">外部服务客户：</div>
                                {{typeOUTSize1}}家
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">开发总投入：</div>
                                {{(sjyyInMoney && sjyyInMoney != 'NaN') ? intToFloat(sjyyInMoney) : '-'}}万元
                            </div>
                            <div class="processItemTitle">
                                <div class="greenItemTitle">总产值：</div>
                                {{(sjyyOutMoney && sjyyOutMoney != 'NaN') ? intToFloat(sjyyOutMoney) : '-'}}万元
                            </div>
                        </div>
                    </div>
                    <!--<img src="../../assets/img/jiantou.png">-->
                    <!--<div style="position: relative">-->
                        <!--<div class="processTitle" style="margin-top: 5px;">数据停用</div>-->
                        <!--<div class="process">-->
                            <!--<div class="processItemTitle">-->
                                <!--<div class="greenItemTitle">状态：</div>-->
                                <!--{{(data.dataStop && data.dataStop !='-') ? '停用' :'在用'}}-->
                            <!--</div>-->
                            <!--<div class="processItemTitle">-->
                                <!--<div class="greenItemTitle">停用时间：</div>-->
                                <!--{{data.dataStop}}-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
                <div style="width: 360px;">
                    <div class="bgRed">
                        <div class="redInner" id="item_rkzt_start">
                            <div class="redItem">
                                <div class="redItemTitle">入库状态：</div>
                                {{data.warehousingStatus}}
                            </div>
                            <div class="redItem">
                                <div class="redItemTitle">入库登记时间：</div>
                                {{data.warehousingTime}}
                            </div>
                            <div class="redItem">
                                <div class="redItemTitle">应用技术：</div>
                                {{data.warehousingTechnology}}
                            </div>
                        </div>
                    </div>

                    <div class="bgGray" style="position: relative;margin-top: 250px" id="item_sjyy_start"
                         v-if="sjyyDataIndex.length>0">
                        <div style=";padding-left: 10px;padding-right: 10px;height: 36px;line-height: 36px;text-align: right;padding-top: 5px;font-weight: bolder;cursor: pointer"
                             :class="{'colorRed': this.sjyyData.length>3, 'colorRedLight': this.sjyyData.length<=3 }"
                             @click="newRightFunc">更多
                        </div>
                        <div style="margin-top: -36px;">
                            <div class="grayInner" v-for="(item, index) in sjyyDataIndex">
                                <div class="grayItem">
                                    <div class="grayItemTitle">应用方向：</div>
                                    {{item.applicationDirection}}
                                </div>
                                <div class="grayItem">
                                    <div class="grayItemTitle">服务对象类型：</div>
                                    {{item.objectType}}
                                </div>
                                <div class="grayItem">
                                    <div class="grayItemTitle">服务对象名称：</div>
                                    {{item.objectName}}
                                </div>
                                <div class="grayItem">
                                    <div class="grayItemTitle">项目名称：</div>
                                    {{item.projectName}}
                                </div>
                                <div class="grayItem">
                                    <div class="grayItemTitle">项目年度：</div>
                                    {{item.projectYear}}年
                                </div>
                                <div class="grayItem">
                                    <div class="grayItemTitle">应用模式：</div>
                                    <span v-for="(item1,index1) in item.dataApplyServiceList">
                                        【{{item1.serviceState}}】{{item1.serviceContent}}；
                                    </span>
                                </div>
                                <div class="grayItem"
                                     style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                                    <div class="grayItemTitle">数据开发投入：</div>
                                    {{(item.cost && item.cost != 'NaN') ? intToFloat(item.cost) : '-'}}万元
                                    <!--{{intToFloat(item.cost)}}万元-->
                                </div>
                                <div class="grayItem">
                                    <div class="grayItemTitle">合同额：</div>
                                    {{(item.contractAmount && item.contractAmount != 'NaN') ?
                                    intToFloat(item.contractAmount) : '-'}}万元
                                    <!--{{intToFloat(item.contractAmount)}}万元-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="component-container">
            <tableLeft ref="newAddDialog"></tableLeft>
        </div>
        <div class="component-container">
            <tableRight ref="newRightialog"></tableRight>
        </div>
    </div>
</template>
<script>
    import LeaderLine from 'leader-line'
    import {getDicType, getList, getOrgTree, getTree, getDetail, getUEditor, getSourceList,getDepartmentDetail} from '@/api/dataCatalog'
    import tableLeft from './tableLeft';
    import tableRight from './tableRight';

    export default {
        components: {tableLeft, tableRight},
        data() {
            return {
                treeIndexData: [],
                options6: {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',
                            id: 0,
                            name: 'tree1',
                            data: [],
                            top: '10%',
                            left: '10%',
                            bottom: '22%',
                            right: '50%',
                            symbolSize: 7,
                            edgeShape: 'polyline',
                            edgeForkPosition: '63%',
                            initialTreeDepth: 3,
                            lineStyle: {
                                width: 2
                            },

                            label: {
                                backgroundColor: '#fff',
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 13
                            },

                            leaves: {
                                label: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            },
                            emphasis: {
                                focus: 'descendant'
                            },
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                },
                demo: '',
                demo1: '',
                topicList: [],
                sceneList: [],
                form: {
                    departmentList: '',
                    constructionMainList: '',
                    dataSceneList: '',
                    dataSceneOperator: 'like',
                    dataName: '',
                    dataNameOperator: 'like',
                    constructionMainOperator: 'like'
                },
                dataList: [],
                listLength: 0,
                selectCondition: [],
                keshiList: [],
                sjcjPageCurrent: 0,//数据采集列表当前页码
                sjcjDataIndex: [],
                sjcjData: [],
                sjyyPageCurrent: 0,//数据采集列表当前页码
                sjyyDataIndex: [],
                sjyyData: [],
                scrollerHeight: (window.innerHeight - 115) + 'px',
                tableData: [],
                data: {
                    dataCollectList: []
                },
                //数据采集 start
                technologySize: '',//应用技术数量
                typeINSize: 0,//应用技术数量
                typeOUTSize: 0,//应用技术数量
                sjcjInMoney: 0,//总投入
                //数据采集 end
                //数据入库
                sjrkWarehousingTechnology: 0,
                //数据更新
                sjgxTechnologySize: 0,
                plumbIns: null,
                sjyyOutMoney: 0,
                sjyyInMoney: 0,
                typeINSize1: 0,
                typeOUTSize1: 0,
                technologySize1: 0,
                count1: 0,
                count2: 0,
                count3: 0,
                count4: 0,
                count5: 0,
                allCount: '',
                applicationInvestment: 0,
                applicationOutput: 0,
            }
        },
        created() {
            this.plumbIns = jsPlumb.getInstance()
            this.plumbIns.reset()
        },
        mounted() {
            this.getTopic()
            this.getUEditor()
        },
        methods: {
            intToFloat(val) {
                if (val == '') {
                    return ''
                } else if (val == '-') {
                    return '-'
                }
                return new Number(val).toFixed(2);
            },
            getUEditor() {
                getUEditor({}).then((res) => {
                    if (res.ok) {
                        if (res.data && res.data.length > 0) {
                            this.demo = res.data[0].content
                        } else {
                            this.demo.content = ''
                        }
                    } else {
                        this.demo.content = ''
                    }
                })
            },
            newAddFunc() {
                if (this.sjcjData.length > 3) {
                    this.$refs['newAddDialog'].defaultfunc(this.data.id);
                }
            },
            newRightFunc() {
                if (this.sjyyData.length > 3) {
                    this.$refs['newRightialog'].defaultfunc(this.data.id);
                }
            },
            getDetail(str) {
                var postInfo = {
                    'dataName': str
                }
                getDetail(postInfo).then((res) => {
                    if (res.ok) {
                        this.data = res.data
                        //数据采集

                        this.sjcjData = res.data.dataCollectList

                        //数据入库
                        this.sjrkWarehousingTechnology = res.data.warehousingTechnology ? res.data.warehousingTechnology.split('、').length : 0
                        //数据更新
                        this.sjgxTechnologySize = res.data.updateTechnology ? res.data.updateTechnology.split('、').length : 0
                        //数据应用
                        this.sjyyData = res.data.dataApplyList
                        this.getDatasjyyAnalysis(res.data.dataCollectList, res.data.dataApplyList)

                        var start = 3 * this.sjyyPageCurrent
                        var end = 3 * this.sjyyPageCurrent + 3
                        this.sjyyDataIndex = this.sjyyData.slice(start, end);

                        let _that = this
                        setTimeout(() => {

                            _that.jump()//娃娃消失

                        }, 1000);

                    }
                })
            },
            getDataCollectListAnalysis(arr) {
                //统计


            }
            ,
            getDatasjyyAnalysis(arr1, arr) {
                this.applicationInvestment = 0
                this.applicationOutput = 0
                this.sjcjDataIndex = []

                //数据采集start
                var sjcjInMoneyIndex1 = 0
                var typeINSizeIndex1 = []
                var typeOUTSizeIndex1 = []
                var arrIndex1 = []
                for (var i = 0; i < arr1.length; i++) {
                    //应用技术
                    if (arr1[i].technology && arr1[i].technology != 'null' && arr1[i].technology != '-') {
                        arrIndex1.push(arr1[i].technology)
                    }
                    //内部合作科室数量
                    if (arr1[i].type == '内部') {
                        if (arr1[i].name && arr1[i].name != 'null' && arr1[i].name != '-') {
                            typeINSizeIndex1.push(arr1[i].name)
                        }
                    } else if (arr1[i].type == '外部') {
                        if (arr1[i].name && arr1[i].name != 'null' && arr1[i].name != '-') {
                            typeOUTSizeIndex1.push(arr1[i].name)
                        }
                    }

                    ///总投入
                    sjcjInMoneyIndex1 = sjcjInMoneyIndex1 + parseFloat(arr1[i].cost)
                    if (arr1[i].year == '2020') {
                        this.applicationInvestment = this.applicationInvestment + ((parseFloat(arr1[i].cost) + '') != 'NaN' ? parseFloat(arr1[i].cost) : 0)
                    }

                    if (arr1[i].isshow == 1 && this.sjcjDataIndex.length <= 3) {
                        this.sjcjDataIndex.push(arr1[i])
                    }
                }

                if (this.sjcjDataIndex.length == 0) {
                    var start = 3 * this.sjcjPageCurrent
                    var end = 3 * this.sjcjPageCurrent + 3
                    this.sjcjDataIndex = this.sjcjData.slice(start, end);
                }

                this.sjcjInMoney = sjcjInMoneyIndex1
                this.typeINSize = Array.from(new Set(typeINSizeIndex1)).length
                this.typeOUTSize = Array.from(new Set(typeOUTSizeIndex1)).length
                this.technologySize = Array.from(new Set(arrIndex1)).length
                //数据采集end

                var sjcjInMoneyIndex = 0
                var sjcjOutMoneyIndex = 0

                var typeINSizeIndex = []
                var typeOutSizeIndex = []

                var arrIndex = []

                //统计 数据 1项、工具2项、软件0项、平台0项、解决方案0项
                this.count1 = 0
                this.count2 = 0
                this.count3 = 0
                this.count4 = 0
                this.count5 = 0

                for (var i = 0; i < arr.length; i++) {
                    //应用技术
                    if (arr[i].technology && arr[i].technology != 'null' && arr[i].technology != '-') {
                        arrIndex.push(arr[i].technology)
                    }
                    //内部合作科室数量
                    if (arr[i].applicationDirection == '对内') {
                        if (arr[i].objectName && arr[i].objectName != 'null' && arr[i].objectName != '-' && arr[i].objectType =='其他科室') {
                            typeINSizeIndex.push(arr[i].objectName)
                        }
                    } else if (arr[i].applicationDirection == '对外') {
                        if (arr[i].objectName && arr[i].objectName != 'null' && arr[i].objectName != '-') {
                            typeOutSizeIndex.push(arr[i].objectName)
                        }
                    }

                    ///总投入
                    sjcjInMoneyIndex = sjcjInMoneyIndex + ((parseFloat(arr[i].cost) + '') != 'NaN' ? parseFloat(arr[i].cost) : 0)

                    if (arr[i].projectYear == '2020') {
                        this.applicationInvestment = this.applicationInvestment + ((parseFloat(arr[i].cost) + '') != 'NaN' ? parseFloat(arr[i].cost) : 0)
                    }

                    ///总产值
                    sjcjOutMoneyIndex = sjcjOutMoneyIndex + ((parseFloat(arr[i].contractAmount) + '') != 'NaN' ? parseFloat(arr[i].contractAmount) : 0)
                    if (arr[i].projectYear == '2020') {
                        this.applicationOutput = this.applicationOutput + ((parseFloat(arr[i].contractAmount) + '') != 'NaN' ? parseFloat(arr[i].contractAmount) : 0)
                    }

                    //统计数据
                    var count1Index = []
                    var count2Index = []
                    var count3Index = []
                    var count4Index = []
                    var count5Index = []

                    for (var j = 0; j < arr[i].dataApplyServiceList.length; j++) {
                        if (arr[i].dataApplyServiceList[j].serviceState == '数据') {
                            count1Index.push(arr[i].dataApplyServiceList[j].serviceContent)
                        } else if (arr[i].dataApplyServiceList[j].serviceState == '工具') {
                            count2Index.push(arr[i].dataApplyServiceList[j].serviceContent)
                        } else if (arr[i].dataApplyServiceList[j].serviceState == '软件') {
                            count3Index.push(arr[i].dataApplyServiceList[j].serviceContent)
                        } else if (arr[i].dataApplyServiceList[j].serviceState == '平台') {
                            count4Index.push(arr[i].dataApplyServiceList[j].serviceContent)
                        } else if (arr[i].dataApplyServiceList[j].serviceState == '解决方案') {
                            count5Index.push(arr[i].dataApplyServiceList[j].serviceContent)
                        }
                    }
                }

                this.count1 = Array.from(new Set(count1Index)).length
                this.count2 = Array.from(new Set(count2Index)).length
                this.count3 = Array.from(new Set(count3Index)).length
                this.count4 = Array.from(new Set(count4Index)).length
                this.count5 = Array.from(new Set(count5Index)).length

                this.sjyyInMoney = sjcjInMoneyIndex
                this.sjyyOutMoney = sjcjOutMoneyIndex
                this.typeINSize1 = Array.from(new Set(typeINSizeIndex)).length
                this.typeOUTSize1 = Array.from(new Set(typeOutSizeIndex)).length
                this.technologySize1 = Array.from(new Set(arrIndex)).length

                var str = ''
                if (this.count1 != 0) {
                    str += '数据' + this.count1 + '项、'
                }
                if (this.count2 != 0) {
                    str += '工具' + this.count2 + '项、'
                }
                if (this.count3 != 0) {
                    str += '软件' + this.count3 + '项、'
                }
                if (this.count4 != 0) {
                    str += '平台' + this.count4 + '项、'
                }
                if (this.count5 != 0) {
                    str += '解决方案' + this.count5 + '项、'
                }
                this.allCount = str.substring(0, str.length - 1)
                // 数据{{count1}}项、工具{{count2}}项、软件{{count3}}项、平台{{count4}}项、解决方案{{count5}}项
            }
            ,
            getTree() {
                var postInfo = {
                    // 'department': this.selectCondition[0],//部门
                    'unit': this.selectCondition[1],//科室
                    'stopState': 0//科室
                }
                getTree(postInfo).then((res) => {
                    this.sceneList = res.data
                })
            }
            ,
            getTopic() {
                getOrgTree().then((res) => {
                    if (res.data[0] && res.data[0].children && res.data[0].children.length > 0) {
                        this.topicList = res.data[0].children;
                    }
                })
            }
            ,
            getScene() {
                getDicType({dicId: 6}).then((res) => {
                    this.sceneList = res.data;
                })
            }
            ,
            classObject(id) {
                let that = this;
                return {
                    active: that.form.departmentList == id
                }
            }
            ,
            classObject1(id) {
                let that = this;
                return {
                    active1: that.form.constructionMainList == id
                }
            }
            ,
            classObject2(id) {
                let that = this;
                return {
                    active2: that.form.dataSceneList == id
                }
            }
            ,
            selectTopic(obj) {
                let that = this;
                that.selectCondition = []
                this.keshiList = []
                this.sceneList = []
                that.form.constructionMainList = ''

                that.form.departmentList = obj.name;
                that.selectCondition.push(obj.name);
                this.keshiList = obj.children ? this.keshiList.concat(obj.children) : this.keshiList

                this.plumbIns.reset();
                this.plumbIns.deleteEveryConnection()
                this.plumbIns.deleteEveryEndpoint()
                this.plumbIns.reset();

                // this.options6.series[0].data = []
                // getSourceList(obj.id).then((res) => {
                //     let that = this
                //     that.options6.series[0].data = []
                //     var dataIndex = res.data
                //     if (res.ok && dataIndex.children) {
                //         that.treeIndexData = dataIndex.children
                //         for (var i = 0; i < dataIndex.children.length; i++) {
                //             if (dataIndex.children[i].children) {
                //                 for (var j = 0; j < dataIndex.children[i].children.length; j++) {
                //                     dataIndex.children[i].children[j].name = dataIndex.children[i].children[j].dataBusiness + ' ' + dataIndex.children[i].children[j].dataName
                //                     dataIndex.children[i].children[j].value = ''
                //                 }
                //             }
                //         }
                //         that.options6.series[0].data.push(dataIndex)
                //     }
                // })
                this.demo1 = ''
                getDepartmentDetail(obj.id).then((res) => {
                    let that = this
                    if (res.ok) {
                        that.demo1 = res.data.content
                    }
                })
            }
            ,
            selectKeshi(obj) {
                let that = this;
                let index = that.selectCondition.indexOf(that.form.constructionMainList)

                if (index !== -1) {
                    that.selectCondition.splice(index);
                }
                that.form.dataSceneList = ''
                that.form.constructionMainList = obj.name;
                that.selectCondition.push(obj.name);

                // that.options6.series[0].data = []
                // // var dataIndex = res.data
                // if (that.treeIndexData) {
                //     for (var i = 0; i < that.treeIndexData.length; i++) {
                //         if (that.treeIndexData[i].name == obj.name) {
                //             if (that.treeIndexData[i].children) {
                //                 var childIndex = that.treeIndexData[i]
                //                 for (var j = 0; j < childIndex.children.length; j++) {
                //                     childIndex.children[j].name = childIndex.children[j].dataBusiness + ' ' + childIndex.children[j].dataName
                //                     childIndex.children[j].value = ''
                //                 }
                //                 that.options6.series[0].data.push(childIndex)
                //             }
                //         }
                //     }
                // }
                this.demo1 = ''
                getDepartmentDetail(obj.id).then((res) => {
                    let that = this
                    if (res.ok) {
                        that.demo1 = res.data.content
                    }
                })

                this.getTree()
                this.plumbIns.reset();
                this.plumbIns.deleteEveryConnection()
                this.plumbIns.deleteEveryEndpoint()
                this.plumbIns.reset();
            }
            ,
            selectScene(obj) {
                let that = this;

                let index = that.selectCondition.indexOf(that.form.dataSceneList)

                if (index !== -1) {
                    that.selectCondition.splice(index);
                }

                that.form.dataSceneList = obj.dataName;
                that.selectCondition.push(obj.dataName);

                this.plumbIns.reset();
                this.plumbIns.deleteEveryConnection()
                this.plumbIns.deleteEveryEndpoint()
                this.plumbIns.reset();
                this.getDetail(obj.dataName)

            }
            ,
            jump() {
                let _that = this
                this.plumbIns.ready(function () {
                    _that.plumbIns.reset();
                    _that.plumbIns.deleteEveryConnection()
                    _that.plumbIns.deleteEveryEndpoint()
                    _that.plumbIns.reset();
                    //数据采集
                    if (_that.sjcjDataIndex.length > 0) {
                        _that.plumbIns.addEndpoint('item_sjcj_start', {
                            anchors: ['Right'],
                            uuid: 'toId',
                            endpoint: 'Blank',
                        })

                        _that.plumbIns.addEndpoint('item_sjcj_end', {
                            anchors: ['Left'],
                            uuid: 'fromId',
                            endpoint: 'Blank'
                        })
                    }

                    //数据更新
                    _that.plumbIns.addEndpoint('item_sjgx_start', {
                        anchors: ['Right'],
                        uuid: 'tosjgxId',
                        endpoint: 'Blank',
                    })

                    _that.plumbIns.addEndpoint('item_sjgx_end', {
                        anchors: ['Left'],
                        uuid: 'fromsjgxId',
                        endpoint: 'Blank'
                    })

                    // //数据入库
                    _that.plumbIns.addEndpoint('item_rkzt_start', {
                        anchors: ['Left'],
                        uuid: 'torkztId',
                        endpoint: 'Blank',
                    })
                    _that.plumbIns.addEndpoint('item_rkzt_end', {
                        anchors: ['Right'],
                        uuid: 'fromrkztId',
                        endpoint: 'Blank'
                    })

                    if (_that.sjyyDataIndex.length > 0) {
                        // //数据应用
                        _that.plumbIns.addEndpoint('item_sjyy_start', {
                            anchors: ['Left'],
                            uuid: 'tosjyyId',
                            endpoint: 'Blank',
                        })
                        _that.plumbIns.addEndpoint('item_sjyy_end', {
                            anchors: ['Right'],
                            uuid: 'fromsjyyId',
                            endpoint: 'Blank'
                        })
                    }

                    if (_that.sjcjDataIndex.length > 0) {
                        _that.plumbIns.connect({
                            uuids: ['toId', 'fromId'],
                            paintStyle: {stroke: '#5881F7', strokeWidth: 1},
                            connector: ['Flowchart', {
                                // stub: [10, 20],
                                gap: 2,
                                cornerRadius: 15,
                                alwaysRespectStubs: false
                            }],
                            overlays: [['Arrow', {width: 8, length: 8, location: 1}],
                                ['Label', {
                                    label: '<div style="background: #5881F7;border-radius: 50%;width: 6px;height: 6px;"></div>',
                                    cssClass: '',
                                    labelStyle: {
                                        color: 'red'
                                    }, location: 0
                                }]
                            ]
                        })
                    }

                    _that.plumbIns.connect({
                        uuids: ['tosjgxId', 'fromsjgxId'],
                        paintStyle: {stroke: '#5881F7', strokeWidth: 1},
                        connector: ['Flowchart', {
                            // stub: [10, 20],
                            gap: 2,
                            cornerRadius: 15,
                            alwaysRespectStubs: false
                        }],
                        overlays: [['Arrow', {width: 8, length: 8, location: 1}],
                            ['Label', {
                                label: '<div style="background: #5881F7;border-radius: 50%;width: 6px;height: 6px;"></div>',
                                cssClass: '',
                                labelStyle: {
                                    color: 'red'
                                }, location: 0
                            }]
                        ]
                    })
                    _that.plumbIns.connect({
                        uuids: ['torkztId', 'fromrkztId'],
                        paintStyle: {stroke: '#5881F7', strokeWidth: 1},
                        connector: ['Flowchart', {
                            // stub: [10, 20],
                            gap: 2,
                            cornerRadius: 15,
                            alwaysRespectStubs: false
                        }],
                        overlays: [['Arrow', {width: 8, length: 8, location: 1}],
                            ['Label', {
                                label: '<div style="background: #5881F7;border-radius: 50%;width: 6px;height: 6px;"></div>',
                                cssClass: '',
                                labelStyle: {
                                    color: 'red'
                                }, location: 0
                            }]
                        ]
                    })
                    if (_that.sjyyDataIndex.length > 0) {
                        _that.plumbIns.connect({
                            uuids: ['tosjyyId', 'fromsjyyId'],
                            paintStyle: {stroke: '#5881F7', strokeWidth: 1},
                            connector: ['Flowchart', {
                                // stub: [10, 20],
                                gap: 2,
                                cornerRadius: 15,
                                alwaysRespectStubs: false
                            }],
                            overlays: [['Arrow', {width: 8, length: 8, location: 1}],
                                ['Label', {
                                    label: '<div style="background: #5881F7;border-radius: 50%;width: 6px;height: 6px;"></div>',
                                    cssClass: '',
                                    labelStyle: {
                                        color: 'red'
                                    }, location: 0
                                }]
                            ]
                        })
                    }
                })
            }
            ,
            pageUp(type) {
                //type=1 数据采集向上翻页 type=2
                if (type == 1) {
                    if (this.sjcjPageCurrent > 0) {
                        this.sjcjPageCurrent--;
                        var start = 3 * this.sjcjPageCurrent
                        var end = 3 * this.sjcjPageCurrent + 3
                        this.sjcjDataIndex = this.sjcjData.slice(start, end);
                    }
                }
            }
            ,
            pageDown(type) {
                //type=1 数据采集向上翻页 type=2
                if (type == 1) {
                    if ((3 * this.sjcjPageCurrent + 3) >= this.sjcjData.length) {
                        return
                    } else {
                        this.sjcjPageCurrent++;
                        var start = 3 * this.sjcjPageCurrent
                        var end = 3 * this.sjcjPageCurrent + 3
                        this.sjcjDataIndex = this.sjcjData.slice(start, end);
                    }
                }
            }
        }
    }
    ;
</script>
<style scoped lang="less">
    .echarts {
        width: 100%;
        height: 100%;
    }

    .colorGreen {
        color: #306837
    }

    .colorGreenLight {
        color: #EFF6EF
    }

    .colorRed {
        color: #4A666C
    }

    .colorRedLight {
        color: #ECF2F2
    }

    .boderClass {
        border-bottom: 1px solid #EBEEF5;
    }

    .ueditorHtml {
        padding: 20px;
    }

    /deep/ .ueditorHtml img {
        max-width: 100% !important;
    }

    .demo {
        background: red;
        border-radius: 50%;
        width: 10px;
        height: 10px;
    }

    .qltbody {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
    }

    .linkTitle {
        text-align: center;
        height: 28px;
        font-weight: 600;
        color: #333333;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 5px;
    }

    .linkDesc {
        margin: 0 auto;
        text-align: center;
        width: 402px;
        font-size: 14px;
        color: #666666;
        line-height: 20px;
    }

    .processTitle {
        margin: 0 auto;
        text-align: center;
        width: 184px;
        height: 40px;
        line-height: 40px;
        color: white;
        position: relative;
        z-index: 10000;
        background: linear-gradient(90deg, #5B82F8 0%, #3A62F4 100%);
        border-radius: 6px;
    }

    .processItemTitle {
        width: 238px;
        margin-left: 20px;
        margin-right: 20px;
        font-weight: 400;
        color: #333333;
        font-size: 14px;
        line-height: 24px;
    }

    .process {
        margin-left: 26px;
        margin-right: 26px;
        margin-top: -20px;
        border-radius: 7px;
        border: 2px dashed #BBC6F2;
        padding-top: 25px;
        padding-bottom: 20px;
        text-align: left;
    }

    .bgGreen {
        background: #fff;
        border: 2px dashed #AAD2AF;
        padding: 12px;
        padding-top: 2px;
        padding-bottom: 12px;
    }

    .greenInner {
        background: #EFF6EF;
        border-radius: 2px;
        padding: 12px;
        text-align: left;
        margin-top: 10px;
    }

    .greenItem {
        color: #306837;
        line-height: 24px;
        font-weight: 400;
    }

    .greenItemTitle {
        font-weight: 600;
        display: inline;
    }

    .bgYellow {
        background: #fff;
        border: 2px dashed #FFDBA6;
        padding: 12px;
        padding-top: 2px;
    }

    .yellowInner {
        background: #FFF9F0;
        border-radius: 2px;
        padding: 12px;
        text-align: left;
        margin-top: 10px;
    }

    .yellowItem {
        color: #D9860F;
        line-height: 24px;
        font-weight: 400;
    }

    .yellowItemTitle {
        font-weight: 600;
        display: inline;
    }

    .bgRed {
        background: #fff;
        border: 2px dashed #FFA6A6;
        padding: 12px;
        padding-top: 2px;
    }

    .redInner {
        background: #FFF4F2;
        border-radius: 2px;
        padding: 12px;
        text-align: left;
        margin-top: 10px;
    }

    .redItem {
        color: #D95858;
        line-height: 24px;
        font-weight: 400;
    }

    .redItemTitle {
        font-weight: 600;
        display: inline;
    }

    .bgGray {
        background: #fff;
        border: 2px dashed #AACBD2;
        padding: 12px;
        padding-top: 2px;
        padding-bottom: 12px;
    }

    .grayInner {
        background: #ECF2F2;
        border-radius: 2px;
        padding: 12px;
        text-align: left;
        margin-top: 10px;
    }

    .grayItem {
        color: #4A666C;
        line-height: 24px;
        font-weight: 400;
    }

    .grayItemTitle {
        font-weight: 600;
        display: inline;
    }

    .upList {
        border-radius: 50%;
        background-color: rgba(31, 45, 61, .11);
        width: 36px;
        line-height: 36px;
        color: #fff;
        height: 36px;
    }

    .upList:hover {
        background-color: rgba(31, 45, 61, .23);
    }

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
                    }

                    display: flex;

                    &:not(:last-child) {
                        /*margin-bottom: 20px;*/
                    }

                    align-items: baseline;

                    .condition_item_list {
                        flex: 1;
                        /*margin-bottom: 10px;*/
                        /*min-height: 35px;*/

                        span {
                            /*margin: 0 10px;*/
                            display: inline-block;
                            cursor: pointer;
                            padding: 3px 15px;
                            /*margin-bottom: 10px;*/

                            &.active {
                                background-color: #2362ED;
                                color: #FFF;
                                border-radius: 13px;
                            }

                            &.active2 {
                                /*background-color: #2362ED;*/
                                color: #2362ED;
                                font-weight: 600;
                            }
                        }
                    }

                    .condition_item_list1 {
                        flex: 1;
                        /*margin-bottom: 10px;*/
                        /*min-height: 35px;*/

                        span {
                            display: inline-block;
                            cursor: pointer;
                            padding: 0px 15px;
                            line-height: 32px;
                            height: 32px;

                            &.active1 {
                                font-weight: bolder;
                                background-color: #F4F6FC;
                                color: #2362ED;
                                border-radius: 13px 13px 0px 0px;
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
                        flex: 1;

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

                .item_top {
                    border-bottom: 1px solid #EEEEEE;
                    padding: 0 30px 20px 40px;

                    .article_title {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 15px;

                        .title {
                            font-size: 16px;
                            font-weight: 600;
                            cursor: pointer;
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
</style>