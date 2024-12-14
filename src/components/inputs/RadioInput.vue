<script setup lang="ts">
import { useId } from 'vue';

interface Props {
  label: string
  value?: string
}

const props = defineProps<Props>();
const modelValue = defineModel();

const inputId = useId();
</script>

<template>
  <label :for="inputId">{{ props.label }}</label>
  <input :id="inputId" v-model="modelValue" type="radio" :value="props.value ">
</template>

<style scoped>
input {
  padding: 5px;
  margin: 5px;
  background-color: rgba(128, 92, 92, 0.7);
}
</style>
