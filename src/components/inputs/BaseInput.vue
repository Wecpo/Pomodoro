<script setup lang="ts">
import { useId } from 'vue';

interface Props {
  label: string
  type: string
  placeholder?: string
  min?: string
  max?: string
  step?: string
  value?: string
}

const props = defineProps<Props>();
const modelValue = defineModel();

const inputId = useId();
</script>

<template>
  <template v-if="type === 'radio'">
    <label :for="inputId">{{ props.label }}</label>
    <input :id="inputId" v-model="modelValue" type="radio" :value="props.value ">
  </template>
  <template v-else>
    <label :for="inputId">
      {{ props.label }}
    </label>
    <input
      :id="inputId"
      v-model="modelValue"
      :type="props.type"
      :min="props.min"
      :max="props.max"
      :step="props.step"
    >
  </template>
</template>

<style scoped>
input {
  padding: 5px;
  margin: 5px;
  background-color: rgba(128, 92, 92, 0.7);
}
</style>
