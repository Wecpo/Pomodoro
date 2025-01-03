import type { Todo } from '@/types/interfaces/Todo';
import { TODO_STATUS } from '@/types/enums/TodoStatus';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);

  const getBacklogTodos = computed(() => todos.value.filter(todo => todo.status === TODO_STATUS.BACKLOG));
  const getInProgressTodos = computed(() => todos.value.filter(todo => todo.status === TODO_STATUS.IN_PROGRESS));
  const getStoppedTodos = computed(() => todos.value.filter(todo => todo.status === TODO_STATUS.STOPPED));
  const getDoneTodos = computed(() => todos.value.filter(todo => todo.status === TODO_STATUS.DONE));

  const getInProgressTodo = computed(() => todos.value.find(todo => todo.status === TODO_STATUS.IN_PROGRESS));

  const getTodoIndexById = (todoId: string) => todos.value.findIndex(todo => todo.id === todoId);

  const createTodo = (newTodo: Todo) => {
    todos.value.push({ ...newTodo, id: crypto.randomUUID(), status: TODO_STATUS.BACKLOG });
  };

  const changeTodoRemainingTime = (timeDone: number) => {
    const inProgressTodo = getInProgressTodo;
    if (inProgressTodo.value) {
      inProgressTodo.value.timeDone += timeDone;
    }
  };

  const changeTodoOnDrop = (todoId: string | undefined, columnName: TODO_STATUS) => {
    const todo = todos.value.find(todo => todo.id === todoId);

    if (todo) {
      todo.status = columnName;
    }
  };

  const startTodo = (todo: Todo) => {
    todo.status = TODO_STATUS.IN_PROGRESS;
  };

  const removeTodo = (todo: Todo) => {
    const todoIndex = getTodoIndexById(todo.id);
    todos.value.splice(todoIndex, 1);
  };

  const doneTodo = (todo: Todo) => {
    todo.status = TODO_STATUS.DONE;
  };

  const stopTodo = (todo: Todo) => {
    todo.status = TODO_STATUS.STOPPED;
  };

  return {
    todos,
    getBacklogTodos,
    getInProgressTodos,
    getStoppedTodos,
    getDoneTodos,
    getInProgressTodo,

    createTodo,
    changeTodoRemainingTime,
    changeTodoOnDrop,
    removeTodo,
    doneTodo,
    startTodo,
    stopTodo,
  };
});
