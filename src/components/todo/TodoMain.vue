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
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #92d4ab, #ebf5ef);
  border-radius: 16px;
}
</style>
