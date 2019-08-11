<template>
  <table>
    <my-tr v-for="item in data" :item="item" :key="item.index">
<!--      <my-td prop="name"></my-td>-->
      <slot></slot>
    </my-tr>
  </table>
</template>

<script>
  import MyTr from '@/learn-mytable/components/MyTr'

  export default {
    name: 'MyTable',
    components: {MyTr},
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
