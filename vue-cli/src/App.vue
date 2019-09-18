<template>
  <div id="app">
    <Init/>
  </div>
</template>

<script>
import Init from './components/Init.vue'

export default {
  name: 'app',
  components: {
    Init
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
