<template>
  <div class="todo">
    <div class="todo-cards">
      <div class="todo-cover" @click="clickCover"></div>
      <draggable
        v-model="todos"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        @change="storeCards"
      >
        <transition-group class="cards">
          <ToDoCard
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @removeCard="removeCard"
            @selectCard="selectCard"
          />
        </transition-group>
      </draggable>
      <PlusButton />
    </div>
    <div class="new-card">
      <div class="new-card-content">
        <div class="item item-input">
          <input
            class="text-input"
            :class="{'is-input' : !!newTitle}"
            type="text"
            v-model="newTitle"
          />
          <label>タイトル</label>
          <span class="focus-line"></span>
        </div>
        <div class="item item-input">
          <textarea
            class="text-input textarea-input"
            :class="{'is-input' : !!newContent}"
            v-model="newContent"
            cols="30"
            rows="10"
          ></textarea>
          <label>内容</label>
          <span class="focus-line"></span>
        </div>
        <div class="item">
          <button class="btn" @click="addCard">追加</button>
        </div>
      </div>
    </div>
    <div class="edit-card">
      <div class="edit-card-content">
        <div class="item item-input">
          <input
            class="text-input"
            :class="{'is-input' : !!editTitle}"
            type="text"
            v-model="editTitle"
          />
          <label>タイトル</label>
          <span class="focus-line"></span>
        </div>
        <div class="item item-input">
          <textarea
            class="text-input textarea-input"
            :class="{'is-input' : !!editContent}"
            v-model="editContent"
            cols="30"
            rows="10"
          ></textarea>
          <label>内容</label>
          <span class="focus-line"></span>
        </div>
        <div class="item">
          <button class="btn" @click="editCard">編集</button>
        </div>
        <input class="item form" type="hidden" v-model="editId" />
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
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
      drag: false,
    };
  },
  components: {
    draggable,
    ToDoCard,
    PlusButton,
  },
  methods: {
    addCard() {
      if (this.newTitle === "") {
        alert("タイトルを入力してください");
        return;
      }
      let newCardId;
      if (this.todos === null) {
        this.todos = [];
        newCardId = 1;
      } else {
        newCardId = this.todos.length
          ? Number(this.todos.reduce((a, b) => (a.id > b.id ? a : b)).id + 1)
          : 1;
      }
      const newCard = {
        id: newCardId,
        title: this.newTitle,
        content: this.newContent,
        isSelected: false,
      };
      // console.log("newCard:", newCard);
      // this.todos = this.todos ? [newCard, ...this.todos] : [newCard];
      this.todos = [newCard, ...this.todos];
      this.newTitle = "";
      this.newContent = "";
      this.storeCards();
      // this.clickCover();
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
      if (this.editTitle === "") {
        alert("タイトルを入力してください");
        return;
      }
      this.todos.find((todo) => {
        if (todo.id === this.editId) {
          todo.title = this.editTitle;
          todo.content = this.editContent;
          todo.isSelected = false;
        }
      });
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
        // this.editCard();
        this.todos.find((todo) => {
          if (todo.isSelected) {
            todo.isSelected = false;
          }
        });
        document.querySelector(".todo").classList.remove("edit-open");
      }
    },
  },
  computed: {
    isInput: function (value) {
      console.log("value:", value);
      return this.newTitle ? "is-input" : "";
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
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
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  z-index: auto;
  transition: opacity 1s;
  cursor: pointer;
}
.todo-cards {
  position: relative;
  min-height: calc(100vh - 160px);
  padding: 80px 0px 80px 300px;
  transition: 0.5s;
  background-color: #eee;
  z-index: 5;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  justify-content: start;
  margin: 0 20px;
  padding: 10px;
}
.new-card,
.edit-card {
  position: fixed;
  /* top: 250px; */
  bottom: 10px;
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
  padding: 0 40px;
}
.new-card-content .item,
.edit-card-content .item {
  /* margin: 20px 40px; */
  position: relative;
  margin: 20px 0;
  padding: 0;
  display: block;
  width: 100%;
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
.item-input input[type="text"] {
  font-size: 20px;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}
.textarea-input {
  font-family: inherit;
  font-size: 20px;
  width: 100%;
  resize: none;
}
.text-input {
  outline: none;
  padding: 4px 0;
  border: 0;
  border-bottom: 1px solid #aaaaaa;
  background-color: transparent;
}
.text-input ~ .focus-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  transition: 0.4s;
  background-color: #6585c7;
}
.edit-open .text-input ~ .focus-line {
  background-color: #ffbc00;
}
.text-input:focus ~ .focus-line {
  left: 0;
  width: 100%;
  transition: width 0.4s, left 0.4s;
}
.textarea-input:focus ~ .focus-line {
  bottom: 2px;
}
.text-input ~ label {
  position: absolute;
  z-index: -1;
  top: 4px;
  left: 0;
  width: 100%;
  transition: 0.3s;
  letter-spacing: 0.5px;
  color: #aaaaaa;
}
.text-input:focus ~ label,
.is-input ~ label {
  font-size: 12px;
  top: -16px;
  transition: 0.3s;
}
.text-input:focus ~ label {
  color: #6585c7;
}
.edit-open .text-input:focus ~ label {
  color: #ffbc00;
}
.btn {
  font-family: inherit;
  width: 100%;
  height: 50px;
  outline: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  text-indent: 10px;
  letter-spacing: 10px;
  color: #fff;
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
  cursor: pointer;
}
.new-card .btn {
  background-color: #426cc0;
  border: 2px solid #6585c7;
}
.edit-card .btn {
  background-color: #ffc626;
  border: 1px solid #ffbc00;
  /* background-color: #9db7eb;
  border: 2px solid #6585c7; */
}
.btn:hover {
  transition-delay: 0s;
  opacity: 0.9;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.3);
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
.todo-cover:hover {
  opacity: 0.7;
}
</style>