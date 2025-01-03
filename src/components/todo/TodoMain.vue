<script setup lang="ts">
import TodoCatalog from '@/components/todo/TodoCatalog.vue';
import TodoCreateForm from '@/components/todo/TodoCreateForm.vue';
</script>

<template>
  <div class="todo-main">
    <TodoCreateForm />
    <TodoCatalog />
  </div>
</template>

 <style scoped>
.todo-main {
  margin-top: 4px;
  padding: 4px;
  background-color: rgb(175, 196, 175);
  border-radius: 8px;
}
</style>
