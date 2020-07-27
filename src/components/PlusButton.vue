<template>
  <div class="plus-button" @click="openToDo">
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  methods: {
    openToDo() {
      document.querySelector('.todo').classList.toggle('todo-open')
    }
  }
}
</script>

<style scoped>
.plus-button {
  position: fixed;
  top: 90px;
  left: 60px;
  /* right: 60px; */
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #1f57c5;
  transition: 0.7s;
  cursor: pointer;
  z-index: 35;
  box-shadow: 3px 3px 2px 0px rgba(0, 0, 0, 0.1);
}
.plus-button:hover {
  transform: scale(1.05);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.3);
}
.plus-button span {
  position: relative;
  top: 50%;
  left: 50%;
  display: block;
  transform: translate(-50%, -50%);
  background-color: #ddd;
  width: 40px;
  height: 3px;
  border-radius: 2px;
  transition: all 0.3s;
  z-index: 2;
}
.plus-button span:first-child {
}
.plus-button span:last-child {
  transform: translate(-50%, -50%) rotate(90deg);
}
.todo-open .plus-button {
  background-color: #fff;
  /* transform: translateX(300px); */
}
.todo-open.todo .plus-button span:first-child {
  background-color: #0f43ab;
  transform: translateX(-50%) translateX(2px) translateY(1px) rotate(225deg);
}
.todo-open.todo .plus-button span:last-child {
  background-color: #0f43ab;
  transform: translate(-50%) translateY(-2px) rotate(-45deg);
}
/* .dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: red;
  transform: translate(-50%, -50%);
  z-index: 1;
} */
</style>