<script setup lang="ts">
import type { Todo } from '@/types/interfaces/Todo';
import { useTodoStore } from '@/store/todoStore';
import { computed } from 'vue';

const props = defineProps<{
  todo: Todo
}>();

const todoStore = useTodoStore();

const todoBackgroundClass = computed(() => {
  if (props.todo.time) {
    return props.todo.timeDone >= props.todo.time ? `todo-card--backgound-done` : ``;
  }

  return ``;
});
</script>

<template>
  <div :class="`todo-card ${todoBackgroundClass}`">
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

<style scoped lang="scss">
@use '@/styles/mixins';

.todo-card {
  background-color: #fffbf5;
  border: 2px solid #8fa3a0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.6rem;
  margin-bottom: 0.6rem;
  will-change: box-shadow;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &--backgound-done {
    background-color: rgba(166, 180, 143, 0.733);
  }

  &:hover {
    cursor: grab;
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  &__body {
    @include mixins.flex-center();
    font-size: 1.2rem;
    color: #0e1111;
  }

  &__title {
    word-wrap: break-word;
  }

  &__time {
    margin: 1rem;
  }

  &__delete-btn {
    color: #ff4d4d;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: #ebabab;
      color: #d31a1a;
    }
  }
}
</style>
