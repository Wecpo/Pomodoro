<script setup lang="ts">
import { useId } from 'vue';

interface Props {
  label: string
  value?: string
}

defineProps<Props>();
const modelValue = defineModel();

const inputId = useId();
</script>

<template>
  <label :for="inputId">{{ label }}</label>
  <input :id="inputId" v-model="modelValue" class="radio-input" type="radio" :value="value ">
</template>

<style scoped>
.radio-input {
  padding: 4px;
  margin: 4px;
  background-color: rgba(128, 92, 92, 0.7);
}
</style>
