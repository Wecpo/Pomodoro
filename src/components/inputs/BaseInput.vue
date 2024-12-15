<script setup lang="ts">
import { useId } from 'vue';

interface Props {
  label: string
  type: string
  placeholder?: string
  required?: boolean
  min?: string
  max?: string
  step?: string
  value?: string
}

defineProps<Props>();
const modelValue = defineModel();

const inputId = useId();
</script>

<template>
  <label :for="inputId">
    {{ label }}
  </label>
  <input
    :id="inputId"
    v-model="modelValue"
    :required="required"
    class="base-input"
    :placeholder="placeholder"
    :type="type"
    :min="min"
    :max="max"
    :step="step"
  >
</template>

<style scoped>
.base-input {
  padding: 4px;
  margin: 4px;
  background-color: rgba(128, 92, 92, 0.7);
}
</style>
