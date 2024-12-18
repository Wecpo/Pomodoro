<script setup lang="ts">
import TodoCard from '@/components/todo/TodoCard.vue';
import { useTodoStore } from '@/store/todoStore';

const todoStore = useTodoStore();
</script>

<template>
  <div class="todo-status">
    <ol>
      Backlog
      <li v-for="todo in todoStore.getBacklogTodos" :key="todo.id">
        <TodoCard :todo="todo" />
      </li>
    </ol>
    <ol>
      In Progress
      <li v-for="todo in todoStore.getInProgressTodos" :key="todo.id">
        <TodoCard :todo="todo" />
      </li>
    </ol>
    <ol>
      Stopped
      <li v-for="todo in todoStore.getStoppedTodos" :key="todo.id">
        <TodoCard :todo="todo" />
      </li>
    </ol>
    <ol>
      Done
      <li v-for="todo in todoStore.getDoneTodos" :key="todo.id">
        <TodoCard :todo="todo" />
      </li>
    </ol>
  </div>
</template>

<style scoped>
</style>
