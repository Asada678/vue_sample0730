<template>
  <div class="card" :class="{'editing' : todo.isSelected}">
    <div class="circle">
      <h2>{{ todo.title }}</h2>
    </div>
    <div class="content">
      <p>{{ todo.content }}</p>
      <button @click="removeCard">完了</button>
      <button @click="selectCard">編集</button>
    </div>
    <!-- <div class="edit-icon" v-if="todo.isSelected">aaa</div> -->
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
    },
  },
  data() {
    return {
      isSelected: false,
    };
  },
  methods: {
    removeCard() {
      this.$emit("removeCard", this.todo.id);
    },
    selectCard() {
      this.todo.isSelected = true;
      document.querySelector(".todo").classList.toggle("edit-open");
      this.$emit("selectCard", this.todo);
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  width: 150px;
  height: 200px;
  background-color: #fff;
  margin: 10px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}
.card:hover {
  filter: blur(0);
  box-shadow: 0 15px 30px 3px rgba(0, 0, 0, 0.3);
  transform: scale(1.02);
  /* opacity: 1; */
}
.card .circle {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #426cc0;
  clip-path: circle(100px at center -20px);
  text-align: center;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 1);
}

.card .circle h2 {
  color: #fff;
  font-size: 30px;
  padding: 15px 5px;
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
.card .content button {
  font-family: inherit;
  position: relative;
  display: inline-block;
  font-size: 12px;
  font-weight: 6000;
  text-align: center;
  letter-spacing: 2px;
  text-indent: 2px;
  padding: 8px 13px;
  /* background-color: #000; */
  color: #fff;
  border-radius: 40px;
  text-decoration: none;
  margin-top: 10px;
  transition: 0.3s;
  outline: none;
  cursor: pointer;
}
.card .content button:hover {
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.3);
}
.card .content button:nth-child(2) {
  background-color: #58b545;
  border: 1px solid #249c32;
}
.card .content button:nth-child(3) {
  background-color: #ffc626;
  border: 1px solid #ffa560;
}
.card.editing {
  border: 3px solid #ffa560;
}
</style>