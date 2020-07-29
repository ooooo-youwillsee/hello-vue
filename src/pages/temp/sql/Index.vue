<template>
  <div class="container h-100">
    <el-tabs v-model="activeSQl" class="h-100" type="border-card" @tab-click="handleClickTab">
      <el-tab-pane
        v-for="sqlSetting in SQlSettings"
        :key="sqlSetting.c_name"
        :label="sqlSetting.c_name"
        :name="sqlSetting.e_name"
      >
        <el-form :inline="true" :model="sqlSetting">
          <el-form-item v-for="where in sqlSetting.where" :key="where.name" :label="where.name">
            <el-input v-model="where.value" :placeholder="where.name"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="sqlSetting" class="execute-sql">
          <el-form-item style="width: 80%;">
            <el-input
              v-model="sqlSetting.executeSQL"
              type="textarea"
              :rows="2"
              placeholder="请输入SQL"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="handleExecuteSQL(sqlSetting)">执行SQL</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="sqlSetting.sqlData" stripe>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column
            v-for="field in sqlSetting.fields"
            :key="field"
            :prop="field"
            :label="field"
            width="150px"
          >
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { getSQlResult } from '@/api/sql'
import SQlSettings from './sql.json'

export default {
  name: 'SQl',
  data() {
    return {
      activeSQl: '',
      SQlSettings: []
    }
  },
  methods: {
    async getSqlSettings() {
      const SQLConfig = []
      for (let sqlSetting of SQlSettings) {
        sqlSetting = await this.handleExecuteSQL(sqlSetting)
        SQLConfig.push(sqlSetting)
      }
      this.SQlSettings = SQLConfig
      console.log(this.SQlSettings)
    },
    async handleExecuteSQL(sqlSetting) {
      sqlSetting.executeSQL = this._handleSqlWhere(sqlSetting)
      const { sqlData, fields } = await getSQlResult(sqlSetting.executeSQL)
      sqlSetting.sqlData = sqlData
      sqlSetting.fields = fields
      return sqlSetting
    },
    handleClickTab(tab) {
      this.activeSQl = tab.name
      const sqlSetting = this.SQlSettings.find(item => item.e_name === tab.name)
      this.handleExecuteSQL(sqlSetting)
    },
    _handleSqlWhere({ sql, where }) {
      where = where.filter(item => {
        return item.value && item.value.length !== 0 && item.value.trim().length !== 0
      })
      if (where.length !== 0) {
        where = where.reduce((prev, cur) => prev + ` and t.${cur.name} = '${cur.value}'`, ' ')
        where = where.substring(where.indexOf('and') + 'and'.length)
      } else {
        where = ' 1 = 1 '
      }
      sql = sql.replace('$where', where)
      return sql
    }
  },
  async mounted() {
    await this.getSqlSettings()
    this.activeSQl = this.SQlSettings[0].e_name
  }
}
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
  }
  /deep/ .el-tabs {
    height: 100%;
    .execute-sql {
      flex-direction: column;
      justify-content: center;
      .el-form-item__content, .el-textarea {
        width: 100%;
      }
    }
  }

</style>
