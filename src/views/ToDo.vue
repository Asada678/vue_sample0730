<template>
  <div class="todo">
    <ToDoCard v-for="todo in todos" :key="todo.id" :todo="todo" />
    <PlusButton />
  </div>
</template>

<script>
import ToDoCard from '@/components/ToDoCard'
import PlusButton from '@/components/PlusButton'
export default {
  data() {
    return {
      todos: [
        {id: 1, text: "aaa"},
        {id: 2, text: "aaa"},
        {id: 3, text: "aaaaaaaaaaaaaaa"},
        {id: 4, text: "aaa"},
        {id: 5, text: "aaa"},
        {id: 6, text: "aaa"},
        {id: 7, text: "aaa"},
        {id: 8, text: "aaa"},
        {id: 9, text: "aaa"},
        {id: 10, text: "aaa"},
        {id: 11, text: "aaa"},
        {id: 12, text: "aaa"},
      ]
    }
  },
components: {
  ToDoCard,
  PlusButton
}
}
</script>

<style scoped>
.todo {
  position: relative;
  background-color: #f0f0f0;
  min-height: calc(100vh - 124px);
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  justify-content: space-around;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

</style>