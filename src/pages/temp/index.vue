<template>
  <div class="view-apply">
    <div class="top-btns">
      <el-button @click="$router.go(-1)">返回</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>
    <el-row class="form-wrapper">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="300px">
          <el-form-item label="贸易信息单号">
            <el-input v-model="form.tradeNO"></el-input>
          </el-form-item>
          <el-form-item label="借方企业名称/姓名">
            <el-input v-model="form.bebitEnterpriseName"></el-input>
          </el-form-item>
          <el-form-item label="借方统一社会信用代码/身份证号">
            <el-input v-model="form.bebitNsrsbh"></el-input>
          </el-form-item>
          <el-form-item label="借方地址、电话/手机号：">
            <el-input v-model="form.bebitMobile"></el-input>
          </el-form-item>
          <el-form-item label="借方开户行及账号：">
            <el-input v-model="form.bebitBankNumber"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--  贸易合同信息  -->
    <div class="table-wrapper">
      <h4 class="table-title">贸易合同信息</h4>
      <el-form ref="tradeContractForm" :model="tradeContractForm" label-width="0">
        <el-table :data="tradeContractForm.tradeContractInfos" border header-row-class-name="table-header">
          <el-table-column label="序号">
            <template v-slot="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="tradeContractNo" label="贸易合同号" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeContractInfos['+$index+'].tradeContractNo'">
                <el-input
                  v-model="row.tradeContractNo"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="buyer" label="买方" width="180" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeContractInfos['+$index+'].buyer'">
                <el-input
                  v-model="row.buyer"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="seller" label="卖方" width="180" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeContractInfos['+$index+'].seller'">
                <el-input
                  v-model="row.seller"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="contractPayTimes" label="合同内付款次数" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeContractInfos['+$index+'].contractPayTimes'">
                <el-input
                  v-model="row.contractPayTimes"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="contractMoney" label="合同金额" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeContractInfos['+$index+'].contractMoney'">
                <el-input
                  v-model="row.contractMoney"
                  class="money-txt"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <el-button>查看</el-button>
          </el-table-column>
        </el-table>
      </el-form>
    </div>

    <!--  贸易背景信息  -->
    <div class="table-wrapper">
      <h4 class="table-title">贸易背景信息</h4>
      <el-form ref="tradeBgForm" :model="tradeBgForm" label-width="0">
        <el-table :data="tradeBgForm.tradeBgInfos" style="width: 100%" border header-row-class-name="table-header">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="55">
            <template v-slot="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="tradeContractNo" label="贸易合同号" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].tradeContractNo'">
                <el-input
                  v-model="row.tradeContractNo"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="payNode" label="付款节点" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].payNode'">
                <el-input
                  v-model="row.payNode"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="payNodeMoney" label="付款节点金额" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].payNodeMoney'">
                <el-input
                  v-model="row.payNodeMoney"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="proportion" label="占合同金额比例" width="90">
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].proportion'">
                <el-input
                  v-model="row.proportion"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="确权凭证编号" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].number'">
                <el-input
                  v-model="row.number"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="transfer" label="确权凭证是否可转让" width="120px" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].transfer'">
                <el-select v-model="row.transfer" :disabled="tradeBgForm.tradeBgFormDisabled">
                  <el-option
                    v-for="(item, index) in options.transferOptions"
                    :key="index"
                    :label="item.value"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="finishPay" label="是否完成付款" width="90px" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].finishPay'">
                <el-select v-model="row.finishPay" :disabled="tradeBgForm.tradeBgFormDisabled">
                  <el-option
                    v-for="(item, index) in options.payOptions"
                    :key="index"
                    :label="item.value"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceNum" label="发票数量" width="80" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].invoiceNum'">
                <el-input
                  v-model="row.invoiceNum"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceMoney" label="发票金额含税价" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].invoiceMoney'">
                <el-input
                  v-model="row.invoiceMoney"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="applyId" label="申请码ID" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].applyId'">
                <el-input
                  v-model="row.applyId"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="500">
            <el-button>上传发票</el-button>
            <el-button>上传确权凭证</el-button>
            <el-button>接口读入确权凭证</el-button>
            <el-button>查看发票信息</el-button>
            <el-button>查看确权凭证</el-button>
            <el-button>删除</el-button>
            <el-button>添加</el-button>
          </el-table-column>
        </el-table>
      </el-form>
    </div>

    <!--  融资提供方信息  -->
    <div class="table-wrapper">
      <h4 class="table-title">融资提供方信息</h4>
      <el-form ref="financeProviderForm" :model="financeProviderForm" label-width="0">
        <el-table
          :data="financeProviderForm.financeProviderInfos"
          style="width: 100%"
          border
          header-row-class-name="table-header"
        >
          <el-table-column label="序号" width="55">
            <template v-slot="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="enterpriseName" label="单位名称" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'financeProviderInfos['+$index+'].enterpriseName'">
                <el-input
                  v-model="row.enterpriseName"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="nsrsbh" label="统一社会信用代码" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'financeProviderInfos['+$index+'].nsrsbh'">
                <el-input
                  v-model="row.nsrsbh"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="地址、电话" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'financeProviderInfos['+$index+'].mobile'">
                <el-input
                  v-model="row.mobile"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="bank" label="开户行及账号" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'financeProviderInfos['+$index+'].bank'">
                <el-input
                  v-model="row.bank"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="authorizationNo" label="授权书编号" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'financeProviderInfos['+$index+'].authorizationNo'">
                <el-input
                  v-model="row.authorizationNo"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="500">
            <el-button>生成授权书</el-button>
            <el-button>上传授权书</el-button>
            <el-button>查看</el-button>
            <el-button>添加</el-button>
            <el-button>删除</el-button>
          </el-table-column>
        </el-table>
      </el-form>
    </div>

    <el-row class="upload-wrapper" :gutter="25">
      <el-col :span="12">
        <el-button @click="$refs.authorizationFile.click()">上传授权书</el-button>
        <input ref="authorizationFile" type="file" style="display: none;" @change="handleAuthorizationUploadChange" />
        <el-table v-if="fileForm.authorizationFiles.length > 0" :data="fileForm.authorizationFiles" style="width: 100%">
          <el-table-column prop="fileName" label="文件名" width="180"></el-table-column>
          <el-table-column prop="authorizationNo" label="授权书编号" width="180">
            <template v-slot="{row}">
              <el-input
                v-model="row.authorizationNo"
                :disabled="fileForm.authorizationFileDisabled"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{$index}">
              <el-button type="text">下载</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12" class="appendix-wrapper">
        <el-button @click="$refs.appendixFile.click()">上传附件</el-button>
        <input ref="appendixFile" type="file" style="display: none;" @change="handleAppendixUploadChange" />
        <el-table v-if="fileForm.appendixFiles.length > 0" :data="fileForm.appendixFiles" style="width: 100%">
          <el-table-column prop="fileName" label="文件名" width="180"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{$index}">
              <el-button type="text">下载</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row class="bottom-wrapper" type="flex" justify="center">
      <el-col :span="3">
        <el-button>保存</el-button>
      </el-col>
      <el-col :span="3">
        <el-button>提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TempIndex',
  data() {
    return {
      form: {
        tradeNO: '2020010601',
        bebitEnterpriseName: '企业A',
        bebitNsrsbh: '911400000000000001',
        bebitMobile: '地址、电话/手机号',
        bebitBankNumber: '开户行及账号'
      },
      tradeContractForm: {
        tradeContractFormDisabled: true,
        tradeContractInfos: [
          {
            tradeContractNo: '2020-01-10-15-10-11',
            buyer: '买方1',
            seller: '卖方1',
            contractPayTimes: '2',
            contractMoney: '111.00'
          },
          {
            tradeContractNo: '2020-01-15-19-19-19',
            buyer: '买方2',
            seller: '卖方2',
            contractPayTimes: '5',
            contractMoney: '8888888.00'
          }
        ]
      },
      options: {
        transferOptions: [
          { code: '0', value: '未确定' },
          { code: '1', value: '可转让' }
        ],
        payOptions: [
          { code: '0', value: '否' },
          { code: '1', value: '是' }
        ]
      },
      tradeBgForm: {
        tradeBgFormDisabled: false,
        tradeBgInfos: [
          {
            tradeContractNo: '2020-01-10-15-10-11',
            payNode: '节点1',
            payNodeMoney: '11111.00',
            proportion: '100%',
            number: '1230123-123',
            transfer: '0',
            finishPay: '1',
            invoiceNum: 3,
            invoiceMoney: '1111.00',
            applyId: 'afdsf-baa1234'
          },
          {
            tradeContractNo: '2020-01-10-15-10-11',
            payNode: '节点2',
            payNodeMoney: '11111.00',
            proportion: '30%',
            number: '999993-123',
            transfer: '1',
            finishPay: '0',
            invoiceNum: 2,
            invoiceMoney: '8811.00',
            applyId: 'uwisk892-baa1234'
          }
        ]
      },
      financeProviderForm: {
        financeProviderFormDisabled: false,
        financeProviderInfos: [
          {
            enterpriseName: 'xxxxx1',
            nsrsbh: '23424243242442',
            mobile: '2342342',
            bank: '招商银行',
            authorizationNo: '1230123-123'
          },
          {
            enterpriseName: 'xxxxx2',
            nsrsbh: '456456456',
            mobile: '23432432234',
            bank: '建设银行',
            authorizationNo: '56430123-123'
          }
        ]
      },
      fileForm: {
        authorizationFileDisabled: false,
        authorizationFiles: [
          // {
          //   fileName: 'xxx1',
          //   authorizationNo: 'xxxxx1231'
          // }
        ],
        appendixFileDisabled: false,
        appendixFiles: [
          // {
          //   fileName: 'xxx1',
          //   authorizationNo: 'xxxxx1231'
          // }
        ]
      }
    }
  },
  methods: {
    handleReset() {

    },
    // 上传授权书
    handleAuthorizationUploadChange(e) {
      const authorizationFiles = this.fileForm.authorizationFiles
      e.target.files.forEach(file => {
        authorizationFiles.push({
          fileName: file.name,
          authorizationNo: ''
        })
      })
    },
    // 上传附件
    handleAppendixUploadChange(e) {
      const appendixFiles = this.fileForm.appendixFiles
      e.target.files.forEach(file => {
        appendixFiles.push({
          fileName: file.name,
          authorizationNo: ''
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .view-apply {
    padding: 20px;
    .top-btns {
      overflow: hidden;
      /deep/ .el-button {
        float: left;
        margin-right: 20px;
      }
    }

    .table-wrapper {
      margin-bottom: 30px;
      .table-title {
        margin-bottom: 8px;
      }
      /deep/ .el-table {
        .money-txt input {
          text-align: right;
        }
        .center-txt {
          text-align: center;
        }
        .table-header {
          th {
            background-color: #cccccc;
          }
        }
      }
    }

    .upload-wrapper {
      /deep/ .el-table {
        margin-top: 5px;
      }
    }

    .bottom-wrapper {
      padding-top: 40px;
    }
  }
</style>
