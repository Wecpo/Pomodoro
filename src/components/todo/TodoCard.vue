<script setup lang="ts">
import type { Todo } from '@/types/interfaces/Todo';
import { useTodoStore } from '@/store/todoStore';

defineProps<{
  todo: Todo
}>();

const todoStore = useTodoStore();
</script>

<template>
  <div class="todo-card">
    <div>{{ todo.name }}</div>
    <div>
      <button @click="todoStore.removeTodo(todo)">
        delete
      </button>
      <button @click="todoStore.startTodo(todo)">
        start
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-card {
  border: 1px solid black;
}
</style>
