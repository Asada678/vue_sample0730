<template>
  <div class="card">
    <div class="circle">
      <h2>{{ todo.id }}</h2>
    </div>
    <div class="content">
      <p>{{ todo.text }}</p>
      <a href="#">...</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object
    }
  }

}
</script>

<style>
.card {
  position: relative;
  width: 150px;
  height: 200px;
  background-color: #fff;
  margin: 20px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}
.todo-open .card {
  filter: blur(10px);
  opacity: 0.5;
}
.card:hover {
  filter: blur();
  transform: scale(1.1);
  opacity: 1;
}
.card .circle {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  clip-path: circle(100px at center -20px);
  text-align: center;
}
.card .circle h2 {
  color: #fff;
  font-size: 40px;
  padding: 10px;
  margin: 0;
}
.card .content {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 0px;
  padding: 10px;
  text-align: center;
}
.card .content p {
  color: #666;
}
.card .content a {
  position: relative;
  display: inline-block;
  padding: 5px 20px;
  background-color: #000;
  color: #fff;
  border-radius: 40px;
  text-decoration: none;
  margin-top: 10px;
}
</style>