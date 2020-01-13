<template>
  <div class="view-apply">
    <div class="top-btns">
      <el-button @click="$router.go(-1)">返回</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>
    <!--  顶部表单  -->
    <el-row class="form-wrapper">
      <el-col :span="16">
        <el-form ref="inlineForm" class="inline-form" :inline="true" :model="inlineForm">
          <el-form-item label="申请码ID:" prop="applyId">
            <el-input v-model="inlineForm.applyId"></el-input>
          </el-form-item>
          <el-form-item label="授权书编号:" class="authorization-no" prop="authorizationNo">
            <el-input v-model="inlineForm.authorizationNo"></el-input>
          </el-form-item>
          <el-form-item class="apply-code-btn">
            <el-button @click="applyCodeDialogVisible = true">查看申请码</el-button>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="form" label-width="300px">
          <el-form-item label="贸易信息单号:" prop="tradeNO">
            <el-input v-model="form.tradeNO"></el-input>
          </el-form-item>
          <el-form-item label="借方企业名称/姓名:" prop="debitEnterpriseName">
            <el-input v-model="form.debitEnterpriseName"></el-input>
          </el-form-item>
          <el-form-item label="借方统一社会信用代码/身份证号:" prop="debitNsrsbh">
            <el-input v-model="form.debitNsrsbh"></el-input>
          </el-form-item>
          <el-form-item label="借方地址、电话/手机号:" prop="debitMobile">
            <el-input v-model="form.debitMobile"></el-input>
          </el-form-item>
          <el-form-item label="借方开户行及账号:" prop="debitBankNumber">
            <el-input v-model="form.debitBankNumber"></el-input>
          </el-form-item>
          <el-form-item label="融出方名称:" prop="financeEnterpriseName">
            <el-input v-model="form.financeEnterpriseName"></el-input>
          </el-form-item>
          <el-form-item label="融出方统一社会信用代码:" prop="financeNsrsbh">
            <el-input v-model="form.financeNsrsbh"></el-input>
          </el-form-item>
          <el-form-item label="融出方地址、电话:" prop="financeMobile">
            <el-input v-model="form.financeMobile"></el-input>
          </el-form-item>
          <el-form-item label="融出方开户行及账号:" prop="financeBankNumber">
            <el-input v-model="form.financeBankNumber"></el-input>
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
          <el-table-column label="操作" align="center" width="200">
            <template v-slot="{$index, row}">
              <el-button @click="handleOpenTradeContractUpload($index)">上传贸易合同
              </el-button>
              <el-button @click="handleViewTradeContractFile($index, row)">查看</el-button>
              <el-button @click="handleAddtradeContractRow($index)">添加</el-button>
              <el-button @click="handleDeleteTradeContractRow($index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <input
          ref="tradeContractFile"
          type="file"
          style="display: none;"
          @change="handleTradeContractUploadChange"
        />
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
            <template v-slot="{$index,row}">
              <el-button @click="handleViewTradeBgUploadInvoice($index, row)">上传发票</el-button>
              <el-button @click="handleTradeBgTokenFileUpload($index, row)">上传确权凭证</el-button>
              <el-button>接口读入确权凭证</el-button>
              <el-button @click="handleViewTradeBgInvoice($index, row)">查看发票信息</el-button>
              <el-button @click="handleViewTokenFile($index, row)">查看确权凭证</el-button>
              <el-button @click="handleDeleteTradeBgRow($index, row)">删除</el-button>
              <el-button @click="handleAddTradeBgRow($index, row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <input
          ref="tradeBgTokenFile"
          type="file"
          style="display: none;"
          @change="handleTradeBgTokenFileChange"
        />
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

    <!--   上传区域 -->
    <el-row class="upload-wrapper" :gutter="25">
      <el-col :span="12">
        <el-button @click="$refs.authorizationFile.click()">上传授权书</el-button>
        <input ref="authorizationFile" type="file" style="display: none;" @change="handleAuthorizationUploadChange" />
        <el-table v-if="fileForm.authorizationFiles.length > 0" :data="fileForm.authorizationFiles" style="width: 100%">
          <el-table-column prop="file" label="文件名" width="180">
            <template v-slot="{row}">
              {{ row.file.name }}
            </template>
          </el-table-column>
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
          <el-table-column prop="file" label="文件名" width="180">
            <template v-slot="{row}">
              {{ row.file.name }}
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
    </el-row>

    <!--   底部按钮 -->
    <el-row class="bottom-wrapper" type="flex" justify="center">
      <el-col :span="3">
        <el-button>保存</el-button>
      </el-col>
      <el-col :span="3">
        <el-button>生成申请码</el-button>
      </el-col>
      <el-col :span="3">
        <el-button>提交</el-button>
      </el-col>
    </el-row>

    <!--  查看申请码  -->
    <el-dialog
      class="apply-code-dialog"
      :center="true"
      :show-close="false"
      title="查看申请码"
      :visible.sync="applyCodeDialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyCodeDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  贸易合同附件  -->
    <el-dialog
      :center="true"
      :show-close="false"
      title="查看附件"
      :visible.sync="tradeContractFileDialogVisible"
      width="30%"
    >
      <el-table
        v-if="openTradeContractDialogRow.$index >= 0 && tradeContractForm.tradeContractInfos[openTradeContractDialogRow.$index]"
        :data="tradeContractForm.tradeContractInfos[openTradeContractDialogRow.$index].tradeContractFiles"
        style="width:100%"
      >
        <el-table-column prop="file" label="文件名" width="180">
          <template v-slot="{row}">
            {{ row.file.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{$index, row}">
            <el-button type="text" @click="handleDownloadTradeContractFile($index, row)">下载</el-button>
            <el-button type="text" class="delete-btn" @click="handleDeleteTradeContractFile($index, row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tradeContractFileDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  贸易背景上传发票  -->
    <el-dialog
      class="trade-bg-upload-invoice"
      :center="true"
      :show-close="false"
      title="上传发票"
      :visible.sync="tradeBgUploadInvoiceDialogVisible"
      width="65%"
    >
      <div class="btns">
        <el-button @click="$refs.invoiceFile.click()">导入文件</el-button>
        <input ref="invoiceFile" type="file" style="display: none;" @change="handleTradeBgUploadInvoiceChange" />
        <el-button @click="handleDownloadTradeBgTemplateFile">模板下载</el-button>
        <el-button @click="handleCheckTradeBgInvoice">发票查验</el-button>
      </div>
      <el-form
        v-if="openTradeBgDialogRow.$index >=0 && tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm"
        ref="tradeBgUploadInvoiceForm"
        :model="tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm"
        label-width="0"
      >
        <el-table
          :data="tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm.infos"
          style="width: 100%"
          border
          header-row-class-name="table-header"
        >
          <el-table-column label="序号" width="55">
            <template v-slot="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="invoiceCode" label="发票代码" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'infos['+$index+'].invoiceCode'">
                <el-input
                  v-model="row.invoiceCode"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceNumber" label="发票号码" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'infos['+$index+'].invoiceNumber'">
                <el-input
                  v-model="row.invoiceNumber"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="kprq" label="开票日期" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'infos['+$index+'].kprq'">
                <el-input
                  v-model="row.kprq"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceMoney" label="发票金额" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'infos['+$index+'].invoiceMoney'">
                <el-input
                  v-model="row.invoiceMoney"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="checkCode" label="校验码" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'infos['+$index+'].checkCode'">
                <el-input
                  v-model="row.checkCode"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="checked" label="查验结果" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              {{ row.checked.length === 0 ? '' : row.checked === '0' ? '查验不通过': '查验通过' }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{$index, row}">
              <el-button type="text" @click="handleAddTradeBgUploadInvoiceRow($index, row)">添加</el-button>
              <el-button type="text" class="delete-btn" @click="handleDeleteTradeBgUploadInvoiceRow($index, row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleTradeBgUploadInvoiceClose">取 消</el-button>
        <el-button type="primary" @click="tradeBgUploadInvoiceDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  贸易背景查看发票  -->
    <el-dialog
      class="trade-bg-view-invoice"
      :center="true"
      :show-close="false"
      title="查看发票"
      :visible.sync="tradeBgViewInvoiceDialogVisible"
      width="65%"
    >
      <el-table
        v-if="openTradeBgDialogRow.$index >=0 && tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm"
        :data="tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm.infos"
        style="width: 100%"
        border
        header-row-class-name="table-header"
      >
        <el-table-column label="序号" width="55">
          <template v-slot="{$index}">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="invoiceCode" label="发票代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceNumber" label="发票号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="kprq" label="开票日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceMoney" label="发票金额" show-overflow-tooltip align="right"></el-table-column>
        <el-table-column prop="checkCode" label="校验码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="checked" label="查验结果" show-overflow-tooltip>
          <template v-slot="{row, $index}">
            {{ row.checked.length === 0 ? '' : row.checked === '0' ? '查验不通过': '查验通过' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{$index, row}">
            <el-button type="text" @click="handleClickInvoice($index, row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tradeBgViewInvoiceDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  贸易背景 确权凭证  -->
    <el-dialog
      :center="true"
      :show-close="false"
      title="查看附件"
      :visible.sync="tradebgViewTokenFileDialogVisible"
      width="30%"
    >
      <el-table
        v-if="openTradeBgDialogRow.$index >= 0 && tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index]"
        :data="tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].tokenFiles"
        style="width:100%"
      >
        <el-table-column prop="file" label="文件名" width="180">
          <template v-slot="{row}">
            {{ row.file.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{$index, row}">
            <el-button type="text" @click="handleDownloadTradeContractFile($index, row)">下载</el-button>
            <el-button type="text" class="delete-btn" @click="handleDeleteTradeContractFile($index, row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tradebgViewTokenFileDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'TempIndex',
  data() {
    return {
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
      inlineForm: {
        applyId: '',
        authorizationNo: ''
      },
      form: {
        // tradeNO: '2020010601',
        // debitEnterpriseName: '企业A',
        // debitNsrsbh: '911400000000000001',
        // debitMobile: '地址、电话/手机号',
        // debitBankNumber: '开户行及账号',
        // financeEnterpriseName: '111111111111111111',
        // financeNsrsbh: '111111111111111111',
        // financeMobile: '111111111111111111',
        // financeBankNumber: '111111111111111111',
        tradeNO: '',
        debitEnterpriseName: '',
        debitNsrsbh: '',
        debitMobile: '',
        debitBankNumber: '',
        financeEnterpriseName: '',
        financeNsrsbh: '',
        financeMobile: '',
        financeBankNumber: ''
      },
      openTradeContractDialogRow: {
        $index: -1
      },
      tradeContractForm: {
        tradeContractFormDisabled: true,
        tradeContractInfos: [
          {
            tradeContractNo: '2020-01-10-15-10-11',
            buyer: '买方1',
            seller: '卖方1',
            contractPayTimes: '2',
            contractMoney: '111.00',
            tradeContractFiles: [
              {
                id: 0,
                file: { name: 'xxx1' },
                url: '/static/file/贸易合同书.doc'
              }
            ]
          },
          {
            tradeContractNo: '2020-01-15-19-19-19',
            buyer: '买方2',
            seller: '卖方2',
            contractPayTimes: '5',
            contractMoney: '8888888.00',
            tradeContractFiles: []
          }
        ],
        tradeContractEmptyInfo: {
          tradeContractNo: '',
          buyer: '',
          seller: '',
          contractPayTimes: '',
          contractMoney: '',
          tradeContractFiles: []
        }
      },
      openTradeBgDialogRow: {
        $index: -1
      },
      tradeBgForm: {
        tradeBgFormDisabled: false,
        tradeBgUploadInvoiceFormDisabled: false,
        invoiceEmptyInfo: {
          invoiceCode: '',
          invoiceNumber: '',
          kprq: '',
          invoiceMoney: '',
          checkCode: '',
          checked: ''
        },
        tradeBgEmptyInfo: {
          tradeContractNo: '',
          payNode: '',
          payNodeMoney: '',
          proportion: '',
          number: '',
          transfer: '0',
          finishPay: '1',
          invoiceNum: 0,
          invoiceMoney: '',
          applyId: '',
          invoiceInfoForm: {
            infos: []
          },
          tokenFiles: []
        },
        // 用来保存临时的上传发票
        invoiceInfoTempForm: {},
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
            applyId: 'afdsf-baa1234',
            invoiceInfoForm: {
              infos: [
                {
                  invoiceCode: '1231231',
                  invoiceNumber: '1231231',
                  kprq: '2020-01-10',
                  invoiceMoney: '1111.00',
                  checkCode: '1111.00',
                  checked: '0'
                }
              ]
            },
            tokenFiles: [
              {
                file: { name: 'xxx1' }
              }
            ]
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
            applyId: 'uwisk892-baa1234',
            invoiceInfoForm: {
              infos: []
            },
            tokenFiles: [
              {
                file: { name: 'xxx1' }
              }
            ]
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
        // 授权书
        authorizationFileDisabled: false,
        authorizationFiles: [
          {
            file: { name: 'xxx1' },
            authorizationNo: 'xxxxx1231',
            url: '/static/files/授权书.doc'
          }
        ],
        // 附件
        appendixFileDisabled: false,
        appendixFiles: [
          {
            file: { name: 'xxx1' }
          }
        ]
      },
      // 申请码 dialog
      applyCodeDialogVisible: false,
      // 贸易合同附件 dialog
      tradeContractFileDialogVisible: false,
      // 贸易背景上传发票 dialog
      tradeBgUploadInvoiceDialogVisible: false,
      // 贸易背景查看发票 dialog
      tradeBgViewInvoiceDialogVisible: false,
      // 贸易背景确权凭证 dialog
      tradebgViewTokenFileDialogVisible: false
    }
  },
  methods: {
    handleReset() {
      this.$refs.inlineForm && this.$refs.inlineForm.resetFields()
      this.$refs.form && this.$refs.form.resetFields()
      this.fileForm.appendixFiles = this.fileForm.authorizationFiles = []
      this.tradeContractForm.tradeContractInfos = [cloneDeep(this.tradeContractForm.tradeContractEmptyInfo)]
    },
    // 添加贸易合同行
    handleAddtradeContractRow($index) {
      const emptyInfo = cloneDeep(this.tradeContractForm.tradeContractEmptyInfo)
      this.tradeContractForm.tradeContractInfos.splice($index + 1, 0, emptyInfo)
    },
    // 删除贸易合同行
    handleDeleteTradeContractRow($index) {
      const infos = this.tradeContractForm.tradeContractInfos
      if (infos.length === 1) {
        const emptyInfo = cloneDeep(this.tradeContractForm.tradeContractEmptyInfo)
        infos.splice($index, 1, emptyInfo)
      } else {
        infos.splice($index, 1)
      }
    },
    // 打开上传文件框
    handleOpenTradeContractUpload($index) {
      this.openTradeContractDialogRow.$index = $index
      this.$refs.tradeContractFile.click()
    },
    // 上传贸易合同附件
    handleTradeContractUploadChange(e) {
      const { $index } = this.openTradeContractDialogRow
      const tradeContractFiles = this.tradeContractForm.tradeContractInfos[$index].tradeContractFiles
      e.target.files.forEach(file => {
        tradeContractFiles.push({
          file: file,
          url: '/static/file/贸易合同书.doc'
        })
      })
    },
    // 查看贸易合同附件
    handleViewTradeContractFile($index, row) {
      this.tradeContractFileDialogVisible = true
      this.openTradeContractDialogRow = { $index, ...row }
    },
    // 删除贸易合同附件
    handleDeleteTradeContractFile($index, { id }) {
      const rowIndex = this.openTradeContractDialogRow.$index
      this.tradeContractForm.tradeContractInfos[rowIndex].tradeContractFiles.splice($index, 1)
    },
    // 下载贸易合同附件
    handleDownloadTradeContractFile($index, { id }) {
      const rowIndex = this.openTradeContractDialogRow.$index
      location.href = this.tradeContractForm.tradeContractInfos[rowIndex].tradeContractFiles[$index].url
    },
    // 打开贸易背景上传发票Diglog
    handleViewTradeBgUploadInvoice($index, row) {
      this.openTradeBgDialogRow = { $index, ...row }
      this.tradeBgForm.invoiceInfoTempForm = cloneDeep(this.tradeBgForm.tradeBgInfos[$index].invoiceInfoForm)
      this.tradeBgUploadInvoiceDialogVisible = true
    },
    // 贸易背景上传发票
    handleTradeBgUploadInvoiceChange(e) {
      const { $index } = this.openTradeBgDialogRow
      this.tradeBgForm.tradeBgInfos[$index].invoiceInfoForm.infos.push({
        invoiceCode: '1231231',
        invoiceNumber: '1231231',
        kprq: '2020-01-10',
        invoiceMoney: '1111.00',
        checkCode: '1111.00',
        checked: '0'
      })
    },
    // 贸易背景模板文件下载
    handleDownloadTradeBgTemplateFile() {
      location.href = '/static/files/发票导入模板文件.doc'
    },
    // 贸易背景发票查验
    handleCheckTradeBgInvoice() {
      const rowIndex = this.openTradeBgDialogRow.$index
      this.tradeBgForm.tradeBgInfos[rowIndex].invoiceInfoForm.infos.forEach(item => {
        item.checked = '1'
      })
    },
    // 贸易背景添加发票行
    handleAddTradeBgUploadInvoiceRow($index) {
      const emptyInfo = cloneDeep(this.tradeBgForm.invoiceEmptyInfo)
      const rowIndex = this.openTradeBgDialogRow.$index
      this.tradeBgForm.tradeBgInfos[rowIndex].invoiceInfoForm.infos.splice($index + 1, 0, emptyInfo)
    },
    // 贸易背景删除发票行
    handleDeleteTradeBgUploadInvoiceRow($index) {
      const rowIndex = this.openTradeBgDialogRow.$index
      const infos = this.tradeBgForm.tradeBgInfos[rowIndex].invoiceInfoForm.infos
      if (infos.length === 1) {
        const emptyInfo = cloneDeep(this.tradeBgForm.invoiceEmptyInfo)
        infos.splice($index, 1, emptyInfo)
      } else {
        infos.splice($index, 1)
      }
    },
    // 贸易背景上传发票 取消按钮
    handleTradeBgUploadInvoiceClose() {
      this.tradeBgUploadInvoiceDialogVisible = false
      const rowIndex = this.openTradeBgDialogRow.$index
      this.tradeBgForm.tradeBgInfos[rowIndex].invoiceInfoForm = this.tradeBgForm.invoiceInfoTempForm
    },
    // 贸易背景查看发票
    handleViewTradeBgInvoice($index, row) {
      this.tradeBgViewInvoiceDialogVisible = true
      this.openTradeBgDialogRow = { $index, ...row }
    },
    // todo 跳转查看发票
    handleClickInvoice($index) {
    },
    // 打开上传确权凭证框
    handleTradeBgTokenFileUpload($index) {
      this.openTradeBgDialogRow.$index = $index
      this.$refs.tradeBgTokenFile.click()
    },
    // 上传确权凭证
    handleTradeBgTokenFileChange(e) {
      const rowIndex = this.openTradeBgDialogRow.$index
      const tokenFiles = this.tradeBgForm.tradeBgInfos[rowIndex].tokenFiles
      e.target.files.forEach(file => {
        tokenFiles.push(
          { file }
        )
      })
    },
    // 贸易背景 查看确权凭证
    handleViewTokenFile($index, row) {
      this.tradebgViewTokenFileDialogVisible = true
      this.openTradeBgDialogRow = { $index, ...row }
    },
    handleAddTradeBgRow($index, row) {
      const emptyInfo = cloneDeep(this.tradeBgForm.tradeBgEmptyInfo)
      this.tradeBgForm.tradeBgInfos.splice($index + 1, 0, emptyInfo)
    },
    handleDeleteTradeBgRow($index, row) {
      const infos = this.tradeBgForm.tradeBgInfos
      if (infos.length === 1) {
        const emptyInfo = cloneDeep(this.tradeBgForm.tradeBgEmptyInfo)
        infos.splice($index, 1, emptyInfo)
      } else {
        infos.splice($index, 1)
      }
    },
    // 上传授权书
    handleAuthorizationUploadChange(e) {
      const authorizationFiles = this.fileForm.authorizationFiles
      e.target.files.forEach(file => {
        authorizationFiles.push({
          file,
          authorizationNo: ''
        })
      })
    },
    // 上传附件
    handleAppendixUploadChange(e) {
      const appendixFiles = this.fileForm.appendixFiles
      e.target.files.forEach(file => {
        appendixFiles.push({
          file,
          authorizationNo: ''
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  $bgColor: #cccccc;

  .view-apply {
    padding: 20px;
    /* 顶部按钮 */
    .top-btns {
      overflow: hidden;
      /deep/ .el-button {
        float: left;
        margin-right: 20px;
      }
    }

    .inline-form {
      position: relative;
      padding-left: 228px;
      /deep/ .el-form-item {
        display: inline-block;
        width: 50%;
        margin-right: 0;
      }
      .authorization-no {
        /deep/ .el-form-item__content {
          width: calc(100% - 86px)
        }
      }
      .apply-code-btn {
        width: 100px;
        position: absolute;
        right: -150px;
        top: 0;
      }
    }

    /* 公共table样式 */
    /deep/ .el-table {
      .money-txt input {
        text-align: right;
      }
      .center-txt {
        text-align: center;
      }
      .table-header {
        th {
          background-color: $bgColor;
        }
      }
    }

    .table-wrapper {
      margin-bottom: 30px;
      .table-title {
        margin-bottom: 8px;
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

    /deep/ .el-dialog {
      .el-dialog__header {
        background-color: $bgColor;
      }
      .delete-btn {
        margin-left: 30px;
      }
      .btns {
        overflow: hidden;
        .el-button {
          float: left;
          margin-right: 20px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
