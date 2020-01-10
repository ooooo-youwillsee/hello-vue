<template>
  <div>
    <!--    <div v-for="(item, index) in data" :key="index">{{ item }}</div>-->
    <!--    <button @click="data = [1,2,9]">删除第二个</button>-->
    <router-view />
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: 'App',
      data: [1, 2, 3, 4]
    }
  },
  provide() {
    return {
      app: this
    }
  },
  methods: {},
  mounted() {
  }

}
</script>
