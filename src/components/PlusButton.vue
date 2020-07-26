<template>
  <div class="plus-button" @click="openToDo">
    <span></span>
    <div class="dot"></div>
    <span></span>
  </div>
</template>

<script>
export default {
  methods: {
    openToDo() {
      document.querySelector('body').classList.toggle('todo-open')
    }
  }
}
</script>

<style>
.plus-button {
  position: absolute;
  bottom: 80px;
  right: 80px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #0f43ab;
  transition: 0.3s;
  cursor: pointer;
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
  transition: 0.3s;
  height: 2px;
  z-index: 2;
}
.plus-button span:first-child {
}
.plus-button span:last-child {
  transform: translate(-50%, -50%) rotate(90deg);
}
.todo-open {
  background-color: #888;
}
.todo-open .plus-button {
  background-color: #fff;
}
.todo-open .todo .plus-button span:first-child {
  background-color: #0f43ab;
  transform: translateX(-50%) translateX(2px) translateY(1px) rotate(225deg);
}
.todo-open .todo .plus-button span:last-child {
  background-color: #0f43ab;
  transform: translate(-50%) translateY(-2px) rotate(-45deg);
}
.dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  /* background-color: red; */
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>