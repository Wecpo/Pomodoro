<script setup lang="ts">
import type { TODO_STATUS } from '@/types/enums/TodoStatus';
import TodoCard from '@/components/todo/TodoCard.vue';
import { useTodoStore } from '@/store/todoStore';

defineProps<{
  label: string
  todoStatus: TODO_STATUS
}>();

const todoStore = useTodoStore();
</script>

<template>
  <ol
    @dragover.prevent
    @drop="todoStore.changeTodoOnDrop($event.dataTransfer?.getData('todoId'), todoStatus)"
  >
    {{ label }}
    <li
      v-for="todo in todoStore.getTodosByStatus(todoStatus)" :key="todo.id" draggable="true"
      @dragstart="($event.dataTransfer?.setData('todoId', todo.id))"
    >
      <TodoCard :todo="todo" />
    </li>
  </ol>
</template>

<style scoped>
</style>
