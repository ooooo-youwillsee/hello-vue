<template>
  <div>
    <h1>Demo</h1>
    <el-button type="primary" @click="listQuery()">请求数据</el-button>
  </div>
</template>

<script>
import request from '@/axios'

export default {
  name: 'Demo',
  data() {
    return {
      data: [1, 2, 3, 4]
    }
  },
  methods: {
    listQuery() {
      console.log('request--------------------')
      request.get('/user/list').then(res => {
        this.data = res.data.data
      })
    }
  },
  mounted() {
    console.log('mounted--------------------')
  }
}
</script>

<style scoped>

</style>
