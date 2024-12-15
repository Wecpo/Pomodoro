<script setup lang="ts">
defineProps<{
  name: string
  time: number
  status: string
}>();
</script>

<template>
  <div class="todo-card" draggable="true">
    {{ name }}
  </div>
</template>

<style scoped>
.todo-card {
  border: 1px solid black;
}

.todo-card:hover {
  cursor: pointer;
}
</style>
