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
    <div class="todo-body">
      <h3 class="todo-title">
        {{ todo?.name }}
      </h3>
      <p>Remaining time: {{ todo?.timeDone }} / {{ todo?.time }} (m)</p>
      <button class="todo__delete-btn" @click="todoStore.removeTodo(todo)">
        Remove
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-card {
  background-color: #fffbf5;
  border: 2px solid #8fa3a0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.todo-card:hover {
  cursor: grab;
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.todo-title {
  text-align: center;
  font-size: 1.4rem;
  color: #2d423f;
  font-weight: 600;
  margin: 0;
}

.todo__delete-btn {
  background-color: #f8f1f1;
  color: #ff4d4d;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition:
    color 0.2s,
    background-color 0.2s;
}
.todo__delete-btn:hover {
  background-color: #ebabab;
  color: #d31a1a;
}

.todo-body {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: #2d423f;
  align-items: center;
}
</style>
