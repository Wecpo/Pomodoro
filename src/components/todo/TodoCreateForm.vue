<script setup lang="ts">
import BaseInput from '@/components/inputs/BaseInput.vue';
import { useTodoStore } from '@/store/useTodoStore';
import { reactive } from 'vue';

const newTodo = reactive({
  name: '',
  time: 30,
});

const todoStore = useTodoStore();
</script>

<template>
  <form class="create-todo-form" @submit.prevent="todoStore.createTodo(newTodo)">
    <h2>Create Todo</h2>
    <BaseInput
      v-model="newTodo.name"
      type="text"
      label="Todo name"
      placeholder="New todo"
      :required="true"
    />
    <BaseInput
      v-model="newTodo.time"
      type="number"
      label="Todo time (m)"
      :required="true"
      placeholder="30"
    />
    <button type="submit">
      Create
    </button>
  </form>
</template>

<style scoped>
.create-todo-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px;
}
</style>
