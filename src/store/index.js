import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const resource_uri = "https://jsonplaceholder.typicode.com/todos/";

const state = {
  todos: [],
};

const getters = {
  todos: (state) => state.todos,
  completedTodos: (state) => state.todos.filter((todo) => todo.completed),
  remainingTodos: (state) => state.todos.filter((todo) => !todo.completed),
  remainingTodos: (state) => state.todos.filter((todo) => !todo.completed),
  completedTodosCount: (state) => getters.completedTodos(state).length,
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),

  add_todo: (state, title) => {
    state.todos.push({
      title: title,
      completed: false,
    });
  },

  update_todo: (state, updatedTodo) => {
    const index = state.todos.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },

  delete_todo: (state, todo) => {
    state.todos.filter((j) => j !== todo);
  },
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(resource_uri);
    commit("setTodos", response.data);
  },

  async addTodo({ commit }, todo) {
    const response = await axios.post(resource_uri, todo);
    commit("add_todo", todo);
  },

  async updateTodo({ commit }, todo) {
    const response = await axios.put("${resource_uri}${todo.id}", todo);
    commit("update_todo", response.data);
  },

  async deleteTodo({ commit }, todo) {
    await axios.delete("https://jsonplaceholder.typicode.com/todos/1");
    commit("delete_todo", todo);
  },
  // deleteTodo: (store, todo) => {
  //   store.commit("delete_todo", todo);
  // },
};

let store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
});

global.store = store;

export default store;
