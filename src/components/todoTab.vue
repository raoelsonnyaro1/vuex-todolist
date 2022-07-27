<template>
  <div>
    <table class="mx-auto">
      <th colspan="3">{{ title }}</th>
      <tr
        v-for="(todo, index) in todos"
        :key="index"
        :class="{ completed: todo.completed }"
      >
        <td>
          <input
            type="checkbox"
            v-model="todo.completed"
            v-on:change="updateTodo(todo)"
          />
        </td>
        <td>{{ todo.title }}</td>
        <td>
          <input
            type="button"
            :value="btnSupprimer"
            @click.prevent="deleteTodo(todo.id)"
          />
        </td>
      </tr>
    </table>
    <input type="text" v-model="newTodo" @keypress.enter="addTodo(newTodo)" />
    <table class="mx-auto" v-show="hasCompleted">
      <th colspan="3">Completed</th>
      <tr v-for="(todo, index) in completedTodos" :key="index">
        <td>{{ todo.title }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import store from "@/store";
import Vuex from "vuex";

global.v = Vuex;

export default {
  store: store,
  name: "todoTab",
  data() {
    return {
      title: "Todolist",
      btnSupprimer: "supprimer",
      newTodo: "",
    };
  },

  methods: {
    ...Vuex.mapActions({
      addTodoStore: "addTodo",
      deleteTodoStore: "deleteTodo",
      updatedTodoStore: "updatedTodo",
    }),

    addTodo() {
      this.addTodoStore(this.newTodo);
      this.newTodo = "";
    },

    updatedTodo() {
      this.updatedTodoStore(this.todo);
    },

    deleteTodo() {
      this.deleteTodoStore(this.todo);
    },
  },

  computed: {
    ...Vuex.mapGetters(["todos", "completedTodos"]),
    hasCompleted() {
      return this.completedTodos.length > 0;
    },
  },

  mounted() {
    this.$store.dispatch("fetchTodos");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 10px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
input[type="button"] {
  background-color: black;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  cursor: pointer;
}
.completed {
  text-decoration: line-through;
}
</style>
