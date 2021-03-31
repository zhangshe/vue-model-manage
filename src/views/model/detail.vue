<template>
  <div>
    <div class="navbar">
      <!-- <div style="margin:10px;float:left;">
        <div style="height:80px;width:100%;margin-left:5%;background-color:#FFF">
          <img style="height:80px;" src="@/assets/images/logo.png">
        </div>
      </div> -->
      <h2 style="color:#fff;float:left;line-height: 45px;margin-left: 5%;">中汽数据模型管理系统</h2>
      <div class="verticalBar" />
      <h4 style="color:#CCC;float:left;line-height: 43px;">模型详情</h4>
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
    <div>
      <el-row>
        <el-col :span="20" :offset="2" style="margin-top:1%;margin-bottom:2%;">
          <label style="font-size:24px;color:#3A5E9D;margin-top:1%;">{{ modelForm.ModelName }}</label>
          <el-row style="margin-top:1%;">
            <el-col :span="10">
              <img style="float:left;width:32px;height:32px;" src="@/assets/images/clock.png">
              <div
                style="
                display: flex;
                align-items: center;
                text-align: justify;
                width: 80%;
                float: left;
                height: 32px;
                font-size:20px;"
              >
                <span style="margin-left:5px;">更新时间：</span>
                <span> {{ modelForm.UpdateTime | parseTime }} </span>
              </div>
            </el-col>
            <el-col :span="7">
              <img style="float:left;width:32px;height:32px;" src="@/assets/images/visit.png">
              <div
                style="
                display: flex;
                align-items: center;
                text-align: justify;
                width: 80%;
                float: left;
                height: 32px;
                font-size:20px;"
              >
                <span style="margin-left:5px;">访问量：</span>
                <span> {{ modelForm.ViewNum }} 次 </span>
              </div>
            </el-col>
            <el-col :span="7">
              <img style="float:left;width:32px;height:32px;" src="@/assets/images/download.png">
              <div
                style="
                display: flex;
                align-items: center;
                text-align: justify;
                width: 80%;
                float: left;
                height: 32px;
                font-size:20px;"
              >
                <span style="margin-left:5px;">调用量：</span>
                <span> {{ modelForm.DownloadNum }} 次 </span>
              </div>
            </el-col>
          </el-row>
          <hr>
          <el-row v-if="modelForm.ModelType===0">
            <div style="margin:1.5% 0px;"><label style="font-size:22px;">基本信息</label></div>
            <el-col :span="14" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">模型简介：</label>
              </el-col>
              <el-col :span="18" :pull="1">
                <span style="font-size:16px;font-weight:500;">{{ modelForm.Introduction }}</span>
              </el-col>
            </el-col>
            <el-col :span="10" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">模型类型：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{
                  modelForm.ModelType | parseType
                }}</span>
              </el-col>
            </el-col>
            <el-col :span="14" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">应用场景：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:500;">{{ modelForm.Scene }}</span>
              </el-col>
            </el-col>
            <el-col :span="10" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">GUID：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span id="model_description.guid" style="font-size:16px;font-weight:100;" />
              </el-col>
            </el-col>
            <el-col :span="14" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">FMI版本：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span id="model_description.fmi_version" style="font-size:16px;font-weight:100;" />
              </el-col>
            </el-col>
            <el-col :span="10" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">作者：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span id="model_description.author" style="font-size:16px;font-weight:100;" />
              </el-col>
            </el-col>
            <el-col :span="14" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">生成工具：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span id="model_description.generation_tool" style="font-size:16px;font-weight:100;" />
              </el-col>
            </el-col>
            <el-col :span="10" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">生成时间：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span id="model_description.generation_date_and_time" style="font-size:16px;font-weight:100;" />
              </el-col>
            </el-col>
          </el-row>
          <el-row v-if="modelForm.ModelType===1">
            <div style="margin:1.5% 0px;"><label style="font-size:22px;">基本信息</label></div>
            <el-col :span="14" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;display:inline-block;text-align:right;">模型简介：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{ modelForm.Introduction }}</span>
              </el-col>
            </el-col>
            <el-col :span="10" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">模型类型：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{
                  modelForm.ModelType | parseType
                }}</span>
              </el-col>
            </el-col>
            <el-col :span="14" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">应用场景：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{ modelForm.Scene }}</span>
              </el-col>
            </el-col>
            <el-col :span="10" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">GUID：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{ JSON.parse(modelForm.ApiDescribe)===null?"":JSON.parse(modelForm.ApiDescribe).Guid }}</span>
              </el-col>
            </el-col>
            <el-col :span="14" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">API版本：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{ JSON.parse(modelForm.ApiDescribe)===null?"":JSON.parse(modelForm.ApiDescribe).Version }}</span>
              </el-col>
            </el-col>
            <el-col :span="10" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">作者：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{ JSON.parse(modelForm.ApiDescribe)===null?"":JSON.parse(modelForm.ApiDescribe).Author }}</span>
              </el-col>
            </el-col>
            <el-col :span="14" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">生成工具：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{ JSON.parse(modelForm.ApiDescribe)===null?"":JSON.parse(modelForm.ApiDescribe).GenerationTool }}</span>
              </el-col>
            </el-col>
            <el-col :span="10" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="5" :pull="1" style="text-align:right;">
                <label style="width:128px;font-weight:500;text-align:right;">生成时间：</label>
              </el-col>
              <el-col :span="18" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{ JSON.parse(modelForm.ApiDescribe)===null?"":JSON.parse(modelForm.ApiDescribe).CreateTime }}</span>
              </el-col>
            </el-col>
            <el-col :span="24" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="3" :pull="1" style="text-align:right;margin-left:1.5%;">
                <label style="width:128px;font-weight:500;text-align:right;">输入数据样例：</label>
              </el-col>
              <el-col :span="20" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{ modelForm.InputData }}</span>
              </el-col>
            </el-col>
            <el-col :span="24" style="font-size:18px;margin-bottom:1%;">
              <el-col :span="3" :pull="1" style="text-align:right;margin-left:1.5%;">
                <label style="width:128px;font-weight:500;text-align:right;">输出数据样例：</label>
              </el-col>
              <el-col :span="20" :pull="1" style="text-align:left;">
                <span style="font-size:16px;font-weight:100;">{{ modelForm.OutputData }}</span>
              </el-col>
            </el-col>
          </el-row>
          <el-row v-if="modelForm.ModelType===0">
            <div style="margin:1.5% 0px;"><label style="font-size:22px;">实验信息</label></div>
            <table class="pure-table pure-table-horizontal">
              <thead>
                <tr>
                  <th>开始时间</th>
                  <th>停止时间</th>
                  <th>相对容差</th>
                  <th>步长</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input id="model_description.default_experiment.startTime" class="form-control"></td>
                  <td><input id="model_description.default_experiment.stopTime" class="form-control"></td>
                  <td><input id="model_description.default_experiment.tolerance" class="form-control"></td>
                  <td><input id="model_description.default_experiment.stepSize" class="form-control"></td>
                </tr>
              </tbody>
            </table>
            <div style="margin:1.5% 0px;"><label style="font-size:22px;">模型变量信息</label></div>
            <table class="pure-table pure-table-horizontal">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>索引</th>
                  <th>描述</th>
                  <th>变量类别</th>
                  <th>初始化</th>
                  <th>可变性</th>
                  <th>值类型</th>
                  <th>模拟输入</th>
                </tr>
              </thead>
              <tbody id="model_description.model_variables" />
            </table>
          </el-row>
          <el-row v-if="modelForm.ModelType===0">
            <el-button style="width:200px;margin-bottom:1%;margin-top:1%;" type="warning" @click="InvokeClick()">线上调用</el-button>
            <el-link :underline="false" :href="fmuDemoUrl" target="_blank">
              <el-button style="width:200px;margin-bottom:1%;margin-top:1%;margin-left:5%" type="primary">远程调用</el-button>
            </el-link>
          </el-row>
          <el-row v-else>
            <el-button style="width:200px;margin-bottom:1%;margin-top:1%;" type="warning" @click="ApiClick()">线上调用</el-button>
            <el-link :underline="false" :href="APIDemoUrl" target="_blank">
              <el-button style="width:200px;margin-bottom:1%;margin-top:1%;margin-left:5%" type="primary">远程调用</el-button>
            </el-link>
          </el-row>
          <el-row v-if="modelForm.ModelType===0">
            <textarea id="msg" class="form-control" style="height:200px;" />
          </el-row>
          <el-row v-if="modelForm.ModelType===1">
            <iframe id="map" src="" scrolling="no" frameborder="0" style="width:100%;" />
          </el-row>
          <el-col :span="24" style="text-align:center;margin-top:1%;">
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
  addInvokeNum, PostInvokelog, getModelInfoById
} from '@/api/fmu'

export default {
  name: 'Detail',
  filters: {
    parseTime(value) {
      var dateee = new Date(value).toJSON()
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    },
    parseType(value) {
      if (value === 0) {
        return '.FMU'
      } else return '.API'
    }
  },
  data() {
    return {
      fmuDemoUrl: '/Downloads/fmuDemo.zip',
      APIDemoUrl: '/Downloads/PythonAPIModel.zip',
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
        ViewNum: 0,
        FileName: '',
        ApiDescribe: null,
        Port: '',
        SwaggerUrl: null
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

  },
  mounted() {
    window.onresize = function() {
      this.changeMapIframe()
    }
    var null2str = function(data) {
      if (data == null || data === 'null') {
        return ''
      } else {
        return data
      }
    }

    if (this.$route.query.moduleId !== null) {
      getModelInfoById({
        modelId: this.$route.query.moduleId
      }).then(response => {
        // this.paperInfoData = response.Data
        this.modelForm = response.Data
        if (response.Data.ModelType === 0) {
          this.$nextTick(() => {
            var rpc_address = process.env.VUE_APP_RPC_ADDRESS
            // eslint-disable-next-line no-undef
            var transport = new Thrift.TXHRTransport(rpc_address)
            // eslint-disable-next-line no-undef
            var protocol = new Thrift.TJSONProtocol(transport)
            // eslint-disable-next-line no-undef
            var client = new FmuServiceClient(protocol)
            var model_description = client.get_model_description(this.modelForm.GUID)
            // 模型基本信息
            for (const prop in model_description) {
              var _dom = document.getElementById('model_description.' + prop)
              if (_dom != null) {
                if (_dom === document.getElementById('model_description.generation_date_and_time')) {
                  _dom.innerHTML = this.parseTime(model_description[prop])
                } else {
                  _dom.innerHTML = model_description[prop]
                }
              }
            }

            // 默认实验信息
            for (const prop in model_description.default_experiment) {
              // eslint-disable-next-line no-redeclare
              var _dom = document.getElementById('model_description.default_experiment.' + prop)
              if (_dom != null) {
                _dom.value = model_description.default_experiment[prop]
              }
            }

            // 属性列表
            document.getElementById('model_description.model_variables').innerHTML = ''

            model_description.model_variables.sort(function(a, b) {
              return b.value_reference - a.value_reference
            })

            var typeTest = function(obj) {
              if (obj.integer_attribute != null) {
                return 'integer'
              } else if (obj.real_attribute != null) {
                return 'real'
              } else if (obj.string_attribute != null) {
                return 'string'
              } else if (obj.boolean_attribute != null) {
                return 'boolean'
              } else if (obj.enumeration_attribute != null) {
                return 'enumeration'
              } else {
                return '-'
              }
            }

            // eslint-disable-next-line no-array-constructor
            var input_params = new Array()
            // eslint-disable-next-line no-array-constructor
            var output_params = new Array()

            for (let i = 0; i < model_description.model_variables.length; i++) {
              var _var = model_description.model_variables[i]

              var attr_type = typeTest(_var.attribute)
              var objE = document.createElement('tr')
              objE.innerHTML = '<tr><td>' + _var.name + '</td>' +
            '<td>' + null2str(_var.value_reference) + '</td>' +
            '<td>' + null2str(_var.description) + '</td>' +
            '<td>' + null2str(_var.causality) + '</td>' +
            '<td>' + null2str(_var.initial) + '</td>' +
            '<td>' + null2str(_var.variability) + '</td>' +
            '<td>' + attr_type + '</td>'

              if (_var.causality === 'input') {
                var _onj = {}
                _onj.index = _var.value_reference
                _onj.name = _var.name
                _onj.type = attr_type
                input_params.push(_onj)

                objE.innerHTML += "<td><input id='" + _var.value_reference + "' class='form-control' value='" + 1 + "'/></td></tr>"
              } else if (_var.causality === 'output') {
                // eslint-disable-next-line no-redeclare
                var _onj = {}
                _onj.index = _var.value_reference
                _onj.name = _var.name
                _onj.type = attr_type
                output_params.push(_onj)
                objE.innerHTML += '<td>-</td></tr>'
              } else {
                objE.innerHTML += '<td>-</td></tr>'
              }

              document.getElementById('model_description.model_variables').insertBefore(objE, document.getElementById('model_description.model_variables').childNodes[0])
            }

            this.inputParams = input_params
            this.outParams = output_params
          })
        }
      })
    }
  },
  methods: {
    /**
            * iframe-宽高自适应显示
            */
    changeMapIframe() {
      const map = document.getElementById('map')
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      map.style.width = (Number(deviceWidth) - 240) + 'px' // 数字是页面布局宽度差值
      map.style.height = (Number(deviceHeight) + 764) + 'px' // 数字是页面布局高度差
    },
    parseTime(value) {
      var dateee = new Date(value).toJSON()
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    },
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
        var fmu_id = this.modelForm.GUID
        var input_params = this.inputParams
        var output_params = this.outParams
        if (response.RespCode === 1) {
          document.getElementById('msg').value = ''

          try {
            var rpc_address = process.env.VUE_APP_RPC_ADDRESS
            // eslint-disable-next-line no-undef
            var transport = new Thrift.TXHRTransport(rpc_address)
            // eslint-disable-next-line no-undef
            var protocol = new Thrift.TJSONProtocol(transport)
            // eslint-disable-next-line no-undef
            var client = new FmuServiceClient(protocol)
            var instance_id = client.create_instance(fmu_id)
            var start = document.getElementById('model_description.default_experiment.startTime').value
            var stop = document.getElementById('model_description.default_experiment.stopTime').value
            var tolerance = document.getElementById('model_description.default_experiment.tolerance').value
            var step_size = document.getElementById('model_description.default_experiment.stepSize').value

            status = client.setup_experiment(instance_id, start, stop, tolerance)
            status = client.enter_initialization_mode(instance_id)
            status = client.exit_initialization_mode(instance_id)

            var status = null
            var t = start

            for (var __i in input_params) {
              var _i = input_params[__i]
              var _v = document.getElementById(_i.index.toString()).value
              if (_i.type == 'integer') {
                client.write_integer(instance_id, [_i.index], [_v])
              } else if (_i.type == 'real') {
                client.write_real(instance_id, [_i.index], [_v])
              } else if (_i.type == 'string') {
                client.write_string(instance_id, [_i.index], [_v])
              } else if (_i.type == 'boolean') {
                client.write_boolean(instance_id, [_i.index], [_v.toLowerCase() == 'true'])
              } else if (_i.type == 'enumeration') {
                client.write_integer(instance_id, [_i.index], [_v])
              }
            }

            if (step_size == 0) {
              step_size = 1
            }

            var t0 = performance.now()

            var counter = 0

            while (t < stop) {
              if (counter++ > 1000) {
                document.getElementById('msg').value += '测试计算演示仅计算不超过1000步.\r\n'
                break
              }

              var _text = 'step=' + t + ':  '

              for (var __i in output_params) {
                var _i = output_params[__i]
                _text += _i.name + '='
                var _v = null
                if (_i.type == 'integer') {
                  _v = client.read_integer(instance_id, [_i.index])
                } else if (_i.type == 'real') {
                  _v = client.read_real(instance_id, [_i.index])
                } else if (_i.type == 'string') {
                  _v = client.read_string(instance_id, [_i.index])
                } else if (_i.type == 'boolean') {
                  _v = client.read_boolean(instance_id, [_i.index])
                } else if (_i.type == 'enumeration') {
                  _v = client.read_integer(instance_id, [_i.index])
                }
                _text += _v.value + ' ,'
              }

              _text = _text.substring(0, _text.length - 1)

              _text = _text + '\r\n'

              document.getElementById('msg').value += _text

              var result = client.step(instance_id, step_size)
              if (result.status != 0) {
                document.getElementById('msg').value += 'Step failed!\r\n'
                break
              }
              t = result.simulation_time
            }

            var t1 = performance.now()

            document.getElementById('msg').value += '用时:' + (t1 - t0) + ' ms.\r\n'
            status = client.terminate(instance_id)
          } catch (err) {
            document.getElementById('msg').value = err.message
          }
          this.modelForm.DownloadNum = parseInt(this.modelForm.DownloadNum) + 1
          this.modelForm.ViewNum = parseInt(this.modelForm.ViewNum) + 1
          // this.$forceUpdate()
          // 调用成功记录调用者IP 调用时间并入库
          const userip = localStorage.getItem('Ip')
          const time = new Date()
          console.log('detail.vue', userip, time, this.modelForm)
          PostInvokelog({
            ModelGUID: this.modelForm.GUID,
            InvokeIP: userip,
            InvokeTime: time,
            Invoker: '管理员',
            OrgID: this.modelForm.OrgID,
            OrgName: this.modelForm.OrgName,
            DeptID: this.modelForm.DeptID,
            DeptName: this.modelForm.DeptName
          })
        }
      })
    },
    ApiClick() {
      addInvokeNum({ moduleId: this.modelForm.ModelID }).then(response => {
        if (response.RespCode === 1) {
          const userip = localStorage.getItem('Ip')
          const time = new Date()
          this.modelForm.DownloadNum = parseInt(this.modelForm.DownloadNum) + 1
          this.modelForm.ViewNum = parseInt(this.modelForm.ViewNum) + 1
          console.log('detail.vue', userip, time, this.modelForm)
          PostInvokelog({
            ModelGUID: this.modelForm.GUID,
            InvokeIP: userip,
            InvokeTime: time,
            Invoker: '管理员',
            OrgID: this.modelForm.OrgID,
            OrgName: this.modelForm.OrgName,
            DeptID: this.modelForm.DeptID,
            DeptName: this.modelForm.DeptName
          })
          if (this.modelForm.Port !== null && this.modelForm.SwaggerUrl !== null) {
            document.getElementById('map').src = process.env.VUE_APP_API_SERVICE + ':' + this.modelForm.Port + this.modelForm.SwaggerUrl // 'http://localhost:30001/api-docs'
            this.changeMapIframe()
          } else {
            var index = this.modelForm.ModelFileUrl.split('\\').length - 1
            window.open(process.env.VUE_APP_SERVICE_URL + 'DeployFile/' + this.modelForm.ModelFileUrl.split('\\')[index])
          }
        }
      })
    }
  }
}
</script>
<style src="">

</style>
<style lang="scss" scoped>
.navbar {
  height: 80px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  background-color: #2F5597;

  .right-menu {
    float: right;
    height: 100%;
    line-height: 80px;

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
        line-height: 50px;
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
          top: 35px;
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
    margin-top: 26px;
    vertical-align: top;
    margin-right: 19px;
    margin-left: 20px;
  }
}

</style>
