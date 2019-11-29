<template>
  <div style="margin: 20px;">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" ref="tabs">
    <el-tab-pane label="用户管理" name="first" :tip="1">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second" :tip="tip">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

    <el-button type="success" @click="changeTipCount">点击我</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeName: 'second',
        tip: 8
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      changeTipCount () {
        this.tip += 1
      }
    },
    mounted () {
    }

  }
</script>
