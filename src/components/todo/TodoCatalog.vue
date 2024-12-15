<script setup lang="ts">
import { useTodoStore } from '@/store/useTodoStore';
import TodoCard from './TodoCard.vue';

const todoStore = useTodoStore();
</script>

<template>
  <div class="todo-status">
    <ol>
      Backlog
      <li v-for="todo in todoStore.getBacklogTodos" :key="todo.id">
        <TodoCard :name="todo.name" :time="todo.time" :status="todo.status" />
      </li>
    </ol>
    <ol>
      In Progress
      <li v-for="todo in todoStore.getInProgressTodos" :key="todo.id">
        <TodoCard :name="todo.name" :time="todo.time" :status="todo.status" />
      </li>
    </ol>
    <ol>
      Stopped
      <li v-for="todo in todoStore.getStoppedTodos" :key="todo.id">
        <TodoCard :name="todo.name" :time="todo.time" :status="todo.status" />
      </li>
    </ol>
    <ol>
      Done
      <li v-for="todo in todoStore.getDoneTodos" :key="todo.id">
        <TodoCard :name="todo.name" :time="todo.time" :status="todo.status" />
      </li>
    </ol>
  </div>
</template>

<style scoped>
</style>
