import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

interface Todo {
  name: string
  time: number
  id: string
  status: string
}

interface TodoFromForm {
  name: string
  time: number
}

export const useTodoStore = defineStore('todo', () => {
  const todos = reactive<Todo[]>([]);

  const getTodos = computed(() => todos);
  const getBacklogTodos = computed(() => todos.filter(todo => todo.status === 'backlog'));
  const getInProgressTodos = computed(() => todos.filter(todo => todo.status === 'in-progress'));
  const getStoppedTodos = computed(() => todos.filter(todo => todo.status === 'stopped'));
  const getDoneTodos = computed(() => todos.filter(todo => todo.status === 'done'));

  const createTodo = (newTodo: TodoFromForm) => {
    todos.push({ ...newTodo, id: crypto.randomUUID(), status: 'in-progress' });
  };

  return {
    todos,
    getTodos,
    getBacklogTodos,
    getInProgressTodos,
    getStoppedTodos,
    getDoneTodos,

    createTodo,
  };
});
