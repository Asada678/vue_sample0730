<template>
  <nav>
    <router-link class="nav-link" v-for="link in links" :key="link.text" :to="link.route">{{ link.text}}</router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [{text: 'ホーム', route: '/home'},{text: 'ToDo', route: '/todo'},{text: 'その他１', route: '/other1'},{text: 'その他２', route: '/other2'},]
    }
  }
}
</script>

<style>

</style>