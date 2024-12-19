<script setup lang="ts">
import BaseInput from '@/components/inputs/BaseInput.vue';
import { useTodoStore } from '@/store/todoStore';
import { TODO_STATUS } from '@/types/enums/TodoStatus';
import { reactive } from 'vue';
import TimerButton from '../buttons/BaseButton.vue';

const newTodo = reactive({
  name: ``,
  id: crypto.randomUUID(),
  time: null,
  status: TODO_STATUS.BACKLOG,
});

const resetForm = () => {
  newTodo.name = '';
  newTodo.time = null;
};

const todoStore = useTodoStore();
</script>

<template>
  <form class="create-todo-form" @submit.prevent="todoStore.createTodo(newTodo), resetForm()">
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
    <TimerButton type="submit">
      Create
    </TimerButton>
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
