<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

body {
  margin: 0;
}

#app {
  /* font-family: 'Noto Sans', sans-serif; */
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'Kosugi Maru', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  background-color: #f0f0f0;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
  z-index: 10;
}
</style>
