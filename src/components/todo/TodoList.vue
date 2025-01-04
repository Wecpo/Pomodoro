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
    class="todo-list"
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
.todo-list {
  border: 1px solid #ccc;
  padding: 1rem;
  min-height: 200px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.todo-list__li {
  margin-bottom: 1rem;
  cursor: grab;
}

.todo-list__li:active {
  cursor: grabbing;
}
</style>
