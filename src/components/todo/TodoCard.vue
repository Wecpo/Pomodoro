<script setup lang="ts">
import type { Todo } from '@/types/interfaces/Todo';
import { useTodoStore } from '@/store/todoStore';
import { computed } from 'vue';

const props = defineProps<{
  todo: Todo
}>();

const todoStore = useTodoStore();

const isTodoDone = computed(() => {
  if (props.todo.time) {
    return props.todo.timeDone >= props.todo.time ? `todo-card--done` : ``;
  }

  return ``;
});
</script>

<template>
  <div :class="`todo-card ${isTodoDone}`">
    <div class="todo-card__body">
      <h3 class="todo-сard__title">
        {{ todo?.name }}
      </h3>
      <p class="todo-card__time">
        Remaining time: {{ todo?.timeDone }} / {{ todo?.time }} (m)
      </p>
      <button class="todo-card__delete-btn" @click="todoStore.removeTodo(todo)">
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
  will-change: box-shadow;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.todo-card--done {
  background-color: rgba(166, 180, 143, 0.733);
}

.todo-card:hover {
  cursor: grab;
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.todo-card__body {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: #0e1111;
  align-items: center;
}

.todo-сard__title {
  text-align: center;
  font-size: 1.4rem;
  color: #2d423f;
  font-weight: 600;
  margin: 0;
  word-wrap: break-word;
  width: 11rem;
}

.todo-card__time {
  margin: 0.5 rem 0;
}

.todo-card__delete-btn {
  background-color: #f8f1f1;
  color: #ff4d4d;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition:
    color 0.2s,
    background-color 0.2s;
}
.todo-card__delete-btn:hover {
  background-color: #ebabab;
  color: #d31a1a;
}
</style>
