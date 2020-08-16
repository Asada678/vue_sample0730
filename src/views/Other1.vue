<template>
  <div class="other">
    This is other1 page.
    <button @click="show = !show">button</button>
    <div v-if="show">aaaaaaa</div>
  </div>
</template>

<script>
export default {
 data() {
   return {
     show: false
   }
 }
}
</script>

<style scoped>
.other {
  padding: 100px;
}
</style>