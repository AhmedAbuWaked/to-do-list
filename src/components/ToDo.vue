<template lang="pug">
.todo-list
  h1 To Do List :
  .add-task
    label Task :
    input(type="text", placeholder="What Do You Need To Do", v-model="task")
    button(:disabled="task === ''", type='submit', @click="addData") Save Item
    button(:disabled="toDo.length < 2", @click="deleteAll") Delete All
  
  .task(v-for="task in toDo" :key="task.index")
    p {{task.text}}
    button(:data-index="task.index", @click="deleteToDo") Delete
    button(@click="done") Done

</template>

<script>
import axios from "axios";

export default {
  name: "ToDo",
  data() {
    return {
      task: "",
      toDo: [],
    };
  },
  methods: {
    addData: function(e) {
      e.preventDefault();

      axios
        .post("http://localhost:5000/addToDo", {
          text: this.task,
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });

      window.location.reload();
    },
    deleteToDo: function(e) {
      e.preventDefault();
      let index = e.target.dataset.index;
      console.log(index);
      axios
        .delete(`http://localhost:5000/deleteToDo/${index}`)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });

      window.location.reload();
    },
    deleteAll: function(e) {
      e.preventDefault();
      axios
        .delete(`http://localhost:5000/deleteAll`)
        .then((res) => {
          console.log(`this is ${res} result ::`);
        })
        .catch((err) => {
          console.log(`this is deleteAll Result:: ${err}`);
        });

      window.location.reload();
    },
    done: function(e) {
      e.preventDefault();

      e.target.parentElement.classList.toggle("done");
    },
  },
  computed: {},
  mounted() {
    axios
      .get("http://localhost:5000/allList")
      .then((res) => {
        this.toDo = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.todo-list {
  width: 500px;
  margin: auto;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  .add-task {
    margin-bottom: 20px;
    label {
      margin-right: 15px;
    }
    input[type="text"] {
      outline: none;
      margin-right: 20px;
      padding: 10px;
      border: 1px solid #ccc;
    }
    button {
      outline: none;
      border: 1px solid #808;
      background: #808;
      color: #fff;
      cursor: pointer;
      padding: 10px 15px;
      margin-left: 5px;
      &:disabled {
        opacity: 0.5;
      }
    }
  }
  .task {
    border: 1px solid #ccc;
    padding: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    border-radius: 3px;
    p {
      float: left;
      margin: 5px 0 0;
    }
    button {
      padding: 5px 15px;
      float: right;
      outline: none;
      cursor: pointer;
      transition: 0.3s;
      background-color: #cd0a0a;
      color: #fff;
      border: 1px solid #cd0a0a;
      &:hover {
        background-color: #931a25;
        border-color: #931a25;
      }
      &:last-child {
        margin-right: 10px;
        background-color: #28abb9;
        border-color: #28abb9;
        &:hover {
          background: #2d6187;
          border-color: #2d6187;
        }
      }
    }
  }
  .done {
    color: blue;
    font-weight: bold;
    p {
      text-decoration: line-through;
    }
  }
}
</style>
