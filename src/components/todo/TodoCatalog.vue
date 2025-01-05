<script setup lang="ts">
import TodoList from '@/components/todo/TodoList.vue';
import { TODO_STATUS } from '@/types/enums/TodoStatus';
</script>

<template>
  <div class="todo-status">
    <TodoList label="Backlog" :todo-status="TODO_STATUS.BACKLOG" />
    <TodoList label="In progress" :todo-status="TODO_STATUS.IN_PROGRESS" />
    <TodoList label="Stopped" :todo-status="TODO_STATUS.STOPPED" />
    <TodoList label="Done" :todo-status="TODO_STATUS.DONE" />
  </div>
</template>

<style scoped>
.todo-status {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>
