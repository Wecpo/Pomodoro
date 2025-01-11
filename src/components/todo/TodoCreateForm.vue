<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import BaseInput from '@/components/inputs/BaseInput.vue';
import { useTodoStore } from '@/store/todoStore';
import { INPUT_LIMITS } from '@/types/enums/InputLimits';
import { TODO_STATUS } from '@/types/enums/TodoStatus';
import { reactive } from 'vue';

const todoStore = useTodoStore();

const newTodo = reactive({
  name: ``,
  id: crypto.randomUUID(),
  time: null,
  timeDone: 0,
  status: TODO_STATUS.BACKLOG,
});

const resetForm = () => {
  newTodo.name = '';
  newTodo.time = null;
};
</script>

<template>
  <form class="create-todo-form" @submit.prevent="[todoStore.createTodo(newTodo), resetForm()]">
    <h2 class="create-todo-form__title">
      Create Todo
    </h2>
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
      :min="INPUT_LIMITS.MIN_TIME"
      :max="INPUT_LIMITS.MAX_TIME"
    />
    <BaseButton type="submit">
      Create
    </BaseButton>
  </form>
</template>

<style scoped>
.create-todo-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-todo-form__title {
  color: #333;
  font-size: 2.4rem;
}
</style>
