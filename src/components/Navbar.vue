<template>
  <nav class="navbar">
    <ul>
      <li v-for="link in links" :key="link.text">
        <router-link :to="link.route">{{ link.text }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      links: [
        { text: "ホーム", route: "/home" },
        { text: "ToDo", route: "/todo" },
        { text: "その他１", route: "/other1", show: false },
        { text: "その他２", route: "/other2" },
      ],
    };
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  background-color: #9db7eb;
  width: 100%;
  z-index: 30;
  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.3);
}
.navbar ul {
  margin: 0;
  padding: 2px 20px;
  display: flex;
}

.navbar ul li {
  list-style-type: none;
  display: inline-block;
  width: 100px;
  height: 60px;
  border-left: 1px solid #0f43ab31;
  border-right: 1px solid #0f43ab31;
  border-radius: 2px;
  margin: 0 0.5px;
  text-align: center;
}
.navbar ul li a {
  display: block;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
  line-height: 58px;
  transition: all 0.3s;
  border-radius: 2px;
  color: #4d73bf;
}
.navbar ul li a:hover {
  background-color: #dce7fc;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.3);
}
.navbar ul li a.router-link-active {
  font-weight: 700;
  color: #0f43ab;
  background-color: #dce7fc;
}
</style>