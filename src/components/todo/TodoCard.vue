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
      <h3>Name: {{ todo?.name }}</h3>
      <p>Remaining time: {{ todo?.timeDone }} / {{ todo?.time }}</p>
    </div>
    <button @click="todoStore.removeTodo(todo)">
      x
    </button>
  </div>
</template>

<style scoped>
.todo-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: grab;
}

.todo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.todo-card:active {
  cursor: grabbing;
  transform: scale(0.98);
}

.todo-card h3 {
  margin: 4px;
  font-size: 1.2rem;
  color: #333;
}

.todo-card p {
  margin: 8px 0 0;
  font-size: 0.9rem;
  color: #666;
}
</style>
