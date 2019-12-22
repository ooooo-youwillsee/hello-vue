<template>
  <div>
    {{ name }}
    <hr>
    <router-view />
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: 'App'
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
