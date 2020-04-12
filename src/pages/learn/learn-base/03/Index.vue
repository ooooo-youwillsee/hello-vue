<template>
  <div>
    <h1>async 和 await , 需要运行 node server.js</h1>
    <hr>
  </div>
</template>

<script>

import request from '@/axios'

export default {
  name: 'Index',
  methods: {
    get1() {
      request.get('/user/list').then(res => {
        this.data = res.data.data
        console.log('get1 --- ', this.data)
      })
    },
    async get2() {
      await request.get('/user/list').then(res => {
        this.data = res.data.data
        console.log('get2 --- ', this.data)
      })
    },
    get3() {
      return request.get('/user/list').then(res => {
        this.data = res.data.data
        console.log('get3 --- ', this.data)
      })
    },

    // 测试用例
    async test1() {
      await this.get1() // get1返回的不是promise
      console.log('----end----')
    },
    async test2() {
      await this.get2() // get2，用async实现返回promise
      console.log('----end----')
    },
    async test3() {
      await this.get3() // get3，直接返回 promise
      console.log('----end----')
    }
  },
  mounted() {
    // this.test1()
    // this.test2()
    this.test3()
  }
}
</script>

<style scoped>

</style>
