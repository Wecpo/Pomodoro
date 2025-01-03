import type { Todo } from '@/types/interfaces/Todo';
import { TODO_STATUS } from '@/types/enums/TodoStatus';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);

  const getTodosByStatus
   = computed(() => (todoStatus: TODO_STATUS) => todos.value.filter(todo => todo.status === todoStatus));

  const getInProgressTodo = computed(() => todos.value.find(todo => todo.status === TODO_STATUS.IN_PROGRESS));

  const getTodoIndexById = (todoId: string) => todos.value.findIndex(todo => todo.id === todoId);

  const createTodo = (newTodo: Todo) =>
    todos.value.push({ ...newTodo, id: crypto.randomUUID(), status: TODO_STATUS.BACKLOG });

  const changeTodoStatus = (todo: Todo, newTodoStatus: TODO_STATUS) => todo.status = newTodoStatus;

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

  const removeTodo = (todo: Todo) => {
    const todoIndex = getTodoIndexById(todo.id);
    todos.value.splice(todoIndex, 1);
  };

  return {
    todos,
    getInProgressTodo,
    getTodosByStatus,

    createTodo,
    changeTodoRemainingTime,
    changeTodoOnDrop,
    changeTodoStatus,
    removeTodo,
  };
});
