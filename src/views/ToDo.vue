<template>
  <div class="todo">
    <div class="todo-cards">
      <div class="todo-cover" @click="openToDo"></div>
      <transition-group class="cards">
        <ToDoCard
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @removeCard="removeCard"
          @editCard="editCard"
        />
      </transition-group>
      <PlusButton />
    </div>
    <div class="new-card">
      <div class="new-card-content">
        <input class="item" type="text" name id />
        <textarea class="item" name id cols="30" rows="10"></textarea>
        <button class="item">追加</button>
      </div>
    </div>
  </div>
</template>

<script>
import ToDoCard from "@/components/ToDoCard";
import PlusButton from "@/components/PlusButton";
export default {
  data() {
    return {
      todos: [
        { id: 1, text: "aaa" },
        // { id: 2, text: "aaa" },
        // { id: 3, text: "aaaaaaaaaaaaaaa" },
        // { id: 4, text: "aaa" },
        // { id: 5, text: "aaa" },
        { id: 6, text: "aaa" },
        { id: 7, text: "aaa" },
        { id: 8, text: "aaa" },
        { id: 9, text: "aaa" },
        { id: 10, text: "aaa" },
        { id: 11, text: "aaa" },
        { id: 12, text: "aaa" },
      ],
    };
  },
  components: {
    ToDoCard,
    PlusButton,
  },
  methods: {
    removeCard(id) {
      console.log("ToDo:", id);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    editCard(id) {},
    openToDo() {
      document.querySelector(".todo").classList.toggle("todo-open");
    },
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
/* .todo {
  padding-right: 150px;
}
.todo.todo-open {
  padding-right: 0;
} */
.todo-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  z-index: auto;
  transition: opacity 1s;
  cursor: pointer;
}
.todo-cards {
  position: relative;
  min-height: calc(100vh - 160px);
  padding: 80px 20px;
  transition: 0.5s;
  background-color: #eee;
  z-index: 5;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
}
.new-card {
  position: fixed;
  right: 0;
  top: 250px;
  width: 300px;
}
.new-card-content {
  perspective: 2000px;
  transform-style: preserve-3d;
}
.new-card-content .item {
  margin: 20px 40px;
  display: block;
  transform: translate3d(0, 0, -1000px);
  opacity: 0;
  transition: transform 0.3s, opacity 0.4s;
}
.todo-open .new-card-content .item {
  transform: none;
  opacity: 1;
}
.todo-open .new-card-content .item:nth-child(1) {
  transition-delay: 0.1s;
}
.todo-open .new-card-content .item:nth-child(2) {
  transition-delay: 0.2s;
}
.todo-open .new-card-content .item:nth-child(3) {
  transition-delay: 0.3s;
}
.todo-open .new-card-content .item:nth-child(4) {
  transition-delay: 0.4s;
}
.todo-open .todo-cards {
  transform: translateX(-300px);
  box-shadow: 3px 0px 15px 0px rgba(0, 0, 0, 0.8);
  /* opacity: 0.6; */
}
.todo-open .todo-cover {
  z-index: 20;
  opacity: 1;
  visibility: visible;
}
</style>