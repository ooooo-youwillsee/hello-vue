<template>
  <div>
    <div>websocket - A 客户端</div>
    <hr>
    <el-button type="primary" @click="onsend('AAA')">点击发送消息</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    initWebSocket() {
      const wsurl = `${process.env.VUE_APP_WEBSOCKET}/apis/ws/message/1`
      this.websock = new WebSocket(wsurl)
      this.websock.onopen = this.onopen
      this.websock.onmessage = this.onmessage
      this.websock.onclose = this.onclose
      this.websock.onerror = this.onerror
    },
    onopen() {
      console.log('onopen -> WebSocket连接成功')
      setTimeout(() => this.onsend('AAA'), 1000)
    },
    onmessage(e) {
      console.log(`onmessage -> 服务端返回数据：${e.data}`)
    },
    onsend(data) {
      console.log(`onsend -> 客户端发送数据: ${data}, state: ${this.websock.readyState}`)
      try {
        this.websock.send(data)
      } catch (err) {
        console.log('error', err)
      }
    },
    onclose(e) {
      console.log('WebSocket连接关闭', e)
    },
    onerror() {
      console.log('WebSocket连接失败')
      this.initWebSocket()
    }
  },
  created() {
    this.initWebSocket()
  },
  beforeDestroy() {
    this.websock && this.websock.close()
  }
}
</script>

<style scoped>

</style>
