<template>
    <div class="main-container">
        <div class="calalogDetail_content">
            <div class="detail_top">
                <div class="img_title">
                    <div class="flex_box" style="margin-left: 40px;">
                        <img src="@/assets/dataCatalog/编组 9@2x.png" alt="" width="85px">
                        <div class="info">
                            <div class="title">{{detailObj.dataName}}</div>
                            <div class="flex_box" style="color: #666666">
                                <img src="@/assets/dataCatalog/眼睛@2x (1).png" alt="" width="16px">
                                <span style="margin: 0 10px">查看数量</span>
                                <span>{{detailObj.viewNum}}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="@/assets/dataCatalog/位图@2x.png" alt="" width="275px">
                    </div>
                </div>
                <div class="tab_title">
                    <div class="tab_title_item" v-bind:class="{'active': tab_flag === 1}" @click="tabChange(1)">
                        <i class="iconfont iconbianzubeifen"></i>
                        基本信息
                    </div>
                    <div class="tab_title_item" @click="tabChange(2)" v-bind:class="{'active': tab_flag === 2}">
                        <i class="iconfont iconceshiyongliziji"></i>
                        数据样例
                    </div>
                    <div class="tab_title_item" @click="tabChange(3)" v-bind:class="{'active': tab_flag === 3}">
                        <i class="iconfont iconshuju"></i>
                        数据获取
                    </div>
                </div>
                <div style="position: absolute;right: 10px;bottom: 10px;"><el-button size="small" @click="goback">返回上一页</el-button></div>
            </div>
            <div class="detail_bottom" v-if="tab_flag === 1">
                <div class="data_desc">
                    <div>
                        <span class="bold_title">数据简介</span>
                        <span>{{detailObj.dataDes}}</span>
                    </div>
                    <div>
                        <span class="bold_title">主要字段</span>
                        <span>{{detailObj.fieldCname}}</span>
                    </div>
                </div>
                <div class="data_table">
                    <div class="data_table_tr">
                        <div class="odd_td">数据主题</div>
                        <div class="even_td" :title="detailObj.dataTheme">{{detailObj.dataTheme}}</div>
                        <div class="odd_td">开始建设时间</div>
                        <div class="even_td" :title="detailObj.dateCreatetime">{{detailObj.dateCreatetime}}</div>
                    </div>
                    <div class="data_table_tr">
                        <div class="odd_td">应用场景</div>
                        <div class="even_td" :title="detailObj.dataScene">{{detailObj.dataScene}}</div>
                        <div class="odd_td">最新更新时间</div>
                        <div class="even_td" :title="detailObj.dateUpdatetime">{{detailObj.dateUpdatetime}}</div>
                    </div>
                    <div class="data_table_tr">
                        <div class="odd_td">数据格式</div>
                        <div class="even_td" :title="detailObj.dataFormat">{{detailObj.dataFormat}}</div>
                        <div class="odd_td">数据规模</div>
                        <div class="even_td" :title="detailObj.dataVolume">{{detailObj.dataVolume}}</div>
                    </div>
                    <div class="data_table_tr">
                        <div class="odd_td">数据类型</div>
                        <div class="even_td" :title="detailObj.dataType">{{detailObj.dataType}}</div>
                        <div class="odd_td">数据来源</div>
                        <div class="even_td" :title="detailObj.dataSource">{{detailObj.dataSource}}</div>
                    </div>
                    <div class="data_table_tr">
                        <div class="odd_td" style="border-bottom: 1px solid #eee">主建设科室</div>
                        <div class="even_td" :title="detailObj.constructionMain" style="border-bottom: 1px solid #eee">{{detailObj.constructionMain}}</div>
                        <div class="odd_td" style="border-bottom: 1px solid #eee"></div>
                        <div class="even_td" style="border-bottom: 1px solid #eee"></div>
                    </div>
                </div>
            </div>
            <div class="detail_bottom" v-if="tab_flag === 2">
                <div style="display: flex">
                    <div style="width: 200px;margin-right: 10px">
                        <div class="left_menu_file" :class="{active: index === Index}" v-for="(item,index) in detailObj.fileList" @click="changeFile(item, index)">附件{{num((index + 1) + '')}}</div>
                    </div>
                    <div style="width: calc(100% - 200px)">
                        <img :src="pic" alt="" v-if="fileType==='image'" class="fileImage">
                        <video class="" tabindex="2" mediatype="video" crossorigin="anonymous" v-if="fileType==='mp4'" :src="videoSrc" controls></video>
                        <div class="table-html-wrap" style="height: calc(100vh - 416px);" v-html="tableHtml" v-if="fileType==='excel'"></div>
                        <pdf :url="pdfsrc" v-if="fileType==='pdf'"></pdf>
                    </div>
                </div>
            </div>
            <div class="detail_bottom" v-if="tab_flag === 3">
                <el-form :model="form" ref="form" label-width="100px" style="width: 60%;margin: 0 auto;padding-top: 20px" :rules="rules">
                    <el-form-item label="数据名称" prop="dataName">
                        <el-input v-model="form.dataName" autocomplete="off" maxlength="80"></el-input>
                    </el-form-item>
                    <el-form-item label="需求及用途" prop="dataPurpose">
                        <el-input v-model="form.dataPurpose" autocomplete="off" maxlength="80" type="textarea" :rows="5"></el-input>
                    </el-form-item>
                    <el-form-item label="所属科室" prop="dataUnit">
                        <el-input v-model="form.dataUnit" autocomplete="off" maxlength="80"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="linkman">
                        <el-input v-model="form.linkman" autocomplete="off" maxlength="80"></el-input>
                    </el-form-item>
                    <el-form-item></el-form-item>
                </el-form>
                <div class="info">
                    <div class="catalog_title">
                        <img src="@/assets/dataCatalog/编组 4@2x.png" alt="" width="39px">
                        <span>数据权属说明</span>
                        <img src="@/assets/dataCatalog/编组 4备份1@2x.png" alt="" width="39px">
                    </div>
                    <div class="info_text">本项数据所有权归中汽数据所有。</div>
                    <div class="info_text">对获取的平台数据信息，获取方应尽到妥善保管并负保密义务，未经过数据建设部门同意，不得向第三方公开、披露、透露，并采取合理措施防止数据信息泄露。</div>
                </div>
                <div style="text-align: center;margin-top: 20px;padding-bottom: 20px">
                    <el-button type="primary" style="width: 110px;background-color: #4468E6" @click="submitApplys">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getDataDetail, submitApply, downloadFile, previewExcel} from '@/api/dataCatalog'
    import XLSX from 'xlsx'
    import pdf from '@/views/pdf/index'

    export default {
        name: '',
        components: {pdf},
        props: {},
        data() {
            return {
                tab_flag: 1,
                form: {
                    dataName: '',
                    dataPurpose: '',
                    dataUnit: '',
                    linkman: ''
                },
                rules: {
                    dataName: [{required: true, message: '请输入数据名称', trigger: 'blur'}],
                    dataPurpose: [{required: true, message: '请输入需求及用途', trigger: 'blur'}],
                    dataUnit: [{required: true, message: '请输入所属科室', trigger: 'blur'}],
                    linkman: [{required: true, message: '请输入联系人', trigger: 'blur'}]
                },
                dataId: '',
                detailObj: {},
                pic: '',
                fileType: '',
                videoSrc: '',
                tableHtml: '',
                pdfsrc: '',
                Index: 0
            };
        },
        computed: {},
        watch: {},
        created() {

        },
        mounted() {
            this.dataId = this.$route.query.id;
            this.getDataDetail();
        },
        methods: {
            tabChange(type) {
                this.tab_flag = type;
            },
            getDataDetail() {
                getDataDetail(this.dataId).then((res) => {
                    this.detailObj = res.data;
                    if (res.data.fileList && res.data.fileList.length > 0) {
                        this.showFile(res.data.fileList[0]);
                    }
                })
            },
            showFile(item){
                if (item.type === 'png' || item.type === 'jpg') {
                    this.fileType = 'image';
                    this.downloadFile(item.id)
                } else if (item.type === 'mp4') {
                    this.fileType = item.type;
                    this.videoSrc = '/vehiclebigdata/Files' + item.path;
                } else if (item.type === 'xls' || item.type === 'xlsx') {
                    this.fileType = 'excel';
                    this.previewExcel(item.id);
                } else if (item.type === 'pdf') {
                    this.fileType = 'pdf';
                    this.pdfsrc = '/vehiclebigdata/Files' + item.path;
                }
            },
            downloadFile(id) {
                downloadFile(id).then(res => {
                    this.pic = window.URL.createObjectURL(res.data)
                })
            },
            previewExcel(id) {
                previewExcel(id).then(res => {
                    let data = new Uint8Array(res);
                    let workbook = XLSX.read(data, {
                        type: 'array'
                    })
                    this.tableToHtml(workbook)
                })
            },
            tableToHtml: function(workbook) {
                let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                let innerHTML = XLSX.utils.sheet_to_html(worksheet);
                this.tableHtml = innerHTML;
            },
            submitApplys() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        submitApply(this.form).then((res) => {
                            this.$message.success("提交成功")
                        })
                    }
                });
            },
            num(n) {
                if (!/(^[1-9]\d*$)/) {
                    return '非法数字';
                }
                let uppercase = '千百亿千百十万千百十个';
                let nLength = n.length;
                let newStr = '';
                if (uppercase.length - nLength < 0) {
                    return '数字过长';
                }
                uppercase = uppercase.substr(uppercase.length - nLength);
                for (let i = 0; i < nLength; i++) {
                    newStr += '零一二三四五六七八九'.charAt(n[i]) + uppercase.charAt(i);
                };
                newStr = newStr.substr(0, newStr.length - 1);
                return newStr;
            },
            changeFile(item, index){
                this.Index = index;
                this.showFile(item);
            },
            goback(){
                this.$store.commit("SET_FLAG", true);
                this.$router.push('/catalogList')
            }
        },
    };
</script>

<style scoped lang="less">
    .main-container {
        width: 100%;
        font-size: 14px;
        color: #333;

        .calalogDetail_content {
            width: 1200px;
            margin: 15px auto;

            .detail_top {
                background-color: #FFF;
                position: relative;
                .img_title {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0;

                    .flex_box {
                        display: flex;
                        align-items: center;

                        .info {
                            font-size: 12px;
                            color: #333;
                            margin-left: 20px;

                            .title {
                                font-size: 20px;
                                font-weight: 600;
                                margin-bottom: 10px;
                            }
                        }
                    }
                }

                .tab_title {
                    display: flex;
                    justify-content: center;
                    border-top: 1px solid #eeeeee;
                    height: 48px;

                    i {
                        margin-right: 3px;
                    }

                    .tab_title_item {
                        &:not(:last-child) {
                            margin-right: 80px;
                        }

                        height: 100%;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                    }

                    .active {
                        color: #2A6BEF;
                        border-bottom: 5px solid #2A6BEF;
                    }
                }
            }

            .detail_bottom {
                background-color: #FFF;
                margin-top: 10px;
                padding: 10px;

                img.fileImage {
                    width: 100%;
                }

                video {
                    width: 100%;
                }

                .left_menu_file{
                    margin-bottom: 10px;
                    padding: 10px;
                    cursor: pointer;
                }
                .left_menu_file.active{
                    color: #FFF;
                    background-color: #2d8cf0;
                }

                .data_desc {
                    padding: 15px 48px;

                    .bold_title {
                        font-weight: 600;
                        margin-right: 10px;
                    }

                    > div {
                        margin-bottom: 10px;
                    }
                }

                .data_table {
                    .data_table_tr {
                        display: flex;
                    }

                    .odd_td {
                        height: 45px;
                        width: 160px;
                        background-color: #FAFAFA;
                        border: 1px solid #E5E9F2;
                        border-bottom: none;
                        border-right: none;
                        text-align: center;
                        line-height: 45px;
                        font-weight: 600;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .even_td {
                        flex: 1 1 auto;
                        border: 1px solid #E5E9F2;
                        border-bottom: none;

                        &:not(:last-child) {
                            border-right: none;
                        }

                        width: 440px;
                        line-height: 45px;
                        height: 45px;
                        padding-left: 10px;
                        box-sizing: border-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .info {
                    width: 60%;
                    margin: 0 auto;
                    color: #666666;
                    font-size: 12px;
                    background: rgba(190, 193, 197, 0.1);
                    padding: 10px 50px;

                    .catalog_title {
                        text-align: center;

                        span {
                            margin: 0 20px;
                        }

                        img {
                            vertical-align: text-bottom;
                        }
                    }

                    .info_text {
                        text-indent: 2em;
                        white-space: pre-wrap;
                    }
                }
            }

        }
    }

    .table-html-wrap{
        overflow-y: auto;
    }

    .table-html-wrap /deep/ table {
        border-right: 1px solid  #e8eaec;
        border-bottom:1px solid  #e8eaec;
        border-collapse: collapse;
        margin: auto;
    }

    .table-html-wrap /deep/ table td {
        border-left: 1px solid  #e8eaec;
        border-top: 1px solid  #e8eaec;
        /*white-space: nowrap;*/
        text-align: center;
        padding: .5rem;
        max-width: 300px;
        min-width: 200px;
    }

    .table-html-wrap /deep/ tbody tr:nth-of-type(1) {
        /*font-weight: bold;*/
        font-size: 20px;
    }

</style>
