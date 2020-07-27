<template>
  <div class="todo">
    <div class="todo-cards">
      <div class="todo-cover" @click="clickCover"></div>
      <transition-group class="cards">
        <ToDoCard
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @removeCard="removeCard"
          @selectCard="selectCard"
        />
      </transition-group>
      <PlusButton />
    </div>
    <div class="new-card">
      <div class="new-card-content">
        <input class="item form" type="text" v-model="newTitle" placeholder="title" />
        <textarea class="item form" v-model="newContent" cols="30" rows="10"></textarea>
        <button class="item btn" @click="addCard">追加</button>
      </div>
    </div>
    <div class="edit-card">
      <div class="edit-card-content">
        <input class="item form" type="hidden" v-model="editId" />
        <input class="item form" type="text" v-model="editTitle" placeholder="title" />
        <textarea class="item form" v-model="editContent" cols="30" rows="10"></textarea>
        <button class="item btn" @click="editCard">編集</button>
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
      newTitle: "",
      newContent: "",
      editId: "",
      editTitle: "",
      editContent: "",
      todos: [],
    };
  },
  components: {
    ToDoCard,
    PlusButton,
  },
  methods: {
    addCard() {
      if (this.newTitle === "") {
        alert("タイトルを入力してください");
        return;
      }
      const newCardId = this.todos ? this.todos[0].id + 1 : 1;
      const newCard = {
        id: newCardId,
        title: this.newTitle,
        content: this.newContent,
      };
      // console.log("newCard:", newCard);
      this.todos = this.todos ? [newCard, ...this.todos] : [newCard];
      this.newTitle = "";
      this.newContent = "";
      this.storeCards();
      this.clickCover()
    },
    removeCard(id) {
      // console.log("remove:", id);
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.storeCards();
    },
    selectCard(todo) {
      // console.log("edit:", todo.id);
      this.editId = todo.id;
      this.editTitle = todo.title;
      this.editContent = todo.content;
    },
    editCard() {
      console.log('editCard this:', this)
      this.todos.find(todo => {
        if(todo.id === this.editId) {
          // console.log('find:')
          todo.title = this.editTitle;
          todo.content = this.editContent;
          todo.isSelected = false
        }
      })
      document.querySelector(".card").classList.toggle("editing");
      this.clickCover();
      this.storeCards();
    },
    storeCards() {
      const jsonTodos = JSON.stringify(this.todos);
      localStorage.setItem("todos", jsonTodos);
    },
    clickCover() {
      if (document.querySelector(".todo").classList.contains("todo-open")) {
        document.querySelector(".todo").classList.remove("todo-open");
      } else {
        document.querySelector(".todo").classList.remove("edit-open");
      }
    },
  },
  created() {
    // this.todos = [
    //   { id: 9, title: "筋トレ", content: "aaa" },
    //   { id: 8, title: "", content: "aaa" },
    //   { id: 7, title: "課題", content: "SD,DB,AN" },
    //   { id: 6, title: "", content: "aaa" },
    //   { id: 3, title: "", content: "aaaaaaaaaaaaaaa" },
    //   { id: 1, title: "おつかい", content: "aaa" },
    // ];
    this.todos = JSON.parse(localStorage.getItem("todos"));
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
.todo-cover {
  position: absolute;
  top: 0;
  /* left: 0; */
  width: calc(100% - 300px);
  /* width: 100%; */
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  z-index: auto;
  transition: opacity 1s;
  cursor: pointer;
}
.todo-cards {
  position: relative;
  min-height: calc(100vh - 160px);
  padding: 80px 20px 80px 300px;
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
.new-card,
.edit-card {
  position: fixed;
  top: 250px;
  width: 300px;
}
.new-card {
  left: 0;
}
.edit-card {
  right: 0;
}
.new-card-content,
.edit-card-content {
  perspective: 2000px;
  transform-style: preserve-3d;
}
.new-card-content .item,
.edit-card-content .item {
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
  z-index: auto;
}
.todo-open .todo-cover {
  box-shadow: -3px 0px 15px 0px rgba(0, 0, 0, 0.5);
}
.edit-open .todo-cover {
  box-shadow: 3px 0px 15px 0px rgba(0, 0, 0, 0.5);
}
.todo-open .todo-cover {
  z-index: 20;
  opacity: 1;
  visibility: visible;
  right: 0;
}
.edit-open .edit-card-content .item {
  transform: none;
  opacity: 1;
}
.edit-open .edit-card-content .item:nth-child(1) {
  transition-delay: 0.1s;
}
.edit-open .edit-card-content .item:nth-child(2) {
  transition-delay: 0.2s;
}
.edit-open .edit-card-content .item:nth-child(3) {
  transition-delay: 0.3s;
}
.edit-open .edit-card-content .item:nth-child(4) {
  transition-delay: 0.4s;
}
.edit-open .todo-cards {
  transform: translateX(-300px);
}
.edit-open .todo-cover {
  width: 100%;
  z-index: 20;
  opacity: 1;
  visibility: visible;
  left: 0;
}
</style>