<template>
    <div class="">
        <el-dialog :close-on-click-modal="clickclose" title="数据应用" width="950px" @close="clearFormData"
                   :append-to-body="true"
                   v-if="dialogVisible" :visible.sync="dialogVisible">
            <div>
                <!-- 表格区 -->
                <div class="table-area">
                    <el-table
                            ref="elTable"
                            :data="tableData.records"
                            style="width: 100%"
                            border
                            :height="screenWidth"
                            stripe
                            size="mini"
                            :cell-class-name="rowClass"
                            header-row-class-name="tableHeaderStyle"
                            :cell-style="{height:'35px',padding:'0px 0px'}"
                            :header-cell-style="{background:'#f8f8f9'}">
                        <el-table-column
                                label="序号"
                                align="center"
                                type="index"
                                width="70">
                            <template slot-scope="scope">
                                <span>{{scope.$index+(copyQuery.page - 1) * copyQuery.pageSize + 1}} </span>
                            </template>
                        </el-table-column>
                        <template v-for="(item,index) in tableHead">
                            <el-table-column
                                    v-if="item.prop == 'dataApplyServiceList'"
                                    :prop="item.prop"
                                    :label="item.label"
                                    :align="item.align"
                                    :min-width="item.minWidth">
                                <template slot-scope="scope">
                                    <div v-for="(item1,index1) in scope.row.dataApplyServiceList"
                                         :title='item1.serviceContent'
                                         :class="{'boderClass':(index1 != (scope.row.dataApplyServiceList.length - 1))}"
                                         style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-top: 3px;padding-bottom: 3px">
                                        【{{item1.serviceState}}】{{item1.serviceContent}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    v-else
                                    show-overflow-tooltip
                                    :prop="item.prop"
                                    :label="item.label"
                                    :align="item.align"
                                    :min-width="item.minWidth"
                            >
                                <!--<template slot-scope="scope">-->
                                <!--<div style="padding-top: 3px;padding-bottom: 3px;margin-left: 10px;margin-right: 10px">-->
                                <!--{{scope.row[item.prop]}}-->
                                <!--</div>-->
                                <!--</template>-->
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
                <!-- 分页区 -->
                <div class="sysPage">
                    <pagination
                            v-show="Number(tableData.total)>0"
                            :total="Number(tableData.total)"
                            :page.sync="copyQuery.page"
                            :limit.sync="copyQuery.pageSize"
                            @pagination="getPageQuery"
                            :page-sizes="([10])"
                            :page-size="(10)"
                    />
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Pagination from '@/components/common/Pagination';
    import {getDataApplyPage} from '@/api/dataCatalog';

    export default {
        name: "NewAddUser",
        components: {Pagination},
        props: [],
        data() {
            return {
                screenWidth: ((window.innerWidth <= 1366) ? '250px' : '480px'),
                dialogVisible: false,
                clickclose: false,
                tableData: {
                    total: 0,
                    records: [],
                },
                page: {
                    current: 1,
                    size: 10
                },
                requestform: {
                    dataId: '',
                    page: 1,
                    pageSize: 10,
                },
                copyQuery: {
                    dataId: '',
                    page: 1,
                    pageSize: 10,
                },
                tableHead: [
                    {prop: 'applicationDirection', label: '应用方向', align: 'center', minWidth: '100'},
                    {prop: 'objectType', label: '服务对象类型', align: 'center', minWidth: '100'},
                    {prop: 'objectName', label: '服务对象名称', align: 'center', minWidth: '100'},
                    {prop: 'projectName', label: '项目名称', align: 'center', minWidth: '250'},
                    {prop: 'projectYear', label: '项目年度', align: 'center', minWidth: '100'},
                    {prop: 'projectSource', label: '项目来源', align: 'center', minWidth: '100'},
                    {prop: 'dataApplyServiceList', label: '应用模式', align: 'center', minWidth: '300'},
                    {prop: 'technology', label: '应用技术', align: 'center', minWidth: '200'},
                    {prop: 'cost', label: '数据应用成本（万元）', align: 'center', minWidth: '150'},
                    {prop: 'link', label: '链接', align: 'center', minWidth: '100'},
                    {prop: 'directors', label: '负责人', align: 'center', minWidth: '100'},
                    {prop: 'contractAmount', label: '合同额（万元）', align: 'center', minWidth: '120'},
                ],
                form: {
                    code: '',//门户端/管理端： portal/manager
                    roleId: '',
                    departmentId: '',
                    loginName: '',
                    name: '',
                    tel: '',
                    email: '',
                },
                rules: {},
                options: [],
                departmentOptions: []
            };
        },
        mounted() {

        },
        methods: {
            rowClass({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 7) {
                    return 'rgb196'
                }
            },
            // 默认执行的方法 设置dialog显示
            defaultfunc(id) {
                this.dialogVisible = true;
                this.requestform.dataId = id
                this.copyQuery.dataId = id

                this.getPageQuery()
            },
            getPageQuery() {
                this.getTableData(this.copyQuery)
            },
            getTableData(obj) {
                getDataApplyPage(obj).then((res) => {
                    this.tableData.total = res.data.count;
                    this.tableData.records = res.data.list;
                })
            },
            // 关闭dialog弹窗
            clearFormData() {
                this.tableData = {
                    total: 0,
                    records: [],
                };
                this.dialogVisible = false;
            }
        },
    }
</script>

<style lang="scss">

    /deep/ .el-dialog .el-dialog__body {
        /*flex: 1;*/
        overflow: auto;
    }

    .el-dialog__body {
        height: 400px;
        overflow: auto;
    }
    @media screen and (min-width: 1367px) {
        .el-dialog__body {
            height: 600px;
            overflow: auto;
        }
    }


    .el-form-item {
        margin-bottom: 20px;
    }

    .dropSelect .el-scrollbar__wrap {
        overflow: auto;
    }

    .el-dialog__header {
        font-size: 14px;
        font-weight: bold;
        line-height: 54px;
        padding: 0 20px;
        border-bottom: 1px solid #EBEEF5;
    }


    .boderClass {
        border-bottom: 1px solid #EBEEF5;
    }

    .rgb196 .cell {
        padding-left: 0px !important;
        padding-right: 0px !important;;
    }

    /*.el-table .cell {*/
    /*overflow: inherit;*/
    /*}*/

    /*td*/
    /*{*/
    /*white-space: nowrap;*/
    /*}*/
</style>
