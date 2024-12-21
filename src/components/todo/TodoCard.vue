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
    <div>
      Name: {{ todo?.name }}
      Remaining time: {{ todo?.timeDone }} / {{ todo?.time }}
    </div>
    <div>
      <button @click="todoStore.removeTodo(todo)">
        Delete
      </button>
      <button @click="todoStore.startTodo(todo)">
        Start
      </button>
      <button @click="todoStore.doneTodo(todo)">
        Done
      </button>
      <button @click="todoStore.stopTodo(todo)">
        Stop
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-card {
  border: 1px solid black;
}
</style>
