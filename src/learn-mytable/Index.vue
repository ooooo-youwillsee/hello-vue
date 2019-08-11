<template>
  <div>
    <my-table :data="data">
      <my-td prop="id">
        <template slot-scope="scope">
          {{ scope.row.id + '00000'}}
        </template>
      </my-td>
      <my-td prop="name"></my-td>
      <my-td>
        <template>
          <button>点击我</button>
        </template>
      </my-td>
    </my-table>
  </div>
</template>

<script>
  import MyTable from '@/learn-mytable/components/MyTable'
  import MyTr from '@/learn-mytable/components/MyTr'
  import MyTd from '@/learn-mytable/components/MyTd'

  export default {
    name: 'LearnSlot',
    components: {MyTd, MyTr, MyTable},
    data () {
      return {
        data: [
          {
            id: 1,
            name: 'zhangsan'
          },
          {
            id: 2,
            name: 'lisi'
          },
          {
            id: 3,
            name: 'wangwu'
          },
          {
            id: 4,
            name: 'xinhong'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
