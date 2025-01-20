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

<style scoped lang="scss">
.radio-input {
  &:hover {
    cursor: pointer;
  }
}
</style>
